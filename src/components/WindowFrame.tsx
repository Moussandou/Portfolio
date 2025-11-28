import { ReactNode } from 'react';

interface WindowFrameProps {
    children: ReactNode;
    title?: string;
    isHackMode: boolean;
    className?: string;
    noPadding?: boolean;
}

export function WindowFrame({ children, title = "Terminal", isHackMode, className = "", noPadding = false }: WindowFrameProps) {
    return (
        <div className={`rounded-lg overflow-hidden border shadow-xl transition-all duration-300 flex flex-col ${isHackMode
            ? 'bg-[#0A0E1A] border-[#5DADE2]/50 shadow-[0_0_20px_rgba(93,173,226,0.1)]'
            : 'bg-white border-[#0E6655]/30 shadow-lg'
            } ${className}`}>
            {/* Window Header */}
            <div className={`h-8 flex items-center px-4 border-b select-none shrink-0 ${isHackMode
                ? 'bg-[#1a2639] border-[#5DADE2]/30'
                : 'bg-gray-100 border-gray-300'
                }`}>
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border-[#DEA123]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#27C93F] border-[#1AAB29]"></div>
                </div>
                <div className={`ml-4 text-xs font-mono flex-1 text-center opacity-70 ${isHackMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {title}
                </div>
                <div className="w-12"></div> {/* Spacer for centering */}
            </div>
            {/* Window Content */}
            <div className={`relative flex-1 min-h-0 flex flex-col ${noPadding ? '' : 'p-4'}`}>
                {children}
            </div>
        </div>
    );
}
