import Image from "next/image";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import ProductCard from "./product-card";

export default function ProductListWithCategory({
  categoryName,
  categoryIcon,
  categoryId,
  cols,
  className,
  product,
  suggest,
}) {
  return (
    <div className={`flex flex-col justify-center ${className}`}>
      <div className="flex justify-between items-end">
        <div className="flex items-center gap-4 ml-2">
          {categoryIcon && (
            <div
              className="relative
              h-10 w-10
              md:h-16 md:w-16
              sm:h-14 sm:w-14
              xs:h-12 xs:w-12"
            >
              <Image src={categoryIcon} fill alt={categoryIcon} />
            </div>
          )}
          <p
            className="
            text-xl font-medium
		   md:text-xxl md:font-bold
		   sm:font-medium sm:text-xl
		   xs:font-medium xs:text-xl"
          >
            {categoryName}
          </p>
        </div>
      </div>
      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        navigation
        modules={[Navigation]}
        breakpoints={{
          320: {
            slidesPerView: 1.5,
            spaceBetween: 20,
          },
          520: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: suggest ? 2 : 3,
            spaceBetween: 20,
          },
          1080: {
            slidesPerView: suggest ? 2 : 4,
            spaceBetween: 30,
          },
          1280: {
            slidesPerView: suggest ? 3 : 5,
            spaceBetween: 30,
          },
          1520: {
            slidesPerView: suggest ? 4 : 5,
            spaceBetween: 30,
          },
          1780: {
            slidesPerView: suggest ? 5 : 6,
            spaceBetween: 30,
          },
        }}
        className="mySwiper mt-6"
      >
        {product?.products &&
          product?.products?.map((e, index) => (
            <SwiperSlide className="rounded-md py-2" key={index}>
              <ProductCard
                key={`product-card-key-${index}-${e.id}`}
                shouldScale={false}
                loader={() => e.additionalImage?.[0]}
                src={e.additionalImage?.[0]}
                additionalImages={e.additionalImage?.slice(1)}
                alt={e?.name}
                data={e}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
