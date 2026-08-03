import { getBrand } from '../../data/brands';
import type { Organization } from '../../data/organizations';
import { education, volunteering } from '../../data/education';
import { experiences } from '../../data/experience';
import { getAwardsByIds } from '../../data/awards';
import { getArticlesByIds } from '../../data/articles';
import { useI18n } from '../../context/I18nContext';
import { cn } from '../../lib/utils';
import { brandStyle } from './brandStyle';
import { BrandAvatar } from './BrandAvatar';
import { Award as AwardIcon, Newspaper, ExternalLink } from 'lucide-react';

const MAX_ITEMS = 5;

interface BrandCardProps {
  organization: Organization;
  className?: string;
}

interface CardItem {
  key: string;
  label: string;
  kind: 'role' | 'award' | 'article';
  url?: string;
}

export function BrandCard({ organization, className }: BrandCardProps) {
  const { language } = useI18n();
  const brand = getBrand(organization.brandId);
  const fr = language === 'fr';

  const roleItems: CardItem[] = [
    ...organization.educationIds.map((id): CardItem | null => {
      const e = education.find((x) => x.id === id);
      return e ? { key: `edu-${id}`, label: fr ? e.degreeFr : e.degreeEn, kind: 'role' } : null;
    }),
    ...organization.experienceIds.map((id): CardItem | null => {
      const x = experiences.find((v) => v.id === id);
      return x ? { key: `exp-${id}`, label: fr ? x.roleFr : x.roleEn, kind: 'role' } : null;
    }),
    ...organization.volunteerIds.map((id): CardItem | null => {
      const v = volunteering.find((x) => x.id === id);
      return v ? { key: `vol-${id}`, label: fr ? v.roleFr : v.roleEn, kind: 'role' } : null;
    }),
  ].filter((i): i is CardItem => i !== null);

  const awardItems: CardItem[] = getAwardsByIds(organization.awardIds).map((a) => ({
    key: `award-${a.id}`,
    label: fr ? a.titleFr : a.titleEn,
    kind: 'award',
    url: a.link,
  }));

  const articleItems: CardItem[] = getArticlesByIds(organization.articleIds).map((a) => ({
    key: `article-${a.id}`,
    label: a.source,
    kind: 'article',
    url: a.url,
  }));

  // Awards and articles carry the most signal — they get the remaining slots first.
  const items = [...awardItems, ...articleItems, ...roleItems].slice(0, MAX_ITEMS);

  const skills = organization.educationIds
    .map((id) => education.find((e) => e.id === id))
    .flatMap((e) => (e ? (fr ? e.skillsFr : e.skillsEn) : []));
  const expSkills = organization.experienceIds
    .map((id) => experiences.find((x) => x.id === id))
    .flatMap((x) => (x ? ((fr ? x.skillsFr : x.skillsEn) ?? []) : []));
  const allSkills = [...skills, ...expSkills].slice(0, 4);

  return (
    <div
      style={brandStyle(brand)}
      className={cn(
        'brand-card hover-lift relative overflow-hidden',
        brand.texture === 'grid' && 'brand-card--texture-grid',
        brand.texture === 'dots' && 'brand-card--texture-dots',
        className
      )}
    >
      {/* Background Media: Video or Cover Image */}
      {organization.id === 'hec' && (
        <div className="absolute inset-0 z-0 opacity-25 pointer-events-none">
          <video
            src="/Portfolio/assets/pep.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06427C] via-[#06427C]/80 to-transparent" />
        </div>
      )}

      {organization.id === 'taker' && (
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <img
            src="/Portfolio/assets/logos/taker.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#10243D] via-[#10243D]/80 to-transparent" />
        </div>
      )}

      <div className="brand-card__texture" aria-hidden="true" />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start justify-between gap-3 mb-4">
          <BrandAvatar brand={brand} />
          <span
            className="text-[11px] font-black uppercase tracking-[0.18em] pt-1 opacity-90"
            style={{ color: 'var(--brand-muted)' }}
          >
            {fr ? organization.periodFr : organization.periodEn}
          </span>
        </div>

        <h3 className="text-xl md:text-2xl font-black leading-tight" style={{ color: 'var(--brand-fg)' }}>
          {brand.name}
        </h3>
        <p className="text-[13px] font-bold mt-1 mb-4 leading-snug" style={{ color: 'var(--brand-muted)' }}>
          {fr ? organization.headlineFr : organization.headlineEn}
        </p>

        <ul className="space-y-2 flex-1 min-h-0">
          {items.map((item) => {
            const content = (
              <>
                {item.kind === 'award' && (
                  <AwardIcon size={14} className="shrink-0 mt-0.5" style={{ color: 'var(--brand-accent)' }} />
                )}
                {item.kind === 'article' && (
                  <Newspaper size={14} className="shrink-0 mt-0.5" style={{ color: 'var(--brand-accent)' }} />
                )}
                {item.kind === 'role' && (
                  <span
                    className="shrink-0 mt-1.5 w-2 h-2 rounded-full"
                    style={{ background: 'var(--brand-accent)' }}
                  />
                )}
                <span className="text-[13px] font-bold leading-snug" style={{ color: 'var(--brand-fg)' }}>
                  {item.label}
                </span>
                {item.url && <ExternalLink size={12} className="shrink-0 mt-0.5 opacity-70" />}
              </>
            );

            return (
              <li key={item.key}>
                {item.url ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-2 hover:opacity-80 transition-opacity"
                  >
                    {content}
                  </a>
                ) : (
                  <div className="flex items-start gap-2">{content}</div>
                )}
              </li>
            );
          })}
        </ul>

        {allSkills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {allSkills.map((s) => (
              <span
                key={s}
                className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-full"
                style={{
                  color: 'var(--brand-fg)',
                  background: 'color-mix(in srgb, var(--brand-accent) 30%, transparent)',
                }}
              >
                {s}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
