import { useState, useEffect } from 'react';
import { volunteering } from '../../data/education';
import { cn } from '../../lib/utils';
import { Heart, Users, ChevronRight, ChevronLeft } from 'lucide-react';
import { useI18n } from '../../context/I18nContext';

export function VolunteerCard({ className }: { className?: string }) {
  const { t, language } = useI18n();
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
          {t('common.volunteerCard.impact_community')}
        </span>
        <Heart size={20} className="text-white/20" />
      </div>

      {/* Content Slideshow */}
      <div className="relative z-10 flex-1 min-h-[0px] w-full flex flex-col justify-center">
        <div className="relative h-full w-full">
          {volunteering.map((vol, idx) => {
            const role = language === 'fr' ? vol.roleFr : vol.roleEn;
            const description = language === 'fr' ? vol.descriptionFr : vol.descriptionEn;
            const points = language === 'fr' ? vol.pointsFr : vol.pointsEn;

            return (
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
                <div className="flex gap-4 items-center mb-3">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/95 flex items-center justify-center ring-1 ring-white/10 overflow-hidden shadow-md">
                    {vol.logo ? (
                      <img src={vol.logo} alt={vol.organization} className="w-full h-full object-contain p-1.5 group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <Users size={24} className="text-white/40" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base font-black text-white tracking-tight leading-tight">{role}</h4>
                    <p className="text-xs font-bold text-[#D8B4E2] bg-white/10 inline-block px-2.5 py-0.5 rounded-full mt-1">{vol.organization}</p>
                  </div>
                </div>
                
                <div className="flex-1 min-h-0">
                  <p className="text-xs text-white/80 font-medium leading-relaxed italic border-l-2 border-white/20 pl-3 mb-3">
                    "{description}"
                  </p>
                  
                  {points && (
                    <ul className="space-y-1.5">
                      {points.slice(0, 2).map((p, i) => (
                        <li key={i} className="flex items-start gap-2 text-[12px] text-white/70 font-medium leading-normal">
                          <div className="w-1 h-1 rounded-full bg-white/40 mt-1.5 shrink-0" />
                          <span className="line-clamp-1">{p}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
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
