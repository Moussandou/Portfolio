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
}

interface Link {
    source: string;
    target: string;
}

const SKILLS_DATA = {
    nodes: [
        { id: 'Me', group: 'center', radius: 40, color: '#ffffff' },
        { id: 'Frontend', group: 'category', radius: 30, color: '#61dafb' },
        { id: 'Backend', group: 'category', radius: 30, color: '#4caf50' },
        { id: 'Tools', group: 'category', radius: 30, color: '#ff9800' },
        { id: 'React', group: 'skill', radius: 20, color: '#61dafb' },
        { id: 'TypeScript', group: 'skill', radius: 20, color: '#3178c6' },
        { id: 'Tailwind', group: 'skill', radius: 20, color: '#38bdf8' },
        { id: 'Node.js', group: 'skill', radius: 20, color: '#68a063' },
        { id: 'Python', group: 'skill', radius: 20, color: '#ffd43b' },
        { id: 'C++', group: 'skill', radius: 20, color: '#00599c' },
        { id: 'Git', group: 'skill', radius: 20, color: '#f05032' },
        { id: 'Docker', group: 'skill', radius: 20, color: '#2496ed' },
        { id: 'Linux', group: 'skill', radius: 20, color: '#fcc624' },
    ],
    links: [
        { source: 'Me', target: 'Frontend' },
        { source: 'Me', target: 'Backend' },
        { source: 'Me', target: 'Tools' },
        { source: 'Frontend', target: 'React' },
        { source: 'Frontend', target: 'TypeScript' },
        { source: 'Frontend', target: 'Tailwind' },
        { source: 'Backend', target: 'Node.js' },
        { source: 'Backend', target: 'Python' },
        { source: 'Backend', target: 'C++' },
        { source: 'Tools', target: 'Git' },
        { source: 'Tools', target: 'Docker' },
        { source: 'Tools', target: 'Linux' },
        { source: 'React', target: 'TypeScript' },
        { source: 'Node.js', target: 'TypeScript' },
        { source: 'C++', target: 'Linux' },
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
        if (activeViz !== 'skill-graph') return; // Moved early return
        if (!canvasRef.current) return;

        const width = window.innerWidth;
        const height = window.innerHeight;
        canvasRef.current.width = width;
        canvasRef.current.height = height;

        // Initialize nodes with random positions near center
        nodesRef.current = SKILLS_DATA.nodes.map(n => ({
            ...n,
            x: width / 2 + (Math.random() - 0.5) * 100,
            y: height / 2 + (Math.random() - 0.5) * 100,
            vx: 0,
            vy: 0
        }));
        linksRef.current = SKILLS_DATA.links;

        const simulate = () => {
            const nodes = nodesRef.current;
            const links = linksRef.current;
            const ctx = canvasRef.current?.getContext('2d');
            if (!ctx || !canvasRef.current) return;

            // Physics constants
            const repulsion = 1000;
            const springLength = 150;
            const springStrength = 0.05;
            const damping = 0.9;
            const centerStrength = 0.01;

            // Clear canvas
            ctx.clearRect(0, 0, width, height);

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
            for (const link of links) {
                const source = nodes.find(n => n.id === link.source);
                const target = nodes.find(n => n.id === link.target);
                if (source && target) {
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
            }

            // Update positions and draw

            // Draw links first
            ctx.strokeStyle = isHackMode ? 'rgba(93, 173, 226, 0.3)' : 'rgba(14, 102, 85, 0.3)';
            ctx.lineWidth = 2;
            for (const link of links) {
                const source = nodes.find(n => n.id === link.source);
                const target = nodes.find(n => n.id === link.target);
                if (source && target) {
                    ctx.beginPath();
                    ctx.moveTo(source.x, source.y);
                    ctx.lineTo(target.x, target.y);
                    ctx.stroke();
                }
            }

            // Draw nodes
            for (const node of nodes) {
                if (node !== draggingNode.current) {
                    node.vx *= damping;
                    node.vy *= damping;
                    node.x += node.vx;
                    node.y += node.vy;
                }

                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
                ctx.fillStyle = node.color;
                ctx.fill();

                // Border
                ctx.strokeStyle = isHackMode ? '#5DADE2' : '#0E6655';
                ctx.lineWidth = 2;
                ctx.stroke();

                // Label
                ctx.fillStyle = isHackMode ? '#fff' : '#000';
                ctx.font = '12px monospace';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(node.id, node.x, node.y + node.radius + 15);
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
