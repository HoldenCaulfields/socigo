"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
  Bell,
  MessageCircle,
  Home,
  Users,
  Store,
  Wallet,
  Search,
  Globe,
  Menu,
  X,
  LogOut,
  LogIn,
  UserPlus,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LoginModal from "../LoginModal";
import SignupModal from "../SignupModal";

const MainHeader = () => {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState("vi");
  const [open, setOpen] = useState(false);

  // 🧩 Modal states
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const openLogin = () => {
    setShowSignup(false);
    setShowLogin(true);
  };
  const openSignup = () => {
    setShowLogin(false);
    setShowSignup(true);
  };
  const closeModals = () => {
    setShowLogin(false);
    setShowSignup(false);
  };

  // 🌐 Load & lưu ngôn ngữ
  useEffect(() => {
    const storedLang = localStorage.getItem("lang");
    if (storedLang) setLanguage(storedLang);
  }, []);
  const toggleLang = () => {
    const nextLang = language === "vi" ? "en" : "vi";
    setLanguage(nextLang);
    localStorage.setItem("lang", nextLang);
  };

  // 🌫️ Hiệu ứng cuộn
  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => setScrolled(window.scrollY > 10));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🚪 Logout handler
  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  // 🔍 Xử lý tìm kiếm
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) router.push(`/search?q=${encodeURIComponent(search)}`);
  };

  return (
    <>
      <header
        className={`w-full border-b border-gray-200 sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-xl shadow-sm" : "bg-white"
          }`}
      >
        <div className="max-w-[1200px] mx-auto flex items-center justify-between px-4 py-3">
          {/* 🧭 Logo + Nav */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl overflow-hidden flex items-center justify-center">
                <Image src="/logo.png" alt="SOCIGO" width={36} height={36} />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-gray-900">
                SOCIGO
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-2 text-sm text-gray-600">
              <NavButton label="Trang chủ" icon={<Home size={16} />} href="/" />
              <NavButton label="Khám phá" icon={<Store size={16} />} href="/posts" />
              <NavButton label="Bạn bè" icon={<Users size={16} />} href="/profile" />
              <NavButton label="Dịch vụ" icon={<Wallet size={16} />} href="/services" />
            </nav>
          </div>

          {/* 🔍 Search */}
          <div className="flex-1 px-4 max-w-lg hidden md:block">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm bạn bè, dịch vụ, địa điểm..."
                className="pl-9 pr-3 py-2 w-full bg-gray-50 border border-gray-200 rounded-full text-sm focus:ring-2 focus:ring-gray-300 focus:bg-white outline-none transition-all"
              />
            </form>
          </div>

          {/* 👤 User actions */}
          <div className="flex items-center gap-3">
            {user && (
              <>
                <IconButton icon={<Bell size={18} />} />
                <IconButton icon={<MessageCircle size={18} />} />
              </>
            )}

            {/* Auth */}
            {loading ? (
              <span className="text-sm text-gray-500">Đang tải...</span>
            ) : user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => router.push("/profile")}
                  className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-1.5 transition-all"
                >
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={user.avatarUrl || "/default-avatar.png"} alt={user.name} />
                    <AvatarFallback className="bg-blue-600 text-white">
                      {user.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline text-sm font-medium text-gray-800">
                    {user.name?.split(" ")[0]}
                  </span>
                </button>
                <IconButton icon={<LogOut size={18} className="text-gray-800" />} onClick={handleLogout} />
              </div>
            ) : (
              <>
                {/* 🖥️ Desktop */}
                <button
                  onClick={openLogin}
                  className="hidden md:inline-block text-sm font-semibold bg-gray-900 text-white px-5 py-2.5 rounded-full hover:opacity-90 transition"
                >
                  Đăng nhập
                </button>
                <button
                  onClick={openSignup}
                  className="hidden md:inline-block text-sm font-semibold border border-gray-300 text-gray-800 px-5 py-2.5 rounded-full hover:bg-gray-50 transition"
                >
                  Đăng ký
                </button>

                {/* 📱 Mobile icons */}
                <div className="flex md:hidden">
                  <IconButton
                    onClick={openLogin}
                    icon={<LogIn size={20} className="text-gray-800" />}
                  />
                  <IconButton
                    onClick={openSignup}
                    icon={<UserPlus size={20} className="text-gray-800" />}
                  />
                </div>
              </>
            )}

            {/* 🌐 Language */}
            <IconButton onClick={toggleLang} icon={<Globe size={16} />}>
              <span className="text-sm font-medium">{language.toUpperCase()}</span>
            </IconButton>

            {/* 📱 Mobile menu toggle */}
            <div className="md:hidden">
              <IconButton onClick={() => setOpen(!open)} icon={open ? <X size={22} /> : <Menu size={22} />} />
            </div>
          </div>
        </div>
      </header>

      {/* 📱 Mobile drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-4/5 max-w-xs bg-white border-l border-gray-200 shadow-xl z-50 transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <span className="font-semibold text-lg text-gray-900">Menu</span>
          <IconButton onClick={() => setOpen(false)} icon={<X size={22} />} />
        </div>

        <nav className="flex flex-col p-4 text-gray-700">
          <MobileLink href="/" icon={<Home size={16} />} label="Trang chủ" />
          <MobileLink href="/explore" icon={<Store size={16} />} label="Khám phá" />
          <MobileLink href="/friends" icon={<Users size={16} />} label="Bạn bè" />
          <MobileLink href="/services" icon={<Wallet size={16} />} label="Dịch vụ" />

          <div className="mt-4 border-t border-gray-200 pt-4">
            {user ? (
              <button
                onClick={handleLogout}
                className="w-full text-left text-red-600 hover:bg-gray-100 py-2 px-3 rounded-md font-medium"
              >
                Đăng xuất
              </button>
            ) : (
              <div className="flex flex-col gap-3">
                <button
                  onClick={openLogin}
                  className="text-center font-semibold bg-gray-900 text-white py-2.5 rounded-full hover:opacity-90 transition"
                >
                  Đăng nhập
                </button>
                <button
                  onClick={openSignup}
                  className="text-center font-semibold border border-gray-300 py-2.5 rounded-full hover:bg-gray-50 transition"
                >
                  Đăng ký
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Overlay */}
      {open && <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setOpen(false)} />}

      {/* 🪟 Modals */}
      <LoginModal isOpen={showLogin} onClose={closeModals} onSwitchToSignup={openSignup} />
      <SignupModal isOpen={showSignup} onClose={closeModals} onSwitchToLogin={openLogin} />
    </>
  );
};

/* === Sub components === */

const IconButton = ({
  icon,
  onClick,
  children,
}: {
  icon: React.ReactNode;
  onClick?: () => void;
  children?: React.ReactNode;
}) => (
  <button onClick={onClick} className="p-2 rounded-md hover:bg-gray-100 transition flex items-center gap-1">
    {icon}
    {children}
  </button>
);

const NavButton = ({
  label,
  icon,
  href,
}: {
  label: string;
  icon: any;
  href: string;
}) => {
  const pathname = usePathname();
  const active = pathname === href || (href !== "/" && pathname.startsWith(href));
  return (
    <Link
      href={href}
      className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition text-sm ${active ? "bg-gray-200 text-gray-900 font-medium" : "hover:bg-gray-50 text-gray-600"
        }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

const MobileLink = ({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(href)}
      className="py-2 flex items-center gap-2 hover:text-gray-900 w-full text-left"
    >
      {icon} {label}
    </button>
  );
};

export default MainHeader;
