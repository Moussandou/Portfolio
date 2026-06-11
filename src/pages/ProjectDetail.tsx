import { useParams, useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';
import { ArrowLeft, ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useI18n } from '../context/I18nContext';

export function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const { t, language } = useI18n();
  
  const project = projects.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
    setCurrentImgIdx(0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center relative z-10">
        <h1 className="text-4xl font-bold font-display text-[#6D4499]">{t('projectDetail.not_found')}</h1>
        <button 
          onClick={() => navigate('/projects')}
          className="mt-6 px-6 py-2 bg-[#6D4499] text-white rounded-full font-medium"
        >
          {t('projectDetail.back_projects')}
        </button>
      </div>
    );
  }

  const role = language === 'fr' ? project.roleFr : project.roleEn;
  const desc = language === 'fr' ? project.descFr : project.descEn;
  const longDesc = language === 'fr' ? project.longDescFr : project.longDescEn;
  const features = language === 'fr' ? project.featuresFr : project.featuresEn;

  return (
    <>
      <main className="relative z-10 max-w-[1080px] mx-auto px-6 py-12">
        <button 
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-bold text-[#6D4499] hover:text-[#3B2356] transition-all mb-8 bg-white/40 hover:bg-white/60 px-4 py-2 rounded-xl shadow-sm hover:-translate-x-1"
        >
          <ArrowLeft size={16} /> {t('projectList.back')}
        </button>

        <div className="flex flex-col gap-12">
          {/* Header */}
          <div className="flex flex-col gap-6 page-enter">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white" style={{ backgroundColor: project.color }}>
                {role}
              </span>
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#6D4499]/60 font-display">
                {project.tech}
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-[#241536] font-display tracking-tight">
              {project.name}
            </h1>
            <p className="text-xl text-[#3B2356]/80 font-medium max-w-3xl leading-relaxed">
              {desc}
            </p>

            <div className="flex flex-wrap gap-4 mt-2">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#241536] text-white hover:bg-[#6D4499] hover:-translate-y-0.5 hover:shadow-xl active:scale-95 transition-all shadow-lg font-medium">
                  <Github size={18} /> {t('projectDetail.view_code')}
                </a>
              )}
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-[#241536] hover:text-[#6D4499] hover:-translate-y-0.5 hover:shadow-xl active:scale-95 transition-all shadow-lg font-medium border border-[#241536]/10">
                  <ExternalLink size={18} /> {t('projectDetail.visit_site')}
                </a>
              )}
            </div>
          </div>

          {/* Media Showcase */}
          {(() => {
            const imagesList = project.images?.length ? project.images : (project.image ? [project.image] : []);
            
            if (imagesList.length === 0 && !project.video) return null;

            return (
              <div className="w-full rounded-[2rem] overflow-hidden shadow-2xl border border-white/40 bg-white/40 backdrop-blur-3xl aspect-video relative group flex items-center justify-center page-enter-delayed">
                {project.video ? (
                  <video 
                    src={project.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <img 
                      src={imagesList[currentImgIdx]} 
                      alt={project.name} 
                      className="w-full h-full object-contain transition-all duration-700" 
                    />
                    {imagesList.length > 1 && (
                      <div className="absolute inset-0 flex items-center justify-between px-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentImgIdx((prev) => (prev - 1 + imagesList.length) % imagesList.length);
                          }}
                          aria-label="Previous image"
                          className="p-3 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-md transition-all hover:scale-110 active:scale-95"
                        >
                          <ChevronLeft size={24} />
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentImgIdx((prev) => (prev + 1) % imagesList.length);
                          }}
                          aria-label="Next image"
                          className="p-3 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-md transition-all hover:scale-110 active:scale-95"
                        >
                          <ChevronRight size={24} />
                        </button>
                      </div>
                    )}
                    {/* Dots indicator */}
                    {imagesList.length > 1 && (
                      <div className="absolute bottom-6 inset-x-0 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {imagesList.map((_, i) => (
                          <button 
                            key={i} 
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentImgIdx(i);
                            }}
                            className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all ${i === currentImgIdx ? "bg-white scale-125" : "bg-white/40 hover:bg-white/60"}`}
                            aria-label={`Go to slide ${i + 1}`}
                          />
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })()}

          {/* Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-4">
            <div className="md:col-span-2 space-y-8">
              {longDesc && (
                <section>
                  <h2 className="text-3xl font-bold text-[#241536] font-display mb-6">{t('projectDetail.about_project')}</h2>
                  <p className="text-[#3B2356]/80 leading-relaxed text-lg whitespace-pre-line">
                    {longDesc}
                  </p>
                </section>
              )}
              {features && features.length > 0 && (
                <section>
                  <h2 className="text-3xl font-bold text-[#241536] font-display mb-6">{t('projectDetail.key_features')}</h2>
                  <ul className="space-y-4">
                    {features.map((feature, i) => (
                      <li key={i} className="flex gap-4 items-start">
                        <div className="w-6 h-6 rounded-full bg-[#C5A8E9] flex items-center justify-center shrink-0 mt-0.5">
                          <div className="w-2 h-2 rounded-full bg-white" />
                        </div>
                        <span className="text-[#3B2356]/80 leading-relaxed text-lg">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
            <div className="md:col-span-1">
              <div className="sticky top-24 p-8 rounded-[2rem] bg-white/50 backdrop-blur-xl border border-white/50 shadow-xl">
                <h3 className="text-xl font-bold text-[#241536] font-display mb-6 text-center">Tech Stack</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {project.tech.split('/').map(t => t.trim()).map(tech => (
                    <span key={tech} className="px-4 py-2 bg-white rounded-xl text-sm font-bold text-[#6D4499] border border-[#6D4499]/10 shadow-sm hover:-translate-y-0.5 hover:shadow-md hover:bg-[#6D4499] hover:text-white transition-all cursor-default">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-20 text-center relative z-10">
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#3B2356]/40 font-display">
          © 2026 Moussandou Mroivili
        </p>
      </footer>
    </>
  );
}
