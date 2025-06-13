"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import LogoDark from "@/assets/logo/Black Mode.png";
import LogoLight from "@/assets/logo/Light Mode.png";

interface ThemeLogoProps {
  className?: string;
  alt?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

const ThemeLogo = ({ className = "", alt = "Logo", width, height, priority = false }: ThemeLogoProps) => {
  const [currentLogo, setCurrentLogo] = useState(LogoDark);

  // Function to get theme and set logo
  const updateLogoBasedOnTheme = () => {
    if (typeof window !== "undefined") {
      const theme = localStorage.getItem("theme");
      const isDarkMode = theme === "dark" || (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches);

      if (isDarkMode) {
        setCurrentLogo(LogoDark);
      } else {
        setCurrentLogo(LogoLight);
      }
    }
  };

  useEffect(() => {
    // Set initial logo based on theme
    updateLogoBasedOnTheme();

    // Listen for theme changes in localStorage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "theme") {
        updateLogoBasedOnTheme();
      }
    };

    // Listen for custom theme change events
    const handleThemeChange = () => {
      updateLogoBasedOnTheme();
    };

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleMediaQueryChange = () => {
      updateLogoBasedOnTheme();
    };

    // Add event listeners
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("themeChange", handleThemeChange);
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Cleanup
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("themeChange", handleThemeChange);
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return <Image src={currentLogo} alt={alt} className={className} width={width} height={height} priority={priority} />;
};

export default ThemeLogo;
