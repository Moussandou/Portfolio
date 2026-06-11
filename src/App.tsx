import { useEffect } from 'react';
import { HashRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { BentoGrid } from './components/layout/BentoGrid';
import { Header } from './components/layout/Header';
import { Clouds } from './components/decorative/Clouds';
import { ProjectCard, AllProjectsCard } from './components/common/ProjectCard';
import { ProjectList } from './pages/ProjectList';
import { ProjectDetail } from './pages/ProjectDetail';
import { projects } from './data/projects';
import { GithubCard } from './components/common/GithubCard';
import { ExperienceCard } from './components/common/ExperienceCard';
import { EducationCard } from './components/common/EducationCard';
import { VolunteerCard } from './components/common/VolunteerCard';
import { StatusCard } from './components/common/StatusCard';
import { Contact } from './pages/Contact';
import { cn } from './lib/utils';
import { I18nProvider, useI18n } from './context/I18nContext';
import { MapPin, Sparkles, Code2, GraduationCap, Github, Linkedin, Instagram, Mail, FileText, ArrowRight } from 'lucide-react';

/* Scrolls back to the top whenever the route changes */
function ScrollRestore() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}

/* ── Decorative SVGs ──────────────────────────── */
function Star({ className }: { className?: string }) {
  return (
    <svg className={cn("w-4 h-4", className)} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l2.4 7.2H22l-6 4.8 2.4 7.2L12 16.8 5.6 21.2 8 14 2 9.2h7.6z"/>
    </svg>
  );
}

/* ── Color Palette ────────────────────────────── */
const COLORS = {
  candy:      '#C5A8E9',
  candyLight: '#E3D4F5',
  grape:      '#6D4499',
  violet:     '#4F2D7F',
  violetSoft: '#8E6FC4',
  plum:       '#8E63B8',
  mauve:      '#B79AD9',
  blush:      '#E9DEF8',
};

