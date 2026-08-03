import { useState } from 'react';
import { projects } from '../data/projects';
import { ProjectCard } from '../components/common/ProjectCard';
import { ArrowLeft, Sparkles, Globe, Monitor, Gamepad2, Wrench, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../context/I18nContext';

type FilterType = 'all' | 'priority1' | 'web' | 'desktop' | 'game' | 'tool';

export function ProjectList() {
  const navigate = useNavigate();
  const { t, language } = useI18n();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filters: { id: FilterType; labelFr: string; labelEn: string; icon: React.ReactNode }[] = [
    { id: 'all', labelFr: 'Tous les projets', labelEn: 'All Projects', icon: <Layers size={14} /> },
    { id: 'priority1', labelFr: 'Projets Majeurs', labelEn: 'Featured Projects', icon: <Sparkles size={14} /> },
    { id: 'web', labelFr: 'Web & SaaS', labelEn: 'Web & SaaS', icon: <Globe size={14} /> },
    { id: 'desktop', labelFr: 'macOS & Native', labelEn: 'macOS & Native', icon: <Monitor size={14} /> },
    { id: 'game', labelFr: 'Jeux & Émulation', labelEn: 'Games & Emulation', icon: <Gamepad2 size={14} /> },
    { id: 'tool', labelFr: 'Outils & Scripts', labelEn: 'Tools & Scripts', icon: <Wrench size={14} /> },
  ];

  const filteredProjects = projects
    .filter((project) => {
      if (activeFilter === 'all') return true;
      if (activeFilter === 'priority1') return project.priority === 1;
      return project.category === activeFilter;
    })
    .sort((a, b) => (a.priority ?? 2) - (b.priority ?? 2));

  return (
    <>
      <main className="relative z-10 max-w-[1080px] mx-auto px-6 py-12">
        <div className="page-enter">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#6D4499] hover:text-[#3B2356] transition-all mb-8 bg-white/40 hover:bg-white/60 px-4 py-2 rounded-xl shadow-sm hover:-translate-x-1"
          >
            <ArrowLeft size={16} /> {t('projectList.back')}
          </button>

          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-[#241536] font-display mb-4">{t('projectList.title')}</h1>
            <p className="text-lg text-[#3B2356]/60 max-w-2xl font-medium">
              {t('projectList.desc')}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 mb-10">
            {filters.map((filter) => {
              const isActive = activeFilter === filter.id;
              const label = language === 'fr' ? filter.labelFr : filter.labelEn;
              return (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                    isActive
                      ? 'bg-[#6D4499] text-white shadow-md scale-[1.02]'
                      : 'bg-white/50 text-[#6D4499] hover:bg-white/80 hover:text-[#3B2356]'
                  }`}
                >
                  {filter.icon}
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
          {filteredProjects.map((project) => (
            <div key={project.id} className="h-[380px]">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </main>

      <footer className="py-20 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#3B2356]/25 font-display">
          © 2026 Moussandou Mroivili
        </p>
      </footer>
    </>
  );
}
