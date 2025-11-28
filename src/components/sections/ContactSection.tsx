import { SectionWrapper } from '../SectionWrapper';
import { WindowFrame } from '../WindowFrame';
import { GlitchText } from '../GlitchText';
import { TechIcon } from '../TechIcon';
import { Guestbook } from '../Guestbook';

interface ContactSectionProps {
    isHackMode: boolean;
}

export function ContactSection({ isHackMode }: ContactSectionProps) {
    return (
        <SectionWrapper id="contact">
            <h2 className={`text-3xl font-bold mb-12 text-center ${isHackMode ? 'text-[#5DADE2]' : 'text-[#0E6655]'}`}>
                <GlitchText text="> ESTABLISH_UPLINK" isHackMode={isHackMode} />
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto w-full">
                <WindowFrame title="contact_protocol.enc" isHackMode={isHackMode}>
                    <div className="p-8">
                        <h3 className={`text-xl font-bold mb-6 ${isHackMode ? 'text-white' : 'text-[#0E6655]'}`}>Contact Channels</h3>
                        <div className="space-y-6">
                            <a href="mailto:moussandou.mroivili@epitech.eu" className={`flex items-center gap-4 p-4 rounded-lg transition-colors ${isHackMode ? 'hover:bg-[#5DADE2]/10' : 'hover:bg-[#0E6655]/10'}`}>
                                <div className={`p-3 rounded-full shrink-0 ${isHackMode ? 'bg-[#5DADE2]/20 text-[#5DADE2]' : 'bg-[#0E6655]/10 text-[#0E6655]'}`}>
                                    <TechIcon name="email" size={24} />
                                </div>
                                <div className="min-w-0">
                                    <div className={`text-sm ${isHackMode ? 'text-gray-400' : 'text-gray-500'}`}>Email Protocol</div>
                                    <div className={`font-mono break-all ${isHackMode ? 'text-white' : 'text-[#0E6655]'}`}>moussandou.mroivili@epitech.eu</div>
                                </div>
                            </a>

                            <a href="tel:+33781633278" className={`flex items-center gap-4 p-4 rounded-lg transition-colors ${isHackMode ? 'hover:bg-[#5DADE2]/10' : 'hover:bg-[#0E6655]/10'}`}>
                                <div className={`p-3 rounded-full shrink-0 ${isHackMode ? 'bg-[#5DADE2]/20 text-[#5DADE2]' : 'bg-[#0E6655]/10 text-[#0E6655]'}`}>
                                    <span className="font-bold">TEL</span>
                                </div>
                                <div className="min-w-0">
                                    <div className={`text-sm ${isHackMode ? 'text-gray-400' : 'text-gray-500'}`}>Voice Line</div>
                                    <div className={`font-mono ${isHackMode ? 'text-white' : 'text-[#0E6655]'}`}>07 81 63 32 78</div>
                                </div>
                            </a>

                            <a href="https://linkedin.com/in/moussandou" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-4 p-4 rounded-lg transition-colors ${isHackMode ? 'hover:bg-[#5DADE2]/10' : 'hover:bg-[#0E6655]/10'}`}>
                                <div className={`p-3 rounded-full shrink-0 ${isHackMode ? 'bg-[#5DADE2]/20 text-[#5DADE2]' : 'bg-[#0E6655]/10 text-[#0E6655]'}`}>
                                    <TechIcon name="linkedin" size={24} />
                                </div>
                                <div className="min-w-0">
                                    <div className={`text-sm ${isHackMode ? 'text-gray-400' : 'text-gray-500'}`}>Professional Network</div>
                                    <div className={`font-mono break-all ${isHackMode ? 'text-white' : 'text-[#0E6655]'}`}>linkedin.com/in/moussandou</div>
                                </div>
                            </a>

                            <a href="https://github.com/moussandou" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-4 p-4 rounded-lg transition-colors ${isHackMode ? 'hover:bg-[#5DADE2]/10' : 'hover:bg-[#0E6655]/10'}`}>
                                <div className={`p-3 rounded-full shrink-0 ${isHackMode ? 'bg-[#5DADE2]/20 text-[#5DADE2]' : 'bg-[#0E6655]/10 text-[#0E6655]'}`}>
                                    <TechIcon name="git" size={24} />
                                </div>
                                <div className="min-w-0">
                                    <div className={`text-sm ${isHackMode ? 'text-gray-400' : 'text-gray-500'}`}>Code Repository</div>
                                    <div className={`font-mono break-all ${isHackMode ? 'text-white' : 'text-[#0E6655]'}`}>github.com/moussandou</div>
                                </div>
                            </a>
                        </div>

                        <div className="mt-8 pt-8 border-t border-gray-700/50 text-center">
                            <a
                                href="/Portfolio/assets/CV_Moussandou_Mroivili.pdf"
                                download
                                className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all ${isHackMode
                                    ? 'bg-[#5DADE2] text-black hover:bg-[#85C1E9] shadow-[0_0_20px_rgba(93,173,226,0.4)]'
                                    : 'bg-[#0E6655] text-white hover:bg-[#117A65] shadow-lg'}`}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                DOWNLOAD_CV.PDF
                            </a>
                        </div>
                    </div>
                </WindowFrame>

                <WindowFrame title="guestbook.log" isHackMode={isHackMode}>
                    <Guestbook isHackMode={isHackMode} />
                </WindowFrame>
            </div>

            <footer className={`mt-20 text-center text-xs ${isHackMode ? 'text-gray-500' : 'text-gray-400'}`}>
                <p>SYSTEM_STATUS: ONLINE | UPTIME: {Math.floor(performance.now() / 1000)}s</p>
                <p className="mt-2">© {new Date().getFullYear()} Moussandou Mroivili. All rights reserved.</p>
            </footer>
        </SectionWrapper>
    );
}
