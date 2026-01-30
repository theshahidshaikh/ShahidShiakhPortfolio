
import React, { useEffect, useRef, useState } from 'react';
import { User } from 'lucide-react'; // Import User from lucide-react

interface SectionHeaderProps {
  title: string;
  icon?: React.ReactNode;
  subtitle?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, icon, subtitle }) => {
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

  return (
    <div ref={ref} className={`mb-8 md:mb-12 relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="flex flex-col gap-4 group">
        <div className="flex items-center gap-3 text-xs font-mono font-bold tracking-[0.3em] text-blue-500 uppercase">
          {icon && <span className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">{icon}</span>}
          <span className="relative overflow-hidden">
            {subtitle || "Module_Execution"}
            <span className={`absolute bottom-0 left-0 h-[1px] bg-blue-500 transition-all duration-1000 ${isVisible ? 'w-full' : 'w-0'}`}></span>
          </span>
        </div>
        <div className="relative">
          <h2 className="text-4xl md:text-7xl font-extrabold tracking-tighter text-white">
            {title}
          </h2>
          <div className={`h-[2px] bg-gradient-to-r from-blue-500 via-purple-600 to-transparent mt-4 transition-all duration-1000 delay-300 ${isVisible ? 'w-32 md:w-48' : 'w-0'}`}></div>
        </div>
      </div>
    </div>
  );
};
