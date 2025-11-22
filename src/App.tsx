import { useState, useEffect } from 'react';
import { AsciiArt } from './components/AsciiArt';
import { TypewriterEffect } from './components/TypewriterEffect';
import { ScrollReveal } from './components/ScrollReveal';
import { NeofetchSection } from './components/NeofetchSection';
import { TechIcon } from './components/TechIcon';
import { DraggableTerminal } from './components/DraggableTerminal';
import { ThemeProvider, getTerminalColors } from './components/ThemeProvider';
import { Guestbook } from './components/Guestbook';
import { MatrixBackground } from './components/MatrixBackground';
import { MagneticWrapper } from './components/MagneticWrapper';
import { ScrollToTop } from './components/ScrollToTop';
import { SectionNavigation } from './components/SectionNavigation';
import { ParticleClickEffect } from './components/ParticleClickEffect';
import { CustomContextMenu } from './components/CustomContextMenu';
import { KonamiCode } from './components/KonamiCode';
import { LiveClock } from './components/LiveClock';
import { CommandPalette } from './components/CommandPalette';
import { BootSequence } from './components/BootSequence';
import { FeaturesSection } from './components/FeaturesSection';
import { SoundProvider, useSound } from './context/SoundContext';
import { SystemNotification } from './components/SystemNotification';
import { DecryptingText } from './components/DecryptingText';
import { GlitchText } from './components/GlitchText';
import { CrtOverlay } from './components/CrtOverlay';
import { CyberpunkHud } from './components/CyberpunkHud';
import { FakeBSOD } from './components/FakeBSOD';
import Slider from 'react-slick';

// Images & Videos
const bambuImage1 = '/Portfolio/assets/bambu-buddy-1.png';
const bambuImage2 = '/Portfolio/assets/bambu-buddy-2.png';
const bambuImage3 = '/Portfolio/assets/bambu-buddy-3.png';
const jebImage = '/Portfolio/assets/jeb.png';
const moocImage1 = '/Portfolio/assets/icom1.png';
const moocImage2 = '/Portfolio/assets/icom2.png';
const moocImage3 = '/Portfolio/assets/icom3.png';
const rtypeVideo = '/Portfolio/assets/rtype.mp4';

export default function App() {
  return (
    <SoundProvider>
      <AppContent />
    </SoundProvider>
  );
}

