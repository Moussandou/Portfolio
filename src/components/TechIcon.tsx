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
    'database': 'devicon-mysql-original',
    'lambda': 'devicon-haskell-original',
    'cpu': 'devicon-c-original', // Pour ASM on garde C
    
    // Frameworks & Outils
    'react': 'devicon-react-original',
    'git': 'devicon-git-original',
    'wordpress': 'devicon-wordpress-original',
    'hackathon': 'devicon-nodejs-original', // Pour N8n
    'seo': 'devicon-google-original',
    'teacher': 'devicon-python-original',
    
    // OS
    'linux': 'devicon-linux-original',
    'windows': 'devicon-windows8-original',
    
    // Icônes génériques (fallback vers emoji)
    'phone': '📱',
    'email': '✉️',
    'location': '📍',
    'linkedin': '💼',
    'instagram': '📸',
    'paypal': '💳',
    'link': '🔗',
    'certificate': '🏆',
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