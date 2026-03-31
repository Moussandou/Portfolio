import { useState } from 'react';
import { Mail, MapPin, Download, Github, Linkedin, Instagram, Send, FileText, ArrowLeft, CheckCircle2, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    // Simulate a short delay for animation, then open user's default email client
    setTimeout(() => {
      const mailtoLink = `mailto:moussandou.mroivili@epitech.eu?subject=${encodeURIComponent(`[Portfolio] ${formData.subject || 'Prise de contact'}`)}&body=${encodeURIComponent(`Nom: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
      window.open(mailtoLink, '_blank');
      
      setIsSending(false);
      setIsSent(true);
      
      // Reset after a few seconds
      setTimeout(() => {
        setIsSent(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 3000);
    }, 800);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <main className="relative z-10 py-8 md:py-12 px-6 md:px-0 max-w-[1080px] mx-auto min-h-[calc(100vh-140px)] flex flex-col">
      
      {/* Back Button & Header */}
      <div className="mb-8 md:mb-12">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-sm font-bold text-[#8D4074] hover:text-[#5a2848] transition-colors mb-6 bg-white/40 hover:bg-white/60 px-4 py-2 rounded-xl"
        >
          <ArrowLeft size={16} /> Retour à l'accueil
        </Link>
        <h1 className="text-4xl md:text-5xl font-black text-[#3a1a2a] font-display tracking-tight">
          Entrons en contact
        </h1>
        <p className="mt-4 text-[#8D4074]/80 text-sm md:text-base max-w-xl font-medium leading-relaxed">
          Que ce soit pour une opportunité professionnelle, un projet freelance, ou simplement pour échanger sur le code, je serai ravi de vous lire !
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 flex-1">
        
        {/* Left Column: Info & CV */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Main Info Card */}
          <div className="bg-[#F0C4DB] rounded-3xl p-8 shadow-inner border-none relative overflow-hidden group">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/20 rounded-full blur-3xl group-hover:bg-white/30 transition-colors duration-700" />
            
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[#8D4074]/60 mb-8 font-display">
              Mes Coordonnées
            </h2>
            
            <div className="space-y-6 relative z-10">
              <a href="mailto:moussandou.mroivili@epitech.eu" className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/40 transition-colors group/link">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#8D4074] shadow-sm group-hover/link:scale-105 transition-transform shrink-0">
                  <Mail size={20} />
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-bold text-[#8D4074]/60 uppercase tracking-wider mb-1">Email</p>
                  <p className="text-sm sm:text-base font-bold text-[#3a1a2a] truncate">moussandou.mroivili@epitech.eu</p>
                </div>
              </a>

              <div className="flex items-start gap-4 p-4 rounded-2xl">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#8D4074] shadow-sm shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#8D4074]/60 uppercase tracking-wider mb-1">Localisation</p>
                  <p className="text-sm sm:text-base font-bold text-[#3a1a2a]">Marseille, France</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-10 pt-8 border-t border-[#8D4074]/10">
              <p className="text-xs font-bold text-[#8D4074]/60 uppercase tracking-wider mb-4">Réseaux Sociaux</p>
              <div className="flex gap-4">
                <a 
                  href="https://github.com/Moussandou" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-white/50 flex items-center justify-center text-[#8D4074] hover:bg-[#8D4074] hover:text-white transition-all shadow-sm hover:-translate-y-1"
                >
                  <Github size={20} />
                </a>
                <a 
                  href="https://www.linkedin.com/in/moussandou/"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-white/50 flex items-center justify-center text-[#8D4074] hover:bg-[#8D4074] hover:text-white transition-all shadow-sm hover:-translate-y-1"
                >
                  <Linkedin size={20} />
                </a>
                <a 
                  href="https://www.instagram.com/takaxdev/"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-white/50 flex items-center justify-center text-[#8D4074] hover:bg-[#8D4074] hover:text-white transition-all shadow-sm hover:-translate-y-1"
                >
                  <Instagram size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* CV CTA Card */}
          <div className="bg-[#8D4074] rounded-3xl p-8 shadow-xl relative overflow-hidden text-white flex flex-col sm:flex-row gap-6 items-center sm:items-start group hover:-translate-y-1 transition-transform duration-300 cursor-default">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
             
             <div className="w-16 h-16 rounded-2xl bg-white/10 shrink-0 flex items-center justify-center ring-1 ring-white/20">
               <FileText size={28} className="text-white/90" />
             </div>
             
             <div className="flex-1 text-center sm:text-left">
               <h3 className="text-xl font-bold font-display mb-2">Curriculum Vitae</h3>
               <p className="text-sm text-white/70 mb-5 leading-relaxed">Retrouvez en détail l'ensemble de mon parcours, mes compétences et mes technos favorites au grand complet.</p>
               <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                  <a href="/Portfolio/assets/cv.pdf" target="_blank" className="bg-white text-[#8D4074] px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-white/90 transition-colors flex items-center gap-2 shadow-sm">
                    <ExternalLink size={16} /> Voir mon CV
                  </a>
                  <a href="/Portfolio/assets/cv.pdf" download className="bg-white/10 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-white/20 transition-colors ring-1 ring-white/20 flex items-center gap-2">
                    <Download size={16} /> Télécharger
                  </a>
               </div>
             </div>
          </div>

        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-white/50 backdrop-blur-xl border border-white/60 rounded-3xl p-8 sm:p-10 shadow-lg h-full">
             <h2 className="text-2xl font-black text-[#5a2848] font-display tracking-tight mb-2">
               Envoyer un message
             </h2>
             <p className="text-sm text-[#8D4074]/80 mb-8 font-medium">Je m'efforce de répondre dans les plus brefs délais !</p>
             
             <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-bold text-[#8D4074] uppercase tracking-wider ml-1">Nom / Prénom</label>
                    <input 
                      type="text" 
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jean Dupont"
                      className="w-full bg-white/70 border border-white/80 rounded-2xl px-5 py-3.5 text-sm text-[#3a1a2a] placeholder-[#8D4074]/30 focus:outline-none focus:ring-2 focus:ring-[#8D4074]/50 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-bold text-[#8D4074] uppercase tracking-wider ml-1">Adresse Email</label>
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jean.dupont@email.com"
                      className="w-full bg-white/70 border border-white/80 rounded-2xl px-5 py-3.5 text-sm text-[#3a1a2a] placeholder-[#8D4074]/30 focus:outline-none focus:ring-2 focus:ring-[#8D4074]/50 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-xs font-bold text-[#8D4074] uppercase tracking-wider ml-1">Sujet de la demande</label>
                  <input 
                    type="text" 
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Proposition de collaboration..."
                    className="w-full bg-white/70 border border-white/80 rounded-2xl px-5 py-3.5 text-sm text-[#3a1a2a] placeholder-[#8D4074]/30 focus:outline-none focus:ring-2 focus:ring-[#8D4074]/50 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-bold text-[#8D4074] uppercase tracking-wider ml-1">Votre message</label>
                  <textarea 
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Détaillez votre projet ou votre demande ici..."
                    rows={5}
                    className="w-full bg-white/70 border border-white/80 rounded-2xl px-5 py-4 text-sm text-[#3a1a2a] placeholder-[#8D4074]/30 focus:outline-none focus:ring-2 focus:ring-[#8D4074]/50 transition-all resize-none custom-scrollbar"
                  />
                </div>

                <div className="pt-4">
                  <button 
                    type="submit" 
                    disabled={isSending || isSent}
                    className={cn(
                      "w-full sm:w-auto px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-md",
                      isSent 
                        ? "bg-emerald-500 text-white cursor-default" 
                        : "bg-[#8D4074] text-white hover:bg-[#6b3058] active:scale-95"
                    )}
                  >
                    {isSending ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : isSent ? (
                      <>
                        <CheckCircle2 size={18} className="animate-in zoom-in duration-300" /> Préparation terminée
                      </>
                    ) : (
                      <>
                        <Send size={18} /> Préparer l'email
                      </>
                    )}
                  </button>
                  <p className="text-[11px] font-medium text-[#8D4074]/50 mt-4 max-w-sm">
                    * Ce formulaire préparera un email dans votre client mail par défaut avec les informations saisies pré-remplies.
                  </p>
                </div>
             </form>
          </div>
        </div>

      </div>
    </main>
  );
}
