import { useNavigate } from 'react-router-dom';
import { Section } from './Section';
import { ProjectCard, AllProjectsCard } from '../common/ProjectCard';
import { projects } from '../../data/projects';
import { useI18n } from '../../context/I18nContext';

const FEATURED_IDS = ['bingeki', 'pep', 'gameboy-sp'] as const;
const SPANS: Record<string, string> = {
  bingeki: 'md:col-span-4 md:row-span-2',
  pep: 'md:col-span-2 md:row-span-2',
  'gameboy-sp': 'md:col-span-2 md:row-span-2',
};

export function FeaturedProjectsSection() {
  const navigate = useNavigate();
  const { t } = useI18n();

  const featured = FEATURED_IDS.map((id) => projects.find((p) => p.id === id)).filter(
    (p): p is NonNullable<typeof p> => p !== undefined
  );

  return (
    <Section title={t('sections.projects_title')} subtitle={t('sections.projects_desc')}>
      {featured.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          className={`h-[280px] md:h-auto md:row-span-2 ${SPANS[project.id]}`}
        />
      ))}
      <AllProjectsCard
        className="h-[280px] md:h-auto md:col-span-4 md:row-span-2"
        onClick={() => navigate('/projects')}
      />
    </Section>
  );
}
