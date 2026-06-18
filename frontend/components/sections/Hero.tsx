"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

const oldCommands = [
  { cmd: "git init", output: "Initialized empty Git repository" },
  { cmd: "git add .", output: "" },
  { cmd: 'git commit -m "Initial portfolio setup"', output: "[main] Initial commit" },
  { cmd: "git push origin main", output: "Everything up-to-date" }
];

const message = "Hello, this is Anannya Preeta";

const folderData = [
  { name: "Projects", lightBg: "bg-[#9A8AA6]", darkBg: "dark:bg-[#5E526B]" },
  { name: "Education", lightBg: "bg-[#7A6B88]", darkBg: "dark:bg-[#433A4F]" },
  { name: "Work Experience", lightBg: "bg-[#655573]", darkBg: "dark:bg-[#342B3E]" },
  { name: "About Me", lightBg: "bg-[#8B739E]", darkBg: "dark:bg-[#523E63]" },
  { name: "Blogs", lightBg: "bg-[#544F7C]", darkBg: "dark:bg-[#2B274F]" },
  { name: "Contact Me", lightBg: "bg-[#3D3B63]", darkBg: "dark:bg-[#1E1D3B]" }
];

export default function Hero() {
  const [typed, setTyped] = useState("");
  const { theme, setTheme } = useTheme();

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

  const isDarkMode = theme === "dark";

  return (
    <section 
      className="h-screen relative overflow-hidden bg-[#FAF8F5] dark:bg-[#1E1E24] transition-colors duration-500"
      style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
    >
      
      {/* --- ICON ONLY THEME TOGGLE BUTTON --- */}
      <div className="absolute top-6 right-8 z-50">
        <button
          onClick={() => setTheme(isDarkMode ? "light" : "dark")}
          className="p-2.5 rounded-lg bg-zinc-200/60 dark:bg-zinc-800/60 border border-zinc-300/30 dark:border-zinc-700/30 hover:scale-105 active:scale-95 text-zinc-700 dark:text-purple-300 transition-all duration-300 relative overflow-hidden"
          aria-label="Toggle Theme"
        >
          <div className="relative w-5 h-5 flex items-center justify-center">
            {/* Sun Icon */}
            <Sun className={`w-5 h-5 absolute transition-all duration-500 ease-out transform ${
              isDarkMode ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
            }`} />
            
            {/* Moon Icon */}
            <Moon className={`w-5 h-5 absolute transition-all duration-500 ease-out transform ${
              isDarkMode ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
            }`} />
          </div>
        </button>
      </div>

      {/* --- DESKTOP ENVIRONMENT --- */}
      <div className="absolute inset-0 p-8 pt-12 flex">
        {/* Increased gap from gap-6 to gap-9 for wider vertical separation */}
        <div className="flex flex-col gap-9 w-36 items-center z-10">
          {folderData.map((folder) => (
            <div key={folder.name} className="text-center group cursor-pointer flex flex-col items-center justify-center w-full">
              
              {/* Scaled folder size from w-11 h-8 to w-[52px] h-[38px] */}
              <div className={`w-[52px] h-[38px] relative ${folder.lightBg} ${folder.darkBg} rounded-r-sm rounded-bl-sm transition-all duration-300 group-hover:scale-110 group-hover:rotate-1 shadow-md mt-2`}>
                {/* Scaled folder tab asset relative to new dimensions */}
                <div className={`absolute -top-2 left-0 w-6 h-2.5 ${folder.lightBg} ${folder.darkBg} rounded-t-sm clip-folder-tab`}></div>
              </div>
              
              {/* Font size safely bumped up by +2px (from 11px to 13px) and maximum text width widened to match scaling */}
              <p 
                className="text-[13px] mt-2.5 text-zinc-800 dark:text-zinc-200 font-medium tracking-wide max-w-[110px] break-words leading-tight transition-colors duration-300"
                style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
              >
                {folder.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* --- TERMINAL WINDOW --- */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] rounded-xl shadow-2xl transition-all duration-500 border bg-[#F3EFE9] border-[#E6DFD5] text-[#4A354F] dark:bg-[#16141A] dark:border-[#26212E] dark:text-[#E2DBE5]">
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
                <p 
                  className="opacity-60 mt-0.5 pl-4 text-xs italic tracking-wide"
                  style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
                >
                  {item.output}
                </p>
              )}
            </div>
          ))}

          {/* Typing Line */}
          <div className="mt-5 flex items-center flex-wrap">
            <span className="text-[#A2426B] dark:text-[#C57BA0] font-bold mr-2">$</span>
            <span className="font-semibold text-[#3A2242] dark:text-[#E9DEED]">
              {typed}
              <span className="animate-pulse text-[#A2426B] dark:text-[#C57BA0] ml-0.5 font-bold">▌</span>
            </span>
          </div>
        </div>
      </div>

    </section>
  );
}