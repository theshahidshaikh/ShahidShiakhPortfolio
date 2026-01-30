
import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, User, X } from 'lucide-react';
import { streamChatWithGemini } from '../services/gemini';
import { GenerateContentResponse } from '@google/genai';

// Simple markdown parser component to render bold text and lists
const MarkdownContent: React.FC<{ content: string }> = ({ content }) => {
    const processLine = (line: string) => {
        line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        if (line.trim().startsWith('* ')) {
            return `<li>${line.trim().substring(2)}</li>`;
        }
        return line;
    };

    const lines = content.split('\n');
    let html = '';
    let inList = false;

    for (const line of lines) {
        const processedLine = processLine(line);
        if (processedLine.startsWith('<li>')) {
            if (!inList) {
                html += '<ul>';
                inList = true;
            }
            html += processedLine;
        } else {
            if (inList) {
                html += '</ul>';
                inList = false;
            }
            html += processedLine ? `<p>${processedLine}</p>` : '<br/>';
        }
    }

    if (inList) {
        html += '</ul>';
    }

    // Fix for multiple <br/> tags creating too much space
    html = html.replace(/(<br\s*\/?>\s*){2,}/g, '<br/>');

    return <div className="markdown-content" dangerouslySetInnerHTML={{ __html: html }} />;
};


export const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const initialMessage = "Hello! I'm Shahid's virtual assistant, powered by Gemini. Feel free to ask about his skills, projects, or experience. How can I help you?";
  const suggestions = [
      "Summarize his key skills.",
      "Tell me about the MPAY project.",
      "What was his role at Lihatech?",
      "What is he passionate about?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ role: 'assistant', content: initialMessage }]);
    }
  }, [isOpen]);
  
  useEffect(scrollToBottom, [messages, isStreaming]);

  const handleSend = async (prompt?: string) => {
    const userMsg = prompt || input.trim();
    if (!userMsg || isStreaming) return;

    setInput('');
    const newMessages = [...messages, { role: 'user' as const, content: userMsg }];
    setMessages(newMessages);
    setIsStreaming(true);
    
    setMessages(prev => [...prev, { role: 'assistant', content: '' }]);
    
    try {
        const stream = await streamChatWithGemini(newMessages);
        
        for await (const chunk of stream) {
          const c = chunk as GenerateContentResponse;
          const chunkText = c.text;
          if (chunkText) {
            setMessages(prev => {
              const lastMsgIndex = prev.length - 1;
              const updatedMessages = [...prev];
              updatedMessages[lastMsgIndex].content += chunkText;
              return updatedMessages;
            });
          }
        }
    } catch (error) {
        console.error("Streaming Error:", error);
        setMessages(prev => {
            const lastMsgIndex = prev.length - 1;
            const updatedMessages = [...prev];
            updatedMessages[lastMsgIndex].content = "Sorry, something went wrong. Please try again.";
            return updatedMessages;
        });
    } finally {
        setIsStreaming(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[200]">
      {isOpen ? (
        <div className="fixed bottom-8 right-8 z-[200] bg-[#0c0c0e]/80 backdrop-blur-3xl border border-white/10 rounded-3xl shadow-[0_24px_48px_rgba(0,0,0,0.5)] w-[calc(100vw-4rem)] max-w-[440px] h-[75vh] max-h-[640px] flex flex-col overflow-hidden animate-in slide-in-from-bottom-8 duration-500 ease-out">
          <div className="p-5 border-b border-white/10 flex justify-between items-center bg-transparent shrink-0">
              <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-0.5">
                      <div className="w-full h-full bg-[#0c0c0e] rounded-full flex items-center justify-center">
                          <Bot className="w-5 h-5 text-blue-400" />
                      </div>
                  </div>
                  <div>
                      <span className="font-bold text-white text-base">AI Assistant</span>
                      <p className="text-[11px] text-green-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                          Online
                      </p>
                  </div>
              </div>
              <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-white/50 hover:text-white hover:bg-white/5 rounded-full transition-colors"
              >
                  <X className="w-5 h-5" />
              </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.map((msg, i) => (
                  <div key={i} className={`flex items-start gap-3 w-full ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-white/10' : 'bg-transparent'}`}>
                          {msg.role === 'user' ? <User className="w-4 h-4 text-white/80" /> : <Bot className="w-5 h-5 text-blue-400" />}
                      </div>
                      <div className={`max-w-[85%] text-base leading-relaxed p-4 rounded-2xl ${
                          msg.role === 'user' 
                          ? 'bg-blue-600/80 text-white rounded-tr-none' 
                          : 'bg-white/5 text-white/90 rounded-tl-none'
                      }`}>
                          <MarkdownContent content={msg.content} />
                      </div>
                  </div>
              ))}
              
              {messages.length === 1 && !isStreaming && (
                  <div className="flex flex-wrap gap-2 pt-2">
                      {suggestions.map(s => (
                          <button key={s} onClick={() => handleSend(s)} className="px-4 py-2 bg-white/5 border border-white/10 text-white/80 text-xs rounded-full hover:bg-white/10 hover:text-white transition-all">
                              {s}
                          </button>
                      ))}
                  </div>
              )}

              {isStreaming && messages[messages.length-1]?.role === 'assistant' && (
                 <div className="flex items-start gap-3">
                    <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center">
                       <Bot className="w-5 h-5 text-blue-400" />
                    </div>
                     <div className="py-4 px-2 flex items-center gap-2">
                        <span className="text-sm text-white/50">Assistant is thinking</span>
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
                    </div>
                 </div>
              )}

              <div ref={messagesEndRef} />
          </div>

          <div className="p-5 bg-transparent border-t border-white/10 shrink-0">
              <div className="relative">
                  <input
                      type="text" value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Ask me anything about Shahid..."
                      className="w-full bg-white/5 text-white pl-5 pr-14 py-3.5 rounded-full text-base focus:outline-none border border-transparent focus:border-blue-500/50 transition-all placeholder:text-white/40"
                  />
                  <button
                      onClick={() => handleSend()}
                      disabled={isStreaming || !input.trim()}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-600 text-white disabled:bg-white/10 disabled:text-white/30 rounded-full transition-all flex items-center justify-center hover:bg-blue-500 disabled:cursor-not-allowed"
                      aria-label="Send message"
                  >
                      <Send className="w-5 h-5" />
                  </button>
              </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="group ai-chat-button-pulse ai-chat-button-ripple relative fixed bottom-8 right-8 z-[200] flex items-center justify-center w-16 h-16 bg-black/50 backdrop-blur-xl border border-transparent rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
          aria-label="Open AI Assistant"
        >
          <Sparkles className="w-8 h-8 text-white transition-all duration-300 group-hover:text-blue-400 group-hover:rotate-12" />
        </button>
      )}
    </div>
  );
};