// components/Services/TopBrandsSection.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTopServices } from "@/hooks/useTopServices";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button"; // nếu bạn đã có shadcn/ui

const TopBrandsSection = () => {
  const { topServices, loading, error } = useTopServices();
  const router = useRouter();

  if (loading) {
    return (
      <section className="mt-6 text-center py-8">
        <Loader2 size={24} className="animate-spin inline-block mr-2 text-blue-500" />
        <p className="text-gray-500">Đang tải Top Thương hiệu...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mt-6 text-center py-8 text-red-600">
        <p>Lỗi tải dữ liệu: {error}</p>
      </section>
    );
  }

  if (!topServices || topServices.length === 0) {
    return null;
  }

  return (
    <section className="px-6 py-10">
      <h2 className="text-2xl font-bold mb-4">🔥 Dịch vụ được đánh giá cao</h2>

      <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4">
        {topServices.map((s) => (
          <div
            key={s._id}
            className="snap-start shrink-0 w-72 bg-white rounded-2xl shadow hover:shadow-md transition overflow-hidden"
          >
            <img
              src={s.images?.[0] || "/images/placeholder.jpg"}
              alt={s.name}
              className="w-full h-44 object-cover"
            />

            <div className="p-4">
              <h3 className="font-semibold text-lg line-clamp-1">{s.name}</h3>
              <p className="text-sm text-gray-500 line-clamp-2">{s.detail || "Dịch vụ chất lượng cao được nhiều người yêu thích."}</p>

              <div className="mt-2 flex justify-between text-sm text-gray-600">
                <span>⭐ {s.rating?.toFixed(1) || "4.5"}</span>
                <span>{s.totalReviews || "0"} đánh giá</span>
              </div>

              <Button
                size="sm"
                className="w-full mt-3 bg-black text-white hover:bg-gray-800"
                onClick={() => router.push(`/services/${s._id}`)}
              >
                Xem chi tiết
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopBrandsSection;
