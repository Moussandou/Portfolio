import React, { createContext, useContext, useState } from 'react';

// Types
export type FileSystemNode = {
    type: 'file' | 'directory';
    content?: string; // For files
    children?: Record<string, FileSystemNode>; // For directories
};

export type CommandResult = {
    output: string | React.ReactNode;
    type: 'success' | 'error' | 'info';
    newPath?: string[];
};

interface FileSystemContextType {
    currentPath: string[];
    fileSystem: Record<string, FileSystemNode>;
    executeCommand: (cmd: string) => CommandResult;
    resolvePath: (path: string) => FileSystemNode | null;
    addToHistory: (cmd: string) => void;
    commandHistory: string[];
}

// Initial File System Structure
const INITIAL_FS: Record<string, FileSystemNode> = {
    'home': {
        type: 'directory',
        children: {
            'moussandou': {
                type: 'directory',
                children: {
                    'projects': {
                        type: 'directory',
                        children: {
                            'bambu-buddy.txt': { type: 'file', content: 'Bambu Buddy: Gestionnaire d\'impression 3D. Stack: React, Tauri, TypeScript.' },
                            'rtype.txt': { type: 'file', content: 'R-Type: Jeu arcade multijoueur. Stack: C++, SFML, UDP/TCP.' },
                            'jeb.txt': { type: 'file', content: 'JEB Incubator: Plateforme web pour incubateur. Stack: React, Node.js.' },
                            'readme.md': { type: 'file', content: '# Portfolio de Moussandou\nBienvenue dans mon système.\nUtilisez `ls` pour voir les fichiers.' }
                        }
                    },
                    'skills.txt': { type: 'file', content: 'LANGUAGES: C, C++, Python, JS/TS, SQL, Haskell, ASM\nFRAMEWORKS: React, Node.js, Tailwind, Tauri\nTOOLS: Git, Docker, N8n' },
                    'contact.txt': { type: 'file', content: 'Email: moussandou.mroivili@epitech.eu\nTel: 07 81 63 32 78\nLinkedIn: linkedin.com/in/moussandou' },
                    'secret.txt': { type: 'file', content: '01001000 01100101 01101100 01101100 01101111 00100001' }
                }
            }
        }
    }
};

const FileSystemContext = createContext<FileSystemContextType | undefined>(undefined);

export function FileSystemProvider({ children }: { children: React.ReactNode }) {
    const [fileSystem, setFileSystem] = useState<Record<string, FileSystemNode>>(INITIAL_FS);
    const [currentPath, setCurrentPath] = useState<string[]>(['home', 'moussandou']);
    const [commandHistory, setCommandHistory] = useState<string[]>([]);

    const addToHistory = (cmd: string) => {
        setCommandHistory(prev => [...prev, cmd]);
    };

    const resolvePath = (pathStr: string): FileSystemNode | null => {
        let pathParts = pathStr.split('/').filter(p => p);

        // Handle absolute path
        let traversalPath = pathStr.startsWith('/') ? [] : [...currentPath];

        if (pathStr.startsWith('/')) {
            traversalPath = [];
        }

        // Merge paths
        const fullPath = [...traversalPath, ...pathParts];

        // Resolve '..' and '.'
        const resolvedPath: string[] = [];
        for (const part of fullPath) {
            if (part === '..') {
                resolvedPath.pop();
            } else if (part !== '.') {
                resolvedPath.push(part);
            }
        }

        // Traverse
        let node: FileSystemNode | undefined = { type: 'directory', children: fileSystem };
        for (const part of resolvedPath) {
            if (node?.type === 'directory' && node.children) {
                node = node.children[part];
            } else {
                return null;
            }
        }
        return node || null;
    };

    const getDirNode = (path: string[]): FileSystemNode | null => {
        let node: FileSystemNode | undefined = { type: 'directory', children: fileSystem };
        for (const part of path) {
            if (node?.type === 'directory' && node.children) {
                node = node.children[part];
            } else {
                return null;
            }
        }
        return node;
    };

    const executeCommand = (cmdStr: string): CommandResult => {
        const parts = cmdStr.trim().split(' ');
        const cmd = parts[0].toLowerCase();
        const args = parts.slice(1);

        switch (cmd) {
            case 'help':
                return {
                    output: `Available commands:
  ls        List directory contents
  cd [dir]  Change directory
  cat [file] Display file content
  pwd       Print working directory
  clear     Clear terminal
  mkdir [dir] Create directory
  touch [file] Create file
  whoami    Display current user
  date      Display current date`,
                    type: 'info'
                };

            case 'ls':
                const dirNode = getDirNode(currentPath);
                if (dirNode && dirNode.type === 'directory' && dirNode.children) {
                    const items = Object.entries(dirNode.children).map(([name, node]) => {
                        return node.type === 'directory' ? `${name}/` : name;
                    });
                    return { output: items.join('  '), type: 'success' };
                }
                return { output: 'Error: Current path is invalid', type: 'error' };

            case 'pwd':
                return { output: '/' + currentPath.join('/'), type: 'info' };

            case 'cd':
                if (!args[0]) return { output: '', type: 'success', newPath: ['home', 'moussandou'] };

                const targetPath = args[0];
                let newPath = [...currentPath];

                if (targetPath === '/') {
                    newPath = [];
                } else {
                    const pathParts = targetPath.split('/');
                    for (const part of pathParts) {
                        if (part === '..') {
                            if (newPath.length > 0) newPath.pop();
                        } else if (part === '.') {
                            continue;
                        } else if (part) {
                            // Check if child exists
                            const currentDirNode = getDirNode(newPath);
                            if (currentDirNode?.children && currentDirNode.children[part]?.type === 'directory') {
                                newPath.push(part);
                            } else {
                                return { output: `cd: no such file or directory: ${part}`, type: 'error' };
                            }
                        }
                    }
                }

                setCurrentPath(newPath);
                return { output: '', type: 'success', newPath };

            case 'cat':
                if (!args[0]) return { output: 'cat: missing operand', type: 'error' };
                const fileName = args[0];
                const currentDir = getDirNode(currentPath);

                if (currentDir?.children && currentDir.children[fileName]) {
                    const file = currentDir.children[fileName];
                    if (file.type === 'file') {
                        return { output: file.content || '', type: 'success' };
                    }
                    return { output: `cat: ${fileName}: Is a directory`, type: 'error' };
                }
                return { output: `cat: ${fileName}: No such file or directory`, type: 'error' };

            case 'mkdir':
                if (!args[0]) return { output: 'mkdir: missing operand', type: 'error' };
                // TODO: Implement actual state update for mkdir/touch
                return { output: 'mkdir: Read-only file system (Implementation pending)', type: 'error' };

            case 'touch':
                return { output: 'touch: Read-only file system (Implementation pending)', type: 'error' };

            case 'whoami':
                return { output: 'moussandou', type: 'success' };

            case 'date':
                return { output: new Date().toString(), type: 'info' };

            case 'clear':
                return { output: '', type: 'success' }; // Handled by UI clearing

            default:
                return { output: `command not found: ${cmd}`, type: 'error' };
        }
    };

    return (
        <FileSystemContext.Provider value={{
            currentPath,
            fileSystem,
            executeCommand,
            resolvePath,
            addToHistory,
            commandHistory
        }}>
            {children}
        </FileSystemContext.Provider>
    );
}

export function useFileSystem() {
    const context = useContext(FileSystemContext);
    if (context === undefined) {
        throw new Error('useFileSystem must be used within a FileSystemProvider');
    }
    return context;
}
