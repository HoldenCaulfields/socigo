"use client";

import { useState, FormEvent } from "react";
import { useAuth } from "@/context/AuthContext";
import { Globe, LogIn, X } from "lucide-react";

export default function LoginModal({
  isOpen,
  onClose,
  onSwitchToSignup,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignup: () => void;
}) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const result = await login(email, password);

    if (result.success) {
      setMessage({ type: "success", text: "Đăng nhập thành công!" });
      setTimeout(() => onClose(), 700);
    } else {
      setMessage({ type: "error", text: result.message || "Đăng nhập thất bại" });
    }
    setIsSubmitting(false);
  };

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-200 p-8 md:p-10 animate-in fade-in slide-in-from-bottom"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <LogIn size={40} className="mx-auto text-gray-800 mb-3" />
          <h1 className="text-3xl font-bold">Đăng nhập</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 rounded-xl bg-white border border-gray-300 focus:ring-2 focus:ring-black outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2 text-gray-700">
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 rounded-xl bg-white border border-gray-300 focus:ring-2 focus:ring-black outline-none"
            />
          </div>

          {message && (
            <div
              className={`text-sm p-3 rounded-lg text-center ${
                message.type === "error"
                  ? "bg-red-100 text-red-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {message.text}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-black text-white font-semibold tracking-tight hover:bg-gray-800 transition disabled:opacity-50"
          >
            {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="grow border-t border-gray-300" />
          <span className="mx-3 text-sm text-gray-500">Hoặc</span>
          <div className="grow border-t border-gray-300" />
        </div>

        {/* Google */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition font-medium"
        >
          <Globe size={20} className="mr-2 text-gray-700" />
          Đăng nhập với Google
        </button>

        {/* Footer */}
        <p className="mt-6 text-sm text-center text-gray-600">
          Chưa có tài khoản?{" "}
          <button
            onClick={onSwitchToSignup}
            className="font-medium text-black hover:underline"
          >
            Đăng ký
          </button>
        </p>
      </div>
    </div>
  );
}
