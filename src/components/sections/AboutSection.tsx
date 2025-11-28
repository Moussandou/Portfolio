import { SectionWrapper } from '../SectionWrapper';
import { WindowFrame } from '../WindowFrame';
import { NeofetchSection } from '../NeofetchSection';
import { SkillGraph } from '../SkillGraph';
import { education } from '../../data/experience';

interface AboutSectionProps {
    isHackMode: boolean;
}

export function AboutSection({ isHackMode }: AboutSectionProps) {
    return (
        <SectionWrapper id="about">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1 space-y-8">
                    <WindowFrame title="user_profile.sh" isHackMode={isHackMode}>
                        <div className="p-4">
                            <NeofetchSection isHackMode={isHackMode} />
                        </div>
                    </WindowFrame>

                    {/* Education Mini-Section */}
                    <WindowFrame title="education_logs.txt" isHackMode={isHackMode}>
                        <div className="p-6">
                            <h3 className={`text-xl font-bold mb-4 ${isHackMode ? 'text-[#85C1E9]' : 'text-[#117A65]'}`}>
                                {'>'} EDUCATION_LOGS
                            </h3>
                            <div className="space-y-6">
                                {education.map((edu, idx) => (
                                    <div key={idx} className={`border-l-4 ${isHackMode ? 'border-[#5DADE2] bg-[#5DADE2]/5' : 'border-[#0E6655] bg-[#0E6655]/5'} pl-4 py-2 rounded-r`}>
                                        <div className={`${isHackMode ? 'text-[#5DADE2]' : 'text-[#0E6655]'} font-bold text-lg`}>{edu.title}</div>
                                        <div className={`font-semibold ${isHackMode ? 'text-white' : 'text-black'}`}>{edu.school}</div>
                                        <div className={`text-sm font-mono ${isHackMode ? 'text-gray-400' : 'text-gray-500'}`}>[{edu.period}]</div>
                                        <div className={`text-sm mt-2 ${isHackMode ? 'text-gray-300' : 'text-gray-600'}`}>{edu.details}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </WindowFrame>
                </div>

                <div className="order-1 lg:order-2 h-[500px] lg:h-[600px]">
                    <WindowFrame title="skill_matrix_viz.exe" isHackMode={isHackMode} className="h-full" noPadding>
                        <div className="absolute inset-0">
                            <SkillGraph />
                        </div>
                    </WindowFrame>
                </div>
            </div>
        </SectionWrapper>
    );
}