function AppContent() {
  const [isHackMode, setIsHackMode] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBootSequence, setShowBootSequence] = useState(true);
  const { playSound, isMuted, toggleMute } = useSound();
  const [notification, setNotification] = useState<{ message: string, type: 'info' | 'success' | 'warning' | 'error' } | null>(null);

  const showNotification = (message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
    setNotification({ message, type });
    playSound(type === 'error' ? 'error' : 'success');
  };

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleKonamiUnlock = () => {
    setIsHackMode(true);
    showNotification("🔓 SYSTEM OVERRIDE: GOD MODE ACTIVATED", 'success');
  };

  return (
    <ThemeProvider isHackMode={isHackMode}>
      {showBootSequence && <BootSequence onComplete={() => setShowBootSequence(false)} />}

      <SystemNotification
        message={notification?.message || null}
        type={notification?.type}
        onClose={() => setNotification(null)}
        isHackMode={isHackMode}
      />

      <div className={`min-h-screen w-full overflow-x-hidden transition-colors duration-500 monocraft relative ${isHackMode
        ? 'bg-[#0A0E1A] crt-screen vhs-noise'
        : 'bg-gradient-to-br from-[#E8F8F5] via-[#D5F4EC] to-[#C8F0E9]'
        }`}>

        {/* Round 3 Enhancements */}
        <CommandPalette isHackMode={isHackMode} setHackMode={setIsHackMode} />

        {/* Round 2 Enhancements */}
        <CustomContextMenu
          isHackMode={isHackMode}
          onToggleTheme={() => setIsHackMode(!isHackMode)}
          onShowNotification={showNotification}
        />
        <KonamiCode onUnlock={handleKonamiUnlock} />
        <LiveClock isHackMode={isHackMode} />
        <CrtOverlay isHackMode={isHackMode} />
        <CyberpunkHud isHackMode={isHackMode} />
        <FakeBSOD />

        {/* UI Enhancements */}
        <ScrollToTop isHackMode={isHackMode} />
        <SectionNavigation isHackMode={isHackMode} />
        <ParticleClickEffect isHackMode={isHackMode} />

        {/* Scroll Progress Bar */}
        <div className="fixed top-0 left-0 h-1 z-[100] transition-all duration-300"
          style={{
            width: `${scrollProgress * 100}%`,
            background: isHackMode ? '#5DADE2' : '#0E6655',
            boxShadow: isHackMode ? '0 0 10px #5DADE2' : 'none'
          }}
        />

        <MatrixBackground isHackMode={isHackMode} />

        {/* Toggle Button & Sound Control - Fixed position responsive */}
        <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 flex flex-col gap-2 items-end">
          <MagneticWrapper strength={15}>
            <button
              onClick={() => {
                setIsHackMode(!isHackMode);
                playSound('success');
              }}
              className={`px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-bold text-xs sm:text-sm transition-all duration-300 transform border-2 flex items-center gap-2 ${isHackMode
                ? 'bg-[#0F1729] border-[#5DADE2] text-[#5DADE2] hover:bg-[#5DADE2] hover:text-black shadow-[0_0_20px_rgba(93,173,226,0.5)]'
                : 'bg-white border-[#0E6655] text-[#0E6655] hover:bg-[#0E6655] hover:text-white shadow-lg'
                }`}
              aria-label="Toggle Theme"
            >
              {isHackMode ? (
                <>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span className="hidden sm:inline">Mode Clair</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                  <span className="hidden sm:inline">Mode Sombre</span>
                </>
              )}
            </button>
          </MagneticWrapper>

          {/* Sound Toggle */}
          <MagneticWrapper strength={10}>
            <button
              onClick={() => {
                toggleMute();
                if (isMuted) playSound('click');
              }}
              className={`p-2 rounded-full border transition-all duration-300 ${isHackMode
                ? isMuted
                  ? 'bg-[#0F1729] border-gray-600 text-gray-600 hover:border-gray-400 hover:text-gray-400'
                  : 'bg-[#0F1729] border-[#5DADE2]/50 text-[#5DADE2] hover:bg-[#5DADE2] hover:text-black shadow-[0_0_10px_rgba(93,173,226,0.3)]'
                : isMuted
                  ? 'bg-white border-gray-300 text-gray-400 hover:border-gray-500 hover:text-gray-500'
                  : 'bg-white border-[#0E6655]/50 text-[#0E6655] hover:bg-[#0E6655] hover:text-white shadow-md'
                }`}
              title={isMuted ? "Unmute Sound" : "Mute Sound"}
            >
              {isMuted ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              )}
            </button>
          </MagneticWrapper>
        </div>

        {/* Main terminal interface - utilisation de tout l'espace */}
        <div className="relative z-10 w-full px-2 sm:px-4 py-6 sm:py-8 lg:px-8 xl:px-12">

          {/* Header with boot sequence */}
          <ScrollReveal delay={0}>
            <div className="mb-12">
              <div className={`${isHackMode ? 'text-[#5DADE2]' : 'text-[#0E6655]'} mb-4`}>
                <TypewriterEffect
                  text="moussandou@localhost:~$ ./lancer_portfolio.sh"
                  speed={80}
                  className="text-lg lg:text-xl"
                  isHackMode={isHackMode}
                />
              </div>
              <div className={`${isHackMode ? 'text-[#85C1E9]' : 'text-[#0E6655]'} mb-6 px-4 py-2 inline-block rounded ${isHackMode ? 'pulse-blue' : 'bg-white/50'}`}>
                [████████████] 100% - Accès autorisé ✓
              </div>
              <div className="text-center mb-8">
                <div className={`${isHackMode ? 'text-[#5DADE2]' : 'text-[#0E6655]'} text-lg lg:text-xl font-semibold`}>
                  <DecryptingText
                    text="// Développeur //"
                    isHackMode={isHackMode}
                    startDelay={1000}
                    className="text-xl lg:text-2xl"
                  />
                </div>
              </div>
              <AsciiArt isHackMode={isHackMode} />
            </div>
          </ScrollReveal>

          {/* Grid layout pour utiliser plus d'espace */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">

            {/* Colonne gauche */}
            <div className="space-y-6 lg:space-y-8">
              {/* Neofetch About Section */}
              <ScrollReveal delay={0}>
                <DraggableTerminal command="neofetch" delay={0} id="neofetch" index={0} isHackMode={isHackMode} colors={getTerminalColors(isHackMode, 0)}>
                  <NeofetchSection isHackMode={isHackMode} />
                </DraggableTerminal>
              </ScrollReveal>

              {/* Skills Section */}
              <ScrollReveal delay={0}>
                <DraggableTerminal command="./competences -list" delay={0} id="skills" index={1} isHackMode={isHackMode} colors={getTerminalColors(isHackMode, 1)}>
                  <div className="space-y-4">
                    <div>
                      <span className={isHackMode ? 'text-[#85C1E9]' : 'text-[#0E6655]'}>Langages :</span>
                      <div className="ml-4 flex flex-wrap gap-2 mt-2">
                        <span className={`px-3 py-1 ${isHackMode ? 'bg-[#0F1729]/80 border-[#5DADE2]/30 text-[#5DADE2] hover-glow pulse-blue' : 'bg-white/80 border-[#0E6655]/40 text-[#0E6655]'} border text-sm flex items-center gap-2`}>
                          <TechIcon name="c" size={14} />
                          C
                        </span>
                        <span className={`px-3 py-1 ${isHackMode ? 'bg-[#0F1729]/80 border-[#5DADE2]/30 text-[#5DADE2] hover-glow pulse-blue' : 'bg-white/80 border-[#0E6655]/40 text-[#0E6655]'} border text-sm flex items-center gap-2`}>
                          <TechIcon name="cpp" size={14} />
                          C++
                        </span>
                        <span className={`px-3 py-1 ${isHackMode ? 'bg-[#0F1729]/80 border-[#5DADE2]/30 text-[#5DADE2] hover-glow pulse-blue' : 'bg-white/80 border-[#0E6655]/40 text-[#0E6655]'} border text-sm flex items-center gap-2`}>
                          <TechIcon name="python" size={14} />
                          Python
                        </span>
                        <span className={`px-3 py-1 ${isHackMode ? 'bg-[#0F1729]/80 border-[#5DADE2]/30 text-[#5DADE2] hover-glow pulse-blue' : 'bg-white/80 border-[#0E6655]/40 text-[#0E6655]'} border text-sm flex items-center gap-2`}>
                          <TechIcon name="javascript" size={14} />
                          JavaScript
                        </span>
                        <span className={`px-3 py-1 ${isHackMode ? 'bg-[#0F1729]/80 border-[#5DADE2]/30 text-[#5DADE2] hover-glow pulse-blue' : 'bg-white/80 border-[#0E6655]/40 text-[#0E6655]'} border text-sm flex items-center gap-2`}>
                          <TechIcon name="html5" size={14} />
                          HTML5
                        </span>
                        <span className={`px-3 py-1 ${isHackMode ? 'bg-[#0F1729]/80 border-[#5DADE2]/30 text-[#5DADE2] hover-glow pulse-blue' : 'bg-white/80 border-[#0E6655]/40 text-[#0E6655]'} border text-sm flex items-center gap-2`}>
                          <TechIcon name="css3" size={14} />
                          CSS3
                        </span>
                        <span className={`px-3 py-1 ${isHackMode ? 'bg-[#0F1729]/80 border-[#5DADE2]/30 text-[#5DADE2] hover-glow pulse-blue' : 'bg-white/80 border-[#0E6655]/40 text-[#0E6655]'} border text-sm`}>
                          SQL
                        </span>
                        <span className={`px-3 py-1 ${isHackMode ? 'bg-[#0F1729]/80 border-[#5DADE2]/30 text-[#5DADE2] hover-glow pulse-blue' : 'bg-white/80 border-[#0E6655]/40 text-[#0E6655]'} border text-sm flex items-center gap-2`}>
                          <TechIcon name="lambda" size={14} />
                          Haskell
                        </span>
                        <span className={`px-3 py-1 ${isHackMode ? 'bg-[#0F1729]/80 border-[#5DADE2]/30 text-[#5DADE2] hover-glow pulse-blue' : 'bg-white/80 border-[#0E6655]/40 text-[#0E6655]'} border text-sm flex items-center gap-2`}>
                          <TechIcon name="cpu" size={14} />
                          ASM
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className={isHackMode ? 'text-[#85C1E9]' : 'text-[#0E6655]'}>Frameworks & Outils :</span>
                      <div className="ml-4 flex flex-wrap gap-2 mt-2">
                        <span className={`px-3 py-1 ${isHackMode ? 'bg-[#0F1729]/80 border-[#85C1E9]/30 text-[#85C1E9] hover-glow pulse-blue' : 'bg-white/80 border-[#0E6655]/40 text-[#0E6655]'} border text-sm flex items-center gap-2`}>
                          <TechIcon name="react" size={14} />
                          React
                        </span>
                        <span className={`px-3 py-1 ${isHackMode ? 'bg-[#0F1729]/80 border-[#85C1E9]/30 text-[#85C1E9] hover-glow pulse-blue' : 'bg-white/80 border-[#0E6655]/40 text-[#0E6655]'} border text-sm flex items-center gap-2`}>
                          <TechIcon name="git" size={14} />
                          Git
                        </span>
                        <span className={`px-3 py-1 ${isHackMode ? 'bg-[#0F1729]/80 border-[#85C1E9]/30 text-[#85C1E9] hover-glow pulse-blue' : 'bg-white/80 border-[#0E6655]/40 text-[#0E6655]'} border text-sm flex items-center gap-2`}>
                          <TechIcon name="wordpress" size={14} />
                          WordPress
                        </span>
                        <span className={`px-3 py-1 ${isHackMode ? 'bg-[#0F1729]/80 border-[#85C1E9]/30 text-[#85C1E9] hover-glow pulse-blue' : 'bg-white/80 border-[#0E6655]/40 text-[#0E6655]'} border text-sm flex items-center gap-2`}>
                          <TechIcon name="hackathon" size={14} />
                          N8n
                        </span>
                        <span className={`px-3 py-1 ${isHackMode ? 'bg-[#0F1729]/80 border-[#85C1E9]/30 text-[#85C1E9] hover-glow pulse-blue' : 'bg-white/80 border-[#0E6655]/40 text-[#0E6655]'} border text-sm flex items-center gap-2`}>
                          <TechIcon name="lambda" size={14} />
                          VS Code
                        </span>
                        <span className={`px-3 py-1 ${isHackMode ? 'bg-[#0F1729]/80 border-[#85C1E9]/30 text-[#85C1E9] hover-glow pulse-blue' : 'bg-white/80 border-[#0E6655]/40 text-[#0E6655]'} border text-sm`}>
                          Trello
                        </span>
                      </div>
                    </div>
                    <div className={`flex items-center gap-2 ${isHackMode ? 'hover-glow' : ''}`}>
                      <span className={isHackMode ? 'text-[#85C1E9]' : 'text-[#0E6655]'}>OS :</span>
                      <div className="flex items-center gap-2 flex-wrap">
                        <TechIcon name="linux" size={16} />
                        <span className={isHackMode ? 'text-[#5DADE2]' : 'text-[#0E6655]'}>Linux</span>
                        <span className={isHackMode ? 'text-white' : 'text-[#117A65]'}>,</span>
                        <TechIcon name="apple" size={16} />
                        <span className={isHackMode ? 'text-[#5DADE2]' : 'text-[#0E6655]'}>macOS</span>
                        <span className={isHackMode ? 'text-white' : 'text-[#117A65]'}>&</span>
                        <TechIcon name="windows" size={16} />
                        <span className={isHackMode ? 'text-[#5DADE2]' : 'text-[#0E6655]'}>Windows</span>
                      </div>
                    </div>
                    <div className={isHackMode ? 'hover-glow' : ''}>
                      <span className={isHackMode ? 'text-[#85C1E9]' : 'text-[#0E6655]'}>Méthodologie :</span>
                      <span className={`ml-2 ${isHackMode ? 'text-[#5DADE2]' : 'text-[#0E6655]'}`}>Agile & Gestion de projets</span>
                    </div>
                  </div>
                </DraggableTerminal>
              </ScrollReveal>

              {/* Experience Section */}
              <ScrollReveal delay={0}>
                <DraggableTerminal command="./experience -dev-only" delay={0} id="experience" index={4} isHackMode={isHackMode} colors={getTerminalColors(isHackMode, 4)}>
                  <div className="space-y-4">
                    <div className={`border-l-2 ${isHackMode ? 'border-[#5DADE2]/50 hover-glow' : 'border-[#0E6655]/60'} pl-4`}>
                      <div className={`${isHackMode ? 'text-[#5DADE2]' : 'text-[#0E6655]'} flex items-center gap-2 font-semibold`}>
                        <TechIcon name="seo" size={16} />
                        <span>Assistant SEO</span>
                      </div>
                      <div className={`text-sm ${isHackMode ? 'text-[#85C1E9]' : 'text-[#0E6655]'}`}>ES DIGITAL SOLUTIONS</div>
                      <div className={`${isHackMode ? 'text-gray-400' : 'text-[#117A65]'} text-xs`}>Sept 2025 - Présent</div>
                      <div className={`${isHackMode ? 'text-gray-300' : 'text-[#117A65]'} text-sm mt-1`}>SEO technique, analyse de données, IA pour contenu</div>
                    </div>

                    <div className={`border-l-2 ${isHackMode ? 'border-[#85C1E9]/50 hover-glow' : 'border-[#0E6655]/60'} pl-4`}>
                      <div className={`${isHackMode ? 'text-[#85C1E9]' : 'text-[#0E6655]'} flex items-center gap-2 font-semibold`}>
                        <TechIcon name="teacher" size={16} />
                        <span>Professeur Informatique</span>
                      </div>
                      <div className={`text-sm ${isHackMode ? 'text-[#85C1E9]' : 'text-[#0E6655]'}`}>École Lacordaire</div>
                      <div className={`${isHackMode ? 'text-gray-400' : 'text-[#117A65]'} text-xs`}>Sept 2025 - Présent</div>
                      <div className={`${isHackMode ? 'text-gray-300' : 'text-[#117A65]'} text-sm mt-1`}>Enseignement HTML/CSS/Python, pédagogie interactive</div>
                    </div>

                    <div className={`border-l-2 ${isHackMode ? 'border-[#85C1E9]/50 hover-glow' : 'border-[#0E6655]/60'} pl-4`}>
                      <div className={`${isHackMode ? 'text-[#85C1E9]' : 'text-[#0E6655]'} flex items-center gap-2 font-semibold`}>
                        <TechIcon name="wordpress" size={16} />
                        <span>Stagiaire Développeur</span>
                      </div>
                      <div className={`text-sm ${isHackMode ? 'text-[#85C1E9]' : 'text-[#0E6655]'}`}>ICOM'Provence</div>
                      <div className={`${isHackMode ? 'text-gray-400' : 'text-[#117A65]'} text-xs`}>Août - Nov 2024</div>
                      <div className={`${isHackMode ? 'text-gray-300' : 'text-[#117A65]'} text-sm mt-1`}>Création site WordPress, UX/UI, médiation numérique</div>
                    </div>
                  </div>
                </DraggableTerminal>
              </ScrollReveal>

              {/* CV Section */}
              <ScrollReveal delay={0}>
                <DraggableTerminal command="./curriculum -full" delay={0} id="curriculum" index={7} isHackMode={isHackMode} colors={getTerminalColors(isHackMode, 7)}>
                  <div className="space-y-4">
                    {/* Formation */}
                    <div className={`border-l-2 ${isHackMode ? 'border-[#5DADE2]/50 hover-glow' : 'border-[#0E6655]/60'} pl-4`}>
                      <div className={`${isHackMode ? 'text-[#5DADE2]' : 'text-[#0E6655]'} font-semibold flex items-center gap-2`}>
                        <TechIcon name="teacher" size={16} />
                        Formation
                      </div>
                      <div className={`text-sm ${isHackMode ? 'text-gray-300' : 'text-[#117A65]'} mt-2 space-y-2`}>
                        <div>
                          <div className="font-medium">Programme Grande École – Informatique</div>
                          <div className={`text-xs ${isHackMode ? 'text-gray-400' : 'text-[#117A65]'}`}>Epitech – Marseille (2023 - 2028)</div>
                          <div className={`text-xs ${isHackMode ? 'text-gray-400' : 'text-[#117A65]'}`}>
                            C, C++, Shell, Systèmes, Réseaux, Web, Architecture logicielle, Git, ASM
                          </div>
                        </div>
                        <div>
                          <div className="font-medium">Baccalauréat Général</div>
                          <div className={`text-xs ${isHackMode ? 'text-gray-400' : 'text-[#117A65]'}`}>Lycée Saint-Exupéry – Marseille (2020 - 2023)</div>
                          <div className={`text-xs ${isHackMode ? 'text-gray-400' : 'text-[#117A65]'}`}>
                            Spécialités : Numérique & Sciences Informatiques, Anglais
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Compétences clés */}
                    <div className={`border-l-2 ${isHackMode ? 'border-[#85C1E9]/50 hover-glow' : 'border-[#0E6655]/60'} pl-4`}>
                      <div className={`${isHackMode ? 'text-[#85C1E9]' : 'text-[#0E6655]'} font-semibold flex items-center gap-2`}>
                        <TechIcon name="hackathon" size={16} />
                        Compétences Clés
                      </div>
                      <div className={`text-sm ${isHackMode ? 'text-gray-300' : 'text-[#117A65]'} mt-1`}>
                        • C, C++, Python, JavaScript, SQL, HTML/CSS, Haskell, ASM
                        <br />
                        • CSFML, Node.js, WordPress, N8n, Git, Trello, VS Code
                        <br />
                        • Programmation orientée objet (C++)
                        <br />
                        • Gestion de projet agile, travail en équipe
                      </div>
                    </div>

                    {/* Projets notables */}
                    <div className={`border-l-2 ${isHackMode ? 'border-[#5DADE2]/50 hover-glow' : 'border-[#0E6655]/60'} pl-4`}>
                      <div className={`${isHackMode ? 'text-[#5DADE2]' : 'text-[#0E6655]'} font-semibold flex items-center gap-2`}>
                        <TechIcon name="cpp" size={16} />
                        Projets Réalisés
                      </div>
                      <div className={`text-sm ${isHackMode ? 'text-gray-300' : 'text-[#117A65]'} mt-1`}>
                        • Jetpack Multiplayer Game (C++ / SFML)
                        <br />
                        • Site Web JEB INCUBATOR (React / HTML / CSS)
                        <br />
                        • Site WordPress – autonomie-numerique.fr
                      </div>
                    </div>

                    {/* Téléchargement CV */}
                    <div className="mt-4 pt-4 border-t border-current/20">
                      <a
                        href="/Portfolio/assets/CV_Moussandou_Mroivili.pdf"
                        download
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${isHackMode
                          ? 'bg-[#0F1729] border-2 border-[#5DADE2] text-[#5DADE2] hover:bg-[#5DADE2] hover:text-black shadow-[0_0_15px_rgba(93,173,226,0.4)]'
                          : 'bg-white border-2 border-[#0E6655] text-[#0E6655] hover:bg-[#0E6655] hover:text-white shadow-lg'
                          } font-semibold`}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Télécharger mon CV (PDF)
                      </a>
                    </div>
                  </div>
                </DraggableTerminal>
              </ScrollReveal>

              {/* Certifications Section */}
              <ScrollReveal delay={0}>
                <DraggableTerminal command="./certifications -valid" delay={0} id="certifications" index={5} isHackMode={isHackMode} colors={getTerminalColors(isHackMode, 5)}>
                  <div className="space-y-3">
                    <div className={`flex items-center gap-2 ${isHackMode ? 'hover-glow' : ''}`}>
                      <span className={`mr-3 ${isHackMode ? 'text-[#5DADE2]' : 'text-[#0E6655]'}`}>[CERT]</span>
                      <span>Cambridge English (B2)</span>
                    </div>
                    <div className={`flex items-center gap-2 ${isHackMode ? 'hover-glow' : ''}`}>
                      <span className={`mr-3 ${isHackMode ? 'text-[#5DADE2]' : 'text-[#0E6655]'}`}>[AUTO]</span>
                      <TechIcon name="hackathon" size={16} />
                      <span>Hackathon N8n – Certification Automatisation IA</span>
                    </div>
                  </div>
                </DraggableTerminal>
              </ScrollReveal>

              {/* Contact Section */}
              <ScrollReveal delay={0}>
                <DraggableTerminal command="./contact -all" delay={0} id="contact" index={2} isHackMode={isHackMode} colors={getTerminalColors(isHackMode, 2)}>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-3">
                      <div className={`flex items-center gap-2 flex-wrap ${isHackMode ? 'hover-glow' : ''}`}>
                        <span className={`mr-3 flex-shrink-0 ${isHackMode ? 'text-[#5DADE2]' : 'text-[#0E6655]'}`}>[TEL]</span>
                        <a href="tel:+33781633278" className={`${isHackMode ? 'text-[#85C1E9] hover:text-[#5DADE2]' : 'text-[#117A65] hover:text-[#0E6655]'} transition-colors break-all text-sm sm:text-base underline decoration-dotted`}>
                          07 81 63 32 78
                        </a>
                      </div>
                      <div className={`flex items-center gap-2 flex-wrap ${isHackMode ? 'hover-glow' : ''}`}>
                        <span className={`mr-3 flex-shrink-0 ${isHackMode ? 'text-[#85C1E9]' : 'text-[#0E6655]'}`}>[MAIL]</span>
                        <TechIcon name="email" size={16} />
                        <a href="mailto:moussandou.mroivili@epitech.eu" className={`${isHackMode ? 'text-[#85C1E9] hover:text-[#5DADE2]' : 'text-[#117A65] hover:text-[#0E6655]'} transition-colors break-all text-sm sm:text-base underline decoration-dotted`}>
                          moussandou.mroivili@epitech.eu
                        </a>
                      </div>
                      <div className={`flex items-center gap-2 flex-wrap ${isHackMode ? 'hover-glow' : ''}`}>
                        <span className={`mr-3 flex-shrink-0 ${isHackMode ? 'text-[#5DADE2]' : 'text-[#0E6655]'}`}>[LOC]</span>
                        <span>Marseille, France</span>
                      </div>
                      <div className={`flex items-center gap-2 flex-wrap ${isHackMode ? 'hover-glow' : ''}`}>
                        <span className={`mr-3 flex-shrink-0 ${isHackMode ? 'text-[#85C1E9]' : 'text-[#0E6655]'}`}>[NET]</span>
                        <TechIcon name="linkedin" size={16} />
                        <a href="https://linkedin.com/in/moussandou" className={`${isHackMode ? 'text-[#85C1E9] hover:text-[#5DADE2]' : 'text-[#117A65] hover:text-[#0E6655]'} transition-colors break-all text-sm sm:text-base underline decoration-dotted`}>
                          linkedin.com/in/moussandou
                        </a>
                      </div>
                      <div className={`flex items-center gap-2 flex-wrap ${isHackMode ? 'hover-glow' : ''}`}>
                        <span className={`mr-3 flex-shrink-0 ${isHackMode ? 'text-[#5DADE2]' : 'text-[#0E6655]'}`}>[INSTA]</span>
                        <a href="https://www.instagram.com/__takax__" target="_blank" rel="noopener noreferrer" className={`${isHackMode ? 'text-[#5DADE2] hover:text-[#85C1E9]' : 'text-[#117A65] hover:text-[#0E6655]'} transition-colors underline decoration-dotted`}>
                          @__takax__
                        </a>
                      </div>
                      <div className={`flex items-center gap-2 flex-wrap ${isHackMode ? 'hover-glow' : ''}`}>
                        <span className={`mr-3 flex-shrink-0 ${isHackMode ? 'text-[#85C1E9]' : 'text-[#0E6655]'}`}>[PAY]</span>
                        <a href="https://www.paypal.com/paypalme/Moussandou17" target="_blank" rel="noopener noreferrer" className={`${isHackMode ? 'text-[#85C1E9] hover:text-[#5DADE2]' : 'text-[#117A65] hover:text-[#0E6655]'} transition-colors underline decoration-dotted`}>
                          PayPal.me/Moussandou17
                        </a>
                      </div>
                    </div>
                  </div>
                </DraggableTerminal>
              </ScrollReveal>

              {/* Features Section */}
              <ScrollReveal delay={0}>
                <DraggableTerminal command="./features -list" delay={0} id="features" index={8} isHackMode={isHackMode} colors={getTerminalColors(isHackMode, 2)}>
                  <FeaturesSection isHackMode={isHackMode} />
                </DraggableTerminal>
              </ScrollReveal>
            </div>

            {/* Colonne droite */}
            <div className="space-y-6 lg:space-y-8">
              {/* Projects Section */}
              <ScrollReveal delay={0}>
                <DraggableTerminal command="./projets -showcase" delay={0} id="projects" index={3} isHackMode={isHackMode} colors={getTerminalColors(isHackMode, 3)}>
                  <div className="space-y-5">
                    {[
                      {
                        name: "Bambu Buddy - 3D Print Manager",
                        desc: "Application de gestion d'impression 3D - Suivi de filaments, calcul de coûts, statistiques de ventes. PWA + Desktop (macOS/Windows)",
                        tech: "React/TypeScript/Tauri",
                        color: "#5DADE2",
                        role: "Full-Stack Developer & Creator",
                        icon: "react",
                        images: [bambuImage1, bambuImage2, bambuImage3],
                        link: "https://bambu-buddy.web.app",
                        github: "https://github.com/moussandou/bambu-buddy"
                      },
                      {
                        name: "R-Type - Jeu Arcade Multijoueur",
                        desc: "Jeu arcade multijoueur géré par un serveur",
                        tech: "C++ SFML",
                        color: "#85C1E9",
                        role: "Développeur Graphique SFML",
                        icon: "cpp",
                        video: rtypeVideo
                      },
                      {
                        name: "JEB - Plateforme Incubateur",
                        desc: "Full-stack React, API intégration, dashboard admin",
                        tech: "React",
                        color: "#5DADE2",
                        role: "Développeur Frontend",
                        icon: "react",
                        image: jebImage
                      },
                      {
                        name: "Zappy - Jeu Réseau Multijoueur",
                        desc: "Serveur TCP/IP, IA clients, protocole personnalisé",
                        tech: "C++",
                        color: "#85C1E9",
                        role: "Développeur Réseau",
                        icon: "cpp"
                      },
                      {
                        name: "Mooc Autonomie numérique (Site Wordpress)",
                        desc: "autonomie-numerique.fr - UX/UI responsive",
                        tech: "WordPress",
                        color: "#85C1E9",
                        role: "Développeur Web",
                        link: "https://autonomie-numerique.fr",
                        icon: "wordpress",
                        images: [moocImage1, moocImage2, moocImage3]
                      },
                      {
                        name: "Minishell",
                        desc: "Implémentation d'un shell Unix complet",
                        tech: "C",
                        color: "#5DADE2",
                        role: "Développeur Système",
                        icon: "c"
                      },
                      {
                        name: "Epytodo",
                        desc: "Gestionnaire de tâches full-stack JS/SQL",
                        tech: "JavaScript",
                        color: "#FFFF00",
                        role: "Full-Stack Dev",
                        icon: "javascript"
                      }
                    ].map((project, index) => {
                      const carouselSettings = {
                        dots: true,
                        infinite: true,
                        speed: 500,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        autoplay: true,
                        autoplaySpeed: 3000,
                        arrows: true,
                        className: "mb-3"
                      };

                      return (
                        <div key={index} className={`border-l-2 ${isHackMode ? 'border-[#5DADE2]/50 hover-glow' : 'border-[#0E6655]/60'} pl-4`}>
                          {project.video && (
                            <div className={`mb-3 rounded-lg overflow-hidden border ${isHackMode ? 'border-[#5DADE2]/30' : 'border-[#0E6655]/30'}`}>
                              {project.video.includes('youtube.com') || project.video.includes('youtu.be') ? (
                                <iframe
                                  src={project.video}
                                  className="w-full aspect-video"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                  title={`Vidéo du projet ${project.name}`}
                                />
                              ) : (
                                <video
                                  src={project.video}
                                  controls
                                  className="w-full h-auto hover:scale-105 transition-transform duration-300"
                                  aria-label={`Démonstration vidéo du projet ${project.name}`}
                                >
                                  Votre navigateur ne supporte pas la lecture de vidéos.
                                </video>
                              )}
                            </div>
                          )}
                          {project.images && project.images.length > 0 && (
                            <div className={`mb-3 rounded-lg overflow-hidden border ${isHackMode ? 'border-[#5DADE2]/30' : 'border-[#0E6655]/30'}`}>
                              <Slider {...carouselSettings}>
                                {project.images.map((img, imgIndex) => (
                                  <div key={imgIndex}>
                                    <img
                                      src={img}
                                      alt={`Capture d'écran ${imgIndex + 1} du projet ${project.name}`}
                                      className="w-full h-auto object-cover"
                                      loading="lazy"
                                    />
                                  </div>
                                ))}
                              </Slider>
                            </div>
                          )}
                          {project.image && (
                            <div className={`mb-3 rounded-lg overflow-hidden border ${isHackMode ? 'border-[#5DADE2]/30' : 'border-[#0E6655]/30'}`}>
                              <img
                                src={project.image}
                                alt={`Aperçu du projet ${project.name}`}
                                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                                loading="lazy"
                              />
                            </div>
                          )}
                          <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
                            <div className="flex items-center gap-2 flex-wrap">
                              {project.link ? (
                                <a
                                  href={project.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`${isHackMode ? 'text-white hover:text-[#5DADE2]' : 'text-[#117A65] hover:text-[#0E6655]'} transition-colors font-semibold underline decoration-dotted`}
                                >
                                  {project.name}
                                </a>
                              ) : (
                                <GlitchText
                                  text={project.name}
                                  isHackMode={isHackMode}
                                  className={`${isHackMode ? 'text-white' : 'text-[#117A65]'} font-semibold`}
                                />
                              )}
                              {project.github && (
                                <a
                                  href={project.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`${isHackMode ? 'text-[#85C1E9] hover:text-[#5DADE2]' : 'text-[#0E6655] hover:text-[#117A65]'} transition-colors flex items-center gap-1 text-xs`}
                                  title="Voir sur GitHub"
                                >
                                  <TechIcon name="git" size={12} />
                                  GitHub
                                </a>
                              )}
                            </div>
                            <div className="flex items-center gap-1">
                              <TechIcon name={project.icon} size={12} />
                              <span className={`px-3 py-1 ${isHackMode ? 'bg-[#0F1729]/80 border-[#5DADE2]/30 text-[#5DADE2] hover-glow pulse-blue' : 'bg-white/80 border-[#0E6655]/40 text-[#0E6655]'} border text-sm`}>
                                {project.tech}
                              </span>
                            </div>
                          </div>
                          <div className={`text-sm ${isHackMode ? 'text-gray-400' : 'text-[#117A65]'}`}>{project.desc}</div>
                          <div className={`text-xs mt-1 ${isHackMode ? 'text-[#5DADE2]' : 'text-[#0E6655]'}`}>Rôle: {project.role}</div>
                        </div>
                      )
                    })}
                  </div>
                </DraggableTerminal>
              </ScrollReveal>

              {/* Guestbook Section */}
              <ScrollReveal delay={0}>
                <DraggableTerminal command="./guestbook -open" delay={0} id="guestbook" index={6} isHackMode={isHackMode} colors={getTerminalColors(isHackMode, 6)}>
                  <Guestbook isHackMode={isHackMode} />
                </DraggableTerminal>
              </ScrollReveal>
            </div>
          </div>

          {/* Easter Egg Footer */}
          <ScrollReveal delay={0}>
            <div className="mt-16 text-center px-2">
              <div className={`${isHackMode ? 'text-[#5DADE2]/30' : 'text-[#0E6655]/40'} text-[10px] sm:text-xs mb-4 float overflow-x-auto`}>
                <pre className="inline-block text-left">
                  {`[SYSTÈME] Connexion établie...
[TERMINAL] Bienvenue dans le réseau, ${new Date().getFullYear()}
[ASTUCE] Clic-Droit = Menu | Cmd+K = Commandes | ↑↑↓↓... = Admin
[AVERTISSEMENT] Ce portfolio peut contenir des traces de code génial`}
                </pre>
              </div>
              <div className={`${isHackMode ? 'text-gray-600 hover-glow' : 'text-[#0E6655]'} text-xs`}>
                moussandou@localhost:~$ <span className="animate-pulse">_</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </ThemeProvider>
  );
}