function Home() {
  const navigate = useNavigate();
  const mainFeatured = projects.slice(0, 2);
  const { t } = useI18n();

  return (
    <>
      <main className="relative z-10 py-8 md:py-14 px-6 md:px-0 max-w-[1080px] mx-auto">
        <BentoGrid>
          
          {/* Row 1: Extended Hero (4) + Bio (2) */}
          <div className={cn("bento-card", "row-span-2 md:col-span-4 md:row-span-2")}
            style={{ background: COLORS.candy }}>
            <div className="h-full flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="flex gap-2">
                  <Star className="text-white/60 animate-twinkle" />
                  <Star className="text-white/30 animate-twinkle [animation-delay:1.4s]" />
                </div>
                <div className="px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#3B2356]/80">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  {t('home.available')}
                </div>
              </div>
              
              <div className="mt-8">
                <h1 className="text-5xl md:text-6xl font-bold leading-[0.85] text-[#3B2356] font-display tracking-tight">
                  {t('home.role')}
                </h1>
                <div className="mt-6 flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#6D4499]/80">
                    <MapPin size={14} /> {t('home.location')}
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#6D4499]/80">
                    <GraduationCap size={14} /> {t('home.epitech_student')}
                  </div>
                  <div className="relative flex items-center gap-2 text-xs font-semibold text-[#6D4499]/80 mt-2 w-[calc(100%+1rem)] md:w-full marquee-mask">
                    <Code2 size={14} className="shrink-0" />
                    <div className="overflow-hidden pr-8">
                      <div className="flex whitespace-nowrap w-max animate-marquee">
                        {[0, 1].map(copy => (
                          ['C', 'C++', 'Haskell', 'ASM', 'SQL', 'Python', 'JS', 'HTML5', 'CSS3', 'React', 'Linux', 'macOS', 'Windows', 'VS Code', 'WordPress', 'Git', 'N8n'].map(skill => (
                            <span key={`${copy}-${skill}`} aria-hidden={copy === 1} className="shrink-0 px-2 py-0.5 mr-1.5 text-[9px] font-bold uppercase tracking-wider text-[#6D4499] bg-[#6D4499]/15 rounded-full border border-[#6D4499]/20 hover:bg-[#6D4499]/25 transition-colors cursor-default">
                              {skill}
                            </span>
                          ))
                        ))}
                      </div>
                    </div>
                    {/* Edge fades to soften the loop */}
                    <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#C5A8E9] to-transparent pointer-events-none" />
                    <div className="absolute left-6 top-0 bottom-0 w-4 bg-gradient-to-r from-[#C5A8E9] to-transparent pointer-events-none" />
                  </div>
                </div>
                <p className="mt-6 text-[13px] font-medium text-[#6D4499]/80 max-w-sm leading-relaxed border-l-[3px] border-[#6D4499]/30 pl-4 py-1">
                  {t('home.bio')}
                </p>
              </div>
            </div>
          </div>

          <div className={cn("bento-card items-center justify-center text-center", "row-span-2 md:col-span-2 md:row-span-2")}
            style={{ background: COLORS.blush }}>
            <div className="flex flex-col items-center w-full px-4">
              <div className="relative mb-4 group cursor-pointer" onClick={() => navigate('/projects')}>
                <div className="w-24 h-24 rounded-full border-[6px] border-white/50 bg-[#C5A8E9] flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl shadow-xl">
                  <img 
                    src="/Portfolio/assets/logo-moussandou.png" 
                    alt="Moussandou" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      e.currentTarget.parentElement!.innerHTML = '<span class="text-3xl font-black font-display text-white">M..</span>';
                    }}
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl bg-white flex items-center justify-center shadow-lg animate-float-soft group-hover:[animation-play-state:paused] group-hover:rotate-0 transition-transform duration-500">
                  <Sparkles className="text-[#6D4499] w-5 h-5" />
                </div>
              </div>
              <h2 className="text-xl font-bold text-[#6D4499] font-display tracking-tight">Moussandou</h2>
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#3B2356]/40 mt-1">{t('home.role')}</p>
              
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <a href="https://github.com/Moussandou" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="w-8 h-8 rounded-xl bg-[#6D4499]/10 flex items-center justify-center text-[#6D4499] hover:bg-[#6D4499] hover:text-white hover:-translate-y-0.5 transition-all shadow-sm">
                  <Github size={14} />
                </a>
                <a href="https://www.linkedin.com/in/moussandou/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-8 h-8 rounded-xl bg-[#6D4499]/10 flex items-center justify-center text-[#6D4499] hover:bg-[#6D4499] hover:text-white hover:-translate-y-0.5 transition-all shadow-sm">
                  <Linkedin size={14} />
                </a>
                <a href="https://www.instagram.com/takaxdev/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-8 h-8 rounded-xl bg-[#6D4499]/10 flex items-center justify-center text-[#6D4499] hover:bg-[#6D4499] hover:text-white hover:-translate-y-0.5 transition-all shadow-sm">
                  <Instagram size={14} />
                </a>
                <a href="mailto:moussandou.mroivili@epitech.eu" aria-label="Email" className="w-8 h-8 rounded-xl bg-[#6D4499]/10 flex items-center justify-center text-[#6D4499] hover:bg-[#6D4499] hover:text-white hover:-translate-y-0.5 transition-all shadow-sm">
                  <Mail size={14} />
                </a>
              </div>

              <a href="/Portfolio/assets/CV_Moussandou_Mroivili.pdf" target="_blank" rel="noopener noreferrer" className="mt-4 w-full max-w-[180px] py-2 rounded-xl bg-white/50 flex items-center justify-center gap-2 text-[#6D4499] font-bold text-xs hover:bg-white hover:shadow-md transition-all">
                <FileText size={14} /> {t('home.cv_btn')}
              </a>
            </div>
          </div>

          {/* Row 2: Featured Projects (4 + 2) */}
          <ProjectCard project={mainFeatured[0]} className="row-span-2 md:col-span-4 md:row-span-2" />
          <GithubCard className="row-span-2 md:col-span-2 md:row-span-2" />
          
          {/* Row 3: Experience (4) + Featured 2 (2) */}
          <ExperienceCard className="row-span-3 md:col-span-4 md:row-span-2" />
          <ProjectCard project={mainFeatured[1]} className="row-span-2 md:col-span-2 md:row-span-2" />

          {/* Row 4: All Projects (2) + Education (4) */}
          <AllProjectsCard className="row-span-2 md:col-span-2 md:row-span-2" onClick={() => navigate('/projects')} />
          <EducationCard className="row-span-2 md:col-span-4 md:row-span-2" />
          {/* Row 5: Volunteer (4) + Status Card (2) */}
          <VolunteerCard className="row-span-2 md:col-span-4 md:row-span-2" />
          <div className="row-span-2 md:col-span-2 md:row-span-2 bento-card" style={{ background: COLORS.blush }}>
            <StatusCard />
          </div>

          {/* Row 6: Contact (6) */}
          <div
            onClick={() => navigate('/contact')}
            className={cn(
              "bento-card relative overflow-hidden cursor-pointer group flex flex-col items-center justify-center p-8 sm:p-12 text-center",
              "row-span-2 md:col-span-6 md:row-span-2 border-none shadow-xl"
            )}
            style={{ background: COLORS.candy }}
          >
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-500" />
            <div className="absolute top-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <Star className="absolute top-6 left-8 text-white/30 animate-twinkle" />
            <Star className="absolute bottom-8 right-10 text-white/20 animate-twinkle [animation-delay:1.8s]" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-display tracking-tight group-hover:scale-105 transition-transform duration-500">
              {t('home.work_together_title')}
            </h2>
            <p className="mt-4 text-sm sm:text-base font-bold text-white/80 max-w-lg mx-auto leading-relaxed group-hover:-translate-y-1 transition-transform duration-500 delay-75">
              {t('home.work_together_desc')}
            </p>
            <div className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/25 backdrop-blur-md text-white text-xs font-black uppercase tracking-widest group-hover:bg-white group-hover:text-[#6D4499] transition-colors duration-300">
              {t('header.contact')}
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>

        </BentoGrid>
      </main>

      <footer className="py-10 text-center">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-[#3B2356]/25 font-display text-center">
          © 2026 Moussandou Mroivili
        </p>
      </footer>
    </>
  );
}

export default function App() {
  return (
    <HashRouter>
      <I18nProvider>
        <div className="min-h-screen bg-[#F1ECF9]">
          <ScrollRestore />
          <Clouds />
          <Header />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<ProjectList />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </I18nProvider>
    </HashRouter>
  );
}
