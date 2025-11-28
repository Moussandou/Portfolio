import { motion } from 'framer-motion';
import { AsciiArt } from '../AsciiArt';
import { TypewriterEffect } from '../TypewriterEffect';
import { DecryptingText } from '../DecryptingText';
import { SectionWrapper } from '../SectionWrapper';

interface HeroSectionProps {
    isHackMode: boolean;
}

export function HeroSection({ isHackMode }: HeroSectionProps) {
    return (
        <SectionWrapper id="hero" className="items-center text-center">
            <div className="mb-8">
                <AsciiArt isHackMode={isHackMode} />
            </div>
            <div className={`${isHackMode ? 'text-[#5DADE2]' : 'text-[#0E6655]'} mb-4`}>
                <TypewriterEffect
                    text="moussandou@localhost:~$ ./lancer_portfolio.sh"
                    speed={80}
                    className="text-lg lg:text-2xl"
                    isHackMode={isHackMode}
                />
            </div>
            <div className={`${isHackMode ? 'text-[#85C1E9]' : 'text-[#0E6655]'} mb-8 px-4 py-2 inline-block rounded ${isHackMode ? 'pulse-blue' : 'bg-white/50'}`}>
                [████████████] 100% - Accès autorisé ✓
            </div>
            <div className={`text-[var(--theme-primary)] text-2xl lg:text-4xl font-bold mb-12`}>
                <DecryptingText
                    text="// Développeur Full-Stack //"
                    isHackMode={isHackMode}
                    startDelay={1000}
                />
            </div>
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className={`absolute bottom-10 ${isHackMode ? 'text-[#5DADE2]' : 'text-[#0E6655]'} text-sm`}
            >
                SCROLL TO INITIALIZE SYSTEM ↓
            </motion.div>
        </SectionWrapper>
    );
}
