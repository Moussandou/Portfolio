import Slider from 'react-slick';
import { SectionWrapper } from '../SectionWrapper';
import { WindowFrame } from '../WindowFrame';
import { GlitchText } from '../GlitchText';
import { TechIcon } from '../TechIcon';
import { projects } from '../../data/projects';
import { experiences } from '../../data/experience';

interface ProjectsSectionProps {
    isHackMode: boolean;
}

export function ProjectsSection({ isHackMode }: ProjectsSectionProps) {
    return (
        <SectionWrapper id="projects">
            <h2 className={`text-3xl font-bold mb-12 text-center ${isHackMode ? 'text-[#5DADE2]' : 'text-[#0E6655]'}`}>
                <GlitchText text="> DEPLOYED_PROGRAMS" isHackMode={isHackMode} />
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                    <WindowFrame key={index} title={`./${project.name.toLowerCase().replace(/\s+/g, '_')}`} isHackMode={isHackMode}>
                        <div className="p-4">
                            <div className="mb-4 rounded-lg overflow-hidden border border-gray-700/30">
                                {project.video ? (
                                    <video
                                        src={project.video}
                                        controls
                                        className="w-full h-48 object-cover"
                                    >
                                        Your browser does not support the video tag.
                                    </video>
                                ) : project.images ? (
                                    <Slider
                                        dots={true}
                                        infinite={true}
                                        speed={500}
                                        slidesToShow={1}
                                        slidesToScroll={1}
                                        autoplay={true}
                                        autoplaySpeed={3000}
                                        arrows={true}
                                        prevArrow={
                                            <div
                                                className={`absolute top-1/2 -translate-y-1/2 left-2 z-20 cursor-pointer flex items-center justify-center w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 transition-all ${isHackMode ? 'text-[#5DADE2]' : 'text-[#0E6655]'}`}
                                                onClick={undefined}
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                                            </div>
                                        }
                                        nextArrow={
                                            <div
                                                className={`absolute top-1/2 -translate-y-1/2 right-2 z-20 cursor-pointer flex items-center justify-center w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 transition-all ${isHackMode ? 'text-[#5DADE2]' : 'text-[#0E6655]'}`}
                                                onClick={undefined}
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                            </div>
                                        }
                                    >
                                        {project.images.map((img, i) => (
                                            <div key={i} className="h-48">
                                                <img src={img} alt={`${project.name} ${i}`} className="w-full h-full object-cover" />
                                            </div>
                                        ))}
                                    </Slider>
                                ) : project.image ? (
                                    <img src={project.image} alt={project.name} className="w-full h-48 object-cover" />
                                ) : (
                                    <div className="h-48 flex items-center justify-center bg-gray-800">
                                        <TechIcon name={project.icon} size={48} />
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center justify-between mb-2">
                                <h3 className={`font-bold text-lg ${isHackMode ? 'text-white' : 'text-[#0E6655]'}`}>{project.name}</h3>
                                <div className="flex gap-2">
                                    {project.link && (
                                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                                            <svg className={`w-5 h-5 ${isHackMode ? 'text-[#5DADE2]' : 'text-[#0E6655]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                        </a>
                                    )}
                                    {project.github && (
                                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                                            <TechIcon name="git" size={20} />
                                        </a>
                                    )}
                                </div>
                            </div>
                            <p className={`text-sm mb-4 ${isHackMode ? 'text-gray-400' : 'text-gray-600'}`}>{project.desc}</p>
                            <div className="flex flex-wrap gap-2">
                                <span className={`text-xs px-2 py-1 rounded ${isHackMode ? 'bg-[#5DADE2]/10 text-[#5DADE2]' : 'bg-[#0E6655]/10 text-[#0E6655]'}`}>{project.tech}</span>
                                <span className={`text-xs px-2 py-1 rounded ${isHackMode ? 'bg-[#85C1E9]/10 text-[#85C1E9]' : 'bg-[#117A65]/10 text-[#117A65]'}`}>{project.role}</span>
                            </div>
                        </div>
                    </WindowFrame>
                ))}
            </div>

            {/* Experience Timeline */}
            <div className="mt-20 max-w-4xl mx-auto">
                <WindowFrame title="execution_history.log" isHackMode={isHackMode}>
                    <div className="p-8">
                        <h3 className={`text-2xl font-bold mb-8 text-center ${isHackMode ? 'text-[#85C1E9]' : 'text-[#117A65]'}`}>
                            {'>'} EXECUTION_HISTORY
                        </h3>
                        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                            {experiences.map((exp, idx) => (
                                <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow z-10 ${isHackMode ? 'bg-[#0A0E1A] border-[#5DADE2] text-[#5DADE2]' : 'bg-white border-[#0E6655] text-[#0E6655]'}`}>
                                        <TechIcon name={exp.icon} size={20} />
                                    </div>
                                    <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border shadow-sm ${isHackMode ? 'bg-[#0F1729]/80 border-[#5DADE2]/30' : 'bg-white border-[#0E6655]/20'}`}>
                                        <div className="flex items-center justify-between space-x-2 mb-1">
                                            <div className={`font-bold ${isHackMode ? 'text-[#5DADE2]' : 'text-[#0E6655]'}`}>{exp.role}</div>
                                            <time className={`font-mono text-xs ${isHackMode ? 'text-gray-400' : 'text-gray-500'}`}>{exp.period}</time>
                                        </div>
                                        <div className={`text-sm font-semibold mb-2 ${isHackMode ? 'text-[#85C1E9]' : 'text-[#117A65]'}`}>{exp.company}</div>
                                        <div className={`text-sm ${isHackMode ? 'text-gray-300' : 'text-gray-600'}`}>{exp.description}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </WindowFrame>
            </div>
        </SectionWrapper>
    );
}
