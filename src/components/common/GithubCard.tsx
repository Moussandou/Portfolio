import { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { Github, Sparkles, ExternalLink, BookOpen, Users } from 'lucide-react';

interface GithubCardProps {
  className?: string;
}

export function GithubCard({ className }: GithubCardProps) {
  const [stats, setStats] = useState({ repos: 0, followers: 0, following: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.github.com/users/Moussandou')
      .then(res => res.json())
      .then(data => {
        if (data.public_repos !== undefined) {
          setStats({
            repos: data.public_repos,
            followers: data.followers,
            following: data.following
          });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div 
      className={cn("bento-card group h-full flex flex-col justify-between overflow-hidden relative", className)}
      style={{ background: '#24292e' }} // GitHub dark color
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-1 font-display">
              Social Profile
            </p>
            <h3 className="text-xl font-bold text-white font-display leading-tight">
              GitHub
            </h3>
          </div>
          <div className="p-2.5 rounded-2xl bg-white/10 ring-1 ring-white/10 shadow-inner">
            <Github className="text-white/80 w-5 h-5" />
          </div>
        </div>

        {/* Profile & Stats Container - FLEXIBLE */}
        <div className="flex-1 min-h-[0px] flex flex-col justify-center gap-4">
          {/* Profile Info */}
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              <div className="w-14 h-14 rounded-2xl border-2 border-white/10 overflow-hidden shadow-2xl skew-x-[-2deg] rotate-[-2deg]">
                <img 
                  src="https://github.com/moussandou.png" 
                  alt="Moussandou" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-lg bg-white flex items-center justify-center shadow-lg transform rotate-12">
                <Sparkles size={12} className="text-[#24292e]" />
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold text-lg leading-tight">Moussandou</h4>
              <p className="text-white/40 text-[11px] mt-1 font-medium italic">@moussandou</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-2">
            <div className="flex-1 p-2 rounded-xl bg-white/5 ring-1 ring-white/5 flex flex-col items-center justify-center">
              <span className="text-[9px] font-black text-white/30 uppercase tracking-tight flex items-center gap-1"><BookOpen size={10}/> Projets</span>
              <span className="text-sm font-bold text-white leading-none mt-1">
                {loading ? "..." : stats.repos}
              </span>
            </div>
            <div className="flex-1 p-2 rounded-xl bg-white/5 ring-1 ring-white/5 flex flex-col items-center justify-center">
              <span className="text-[9px] font-black text-white/30 uppercase tracking-tight flex items-center gap-1"><Users size={10}/> Followers</span>
              <span className="text-sm font-bold text-white leading-none mt-1">
                {loading ? "..." : stats.followers}
              </span>
            </div>
            <div className="flex-1 p-2 rounded-xl bg-white/5 ring-1 ring-white/5 flex flex-col items-center justify-center">
              <span className="text-[9px] font-black text-white/30 uppercase tracking-tight flex items-center gap-1"><Users size={10}/> Abonnements</span>
              <span className="text-sm font-bold text-white leading-none mt-1">
                {loading ? "..." : stats.following}
              </span>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-4">
          <a 
            href="https://github.com/Moussandou" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group/btn w-full py-2.5 rounded-xl bg-white text-[#24292e] text-[10px] font-black uppercase tracking-[0.15em] flex items-center justify-center gap-2 hover:bg-[#8D4074] hover:text-white transition-all active:scale-[0.97] shadow-lg font-display"
          >
            <span>Voir le Profil</span>
            <ExternalLink size={13} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
}
