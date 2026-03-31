import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
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
import { Contact } from './pages/Contact';
import { cn } from './lib/utils';
import { MapPin, Sparkles, Code2, GraduationCap, Github, Linkedin, Instagram, Mail, FileText } from 'lucide-react';

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
  candy:      '#E5A5C8',
  candyLight: '#F0C4DB',
  grape:      '#8D4074',
  violet:     '#6B3FA0',
  violetSoft: '#9B6BC2',
  plum:       '#A85D8E',
  mauve:      '#C48AAE',
  blush:      '#F2D4E4',
};



function Home() {
  const navigate = useNavigate();
  const mainFeatured = projects.slice(0, 2);

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
                  <Star className="text-white/60" />
                  <Star className="text-white/30" />
                </div>
                <div className="px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#5a2848]/80">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Disponible pour projets
                </div>
              </div>
              
              <div className="mt-8">
                <h1 className="text-5xl md:text-6xl font-bold leading-[0.85] text-[#5a2848] font-display tracking-tight">
                  Développeur
                </h1>
                <div className="mt-6 flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#8D4074]/80">
                    <MapPin size={14} /> Marseille, France
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#8D4074]/80">
                    <GraduationCap size={14} /> Étudiant à Epitech
                  </div>
                  <div className="relative flex items-center gap-2 text-xs font-semibold text-[#8D4074]/80 mt-2 w-[calc(100%+1rem)] md:w-full">
                    <Code2 size={14} className="shrink-0" /> 
                    <div className="flex gap-1.5 overflow-x-auto whitespace-nowrap pb-2 -mb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pr-8">
                      {['C', 'C++', 'Haskell', 'ASM', 'SQL', 'Python', 'JS', 'HTML5', 'CSS3', 'React', 'Linux', 'macOS', 'Windows', 'VS Code', 'WordPress', 'Git', 'N8n'].map(skill => (
                        <span key={skill} className="shrink-0 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#8D4074] bg-[#8D4074]/15 rounded-full border border-[#8D4074]/20 hover:bg-[#8D4074]/25 transition-colors cursor-default">
                          {skill}
                        </span>
                      ))}
                    </div>
                    {/* Fade Effect on the right to indicate scrolling */}
                    <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#E5A5C8] to-transparent pointer-events-none" />
                  </div>
                </div>
                <p className="mt-6 text-[13px] font-medium text-[#8D4074]/80 max-w-sm leading-relaxed border-l-[3px] border-[#8D4074]/30 pl-4 py-1">
                  Je suis étudiant en 3ᵉ année à Epitech, où je développe mes compétences en informatique à travers des projets concrets, innovants et orientés impact.
                </p>
              </div>
            </div>
          </div>

          <div className={cn("bento-card items-center justify-center text-center", "row-span-2 md:col-span-2 md:row-span-2")}
            style={{ background: COLORS.blush }}>
            <div className="flex flex-col items-center w-full px-4">
              <div className="relative mb-4 group cursor-pointer" onClick={() => navigate('/projects')}>
                <div className="w-24 h-24 rounded-full border-[6px] border-white/50 bg-[#E5A5C8] flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl shadow-xl">
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
                <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl bg-white flex items-center justify-center shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
                  <Sparkles className="text-[#8D4074] w-5 h-5" />
                </div>
              </div>
              <h2 className="text-xl font-bold text-[#8D4074] font-display tracking-tight">Moussandou</h2>
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#5a2848]/40 mt-1">Développeur</p>
              
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <a href="https://github.com/Moussandou" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-xl bg-[#8D4074]/10 flex items-center justify-center text-[#8D4074] hover:bg-[#8D4074] hover:text-white transition-all shadow-sm">
                  <Github size={14} />
                </a>
                <a href="https://www.linkedin.com/in/moussandou/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-xl bg-[#8D4074]/10 flex items-center justify-center text-[#8D4074] hover:bg-[#8D4074] hover:text-white transition-all shadow-sm">
                  <Linkedin size={14} />
                </a>
                <a href="https://www.instagram.com/takaxdev/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-xl bg-[#8D4074]/10 flex items-center justify-center text-[#8D4074] hover:bg-[#8D4074] hover:text-white transition-all shadow-sm">
                  <Instagram size={14} />
                </a>
                <a href="mailto:moussandou.mroivili@epitech.eu" className="w-8 h-8 rounded-xl bg-[#8D4074]/10 flex items-center justify-center text-[#8D4074] hover:bg-[#8D4074] hover:text-white transition-all shadow-sm">
                  <Mail size={14} />
                </a>
              </div>

              <a href="/Portfolio/assets/CV_Moussandou_Mroivili.pdf" target="_blank" rel="noopener noreferrer" className="mt-4 w-full max-w-[180px] py-2 rounded-xl bg-white/50 flex items-center justify-center gap-2 text-[#8D4074] font-bold text-xs hover:bg-white hover:shadow-md transition-all">
                <FileText size={14} /> Consulter mon CV
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

          {/* Row 5: Volunteer (4) + Spacer/Other (2) */}
          <VolunteerCard className="row-span-2 md:col-span-4 md:row-span-2" />
          <div className="hidden md:block row-span-2 md:col-span-2" style={{ background: COLORS.blush, borderRadius: '2rem' }} />

          {/* Row 5: Contact (6) */}
          <div 
            onClick={() => navigate('/contact')}
            className={cn(
              "bento-card relative overflow-hidden cursor-pointer group flex flex-col items-center justify-center p-8 sm:p-12 text-center", 
              "row-span-1 md:col-span-6 md:row-span-1 border-none shadow-xl"
            )}
            style={{ background: COLORS.candy }}
          >
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-500" />
            <div className="absolute top-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-display tracking-tight group-hover:scale-105 transition-transform duration-500">
              Travaillons ensemble
            </h2>
            <p className="mt-4 text-sm sm:text-base font-bold text-white/80 max-w-lg mx-auto leading-relaxed group-hover:-translate-y-1 transition-transform duration-500 delay-75">
              Cliquez ici pour obtenir mon CV complet, mon email et mes réseaux sociaux !
            </p>
          </div>

        </BentoGrid>
      </main>

      <footer className="py-10 text-center">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-[#5a2848]/25 font-display text-center">
          © 2025 Moussandou Mroivili
        </p>
      </footer>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter basename="/Portfolio">
      <div className="min-h-screen bg-[#F5E6EE]">
        <Clouds />
        <Header />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
