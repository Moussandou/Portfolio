import { useState } from 'react';
import { AsciiArt } from './components/AsciiArt';
import { TypewriterEffect } from './components/TypewriterEffect';
import { ScrollReveal } from './components/ScrollReveal';
import { NeofetchSection } from './components/NeofetchSection';
import { TechIcon } from './components/TechIcon';
import { DraggableTerminal } from './components/DraggableTerminal';
import { ThemeProvider, getTerminalColors } from './components/ThemeProvider';
import Slider from 'react-slick';

// Images & Videos
const jebImage = '/Portfolio/assets/jeb.png';
const moocImage1 = '/Portfolio/assets/icom1.png';
const moocImage2 = '/Portfolio/assets/icom2.png';
const moocImage3 = '/Portfolio/assets/icom3.png';
const rtypeVideo = '/Portfolio/assets/rtype.mov';

export default function App() {
  const [isHackMode, setIsHackMode] = useState(false);

  return (
    <ThemeProvider isHackMode={isHackMode}>
      <div className={`min-h-screen transition-colors duration-500 monocraft ${
        isHackMode
          ? 'bg-black crt-screen vhs-noise'
          : 'bg-gradient-to-br from-[#F5F1E8] via-[#FAF7F0] to-[#FFF9E8]'
      }`}>

        {/* Toggle Button - Fixed position */}
        <button
        onClick={() => setIsHackMode(!isHackMode)}
        className={`fixed top-6 right-6 z-50 px-6 py-3 rounded-lg font-bold text-sm transition-all duration-300 transform hover:scale-105 border-2 ${
          isHackMode
            ? 'bg-black border-[#A855F7] text-[#A855F7] hover:bg-[#A855F7] hover:text-black shadow-[0_0_20px_rgba(168,85,247,0.5)]'
            : 'bg-white border-[#8B7355] text-[#8B7355] hover:bg-[#8B7355] hover:text-white shadow-lg'
        }`}
      >
        {isHackMode ? '☀️ Mode Clair' : '💻 Hack Mode'}
      </button>

      {/* Main terminal interface - utilisation de tout l'espace */}
      <div className="relative z-10 w-full px-4 py-8 lg:px-8 xl:px-12">
        
        {/* Header with boot sequence */}
        <ScrollReveal delay={0}>
          <div className="mb-12">
            <div className={`${isHackMode ? 'text-[#A855F7]' : 'text-[#8B7355]'} mb-4`}>
              <TypewriterEffect
                text="moussandou@localhost:~$ ./lancer_portfolio.sh"
                speed={80}
                className="text-lg lg:text-xl"
              />
            </div>
            <div className={`${isHackMode ? 'text-[#FFD700]' : 'text-[#8B7355]'} mb-6 px-4 py-2 inline-block rounded ${isHackMode ? 'pulse-purple' : 'bg-white/50'}`}>
              [████████████] 100% - Accès autorisé ✓
            </div>
            <div className="text-center mb-8">
              <div className={`${isHackMode ? 'text-[rgb(0,132,255)]' : 'text-[#8B7355]'} text-lg lg:text-xl font-semibold`}>
                // Développeur //
              </div>
            </div>
            <AsciiArt isHackMode={isHackMode} />
          </div>
        </ScrollReveal>

        {/* Grid layout pour utiliser plus d'espace */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Colonne gauche */}
          <div className="space-y-6 lg:space-y-8">
            {/* Neofetch About Section */}
            <ScrollReveal delay={0}>
              <DraggableTerminal command="neofetch" delay={0} id="neofetch" index={0} colors={getTerminalColors(isHackMode, 0)}>
                <NeofetchSection />
              </DraggableTerminal>
            </ScrollReveal>

            {/* Skills Section */}
            <ScrollReveal delay={0}>
              <DraggableTerminal command="./competences --list" delay={0} id="skills" index={1} colors={getTerminalColors(isHackMode, 1)}>
                <div className="space-y-4">
                  <div>
                    <span className="text-[#FFD700]">Langages :</span>
                    <div className="ml-4 flex flex-wrap gap-2 mt-2">
                      <span className="px-3 py-1 bg-[#1a1a1a] border border-[#A855F7]/30 text-sm hover-glow pulse-purple flex items-center gap-2 text-[#A855F7]">
                        <TechIcon name="c" size={14} />
                        C
                      </span>
                      <span className="px-3 py-1 bg-[#1a1a1a] border border-[#A855F7]/30 text-sm hover-glow pulse-purple flex items-center gap-2 text-[#A855F7]">
                        <TechIcon name="cpp" size={14} />
                        C++
                      </span>
                      <span className="px-3 py-1 bg-[#1a1a1a] border border-[#A855F7]/30 text-sm hover-glow pulse-purple flex items-center gap-2 text-[#A855F7]">
                        <TechIcon name="python" size={14} />
                        Python
                      </span>
                      <span className="px-3 py-1 bg-[#1a1a1a] border border-[#A855F7]/30 text-sm hover-glow pulse-purple flex items-center gap-2 text-[#A855F7]">
                        <TechIcon name="javascript" size={14} />
                        JavaScript
                      </span>
                      <span className="px-3 py-1 bg-[#1a1a1a] border border-[#A855F7]/30 text-sm hover-glow pulse-purple flex items-center gap-2 text-[#A855F7]">
                        <TechIcon name="html5" size={14} />
                        HTML5
                      </span>
                      <span className="px-3 py-1 bg-[#1a1a1a] border border-[#A855F7]/30 text-sm hover-glow pulse-purple flex items-center gap-2 text-[#A855F7]">
                        <TechIcon name="css3" size={14} />
                        CSS3
                      </span>
                      <span className="px-3 py-1 bg-[#1a1a1a] border border-[#A855F7]/30 text-sm hover-glow pulse-purple flex items-center gap-2 text-[#A855F7]">
                        <TechIcon name="database" size={14} />
                        SQL
                      </span>
                      <span className="px-3 py-1 bg-[#1a1a1a] border border-[#A855F7]/30 text-sm hover-glow pulse-purple flex items-center gap-2 text-[#A855F7]">
                        <TechIcon name="lambda" size={14} />
                        Haskell
                      </span>
                      <span className="px-3 py-1 bg-[#1a1a1a] border border-[#A855F7]/30 text-sm hover-glow pulse-purple flex items-center gap-2 text-[#A855F7]">
                        <TechIcon name="cpu" size={14} />
                        ASM
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-[#FFD700]">Frameworks & Outils :</span>
                    <div className="ml-4 flex flex-wrap gap-2 mt-2">
                      <span className="px-3 py-1 bg-[#1a1a1a] border border-[#00FFFF]/30 text-sm hover-glow pulse-purple flex items-center gap-2 text-[#00FFFF]">
                        <TechIcon name="react" size={14} />
                        React
                      </span>
                      <span className="px-3 py-1 bg-[#1a1a1a] border border-[#00FFFF]/30 text-sm hover-glow pulse-purple flex items-center gap-2 text-[#00FFFF]">
                        <TechIcon name="git" size={14} />
                        Git
                      </span>
                      <span className="px-3 py-1 bg-[#1a1a1a] border border-[#00FFFF]/30 text-sm hover-glow pulse-purple flex items-center gap-2 text-[#00FFFF]">
                        <TechIcon name="wordpress" size={14} />
                        WordPress
                      </span>
                      <span className="px-3 py-1 bg-[#1a1a1a] border border-[#00FFFF]/30 text-sm hover-glow pulse-purple flex items-center gap-2 text-[#00FFFF]">
                        <TechIcon name="hackathon" size={14} />
                        N8n
                      </span>
                      <span className="px-3 py-1 bg-[#1a1a1a] border border-[#00FFFF]/30 text-sm hover-glow pulse-purple flex items-center gap-2 text-[#00FFFF]">
                        <TechIcon name="lambda" size={14} />
                        VS Code
                      </span>
                      <span className="px-3 py-1 bg-[#1a1a1a] border border-[#00FFFF]/30 text-sm hover-glow pulse-purple flex items-center gap-2 text-[#00FFFF]">
                        <TechIcon name="database" size={14} />
                        Trello
                      </span>
                    </div>
                  </div>
                  <div className="hover-glow flex items-center gap-2">
                    <span className="text-[#FFD700]">OS :</span>
                    <div className="flex items-center gap-2">
                      <TechIcon name="linux" size={16} />
                      <span className="text-[#FF0080]">Linux</span>
                      <span className="text-white">&</span>
                      <TechIcon name="windows" size={16} />
                      <span className="text-[#FF0080]">Windows</span>
                    </div>
                  </div>
                  <div className="hover-glow">
                    <span className="text-[#FFD700]">Méthodologie :</span>
                    <span className="ml-2 text-[#FF0080]">Agile & Gestion de projets</span>
                  </div>
                </div>
              </DraggableTerminal>
            </ScrollReveal>

            {/* Experience Section */}
            <ScrollReveal delay={0}>
              <DraggableTerminal command="./experience --dev-only" delay={0} id="experience" index={4} colors={getTerminalColors(isHackMode, 4)}>
                <div className="space-y-4">
                  <div className="border-l-2 border-[#A855F7]/50 pl-4 hover-glow">
                    <div className="text-[#A855F7] flex items-center gap-2">
                      <TechIcon name="seo" size={16} />
                      <span>Assistant SEO</span>
                    </div>
                    <div className="text-[#FFD700] text-sm">ES DIGITAL SOLUTIONS</div>
                    <div className="text-gray-400 text-xs">Sept 2025 - Présent</div>
                    <div className="text-gray-300 text-sm mt-1">SEO technique, analyse de données, IA pour contenu</div>
                  </div>
                  
                  <div className="border-l-2 border-[#00FFFF]/50 pl-4 hover-glow">
                    <div className="text-[#00FFFF] flex items-center gap-2">
                      <TechIcon name="teacher" size={16} />
                      <span>Professeur Informatique</span>
                    </div>
                    <div className="text-[#FFD700] text-sm">École Lacordaire</div>
                    <div className="text-gray-400 text-xs">Sept 2025 - Présent</div>
                    <div className="text-gray-300 text-sm mt-1">Enseignement HTML/CSS/Python, pédagogie interactive</div>
                  </div>

                  <div className="border-l-2 border-[#FFD700]/50 pl-4 hover-glow">
                    <div className="text-[#FFD700] flex items-center gap-2">
                      <TechIcon name="wordpress" size={16} />
                      <span>Stagiaire Développeur</span>
                    </div>
                    <div className="text-[#FFD700] text-sm">ICOM'Provence</div>
                    <div className="text-gray-400 text-xs">Août - Nov 2024</div>
                    <div className="text-gray-300 text-sm mt-1">Création site WordPress, UX/UI, médiation numérique</div>
                  </div>
                </div>
              </DraggableTerminal>
            </ScrollReveal>

            {/* Certifications Section */}
            <ScrollReveal delay={0}>
              <DraggableTerminal command="./certifications --valid" delay={0} id="certifications" index={5} colors={getTerminalColors(isHackMode, 5)}>
                <div className="space-y-3">
                  <div className="flex items-center hover-glow gap-2">
                    <span className="text-[#A855F7] mr-3">[CERT]</span>
                    <TechIcon name="certificate" size={16} />
                    <span>Cambridge English (B2)</span>
                  </div>
                  <div className="flex items-center hover-glow gap-2">
                    <span className="text-[#FF0080] mr-3">[AUTO]</span>
                    <TechIcon name="hackathon" size={16} />
                    <span>Hackathon N8n – Certification Automatisation IA</span>
                  </div>
                </div>
              </DraggableTerminal>
            </ScrollReveal>

            {/* Contact Section */}
            <ScrollReveal delay={0}>
              <DraggableTerminal command="./contact --all" delay={0} id="contact" index={2} colors={getTerminalColors(isHackMode, 2)}>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center hover-glow gap-2 flex-wrap">
                      <span className="text-[#A855F7] mr-3 flex-shrink-0">[TEL]</span>
                      <TechIcon name="phone" size={16} />
                      <span className="break-all">07 81 63 32 78</span>
                    </div>
                    <div className="flex items-center hover-glow gap-2 flex-wrap">
                      <span className="text-[#FFD700] mr-3 flex-shrink-0">[MAIL]</span>
                      <TechIcon name="email" size={16} />
                      <a href="mailto:moussandou.mroivili@epitech.eu" className="text-[#00FFFF] hover:text-[#A855F7] transition-colors break-all text-sm sm:text-base">
                        moussandou.mroivili@epitech.eu
                      </a>
                    </div>
                    <div className="flex items-center hover-glow gap-2 flex-wrap">
                      <span className="text-[#FF0080] mr-3 flex-shrink-0">[LOC]</span>
                      <TechIcon name="location" size={16} />
                      <span>Marseille, France</span>
                    </div>
                    <div className="flex items-center hover-glow gap-2 flex-wrap">
                      <span className="text-[#00FFFF] mr-3 flex-shrink-0">[NET]</span>
                      <TechIcon name="linkedin" size={16} />
                      <a href="https://linkedin.com/in/moussandou" className="text-[#FFD700] hover:text-[#A855F7] transition-colors break-all text-sm sm:text-base">
                        linkedin.com/in/moussandou
                      </a>
                    </div>
                    <div className="flex items-center hover-glow gap-2 flex-wrap">
                      <span className="text-[#FF0080] mr-3 flex-shrink-0">[INSTA]</span>
                      <TechIcon name="instagram" size={16} />
                      <a href="https://www.instagram.com/__takax__" target="_blank" rel="noopener noreferrer" className="text-[#A855F7] hover:text-[#00FFFF] transition-colors">
                        @__takax__
                      </a>
                    </div>
                    <div className="flex items-center hover-glow gap-2 flex-wrap">
                      <span className="text-[#00FFFF] mr-3 flex-shrink-0">[PAY]</span>
                      <TechIcon name="paypal" size={16} />
                      <a href="https://www.paypal.com/paypalme/Moussandou17" target="_blank" rel="noopener noreferrer" className="text-[#FFD700] hover:text-[#A855F7] transition-colors">
                        PayPal.me/Moussandou17
                      </a>
                    </div>
                  </div>
                </div>
              </DraggableTerminal>
            </ScrollReveal>
          </div>

          {/* Colonne droite */}
          <div className="space-y-6 lg:space-y-8">
            {/* Projects Section */}
            <ScrollReveal delay={0}>
              <DraggableTerminal command="./projets --showcase" delay={0} id="projects" index={3} colors={getTerminalColors(isHackMode, 3)}>
                <div className="space-y-5">
                  {[
                    {
                      name: "R-Type - Jeu Arcade Multijoueur",
                      desc: "Jeu arcade multijoueur géré par un serveur",
                      tech: "C++ SFML",
                      color: "#00FFFF",
                      role: "Développeur Graphique SFML",
                      icon: "cpp",
                      video: rtypeVideo
                    },
                    {
                      name: "JEB - Plateforme Incubateur",
                      desc: "Full-stack React, API intégration, dashboard admin",
                      tech: "React",
                      color: "#A855F7",
                      role: "Développeur Frontend",
                      icon: "react",
                      image: jebImage
                    },
                    {
                      name: "Zappy - Jeu Réseau Multijoueur",
                      desc: "Serveur TCP/IP, IA clients, protocole personnalisé",
                      tech: "C++",
                      color: "#FFD700",
                      role: "Développeur Réseau",
                      icon: "cpp"
                    },
                    {
                      name: "Mooc Autonomie numérique (Site Wordpress)",
                      desc: "autonomie-numerique.fr - UX/UI responsive",
                      tech: "WordPress",
                      color: "#00FFFF",
                      role: "Développeur Web",
                      link: "https://autonomie-numerique.fr",
                      icon: "wordpress",
                      images: [moocImage1, moocImage2, moocImage3]
                    },
                    {
                      name: "Minishell",
                      desc: "Implémentation d'un shell Unix complet",
                      tech: "C",
                      color: "#FF0080",
                      role: "Développeur Système",
                      icon: "c"
                    },
                    {
                      name: "Epytodo",
                      desc: "Gestionnaire de tâches full-stack JS/SQL",
                      tech: "JavaScript",
                      color: "#FFFF00",
                      role: "Full-Stack Dev",
                      icon: "javascript"
                    }
                  ].map((project, index) => {
                    const carouselSettings = {
                      dots: true,
                      infinite: true,
                      speed: 500,
                      slidesToShow: 1,
                      slidesToScroll: 1,
                      autoplay: true,
                      autoplaySpeed: 3000,
                      arrows: true,
                      className: "mb-3"
                    };
                    
                    return (
                    <div key={index} className="border-l-2 border-[#A855F7]/50 pl-4 hover-glow">
                      {project.video && (
                        <div className="mb-3 rounded-lg overflow-hidden border border-[#A855F7]/30">
                          {project.video.includes('youtube.com') || project.video.includes('youtu.be') ? (
                            <iframe
                              src={project.video}
                              className="w-full aspect-video"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          ) : (
                            <video 
                              src={project.video}
                              controls
                              className="w-full h-auto hover:scale-105 transition-transform duration-300"
                            />
                          )}
                        </div>
                      )}
                      {project.images && project.images.length > 0 && (
                        <div className="mb-3 rounded-lg overflow-hidden border border-[#A855F7]/30">
                          <Slider {...carouselSettings}>
                            {project.images.map((img, imgIndex) => (
                              <div key={imgIndex}>
                                <img 
                                  src={img} 
                                  alt={`${project.name} - Image ${imgIndex + 1}`}
                                  className="w-full h-auto object-cover"
                                />
                              </div>
                            ))}
                          </Slider>
                        </div>
                      )}
                      {project.image && (
                        <div className="mb-3 rounded-lg overflow-hidden border border-[#A855F7]/30">
                          <img 
                            src={project.image} 
                            alt={project.name}
                            className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          {project.link ? (
                            <a 
                              href={project.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-white hover:text-[#A855F7] transition-colors flex items-center gap-2"
                            >
                              {project.name} 
                              <TechIcon name="link" size={12} />
                            </a>
                          ) : (
                            <span className="text-white">{project.name}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <TechIcon name={project.icon} size={12} />
                          <span className="px-3 py-1 bg-[#1a1a1a] border border-[#A855F7]/30 text-sm hover-glow pulse-purple text-[#A855F7]">
                            {project.tech}
                          </span>
                        </div>
                      </div>
                      <div className="text-gray-400 text-sm">{project.desc}</div>
                      <div className="text-[#A855F7] text-xs mt-1">Rôle: {project.role}</div>
                    </div>
                  )})}
                </div>
              </DraggableTerminal>
            </ScrollReveal>
          </div>
        </div>

        {/* Easter Egg Footer */}
        <ScrollReveal delay={0}>
          <div className="mt-16 text-center">
            <div className={`${isHackMode ? 'text-[#A855F7]/30' : 'text-[#8B7355]/40'} text-xs mb-4 float`}>
              <pre>
{`[SYSTÈME] Connexion établie...
[TERMINAL] Bienvenue dans le réseau, ${new Date().getFullYear()}
[AVERTISSEMENT] Ce portfolio peut contenir des traces de code génial`}
              </pre>
            </div>
            <div className={`${isHackMode ? 'text-gray-600' : 'text-[#8B7355]'} text-xs hover-glow`}>
              moussandou@localhost:~$ <span className="animate-pulse">_</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
    </ThemeProvider>
  );
}
