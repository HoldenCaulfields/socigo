"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useServiceDetail } from "@/hooks/useServiceDetail";
import { ServiceData, ReviewData } from "@/types";
import { MapPin, User, Star, Hash } from "lucide-react";
import BookingForm from "@/components/Services/BookingForm";
import PostReviewForm from "@/components/Social/PostReviewForm";

/* ---------- Review Card ---------- */
const ReviewCard = ({ review }: { review: ReviewData }) => (
  <article className="bg-white border border-neutral-200 rounded-2xl shadow-sm hover:shadow-md transition-all p-5 mb-4">
    <div className="flex justify-between items-start flex-wrap mb-2">
      <div>
        <p className="font-semibold text-neutral-900">{review.userId.name}</p>
        <p className="text-sm text-neutral-500">
          {new Date(review.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div className="flex items-center text-yellow-500 mt-1 sm:mt-0">
        {Array(review.rating)
          .fill(0)
          .map((_, i) => (
            <Star key={i} size={16} fill="currentColor" />
          ))}
      </div>
    </div>

    <p className="text-neutral-700 leading-relaxed wrap-break-words">
      {review.text}
    </p>

    {review.images.length > 0 && (
      <div className="mt-3 flex gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-neutral-300">
        {review.images.map((url, i) => (
          <img
            key={i}
            src={url}
            alt=""
            className="w-24 h-24 object-cover rounded-lg border border-neutral-200 shrink-0"
          />
        ))}
      </div>
    )}
  </article>
);

/* ---------- Main Page ---------- */
const ServiceDetailPage = () => {
  const { id } = useParams();
  const serviceId = Array.isArray(id) ? id[0] : id;

  const { loading, error, fetchServiceDetails, fetchServiceReviews } =
    useServiceDetail();
  const [service, setService] = useState<ServiceData | null>(null);
  const [reviews, setReviews] = useState<ReviewData[]>([]);

  useEffect(() => {
    if (!serviceId) return;
    const load = async () => {
      const s = await fetchServiceDetails(serviceId);
      const r = await fetchServiceReviews(serviceId);
      setService(s);
      setReviews(r);
    };
    load();
  }, [serviceId]);

  const handleReviewSuccess = () => {
    if (!serviceId) return;
    fetchServiceReviews(serviceId).then(setReviews);
  };

  if (loading && !service)
    return (
      <div className="flex justify-center items-center min-h-screen text-neutral-500 text-lg">
        Đang tải chi tiết dịch vụ...
      </div>
    );
  if (error)
    return (
      <div className="text-center text-red-500 min-h-screen flex items-center justify-center">
        Lỗi: {error}
      </div>
    );
  if (!service)
    return (
      <div className="text-center text-neutral-600 min-h-screen flex items-center justify-center">
        Không tìm thấy dịch vụ.
      </div>
    );

  const averageRating = service.totalReviews > 0 ? service.rating : 0;

  return (
    <main className="bg-neutral-50 text-neutral-900 min-h-screen px-4 sm:px-6 md:px-10 lg:px-16 py-10">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-start lg:gap-10 xl:gap-16">
        {/* -------- LEFT CONTENT -------- */}
        <div className="flex-1 min-w-0">
          {/* Header / Gallery */}
          <section className="mb-10">
            <div className="rounded-2xl overflow-hidden border border-neutral-200 shadow-sm mb-6">
              {service.images.length > 0 ? (
                <img
                  src={service.images[0]}
                  alt={service.name}
                  className="w-full max-h-[480px] object-cover"
                />
              ) : (
                <div className="flex justify-center items-center h-72 text-neutral-400 text-sm">
                  Không có hình ảnh
                </div>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2 leading-snug">
              {service.name}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-neutral-600 text-sm">
              <span className="flex items-center">
                <Star
                  size={18}
                  fill="currentColor"
                  className="text-yellow-500 mr-1"
                />
                {averageRating.toFixed(1)} ({service.totalReviews} đánh giá)
              </span>
              <span className="flex items-center">
                <MapPin size={18} className="mr-1" />
                {service.city}
              </span>
            </div>
          </section>

          {/* Chi tiết */}
          <section className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 mb-10">
            <h2 className="text-2xl font-bold mb-4 border-b border-neutral-100 pb-2">
              Chi tiết
            </h2>
            <ul className="space-y-3 text-neutral-700">
              <li className="flex flex-wrap items-center">
                <Hash size={18} className="mr-2 text-neutral-500" />
                Loại hình:
                <span className="ml-1 capitalize">{service.type}</span>
              </li>
              <li className="flex flex-wrap items-center">
                <User size={18} className="mr-2 text-neutral-500" />
                Đối tác:
                <span className="ml-1 break-all">
                  {service.partnerId.name}
                </span>
              </li>
              <li className="flex flex-wrap items-center">
                <MapPin size={18} className="mr-2 text-neutral-500" />
                Địa chỉ:
                <span className="ml-1 break-all">{service.address}</span>
              </li>
            </ul>

            <p className="mt-5 leading-relaxed text-neutral-800 whitespace-pre-line">
              {service.description || "Chưa có mô tả chi tiết."}
            </p>
          </section>

          {/* Form Review */}
          <section className="mb-10">
            <PostReviewForm
              serviceId={service._id}
              onPostSuccess={handleReviewSuccess}
            />
          </section>

          {/* Reviews */}
          <section className="pb-8">
            <h2 className="text-2xl font-bold mb-4">
              Đánh giá ({reviews.length})
            </h2>
            {reviews.length === 0 ? (
              <p className="text-neutral-500">
                Chưa có đánh giá nào. Hãy là người đầu tiên!
              </p>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {reviews.map((r) => (
                  <ReviewCard key={r._id} review={r} />
                ))}
              </div>
            )}
          </section>
        </div>

        {/* -------- RIGHT SIDEBAR -------- */}
        <aside className="w-full lg:w-[360px] shrink-0">
          <div className="sticky top-24">
            <BookingForm serviceId={service._id} servicePrice={100} />
          </div>
        </aside>
      </div>
    </main>
  );
};

export default ServiceDetailPage;
