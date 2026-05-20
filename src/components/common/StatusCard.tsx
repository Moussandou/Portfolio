import { useState, useEffect } from 'react';
import { useI18n } from '../../context/I18nContext';
import { Clock, MapPin, Sparkles, Activity } from 'lucide-react';

export function StatusCard() {
  const { language, t } = useI18n();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString(language === 'fr' ? 'fr-FR' : 'en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  const statusTitle = language === 'fr' ? 'Statut en Direct' : 'Live Status';
  const statusActivity = language === 'fr' ? '💻 Développe de nouvelles idées' : '💻 Building cool things';
  const localTimeLabel = language === 'fr' ? 'Heure Locale' : 'Local Time';

  return (
    <div className="h-full w-full flex flex-col justify-between p-1">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8D4074]/60 mb-1 font-display">
            {statusTitle}
          </p>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-bold text-[#8D4074]">{language === 'fr' ? 'En ligne' : 'Online'}</span>
          </div>
        </div>
        <div className="p-2 rounded-xl bg-white/40 ring-1 ring-white/10 shadow-sm">
          <Activity className="text-[#8D4074] w-4 h-4 animate-pulse" />
        </div>
      </div>

      <div className="my-4 flex flex-col items-center justify-center flex-1">
        <div className="text-3xl font-black text-[#8D4074] font-mono tracking-widest bg-white/40 px-4 py-2 rounded-2xl border border-white/50 shadow-inner select-none animate-pulse">
          {formattedTime}
        </div>
        <p className="text-[9px] font-black uppercase tracking-[0.15em] text-[#8D4074]/50 mt-2 flex items-center gap-1">
          <Clock size={10} /> {localTimeLabel}
        </p>
      </div>

      <div className="space-y-2 pt-2 border-t border-[#8D4074]/10">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#8D4074]/90">
          <MapPin size={12} className="shrink-0" />
          <span className="truncate">{t('home.location')}</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-bold text-[#8D4074]/85">
          <Sparkles size={12} className="shrink-0 text-amber-500" />
          <span className="truncate">{statusActivity}</span>
        </div>
      </div>
    </div>
  );
}
