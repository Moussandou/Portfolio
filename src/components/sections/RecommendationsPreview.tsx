import { useNavigate } from 'react-router-dom';
import { Section } from './Section';
import { RecommendationCard } from '../common/RecommendationCard';
import { recommendations } from '../../data/recommendations';
import { useI18n } from '../../context/I18nContext';
import { ArrowRight } from 'lucide-react';

const PREVIEW_IDS = ['romain-lavielle', 'meryl-stretti', 'martin-ohresser'];

export function RecommendationsPreview() {
  const navigate = useNavigate();
  const { t } = useI18n();

  const preview = PREVIEW_IDS.map((id) => recommendations.find((r) => r.id === id)).filter(
    (r): r is NonNullable<typeof r> => r !== undefined
  );

  return (
    <Section title={t('sections.recos_title')} subtitle={t('sections.recos_desc')}>
      {preview.map((reco) => (
        <RecommendationCard
          key={reco.id}
          reco={reco}
          className="row-span-2 md:col-span-2 md:row-span-2"
        />
      ))}
      <button
        onClick={() => navigate('/recommendations')}
        className="bento-card hover-lift row-span-1 md:col-span-6 md:row-span-1 bg-[#C5A8E9] items-center justify-center flex-row gap-2 group"
      >
        <span className="text-sm font-black text-white uppercase tracking-widest">
          {t('sections.recos_cta')}
        </span>
        <ArrowRight size={16} className="text-white group-hover:translate-x-1 transition-transform" />
      </button>
    </Section>
  );
}
