import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '../context/SoundContext';

interface CustomContextMenuProps {
    isHackMode: boolean;
    onToggleTheme: () => void;
    onShowNotification: (message: string, type?: 'info' | 'success' | 'warning' | 'error') => void;
}

export function CustomContextMenu({ isHackMode, onToggleTheme, onShowNotification }: CustomContextMenuProps) {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const menuRef = useRef<HTMLDivElement>(null);
    const { playSound } = useSound();

    useEffect(() => {
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
            setVisible(true);
            setPosition({ x: e.clientX, y: e.clientY });
            playSound('click');
        };

        const handleClick = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setVisible(false);
            }
        };

        window.addEventListener('contextmenu', handleContextMenu);
        window.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('contextmenu', handleContextMenu);
            window.removeEventListener('click', handleClick);
        };
    }, [playSound]);

    const menuItems = [
        { label: '📂 Voir les Features', action: () => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }) },
        { label: '📄 Télécharger CV', action: () => window.open('/Portfolio/assets/CV_Moussandou_Mroivili.pdf', '_blank') },
        { label: '📧 Envoyer un mail', action: () => window.location.href = 'mailto:moussandou.mroivili@epitech.eu' },
        { label: '🐙 GitHub Profile', action: () => window.open('https://github.com/moussandou', '_blank') },
        { label: '🔄 Changer Thème', action: onToggleTheme },
        { label: '💻 System Info', action: () => onShowNotification('OS: WebOS v2.0\nKernel: React 18\nShell: ZSH\nUptime: ' + Math.floor(performance.now() / 1000) + 's', 'info') },
    ];

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    ref={menuRef}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.1 }}
                    className={`fixed z-[100] min-w-[160px] w-auto rounded-lg border backdrop-blur-md shadow-xl overflow-hidden ${isHackMode
                        ? 'bg-[#0F1729]/95 border-[#5DADE2] text-[#5DADE2] shadow-[0_0_15px_rgba(93,173,226,0.3)]'
                        : 'bg-white/95 border-[#0E6655] text-[#0E6655] shadow-lg'
                        }`}
                    style={{ top: position.y, left: position.x }}
                >
                    <div className={`px-3 py-2 text-xs font-bold border-b ${isHackMode ? 'border-[#5DADE2]/30 bg-[#5DADE2]/10' : 'border-[#0E6655]/30 bg-[#0E6655]/10'}`}>
                        MENU CONTEXTUEL
                    </div>
                    <div className="p-1">
                        {menuItems.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    item.action();
                                    setVisible(false);
                                    playSound('success');
                                }}
                                onMouseEnter={() => playSound('hover')}
                                className={`w-full text-left px-3 py-2 text-sm rounded transition-colors whitespace-nowrap ${isHackMode
                                    ? 'hover:bg-[#5DADE2] hover:text-[#0F1729]'
                                    : 'hover:bg-[#0E6655] hover:text-white'
                                    }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
