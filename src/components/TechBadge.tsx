import { TechIcon } from './TechIcon';

interface TechBadgeProps {
  name: string;
  color: string;
  icon?: string;
  iconType?: string;
}

export function TechBadge({ name, color, icon, iconType }: TechBadgeProps) {
  return (
    <span className="px-3 py-1 bg-[#1a1a1a] border text-sm hover-glow pulse-purple flex items-center gap-2" 
          style={{ borderColor: `${color}30`, color: color }}>
      {iconType ? (
        <TechIcon name={iconType} size={14} className="flex-shrink-0" />
      ) : icon && (
        <span className="text-xs">{icon}</span>
      )}
      {name}
    </span>
  );
}