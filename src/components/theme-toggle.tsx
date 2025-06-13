"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Switch } from "@/components/ui/switch";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a placeholder or null to avoid server-client mismatch during hydration
    return (
      <div className="flex items-center space-x-2 h-10">
        <Sun className="h-[1.2rem] w-[1.2rem]" />
        <div className="w-11 h-6 bg-muted rounded-full"></div>
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      </div>
    );
  }

  const isDarkMode = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

  return (
    <div className="flex items-center space-x-2">
      <Sun
        className={`h-[1.2rem] w-[1.2rem] transition-colors ${isDarkMode ? "text-muted-foreground" : "text-primary"}`}
      />
      <Switch id="theme-toggle-switch" checked={isDarkMode} onCheckedChange={toggleTheme} aria-label="Toggle theme" />
      <Moon
        className={`h-[1.2rem] w-[1.2rem] transition-colors ${isDarkMode ? "text-primary" : "text-muted-foreground"}`}
      />
    </div>
  );
}
