"use client";

import { useEffect, useState, useRef } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, X, Minus, Square, Loader2, Terminal } from "lucide-react";

import About from "./About";
import Experience from "./Experience";
import Education from "./Education";
import Projects from "./Projects";
import BlogPreview from "./BlogPreview";
import Contact from "./Contact";

const folderData = [
  { name: "About Me", slug: "about-me", lightBg: "bg-[#8B739E]", darkBg: "dark:bg-[#523E63]", component: <About /> },
  { name: "Work Experience", slug: "work-experience", lightBg: "bg-[#655573]", darkBg: "dark:bg-[#342B3E]", component: <Experience /> },
  { name: "Education", slug: "education", lightBg: "bg-[#7A6B88]", darkBg: "dark:bg-[#433A4F]", component: <Education /> },
  { name: "Projects", slug: "projects", lightBg: "bg-[#9A8AA6]", darkBg: "dark:bg-[#5E526B]", component: <Projects /> },
  { name: "Blogs", slug: "blogs", lightBg: "bg-[#544F7C]", darkBg: "dark:bg-[#2B274F]", component: <BlogPreview /> },
  { name: "Contact Me", slug: "contact-me", lightBg: "bg-[#3D3B63]", darkBg: "dark:bg-[#1E1D3B]", component: <Contact /> }
];

interface WindowInstance {
  id: string;
  name: string;
  slug?: string;
  isLoading?: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  x: number;
  y: number;
  isTerminal: boolean;
  component?: React.ReactNode;
}

interface TerminalLine {
  text: string;
  type: "input" | "output" | "error" | "welcome";
  dir?: string;
}

interface HeroProps {
  viewMode: "dev" | "normal";
  setViewMode: React.Dispatch<React.SetStateAction<"dev" | "normal">>;
}

