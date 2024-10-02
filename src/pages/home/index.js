/* eslint-disable react-hooks/exhaustive-deps */

import FacebookMsg from "@/components/FacebookMsg";
import SpecialDeal from "@/components/SpecialDeal";
import { useEffect } from "react";
import GlobalLayout from "../../components/GlobalLayout/GlobalLayout";
import Banner from "@/components/Banner";

export default function Home() {
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
        <div className="relative flex flex-col justify-between">
          <div className="flex flex-col lg:w-[100%]">
            {/* <FeatureProductList /> */}
            {/* <NewProduct /> */}
            <div className="hidden flex-col lg:flex lg:flex-row">
              {/* <div className="py-3 text-xxl h-[390px] overflow-x-hidden overflow-y-auto">
                {configId && categories && (
                  <AllCategory
                    categories={categories}
                    isLoading={categoriesLoading}
                  />
                )}
              </div> */}
              <div className="relative w-full">
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
            <div className="px-6">
              <SpecialDeal cols={5} className="mt-8" />
            </div>
          </div>
        </div>
      </div>
      <FacebookMsg />
    </GlobalLayout>
  );
}
