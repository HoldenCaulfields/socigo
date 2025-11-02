"use client";

import { Car, Hotel, Wine, Utensils, Heart } from "lucide-react";
import { useState } from "react";

const categories = [
  { icon: Car, name: "Xe sang" },
  { icon: Hotel, name: "Khách sạn" },
  { icon: Wine, name: "Bar & Club" },
  { icon: Utensils, name: "Ẩm thực" },
  { icon: Heart, name: "Spa & Beauty" },
];

const CategoryTabs = () => {
  const [active, setActive] = useState("Khách sạn");

  return (
    <div className="w-full">
      <div className="
        flex overflow-x-auto md:grid md:grid-cols-5 
        gap-3 pb-2 md:pb-0 no-scrollbar
      ">
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = category.name === active;
          return (
            <button
              key={category.name}
              onClick={() => setActive(category.name)}
              className={`
                flex items-center justify-center md:justify-start gap-2 px-4 py-3 rounded-2xl
                font-medium text-sm transition-all duration-300
                border border-neutral-200
                ${isActive 
                  ? "bg-neutral-900 text-white shadow-md" 
                  : "bg-white text-neutral-800 hover:bg-neutral-100"
                }
              `}
            >
              <Icon size={18} className={`${isActive ? "text-white" : "text-neutral-500"}`} />
              <span>{category.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryTabs;
