export function AsciiArt() {
  const nameArt = `
  ███╗   ███╗ ██████╗ ██╗   ██╗███████╗███████╗ █████╗ ███╗   ██╗██████╗  ██████╗ ██╗   ██╗
  ████╗ ████║██╔═══██╗██║   ██║██╔════╝██╔════╝██╔══██╗████╗  ██║██╔══██╗██╔═══██╗██║   ██║
  ██╔████╔██║██║   ██║██║   ██║███████╗███████╗███████║██╔██╗ ██║██║  ██║██║   ██║██║   ██║
  ██║╚██╔╝██║██║   ██║██║   ██║╚════██║╚════██║██╔══██║██║╚██╗██║██║  ██║██║   ██║██║   ██║
  ██║ ╚═╝ ██║╚██████╔╝╚██████╔╝███████║███████║██║  ██║██║ ╚████║██████╔╝╚██████╔╝╚██████╔╝
  ╚═╝     ╚═╝ ╚═════╝  ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝  ╚═════╝  ╚═════╝ 
  `;


  return (
    <div className="ascii-art float">
      {/* ASCII Art MOUSSANDOU - Responsive sur toutes les tailles */}
      <pre className="text-[#9333EA] text-[6px] sm:text-[8px] md:text-[10px] lg:text-xs opacity-30 whitespace-pre overflow-x-auto select-none hover-glow leading-tight">
        {nameArt}
      </pre>

      <div className="flex justify-center mt-4">
        <pre className="text-[8px] sm:text-[10px] md:text-xs opacity-40 whitespace-pre overflow-x-auto select-none glitch-text leading-tight">
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