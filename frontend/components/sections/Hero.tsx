"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, X, Minus, Square, Loader2 } from "lucide-react";

// ─── IMPORTING YOUR ACTUAL SECTIONS ───
import About from "./About";
import Experience from "./Experience";
import Education from "./Education";
import Projects from "./Projects";
import BlogPreview from "./BlogPreview";
import Contact from "./Contact";

const oldCommands = [
  { cmd: "git init", output: "Initialized empty Git repository" },
  { cmd: "git add .", output: "" },
  { cmd: 'git commit -m "Initial portfolio setup"', output: "[main] Initial commit" },
  { cmd: "git push origin main", output: "Everything up-to-date" }
];

const message = "Hello, this is Anannya Preeta";

const folderData = [
  { name: "About Me", slug: "about-me", lightBg: "bg-[#8B739E]", darkBg: "dark:bg-[#523E63]", component: <About /> },
  { name: "Work Experience", slug: "work-experience", lightBg: "bg-[#655573]", darkBg: "dark:bg-[#342B3E]", component: <Experience /> },
  { name: "Education", slug: "education", lightBg: "bg-[#7A6B88]", darkBg: "dark:bg-[#433A4F]", component: <Education /> },
  { name: "Projects", slug: "projects", lightBg: "bg-[#9A8AA6]", darkBg: "dark:bg-[#5E526B]", component: <Projects /> },
  { name: "Blogs", slug: "blogs", lightBg: "bg-[#544F7C]", darkBg: "dark:bg-[#2B274F]", component: <BlogPreview /> },
  { name: "Contact Me", slug: "contact-me", lightBg: "bg-[#3D3B63]", darkBg: "dark:bg-[#1E1D3B]", component: <Contact /> }
];

interface ActiveWindow {
  id: string;
  name: string;
  slug: string;
  isLoading: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  component: React.ReactNode;
}