export default function Hero({ viewMode, setViewMode }: HeroProps) {
  const { theme, setTheme } = useTheme();
  const [globalZIndex, setGlobalZIndex] = useState(10);
  const [windows, setWindows] = useState<WindowInstance[]>([]);
  
  const [terminalInput, setTerminalInput] = useState("");
  const [currentDir, setCurrentDir] = useState("~");
  const [terminalHistory, setTerminalHistory] = useState<TerminalLine[]>([
    { text: "Welcome to Preeta OS Shell v1.1.6 ", type: "welcome" },
    { text: "Hello, this is Anannya Preeta. Use 'ls' to view folders, or type 'help' to review shell options.", type: "welcome" }
  ]);
  
  const terminalBottomRef = useRef<HTMLDivElement>(null);
  const dragInfo = useRef<{ id: string; startX: number; startY: number; currentX: number; currentY: number } | null>(null);

  useEffect(() => {
    terminalBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalHistory]);

  const handleOpenTerminal = () => {
    const exists = windows.find((w) => w.id === "terminal");
    const nextZ = globalZIndex + 1;
    setGlobalZIndex(nextZ);

    if (exists) {
      setWindows(prev => prev.map(w => w.id === "terminal" ? { ...w, isMinimized: false, zIndex: nextZ } : w));
      return;
    }

    const defaultX = typeof window !== "undefined" ? window.innerWidth * 0.5 - 310 : 120;
    const defaultY = typeof window !== "undefined" ? window.innerHeight * 0.5 - 180 : 100;

    const newTerminal: WindowInstance = {
      id: "terminal",
      name: "Terminal Shell",
      isMinimized: false,
      isMaximized: false,
      zIndex: nextZ,
      x: defaultX,
      y: defaultY,
      isTerminal: true
    };
    setWindows((prev) => [...prev, newTerminal]);
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!dragInfo.current) return;
      const { id, startX, startY, currentX, currentY } = dragInfo.current;
      
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      setWindows((prev) =>
        prev.map((w) =>
          w.id === id && !w.isMaximized
            ? { ...w, x: currentX + deltaX, y: currentY + deltaY }
            : w
        )
      );
    };

    const handleGlobalMouseUp = () => {
      dragInfo.current = null;
    };

    window.addEventListener("mousemove", handleGlobalMouseMove);
    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      window.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, []);

  const triggerOpenWindow = (slug: string) => {
    const folder = folderData.find(f => f.slug === slug || f.name.toLowerCase() === slug.toLowerCase());
    if (!folder) return null;

    const exists = windows.find((w) => w.id === folder.name);
    const nextZ = globalZIndex + 1;
    setGlobalZIndex(nextZ);

    if (exists) {
      setWindows(prev => prev.map(w => w.id === folder.name ? { ...w, isMinimized: false, zIndex: nextZ } : w));
      return folder.slug;
    }

    const indexOffset = windows.filter(w => !w.isTerminal).length;
    const defaultX = window.innerWidth * 0.38 + indexOffset * 35;
    const defaultY = window.innerHeight * 0.18 + indexOffset * 25;

    const newWindow: WindowInstance = {
      id: folder.name,
      name: folder.name,
      slug: folder.slug,
      isLoading: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: nextZ,
      x: defaultX,
      y: defaultY,
      isTerminal: false,
      component: folder.component
    };

    setWindows((prev) => [...prev, newWindow]);

    setTimeout(() => {
      setWindows((prev) =>
        prev.map((w) => (w.id === folder.name ? { ...w, isLoading: false } : w))
      );
    }, 1000);

    return folder.slug;
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    const cleanCmd = terminalInput.trim();
    if (!cleanCmd) return;

    const newLines: TerminalLine[] = [{ text: `preeta@dev:${currentDir}# ${cleanCmd}`, type: "input" }];
    const args = cleanCmd.split(" ");
    const primaryCmd = args[0].toLowerCase();
    const secondaryTarget = args[1];

    switch (primaryCmd) {
      case "help":
        newLines.push({ text: "Available commands: ls, open [folder_name], cd [folder_name], clear, help", type: "output" });
        break;
      case "ls":
        newLines.push({ text: folderData.map(f => f.slug).join("    "), type: "output" });
        break;
      case "clear":
        setTerminalHistory([]);
        setTerminalInput("");
        return;
      case "open":
      case "cd":
        if (!secondaryTarget || secondaryTarget === "~") {
          setCurrentDir("~");
          newLines.push({ text: "Returned to root directory.", type: "output" });
        } else if (secondaryTarget === "..") {
          setCurrentDir("~");
        } else {
          const matchedSlug = triggerOpenWindow(secondaryTarget);
          if (matchedSlug) {
            setCurrentDir(`~/${matchedSlug}`);
            newLines.push({ text: `Mapped to ~/${matchedSlug} and opened browser instance.`, type: "output" });
          } else {
            newLines.push({ text: `bash: ${primaryCmd}: ${secondaryTarget}: No such file or directory.`, type: "error" });
          }
        }
        break;
      default:
        newLines.push({ text: `bash: ${primaryCmd}: command not found. Type 'help' to review available system operations.`, type: "error" });
    }

    setTerminalHistory(prev => [...prev, ...newLines]);
    setTerminalInput("");
  };

  const startDragging = (id: string, e: React.MouseEvent, currentX: number, currentY: number) => {
    if ((e.target as HTMLElement).closest("button") || (e.target as HTMLElement).closest("input")) return;
    handleFocusWindow(id);
    dragInfo.current = { id, startX: e.clientX, startY: e.clientY, currentX, currentY };
  };

  const handleCloseWindow = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWindows((prev) => prev.filter((w) => w.id !== id));
    if (id !== "terminal") setCurrentDir("~");
  };

  const handleMinimizeWindow = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w)));
  };

  const handleToggleMaximize = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w)));
  };

  const handleFocusWindow = (id: string) => {
    const nextZ = globalZIndex + 1;
    setGlobalZIndex(nextZ);
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, zIndex: nextZ } : w)));
  };

  const isDarkMode = theme === "dark";

  return (
    <section 
      className={`w-screen relative overflow-x-hidden transition-colors duration-500 select-none ${
        viewMode === "dev" ? "h-screen bg-[#FAF8F5] dark:bg-[#1E1E24]" : "h-auto"
      }`}
      style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
    >
      
      {/* --- TOP RIGHT CONTROLS PANEL --- */}
      <div className="fixed top-6 right-8 z-[9999] flex items-center gap-3">
        <div className="flex items-center gap-0.5 p-1 rounded-xl bg-zinc-200/60 dark:bg-zinc-800/60 border border-zinc-300/30 dark:border-zinc-700/30 backdrop-blur-sm shadow-sm font-sans text-xs font-bold">
          <button
            onClick={() => setViewMode("dev")}
            className={`px-3 py-1.5 rounded-lg transition-all duration-300 ${
              viewMode === "dev"
                ? "bg-emerald-500 text-white shadow-md"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
            }`}
          >
            Dev Mode
          </button>
          <button
            onClick={() => setViewMode("normal")}
            className={`px-3 py-1.5 rounded-lg transition-all duration-300 ${
              viewMode === "normal"
                ? "bg-purple-600 text-white shadow-md"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
            }`}
          >
            Classic View
          </button>
        </div>

        <button
          onClick={() => setTheme(isDarkMode ? "light" : "dark")}
          className="p-2.5 rounded-lg bg-zinc-200/60 dark:bg-zinc-800/60 border border-zinc-300/30 dark:border-zinc-700/30 hover:scale-105 active:scale-95 text-zinc-700 dark:text-purple-300 transition-all duration-300 shadow-sm"
        >
          <div className="relative w-5 h-5 flex items-center justify-center">
            <Sun className={`w-5 h-5 absolute transition-all duration-500 ease-out transform ${isDarkMode ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}`} />
            <Moon className={`w-5 h-5 absolute transition-all duration-500 ease-out transform ${isDarkMode ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"}`} />
          </div>
        </button>
      </div>

      {/* ─── CONDITIONAL DESKTOP OS MODE LAYOUT ─── */}
      {viewMode === "dev" ? (
        <div className="h-full w-full relative overflow-hidden pb-24 animate-[fadeIn_0.3s_ease-out]">
          <div className="absolute inset-0 p-8 pt-12 flex">
            <div className="flex flex-col gap-6 w-36 items-center z-10 overflow-y-auto max-h-[85vh] no-scrollbar">
              <div 
                onClick={handleOpenTerminal}
                className="text-center group cursor-pointer flex flex-col items-center justify-center w-full mb-2"
              >
                <div className="w-[52px] h-[42px] bg-zinc-800 dark:bg-zinc-900 rounded-lg flex items-center justify-center border border-zinc-700/50 shadow-md transition-all duration-300 group-hover:scale-110 group-hover:rotate-1">
                  <Terminal className="w-5 h-5 text-emerald-400 stroke-[2.5]" />
                </div>
                <p className="text-[12px] mt-2 text-zinc-900 dark:text-zinc-100 font-bold tracking-wide leading-tight">Terminal</p>
              </div>

              {folderData.map((folder) => (
                <div 
                  key={folder.name} 
                  onClick={() => {
                    triggerOpenWindow(folder.slug);
                    setCurrentDir(`~/${folder.slug}`);
                  }}
                  className="text-center group cursor-pointer flex flex-col items-center justify-center w-full"
                >
                  <div className={`w-[52px] h-[38px] relative ${folder.lightBg} ${folder.darkBg} rounded-r-sm rounded-bl-sm transition-all duration-300 group-hover:scale-110 group-hover:rotate-1 shadow-md mt-2`}>
                    <div className={`absolute -top-2 left-0 w-6 h-2.5 ${folder.lightBg} ${folder.darkBg} rounded-t-sm`}></div>
                  </div>
                  <p className="text-[12px] mt-2 text-zinc-800 dark:text-zinc-200 font-medium tracking-wide max-w-[110px] break-words leading-tight">{folder.name}</p>
                </div>
              ))}
            </div>
          </div>

          {windows.map((win) => {
            if (win.isMinimized) return null;

            return win.isTerminal ? (
              <div 
                key={win.id}
                onClick={() => handleFocusWindow(win.id)}
                className={`absolute rounded-lg shadow-2xl border bg-[#1E1E24] border-[#2D2D37] text-[#F1F1F7] flex flex-col font-mono overflow-hidden ${
                  win.isMaximized ? "inset-0 w-full h-full rounded-none top-0 left-0" : "w-[640px] h-[380px]"
                }`}
                style={{
                  zIndex: win.isMaximized ? 5000 : win.zIndex,
                  ...(!win.isMaximized && { left: `${win.x}px`, top: `${win.y}px` })
                }}
              >
                <div 
                  onMouseDown={(e) => startDragging(win.id, e, win.x, win.y)}
                  className={`flex justify-between items-center px-4 py-2 bg-[#2D2D37] border-b border-[#3E3E4F] rounded-t-lg select-none ${win.isMaximized ? "cursor-default" : "cursor-move active:cursor-grabbing"}`}
                >
                  <div className="text-xs text-zinc-300 font-semibold tracking-wide">bash — preeta@dev:{currentDir}</div>
                  <div className="flex items-center gap-1">
                    <button onClick={(e) => handleMinimizeWindow(win.id, e)} className="p-1 rounded hover:bg-zinc-700 text-zinc-400"><Minus className="w-3 h-3 stroke-[2.5]" /></button>
                    <button onClick={(e) => handleToggleMaximize(win.id, e)} className="p-1 rounded hover:bg-zinc-700 text-zinc-400"><Square className="w-2.5 h-2.5 stroke-[2.5]" /></button>
                    <button onClick={(e) => handleCloseWindow(win.id, e)} className="p-1 rounded hover:bg-red-600 hover:text-white text-zinc-400"><X className="w-3 h-3 stroke-[2.5]" /></button>
                  </div>
                </div>
                <div className="p-4 flex-1 overflow-y-auto font-mono text-[13px] leading-relaxed bg-[#141419]" onClick={() => document.getElementById("terminal-hidden-input")?.focus()}>
                  {terminalHistory.map((line, index) => (
                    <div key={index} className={`mb-1 break-words whitespace-pre-wrap ${line.type === "error" ? "text-red-400" : line.type === "input" ? "text-emerald-400 font-semibold" : "text-purple-300 italic"}`}>{line.text}</div>
                  ))}
                  <form onSubmit={handleTerminalSubmit} className="flex items-center mt-2 w-full">
                    <span className="text-emerald-400 font-bold mr-2 select-none">preeta@dev:{currentDir}#</span>
                    <input id="terminal-hidden-input" type="text" value={terminalInput} onChange={(e) => setTerminalInput(e.target.value)} className="flex-1 bg-transparent border-none outline-none text-[#F1F1F7] font-mono caret-purple-400 p-0 focus:ring-0" autoComplete="off" />
                  </form>
                  <div ref={terminalBottomRef} />
                </div>
              </div>
            ) : (
              <div
                key={win.id}
                onClick={() => handleFocusWindow(win.id)}
                className={`absolute rounded-xl shadow-2xl border flex flex-col bg-[#FAF9F6] dark:bg-[#121115] border-zinc-200 dark:border-zinc-800/80 ${
                  win.isMaximized ? "inset-0 w-full h-full rounded-none top-0 left-0" : "w-[740px] h-[500px]"
                }`}
                style={{
                  zIndex: win.isMaximized ? 5000 : win.zIndex,
                  ...(!win.isMaximized && { left: `${win.x}px`, top: `${win.y}px` })
                }}
              >
                <div 
                  onMouseDown={(e) => startDragging(win.id, e, win.x, win.y)}
                  className={`flex items-center pl-4 pr-2 py-2.5 bg-zinc-100 dark:bg-[#1A191E] border-b border-zinc-200 dark:border-zinc-800 rounded-t-xl justify-between select-none gap-4 ${win.isMaximized ? "cursor-default" : "cursor-move active:cursor-grabbing"}`}
                >
                  <div className="flex-1 max-w-[85%] bg-white dark:bg-[#0F0E12] border border-zinc-200/80 dark:border-zinc-800 rounded-md px-3 py-1 text-xs font-sans tracking-wide flex items-center gap-1 select-text truncate shadow-inner">
                    <span className="text-zinc-400 dark:text-zinc-600 select-none">https://</span>
                    <span className="font-semibold text-zinc-700 dark:text-zinc-200">preeta.dev/</span>
                    <span className="text-purple-600 dark:text-purple-400 font-bold">{win.slug}</span>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button onClick={(e) => handleMinimizeWindow(win.id, e)} className="p-1.5 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400"><Minus className="w-3.5 h-3.5 stroke-[2.5]" /></button>
                    <button onClick={(e) => handleToggleMaximize(win.id, e)} className="p-1.5 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400"><Square className="w-3 h-3 stroke-[2.5]" /></button>
                    <button onClick={(e) => handleCloseWindow(win.id, e)} className="p-1.5 rounded hover:bg-red-500 hover:text-white text-zinc-500 dark:text-zinc-400"><X className="w-3.5 h-3.5 stroke-[2.5]" /></button>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto relative bg-white dark:bg-[#0B0A0D]">
                  {win.isLoading ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#FAF9F6] dark:bg-[#121115]">
                      <Loader2 className="w-7 h-7 animate-spin text-purple-600 dark:text-purple-400" />
                      <p className="text-xs font-mono tracking-wider text-zinc-400 dark:text-zinc-500">Resolving assets...</p>
                    </div>
                  ) : (
                    <div className="animate-[fadeIn_0.3s_ease-out] p-1">{win.component}</div>
                  )}
                </div>
              </div>
            );
          })}

          {windows.length > 0 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-zinc-100/90 dark:bg-zinc-900/90 backdrop-blur-xl border border-zinc-200/60 dark:border-zinc-800/60 px-4 py-2 rounded-2xl flex items-center gap-3 shadow-2xl z-[99999] max-w-[90vw] overflow-x-auto">
              {windows.map((win) => (
                <button
                  key={win.id}
                  onClick={() => {
                    const nextZ = globalZIndex + 1;
                    setGlobalZIndex(nextZ);
                    setWindows(windows.map(w => w.id === win.id ? { ...w, isMinimized: false, zIndex: nextZ } : w));
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-2 border ${
                    win.isMinimized 
                      ? "bg-zinc-200/40 dark:bg-zinc-800/40 text-zinc-400 dark:text-zinc-500 border-transparent"
                      : "bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 shadow-sm border-zinc-200 dark:border-zinc-700 scale-105"
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${win.isMinimized ? "bg-zinc-400 dark:bg-zinc-600" : "bg-purple-500"}`}></span>
                  {win.name}
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* ─── CLASSIC VIEW HERO HEADER WITH PROFILE PICTURE & RESUME ─── */
        <div className="w-full max-w-3xl mx-auto px-6 md:px-0 pt-16 pb-4 mb-6 animate-[fadeIn_0.5s_ease-out]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            
            {/* Profile Avatar Image */}
            <img 
              src="/images/profile-pic.webp" // Changed path to target your public subfolder. Update extension to .jpg if needed!
              alt="Anannya Preeta" 
              className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-2 border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 shadow-md flex-shrink-0" 
            />
            
            {/* Content Container */}
            <div className="flex flex-col items-start gap-2">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-none">
                Anannya Preeta
              </h1>
              <p className="text-lg text-purple-600 dark:text-purple-400 font-medium">
                Software Engineer & UI/UX Designer
              </p>
              
              {/* Modern Sleek Resume Button */}
              <a 
                href="/resume.pdf" // Ensure your resume file sits directly inside frontend/public/
                target="_blank" 
                rel="noopener noreferrer" 
                className="mt-1 inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold font-sans tracking-wide border border-zinc-200 dark:border-zinc-800 hover:border-purple-500 dark:hover:border-purple-400 rounded-lg text-zinc-800 dark:text-zinc-200 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 shadow-sm active:scale-95"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="14" 
                  height="14" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="text-purple-500 dark:text-purple-400"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Resume
              </a>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}