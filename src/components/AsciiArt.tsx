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
    <div className="ascii-art float overflow-hidden w-full">
      {/* ASCII Art MOUSSANDOU */}
      <div className="w-full flex justify-center">
        <pre
          className={`${isHackMode ? 'text-[#A855F7] opacity-40' : 'text-[#D2691E] opacity-80'} whitespace-pre select-none ${isHackMode ? 'hover-glow' : ''} font-bold text-[5px] sm:text-[7px] md:text-[9px] lg:text-[10px]`}
          style={{
            fontFamily: 'Consolas, Monaco, "Courier New", monospace',
            lineHeight: '1.1',
            letterSpacing: '0'
          }}
        >
{nameArt}
        </pre>
      </div>

      {/* ASCII Art MROIVILI */}
      <div className="flex justify-center mt-1 sm:mt-2">
        <pre
          className={`whitespace-pre select-none ${isHackMode ? 'glitch-text opacity-40' : 'text-[#D2691E] opacity-80'} font-semibold text-[6px] sm:text-[8px] md:text-[10px] lg:text-[11px]`}
          style={{
            fontFamily: 'Consolas, Monaco, "Courier New", monospace',
            lineHeight: '1.1',
            letterSpacing: '0'
          }}
        >
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
