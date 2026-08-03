import { useState } from 'react';
import { cn } from '../../lib/utils';
import { Project, projects } from '../../data/projects';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../../context/I18nContext';

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const navigate = useNavigate();
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const { language } = useI18n();

  const imagesList = project.images?.length ? project.images : (project.image ? [project.image] : []);

  const handleNextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIdx((prev) => (prev + 1) % imagesList.length);
  };

  const handlePrevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIdx((prev) => (prev - 1 + imagesList.length) % imagesList.length);
  };

  const desc = language === 'fr' ? project.descFr : project.descEn;

  return (
    <div
      onClick={() => navigate(`/projects/${project.id}`)}
      className={cn(
        'bento-card hover-lift group h-full p-0 overflow-hidden cursor-pointer relative',
        className
      )}
      style={{ background: project.color }}
    >
      {/* Full-bleed visual */}
      <div className="absolute inset-0">
        {project.video ? (
          <video
            src={project.video}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-top"
          />
        ) : imagesList.length > 0 ? (
          <img
            src={imagesList[currentImgIdx]}
            alt={project.name}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-5xl font-black font-display text-white/25 uppercase">
              {project.name.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Legibility gradient */}
      <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/85 via-black/45 to-transparent pointer-events-none" />

      {/* External links */}
      <div className="absolute top-3 right-3 z-20 flex gap-1.5">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            aria-label={`${project.name} — GitHub`}
            className="p-2 rounded-xl bg-black/40 backdrop-blur-md hover:bg-black/60 text-white/90 hover:text-white transition-all"
          >
            <Github size={14} />
          </a>
        )}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            aria-label={`${project.name} — site`}
            className="p-2 rounded-xl bg-black/40 backdrop-blur-md hover:bg-black/60 text-white/90 hover:text-white transition-all"
          >
            <ExternalLink size={14} />
          </a>
        )}
      </div>

      {/* Carousel controls */}
      {imagesList.length > 1 && (
        <>
          <div className="absolute inset-y-0 inset-x-0 z-20 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <button
              onClick={handlePrevImg}
              aria-label="Previous image"
              className="pointer-events-auto p-1.5 rounded-full bg-black/55 hover:bg-black/75 text-white backdrop-blur-sm transition-all active:scale-90"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={handleNextImg}
              aria-label="Next image"
              className="pointer-events-auto p-1.5 rounded-full bg-black/55 hover:bg-black/75 text-white backdrop-blur-sm transition-all active:scale-90"
            >
              <ChevronRight size={16} />
            </button>
          </div>
          <div className="absolute top-3 left-3 z-20 flex gap-1">
            {imagesList.map((_, i) => (
              <span
                key={i}
                className={cn(
                  'h-1 rounded-full transition-all',
                  i === currentImgIdx ? 'w-4 bg-white' : 'w-1.5 bg-white/45'
                )}
              />
            ))}
          </div>
        </>
      )}

      {/* Text over the image */}
      <div className="relative z-10 mt-auto p-5">
        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/65 mb-1 font-display">
          {project.tech}
        </p>
        <h3 className="text-xl font-black text-white font-display leading-tight">
          {project.name}
        </h3>
        <p className="mt-1.5 text-[11px] text-white/80 line-clamp-2 leading-relaxed font-medium">
          {desc}
        </p>
      </div>
    </div>
  );
}

export function AllProjectsCard({ className, onClick }: { className?: string; onClick: () => void }) {
  const { t } = useI18n();
  const imageProjects = projects.filter(p => p.image || p.video);
  const doubledList = [...imageProjects, ...imageProjects];

  return (
    <button
      onClick={onClick}
      className={cn(
        "bento-card group flex flex-col items-center justify-center text-center p-0 cursor-pointer overflow-hidden relative border-none",
        "bg-white hover:brightness-105 active:scale-[0.98] transition-all shadow-none",
        className
      )}
    >
      {/* Scrolling Columns Backdrop - 5 Columns for a balanced, premium look */}
      <div className="absolute inset-0 flex p-1 overflow-hidden bg-white">
        {[0, 1, 2, 3, 4].map((colIndex) => {
          const isUp = colIndex % 2 === 0;
          const duration = 12 + (colIndex * 2);

          return (
            <div
              key={`col-${colIndex}`}
              className={cn(
                "flex-1 flex flex-col px-0.5",
                isUp ? "animate-scroll-up" : "animate-scroll-down"
              )}
              style={{ animationDuration: `${duration}s` }}
            >
              {doubledList.map((p, i) => (
                <div key={`col${colIndex}-${p.id}-${i}`} className="w-full aspect-square rounded-md overflow-hidden shadow-sm mb-1 flex-shrink-0">
                  {p.image ? (
                    <img src={p.image} alt="" className="w-full h-full object-cover" />
                  ) : p.video ? (
                    <video src={p.video} autoPlay loop muted playsInline className="w-full h-full object-cover pointer-events-none" />
                  ) : null}
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Subtle depth vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-white/5 pointer-events-none" />

      {/* Glass Content Overlay - High Contrast */}
      <div className="relative z-10 px-8 py-5 rounded-[2.5rem] bg-white/70 backdrop-blur-2xl border border-white/50 shadow-2xl flex flex-col items-center gap-1 group-hover:scale-105 transition-transform duration-500 ring-1 ring-white/10">
        <p className="text-2xl font-black text-[#6D4499] font-display uppercase tracking-tight">{t('common.projectCard.view_my_work')}</p>
        <div className="flex items-center gap-2.5">
          <div className="h-[2px] w-5 bg-[#6D4499]/30" />
          <p className="text-[11px] text-[#6D4499]/70 uppercase tracking-[0.3em] font-black">{t('common.projectCard.full_portfolio')}</p>
          <div className="h-[2px] w-5 bg-[#6D4499]/30" />
        </div>
      </div>
    </button>
  );
}
