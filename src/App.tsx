import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ScrollToTop } from './components/ScrollToTop';
import { SectionNavigation } from './components/SectionNavigation';
import { ParticleClickEffect } from './components/ParticleClickEffect';
import { CustomContextMenu } from './components/CustomContextMenu';
import { KonamiCode } from './components/KonamiCode';
import { LiveClock } from './components/LiveClock';
import { CommandPalette } from './components/CommandPalette';
import { BootSequence } from './components/BootSequence';
import { SoundProvider, useSound } from './context/SoundContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { FileSystemProvider } from './context/FileSystemContext';
import { AchievementProvider, useAchievements } from './context/AchievementContext';
import { HackerTyperProvider } from './context/HackerTyperContext';
import { DataVizProvider } from './context/DataVizContext';
import { AchievementNotification } from './components/AchievementNotification';
import { HackerTyper } from './components/HackerTyper';
import { SystemNotification } from './components/SystemNotification';
import { CrtOverlay } from './components/CrtOverlay';
import { CyberpunkHud } from './components/CyberpunkHud';
import { FakeBSOD } from './components/FakeBSOD';
import { MatrixBackground } from './components/MatrixBackground';
import { MagneticWrapper } from './components/MagneticWrapper';

// Section Components
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { SystemSection } from './components/sections/SystemSection';
import { ContactSection } from './components/sections/ContactSection';

export default function App() {
  return (
    <SoundProvider>
      <ThemeProvider>
        <FileSystemProvider>
          <AchievementProvider>
            <HackerTyperProvider>
              <DataVizProvider>
                <AppContent />
              </DataVizProvider>
            </HackerTyperProvider>
          </AchievementProvider>
        </FileSystemProvider>
      </ThemeProvider>
    </SoundProvider>
  );
}

function AppContent() {
  const { isHackMode, toggleHackMode, setHackMode } = useTheme();
  const { unlockAchievement } = useAchievements();

  const [showBootSequence, setShowBootSequence] = useState(true);
  const { playSound, isMuted, toggleMute } = useSound();
  const [crtIntensity, setCrtIntensity] = useState<'off' | 'low' | 'high'>('low');
  const [notification, setNotification] = useState<{ message: string, type: 'info' | 'success' | 'warning' | 'error' } | null>(null);

  const showNotification = (message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
    setNotification({ message, type });
    playSound(type === 'error' ? 'error' : 'success');
  };

  // Sync CRT intensity with Hack Mode
  useEffect(() => {
    if (!isHackMode) {
      setCrtIntensity('off');
    } else {
      setCrtIntensity('low');
    }
  }, [isHackMode]);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleKonamiUnlock = () => {
    setHackMode(true);
    unlockAchievement('konami_master');
    showNotification("🔓 SYSTEM OVERRIDE: GOD MODE ACTIVATED", 'success');
  };

  const handleReload = () => {
    setShowBootSequence(true);
    playSound('startup');
  };

  return (
    <>
      {showBootSequence && <BootSequence onComplete={() => {
        setShowBootSequence(false);
        window.scrollTo(0, 0);
      }} />}

      <SystemNotification
        message={notification?.message || null}
        type={notification?.type}
        onClose={() => setNotification(null)}
        isHackMode={isHackMode}
      />
      <AchievementNotification />

      <div className={`min-h-screen w-full overflow-x-hidden transition-colors duration-500 monocraft relative ${isHackMode
        ? 'bg-[#0A0E1A] crt-screen vhs-noise dark'
        : 'bg-gradient-to-br from-[#E8F8F5] via-[#D5F4EC] to-[#C8F0E9]'
        }`}>

        {/* Global UI Elements */}
        <CommandPalette isHackMode={isHackMode} setHackMode={setHackMode} onReload={handleReload} />
        <CustomContextMenu
          isHackMode={isHackMode}
          onToggleTheme={toggleHackMode}
          onShowNotification={showNotification}
          onReload={handleReload}
        />
        <KonamiCode onUnlock={handleKonamiUnlock} />
        <LiveClock isHackMode={isHackMode} />
        <CrtOverlay intensity={crtIntensity} />
        <HackerTyper />
        <CyberpunkHud isHackMode={isHackMode} />
        <FakeBSOD />
        <ScrollToTop isHackMode={isHackMode} />
        <SectionNavigation isHackMode={isHackMode} />
        <ParticleClickEffect isHackMode={isHackMode} />

        {/* Scroll Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 h-1 z-[100]"
          style={{
            scaleX,
            transformOrigin: "0%",
            background: isHackMode ? '#5DADE2' : '#0E6655',
            boxShadow: isHackMode ? '0 0 10px #5DADE2' : 'none'
          }}
        />

        {/* Matrix Background (Only in Hack Mode) */}
        <MatrixBackground isHackMode={isHackMode} />

        {/* Controls (Theme, Sound, CRT) */}
        <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 flex flex-col gap-2 items-end">
          <MagneticWrapper strength={15}>
            <button
              onClick={() => {
                toggleHackMode();
                if (!isHackMode) unlockAchievement('hacker_mode');
                playSound('success');
              }}
              className={`px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-bold text-xs sm:text-sm transition-all duration-300 transform border-2 flex items-center gap-2 ${isHackMode
                ? 'bg-[#0F1729] border-[#5DADE2] text-[#5DADE2] hover:bg-[#5DADE2] hover:text-black shadow-[0_0_20px_rgba(93,173,226,0.5)]'
                : 'bg-white border-[#0E6655] text-[#0E6655] hover:bg-[#0E6655] hover:text-white shadow-lg'
                }`}
            >
              {isHackMode ? (
                <>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                  <span className="hidden sm:inline">Mode Clair</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                  <span className="hidden sm:inline">Mode Sombre</span>
                </>
              )}
            </button>
          </MagneticWrapper>
          <MagneticWrapper strength={10}>
            <button onClick={toggleMute} className={`p-2 rounded-full transition-all duration-300 ${isHackMode ? 'text-[#5DADE2] hover:bg-[#5DADE2]/20' : 'text-[#0E6655] hover:bg-[#0E6655]/10'}`}>
              {isMuted ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
              )}
            </button>
          </MagneticWrapper>
          <MagneticWrapper strength={10}>
            <button onClick={() => setCrtIntensity(prev => prev === 'low' ? 'high' : prev === 'high' ? 'off' : 'low')} className={`p-2 rounded-lg transition-all duration-300 font-mono text-xs ${isHackMode ? 'text-[#5DADE2] border border-[#5DADE2]/30 hover:bg-[#5DADE2]/20' : 'text-[#0E6655] border border-[#0E6655]/30 hover:bg-[#0E6655]/10'}`}>
              CRT: {crtIntensity.toUpperCase()}
            </button>
          </MagneticWrapper>
        </div>

        {/* --- MAIN CONTENT SECTIONS --- */}
        <HeroSection isHackMode={isHackMode} />
        <AboutSection isHackMode={isHackMode} />
        <ProjectsSection isHackMode={isHackMode} />
        <SystemSection isHackMode={isHackMode} />
        <ContactSection isHackMode={isHackMode} />

      </div>
    </>
  );
}
