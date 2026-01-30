
import { GoogleGenAI, GenerateContentResponse, Content } from "@google/genai";
import { PERSONAL_INFO, SKILLS, PROJECTS, EXPERIENCES, EDUCATIONS } from "../constants";

const getSystemInstruction = () => {
  return `You are a helpful AI assistant for Shahid Himmat Shaikh's portfolio. Your goal is to answer questions about Shahid's professional background, skills, and projects based on the following information. Keep your answers professional, concise, and enthusiastic. Use markdown for formatting (e.g., **bold**, *italic*, lists).
  
  Name: ${PERSONAL_INFO.name}
  Role: ${PERSONAL_INFO.title}
  Summary: ${PERSONAL_INFO.summary}
  Skills: ${SKILLS.map(cat => `* ${cat.name}: ${cat.skills.join(', ')}`).join('\n')}
  Experience: ${EXPERIENCES.map(exp => `* ${exp.role} at ${exp.company} (${exp.period}): ${exp.points.join('. ')}`).join('\n')}
  Projects: ${PROJECTS.map(p => `* ${p.title}: ${p.description}`).join('\n')}
  Education: ${EDUCATIONS.map(edu => `* ${edu.degree} from ${edu.school}`).join('\n')}
  Hobbies: ${PERSONAL_INFO.hobbies.join('. ')}.
  
  If a user asks something outside of Shahid's professional scope, you can briefly and positively mention his hobbies if relevant (e.g., if asked what he does for fun), but your primary goal is to redirect them back to his professional portfolio content. Use Shahid's tone: obsessed with solving hard problems and learning fast.`;
};

// Convert the app's message format to Gemini's Content format
const buildHistory = (messages: { role: 'user' | 'assistant'; content: string }[]): Content[] => {
  return messages.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.content }]
  }));
};

export const streamChatWithGemini = async (messages: { role: 'user' | 'assistant'; content: string }[]) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const fullHistory = buildHistory(messages);

    const response = await ai.models.generateContentStream({
       model: "gemini-3-flash-preview",
       contents: fullHistory,
       config: {
         systemInstruction: getSystemInstruction(),
         temperature: 0.7,
         topP: 0.9,
       },
    });

    return response;
  } catch (error) {
    console.error("Gemini Error:", error);
    async function* errorStream() {
        // FIX: The mock object was missing properties required by the GenerateContentResponse type.
        // Added missing properties and cast to handle class vs. object literal mismatch.
        // This is safe as the component only uses the `text` property.
        const chunk = {
            text: "I'm having trouble connecting right now. Please try again later or reach out to Shahid directly!",
            candidates: [],
            functionCalls: [],
            data: undefined,
            executableCode: undefined,
            codeExecutionResult: undefined,
        };
        yield chunk as unknown as GenerateContentResponse;
    }
    return errorStream();
  }
};
