import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

interface SystemNotificationProps {
    message: string | null;
    onClose: () => void;
    isHackMode: boolean;
    type?: 'info' | 'success' | 'warning' | 'error';
}

export function SystemNotification({ message, onClose, isHackMode, type = 'info' }: SystemNotificationProps) {
    useEffect(() => {
        if (message) {
            const timer = setTimeout(onClose, 3000);
            return () => clearTimeout(timer);
        }
    }, [message, onClose]);

    return (
        <AnimatePresence>
            {message && (
                <motion.div
                    initial={{ opacity: 0, y: -50, x: '-50%' }}
                    animate={{ opacity: 1, y: 0, x: '-50%' }}
                    exit={{ opacity: 0, y: -20, x: '-50%' }}
                    className={`fixed top-20 left-1/2 z-[200] px-6 py-3 rounded-lg shadow-2xl border backdrop-blur-md flex items-center gap-3 min-w-[300px] max-w-[90vw] ${isHackMode
                            ? 'bg-[#0F1729]/90 border-[#5DADE2] text-[#5DADE2] shadow-[0_0_20px_rgba(93,173,226,0.4)]'
                            : 'bg-white/90 border-[#0E6655] text-[#0E6655] shadow-lg'
                        }`}
                >
                    <div className={`p-1 rounded-full ${isHackMode ? 'bg-[#5DADE2]/20' : 'bg-[#0E6655]/10'}`}>
                        {type === 'success' && (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        )}
                        {type === 'info' && (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        )}
                        {type === 'warning' && (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        )}
                    </div>
                    <div className="flex-1 font-mono text-sm">
                        {message.split('\n').map((line, i) => (
                            <div key={i}>{line}</div>
                        ))}
                    </div>
                    <button
                        onClick={onClose}
                        className={`p-1 rounded hover:bg-black/10 transition-colors`}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
