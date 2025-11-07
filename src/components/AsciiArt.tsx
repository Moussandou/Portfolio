interface AsciiArtProps {
  isHackMode: boolean;
}

export function AsciiArt({ isHackMode }: AsciiArtProps) {
  const nameArt = `███╗   ███╗ ██████╗ ██╗   ██╗███████╗███████╗ █████╗ ███╗   ██╗██████╗  ██████╗ ██╗   ██╗
████╗ ████║██╔═══██╗██║   ██║██╔════╝██╔════╝██╔══██╗████╗  ██║██╔══██╗██╔═══██╗██║   ██║
██╔████╔██║██║   ██║██║   ██║███████╗███████╗███████║██╔██╗ ██║██║  ██║██║   ██║██║   ██║
██║╚██╔╝██║██║   ██║██║   ██║╚════██║╚════██║██╔══██║██║╚██╗██║██║  ██║██║   ██║██║   ██║
██║ ╚═╝ ██║╚██████╔╝╚██████╔╝███████║███████║██║  ██║██║ ╚████║██████╔╝╚██████╔╝╚██████╔╝
╚═╝     ╚═╝ ╚═════╝  ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝  ╚═════╝  ╚═════╝`;


  return (
    <div className="ascii-art float overflow-hidden">
      {/* ASCII Art MOUSSANDOU - Responsive sur toutes les tailles */}
      <div className="w-full flex justify-center">
        <pre className={`${isHackMode ? 'text-[#A855F7] opacity-40' : 'text-[#D2691E] opacity-80'} text-[6px] sm:text-[8px] md:text-[10px] lg:text-xs whitespace-pre select-none ${isHackMode ? 'hover-glow' : ''} leading-tight font-mono font-bold tracking-tighter`}>
          {nameArt}
        </pre>
      </div>

      <div className="flex justify-center mt-4 overflow-hidden">
        <pre className={`text-[7px] sm:text-[9px] md:text-[11px] lg:text-xs whitespace-pre select-none ${isHackMode ? 'glitch-text opacity-40' : 'text-[#D2691E] opacity-80'} leading-tight font-mono font-semibold tracking-tighter`}>
{`███╗   ███╗██████╗  ██████╗ ██╗██╗   ██╗██╗██╗     ██╗
████╗ ████║██╔══██╗██╔═══██╗██║██║   ██║██║██║     ██║
██╔████╔██║██████╔╝██║   ██║██║██║   ██║██║██║     ██║
██║╚██╔╝██║██╔══██╗██║   ██║██║╚██╗ ██╔╝██║██║     ██║
██║ ╚═╝ ██║██║  ██║╚██████╔╝██║ ╚████╔╝ ██║███████╗██║
╚═╝     ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝  ╚═╝╚══════╝╚═╝`}
        </pre>
      </div>
    </div>
  );
}