"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, User, Search, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const MainHeader = () => {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/");
    setOpen(false);
  };

  return (
    <>
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
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
                fill
                className="object-cover rounded-xl transition-opacity duration-300"
                sizes="40px"
              />
            </div>
            <span className="text-2xl font-bold bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent tracking-wide">
              SOCIGO
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-gray-700 font-bold">
            <Link
              href="/services"
              className="relative group hover:text-gray-900 transition-colors"
            >
              Dịch vụ
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/posts"
              className="relative group hover:text-gray-900 transition-colors"
            >
              Mạng xã hội
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/profile"
              className="relative group hover:text-gray-900 transition-colors"
            >
              Hồ sơ
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <button
              aria-label="Tìm kiếm"
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Search size={20} className="text-gray-800" />
            </button>

            {/* Auth */}
            {loading ? (
              <span className="text-sm text-gray-500">Đang tải...</span>
            ) : user ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/profile"
                  className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-1.5 transition-all"
                >
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
            ) : (<>
              <Link
                href="/login?modal=true"
                className="text-sm font-semibold bg-linear-to-r from-gray-900 to-gray-700 text-white px-5 py-2.5 rounded-full hover:shadow-2xl hover:shadow-gray-500/40 transition-all transform hover:scale-105"
              >
                Đăng nhập
              </Link>
              <Link
                href="/signup?signup=true"
                className="text-sm font-semibold bg-linear-to-r from-gray-900 to-gray-700 text-white px-5 py-2.5 rounded-full hover:shadow-2xl hover:shadow-gray-500/40 transition-all transform hover:scale-105"
              >
                Đăng ký
              </Link>
            </>
            )}

            {/* Mobile Menu Button */}
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
        className={`fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white border-l border-gray-200 shadow-xl transition-transform duration-300 ease-in-out md:hidden ${open ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <span className="font-semibold text-lg text-gray-900">Menu</span>
          <button
            onClick={() => setOpen(false)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex flex-col p-6 text-gray-800">
          <Link
            href="/services"
            onClick={() => setOpen(false)}
            className="py-3 text-sm font-medium hover:text-gray-900"
          >
            Dịch vụ
          </Link>
          <Link
            href="/posts"
            onClick={() => setOpen(false)}
            className="py-3 text-sm font-medium hover:text-gray-900"
          >
            Mạng xã hội
          </Link>
          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="py-3 text-sm font-medium hover:text-gray-900"
          >
            Hồ sơ
          </Link>

          <div className="border-t border-gray-200 mt-4 pt-4">
            {user ? (
              <button
                onClick={handleLogout}
                className="text-left w-full py-3 text-sm font-medium text-red-600 hover:bg-gray-100 rounded-lg"
              >
                Đăng xuất
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="block py-3 text-sm font-medium hover:text-gray-900"
              >
                Đăng nhập
              </Link>
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
