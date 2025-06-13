"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, Clock, Megaphone, Heart, Sparkles, ArrowRight } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useState, useEffect } from "react";
import ThemeLogo from "@/components/theme-logo"; // Import komponen baru

const navLinks = [
  {
    href: "/",
    label: "Home",
    icon: Home,
    description: "Kembali ke beranda utama",
    illustration: "🏡",
    illustrationTitle: "Rumah Ibadah",
    illustrationDesc: "Tempat berkumpul dan beribadah bersama dalam kedamaian dan kekhusyukan.",
  },
  {
    href: "/schedule",
    label: "Jadwal Sholat",
    icon: Clock,
    description: "Lihat waktu sholat hari ini",
    illustration: "🕌",
    illustrationTitle: "Waktu Sholat",
    illustrationDesc: "Lima waktu sholat yang menjadi panduan harian umat Muslim dalam beribadah.",
  },
  {
    href: "/announcements",
    label: "Pengumuman",
    icon: Megaphone,
    description: "Informasi terbaru dari masjid",
    illustration: "📢",
    illustrationTitle: "Informasi Terkini",
    illustrationDesc: "Dapatkan berita dan pengumuman penting dari kegiatan masjid terbaru.",
  },
  {
    href: "/donate",
    label: "Donasi",
    icon: Heart,
    description: "Berpartisipasi dalam kebaikan",
    illustration: "💝",
    illustrationTitle: "Berbagi Kebaikan",
    illustrationDesc: "Berpartisipasi dalam membangun dan memelihara rumah Allah bersama-sama.",
  },
];

const AppHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget?.getBoundingClientRect();
    if (rect) {
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <>
      {/* Modern Menu Button */}
      <div className="fixed bottom-4 right-4 md:top-6 md:right-6 z-[100]">
        <Button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`
            w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl border-0 transition-all duration-300 ease-out
            ${
              isMenuOpen
                ? "bg-slate-900/90 dark:bg-slate-100/90 backdrop-blur-sm shadow-lg"
                : "bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-sm hover:shadow-md"
            }
            hover:scale-105 active:scale-95
          `}
        >
          <div className={`transition-all duration-300 ${isMenuOpen ? "rotate-180" : "rotate-0"}`}>
            {isMenuOpen ? (
              <X className="w-4 h-4 md:w-5 md:h-5 text-white dark:text-slate-900" />
            ) : (
              <Menu className="w-4 h-4 md:w-5 md:h-5 text-slate-900 dark:text-white" />
            )}
          </div>
        </Button>
      </div>

      {/* Modern Full Screen Overlay */}
      <div
        className={`
          fixed inset-0 z-[90] transition-all duration-500 ease-out
          ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      >
        {/* Clean Background with Subtle Gradient */}
        <div
          className={`
            absolute inset-0 transition-all duration-700 ease-out
            ${isMenuOpen ? "translate-y-0" : "-translate-y-full"}
            bg-white dark:bg-black
          `}
          onMouseMove={handleMouseMove}
        />

        {/* Subtle Overlay Pattern */}
        <div
          className={`
            absolute inset-0 opacity-30 transition-all duration-700 ease-out
            ${isMenuOpen ? "opacity-30" : "opacity-0"}
          `}
          style={{
            backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
              rgba(100, 116, 139, 0.05) 0%, 
              transparent 50%)`,
          }}
        />

        {/* Menu Content Container */}
        <div className="max-w-[1080px] mx-auto relative z-10 h-full p-[30%_0_60px] md:p-0 md:flex">
          {/* Left Side - Navigation */}
          <div className="flex-1 flex flex-col justify-center px-3 md:pl-16 md:pr-8">
            {/* Navigation Links - Left Aligned */}
            <div className="space-y-4 max-w-xl">
              {navLinks.map((link, index) => (
                <div
                  key={link.href}
                  className={`
                    transition-all duration-700 ease-out
                    ${isMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"}
                  `}
                  style={{ transitionDelay: `${300 + index * 150}ms` }}
                  onMouseEnter={() => setHoveredItem(index)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Link href={link.href} onClick={() => setIsMenuOpen(false)}>
                    <div
                      className={`
                        relative group p-3 md:p-6 rounded-2xl transition-all duration-300 ease-out cursor-pointer
                        border border-slate-200/50 dark:border-slate-700/50
                        ${
                          hoveredItem === index
                            ? "bg-slate-900 dark:bg-white shadow-lg border-slate-900 dark:border-white transform translate-x-2"
                            : "bg-white/60 dark:bg-slate-800/60 hover:bg-white/80 dark:hover:bg-slate-800/80 shadow-sm hover:shadow-md"
                        }
                      `}
                    >
                      {/* Content */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          {/* Simple Icon Container */}
                          <div
                            className={`
                              w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300
                              ${
                                hoveredItem === index ? "bg-white/20 scale-110" : "bg-slate-100/80 dark:bg-slate-700/60"
                              }
                            `}
                          >
                            <link.icon
                              className={`
                                w-6 h-6 transition-all duration-300
                                ${
                                  hoveredItem === index
                                    ? "text-white dark:text-slate-900"
                                    : "text-slate-600 dark:text-slate-300"
                                }
                              `}
                            />
                          </div>

                          <div>
                            <h3
                              className={`
                                text-xl md:text-2xl font-semibold transition-all duration-300
                                ${
                                  hoveredItem === index
                                    ? "text-white dark:text-slate-900"
                                    : "text-slate-900 dark:text-white"
                                }
                              `}
                            >
                              {link.label}
                            </h3>
                            <p
                              className={`
                                text-sm mt-1 transition-all duration-300
                                ${
                                  hoveredItem === index
                                    ? "text-white/70 dark:text-slate-900/70"
                                    : "text-slate-500 dark:text-slate-400"
                                }
                              `}
                            >
                              {link.description}
                            </p>
                          </div>
                        </div>

                        {/* Arrow */}
                        <div
                          className={`
                            transition-all duration-300
                            ${hoveredItem === index ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}
                          `}
                        >
                          <ArrowRight
                            className={`
                              w-5 h-5 
                              ${hoveredItem === index ? "text-white dark:text-slate-900" : "text-slate-400"}
                            `}
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* Theme Toggle Section */}
            <div
              className={`
                mt-8 transition-all duration-700 ease-out
                ${isMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"}
              `}
              style={{ transitionDelay: "700ms" }}
            >
              <div className="mx-auto bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-4 w-fit shadow-sm">
                <ThemeToggle />
              </div>
            </div>
          </div>

          {/* Right Side - Illustration Area */}
          <div className="hidden md:flex md:flex-1 items-center justify-center relative">
            {/* Default Illustration when nothing is hovered */}
            <div
              className={`
                absolute inset-0 flex items-center justify-center transition-all ease-out
                ${
                  isMenuOpen && hoveredItem === null
                    ? "opacity-100 scale-100 duration-500 delay-1000"
                    : "opacity-0 scale-95 duration-200 delay-0"
                }
              `}
            >
              <ThemeLogo className="w-[60%] mx-auto mb-[20%] animate-pulse" alt="Masjid Logo" priority={true} />
            </div>

            {/* Hover Illustrations */}
            {navLinks.map((link, index) => (
              <div
                key={`illustration-${index}`}
                className={`
                  absolute inset-0 flex items-center justify-center transition-all ease-out
                  ${
                    hoveredItem === index
                      ? "opacity-100 scale-100 duration-400 delay-100"
                      : "opacity-0 scale-90 duration-200 delay-0"
                  }
                `}
              >
                <div className="text-center max-w-md px-8">
                  {/* Large Emoji Illustration */}
                  <div className="mb-8">
                    <div className="text-8xl mb-4 animate-pulse">{link.illustration}</div>
                    <div className="w-20 h-1 bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent mx-auto rounded-full" />
                  </div>

                  {/* Title and Description */}
                  <div className="space-y-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                      {link.illustrationTitle}
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed">
                      {link.illustrationDesc}
                    </p>
                  </div>

                  {/* Decorative Elements */}
                  <div className="mt-8 flex items-center justify-center space-x-2">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600 animate-pulse"
                        style={{
                          animationDelay: `${i * 0.2}s`,
                          animationDuration: "1.5s",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Decoration */}
        <div
          className={`
            absolute w-full bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2
            transition-all duration-700 ease-out
            ${isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}
          `}
          style={{ transitionDelay: "800ms" }}
        >
          <div className="flex justify-center items-center space-x-2 md:space-x-4 text-slate-400 dark:text-slate-500">
            <div className="w-6 md:w-12 h-px bg-gradient-to-r from-transparent to-slate-300 dark:to-slate-600" />
            <span className="text-[10px] md:text-xs font-light tracking-wider uppercase">Explore • Discover</span>
            <div className="w-6 md:w-12 h-px bg-gradient-to-l from-transparent to-slate-300 dark:to-slate-600" />
          </div>
        </div>
      </div>
    </>
  );
};

export default AppHeader;
