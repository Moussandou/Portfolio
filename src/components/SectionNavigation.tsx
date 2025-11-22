import { useState, useEffect } from 'react';

interface SectionNavigationProps {
    isHackMode: boolean;
}

const sections = [
    { id: 'neofetch', label: 'Info' },
    { id: 'skills', label: 'Compétences' },
    { id: 'contact', label: 'Contact' },
    { id: 'projects', label: 'Projets' },
    { id: 'experience', label: 'Expérience' },
    { id: 'certifications', label: 'Certifs' },
    { id: 'guestbook', label: 'Livre d\'or' },
    { id: 'curriculum', label: 'CV' },
];

export function SectionNavigation({ isHackMode }: SectionNavigationProps) {
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.3 }
        );

        sections.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4">
            {sections.map(({ id, label }) => (
                <div key={id} className="group relative flex items-center justify-end">
                    {/* Tooltip */}
                    <span
                        className={`absolute right-8 px-2 py-1 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap ${isHackMode
                                ? 'bg-[#0F1729] text-[#5DADE2] border border-[#5DADE2]/30'
                                : 'bg-white text-[#0E6655] border border-[#0E6655]/30 shadow-sm'
                            }`}
                    >
                        {label}
                    </span>

                    {/* Dot */}
                    <button
                        onClick={() => scrollToSection(id)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 border ${activeSection === id
                                ? isHackMode
                                    ? 'bg-[#5DADE2] border-[#5DADE2] scale-125 shadow-[0_0_10px_#5DADE2]'
                                    : 'bg-[#0E6655] border-[#0E6655] scale-125'
                                : isHackMode
                                    ? 'bg-transparent border-[#5DADE2]/50 hover:border-[#5DADE2] hover:bg-[#5DADE2]/30'
                                    : 'bg-transparent border-[#0E6655]/50 hover:border-[#0E6655] hover:bg-[#0E6655]/30'
                            }`}
                        aria-label={`Aller à la section ${label}`}
                    />
                </div>
            ))}
        </div>
    );
}
