import React, { useState, useEffect, useRef } from 'react';
// FIX: Import the 'User' icon from lucide-react to resolve the 'Cannot find name' error.
import { 
  Github, Linkedin, Mail, MapPin, Phone, Instagram, 
  ExternalLink, GraduationCap, Briefcase, Award, 
  Cpu, Code, Lightbulb, ChevronRight, Terminal, 
  Zap, Brain, Layers, Activity, Smartphone, Globe, ArrowRight,
  Server, Database, Cloud, Command, FileText, Check, Copy, Menu, X, User
} from 'lucide-react';
import { PERSONAL_INFO, SKILLS, PROJECTS, EXPERIENCES, EDUCATIONS } from './constants.tsx';
import { SectionHeader } from './components/SectionHeader';
import { AIChat } from './components/AIChat';

const useReveal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
};

const RevealBox: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className = "", delay = 0 }) => {
  const { ref, isVisible } = useReveal();
  return (
    <div 
      ref={ref} 
      className={`${className} transition-all duration-1000 ${isVisible ? 'reveal-visible' : 'reveal-hidden'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [toast, setToast] = useState<{ message: string; show: boolean }>({ message: '', show: false });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
  }, [isMenuOpen]);

  const showToast = (message: string) => {
    setToast({ message, show: true });
    setTimeout(() => setToast({ message: '', show: false }), 3000);
  };

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Account for fixed header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleConnect = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(PERSONAL_INFO.email).then(() => {
      showToast("Email copied! Opening mail client...");
      setTimeout(() => {
        window.location.href = `mailto:${PERSONAL_INFO.email}`;
      }, 500);
    });
  };
  
  const navLinks = [
    { label: 'System_Specs', id: 'about' },
    { label: 'Computation_Matrix', id: 'skills' },
    { label: 'Operational_History', id: 'experience' },
    { label: 'Production_Logs', id: 'projects' },
    { label: 'Open_Node', id: 'contact' }
  ];

  return (
    <div className="min-h-screen selection:bg-blue-500/40 selection:text-white bg-transparent text-white font-sans">
      <AIChat />
      
      {/* Toast Notification */}
      <div className={`fixed top-24 left-1/2 -translate-x-1/2 z-[1000] transition-all duration-500 ${toast.show ? 'translate-y-0 opacity-100' : '-translate-y-12 opacity-0 pointer-events-none'}`}>
        <div className="bg-blue-600/90 backdrop-blur-xl border border-white/20 px-6 py-3 md:px-8 md:py-4 rounded-2xl shadow-2xl flex items-center gap-4">
          <Check className="w-5 h-5 text-white" />
          <span className="text-xs md:text-sm font-black uppercase tracking-widest">{toast.message}</span>
        </div>
      </div>

      {/* Subtle Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.15] z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${scrolled || isMenuOpen ? 'bg-black/50 backdrop-blur-3xl border-b border-white/10 shadow-2xl' : 'bg-transparent'} ${scrolled ? 'py-3' : 'py-6'}`}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-white text-black rounded-lg flex items-center justify-center font-black text-xl tracking-tighter shadow-2xl group-hover:rotate-12 transition-transform duration-500">
              S
            </div>
            <div className="flex flex-col">
              <span className="font-black text-base md:text-lg leading-none text-white tracking-tighter uppercase group-hover:text-blue-500 transition-colors">Shahid Shaikh</span>
              <span className="text-[9px] md:text-[10px] font-bold text-blue-400 tracking-[0.2em] uppercase mt-0.5">AI Engineer</span>
            </div>
          </div>
          
          <div className="hidden lg:flex gap-12 text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
            {navLinks.map((item) => (
              <button 
                type="button"
                key={item.id} 
                onClick={() => scrollToSection(item.id)} 
                className="hover:text-white transition-all relative group flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 scale-0 group-hover:scale-100 transition-transform"></span>
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden lg:block">
            <button 
              type="button"
              onClick={handleConnect}
              className="px-6 py-2.5 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-full transition-all hover:bg-blue-600 hover:text-white hover:scale-105 shadow-2xl"
            >
              Connect_Req
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-white"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[99] bg-black/80 backdrop-blur-3xl transition-opacity duration-500 lg:hidden ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <button onClick={() => setIsMenuOpen(false)} className="absolute top-8 right-8 p-2 text-white/70 hover:text-white transition-colors">
                  <X className="w-8 h-8"/>
              </button>
              <div className="flex flex-col gap-10">
                  {navLinks.map((item, i) => (
                      <button
                          type="button"
                          key={item.id}
                          onClick={() => scrollToSection(item.id)}
                          className={`text-2xl font-black uppercase tracking-[0.2em] text-white/60 hover:text-white transition-all transform hover:scale-110 duration-300 ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
                          style={{transitionDelay: `${i * 100 + 200}ms`}}
                      >
                          {item.label}
                      </button>
                  ))}
              </div>
              <button
                  type="button"
                  onClick={handleConnect}
                  className={`mt-16 px-8 py-4 bg-blue-600 text-white text-sm font-black uppercase tracking-[0.2em] rounded-full transition-all hover:bg-blue-500 hover:scale-105 shadow-2xl ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
                  style={{transitionDelay: '800ms'}}
              >
                  Connect_Req
              </button>
          </div>
      </div>


      <main className="relative z-10">
        {/* Hero Section */}
        <section id="hero" className="relative min-h-screen flex items-center px-4 sm:px-8 pt-32 md:pt-48 overflow-hidden">
          <div className="max-w-[1400px] mx-auto w-full grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <div className="relative z-10 space-y-8 md:space-y-10">
              <RevealBox delay={100}>
                <div className="inline-flex items-center gap-3 px-4 py-2 md:px-5 md:py-2.5 rounded-full bg-white/5 backdrop-blur-3xl border border-white/10 text-white text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl">
                  <Command className="w-4 h-4 text-blue-400 animate-pulse" />
                  <span>Booting Environment...</span>
                </div>
              </RevealBox>
              
              <RevealBox delay={300}>
                <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[10rem] font-black text-white leading-[0.85] tracking-tighter drop-shadow-2xl">
                  SYSTEM <br/> 
                  <span className="text-gradient-ai hover-glitch cursor-default">ARCHITECTURE</span> <br/>
                  OPTIMIZED.
                </h1>
              </RevealBox>

              <RevealBox delay={500}>
                <p className="text-white/80 text-base md:text-xl max-w-xl leading-relaxed font-semibold">
                  Designing high-throughput intelligent systems at the junction of <span className="text-white underline decoration-blue-500 underline-offset-4">Neural Layers</span> and performant <span className="text-white">Software Infrastructure</span>.
                </p>
              </RevealBox>

              <RevealBox delay={700}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-6">
                  <button 
                    type="button"
                    onClick={() => scrollToSection('projects')}
                    className="px-8 py-5 md:px-12 md:py-6 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl transition-all flex items-center justify-center gap-4 text-[11px] uppercase tracking-[0.2em] shadow-2xl hover:scale-105 active:scale-95 group w-full sm:w-auto"
                  >
                    View Projects <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </button>
                  
                  <div className="flex items-center gap-8 pl-4">
                    {[
                      { icon: <Github />, link: PERSONAL_INFO.links.github },
                      { icon: <Linkedin />, link: PERSONAL_INFO.links.linkedin },
                      { icon: <Instagram />, link: PERSONAL_INFO.links.instagram }
                    ].map((social, i) => (
                      <a key={i} href={social.link} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white hover:scale-125 transition-all duration-300 drop-shadow-xl">
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </RevealBox>
            </div>

            <div className="relative hidden lg:block">
              <RevealBox delay={400}>
                <div className="relative w-full aspect-square max-w-[550px] ml-auto p-12 group">
                  <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl rounded-[3rem] border border-white/10 overflow-hidden group-hover:border-white/30 transition-all duration-1000 shadow-2xl">
                     <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent"></div>
                     <div className="h-full w-full opacity-40 mix-blend-overlay bg-cover bg-center transform group-hover:scale-110 transition-transform duration-1000" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1620712943543-bcc4628c6789?auto=format&fit=crop&q=80&w=800')` }}></div>
                  </div>
                  
                  <div className="absolute top-0 right-0 p-8">
                    <div className="bg-black/60 backdrop-blur-3xl border border-white/10 p-8 rounded-3xl space-y-4 shadow-2xl animate-float">
                      <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-[11px] font-black text-white uppercase tracking-widest">System_Status: Stable</span>
                      </div>
                      <div className="space-y-2">
                         <div className="h-1.5 w-40 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 w-[94%] transition-all duration-1000 delay-500"></div>
                         </div>
                         <div className="h-1.5 w-28 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-purple-500 w-[88%] transition-all duration-1000 delay-700"></div>
                         </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-12 left-0">
                     <div className="bg-black/60 backdrop-blur-3xl border border-white/10 p-10 rounded-[3rem] shadow-2xl max-w-[320px] group-hover:-translate-y-6 transition-transform duration-500">
                        <div className="flex gap-5 mb-6">
                          <Server className="w-10 h-10 text-blue-400" />
                          <Database className="w-10 h-10 text-purple-400" />
                        </div>
                        <h4 className="text-white font-black text-sm uppercase tracking-widest mb-3">Core Infrastructure</h4>
                        <p className="text-white/60 text-[11px] leading-relaxed font-medium">Optimization of high-density computational pipelines and production modules.</p>
                     </div>
                  </div>
                </div>
              </RevealBox>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-4 sm:px-8 relative bg-black/40 backdrop-blur-3xl">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 md:gap-20 items-center">
              <div>
                <SectionHeader title="System_Specs" icon={<User className="w-5 h-5"/>} subtitle="Architect_Identity" />
                <div className="space-y-8">
                  <RevealBox delay={100}>
                    <p className="text-3xl md:text-5xl font-bold text-white leading-tight tracking-tight">
                      Hi, I'm <span className="text-blue-500">Shahid</span> — Architecting <span className="text-blue-500 relative inline-block">scalable logic<span className="absolute bottom-1 left-0 w-full h-[4px] bg-blue-500/30"></span></span> for real-world AI systems.
                    </p>
                  </RevealBox>
                  <RevealBox delay={300}>
                    <p className="text-white/70 text-lg md:text-xl leading-relaxed font-medium max-w-2xl">
                      My development workflow is built on system integrity and performance. I bridge the gap between abstract computational models and deployed software architecture.
                    </p>
                  </RevealBox>
                  <RevealBox delay={500}>
                    <a 
                      href={PERSONAL_INFO.links.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-4 px-6 py-4 md:px-8 md:py-4 bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-white/10 rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-[0.2em] transition-all group"
                    >
                      <FileText className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                      Download Manifest
                    </a>
                  </RevealBox>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 md:gap-10">
                {[
                  { label: 'Uptime', val: '24/7', desc: 'Execution Speed' },
                  { label: 'Integrity', val: '8.42', desc: 'Current CGPA' },
                  { label: 'Build', val: 'V4.2', desc: 'Stable Config' },
                  { label: 'Throughput', val: '99.9%', desc: 'Optimization' }
                ].map((stat, i) => (
                  <RevealBox key={i} delay={i * 150}>
                    <div className="bg-white/5 backdrop-blur-3xl p-6 md:p-12 rounded-3xl border border-white/10 group hover:border-blue-500/40 transition-all hover:-translate-y-2 md:hover:-translate-y-4 duration-500 overflow-hidden relative">
                      <div className="absolute -right-5 -bottom-5 w-16 h-16 md:w-24 md:h-24 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors"></div>
                      <p className="text-white/30 text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] mb-3">{stat.label}</p>
                      <p className="text-4xl md:text-5xl font-black text-white mb-2 group-hover:scale-110 origin-left transition-transform">{stat.val}</p>
                      <p className="text-[10px] md:text-[11px] font-bold text-blue-400 uppercase tracking-widest">{stat.desc}</p>
                    </div>
                  </RevealBox>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 px-4 sm:px-8">
          <div className="max-w-[1400px] mx-auto">
            <SectionHeader title="Computation_Matrix" icon={<Cpu className="w-5 h-5"/>} subtitle="Logic_Resource_Map" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
              {SKILLS.map((category, idx) => (
                <RevealBox key={idx} delay={idx * 100}>
                  <div className="bg-white/5 backdrop-blur-3xl p-8 md:p-14 h-full rounded-3xl border border-white/10 hover:border-blue-500/50 transition-all group overflow-hidden relative shadow-2xl">
                    <div className="absolute top-0 right-0 p-10 opacity-0 group-hover:opacity-10 transition-all duration-700 translate-x-4 group-hover:translate-x-0">
                      <Code className="w-24 h-24 text-blue-500" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black text-white mb-12 tracking-tighter uppercase group-hover:text-blue-400 transition-colors">{category.name}</h3>
                    <div className="flex flex-wrap gap-3 md:gap-4">
                      {category.skills.map((skill, sIdx) => (
                        <span key={sIdx} className="px-4 py-2 md:px-5 md:py-2.5 bg-white/5 text-white/70 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl border border-white/10 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all hover:scale-105">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </RevealBox>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20 px-4 sm:px-8 bg-black/40 backdrop-blur-3xl">
          <div className="max-w-[1400px] mx-auto">
            <SectionHeader title="Operational_History" icon={<Layers className="w-5 h-5"/>} subtitle="Execution_Logs" />
            <div className="grid gap-12 md:gap-16">
              {EXPERIENCES.map((exp, idx) => (
                <RevealBox key={idx} delay={idx * 150}>
                  <div className="group relative flex flex-col lg:flex-row gap-8 md:gap-12 p-8 md:p-14 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl hover:border-blue-500/40 transition-all duration-700 shadow-2xl">
                    <div className="absolute left-0 top-0 w-2 h-0 bg-blue-600 group-hover:h-full transition-all duration-1000 rounded-l-full"></div>
                    
                    <div className="lg:w-1/3">
                        <p className="text-blue-400 font-black text-[11px] md:text-[12px] uppercase tracking-[0.4em] mb-4">{exp.period}</p>
                        <h4 className="text-white font-black text-2xl md:text-3xl tracking-tight uppercase group-hover:translate-x-4 transition-transform leading-snug">
                          {exp.role}
                        </h4>
                        <p className="text-white/60 font-bold text-lg mt-3">{exp.company}</p>
                        <div className="flex items-center gap-3 mt-4 text-white/30">
                          <MapPin className="w-4 h-4" />
                          <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest">{exp.location}</span>
                        </div>
                        {exp.offerLetter && (
                          <div className="mt-8">
                            <a 
                              href={exp.offerLetter} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-3 px-6 py-3 bg-blue-600/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-blue-600 hover:text-white transition-all group/offer"
                            >
                              <FileText className="w-4 h-4 group-hover/offer:scale-110 transition-transform" />
                              View Offer Letter
                            </a>
                          </div>
                        )}
                    </div>
                    <div className="lg:w-2/3 space-y-6 md:space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                          {exp.points.map((point, pIdx) => (
                            <div key={pIdx} className="flex gap-4 md:gap-6 p-6 md:p-8 bg-black/40 rounded-3xl border border-white/5 group-hover:border-white/20 transition-all">
                              <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-blue-600 rounded-full mt-2 shrink-0 group-hover:scale-150 transition-transform shadow-[0_0_15px_rgba(37,99,235,0.6)]"></div>
                              <p className="text-white/60 text-sm leading-relaxed font-medium group-hover:text-white transition-colors">{point}</p>
                            </div>
                          ))}
                        </div>
                    </div>
                  </div>
                </RevealBox>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 px-4 sm:px-8">
          <div className="max-w-[1400px] mx-auto">
            <SectionHeader title="Production_Logs" icon={<Zap className="w-5 h-5"/>} subtitle="System_Outputs" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {PROJECTS.map((project, idx) => (
                <RevealBox key={idx} delay={idx * 150}>
                  <div className="group h-full flex flex-col bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl overflow-hidden transition-all duration-1000 hover:border-blue-500 md:hover:-translate-y-10 shadow-2xl">
                    <div className="h-60 sm:h-72 relative overflow-hidden">
                       <img 
                        src={project.imageUrl || `https://images.unsplash.com/photo-${1550000000000 + idx}?auto=format&fit=crop&q=80&w=600`} 
                        alt={project.title}
                        className="w-full h-full object-cover opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-[1.5s]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
                      <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 3).map((tech, tIdx) => (
                            <span key={tIdx} className="px-4 py-1.5 bg-black/80 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-black text-blue-400 uppercase tracking-widest group-hover:bg-blue-600 group-hover:text-white transition-colors">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="p-8 md:p-10 flex-1 flex flex-col">
                      <h3 className="text-2xl md:text-3xl font-black text-white mb-4 tracking-tighter uppercase group-hover:text-blue-400 transition-colors">{project.title}</h3>
                      <p className="text-white/60 text-sm md:text-base leading-relaxed mb-10 flex-1 font-medium">{project.description}</p>
                      
                      {project.link ? (
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-full py-5 bg-white/5 hover:bg-blue-600 text-white font-black rounded-2xl transition-all flex items-center justify-center gap-5 text-[11px] uppercase tracking-[0.3em] group/btn shadow-2xl border border-white/10"
                        >
                          ACCESS_BUILD <ExternalLink className="w-5 h-5 group-hover/btn:rotate-12 transition-transform" />
                        </a>
                      ) : (
                        <div className="w-full py-5 bg-black/60 text-white/20 font-black rounded-2xl flex items-center justify-center gap-5 text-[11px] uppercase tracking-[0.3em] border border-white/5 cursor-not-allowed">
                          PRIVATE_REPO <Lock className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                  </div>
                </RevealBox>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4 sm:px-8 relative overflow-hidden">
          <div className="max-w-[1400px] mx-auto relative z-10">
            <RevealBox>
              <div className="text-center max-w-5xl mx-auto space-y-12 md:space-y-16">
                 <h2 className="text-6xl sm:text-7xl md:text-9xl lg:text-[11rem] font-black text-white tracking-tighter leading-[0.8] drop-shadow-2xl">
                  OPEN <br/> 
                  <span className="text-blue-500 hover-glitch cursor-default tracking-[-0.05em]">NODE_01.</span>
                 </h2>
                 
                 <p className="text-white text-xl sm:text-2xl md:text-4xl font-bold max-w-3xl mx-auto leading-tight opacity-90">
                   Awaiting high-impact collaboration. Active search for senior engineering roles and R&D partnerships initiated.
                 </p>

                 <div className="flex flex-col items-center justify-center gap-8 md:gap-14 pt-8 md:pt-12">
                    <button 
                      type="button"
                      onClick={handleConnect}
                      className="w-full md:w-auto px-10 py-8 md:px-20 md:py-10 bg-white text-black font-black rounded-2xl hover:bg-blue-600 hover:text-white hover:scale-105 transition-all flex items-center justify-center gap-6 md:gap-8 text-base md:text-lg uppercase tracking-[0.3em] md:tracking-[0.4em] shadow-2xl active:scale-95 group"
                    >
                      <Mail className="w-7 h-7 md:w-8 md:h-8 group-hover:animate-bounce" /> Connect Port
                    </button>

                    <a 
                      href={`tel:${PERSONAL_INFO.phone.replace(/[^0-9+]/g, '')}`} 
                      className="w-full md:w-auto px-10 py-8 md:px-20 md:py-10 bg-white/5 border border-white/10 text-white font-black rounded-2xl hover:bg-blue-500 hover:border-blue-500 hover:scale-105 transition-all flex items-center justify-center gap-6 md:gap-8 text-base md:text-lg uppercase tracking-[0.3em] md:tracking-[0.4em] shadow-2xl active:scale-95 group"
                    >
                      <Phone className="w-7 h-7 md:w-8 md:h-8 group-hover:rotate-12 transition-transform" /> Voice Protocol
                    </a>
                 </div>

                 <div className="flex justify-center gap-6 md:gap-12 pt-10">
                    <a href={PERSONAL_INFO.links.linkedin} target="_blank" rel="noopener noreferrer" className="p-6 md:p-10 bg-white/5 border border-white/10 backdrop-blur-3xl text-white rounded-3xl hover:border-blue-500 hover:-translate-y-2 transition-all duration-700 shadow-2xl">
                      <Linkedin className="w-7 h-7 md:w-8 md:h-8" />
                    </a>
                    <a href={PERSONAL_INFO.links.github} target="_blank" rel="noopener noreferrer" className="p-6 md:p-10 bg-white/5 border border-white/10 backdrop-blur-3xl text-white rounded-3xl hover:border-blue-500 hover:-translate-y-2 transition-all duration-700 shadow-2xl">
                      <Github className="w-7 h-7 md:w-8 md:h-8" />
                    </a>
                    <a href={PERSONAL_INFO.links.instagram} target="_blank" rel="noopener noreferrer" className="p-6 md:p-10 bg-white/5 border border-white/10 backdrop-blur-3xl text-white rounded-3xl hover:border-blue-500 hover:-translate-y-2 transition-all duration-700 shadow-2xl">
                      <Instagram className="w-7 h-7 md:w-8 md:h-8" />
                    </a>
                 </div>
              </div>
            </RevealBox>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-16 md:py-20 bg-black/60 backdrop-blur-3xl border-t border-white/10 px-4 sm:px-8 relative z-10">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-12 md:gap-16">
          <div className="space-y-4 text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="w-10 h-10 bg-white text-black rounded-lg flex items-center justify-center font-black text-lg shadow-2xl">S</div>
              <span className="font-black text-lg tracking-[0.4em] text-white uppercase">Shahid Shaikh</span>
            </div>
            <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.3em] leading-relaxed">
              Engineered in India. <br/> System Build 4.2.5 // Terminal Secure.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <button type="button" onClick={() => scrollToSection('about')} className="text-white/30 hover:text-white text-[11px] font-black uppercase tracking-[0.4em] transition-all relative group">
              Specs
              <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-blue-500 group-hover:w-full transition-all"></span>
            </button>
            <button type="button" onClick={() => scrollToSection('experience')} className="text-white/30 hover:text-white text-[11px] font-black uppercase tracking-[0.4em] transition-all relative group">
              History
              <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-blue-500 group-hover:w-full transition-all"></span>
            </button>
            <button type="button" onClick={() => scrollToSection('projects')} className="text-white/30 hover:text-white text-[11px] font-black uppercase tracking-[0.4em] transition-all relative group">
              Logs
              <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-blue-500 group-hover:w-full transition-all"></span>
            </button>
            <button type="button" onClick={handleConnect} className="text-white/30 hover:text-white text-[11px] font-black uppercase tracking-[0.4em] transition-all relative group">
              Sync
              <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-blue-500 group-hover:w-full transition-all"></span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

const Lock = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

// We need to keep this custom User icon component as it's used in the SectionHeader component
const UserIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export default App;