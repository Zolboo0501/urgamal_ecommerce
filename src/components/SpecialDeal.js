/* eslint-disable react/prop-types */
import Image from "next/image";
import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useSpecialDeals } from "@/hooks/useSpecialDeals";
import { SimpleGrid, Skeleton } from "@mantine/core";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import ProductCard from "./ProductCard";
import React from "react";

export default function ProductListWithCategory({ className, suggest }) {
  const { data, isLoading } = useSpecialDeals();
  if (isLoading)
    return (
      <SimpleGrid
        cols={4}
        spacing={20}
        verticalSpacing={20}
        className={className}
        breakpoints={[
          { maxWidth: "110em", cols: 4, spacing: "md" },
          { maxWidth: "90em", cols: 3, spacing: "md" },
          { maxWidth: "74em", cols: 3, spacing: "md" },
          { maxWidth: "64em", cols: 3, spacing: "md" },
          { maxWidth: "48rem", cols: 2, spacing: "sm" },
          { maxWidth: "30em", cols: 1, spacing: "xs" },
        ]}
      >
        {Array(6)
          .fill("")
          .map((_, index) => (
            <Skeleton
              key={index}
              mt="lg"
              height={275}
              width={250}
              radius="md"
            />
          ))}
      </SimpleGrid>
    );

  const order = data.sort((a, b) => a.order - b.order);

  return order?.map((product, index) => {
    if (!product?.products?.length) return null;

    const renderSwiperSlides = () =>
      product?.products?.map((e, productIndex) => (
        <SwiperSlide
          key={`swiper-slide-${productIndex}`}
          className="rounded-md py-2"
          style={{ background: "transparent" }}
        >
          <ProductCard
            key={`product-card-${productIndex}-${e?.product_data?.id}`}
            shouldScale
            loader={() => e?.product_data?.additionalImage?.[0]}
            src={e?.product_data?.additionalImage?.[0]}
            additionalImages={e?.product_data?.additionalImage?.slice(1)}
            alt={e?.name || e?.product_data?.name}
            data={e?.product_data || e}
          />
        </SwiperSlide>
      ));

    const renderCategoryHeader = (name, icon) => (
      <div className="flex items-end justify-between">
        <div className="ml-2 flex items-center gap-4">
          {icon && (
            <div className="relative h-10 w-10 xs:h-12 xs:w-12 sm:h-14 sm:w-14 md:h-16 md:w-16">
              <Image src={icon} fill alt={name} />
            </div>
          )}
          <p className="text-xl font-medium xs:text-xl sm:text-xl md:text-xxl md:font-bold">
            {name}
          </p>
        </div>
      </div>
    );

    const breakpoints = {
      320: { slidesPerView: 1.5, spaceBetween: 20 },
      520: { slidesPerView: 2, spaceBetween: 20 },
      768: { slidesPerView: suggest ? 2 : 3, spaceBetween: 20 },
      1080: { slidesPerView: suggest ? 2 : 4, spaceBetween: 30 },
      1280: { slidesPerView: suggest ? 3 : 5, spaceBetween: 30 },
      1520: { slidesPerView: suggest ? 5 : 4, spaceBetween: 30 },
      1780: { slidesPerView: suggest ? 6 : 5, spaceBetween: 30 },
      2000: { slidesPerView: suggest ? 7 : 6, spaceBetween: 30 },
      2300: { slidesPerView: suggest ? 8 : 7, spaceBetween: 30 },
      2600: { slidesPerView: suggest ? 9 : 8, spaceBetween: 30 },
    };

    return (
      <div
        key={product?.id}
        className={`flex flex-col justify-center ${className}`}
      >
        {suggest && index === 0
          ? renderCategoryHeader("Санал болгож буй бүтээгдэхүүн", null)
          : renderCategoryHeader(product?.name, product?.icon)}
        <Swiper
          slidesPerView={5}
          spaceBetween={30}
          navigation
          modules={[Navigation]}
          breakpoints={breakpoints}
          className="mySwiper mt-6"
        >
          {renderSwiperSlides()}
        </Swiper>
      </div>
    );
  });
}
