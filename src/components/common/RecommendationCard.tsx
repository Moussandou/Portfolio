import { useState } from 'react';
import type { Recommendation } from '../../data/recommendations';
import { useI18n } from '../../context/I18nContext';
import { cn } from '../../lib/utils';
import { Quote } from 'lucide-react';

interface RecommendationCardProps {
  reco: Recommendation;
  expandable?: boolean;
  className?: string;
}

export function RecommendationCard({ reco, expandable = false, className }: RecommendationCardProps) {
  const { t, language } = useI18n();
  const [expanded, setExpanded] = useState(false);
  const [photoFailed, setPhotoFailed] = useState(false);

  const showPhoto = Boolean(reco.photo) && !photoFailed;
  const relationLabel = language === 'fr' ? reco.relationLabelFr : reco.relationLabelEn;

  return (
    <div className={cn('bento-card hover-lift bg-white/60', className)}>
      <div className="flex items-center gap-3 mb-3">
        {showPhoto ? (
          <img
            src={reco.photo}
            alt={reco.name}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-sm shrink-0"
            onError={() => setPhotoFailed(true)}
          />
        ) : (
          <div
            className="w-12 h-12 rounded-full ring-2 ring-white shadow-sm shrink-0 flex items-center justify-center bg-gradient-to-br from-[#C5A8E9] to-[#6D4499]"
            aria-hidden="true"
          >
            <span className="text-white font-display font-black text-sm">{reco.initials}</span>
          </div>
        )}
        <div className="min-w-0">
          <p className="text-[13px] font-black text-[#3B2356] truncate">{reco.name}</p>
          <p className="text-[10px] font-bold text-[#6D4499]/70 truncate">{reco.title}</p>
        </div>
      </div>

      <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#6D4499]/55 mb-2">
        {relationLabel} · {reco.date}
      </p>

      <div className="relative">
        <Quote size={14} className="absolute -left-0.5 -top-0.5 text-[#6D4499]/20" />
        <p
          className={cn(
            'text-[12px] leading-relaxed text-[#3B2356]/80 pl-5',
            !expanded && (expandable ? 'line-clamp-4' : 'line-clamp-3')
          )}
        >
          {language === 'fr' && reco.textFr ? reco.textFr : reco.text}
        </p>
      </div>

      {expandable && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 self-start text-[11px] font-black text-[#6D4499] hover:text-[#3B2356] transition-colors"
        >
          {expanded ? t('recommendations.read_less') : t('recommendations.read_more')}
        </button>
      )}
    </div>
  );
}
