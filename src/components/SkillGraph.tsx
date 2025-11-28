import { useEffect, useRef, useState } from 'react';
import { useDataViz } from '../context/DataVizContext';
import { useTheme } from '../context/ThemeContext';

interface Node {
    id: string;
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    color: string;
    group: string;
    icon?: string; // Add icon property
    img?: HTMLImageElement; // Cache for loaded image
}

interface Link {
    source: string;
    target: string;
}

const SKILLS_DATA = {
    nodes: [
        // Center
        { id: 'Me', group: 'center', radius: 50, color: '#ffffff', icon: 'https://github.com/moussandou.png' },

        // Categories
        { id: 'Languages', group: 'category', radius: 35, color: '#FF5733' },
        { id: 'Web', group: 'category', radius: 35, color: '#61dafb' },
        { id: 'Tools', group: 'category', radius: 35, color: '#4caf50' },
        { id: 'Systems', group: 'category', radius: 35, color: '#9c27b0' },

        // Languages
        { id: 'C', group: 'skill', radius: 25, color: '#555555', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/c/c-original.svg' },
        { id: 'C++', group: 'skill', radius: 25, color: '#00599c', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg' },
        { id: 'Python', group: 'skill', radius: 25, color: '#ffd43b', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg' },
        { id: 'Haskell', group: 'skill', radius: 25, color: '#5e5086', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/haskell/haskell-original.svg' },
        { id: 'ASM', group: 'skill', radius: 25, color: '#37474f', icon: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Assembly-logo.svg' }, // Custom fallback or generic
        { id: 'SQL', group: 'skill', radius: 25, color: '#00758f', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg' },

        // Web
        { id: 'JavaScript', group: 'skill', radius: 25, color: '#f0db4f', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg' },
        { id: 'HTML5', group: 'skill', radius: 25, color: '#e34f26', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg' },
        { id: 'CSS3', group: 'skill', radius: 25, color: '#1572b6', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg' },
        { id: 'React', group: 'skill', radius: 25, color: '#61dafb', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg' },
        { id: 'WordPress', group: 'skill', radius: 25, color: '#21759b', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/wordpress/wordpress-plain.svg' },

        // Tools
        { id: 'Git', group: 'skill', radius: 25, color: '#f05032', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg' },
        { id: 'VS Code', group: 'skill', radius: 25, color: '#007acc', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/vscode/vscode-original.svg' },
        { id: 'N8n', group: 'skill', radius: 25, color: '#ff6d5a', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/n8n/n8n-original.svg' }, // N8n icon might need check, using generic if fails or text

        // Systems
        { id: 'Linux', group: 'skill', radius: 25, color: '#fcc624', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/linux/linux-original.svg' },
        { id: 'macOS', group: 'skill', radius: 25, color: '#000000', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/apple/apple-original.svg' },
        { id: 'Windows', group: 'skill', radius: 25, color: '#0078d6', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/windows8/windows8-original.svg' },
    ],
    links: [
        // Center connections
        { source: 'Me', target: 'Languages' },
        { source: 'Me', target: 'Web' },
        { source: 'Me', target: 'Tools' },
        { source: 'Me', target: 'Systems' },

        // Languages
        { source: 'Languages', target: 'C' },
        { source: 'Languages', target: 'C++' },
        { source: 'Languages', target: 'Python' },
        { source: 'Languages', target: 'Haskell' },
        { source: 'Languages', target: 'ASM' },
        { source: 'Languages', target: 'SQL' },
        { source: 'C', target: 'C++' }, // Related
        { source: 'C', target: 'ASM' }, // Related

        // Web
        { source: 'Web', target: 'JavaScript' },
        { source: 'Web', target: 'HTML5' },
        { source: 'Web', target: 'CSS3' },
        { source: 'Web', target: 'React' },
        { source: 'Web', target: 'WordPress' },
        { source: 'HTML5', target: 'CSS3' },
        { source: 'JavaScript', target: 'React' },

        // Tools
        { source: 'Tools', target: 'Git' },
        { source: 'Tools', target: 'VS Code' },
        { source: 'Tools', target: 'N8n' },

        // Systems
        { source: 'Systems', target: 'Linux' },
        { source: 'Systems', target: 'macOS' },
        { source: 'Systems', target: 'Windows' },
    ]
};

export function SkillGraph() {
    const { activeViz, closeViz } = useDataViz();
    const { isHackMode } = useTheme();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [_hoveredNode, setHoveredNode] = useState<Node | null>(null);

    // Simulation state
    const nodesRef = useRef<Node[]>([]);
    const linksRef = useRef<Link[]>([]);
    const animationRef = useRef<number>();
    const draggingNode = useRef<Node | null>(null);

    useEffect(() => {
        if (activeViz !== 'skill-graph') return;
        if (!canvasRef.current) return;

        const width = window.innerWidth;
        const height = window.innerHeight;
        canvasRef.current.width = width;
        canvasRef.current.height = height;

        // Initialize nodes
        nodesRef.current = SKILLS_DATA.nodes.map(n => {
            const node: Node = {
                ...n,
                x: width / 2 + (Math.random() - 0.5) * 200, // Spread out initial positions
                y: height / 2 + (Math.random() - 0.5) * 200,
                vx: 0,
                vy: 0
            };
            // Preload image if icon exists
            if (n.icon) {
                const img = new Image();
                img.src = n.icon;
                node.img = img;
            }
            return node;
        });
        linksRef.current = SKILLS_DATA.links;

        // Pre-calculate link references to avoid repeated lookups
        const resolvedLinks = SKILLS_DATA.links.map(link => ({
            source: nodesRef.current.find(n => n.id === link.source),
            target: nodesRef.current.find(n => n.id === link.target)
        })).filter(l => l.source && l.target) as { source: Node, target: Node }[];

        const simulate = () => {
            const nodes = nodesRef.current;
            const ctx = canvasRef.current?.getContext('2d');
            if (!ctx || !canvasRef.current) return;

            // Physics constants
            const repulsion = 2500;
            const springLength = 200;
            const springStrength = 0.04;
            const damping = 0.9;
            const centerStrength = 0.005;

            // Clear canvas
            ctx.clearRect(0, 0, width, height);

            try {
                // Apply forces
                for (let i = 0; i < nodes.length; i++) {
                    const node = nodes[i];
                    if (node === draggingNode.current) continue;

                    // Repulsion
                    for (let j = 0; j < nodes.length; j++) {
                        if (i === j) continue;
                        const other = nodes[j];
                        const dx = node.x - other.x;
                        const dy = node.y - other.y;
                        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                        const force = repulsion / (dist * dist);
                        node.vx += (dx / dist) * force;
                        node.vy += (dy / dist) * force;
                    }

                    // Center attraction
                    node.vx += (width / 2 - node.x) * centerStrength;
                    node.vy += (height / 2 - node.y) * centerStrength;
                }

                // Spring forces
                for (const link of resolvedLinks) {
                    const { source, target } = link;
                    const dx = target.x - source.x;
                    const dy = target.y - source.y;
                    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                    const force = (dist - springLength) * springStrength;

                    if (source !== draggingNode.current) {
                        source.vx += (dx / dist) * force;
                        source.vy += (dy / dist) * force;
                    }
                    if (target !== draggingNode.current) {
                        target.vx -= (dx / dist) * force;
                        target.vy -= (dy / dist) * force;
                    }
                }

                // Update positions and draw

                // Draw links first with glow
                ctx.shadowBlur = 5;
                ctx.shadowColor = isHackMode ? '#5DADE2' : '#0E6655';
                ctx.strokeStyle = isHackMode ? 'rgba(93, 173, 226, 0.4)' : 'rgba(14, 102, 85, 0.4)';
                ctx.lineWidth = 2;

                for (const link of resolvedLinks) {
                    ctx.beginPath();
                    ctx.moveTo(link.source.x, link.source.y);
                    ctx.lineTo(link.target.x, link.target.y);
                    ctx.stroke();
                }
                ctx.shadowBlur = 0; // Reset shadow

                // Draw nodes
                for (const node of nodes) {
                    if (node !== draggingNode.current) {
                        node.vx *= damping;
                        node.vy *= damping;
                        node.x += node.vx;
                        node.y += node.vy;
                    }

                    // Boundary constraints - Keep nodes inside canvas
                    node.x = Math.max(node.radius, Math.min(width - node.radius, node.x));
                    node.y = Math.max(node.radius, Math.min(height - node.radius, node.y));

                    // Safety check for NaN
                    if (isNaN(node.x)) node.x = width / 2;
                    if (isNaN(node.y)) node.y = height / 2;

                    ctx.save();

                    // Draw connection lines glow
                    if (node.group === 'center') {
                        ctx.shadowBlur = 20;
                        ctx.shadowColor = '#ffffff';
                    } else {
                        ctx.shadowBlur = 10;
                        ctx.shadowColor = node.color;
                    }

                    if (node.img && node.img.complete && node.img.naturalWidth > 0) {
                        try {
                            // Draw Image Icon
                            ctx.beginPath();
                            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
                            ctx.clip();
                            ctx.drawImage(node.img, node.x - node.radius, node.y - node.radius, node.radius * 2, node.radius * 2);

                            // Border ring
                            ctx.beginPath();
                            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
                            ctx.strokeStyle = node.color;
                            ctx.lineWidth = 2;
                            ctx.stroke();
                        } catch (e) {
                            // Fallback if image drawing fails
                            ctx.beginPath();
                            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
                            ctx.fillStyle = node.color;
                            ctx.fill();
                            ctx.strokeStyle = '#fff';
                            ctx.lineWidth = 1;
                            ctx.stroke();
                        }
                    } else {
                        // Fallback to circle
                        ctx.beginPath();
                        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
                        ctx.fillStyle = node.color;
                        ctx.fill();
                        ctx.strokeStyle = '#fff';
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }

                    ctx.restore();

                    // Label - Always White with Shadow for visibility
                    ctx.fillStyle = '#ffffff';
                    ctx.shadowColor = '#000000';
                    ctx.shadowBlur = 4;
                    ctx.shadowOffsetX = 1;
                    ctx.shadowOffsetY = 1;
                    ctx.font = 'bold 12px monospace';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(node.id, node.x, node.y + node.radius + 15);

                    // Reset shadow for next iteration
                    ctx.shadowColor = 'transparent';
                    ctx.shadowBlur = 0;
                    ctx.shadowOffsetX = 0;
                    ctx.shadowOffsetY = 0;
                }
            } catch (error) {
                console.error("Animation loop error:", error);
            }

            animationRef.current = requestAnimationFrame(simulate);
        };

        simulate();

        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, [activeViz, isHackMode]);

    if (activeViz !== 'skill-graph') return null;

    const handleMouseDown = (e: React.MouseEvent) => {
        const rect = canvasRef.current?.getBoundingClientRect();
        if (!rect) return;
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const clickedNode = nodesRef.current.find(n => {
            const dx = n.x - x;
            const dy = n.y - y;
            return Math.sqrt(dx * dx + dy * dy) < n.radius;
        });

        if (clickedNode) {
            draggingNode.current = clickedNode;
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (draggingNode.current) {
            const rect = canvasRef.current?.getBoundingClientRect();
            if (!rect) return;
            draggingNode.current.x = e.clientX - rect.left;
            draggingNode.current.y = e.clientY - rect.top;
            draggingNode.current.vx = 0;
            draggingNode.current.vy = 0;
        }

        // Hover detection
        const rect = canvasRef.current?.getBoundingClientRect();
        if (!rect) return;
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const hovered = nodesRef.current.find(n => {
            const dx = n.x - x;
            const dy = n.y - y;
            return Math.sqrt(dx * dx + dy * dy) < n.radius;
        });

        setHoveredNode(hovered || null);
        if (canvasRef.current) {
            canvasRef.current.style.cursor = hovered ? 'pointer' : 'default';
        }
    };

    const handleMouseUp = () => {
        draggingNode.current = null;
    };

    return (
        <div className="fixed inset-0 z-[90] bg-black/90 backdrop-blur-sm">
            <div className="absolute top-4 right-4 z-[100]">
                <button
                    onClick={closeViz}
                    className="px-4 py-2 bg-red-500/20 text-red-500 border border-red-500 rounded hover:bg-red-500/40 transition-colors"
                >
                    CLOSE [ESC]
                </button>
            </div>

            <div className="absolute top-4 left-4 z-[100] text-white pointer-events-none">
                <h2 className="text-2xl font-bold mb-2">NEURAL SKILL NETWORK</h2>
                <p className="opacity-70 text-sm">Drag nodes to reorganize</p>
            </div>

            <canvas
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                className="w-full h-full"
            />
        </div>
    );
}
