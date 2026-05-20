import { projects } from '../data/projects';
import { ProjectCard } from '../components/common/ProjectCard';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../context/I18nContext';

export function ProjectList() {
  const navigate = useNavigate();
  const { t } = useI18n();

  return (
    <>
      <main className="relative z-10 max-w-[1080px] mx-auto px-6 py-12">
        <button 
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-sm font-bold text-[#8D4074] hover:text-[#5a2848] transition-all mb-8 bg-white/40 hover:bg-white/60 px-4 py-2 rounded-xl shadow-sm hover:-translate-x-1"
        >
          <ArrowLeft size={16} /> {t('projectList.back')}
        </button>

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2a1a22] font-display mb-4">{t('projectList.title')}</h1>
          <p className="text-lg text-[#5a2848]/60 max-w-2xl font-medium">
            {t('projectList.desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="h-[380px]">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </main>

      <footer className="py-20 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#5a2848]/25 font-display">
          © 2026 Moussandou Mroivili
        </p>
      </footer>
    </>
  );
}
