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

export default function ProductListWithCategory({ cols, className, suggest }) {
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

  return data?.map((product, index) => {
    if (!suggest) {
      const categoryName = product?.name;
      const categoryIcon = product?.icon;
      return (
        <div
          key={product?.id}
          className={`flex flex-col justify-center ${className}`}
        >
          <div className="flex items-end justify-between">
            <div className="ml-2 flex items-center gap-4">
              {categoryIcon && (
                <div className="relative h-10 w-10 xs:h-12 xs:w-12 sm:h-14 sm:w-14 md:h-16 md:w-16">
                  <Image src={categoryIcon} fill alt={categoryIcon} />
                </div>
              )}
              <p className="text-xl font-medium xs:text-xl xs:font-medium sm:text-xl sm:font-medium md:text-xxl md:font-bold">
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
                slidesPerView: 1,
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
                slidesPerView: suggest ? 5 : 4,
                spaceBetween: 30,
              },
              1780: {
                slidesPerView: suggest ? 6 : 5,
                spaceBetween: 30,
              },
            }}
            className="mySwiper mt-6"
          >
            {product?.products &&
              product?.products?.map((e, index) => (
                <SwiperSlide
                  className="rounded-md py-2"
                  key={index}
                  style={{
                    background: "transparent",
                  }}
                >
                  <ProductCard
                    key={`product-card-key-${index}-${e.id}`}
                    shouldScale={true}
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
    } else {
      const categoryName = "Санал болгож буй бүтээгдэхүүн";

      if (index === 0)
        return (
          <div
            key={product?.id}
            className={`flex flex-col justify-center ${className}`}
          >
            <div className="flex items-end justify-between">
              <div className="ml-2 flex items-center gap-4">
                <p className="text-xl font-medium xs:text-xl xs:font-medium sm:text-xl sm:font-medium md:text-xxl md:font-bold">
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
                  slidesPerView: suggest ? 5 : 4,
                  spaceBetween: 30,
                },
                1780: {
                  slidesPerView: suggest ? 6 : 5,
                  spaceBetween: 30,
                },
                2000: {
                  slidesPerView: suggest ? 7 : 6,
                  spaceBetween: 30,
                },
              }}
              className="mySwiper mt-6"
            >
              {product?.products &&
                product?.products?.map((e, index) => (
                  <SwiperSlide
                    className="rounded-md py-2"
                    key={index}
                    style={{
                      background: "transparent",
                    }}
                  >
                    <ProductCard
                      key={`product-card-key-${index}-${e.id}`}
                      shouldScale={true}
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
  });
}
