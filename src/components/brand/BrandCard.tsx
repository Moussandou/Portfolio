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
        'brand-card hover-lift',
        brand.texture === 'grid' && 'brand-card--texture-grid',
        brand.texture === 'dots' && 'brand-card--texture-dots',
        className
      )}
    >
      <div className="brand-card__texture" aria-hidden="true" />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start justify-between gap-3 mb-4">
          <BrandAvatar brand={brand} />
          <span
            className="text-[10px] font-black uppercase tracking-[0.18em] pt-1"
            style={{ color: 'var(--brand-muted)' }}
          >
            {fr ? organization.periodFr : organization.periodEn}
          </span>
        </div>

        <h3 className="text-xl font-black leading-tight" style={{ color: 'var(--brand-fg)' }}>
          {brand.name}
        </h3>
        <p className="text-[12px] font-semibold mt-1 mb-4" style={{ color: 'var(--brand-muted)' }}>
          {fr ? organization.headlineFr : organization.headlineEn}
        </p>

        <ul className="space-y-1.5 flex-1 min-h-0">
          {items.map((item) => {
            const content = (
              <>
                {item.kind === 'award' && (
                  <AwardIcon size={13} className="shrink-0 mt-0.5" style={{ color: 'var(--brand-accent)' }} />
                )}
                {item.kind === 'article' && (
                  <Newspaper size={13} className="shrink-0 mt-0.5" style={{ color: 'var(--brand-accent)' }} />
                )}
                {item.kind === 'role' && (
                  <span
                    className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full"
                    style={{ background: 'var(--brand-accent)' }}
                  />
                )}
                <span className="text-[12px] font-semibold leading-snug" style={{ color: 'var(--brand-fg)' }}>
                  {item.label}
                </span>
                {item.url && <ExternalLink size={11} className="shrink-0 mt-0.5 opacity-60" />}
              </>
            );

            return (
              <li key={item.key}>
                {item.url ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-2 hover:opacity-75 transition-opacity"
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
                className="px-2 py-0.5 text-[9px] font-black uppercase tracking-wider rounded-full"
                style={{
                  color: 'var(--brand-fg)',
                  background: 'color-mix(in srgb, var(--brand-accent) 22%, transparent)',
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
