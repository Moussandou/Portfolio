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
    <div className="ascii-art float overflow-hidden">
      {/* ASCII Art MOUSSANDOU - Responsive sur toutes les tailles */}
      <div className="w-full flex justify-center">
        <pre className="text-[#A855F7] text-[5px] sm:text-[7px] md:text-[9px] lg:text-xs opacity-40 whitespace-pre select-none hover-glow leading-[0.9] scale-x-[0.95] sm:scale-x-100">
          {nameArt}
        </pre>
      </div>

      <div className="flex justify-center mt-4 overflow-hidden">
        <pre className="text-[7px] sm:text-[9px] md:text-xs opacity-40 whitespace-pre select-none glitch-text leading-[0.9] scale-x-[0.9] sm:scale-x-95 md:scale-x-100">
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