"use client";

import "swiper/css";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Link from "next/link";

const banners = [
  { img: "/home_banner_1.jpg", link: "#" },
  { img: "/home_banner_2.jpg", link: "#" },
  { img: "/home_banner_3.jpg", link: "#" },
  { img: "/home_banner_4.jpg", link: "#" },
  { img: "/home_banner_5.jpg", link: "#" },
];

const HomeBanner = () => {
  return (
    <div className="w-full max-w-7xl mx-auto  py-8">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <Link href={banner.link}>
              <img
                src={banner.img}
                alt={`Banner ${index + 1}`}
                className="w-full h-auto"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default HomeBanner;
