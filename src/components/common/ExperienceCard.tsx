import { useState } from 'react';
import { experiences } from '../../data/experience';
import { cn } from '../../lib/utils';
import { Briefcase, Calendar, MapPin, Trophy, Target, Sparkles } from 'lucide-react';

export function ExperienceCard({ className }: { className?: string }) {
  const [activeId, setActiveId] = useState(experiences[0].id);

  return (
    <div className={cn(
      "bento-card group flex flex-col p-6 sm:p-8 overflow-hidden relative",
      "bg-[#F0C4DB] shadow-inner border-none",
      className
    )}
    >
      {/* Background Decoration */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#8D4074]/5 rounded-full blur-3xl pointer-events-none transition-transform duration-1000 group-hover:scale-110" />
      
      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-6 sm:mb-8 shrink-0">
        <span className="text-xs font-black uppercase tracking-[0.3em] text-[#8D4074]/50 font-display flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#8D4074]/40" />
          Expériences
        </span>
        <div className="flex gap-1.5 opacity-50">
          <div className="w-1.5 h-1.5 rounded-full bg-[#8D4074]/40" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#8D4074]/60" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#8D4074]" />
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="relative z-10 flex-1 flex flex-col md:flex-row gap-6 md:gap-10 min-h-[0px]">
        
        {/* LEFT COLUMN: Master List */}
        <div className="w-full md:w-[35%] flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-x-visible md:overflow-y-auto custom-scrollbar pb-2 md:pb-0 shrink-0 hide-scrollbar-mobile">
          <div className="flex md:flex-col gap-2 min-w-max md:min-w-0 pr-4 md:pr-2">
            {experiences.map((exp) => {
              const isActive = activeId === exp.id;
              return (
                <button
                  key={exp.id}
                  onClick={() => setActiveId(exp.id)}
                  className={cn(
                    "flex items-center gap-3 sm:gap-4 p-3 rounded-2xl sm:rounded-3xl transition-all duration-300 text-left relative overflow-hidden group/btn flex-shrink-0 md:flex-shrink",
                    isActive 
                      ? "bg-[#8D4074] text-white shadow-xl scale-100 ring-4 ring-[#8D4074]/20" 
                      : "bg-white/40 hover:bg-white/60 text-[#8D4074] hover:scale-[1.02] scale-100"
                  )}
                >
                  {/* Active Indicator Bar (Desktop) */}
                  {isActive && (
                    <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1/2 bg-white rounded-r-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                  )}

                  {/* Icon / Logo */}
                  <div className={cn(
                    "w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 overflow-hidden bg-white/90 shadow-sm transition-transform duration-300",
                    isActive ? "ring-2 ring-white/50 scale-105" : "group-hover/btn:scale-105"
                  )}>
                    {exp.logo ? (
                      <img src={exp.logo} alt={exp.company} className="w-full h-full object-contain p-1.5" />
                    ) : (
                      <Briefcase size={20} className={isActive ? "text-[#8D4074]" : "text-[#8D4074]/60"} />
                    )}
                  </div>
                  
                  {/* Button Text */}
                  <div className="flex flex-col min-w-[120px] md:min-w-0">
                    <span className="font-bold text-[13px] sm:text-sm truncate leading-tight mb-0.5">{exp.company}</span>
                    <span className={cn(
                      "text-[10px] sm:text-[11px] font-semibold truncate flex items-center gap-1",
                      isActive ? "text-white/70" : "text-[#8D4074]/60"
                    )}>
                      {exp.period}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Vertical Divider (Desktop only) */}
        <div className="hidden md:block w-px bg-gradient-to-b from-[#8D4074]/0 via-[#8D4074]/10 to-[#8D4074]/0 shrink-0" />
        
        {/* Horizontal Divider (Mobile only) */}
        <div className="block md:hidden h-px bg-gradient-to-r from-[#8D4074]/0 via-[#8D4074]/10 to-[#8D4074]/0 shrink-0 -my-2" />

        {/* RIGHT COLUMN: Details View */}
        <div className="relative w-full md:w-[65%] flex-1 min-h-[250px] md:min-h-[0px] overflow-hidden">
          {experiences.map((exp) => (
            <div 
              key={exp.id} 
              className={cn(
                "absolute inset-0 flex flex-col pt-2 md:pt-0 overflow-y-auto pr-2 custom-scrollbar transition-all duration-500",
                activeId === exp.id 
                  ? "opacity-100 translate-y-0 pointer-events-auto" 
                  : "opacity-0 translate-y-8 pointer-events-none"
              )}
            >
              {/* Role & Badges */}
              <div className="mb-5 sm:mb-6 shrink-0">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-[#3a1a2a] tracking-tight leading-none mb-3">
                  {exp.role}
                </h3>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[10px] sm:text-xs font-bold text-[#8D4074]">
                  <span className="bg-[#8D4074]/10 px-2.5 py-1 rounded-md uppercase tracking-wider">{exp.type}</span>
                  <span className="flex items-center gap-1 bg-white/40 px-2.5 py-1 rounded-md"><MapPin size={12}/> {exp.location}</span>
                  <span className="flex items-center gap-1 bg-white/40 px-2.5 py-1 rounded-md md:hidden"><Calendar size={12}/> {exp.period}</span>
                </div>
              </div>

              {/* Description summary */}
              <p className="text-xs sm:text-sm font-medium text-[#5a2848]/80 mb-6 italic border-l-2 border-[#8D4074] pl-4 shrink-0">
                "{exp.description}"
              </p>

              <div className="flex-1 space-y-6">
                {/* Key Points */}
                {exp.points && exp.points.length > 0 && (
                  <div>
                    <h4 className="flex items-center gap-2 text-xs font-black uppercase text-[#8D4074]/60 tracking-widest mb-3">
                      <Target size={14} /> Missions clés
                    </h4>
                    <ul className="grid gap-2.5">
                      {exp.points.map((point, i) => (
                        <li key={i} className="flex items-start gap-3 text-[13px] sm:text-sm font-medium text-[#3a1a2a]">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#8D4074]/40 mt-1.5 shrink-0" />
                          <span className="leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Achievements */}
                {exp.achievements && exp.achievements.length > 0 && (
                  <div className="bg-white/30 rounded-2xl p-4 sm:p-5 ring-1 ring-white/50">
                    <h4 className="flex items-center gap-2 text-xs font-black uppercase text-[#8D4074] tracking-widest mb-3">
                      <Trophy size={14} className="text-[#8D4074]" /> Succès
                    </h4>
                    <ul className="grid gap-2.5">
                      {exp.achievements.map((ach, i) => (
                        <li key={i} className="flex items-start gap-3 text-[12px] sm:text-[13px] font-bold text-[#3a1a2a]">
                          <Sparkles size={14} className="text-[#8D4074] mt-0.5 shrink-0" />
                          <span className="leading-relaxed">{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Skills tags */}
                {exp.skills && exp.skills.length > 0 && (
                  <div className="pt-2 flex flex-wrap gap-2 pb-4">
                    {exp.skills.map((skill, i) => (
                      <span key={i} className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg bg-white/50 text-[#8D4074] shadow-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
