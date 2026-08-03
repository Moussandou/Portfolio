import { Section } from './Section';
import { awards } from '../../data/awards';
import { useI18n } from '../../context/I18nContext';
import { Trophy, GraduationCap, ExternalLink } from 'lucide-react';

export function AwardsSection() {
  const { t, language } = useI18n();
  const fr = language === 'fr';

  return (
    <Section title={t('sections.awards_title')} subtitle={t('sections.awards_desc')}>
      {awards.map((award) => {
        const isAward = award.type === 'award';
        const body = (
          <>
            <div className="flex items-start justify-between gap-2 mb-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: isAward ? 'rgba(217,119,6,0.14)' : 'rgba(109,68,153,0.12)' }}
              >
                {isAward ? (
                  <Trophy size={16} className="text-amber-600" />
                ) : (
                  <GraduationCap size={16} className="text-[#6D4499]" />
                )}
              </div>
              {award.link && <ExternalLink size={13} className="text-[#6D4499]/40 mt-1" />}
            </div>
            <h3 className="text-[13px] font-black leading-snug text-[#3B2356] line-clamp-3">
              {fr ? award.titleFr : award.titleEn}
            </h3>
            {(() => {
              const skills = fr ? award.skillsFr : award.skillsEn;
              return skills && skills.length > 0 ? (
                <div className="flex flex-wrap gap-1 mt-2">
                  {skills.map((s) => (
                    <span
                      key={s}
                      className="px-1.5 py-0.5 text-[8px] font-black uppercase tracking-wider rounded-full bg-[#6D4499]/12 text-[#6D4499]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              ) : null;
            })()}
            <p className="mt-auto pt-3 text-[10px] font-black uppercase tracking-[0.15em] text-[#6D4499]/55">
              {award.issuer} · {award.date}
            </p>
          </>
        );

        const className =
          'bento-card hover-lift bg-white/55 row-span-1 md:col-span-2 md:row-span-1 text-left';

        return award.link ? (
          <a
            key={award.id}
            href={award.link}
            target="_blank"
            rel="noopener noreferrer"
            className={className}
          >
            {body}
          </a>
        ) : (
          <div key={award.id} className={className}>
            {body}
          </div>
        );
      })}
    </Section>
  );
}
