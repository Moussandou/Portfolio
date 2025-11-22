import { useState, useEffect, useRef } from 'react';
import { useFileSystem } from '../context/FileSystemContext';
import { useTheme } from '../context/ThemeContext';
import { useSound } from '../context/SoundContext';
import { useAchievements } from '../context/AchievementContext';
import { useHackerTyper } from '../context/HackerTyperContext';
import { useDataViz } from '../context/DataVizContext';
import { TypingGame } from './TypingGame';

interface TerminalLine {
    type: 'input' | 'output';
    content: React.ReactNode;
    path?: string;
}

export function InteractiveTerminal() {
    const { currentPath, executeCommand, addToHistory, commandHistory } = useFileSystem();
    const { isHackMode } = useTheme();
    const { playSound } = useSound();
    const { unlockAchievement } = useAchievements();
    const { startHackerTyper } = useHackerTyper();
    const { showViz } = useDataViz();
    const [terminalMode, setTerminalMode] = useState<'shell' | 'typing-game'>('shell');

    const [lines, setLines] = useState<TerminalLine[]>([
        { type: 'output', content: 'Welcome to MoussandouOS v2.0. Type "help" for available commands.' }
    ]);
    const [input, setInput] = useState('');
    const [historyIndex, setHistoryIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [lines]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            const cmd = input.trim();
            if (!cmd) return;

            const newLines = [...lines, { type: 'input', content: cmd, path: currentPath.join('/') } as TerminalLine];

            if (cmd === 'clear') {
                setLines([]);
            } else if (cmd === 'hackertyper') {
                startHackerTyper();
                setLines(prev => [...prev, { type: 'input', content: cmd }, { type: 'output', content: 'Initiating Hacker Mode...' }]);
            } else if (cmd === 'typing-game') {
                setTerminalMode('typing-game');
            } else if (cmd === 'github-city') {
                showViz('github-city');
                setLines(prev => [...prev, { type: 'input', content: cmd }, { type: 'output', content: 'Launching GitHub City Visualization...' }]);
            } else {
                const result = executeCommand(cmd);
                if (result.output) {
                    newLines.push({ type: 'output', content: result.output });
                }
                setLines(newLines);
                unlockAchievement('terminal_wizard');
            }

            addToHistory(cmd);
            setHistoryIndex(-1);
            setInput('');
            playSound('success');
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length > 0) {
                const newIndex = historyIndex + 1;
                if (newIndex < commandHistory.length) {
                    setHistoryIndex(newIndex);
                    setInput(commandHistory[commandHistory.length - 1 - newIndex]);
                }
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1;
                setHistoryIndex(newIndex);
                setInput(commandHistory[commandHistory.length - 1 - newIndex]);
            } else if (historyIndex === 0) {
                setHistoryIndex(-1);
                setInput('');
            }
        }
    };

    const pathString = `~/${currentPath.slice(2).join('/')}`; // Hide home/moussandou prefix for cleaner look

    if (terminalMode === 'typing-game') {
        return <TypingGame onExit={() => setTerminalMode('shell')} />;
    }

    return (
        <div
            className="h-full w-full bg-transparent font-mono text-sm sm:text-base overflow-y-auto p-2 sm:p-4"
            onClick={() => inputRef.current?.focus()}
        >
            {lines.map((line, i) => (
                <div key={i} className="mb-1 break-words">
                    {line.type === 'input' ? (
                        <div className="flex flex-wrap gap-2">
                            <span className={isHackMode ? 'text-[#5DADE2]' : 'text-[#0E6655]'}>
                                moussandou@host:{line.path ? `~/${line.path.split('/').slice(2).join('/')}` : '~'}$
                            </span>
                            <span className={isHackMode ? 'text-gray-300' : 'text-gray-800'}>{line.content}</span>
                        </div>
                    ) : (
                        <div className={`whitespace-pre-wrap ${isHackMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {line.content}
                        </div>
                    )}
                </div>
            ))}

            <div className="flex flex-wrap gap-2 items-center">
                <span className={isHackMode ? 'text-[#5DADE2]' : 'text-[#0E6655]'}>
                    moussandou@host:{pathString}$
                </span>
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => {
                        setInput(e.target.value);
                        playSound('typing');
                    }}
                    onKeyDown={handleKeyDown}
                    className={`flex-1 bg-transparent outline-none border-none p-0 ${isHackMode ? 'text-gray-300 caret-[#5DADE2]' : 'text-gray-800 caret-[#0E6655]'
                        }`}
                    autoFocus
                    autoComplete="off"
                    spellCheck="false"
                />
            </div>
            <div ref={bottomRef} />
        </div>
    );
}
