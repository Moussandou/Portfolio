import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ScrollToTopProps {
    isHackMode: boolean;
}

export function ScrollToTop({ isHackMode }: ScrollToTopProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    onClick={scrollToTop}
                    className={`fixed bottom-8 right-8 z-50 p-3 rounded-full shadow-lg border-2 transition-all duration-300 ${isHackMode
                            ? 'bg-[#0F1729] border-[#5DADE2] text-[#5DADE2] hover:bg-[#5DADE2] hover:text-black shadow-[0_0_15px_rgba(93,173,226,0.4)]'
                            : 'bg-white border-[#0E6655] text-[#0E6655] hover:bg-[#0E6655] hover:text-white'
                        }`}
                    aria-label="Retour en haut"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                </motion.button>
            )}
        </AnimatePresence>
    );
}
