import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '../context/SoundContext';

interface CommandPaletteProps {
    isHackMode: boolean;
    setHackMode: (value: boolean) => void;
    onReload: () => void;
}

export function CommandPalette({ isHackMode, setHackMode, onReload }: CommandPaletteProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const { playSound } = useSound();

    const commands = [
        { id: 'theme', label: 'Toggle Theme', action: () => setHackMode(!isHackMode), icon: '🌓' },
        { id: 'reload', label: 'Reload System / Reboot', action: onReload, icon: '🚀' },
        { id: 'top', label: 'Scroll to Top', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }), icon: '⬆️' },
        { id: 'projects', label: 'Go to Projects', action: () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }), icon: '📂' },
        { id: 'contact', label: 'Go to Contact', action: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), icon: '📧' },
        { id: 'skills', label: 'Go to Skills', action: () => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }), icon: '⚡' },
        { id: 'github', label: 'Open GitHub', action: () => window.open('https://github.com/moussandou', '_blank'), icon: '🐙' },
        { id: 'linkedin', label: 'Open LinkedIn', action: () => window.open('https://linkedin.com/in/moussandou', '_blank'), icon: '💼' },
    ];

    const filteredCommands = commands.filter(cmd =>
        cmd.label.toLowerCase().includes(query.toLowerCase())
    );

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(prev => !prev);
                playSound('click');
            }
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [playSound]);

    useEffect(() => {
        const handleNavigation = (e: KeyboardEvent) => {
            if (!isOpen) return;

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
                playSound('hover');
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
                playSound('hover');
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (filteredCommands[selectedIndex]) {
                    filteredCommands[selectedIndex].action();
                    setIsOpen(false);
                    playSound('success');
                }
            }
        };

        window.addEventListener('keydown', handleNavigation);
        return () => window.removeEventListener('keydown', handleNavigation);
    }, [isOpen, filteredCommands, selectedIndex, playSound]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className={`relative w-full max-w-lg rounded-xl shadow-2xl overflow-hidden border ${isHackMode
                            ? 'bg-[#0F1729] border-[#5DADE2] shadow-[0_0_30px_rgba(93,173,226,0.3)]'
                            : 'bg-white border-[#0E6655] shadow-xl'
                            }`}
                    >
                        <div className={`flex items-center px-4 py-3 border-b ${isHackMode ? 'border-[#5DADE2]/30' : 'border-[#0E6655]/20'}`}>
                            <span className="mr-3 text-lg">🔍</span>
                            <input
                                autoFocus
                                type="text"
                                placeholder="Type a command..."
                                value={query}
                                onChange={e => {
                                    setQuery(e.target.value);
                                    setSelectedIndex(0);
                                    playSound('typing');
                                }}
                                className={`w-full bg-transparent outline-none text-lg ${isHackMode ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'
                                    }`}
                            />
                            <div className={`text-xs px-2 py-1 rounded border ${isHackMode ? 'border-[#5DADE2]/30 text-[#5DADE2]' : 'border-gray-300 text-gray-500'
                                }`}>
                                ESC
                            </div>
                        </div>
                        <div className="max-h-[300px] overflow-y-auto p-2">
                            {filteredCommands.map((cmd, index) => (
                                <button
                                    key={cmd.id}
                                    onClick={() => {
                                        cmd.action();
                                        setIsOpen(false);
                                        playSound('success');
                                    }}
                                    onMouseEnter={() => {
                                        setSelectedIndex(index);
                                        playSound('hover');
                                    }}
                                    className={`w-full flex items-center px-3 py-3 rounded-lg transition-colors ${index === selectedIndex
                                        ? isHackMode
                                            ? 'bg-[#5DADE2]/20 text-[#5DADE2]'
                                            : 'bg-[#0E6655]/10 text-[#0E6655]'
                                        : isHackMode
                                            ? 'text-gray-400 hover:bg-[#5DADE2]/10'
                                            : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    <span className="mr-3 text-xl">{cmd.icon}</span>
                                    <span className="flex-1 text-left font-medium">{cmd.label}</span>
                                    {index === selectedIndex && (
                                        <span className="text-xs opacity-50">↵</span>
                                    )}
                                </button>
                            ))}
                            {filteredCommands.length === 0 && (
                                <div className="p-4 text-center text-gray-500">
                                    No commands found.
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
