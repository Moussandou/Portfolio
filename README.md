<div align="center">

# ⚡ SYSTEM_OVERRIDE: PORTFOLIO_V2.0 ⚡

[![Typing SVG](https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=600&size=30&pause=1000&color=5DADE2&center=true&vCenter=true&width=600&lines=INITIALIZING+SYSTEM...;LOADING+MODULES...;ACCESS+GRANTED.;WELCOME+TO+MY+UNIVERSE.)](https://git.io/typing-svg)

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)

<br/>

> *"The only limit is your imagination. And maybe RAM."*

</div>

---

## 📡 SYSTEM_STATUS

This portfolio is not just a website; it's an **interactive experience**. Designed with a dual-personality engine, it switches seamlessly between a clean, professional **Corporate Mode** and a chaotic, immersive **Hacker Mode**.

### 🚀 CORE_FEATURES

| MODULE | STATUS | DESCRIPTION |
| :--- | :---: | :--- |
| **Dual Theme Engine** | ✅ | Toggle between `Light/Corporate` and `Dark/Hacker` modes with CRT effects. |
| **Interactive Terminal** | ✅ | Fully functional `zsh`-like terminal with custom commands (`ls`, `help`, `whoami`). |
| **Skill Graph Viz** | ✅ | Physics-based force-directed graph visualization of technical skills. |
| **GitHub City** | ✅ | 3D visualization of commit history as a procedural city. |
| **Konami Code** | ✅ | Try `↑ ↑ ↓ ↓ ← → ← → B A` for a surprise. |
| **Gamification** | ✅ | Achievement system, typing games, and hidden easter eggs. |

---

## 🏗️ SYSTEM_ARCHITECTURE

```mermaid
graph TD
    User[User / Client] -->|Visits| App[App.tsx]
    
    subgraph Core_System [Core System]
        App -->|Composes| Hero[HeroSection]
        App -->|Composes| About[AboutSection]
        App -->|Composes| Projects[ProjectsSection]
        App -->|Composes| System[SystemSection]
        App -->|Composes| Contact[ContactSection]
    end

    subgraph Context_Layer [State Management]
        Theme[ThemeContext]
        Sound[SoundContext]
        Achieve[AchievementContext]
        FS[FileSystemContext]
    end

    subgraph Interactive_Modules [Interactive Modules]
        Term[InteractiveTerminal]
        City[GithubCity 3D]
        Graph[SkillGraph Viz]
        Game[HackerTyper]
    end

    App -.->|Wraps| Context_Layer
    System -->|Embeds| Term
    System -->|Embeds| City
    About -->|Embeds| Graph
```

---

## 💾 INSTALLATION_PROTOCOL

Initialize the local environment by executing the following command sequence:

```bash
# 1. Clone the repository
git clone https://github.com/Moussandou/Portfolio.git

# 2. Navigate to the system directory
cd Portfolio

# 3. Install dependencies
npm install

# 4. Initiate development server
npm run dev
```

> **WARNING**: High GPU usage may occur when `GithubCity` or `SkillGraph` modules are active. Ensure hardware acceleration is enabled.

---

## 📂 DIRECTORY_STRUCTURE

```bash
src/
├── components/         # UI Components & Visualizations
│   ├── sections/       # Main Page Sections (Hero, About, etc.)
│   ├── SkillGraph.tsx  # Physics-based Graph Engine
│   ├── GithubCity.tsx  # 3D Commit Visualization
│   └── ...
├── context/            # Global State (Theme, Sound, Achievements)
├── data/               # Static Data (Projects, Experience)
├── hooks/              # Custom React Hooks
├── lib/                # Utilities & Firebase Config
└── styles/             # Global Styles & Tailwind Config
```

---

## 🎮 HIDDEN_COMMANDS

Access the **Terminal** section and try these commands:

- `help`: List available commands.
- `whoami`: Display user identity.
- `matrix`: Toggle the Matrix rain effect.
- `clear`: Clear the terminal buffer.
- `sudo`: [ACCESS DENIED]

---

<div align="center">

### 🌐 CONNECT_UPLINK

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/moussandou)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/moussandou)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:moussandou.mroivili@epitech.eu)

**© 2025 Moussandou Mroivili. All Systems Operational.**

</div>
