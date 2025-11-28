interface TechIconProps {
  name: string;
  size?: number;
  className?: string;
}

export function TechIcon({ name, size = 24, className = "" }: TechIconProps) {
  // Map common names to devicon class names
  const iconMap: { [key: string]: string } = {
    "c++": "cplusplus",
    "cpp": "cplusplus",
    "c": "c",
    "python": "python",
    "javascript": "javascript",
    "js": "javascript",
    "html": "html5",
    "html5": "html5",
    "css": "css3",
    "css3": "css3",
    "react": "react",
    "git": "git",
    "github": "github",
    "linux": "linux",
    "windows": "windows",
    "apple": "apple",
    "macos": "apple",
    "vscode": "vscode",
    "trello": "trello",
    "wordpress": "wordpress",
    "n8n": "n8n",
    "haskell": "haskell",
    "asm": "embeddedc",
    "sql": "mysql",
    "seo": "google",
    "teacher": "teacher",
    "email": "google",
    "linkedin": "linkedin",
    "hackathon": "trophy",
  };

  // Handle special cases that aren't in devicon or need specific handling
  const iconName = iconMap[name.toLowerCase()] || name.toLowerCase();
  const isDevicon = !["trophy", "n8n", "teacher"].includes(iconName);

  return (
    <div className="relative group inline-flex items-center justify-center">
      {isDevicon ? (
        <i
          className={`devicon-${iconName}-plain ${className}`}
          style={{ fontSize: size }}
        ></i>
      ) : (
        <span style={{ fontSize: size }}>
          {iconName === 'trophy' ? '🏆' : iconName === 'n8n' ? '⚡' : iconName === 'teacher' ? '👨‍🏫' : '🔧'}
        </span>
      )}

      {/* Tooltip */}
      <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 border border-gray-700 shadow-lg">
        {name}
      </span>
    </div>
  );
}
