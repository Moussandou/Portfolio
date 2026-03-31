import { useState } from 'react';
import { education, certifications } from '../../data/education';
import { cn } from '../../lib/utils';
import { GraduationCap, Award, ScrollText, Calendar, ExternalLink } from 'lucide-react';

export function EducationCard({ className }: { className?: string }) {
  const [activeTab, setActiveTab] = useState<'formation' | 'certifications'>('formation');

  return (
    <div className={cn(
      "bento-card group flex flex-col p-8 overflow-hidden relative",
      "bg-[#A85D8E] text-white shadow-2xl border-none",
      className
    )}
    >
      {/* Background Decoration */}
      <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      
      {/* Header with Tabs */}
      <div className="relative z-10 flex flex-col gap-4 mb-4">
        <span className="text-xs font-black uppercase tracking-[0.3em] text-white/50 font-display flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-white/40" />
          Cursus & Certifs
        </span>
        
        {/* Toggle Pills */}
        <div className="flex items-center gap-1 p-1 bg-white/10 rounded-full ring-1 ring-white/20 self-start">
          <button
            onClick={() => setActiveTab('formation')}
            className={cn(
              "px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-300",
              activeTab === 'formation' ? "bg-white text-[#A85D8E] shadow-sm" : "text-white/60 hover:text-white hover:bg-white/5"
            )}
          >
            Formation
          </button>
          <button
            onClick={() => setActiveTab('certifications')}
            className={cn(
              "px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-300",
              activeTab === 'certifications' ? "bg-white text-[#A85D8E] shadow-sm" : "text-white/60 hover:text-white hover:bg-white/5"
            )}
          >
            Certifications
          </button>
        </div>
      </div>

      {/* Content Container (Fixed Height + Flex) */}
      <div className="relative z-10 flex-1 min-h-[0px] flex flex-col justify-center">
        
        <div className="relative w-full h-full">
          {/* FORMATION CONTENT */}
          <div 
            className={cn(
              "transition-all duration-500 absolute inset-0 flex flex-col justify-start gap-4 overflow-y-auto custom-scrollbar pr-2 pb-4",
              activeTab === 'formation' ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
            )}
          >
            {education.map((edu) => (
              <div key={edu.id} className="flex gap-4 sm:gap-5 items-center group/item hover:bg-white/5 p-3 -mx-3 rounded-2xl transition-colors">
                <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/90 flex items-center justify-center overflow-hidden ring-2 ring-white/5 shadow-xl">
                  {edu.logo ? (
                    <img src={edu.logo} alt={edu.school} className="w-full h-full object-contain p-1.5 group-hover/item:scale-110 transition-transform duration-500" />
                  ) : (
                    <GraduationCap size={24} className="text-white/40" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-white mb-0.5 truncate">{edu.degree}</h4>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <p className="text-[11px] font-medium text-white/70 truncate">{edu.school}</p>
                    <span className="text-[9px] font-black text-white/40 whitespace-nowrap bg-white/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Calendar size={10} /> {edu.period}
                    </span>
                  </div>
                  {/* Skills Row */}
                  <div className="flex flex-wrap gap-1.5">
                    {edu.skills.slice(0, 4).map((skill, si) => (
                      <span key={si} className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-white/10 text-white/80 ring-1 ring-white/5 shadow-sm">
                        {skill}
                      </span>
                    ))}
                    {edu.skills.length > 4 && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md text-white/40">+{edu.skills.length - 4}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CERTIFICATIONS CONTENT */}
          <div 
            className={cn(
              "transition-all duration-500 absolute inset-0 flex flex-col justify-start gap-4 overflow-y-auto custom-scrollbar pr-2 pb-4",
              activeTab === 'certifications' ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
            )}
          >
            {certifications.map((cert) => (
              <div key={cert.id} className="group/cert flex items-center justify-between gap-4 p-3 -mx-3 rounded-2xl hover:bg-white/5 transition-all outline-none">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/90 flex items-center justify-center overflow-hidden shadow-inner ring-1 ring-white/20">
                    {cert.logo ? (
                      <img src={cert.logo} alt={cert.issuer} className="w-full h-full object-contain p-1.5 group-hover/cert:opacity-80 transition-opacity" />
                    ) : (
                      <Award size={20} className="text-white/30" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[13px] font-bold text-white leading-tight truncate mb-1">{cert.title}</h4>
                    <p className="text-[11px] font-medium text-white/50 truncate border-b border-transparent inline-block pb-0.5">{cert.issuer} · {cert.date}</p>
                  </div>
                </div>
                {cert.link && (
                  <a 
                    href={cert.link} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex-shrink-0 p-2.5 rounded-full bg-white/10 text-white/60 hover:text-white hover:bg-white/20 hover:scale-110 active:scale-95 transition-all shadow-md"
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
      
      {/* Decorative floating icon */}
      <ScrollText size={100} className="absolute -bottom-6 -right-6 text-white/5 -rotate-12 pointer-events-none" />
    </div>
  );
}
