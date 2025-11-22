import { useEffect, useState, useRef } from 'react';
import { useHackerTyper } from '../context/HackerTyperContext';
import { useSound } from '../context/SoundContext';
import { useAchievements } from '../context/AchievementContext';

const CODE_SNIPPETS = [
    `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

class NetworkSecurity {
private:
    std::string encryptionKey;
    int securityLevel;

public:
    NetworkSecurity(std::string key) : encryptionKey(key), securityLevel(10) {}

    bool authenticateUser(std::string username, std::string password) {
        // Simulating complex hash verification
        for(int i = 0; i < 100; i++) {
            if (hash(password + std::to_string(i)) == encryptionKey) {
                return true;
            }
        }
        return false;
    }

    void initiateFirewall() {
        std::cout << "Initializing firewall protocols..." << std::endl;
        // Loading rules
        for(const auto& rule : defaultRules) {
            applyRule(rule);
        }
    }
};`,
    `const handleMainframeAccess = async (credentials) => {
    try {
        const connection = await db.connect(process.env.MAINFRAME_URI);
        const user = await connection.users.findOne({ id: credentials.id });
        
        if (!user || !user.hasClearance('LEVEL_5')) {
            throw new Error('ACCESS_DENIED: Insufficient privileges');
        }

        // Decrypting payload
        const payload = decrypt(user.encryptedData, process.env.MASTER_KEY);
        
        return {
            status: 'GRANTED',
            token: generateSessionToken(user),
            data: payload
        };
    } catch (error) {
        logSecurityEvent('UNAUTHORIZED_ACCESS_ATTEMPT', {
            ip: credentials.ip,
            timestamp: new Date().toISOString()
        });
        return { status: 'DENIED', reason: error.message };
    }
};`,
    `def bypass_proxy(target_ip, port):
    """
    Attempting to bypass corporate proxy via tunneling
    """
    socket = create_socket()
    socket.connect((target_ip, port))
    
    headers = {
        'X-Forwarded-For': '127.0.0.1',
        'User-Agent': 'Mozilla/5.0 (Compatible; MoussandouBot/1.0)'
    }
    
    payload = generate_buffer_overflow_payload()
    
    try:
        socket.send(headers)
        socket.send(payload)
        response = socket.recv(4096)
        
        if b'200 OK' in response:
            print("[+] Proxy bypassed successfully")
            return True
        else:
            print("[-] Failed to bypass proxy")
            return False
    except Exception as e:
        print(f"[!] Error during exploit: {e}")
        return False`
];

export function HackerTyper() {
    const { isActive, stopHackerTyper } = useHackerTyper();
    const { playSound } = useSound();
    const { unlockAchievement } = useAchievements();
    const [code, setCode] = useState('');
    const [accessGranted, setAccessGranted] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Combine snippets into one large text
    const fullCode = CODE_SNIPPETS.join('\n\n');
    const charsPerKeystroke = 3;

    useEffect(() => {
        if (isActive) {
            setCode('');
            setAccessGranted(false);
            // Focus logic if needed, but we attach to window
        }
    }, [isActive]);

    useEffect(() => {
        if (!isActive) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                stopHackerTyper();
                return;
            }

            if (accessGranted) return;

            e.preventDefault();
            playSound('typing');

            setCode(prev => {
                const currentLength = prev.length;
                if (currentLength >= fullCode.length) {
                    if (!accessGranted) {
                        setAccessGranted(true);
                        playSound('success');
                        unlockAchievement('hacker_typer_god'); // Make sure to add this achievement ID later if not exists
                    }
                    return prev;
                }
                return fullCode.substring(0, currentLength + charsPerKeystroke);
            });

            // Auto scroll
            if (containerRef.current) {
                containerRef.current.scrollTop = containerRef.current.scrollHeight;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isActive, fullCode, playSound, stopHackerTyper, accessGranted, unlockAchievement]);

    // Check for "completion" to trigger access granted
    useEffect(() => {
        if (code.length > 500 && !accessGranted) { // Arbitrary threshold for "success"
            // Actually let's make it random or based on length
            if (Math.random() > 0.99) {
                setAccessGranted(true);
                playSound('success');
                unlockAchievement('script_kiddie');
            }
        }
    }, [code, accessGranted, playSound, unlockAchievement]);

    if (!isActive) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-black text-[#0f0] font-mono p-8 overflow-hidden">
            <div className="absolute top-4 right-4 text-xs opacity-50">
                PRESS ESC TO EXIT
            </div>

            <div
                ref={containerRef}
                className="h-full w-full overflow-y-auto whitespace-pre-wrap break-all text-sm md:text-base lg:text-lg leading-relaxed"
                style={{ textShadow: '0 0 5px #0f0' }}
            >
                {code}
                <span className="animate-pulse">_</span>
            </div>

            {accessGranted && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-50">
                    <div className="border-4 border-[#0f0] p-8 bg-black text-[#0f0] text-center animate-bounce shadow-[0_0_50px_#0f0]">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">ACCESS GRANTED</h1>
                        <p className="text-xl">MAINFRAME PENETRATION SUCCESSFUL</p>
                    </div>
                </div>
            )}
        </div>
    );
}
