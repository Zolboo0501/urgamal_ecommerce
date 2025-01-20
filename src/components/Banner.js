import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { ThemeIcon } from "@mantine/core";
import CategoryHover from "./AllCategory/CategoryHover";
import useCategories from "@/hooks/useCategories";
import { IconPhotoOff } from "@tabler/icons-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import useUser from "@/hooks/useUser";

const Banner = () => {
  const [hoveredCategory, setHoveredCategory] = useState([]);
  const [parentId, setParentId] = useState("");
  const categories = useCategories();
  const user = useUser();

  return (
    <div className="relative mx-auto flex h-[320px] w-[100%] sm:h-[380px] md:h-[24rem] lg:h-[36rem] xl:h-[40rem] 2xl:h-[45rem]">
      <div
        className="relative hidden flex-row bg-white lg:flex"
        onMouseLeave={() => {
          setHoveredCategory([]);
        }}
      >
        <div className="h-full overflow-y-auto overscroll-contain p-3 shadow-inner">
          {categories &&
            categories?.categories?.map((item, idx) => {
              return (
                <Link
                  href={{
                    pathname: `/category/${item?.id}`,
                    query: { parent_id: item?.id },
                  }}
                  className="hover:scale-101 flex flex-row items-center justify-between rounded-full py-2 transition delay-100 ease-in-out hover:translate-x-2 hover:cursor-pointer hover:text-primary hover:shadow-2xl"
                  key={idx}
                  onMouseEnter={() => {
                    setHoveredCategory(item?.secondary_cats);
                    setParentId(item?.id);
                  }}
                >
                  <div className="felx-row mx-4 flex items-center gap-3">
                    {item?.icon && (
                      <Image
                        src={item?.icon ?? ""}
                        width={40}
                        height={40}
                        alt="icons"
                      />
                    )}
                    <span className="font-semibold">{item?.name}</span>
                  </div>
                </Link>
              );
            })}
        </div>
        {hoveredCategory?.length > 0 ? (
          <div className="absolute z-10 flex h-full max-w-[45rem] flex-row items-center justify-start overflow-auto rounded-md bg-white py-4 pr-6 lg:left-[270px] xl:left-[285px] 2xl:left-[300px] 3xl:left-[310px]">
            <CategoryHover
              parentId={parentId}
              setIsHovered={setHoveredCategory}
              categories={hoveredCategory}
            />
          </div>
        ) : null}
      </div>

      <Swiper
        navigation
        pagination={{
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 3000, // Adjust the delay (in ms) between slides
          disableOnInteraction: false, // Keep autoplay running after user interaction
        }}
        loop={true}
        className="mySwiper"
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        style={{
          "--swiper-pagination-bullet-inactive-color": "#40C057",
          "--swiper-pagination-bullet-inactive-opacity": "0.4",
        }}
        breakpoints={{
          320: {
            spaceBetween: 20,
          },
          520: {
            spaceBetween: 20,
          },
          768: {
            spaceBetween: 20,
          },
          1080: {
            spaceBetween: 30,
          },
          1280: {
            spaceBetween: 30,
          },
        }}
      >
        {user?.address?.banners?.length > 0 ? (
          user?.address?.banners.map((item, index) => {
            return (
              <SwiperSlide key={index} style={{ opacity: 1 }}>
                <Image
                  alt={item}
                  src={item}
                  fill
                  style={{
                    width: "100%",
                    aspectRatio: "70 / 45", // Ensures correct aspect ratio
                  }}
                  className="relative h-auto w-full md:object-fill"
                />
              </SwiperSlide>
            );
          })
        ) : (
          <div className="flex flex-col items-center gap-2 rounded-md">
            <ThemeIcon size="lg" variant="light" color="green">
              <IconPhotoOff size="80%" stroke={0.5} />
            </ThemeIcon>
            <p className="text-xs font-light text-gray-500">Зураггүй байна</p>
          </div>
        )}
      </Swiper>
      {/* 
      <Carousel
        withIndicators
        height="100%"
        sx={{ flex: 1 }}
        slideSize="100%"
        breakpoints={[
          { maxWidth: "md", slideSize: "100%" },
          { maxWidth: "sm", slideSize: "100%", slideGap: 0 },
        ]}
        slideGap="md"
        loop
        align="center"
        slidesToScroll={1}
        draggable={true}
        styles={{
          control: {
            "&[data-inactive]": {
              opacity: 0,
              cursor: "default",
            },
          },
        }}
      >
        <Carousel.Slide>
          <div className="relative w-full h-full ">
            <Image
              alt="banner2"
              src="/banner2.png"
              fill
              className="rounded-r-lg object-contain md:object-fill  max-h-full"
              draggable={false}
            />
          </div>
        </Carousel.Slide>
        <Carousel.Slide>
          <div className="relative w-full h-full ">
            <Image
              alt="banner"
              src="/banner.png"
              fill
              className="rounded-r-lg object-contain md:object-fill  max-h-full"
              draggable={false}
            />
          </div>
        </Carousel.Slide>
      </Carousel> */}
    </div>
  );
};

export default Banner;
