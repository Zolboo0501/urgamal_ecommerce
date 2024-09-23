import Image from "next/image";
import { useContext, useState } from "react";
import Link from "next/link";
import { ThemeIcon, rem } from "@mantine/core";
import CategoryHover from "./AllCategory/CategoryHover";
import useCategories from "@/hooks/useCategories";
import { IconChevronRight, IconPhotoOff } from "@tabler/icons-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { UserConfigContext } from "@/utils/userConfigContext";

const Banner = () => {
  const [hoveredCategory, setHoveredCategory] = useState([]);
  const [parentId, setParentId] = useState("");
  const [loading, setLoading] = useState(false);
  const categories = useCategories();
  const user = useContext(UserConfigContext);

  return (
    <div className="mt-10 flex relative mx-auto w-[100%] h-[320px] border  lg:h-[36rem] md:h-[20rem]">
      <div
        className="flex-row hidden relative lg:flex"
        onMouseLeave={() => {
          setHoveredCategory([]);
        }}
      >
        <div className="py-4 pl-4 pr-3 bg-white h-full  overscroll-contain overflow-y-auto">
          {categories &&
            categories?.categories?.map((item, idx) => {
              return (
                <Link
                  href={{
                    pathname: `/category/${item?.id}`,
                    query: { parent_id: item?.id },
                  }}
                  className="py-2 flex flex-row justify-between items-center hover:text-[#F9BC60]"
                  key={idx}
                  onMouseEnter={() => {
                    setHoveredCategory(item?.secondary_cats);
                    setParentId(item?.id);
                  }}
                >
                  <div className="flex felx-row items-center gap-5">
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
                  <div className="ml-10">
                    <IconChevronRight size={rem(16)} />
                  </div>
                </Link>
              );
            })}
        </div>
        {hoveredCategory?.length > 0 ? (
          <div className="z-10 absolute lg:left-[270px] xl:left-[285px] 2xl:left-[300px] 3xl:left-[310px] bg-white py-4 pr-6 h-full max-w-[45rem] overflow-auto flex flex-row items-center justify-start rounded-md">
            <CategoryHover
              parentId={parentId}
              setIsHovered={setHoveredCategory}
              categories={hoveredCategory}
              loading={loading}
            />
          </div>
        ) : null}
      </div>

      <Swiper
        navigation
        pagination={{
          dynamicBullets: true,
        }}
        loop={true}
        className="mySwiper"
        modules={[Navigation, Pagination]}
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
              <SwiperSlide key={index}>
                <Image
                  alt={item}
                  src={item}
                  fill
                  className="object-cover h-full w-full md:object-cover max-h-full lg:object-fill"
                  draggable={false}
                />
              </SwiperSlide>
            );
          })
        ) : (
          <div className="flex flex-col items-center gap-2 rounded-md">
            <ThemeIcon size="lg" variant="light" color="green">
              <IconPhotoOff size="80%" stroke={0.5} />
            </ThemeIcon>
            <p class="text-xs font-light text-gray-500">Your text here</p>
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
