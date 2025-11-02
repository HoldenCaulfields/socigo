"use client";

import { useState, FormEvent, useEffect } from "react";
import { useServiceDetail } from "@/hooks/useServiceDetail";
import { BookingInput } from "@/types";
import { LogIn, CalendarDays, Clock, Users } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

interface BookingFormProps {
  serviceId: string;
  servicePrice: number;
}

const BookingForm = ({ serviceId, servicePrice }: BookingFormProps) => {
  const { user } = useAuth();
  const { createBooking, loading } = useServiceDetail();
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);

  const today = new Date().toISOString().split("T")[0];
  const [formData, setFormData] = useState<BookingInput>({
    serviceId,
    date: today,
    time: "18:00",
    people: 1,
  });

  // Auto scroll lên đầu khi có message
  useEffect(() => {
    if (message) window.scrollTo({ top: 0, behavior: "smooth" });
  }, [message]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!user) {
      setMessage({ type: "error", text: "Vui lòng đăng nhập để đặt chỗ." });
      return;
    }

    const result = await createBooking(formData);
    if (result.message) {
      setMessage({
        type: result.success ? "success" : "error",
        text: result.message,
      });
    }

    if (result.success) {
      setFormData((prev) => ({ ...prev, people: 1 }));
    }
  };

  return (
    <div className="max-w-md w-full mx-auto p-6 sm:p-8 bg-white border border-neutral-200 rounded-2xl shadow-sm hover:shadow-md transition-all">
      <h3 className="text-2xl font-semibold mb-3 tracking-tight text-center sm:text-left">
        Đặt Chỗ Ngay
      </h3>

      <p className="text-lg text-neutral-700 mb-5 text-center sm:text-left">
        <span className="text-3xl font-bold text-neutral-900">${servicePrice}</span>{" "}
        <span className="text-sm text-neutral-500">/ dịch vụ</span>
      </p>

      {message && (
        <div
          className={`p-3 mb-4 text-sm rounded-lg ${
            message.type === "error"
              ? "bg-red-50 text-red-700 border border-red-200"
              : "bg-green-50 text-green-700 border border-green-200"
          }`}
        >
          {message.text}
        </div>
      )}

      {!user ? (
        <Link
          href="/login"
          className="flex items-center justify-center gap-2 w-full bg-neutral-900 hover:bg-neutral-800 text-white font-semibold py-3 rounded-xl transition-all"
        >
          <LogIn size={18} />
          <span>Đăng nhập để đặt chỗ</span>
        </Link>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="hidden" name="serviceId" value={serviceId} />

          {/* Ngày & Giờ */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <label htmlFor="date" className="block text-sm font-medium text-neutral-700 mb-1">
                Ngày
              </label>
              <div className="relative">
                <CalendarDays size={16} className="absolute left-3 top-3 text-neutral-400" />
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={today}
                  required
                  className="w-full pl-9 pr-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 outline-none text-neutral-800"
                />
              </div>
            </div>

            <div className="flex-1">
              <label htmlFor="time" className="block text-sm font-medium text-neutral-700 mb-1">
                Giờ
              </label>
              <div className="relative">
                <Clock size={16} className="absolute left-3 top-3 text-neutral-400" />
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full pl-9 pr-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 outline-none text-neutral-800"
                />
              </div>
            </div>
          </div>

          {/* Số người */}
          <div>
            <label htmlFor="people" className="block text-sm font-medium text-neutral-700 mb-1">
              Số người
            </label>
            <div className="relative">
              <Users size={16} className="absolute left-3 top-3 text-neutral-400" />
              <input
                type="number"
                id="people"
                name="people"
                value={formData.people}
                onChange={handleChange}
                min="1"
                required
                className="w-full pl-9 pr-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 outline-none text-neutral-800"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-50"
          >
            {loading ? "Đang đặt..." : "Xác nhận đặt chỗ"}
          </button>
        </form>
      )}
    </div>
  );
};

export default BookingForm;
