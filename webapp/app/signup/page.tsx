// app/signup/page.tsx
"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const SignupPage = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();
  const { signup } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const result = await signup({ name, email, password });

    if (result.success) {
      setMessage({ type: "success", text: "Đăng ký thành công! Đang chuyển hướng..." });
      setTimeout(() => {
        router.push("/");
      }, 1200);
    } else {
      setMessage({ type: "error", text: result.message || "Đăng ký thất bại" });
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors">
      <div className="w-full max-w-md bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-xl p-8 md:p-10">
        
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 tracking-tight">
          Tạo tài khoản
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2 text-neutral-700 dark:text-neutral-300">
              Họ và Tên
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-3 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-800 dark:focus:ring-neutral-200 transition"
            />
          </div>

          {/* Email */}
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
              className="w-full p-3 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-800 dark:focus:ring-neutral-200 transition"
            />
          </div>

          {/* Password */}
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
              minLength={6}
              className="w-full p-3 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-800 dark:focus:ring-neutral-200 transition"
            />
          </div>

          {/* Message */}
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-black text-white dark:bg-white dark:text-black font-semibold tracking-tight hover:opacity-90 active:scale-[0.98] transition disabled:opacity-50"
          >
            {isSubmitting ? "Đang đăng ký..." : "Đăng ký"}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-neutral-600 dark:text-neutral-400">
          Đã có tài khoản?{" "}
          <Link
            href="/login"
            className="font-medium text-neutral-900 dark:text-neutral-100 hover:underline"
          >
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
