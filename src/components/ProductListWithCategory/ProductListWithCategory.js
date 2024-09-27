import MySkeleton from "../MySkeleton";
import { IconChevronRight } from "@tabler/icons-react";
import Image from "next/image";
import useSWR from "swr";
import Link from "next/link";
import { fetcher } from "@/utils/fetch";
import { PAGE_SIZE } from "@/utils/constant";
import { Pagination, Navigation } from "swiper/modules";
import Swiper from "swiper/react";
import ProductCard from "../ProductCard";

export default function ProductListWithCategory({
  categoryName,
  categoryIcon,
  categoryId,
  cols,
  className,
}) {
  const {
    data: product,
    isLoading,
    error,
  } = useSWR(
    `${
      process.env.NEXT_PUBLIC_API_URL
    }/product?categoryId=${categoryId}&offset=${0}&limit=${PAGE_SIZE}`,
    fetcher
  );

  return (
    <div className={`flex flex-col justify-center ${className}`}>
      <div className="flex justify-between items-end">
        <div className="flex items-center gap-4 ml-2">
          <p
            className="
            text-xl font-medium
		   md:text-xxl md:font-bold
		   sm:font-medium sm:text-xl
		   xs:font-medium xs:text-xl"
          >
            {categoryName}
          </p>
          {categoryIcon && (
            <div
              className="relative
              h-8 w-8
              md:h-12 md:w-12
              sm:h-10 sm:w-10
              xs:h-8 xs:w-8"
            >
              <Image src={categoryIcon} fill alt={categoryIcon} />
            </div>
          )}
        </div>
        <Link
          href={`/category/${categoryId}`}
          className="flex flex-row items-center gap-2 hover:underline text-greenish-grey"
        >
          <p
            className="
            text-sm
		   md:font-medium md:text-base
		   sm:font-normal sm:text-sm
		   xs:font-light xs:text-sm
		   "
          >
            Бүгдийг үзэх
          </p>
          <IconChevronRight size={"1.1rem"} />
        </Link>
      </div>
      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        navigation
        modules={[Navigation, Pagination]}
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
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1080: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1280: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
        }}
        className="mySwiper mt-6"
      >
        {isLoading &&
          new Array(5)
            .fill(null)
            .map((e, index) => (
              <MySkeleton key={`product-skeleton-${index}`} />
            ))}
        {product &&
          product?.map((e, index) => (
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
