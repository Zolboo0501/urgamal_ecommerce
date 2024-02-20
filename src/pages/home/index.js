/* eslint-disable react-hooks/exhaustive-deps */
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import GlobalLayout from "../../components/GlobalLayout/GlobalLayout";
import Banner from "../../components/banner";
import { useEffect, useCallback, useState, useContext } from "react";
import Preference_modal from "@/components/preference_modal/preference_modal";
import { UserConfigContext } from "@/utils/userConfigContext";
import { useDisclosure } from "@mantine/hooks";
import ProductListWithCategory from "@/components/ProductListWithCategory/ProductListWithCategory";
import useCategories from "@/hooks/useCategories";
import SpecialDeal from "@/components/SpecialDeal";

const PAGE_SIZE = 20;

export async function getStaticProps() {
  try {
    const requestOption = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    const specialDeal = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/product/specials`,
      requestOption
    );

    const dealData = await specialDeal.json();
    return {
      props: {
        dealData,
      },
    };
  } catch (error) {
    console.log(error, "error");
    return {
      props: {
        cats: [],
        dealData: [],
      },
    };
  }
}

export default function Home({ cats, dealData }) {
  const userConfigs = useContext(UserConfigContext);
  const { preference_cookie, configId } = userConfigs;
  const categories = useCategories();
  const [positionSticky, setPositionSticky] = useState(false);

  const [opened, { open, close }] = useDisclosure(true);

  const onScroll = useCallback((event) => {
    const { pageYOffset, scrollY, innerHeight } = window;
    const bottom = document.documentElement.scrollHeight;
    if (
      (pageYOffset >= 1308 || scrollY >= 1308) &&
      (pageYOffset < bottom - 800 || scrollY < bottom - 800)
    ) {
      setPositionSticky(true);
    } else {
      setPositionSticky(false);
    }
    if (innerHeight + Math.ceil(pageYOffset) >= document.body.offsetHeight) {
      setPositionSticky(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    window.dispatchEvent(new Event("storage"));
    // setProducts(data.result);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <GlobalLayout>
      {/* {!userConfigs.configId && (
        <Preference_modal
          close={close}
          open={open}
          opened={opened}
          preference_cookie={preference_cookie}
        />
      )} */}
      <div className="block lg:hidden">
        <Banner />
      </div>
      <div className="mb-16">
        <div className="flex flex-col justify-between relative">
          <div className="flex flex-col lg:w-[100%]">
            {/* <FeatureProductList /> */}
            {/* <NewProduct /> */}
            <div className="hidden lg:flex flex-col lg:flex-row">
              {/* <div className="py-3 text-xxl h-[390px] overflow-x-hidden overflow-y-auto">
                {configId && categories && (
                  <AllCategory
                    categories={categories}
                    isLoading={categoriesLoading}
                  />
                )}
              </div> */}
              <div className="relative  w-full">
                <Banner />
              </div>
            </div>
            {/* <div className="px-12">
              {configId &&
                cats?.success &&
                cats?.result?.categories.map((item, idx) => {
                  if (idx === 0) {
                    return (
                      <ProductListWithCategory
                        key={`list-with-category-${idx}`}
                        categoryId={item?.id}
                        categoryName={item?.name}
                        // categoryIcon={el?.icon}
                        cols={5}
                        className="mt-12"
                      />
                    );
                  }
                })}
            </div> */}
            <div className="px-12">
              {dealData &&
                dealData?.data &&
                dealData?.data.map((item, index) => {
                  return (
                    <SpecialDeal
                      key={`list-with-category-${index}`}
                      categoryId={item?.id}
                      categoryName={item?.name}
                      categoryIcon={item?.icon}
                      cols={5}
                      product={item}
                      className="mt-12"
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </GlobalLayout>
  );
}
