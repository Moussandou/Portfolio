import { SectionWrapper } from '../SectionWrapper';
import { WindowFrame } from '../WindowFrame';
import { InteractiveTerminal } from '../InteractiveTerminal';
import { GithubCity } from '../GithubCity';
import { FeaturesSection } from '../FeaturesSection';

interface SystemSectionProps {
    isHackMode: boolean;
}

export function SystemSection({ isHackMode }: SystemSectionProps) {
    return (
        <SectionWrapper id="terminal" className={isHackMode ? "bg-black/20" : ""}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:h-[600px]">
                <WindowFrame title="interactive_terminal.sh" isHackMode={isHackMode} className="h-[400px] lg:h-full flex flex-col" noPadding>
                    <div className="absolute inset-0">
                        <InteractiveTerminal />
                    </div>
                </WindowFrame>

                <WindowFrame title="github_city_viz.gl" isHackMode={isHackMode} className="h-[400px] lg:h-full flex flex-col" noPadding>
                    <div className="absolute inset-0">
                        <GithubCity />
                    </div>
                </WindowFrame>
            </div>

            <div className="mt-12">
                <WindowFrame title="system_features.json" isHackMode={isHackMode}>
                    <FeaturesSection isHackMode={isHackMode} />
                </WindowFrame>
            </div>
        </SectionWrapper>
    );
}
