import { useState } from 'react';
import { cn } from '../../lib/utils';
import { Project, projects } from '../../data/projects';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const navigate = useNavigate();
  const [currentImgIdx, setCurrentImgIdx] = useState(0);

  const imagesList = project.images?.length ? project.images : (project.image ? [project.image] : []);

  const handleNextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIdx((prev) => (prev + 1) % imagesList.length);
  };
  
  const handlePrevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIdx((prev) => (prev - 1 + imagesList.length) % imagesList.length);
  };

  return (
    <div 
      onClick={() => navigate(`/projects/${project.id}`)}
      className={cn("bento-card group h-full flex flex-col justify-between overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300", className)}
      style={{ background: project.color }}
    >
      <div className="relative z-10 flex flex-col h-full">
        {/* Header: Title & Links */}
        <div className="flex justify-between items-start mb-3">
          <div className="max-w-[70%]">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 mb-1 font-display">
              {project.tech}
            </p>
            <h3 className="text-xl font-black text-white font-display leading-tight group-hover:translate-x-1 transition-transform duration-300">
              {project.name}
            </h3>
          </div>
          
          <div className="flex gap-1.5">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" 
                onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-xl bg-white/15 hover:bg-white/25 text-white/80 hover:text-white transition-all shadow-sm relative z-20">
                <Github size={14} />
              </a>
            )}
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" 
                onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-xl bg-white/15 hover:bg-white/25 text-white/80 hover:text-white transition-all shadow-sm relative z-20">
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>

        {/* Project Image/Video in an Enclosure/Frame - FLEXIBLE HEIGHT */}
        {(imagesList.length > 0 || project.video) && (
          <div className="relative flex-1 min-h-0 mb-4 group-hover:scale-[1.02] transition-transform duration-500 ease-out">
            <div className="absolute inset-x-2 bottom-0 top-2 bg-black/15 rounded-2xl blur-lg transition-all group-hover:blur-xl opacity-0 group-hover:opacity-100" />
            <div className="relative h-full w-full bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden shadow-xl ring-1 ring-white/10">
              {project.video ? (
                <video 
                  src={project.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-contain"
                />
              ) : imagesList.length > 0 ? (
                <>
                  <img 
                    src={imagesList[currentImgIdx]} 
                    alt={project.name} 
                    className="w-full h-full object-contain transition-all duration-500 scale-100 group-hover:scale-105" 
                  />
                  {imagesList.length > 1 && (
                    <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button 
                        onClick={handlePrevImg}
                        className="p-1 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm transition-all"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button 
                        onClick={handleNextImg}
                        className="p-1 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm transition-all"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  )}
                  {/* Dots indicator */}
                  {imagesList.length > 1 && (
                    <div className="absolute bottom-2 inset-x-0 flex justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {imagesList.map((_, i) => (
                        <div 
                          key={i} 
                          className={cn("w-1.5 h-1.5 rounded-full transition-all", i === currentImgIdx ? "bg-white scale-125" : "bg-white/40")}
                        />
                      ))}
                    </div>
                  )}
                </>
              ) : null}
            </div>
            {/* Added overlay for better click signifier */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
               <div className="bg-white/90 backdrop-blur-sm p-1.5 rounded-lg text-[#8D4074]">
                 <ExternalLink size={14} />
               </div>
            </div>
          </div>
        )}

        {/* Description - Bottom anchored */}
        <div className="mt-auto">
          <p className="text-[11px] text-white/80 line-clamp-2 leading-relaxed font-medium">
            {project.desc}
          </p>
        </div>
      </div>
    </div>
  );
}

export function AllProjectsCard({ className, onClick }: { className?: string; onClick: () => void }) {
  // Filter only projects with images or videos
  const imageProjects = projects.filter(p => p.image || p.video);
  // Duplicate the list EXACTLY ONCE to create a perfect two-part seamless loop
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
          const duration = 12 + (colIndex * 2); // Smooth: 12s to 20s
          
          return (
            <div 
              key={`col-${colIndex}`} 
              className={cn(
                "flex-1 flex flex-col px-0.5", // Individual padding for column separation
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
        <p className="text-2xl font-black text-[#8D4074] font-display uppercase tracking-tight">Voir mes travaux</p>
        <div className="flex items-center gap-2.5">
          <div className="h-[2px] w-5 bg-[#8D4074]/30" />
          <p className="text-[11px] text-[#8D4074]/70 uppercase tracking-[0.3em] font-black">Full Portfolio</p>
          <div className="h-[2px] w-5 bg-[#8D4074]/30" />
        </div>
      </div>
    </button>
  );
}
