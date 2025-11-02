"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, User, Search, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const MainHeader = () => {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/");
    setOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-neutral-200 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-3">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-bold text-neutral-900"
        >
          <div className="relative h-8 w-8">
            <Image
              src="/logo.png"
              alt="Socigo"
              fill
              className="object-contain"
              sizes="32px"
            />
          </div>
          <span className="tracking-tight hover:opacity-80 transition-opacity">
            socigo
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-700">
          <Link href="/services" className="hover:text-black transition-colors">
            Dịch vụ
          </Link>
          <Link href="/posts" className="hover:text-black transition-colors">
            Mạng xã hội
          </Link>
          <Link href="/profile" className="hover:text-black transition-colors">
            Hồ sơ
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <button
            aria-label="Tìm kiếm"
            className="p-2 rounded-full hover:bg-neutral-100 transition-colors"
          >
            <Search size={20} className="text-neutral-800" />
          </button>

          {/* Auth */}
          {loading ? (
            <span className="text-sm text-neutral-500">Đang tải...</span>
          ) : user ? (
            <div className="flex items-center gap-2">
              <Link
                href="/profile"
                className="flex items-center gap-2 bg-neutral-100 hover:bg-neutral-200 rounded-full px-3 py-1.5 transition-all"
              >
                <User size={18} className="text-neutral-800" />
                <span className="hidden sm:inline text-sm font-medium text-neutral-800">
                  {user.name.split(" ")[0]}
                </span>
              </Link>
              <button
                onClick={handleLogout}
                aria-label="Đăng xuất"
                className="p-2 rounded-full hover:bg-neutral-100 transition-colors"
              >
                <LogOut size={18} className="text-neutral-800" />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="text-sm font-semibold bg-neutral-900 text-white px-4 py-2 rounded-xl hover:bg-black transition-all"
            >
              Đăng nhập
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-full hover:bg-neutral-100 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white border-l border-neutral-200 shadow-xl transition-transform duration-300 ease-in-out md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b border-neutral-200">
          <span className="font-semibold text-lg text-neutral-900">Menu</span>
          <button
            onClick={() => setOpen(false)}
            className="p-2 rounded-full hover:bg-neutral-100"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex flex-col p-6 text-neutral-800">
          <Link
            href="/services"
            onClick={() => setOpen(false)}
            className="py-3 text-sm font-medium hover:text-black"
          >
            Dịch vụ
          </Link>
          <Link
            href="/posts"
            onClick={() => setOpen(false)}
            className="py-3 text-sm font-medium hover:text-black"
          >
            Mạng xã hội
          </Link>
          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="py-3 text-sm font-medium hover:text-black"
          >
            Hồ sơ
          </Link>

          <div className="border-t border-neutral-200 mt-4 pt-4">
            {user ? (
              <button
                onClick={handleLogout}
                className="text-left w-full py-3 text-sm font-medium text-red-600 hover:bg-neutral-100 rounded-lg"
              >
                Đăng xuất
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="block py-3 text-sm font-medium hover:text-black"
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
    </header>
  );
};

export default MainHeader;
