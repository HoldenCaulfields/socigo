"use client";

import { useEffect, useState } from "react";
import { useServices } from "@/hooks/useServices";
import ServiceCard from "@/components/Services/ServiceCard";
import { ServiceData } from "@/types";
import { Loader2, Search, SlidersHorizontal } from "lucide-react";

const ServicesListPage = () => {
  const { loading, error, fetchServices } = useServices();
  const [services, setServices] = useState<ServiceData[]>([]);
  const [filters, setFilters] = useState({ search: "", type: "", city: "" });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadServices = async (pageNum: number, f = filters) => {
    const result = await fetchServices({
      page: pageNum,
      search: f.search,
      type: f.type,
      city: f.city,
    });
    setServices(result.services);
    setTotalPages(result.totalPages);
    setPage(pageNum);
  };

  useEffect(() => {
    loadServices(1, filters);
  }, [filters]);

  const handleFilterChange = (name: keyof typeof filters, value: string) =>
    setFilters((prev) => ({ ...prev, [name]: value }));

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 px-4 md:px-10 py-24">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-neutral-200 pb-6">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight mb-2">
              Khám phá Dịch vụ
            </h1>
            <p className="text-neutral-600">
              Tìm kiếm, lọc và chọn dịch vụ phù hợp với bạn
            </p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="mt-8 bg-white border border-neutral-200 shadow-sm rounded-2xl p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Ô tìm kiếm */}
            <div className="flex w-full md:flex-1 items-center border border-neutral-300 rounded-full px-4 py-2 bg-neutral-50 focus-within:bg-white transition">
              <Search size={20} className="text-neutral-500 mr-2" />
              <input
                type="text"
                placeholder="Tìm kiếm theo tên hoặc mô tả..."
                value={filters.search}
                onChange={(e) =>
                  handleFilterChange("search", e.target.value)
                }
                className="bg-transparent w-full focus:outline-none text-neutral-800"
              />
            </div>

            {/* Bộ lọc */}
            <div className="flex gap-3 w-full md:w-auto">
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange("type", e.target.value)}
                className="appearance-none bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-2 text-sm text-neutral-700 focus:outline-none focus:ring-1 focus:ring-black"
              >
                <option value="">Tất cả loại hình</option>
                <option value="restaurant">Nhà hàng</option>
                <option value="hotel">Khách sạn</option>
                <option value="spa">Spa</option>
                <option value="clinic">Phòng khám</option>
                <option value="other">Khác</option>
              </select>

              <select
                value={filters.city}
                onChange={(e) => handleFilterChange("city", e.target.value)}
                className="appearance-none bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-2 text-sm text-neutral-700 focus:outline-none focus:ring-1 focus:ring-black"
              >
                <option value="">Tất cả thành phố</option>
                <option value="hanoi">Hà Nội</option>
                <option value="hcm">TP. Hồ Chí Minh</option>
                <option value="danang">Đà Nẵng</option>
              </select>

              <button className="hidden md:flex items-center gap-2 bg-black text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-neutral-800 transition">
                <SlidersHorizontal size={16} /> Bộ lọc
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto">
        {error && (
          <div className="text-center text-red-600 py-10">{error}</div>
        )}

        {loading && services.length === 0 ? (
          <div className="flex justify-center items-center py-32 text-neutral-500">
            <Loader2 size={32} className="animate-spin mr-3" />
            <span className="font-medium text-lg">
              Đang tải danh sách dịch vụ...
            </span>
          </div>
        ) : (
          <>
            {services.length === 0 ? (
              <div className="bg-white border border-neutral-200 p-10 rounded-2xl text-center text-neutral-500">
                Không tìm thấy dịch vụ nào phù hợp với tiêu chí tìm kiếm của bạn.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {services.map((service) => (
                  <ServiceCard key={service._id} service={service} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-10 gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <button
                      key={p}
                      onClick={() => loadServices(p, filters)}
                      className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
                        p === page
                          ? "bg-black text-white border-black"
                          : "bg-white border-neutral-300 text-neutral-700 hover:bg-neutral-100"
                      }`}
                    >
                      {p}
                    </button>
                  )
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ServicesListPage;
