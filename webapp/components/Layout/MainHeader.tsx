"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, User, Search, LogOut, Globe } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const MainHeader = () => {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // 🔤 Language
  const [language, setLanguage] = useState("vi");
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  // 🔍 Search
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Fetch search suggestions
  useEffect(() => {
    const fetchResults = async () => {
      if (query.trim().length < 2) {
        setResults([]);
        return;
      }
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data.results || []);
    };
    const timeout = setTimeout(fetchResults, 400);
    return () => clearTimeout(timeout);
  }, [query]);

  // ✅ Handle clicks outside dropdowns
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setShowResults(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/");
    setOpen(false);
  };

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem("lang", lang);
    setLangOpen(false);
  };

  useEffect(() => {
    const savedLang = localStorage.getItem("lang");
    if (savedLang) setLanguage(savedLang);
  }, []);

  return (
    <>
      {/* Header */}
      <header
        className={`sticky top-0 left-0  right-0 z-50 transition-all duration-500 ${scrolled
          ? "bg-white backdrop-blur-xl shadow-lg py-5"
          : "bg-white py-5"
          }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group select-none cursor-pointer"
          >
            <div className="relative w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center transform group-hover:rotate-12 transition-all duration-300">
              <Image
                src="/logo.png"
                alt="SOCIGO Logo"
                width={36}
                height={36}
                className="rounded-xl"
              />
            </div>
            <span className="text-2xl font-bold bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent tracking-wide">
              SOCIGO
            </span>
          </Link>

          {/* Search */}
          <div ref={searchRef} className="hidden md:flex flex-col items-center w-1/3 relative">
            <div className="w-full flex items-center bg-gray-100 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-gray-400 transition-all">
              <Search size={18} className="text-gray-600" />
              <input
                type="text"
                placeholder={language === "vi" ? "Tìm kiếm..." : "Search..."}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShowResults(true);
                }}
                className="w-full bg-transparent outline-none text-sm ml-2"
              />
            </div>
            {showResults && results.length > 0 && (
              <div className="absolute top-12 w-full bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
                {results.map((item, i) => (
                  <Link
                    key={i}
                    href={`/item/${item.id}`}
                    className="block px-4 py-2 hover:bg-gray-100 text-sm text-gray-800"
                    onClick={() => {
                      setQuery("");
                      setShowResults(false);
                    }}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-gray-700 font-bold">
            <Link href="/services" className="relative group hover:text-gray-900 transition-colors">
              Dịch vụ
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/posts" className="relative group hover:text-gray-900 transition-colors">
              Mạng xã hội
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/profile" className="relative group hover:text-gray-900 transition-colors">
              Hồ sơ
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Auth */}
            {loading ? (
              <span className="text-sm text-gray-500">Đang tải...</span>
            ) : user ? (
              <div className="flex items-center gap-2">
                <Link href="/profile" className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-1.5 transition-all">
                  <User size={18} className="text-gray-800" />
                  <span className="hidden sm:inline text-sm font-medium text-gray-800">
                    {user.name.split(" ")[0]}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  aria-label="Đăng xuất"
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <LogOut size={18} className="text-gray-800" />
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/login?modal=true"
                  className="hidden md:inline-block text-sm font-semibold bg-linear-to-r from-gray-900 to-gray-700 text-white px-5 py-2.5 rounded-full hover:scale-105 transition-all"
                >
                  Đăng nhập
                </Link>
                <Link
                  href="/signup?signup=true"
                  className="hidden md:inline-block text-sm font-semibold bg-linear-to-r from-gray-900 to-gray-700 text-white px-5 py-2.5 rounded-full hover:scale-105 transition-all"
                >
                  Đăng ký
                </Link>
              </>
            )}

            {/* 🌐 Language */}
            <div ref={langRef} className="relative">
              <button onClick={() => setLangOpen(!langOpen)} className="p-2 rounded-full hover:bg-gray-100 transition-colors flex items-center gap-1">
                <Globe size={18} className="text-gray-700" />
                <span className="text-sm font-medium">{language.toUpperCase()}</span>
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-2 bg-white shadow-md rounded-lg border border-gray-200 w-28 overflow-hidden z-50">
                  <button onClick={() => handleLanguageChange("vi")} className={`block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 ${language === "vi" ? "font-semibold text-gray-900" : "text-gray-700"}`}>
                    🇻🇳 Tiếng Việt
                  </button>
                  <button onClick={() => handleLanguageChange("en")} className={`block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 ${language === "en" ? "font-semibold text-gray-900" : "text-gray-700"}`}>
                    🇺🇸 English
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
              onClick={() => setOpen(!open)}
              aria-label="Menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed z-10 top-0 right-0 h-full w-4/5 max-w-sm bg-white border-l border-gray-200 shadow-xl transition-transform duration-300 ease-in-out md:hidden ${open ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <span className="font-semibold text-lg text-gray-900">Menu</span>
          <button onClick={() => setOpen(false)} className="p-2 rounded-full hover:bg-gray-100">
            <X size={22} />
          </button>
        </div>

        <nav className="flex flex-col p-6 text-gray-800">
          <Link href="/services" onClick={() => setOpen(false)} className="py-3 text-sm font-medium hover:text-gray-900">
            Dịch vụ
          </Link>
          <Link href="/posts" onClick={() => setOpen(false)} className="py-3 text-sm font-medium hover:text-gray-900">
            Mạng xã hội
          </Link>
          <Link href="/profile" onClick={() => setOpen(false)} className="py-3 text-sm font-medium hover:text-gray-900">
            Hồ sơ
          </Link>

          <div className="border-t border-gray-200 mt-4 pt-4">
            {user ? (
              <button onClick={handleLogout} className="text-left w-full py-3 text-sm font-medium text-red-600 hover:bg-gray-100 rounded-lg">
                Đăng xuất
              </button>
            ) : (
              <div className="flex flex-col gap-3 mt-3">
                <Link href="/login?modal=true" onClick={() => setOpen(false)} className="block w-full text-center font-semibold bg-linear-to-r from-gray-900 to-gray-700 text-white py-2.5 rounded-full hover:scale-105 transition-all">
                  Đăng nhập
                </Link>
                <Link href="/signup?signup=true" onClick={() => setOpen(false)} className="block w-full text-center font-semibold bg-white text-gray-800 border border-gray-300 py-2.5 rounded-full hover:bg-gray-100 transition-all">
                  Đăng ký
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default MainHeader;