export default function Hero() {
  const [typed, setTyped] = useState("");
  const { theme, setTheme } = useTheme();
  const [windows, setWindows] = useState<ActiveWindow[]>([]);
  const [globalZIndex, setGlobalZIndex] = useState(10);

  useEffect(() => {
    let currentLength = 0;
    const timer = setInterval(() => {
      if (currentLength < message.length) {
        setTyped(message.slice(0, currentLength + 1));
        currentLength++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const handleOpenFolder = (folder: typeof folderData[0]) => {
    const exists = windows.find((w) => w.id === folder.name);
    const nextZ = globalZIndex + 1;
    setGlobalZIndex(nextZ);

    if (exists) {
      setWindows(windows.map(w => w.id === folder.name ? { ...w, isMinimized: false, zIndex: nextZ } : w));
      return;
    }

    const newWindow: ActiveWindow = {
      id: folder.name,
      name: folder.name,
      slug: folder.slug,
      isLoading: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: nextZ,
      component: folder.component
    };

    setWindows((prev) => [...prev, newWindow]);

    setTimeout(() => {
      setWindows((prev) =>
        prev.map((w) => (w.id === folder.name ? { ...w, isLoading: false } : w))
      );
    }, 3000);
  };

  const handleCloseWindow = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWindows((prev) => prev.filter((w) => w.id !== id));
  };

  const handleMinimizeWindow = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
    );
  };

  const handleToggleMaximize = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w))
    );
  };

  const handleFocusWindow = (id: string) => {
    const nextZ = globalZIndex + 1;
    setGlobalZIndex(nextZ);
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, zIndex: nextZ } : w))
    );
  };

  const isDarkMode = theme === "dark";

  return (
    <section 
      className="h-screen w-screen relative overflow-hidden bg-[#FAF8F5] dark:bg-[#1E1E24] transition-colors duration-500 select-none pb-24"
      style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
    >
      
      {/* --- THEME TOGGLE BUTTON --- */}
      <div className="absolute top-6 right-8 z-50">
        <button
          onClick={() => setTheme(isDarkMode ? "light" : "dark")}
          className="p-2.5 rounded-lg bg-zinc-200/60 dark:bg-zinc-800/60 border border-zinc-300/30 dark:border-zinc-700/30 hover:scale-105 active:scale-95 text-zinc-700 dark:text-purple-300 transition-all duration-300"
          aria-label="Toggle Theme"
        >
          <div className="relative w-5 h-5 flex items-center justify-center">
            <Sun className={`w-5 h-5 absolute transition-all duration-500 ease-out transform ${
              isDarkMode ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
            }`} />
            <Moon className={`w-5 h-5 absolute transition-all duration-500 ease-out transform ${
              isDarkMode ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
            }`} />
          </div>
        </button>
      </div>

      {/* --- DESKTOP ENVIRONMENT (LEFT SIDE BAR) --- */}
      <div className="absolute inset-0 p-8 pt-12 flex">
        <div className="flex flex-col gap-9 w-36 items-center z-10">
          {folderData.map((folder) => (
            <div 
              key={folder.name} 
              onClick={() => handleOpenFolder(folder)}
              className="text-center group cursor-pointer flex flex-col items-center justify-center w-full"
            >
              <div className={`w-[52px] h-[38px] relative ${folder.lightBg} ${folder.darkBg} rounded-r-sm rounded-bl-sm transition-all duration-300 group-hover:scale-110 group-hover:rotate-1 shadow-md mt-2`}>
                <div className={`absolute -top-2 left-0 w-6 h-2.5 ${folder.lightBg} ${folder.darkBg} rounded-t-sm`}></div>
              </div>
              
              <p className="text-[13px] mt-2.5 text-zinc-800 dark:text-zinc-200 font-medium tracking-wide max-w-[110px] break-words leading-tight transition-colors duration-300">
                {folder.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* --- CENTERED MAC OS TERMINAL BACKSTAGE --- */}
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] rounded-xl shadow-2xl transition-all duration-500 border bg-[#F3EFE9] border-[#E6DFD5] text-[#4A354F] dark:bg-[#16141A] dark:border-[#26212E] dark:text-[#E2DBE5]"
        style={{ zIndex: 5 }}
      >
        <div className="flex gap-2 p-3.5 border-b bg-[#EDE7DD] border-[#E1D8CC] dark:bg-[#1C1822] dark:border-[#2B2535] rounded-t-xl items-center">
          <span className="w-3 h-3 rounded-full bg-[#FF5F56] opacity-90 inline-block"></span>
          <span className="w-3 h-3 rounded-full bg-[#FFBD2E] opacity-90 inline-block"></span>
          <span className="w-3 h-3 rounded-full bg-[#27C93F] opacity-90 inline-block"></span>
          <div className="mx-auto text-xs font-mono opacity-40 pr-10 tracking-widest">bash</div>
        </div>

        <div className="p-6 font-mono text-[13px] leading-relaxed">
          {oldCommands.map((item, index) => (
            <div key={index} className="mb-3">
              <p>
                <span className="text-[#A2426B] dark:text-[#C57BA0] font-bold">$</span>{" "}
                <span className="font-semibold">{item.cmd}</span>
              </p>
              {item.output && (
                <p className="opacity-60 mt-0.5 pl-4 text-xs italic tracking-wide">
                  {item.output}
                </p>
              )}
            </div>
          ))}

          <div className="mt-5 flex items-center flex-wrap">
            <span className="text-[#A2426B] dark:text-[#C57BA0] font-bold mr-2">$</span>
            <span className="font-semibold text-[#3A2242] dark:text-[#E9DEED]">
              {typed}
              <span className="animate-pulse text-[#A2426B] dark:text-[#C57BA0] ml-0.5 font-bold">▌</span>
            </span>
          </div>
        </div>
      </div>

      {/* --- STANDARD WEB BROWSER INTERFACE INSTANCES --- */}
      {windows.map((win, idx) => (
        <div
          key={win.id}
          onClick={() => handleFocusWindow(win.id)}
          className={`absolute rounded-xl shadow-2xl border flex flex-col bg-[#FAF9F6] dark:bg-[#121115] border-zinc-200 dark:border-zinc-800/80 transition-all duration-300 ease-out ${
            win.isMinimized ? "scale-75 opacity-0 pointer-events-none invisible" : "scale-100 opacity-100 visible"
          } ${
            win.isMaximized 
              ? "inset-0 w-full h-full rounded-none top-0 left-0 z-[5000]" 
              : "w-[740px] h-[500px]"
          }`}
          style={{
            zIndex: win.isMaximized ? 5000 : win.zIndex,
            ...(!win.isMaximized && {
              left: `calc(38% + ${idx * 35}px)`,
              top: `calc(15% + ${idx * 30}px)`
            })
          }}
        >
          {/* Authentic Top-Navigation Browser Header Controls Frame */}
          <div className="flex items-center pl-4 pr-2 py-2.5 bg-zinc-100 dark:bg-[#1A191E] border-b border-zinc-200 dark:border-zinc-800 rounded-t-xl justify-between select-none gap-4">
            
            {/* Left & Middle Domain Route Field */}
            <div className="flex-1 max-w-[80%] bg-white dark:bg-[#0F0E12] border border-zinc-200/80 dark:border-zinc-800 rounded-md px-3 py-1 text-xs font-sans tracking-wide flex items-center gap-1 select-text truncate shadow-inner">
              <span className="text-zinc-400 dark:text-zinc-600 select-none">https://</span>
              <span className="font-semibold text-zinc-700 dark:text-zinc-200">preeta.dev/</span>
              <span className="text-purple-600 dark:text-purple-400 font-bold">{win.slug}</span>
            </div>

            {/* UPPER RIGHT SIDE: Standard Browser Action Buttons */}
            <div className="flex items-center gap-1 flex-shrink-0">
              {/* Minimize Icon */}
              <button
                onClick={(e) => handleMinimizeWindow(win.id, e)}
                className="p-1.5 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 active:scale-95 transition-all"
                title="Minimize Window"
              >
                <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>

              {/* Maximize Icon */}
              <button
                onClick={(e) => handleToggleMaximize(win.id, e)}
                className="p-1.5 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 active:scale-95 transition-all"
                title={win.isMaximized ? "Restore Size" : "Maximize Fullscreen"}
              >
                <Square className="w-3 h-3 stroke-[2.5]" />
              </button>

              {/* Close Icon */}
              <button 
                onClick={(e) => handleCloseWindow(win.id, e)} 
                className="p-1.5 rounded hover:bg-red-500 hover:text-white text-zinc-500 dark:text-zinc-400 active:scale-95 transition-all"
                title="Close Browser"
              >
                <X className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Web View Canvas Content Frame */}
          <div className="flex-1 overflow-y-auto relative bg-white dark:bg-[#0B0A0D]">
            {win.isLoading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#FAF9F6] dark:bg-[#121115]">
                <Loader2 className="w-7 h-7 animate-spin text-purple-600 dark:text-purple-400" />
                <p className="text-xs font-mono tracking-wider text-zinc-400 dark:text-zinc-500">Resolving target assets...</p>
              </div>
            ) : (
              <div className="animate-[fadeIn_0.3s_ease-out] p-1">
                {win.component}
              </div>
            )}
          </div>
        </div>
      ))}

      {/* --- DESKTOP CENTER BOTTOM TAB TASKBAR DOCK --- */}
      {windows.length > 0 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-zinc-100/90 dark:bg-zinc-900/90 backdrop-blur-xl border border-zinc-200/60 dark:border-zinc-800/60 px-4 py-2 rounded-2xl flex items-center gap-3 shadow-2xl z-[99999] max-w-[90vw] overflow-x-auto animate-[fadeIn_0.25s_ease-out]">
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
                  ? "bg-zinc-200/40 dark:bg-zinc-800/40 text-zinc-400 dark:text-zinc-500 border-transparent hover:bg-zinc-200/70 dark:hover:bg-zinc-800/70"
                  : "bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 shadow-sm border-zinc-200 dark:border-zinc-700 scale-105"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${win.isMinimized ? "bg-zinc-400 dark:bg-zinc-600" : "bg-purple-500"}`}></span>
              {win.name}
              {win.isMaximized && <span className="text-[9px] px-1 bg-purple-100 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300 rounded-sm font-sans scale-90">MAX</span>}
            </button>
          ))}
        </div>
      )}

    </section>
  );
}