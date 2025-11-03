"use client";

import { useState, FormEvent } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  X,
  Loader2,
  UserPlus,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export default function SignupModal({
  isOpen,
  onClose,
  onSwitchToLogin,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}) {
  const { signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"user" | "partner">("user");
  const [businessCategory, setBusinessCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const result = await signup({ name, email, password, role, businessCategory });

    if (result.success) {
      setMessage({
        type: "success",
        text: "Đăng ký thành công! Đang chuyển hướng...",
      });
      setTimeout(onClose, 1000);
    } else {
      setMessage({
        type: "error",
        text: result.message || "Đăng ký thất bại",
      });
    }

    setIsSubmitting(false);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm overflow-y-auto py-10 px-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl p-8 md:p-10 border border-gray-200 dark:border-neutral-800 animate-in fade-in slide-in-from-bottom"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <UserPlus className="mx-auto text-gray-900 dark:text-white w-10 h-10 mb-3" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Tạo tài khoản
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            Cùng đồng hành và phát triển với chúng tôi 💫
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Họ và tên
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Nguyễn Văn A"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-gray-900 dark:focus:border-white focus:ring-2 focus:ring-gray-100 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="email@example.com"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-gray-900 dark:focus:border-white focus:ring-2 focus:ring-gray-100 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Mật khẩu
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              placeholder="Tối thiểu 6 ký tự"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-gray-900 dark:focus:border-white focus:ring-2 focus:ring-gray-100 outline-none transition-all"
            />
          </div>

          {/* Role */}
          <div>
            <span className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Loại tài khoản
            </span>
            <div className="flex gap-3">
              {["user", "partner"].map((r) => (
                <label
                  key={r}
                  className={`flex-1 text-center py-3 rounded-xl border-2 cursor-pointer font-semibold ${
                    role === r
                      ? "bg-white text-black border-gray-900"
                      : "border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-gray-400"
                  }`}
                >
                  <input
                    type="radio"
                    value={r}
                    checked={role === r}
                    onChange={() => setRole(r as "user" | "partner")}
                    className="hidden"
                  />
                  {r === "user" ? "Khách hàng" : "Doanh nghiệp"}
                </label>
              ))}
            </div>
          </div>

          {role === "partner" && (
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Ngành kinh doanh
              </label>
              <select
                value={businessCategory}
                onChange={(e) => setBusinessCategory(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-gray-900 dark:focus:border-white focus:ring-2 focus:ring-gray-100 outline-none transition-all"
              >
                <option value="">-- Chọn ngành --</option>
                <option value="Nhà hàng & Ăn uống">Nhà hàng & Ăn uống</option>
                <option value="Khách sạn & Lưu trú">Khách sạn & Lưu trú</option>
                <option value="Spa & Làm đẹp">Spa & Làm đẹp</option>
                <option value="Tour & Trải nghiệm">Tour & Trải nghiệm</option>
                <option value="Giải trí & Sự kiện">Giải trí & Sự kiện</option>
                <option value="Khác">Khác</option>
              </select>
            </div>
          )}

          {message && (
            <div
              className={`md:col-span-2 text-sm p-3 rounded-lg text-center ${
                message.type === "error"
                  ? "bg-red-100 text-red-700 border border-red-200"
                  : "bg-green-100 text-green-700 border border-green-200"
              }`}
            >
              {message.type === "error" ? (
                <AlertTriangle className="inline w-4 h-4 mr-1" />
              ) : (
                <CheckCircle className="inline w-4 h-4 mr-1" />
              )}
              {message.text}
            </div>
          )}

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:bg-gray-800 active:scale-[0.98] disabled:opacity-60"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="animate-spin h-5 w-5 mr-3" /> Đang đăng ký...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  Đăng ký ngay <ArrowRight className="ml-2 w-5 h-5" />
                </span>
              )}
            </button>
          </div>
        </form>

        {/* Footer */}
        <p className="mt-6 text-sm text-center text-gray-600 dark:text-gray-400">
          Đã có tài khoản?{" "}
          <button
            onClick={onSwitchToLogin}
            className="font-medium text-black dark:text-white hover:underline"
          >
            Đăng nhập
          </button>
        </p>
      </div>
    </div>
  );
}
