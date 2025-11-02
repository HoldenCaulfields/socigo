"use client";

import { Users, Star, Percent, MapPin } from "lucide-react";

const services = [
  { name: "HOTEL ROYAL", users: "3.256", points: "3M POINTS", rating: 5, distance: "3,7 km", image: "/hotel.jpg" },
  { name: "HOTEL VIP", users: "2.980", points: "2.8M POINTS", rating: 5, distance: "4,1 km", image: "/hotel.jpg" },
  { name: "HOTEL LEGEND", users: "3.540", points: "3.2M POINTS", rating: 5, distance: "2,9 km", image: "/hotel.jpg" },
];

const RankingList = () => {
  return (
    <section className="mt-10 mb-20 md:mb-10">
      <h2 className="text-2xl font-semibold text-neutral-900 mb-6 tracking-tight">
        Danh sách xếp hạng
      </h2>

      <div className="space-y-4">
        {services.map((service, index) => (
          <div
            key={index}
            className="
              group flex items-center gap-4 bg-white border border-neutral-200 rounded-2xl
              p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1
            "
          >
            {/* Image */}
            <div
              className="w-24 h-24 shrink-0 rounded-xl bg-neutral-200 overflow-hidden"
              style={{
                backgroundImage: `url(${service.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

            {/* Info */}
            <div className="flex flex-col grow">
              <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-neutral-950">
                {service.name}
              </h3>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-sm text-neutral-600">
                <span className="flex items-center gap-1">
                  <Users size={16} className="text-neutral-400" />
                  {service.users}
                </span>

                <span className="flex items-center gap-1 font-medium text-neutral-900">
                  <Percent size={16} className="text-neutral-700" />
                  {service.points}
                </span>

                <span className="flex items-center gap-1 text-yellow-500">
                  <Star size={16} fill="currentColor" />
                  {service.rating}
                </span>

                <span className="flex items-center gap-1 text-neutral-500 ml-auto text-xs md:text-sm">
                  <MapPin size={14} className="text-neutral-400" />
                  {service.distance}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RankingList;
