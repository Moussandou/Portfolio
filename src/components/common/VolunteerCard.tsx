import { useState, useEffect } from 'react';
import { volunteering } from '../../data/education';
import { cn } from '../../lib/utils';
import { Heart, Users, ChevronRight, ChevronLeft } from 'lucide-react';

export function VolunteerCard({ className }: { className?: string }) {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-play interval
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % volunteering.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isHovered]);

  return (
    <div 
      className={cn(
        "bento-card group flex flex-col p-8 overflow-hidden relative",
        "bg-[#6B3FA0] text-white shadow-inner border-none",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Decoration */}
      <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/5 rounded-full blur-3xl opacity-50 pointer-events-none" />
      
      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-6">
        <span className="text-xs font-black uppercase tracking-[0.3em] text-white/40 font-display flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-white/30" />
          Impact & Communauté
        </span>
        <Heart size={20} className="text-white/20" />
      </div>

      {/* Content Slideshow */}
      <div className="relative z-10 flex-1 min-h-[0px] w-full flex flex-col justify-center">
        <div className="relative h-full w-full">
          {volunteering.map((vol, idx) => (
            <div 
              key={vol.id} 
              className={cn(
                "absolute inset-0 flex flex-col justify-center transition-all duration-700 ease-in-out",
                idx === current 
                  ? "opacity-100 translate-x-0 pointer-events-auto" 
                  : idx < current 
                    ? "opacity-0 -translate-x-8 pointer-events-none" 
                    : "opacity-0 translate-x-8 pointer-events-none"
              )}
            >
              <div className="flex gap-6 items-start mb-6">
                <div className="flex-shrink-0 w-16 h-16 rounded-[20px] bg-white/90 flex items-center justify-center ring-2 ring-white/10 overflow-hidden shadow-2xl">
                  {vol.logo ? (
                    <img src={vol.logo} alt={vol.organization} className="w-full h-full object-contain p-1.5 group-hover:scale-110 transition-transform duration-700" />
                  ) : (
                    <Users size={32} className="text-white/40" />
                  )}
                </div>
                <div className="flex-1 min-w-0 pt-1">
                  <h4 className="text-lg font-black text-white mb-1 tracking-tight leading-tight">{vol.role}</h4>
                  <p className="text-sm font-bold text-[#D8B4E2] bg-white/10 inline-block px-3 py-1 rounded-full">{vol.organization}</p>
                </div>
              </div>
              
              <div className="flex-1 min-h-0">
                <p className="text-sm text-white/80 font-medium leading-relaxed italic border-l-2 border-white/20 pl-4 mb-5">
                  "{vol.description}"
                </p>
                
                {vol.points && (
                  <ul className="space-y-2.5">
                    {vol.points.slice(0, 3).map((p, i) => (
                      <li key={i} className="flex items-start gap-3 text-[13px] text-white/60 font-medium leading-relaxed">
                        <div className="w-1.5 h-1.5 rounded-full bg-white/30 mt-1.5 shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer / Pagination */}
      <div className="relative z-10 pt-5 mt-4 border-t border-white/5 flex items-center justify-between">
        <div className="flex gap-2">
          {volunteering.map((_, idx) => (
            <button 
              key={idx}
              onClick={() => setCurrent(idx)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                idx === current ? "bg-white w-6" : "bg-white/20 hover:bg-white/40"
              )}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
        
        <div className="flex items-center gap-1 opacity-50 hover:opacity-100 transition-opacity">
          <button 
            onClick={() => setCurrent(prev => (prev === 0 ? volunteering.length - 1 : prev - 1))}
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <button 
            onClick={() => setCurrent(prev => (prev + 1) % volunteering.length)}
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
