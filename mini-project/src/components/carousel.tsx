"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

export default function Carousel() {
  const images = [
    "/BannerTerrifier3.jpg",
    "/BannerDWP.jpg",
    "/BannerROC.jpg",
    "/BannerCAS.jpg",
  ];

  return (
    <div className="w-full flex justify-center py-8 bg-red relative group">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{
          prevEl: ".prev-btn",
          nextEl: ".next-btn",
        }}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
        }}
        loop
        className="relative w-[95%] max-w-[1200px] h-[300px] rounded-lg overflow-visible"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}

        <button className="prev-btn absolute left-[-16px] top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-white z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <MdOutlineKeyboardArrowLeft size={24} />
        </button>
        <button className="next-btn absolute right-[-16px] top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-white z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <MdOutlineKeyboardArrowRight size={24} />
        </button>
      </Swiper>
    </div>
  );
}
