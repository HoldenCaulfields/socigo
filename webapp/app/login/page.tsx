"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Globe, LogIn } from "lucide-react"; // 🧩 dùng icon từ lucide-react

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const result = await login(email, password);

    if (result.success) {
      router.push("/");
    } else {
      setMessage({ type: "error", text: result.message || "Đăng nhập thất bại" });
    }

    setIsSubmitting(false);
  };

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors">
      <div className="w-full max-w-md bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-xl p-8 md:p-10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <LogIn size={40} className="mx-auto text-neutral-800 dark:text-neutral-100 mb-3" />
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Đăng nhập</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2 text-neutral-700 dark:text-neutral-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-200 transition"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2 text-neutral-700 dark:text-neutral-300">
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-200 transition"
            />
          </div>

          {message && (
            <div
              className={`text-sm p-3 rounded-lg text-center ${
                message.type === "error"
                  ? "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-300"
                  : "bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-300"
              }`}
            >
              {message.text}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-black text-white dark:bg-white dark:text-black font-semibold tracking-tight hover:opacity-90 active:scale-[0.98] transition disabled:opacity-50"
          >
            {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>

        {/* OR Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-neutral-300 dark:border-neutral-700" />
          <span className="mx-3 text-sm text-neutral-500">Hoặc</span>
          <div className="flex-grow border-t border-neutral-300 dark:border-neutral-700" />
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition font-medium"
        >
          <Globe size={20} className="mr-2 text-neutral-700 dark:text-neutral-300" />
          Đăng nhập với Google
        </button>

        {/* Footer */}
        <p className="mt-6 text-sm text-center text-neutral-600 dark:text-neutral-400">
          Chưa có tài khoản?{" "}
          <Link
            href="/signup"
            className="font-medium text-neutral-900 dark:text-neutral-100 hover:underline"
          >
            Đăng ký
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
