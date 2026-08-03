import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { recommendations, type RecoRelation } from '../data/recommendations';
import { RecommendationCard } from '../components/common/RecommendationCard';
import { useI18n } from '../context/I18nContext';
import { cn } from '../lib/utils';
import { ArrowLeft, Linkedin } from 'lucide-react';

type Filter = 'all' | RecoRelation;

export function Recommendations() {
  const navigate = useNavigate();
  const { t } = useI18n();
  const [filter, setFilter] = useState<Filter>('all');

  const filters: { id: Filter; labelKey: string }[] = [
    { id: 'all', labelKey: 'recommendations.filter_all' },
    { id: 'mentor', labelKey: 'recommendations.filter_mentor' },
    { id: 'manager', labelKey: 'recommendations.filter_manager' },
    { id: 'teacher', labelKey: 'recommendations.filter_teacher' },
    { id: 'peer', labelKey: 'recommendations.filter_peer' },
  ];

  const countFor = (id: Filter) =>
    id === 'all' ? recommendations.length : recommendations.filter((r) => r.relation === id).length;

  const visible =
    filter === 'all' ? recommendations : recommendations.filter((r) => r.relation === filter);

  return (
    <>
      <main className="relative z-10 max-w-[1080px] mx-auto px-6 py-12">
        <div className="page-enter">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#6D4499] hover:text-[#3B2356] transition-all mb-8 bg-white/40 hover:bg-white/60 px-4 py-2 rounded-xl shadow-sm hover:-translate-x-1"
          >
            <ArrowLeft size={16} /> {t('recommendations.back')}
          </button>

          <h1 className="text-4xl md:text-5xl font-black font-display tracking-tight text-[#3B2356]">
            {t('recommendations.title')}
          </h1>
          <p className="mt-3 text-sm font-semibold text-[#6D4499]/75 max-w-xl leading-relaxed">
            {t('recommendations.desc')}
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={cn(
                  'px-4 py-2 rounded-xl text-xs font-black transition-all',
                  filter === f.id
                    ? 'bg-[#6D4499] text-white shadow-sm'
                    : 'bg-white/45 text-[#6D4499] hover:bg-white/70'
                )}
              >
                {t(f.labelKey)} <span className="opacity-60">{countFor(f.id)}</span>
              </button>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {visible.map((reco) => (
              <RecommendationCard key={reco.id} reco={reco} expandable />
            ))}
          </div>

          <a
            href="https://www.linkedin.com/in/moussandou/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-12 mx-auto flex w-fit items-center gap-2 px-6 py-3 rounded-2xl bg-[#6D4499] text-white text-sm font-black hover:bg-[#4F2D7F] transition-colors shadow-lg"
          >
            <Linkedin size={16} /> {t('recommendations.linkedin_cta')}
          </a>
        </div>
      </main>

      <footer className="py-10 text-center">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-[#3B2356]/25 font-display">
          © 2026 Moussandou Mroivili
        </p>
      </footer>
    </>
  );
}
