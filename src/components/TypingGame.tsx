import { useState, useEffect, useRef, useCallback } from 'react';
import { useSound } from '../context/SoundContext';
import { useAchievements } from '../context/AchievementContext';

interface TypingGameProps {
    onExit: () => void;
}

const WORDS = [
    "function", "const", "let", "var", "return", "import", "export", "default",
    "class", "interface", "extends", "implements", "public", "private", "protected",
    "static", "readonly", "async", "await", "promise", "try", "catch", "finally",
    "throw", "new", "this", "super", "constructor", "void", "any", "string",
    "number", "boolean", "null", "undefined", "object", "symbol", "bigint",
    "if", "else", "switch", "case", "break", "continue", "for", "while", "do",
    "map", "filter", "reduce", "forEach", "find", "some", "every", "includes",
    "push", "pop", "shift", "unshift", "splice", "slice", "join", "split",
    "react", "component", "hook", "state", "effect", "context", "reducer", "memo",
    "callback", "ref", "virtual", "dom", "render", "mount", "update", "unmount"
];

const GAME_DURATION = 30; // seconds

export function TypingGame({ onExit }: TypingGameProps) {
    const [gameState, setGameState] = useState<'start' | 'playing' | 'finished'>('start');
    const [targetWords, setTargetWords] = useState<string[]>([]);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [userInput, setUserInput] = useState('');
    const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
    const [wpm, setWpm] = useState(0);
    const [correctChars, setCorrectChars] = useState(0);
    const [totalChars, setTotalChars] = useState(0);

    const inputRef = useRef<HTMLInputElement>(null);
    const { playSound } = useSound();
    const { unlockAchievement } = useAchievements();

    useEffect(() => {
        if (gameState === 'start') {
            // Shuffle and pick words
            const shuffled = [...WORDS].sort(() => 0.5 - Math.random());
            setTargetWords(shuffled.slice(0, 50));
            inputRef.current?.focus();
        }
    }, [gameState]);

    const endGame = useCallback(() => {
        setGameState('finished');
        playSound('success');

        // Calculate final stats
        const minutes = GAME_DURATION / 60;
        const finalWpm = Math.round((correctChars / 5) / minutes);
        setWpm(finalWpm);

        // Achievements
        if (finalWpm > 60) unlockAchievement('speed_demon');
        if (finalWpm > 100) unlockAchievement('keyboard_warrior');
    }, [correctChars, playSound, unlockAchievement]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (gameState === 'playing' && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && gameState === 'playing') {
            endGame();
        }
        return () => clearInterval(interval);
    }, [gameState, timeLeft, endGame]);

    const startGame = () => {
        setGameState('playing');
        setTimeLeft(GAME_DURATION);
        setCurrentWordIndex(0);
        setUserInput('');
        setCorrectChars(0);
        setTotalChars(0);
        inputRef.current?.focus();
        playSound('click');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            onExit();
            return;
        }

        if (gameState === 'start' && e.key === 'Enter') {
            startGame();
            return;
        }

        if (gameState === 'finished' && e.key === 'Enter') {
            startGame(); // Restart
            return;
        }

        if (gameState === 'finished' && e.key === 'Escape') {
            onExit();
            return;
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (gameState !== 'playing') return;

        const value = e.target.value;
        const currentTargetWord = targetWords[currentWordIndex];

        // Space triggers next word
        if (value.endsWith(' ')) {
            const wordToCheck = value.trim();

            if (wordToCheck === currentTargetWord) {
                setCorrectChars(prev => prev + currentTargetWord.length + 1); // +1 for space
                playSound('success');
            } else {
                playSound('error');
            }

            setTotalChars(prev => prev + currentTargetWord.length + 1);
            setCurrentWordIndex(prev => prev + 1);
            setUserInput('');

            // Update accuracy
            // Simplified accuracy: correct words / total words attempted? 
            // Or char based. Let's stick to simple char count for WPM for now.
        } else {
            setUserInput(value);
            playSound('typing');
        }
    };

    return (
        <div className="h-full flex flex-col items-center justify-center p-4 font-mono w-full max-w-2xl mx-auto" onClick={() => inputRef.current?.focus()}>
            {gameState === 'start' && (
                <div className="text-center space-y-4">
                    <h2 className="text-2xl font-bold text-[var(--theme-primary)]">TYPING SPEED TEST</h2>
                    <p className="text-[var(--theme-text)] opacity-80">Test your coding speed. Type the words as fast as you can.</p>
                    <div className="animate-pulse text-sm mt-8">PRESS ENTER TO START</div>
                    <div className="text-xs opacity-50">PRESS ESC TO EXIT</div>
                </div>
            )}

            {gameState === 'playing' && (
                <div className="w-full space-y-6">
                    <div className="flex justify-between text-xl font-bold text-[var(--theme-primary)]">
                        <div>TIME: {timeLeft}s</div>
                        <div>WPM: {Math.round((correctChars / 5) / ((GAME_DURATION - timeLeft) / 60) || 0)}</div>
                    </div>

                    <div className="relative bg-black/30 p-6 rounded-lg border border-[var(--theme-border)] min-h-[150px] text-lg leading-relaxed break-words whitespace-pre-wrap">
                        {/* Render words */}
                        {targetWords.slice(currentWordIndex, currentWordIndex + 20).map((word, idx) => {
                            const isCurrent = idx === 0;
                            return (
                                <span key={idx} className={`mr-3 ${isCurrent ? 'bg-[var(--theme-primary)] text-black px-1 rounded' : 'text-[var(--theme-text)] opacity-60'}`}>
                                    {word}
                                </span>
                            );
                        })}
                    </div>

                    <input
                        ref={inputRef}
                        type="text"
                        value={userInput}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        className="w-full bg-transparent border-b-2 border-[var(--theme-primary)] outline-none text-xl py-2 text-[var(--theme-text)] text-center"
                        autoFocus
                        onBlur={() => inputRef.current?.focus()}
                    />
                    <div className="text-center text-xs opacity-50">Type the highlighted word and press SPACE</div>
                </div>
            )}

            {gameState === 'finished' && (
                <div className="text-center space-y-6 animate-in fade-in zoom-in duration-300">
                    <h2 className="text-3xl font-bold text-[var(--theme-primary)]">TEST COMPLETE</h2>

                    <div className="grid grid-cols-2 gap-8 my-8">
                        <div className="bg-black/20 p-4 rounded border border-[var(--theme-border)]">
                            <div className="text-sm opacity-70">WPM</div>
                            <div className="text-4xl font-bold text-[var(--theme-primary)]">{wpm}</div>
                        </div>
                        <div className="bg-black/20 p-4 rounded border border-[var(--theme-border)]">
                            <div className="text-sm opacity-70">ACCURACY</div>
                            <div className="text-4xl font-bold text-[var(--theme-primary)]">
                                {Math.round((correctChars / totalChars) * 100) || 100}%
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <button
                            onClick={startGame}
                            className="px-6 py-2 bg-[var(--theme-primary)] text-black font-bold rounded hover:opacity-90 transition-opacity w-full sm:w-auto"
                        >
                            TRY AGAIN (ENTER)
                        </button>
                        <button
                            onClick={onExit}
                            className="px-6 py-2 border border-[var(--theme-border)] text-[var(--theme-text)] rounded hover:bg-[var(--theme-border)]/10 transition-colors w-full sm:w-auto block sm:inline-block sm:ml-4"
                        >
                            EXIT (ESC)
                        </button>
                    </div>
                </div>
            )}

            {/* Hidden input for start/finish screens to capture Enter/Esc */}
            {gameState !== 'playing' && (
                <input
                    ref={inputRef}
                    className="opacity-0 absolute"
                    onKeyDown={handleKeyDown}
                    autoFocus
                />
            )}
        </div>
    );
}
