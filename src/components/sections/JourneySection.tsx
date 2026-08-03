import { Section } from './Section';
import { BrandCard } from '../brand/BrandCard';
import { featuredOrganizations, compactOrganizations } from '../../data/organizations';
import { getBrand } from '../../data/brands';
import { education, volunteering } from '../../data/education';
import { experiences } from '../../data/experience';
import { useI18n } from '../../context/I18nContext';

const SPAN_CLASS: Record<2 | 3 | 4, string> = {
  2: 'md:col-span-2 md:row-span-2',
  3: 'md:col-span-3 md:row-span-2',
  4: 'md:col-span-4 md:row-span-2',
};

export function JourneySection() {
  const { t, language } = useI18n();
  const fr = language === 'fr';

  return (
    <Section title={t('sections.journey_title')} subtitle={t('sections.journey_desc')}>
      {featuredOrganizations.map((org) => (
        <BrandCard
          key={org.id}
          organization={org}
          className={`min-h-[320px] md:min-h-0 md:row-span-2 ${SPAN_CLASS[org.span]}`}
        />
      ))}

      <div className="col-span-1 md:col-span-6 md:row-span-1 bento-card bg-white/45 justify-center py-6">
        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#6D4499]/50 mb-3">
          {t('sections.other_experiences')}
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
          {compactOrganizations.map((org) => {
            const brand = getBrand(org.brandId);
            const name =
              brand.name ||
              education.find((e) => e.id === org.educationIds[0])?.school ||
              experiences.find((x) => x.id === org.experienceIds[0])?.company ||
              volunteering.find((v) => v.id === org.volunteerIds[0])?.organization ||
              org.id;

            return (
              <li key={org.id} className="flex items-baseline gap-2 min-w-0">
                <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-[#6D4499]/40" />
                <span className="text-[12px] font-bold text-[#3B2356] truncate">{name}</span>
                <span className="text-[11px] font-semibold text-[#6D4499]/60 truncate">
                  — {fr ? org.headlineFr : org.headlineEn}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
