import { Section } from './Section';
import { articles } from '../../data/articles';
import { useI18n } from '../../context/I18nContext';
import { Newspaper, Play, ArrowUpRight } from 'lucide-react';

export function ArticlesSection() {
  const { t, language } = useI18n();
  const fr = language === 'fr';

  return (
    <Section title={t('sections.articles_title')} subtitle={t('sections.articles_desc')}>
      {articles.map((article) => (
        <a
          key={article.id}
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="bento-card hover-lift group p-0 min-h-[280px] md:min-h-0 md:col-span-2 md:row-span-2 bg-[#E9DEF8] overflow-hidden"
        >
          <div className="relative flex-1 min-h-0 w-full bg-[#6D4499]/10">
            {article.image ? (
              <img
                src={article.image}
                alt=""
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                {article.type === 'video' ? (
                  <Play size={30} className="text-[#6D4499]/45" />
                ) : (
                  <Newspaper size={30} className="text-[#6D4499]/45" />
                )}
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#3B2356]/85 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 p-4">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/70">
                {article.source} · {article.date}
              </p>
              <h3 className="mt-1 text-[14px] font-black text-white leading-snug line-clamp-2">
                {fr ? article.titleFr : article.titleEn}
              </h3>
            </div>
            <div className="absolute top-3 right-3 w-7 h-7 rounded-lg bg-white/85 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight size={14} className="text-[#6D4499]" />
            </div>
          </div>
          <p className="px-5 py-4 text-[11px] font-medium text-[#3B2356]/75 leading-relaxed line-clamp-2">
            {fr ? article.excerptFr : article.excerptEn}
          </p>
        </a>
      ))}
    </Section>
  );
}
