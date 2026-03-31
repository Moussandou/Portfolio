import { projects } from '../data/projects';
import { ProjectCard } from '../components/common/ProjectCard';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function ProjectList() {
  const navigate = useNavigate();

  return (
    <>
      <main className="relative z-10 max-w-[1080px] mx-auto px-6 py-12">
        <button 
          onClick={() => navigate('/')}
          className="group flex items-center gap-2 text-[#8D4074] font-display font-medium mb-8 hover:translate-x-[-4px] transition-transform"
        >
          <ArrowLeft size={20} />
          <span className="uppercase tracking-widest text-sm">Retour</span>
        </button>

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2a1a22] font-display mb-4">Mes Réalisations</h1>
          <p className="text-lg text-[#5a2848]/60 max-w-2xl font-medium">
            Une collection de mes projets les plus marquants, allant du développement full-stack aux outils de création et jeux vidéo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="h-[280px]">
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
