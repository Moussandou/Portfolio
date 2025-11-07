interface AsciiArtProps {
  isHackMode: boolean;
}

export function AsciiArt({ isHackMode }: AsciiArtProps) {
  const nameArt = `
  ███╗   ███╗ ██████╗ ██╗   ██╗███████╗███████╗ █████╗ ███╗   ██╗██████╗  ██████╗ ██╗   ██╗
  ████╗ ████║██╔═══██╗██║   ██║██╔════╝██╔════╝██╔══██╗████╗  ██║██╔══██╗██╔═══██╗██║   ██║
  ██╔████╔██║██║   ██║██║   ██║███████╗███████╗███████║██╔██╗ ██║██║  ██║██║   ██║██║   ██║
  ██║╚██╔╝██║██║   ██║██║   ██║╚════██║╚════██║██╔══██║██║╚██╗██║██║  ██║██║   ██║██║   ██║
  ██║ ╚═╝ ██║╚██████╔╝╚██████╔╝███████║███████║██║  ██║██║ ╚████║██████╔╝╚██████╔╝╚██████╔╝
  ╚═╝     ╚═╝ ╚═════╝  ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝  ╚═════╝  ╚═════╝ 
  `;


  return (
    <div className="ascii-art float overflow-hidden">
      {/* ASCII Art MOUSSANDOU - Responsive sur toutes les tailles */}
      <div className="w-full flex justify-center">
        <pre className={`${isHackMode ? 'text-[#A855F7]' : 'text-[#8B7355]'} text-[5px] sm:text-[7px] md:text-[9px] lg:text-xs opacity-${isHackMode ? '40' : '60'} whitespace-pre select-none ${isHackMode ? 'hover-glow' : ''} leading-[0.9] scale-x-[0.95] sm:scale-x-100 font-bold`}>
          {nameArt}
        </pre>
      </div>

      <div className="flex justify-center mt-4 overflow-hidden">
        <pre className={`text-[7px] sm:text-[9px] md:text-xs opacity-${isHackMode ? '40' : '60'} whitespace-pre select-none ${isHackMode ? 'glitch-text' : 'text-[#8B7355]'} leading-[0.9] scale-x-[0.9] sm:scale-x-95 md:scale-x-100 font-semibold`}>
{`
    ███╗   ███╗██████╗  ██████╗ ██╗██╗   ██╗██╗██╗     ██╗
    ████╗ ████║██╔══██╗██╔═══██╗██║██║   ██║██║██║     ██║
    ██╔████╔██║██████╔╝██║   ██║██║██║   ██║██║██║     ██║
    ██║╚██╔╝██║██╔══██╗██║   ██║██║╚██╗ ██╔╝██║██║     ██║
    ██║ ╚═╝ ██║██║  ██║╚██████╔╝██║ ╚████╔╝ ██║███████╗██║
    ╚═╝     ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝  ╚═╝╚══════╝╚═╝
`}
        </pre>
      </div>
    </div>
  );
}