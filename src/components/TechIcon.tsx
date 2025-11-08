interface TechIconProps {
  name: string;
  size?: number;
  className?: string;
}

export function TechIcon({ name, size = 16, className = "" }: TechIconProps) {
  // Mapping vers les vraies icônes Devicon
  const iconMap: Record<string, string> = {
    // Langages - Icônes officielles Devicon
    'c': 'devicon-c-original',
    'cpp': 'devicon-cplusplus-original',
    'python': 'devicon-python-original',
    'javascript': 'devicon-javascript-original',
    'html5': 'devicon-html5-original',
    'css3': 'devicon-css3-original',
    'lambda': 'devicon-haskell-original',
    'cpu': 'devicon-bash-plain',

    // Frameworks & Outils
    'react': 'devicon-react-original',
    'git': 'devicon-git-original',
    'wordpress': 'devicon-wordpress-plain',
    'hackathon': 'devicon-nodejs-original', // Pour N8n
    'seo': 'devicon-google-plain',
    'teacher': 'devicon-python-original',

    // OS
    'linux': 'devicon-linux-plain',
    'apple': 'devicon-apple-original',
    'macos': 'devicon-apple-original',
    'windows': 'devicon-windows8-original',

    // Icônes génériques et sociales
    'email': 'devicon-google-plain',
    'linkedin': 'devicon-linkedin-plain',
    'link': 'devicon-firefox-plain',
    'sun': 'devicon-chrome-plain',
    'laptop': 'devicon-chrome-plain',
  };

  const iconClass = iconMap[name.toLowerCase()];
  
  // Si c'est une classe Devicon, on utilise un <i>
  if (iconClass && iconClass.startsWith('devicon-')) {
    return (
      <i 
        className={`${iconClass} ${className}`} 
        style={{ fontSize: `${size}px` }}
      />
    );
  }
  
  // Sinon, on affiche l'emoji
  return (
    <span 
      className={className}
      style={{ fontSize: `${size}px` }}
    >
      {iconClass || '⚡'}
    </span>
  );
}