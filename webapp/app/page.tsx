"use client";

import CategoryTabs from "@/components/Services/CategoryTabs";
import TopBrandsSection from "@/components/Services/TopBrandsSection";
import RankingList from "@/components/Services/RankingList";
import BottomNavBar from "@/components/Layout/BottomNavbar";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Search, MapPin, TrendingUp, Users } from "lucide-react";

const HeroSearchBanner = ({ userName }: { userName: string }) => (
  <section className="bg-neutral-50 border border-neutral-200 rounded-3xl p-8 md:p-12 shadow-sm text-neutral-900 mb-10">
    <h1 className="text-3xl md:text-4xl font-semibold mb-2">
      Chào mừng, <span className="font-bold">{userName || "Khách"}</span> 👋
    </h1>
    <p className="text-lg text-neutral-600 mb-8">
      Bạn muốn khám phá điều gì hôm nay?
    </p>

    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
        />
        <input
          type="text"
          placeholder="Tìm kiếm dịch vụ, địa điểm, hoặc người dùng..."
          className="w-full pl-12 pr-4 py-3 bg-white border border-neutral-300 rounded-xl text-neutral-800 focus:ring-2 focus:ring-neutral-900 outline-none transition"
        />
      </div>
      <button className="px-6 py-3 bg-neutral-900 text-white rounded-xl hover:bg-neutral-800 transition">
        Tìm kiếm
      </button>
    </div>

    <div className="mt-5 flex flex-wrap gap-6 text-sm text-neutral-500">
      <span className="flex items-center">
        <MapPin size={16} className="mr-1" /> Gần bạn
      </span>
      <span className="flex items-center">
        <TrendingUp size={16} className="mr-1" /> Xu hướng
      </span>
    </div>
  </section>
);

const RecentSocialActivity = () => (
  <section className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
    <h3 className="text-lg font-semibold mb-4 flex items-center text-neutral-900">
      <Users size={18} className="mr-2" /> Hoạt động gần đây
    </h3>
    <ul className="space-y-3 text-sm text-neutral-700">
      <li className="border-b border-neutral-100 pb-2">
        <strong>An Nguyen</strong> vừa đánh giá <em>Khách sạn Royal</em> 5⭐
      </li>
      <li className="border-b border-neutral-100 pb-2">
        <strong>Minh Le</strong> chia sẻ bài viết mới về <em>Spa cao cấp</em>.
      </li>
      <li>
        <strong>Bạn</strong> có 3 lời mời kết bạn mới.
      </li>
    </ul>
    <Link
      href="/posts"
      className="block mt-4 text-sm font-medium text-neutral-700 hover:underline"
    >
      Đến bảng tin cộng đồng →
    </Link>
  </section>
);

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      

      {/* Nội dung */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-10">
        <HeroSearchBanner userName={user?.name || ""} />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* MAIN CONTENT */}
          <div className="md:col-span-8 space-y-10">
            <section>
              <h2 className="text-xl font-semibold mb-4 border-b border-neutral-200 pb-2">
                Danh mục Dịch vụ
              </h2>
              <CategoryTabs />
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 border-b border-neutral-200 pb-2">
                Thương hiệu nổi bật
              </h2>
              <TopBrandsSection />
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 border-b border-neutral-200 pb-2">
                Xếp hạng phổ biến
              </h2>
              <RankingList />
            </section>
          </div>

          {/* SIDEBAR */}
          <aside className="md:col-span-4 space-y-8">
            <RecentSocialActivity />

            <section className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-neutral-900">
                💰 Điểm Tích lũy
              </h3>
              {user ? (
                <p className="text-neutral-700">
                  Bạn có{" "}
                  <span className="text-2xl font-bold text-neutral-900">
                    12.500
                  </span>{" "}
                  điểm thưởng.
                </p>
              ) : (
                <p className="text-neutral-600">
                  Đăng nhập để bắt đầu tích điểm và nhận ưu đãi!
                </p>
              )}
              <Link
                href="/profile"
                className="block mt-4 text-sm font-medium text-neutral-700 hover:underline"
              >
                Xem hồ sơ điểm thưởng →
              </Link>
            </section>
          </aside>
        </div>
      </main>

      {/* Bottom Nav (Mobile) */}
      <BottomNavBar />
    </div>
  );
};

export default HomePage;
