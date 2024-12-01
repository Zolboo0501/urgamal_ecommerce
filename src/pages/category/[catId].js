/* eslint-disable no-undef */
import CategoryLayout from "@/components/GlobalLayout/CategoryLayout";
import ProductCard from "@/components/ProductCard";
import ProductGridList from "@/components/ProductGridList/ProductGridList";
import useActivePage from "@/hooks/useActivePage";
import { PAGE_SIZE } from "@/utils/constant";
import { Pagination } from "@mantine/core";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useSWRInfinite from "swr/infinite";

const CategoryPage = () => {
  const router = useRouter();
  const { catId } = router.query;
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const { activePage, setActivePage } = useActivePage();

  const fetcher = async (url) => {
    try {
      const res = await axios.get(url, {
        headers: { "Content-Type": "application/json" },
      });
      return { data: res?.data?.result, total: res?.data?.meta?.total };
    } catch (error) {
      console.log("Error in fetcher", error);
    }
  };

  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && previousPageData.data?.length === 0) return null; // End of pagination
    return `${process.env.NEXT_PUBLIC_API_URL}/product?offset=${
      pageIndex * PAGE_SIZE
    }&limit=${PAGE_SIZE}&query=&categoryId=${catId}`;
  };

  const { data, setSize } = useSWRInfinite(getKey, fetcher, {
    revalidateFirstPage: false,
  });

  const initPage = () => {
    setSize(1);
    setActivePage(1);
  };

  function categoryPositioner() {
    var navbar = document.getElementById("category-menu");

    var sticky = navbar?.offsetTop;
    if (window.pageYOffset >= sticky) {
      navbar?.classList.add("fixed", "top-16");
    } else {
      navbar?.classList.remove("fixed", "top-16");
    }
  }

  const fetchMore = (page) => {
    setActivePage(page);
    setSize(page);
  };

  useEffect(() => {
    window.addEventListener("scroll", categoryPositioner);
    return () => {
      window.removeEventListener("scroll", categoryPositioner);
    };
  }, []);

  useEffect(() => {
    if (data?.length > 0 && data?.[0]?.data) {
      setLoading(true);
      setProducts(data?.[data?.length - 1]?.data);
      setLoading(false);
    }
  }, [data]);

  return (
    <CategoryLayout initPage={initPage}>
      <div className="flex-1">
        <div className="h-full px-4 md:px-5">
          <div className="flex h-full flex-row justify-between gap-10 py-6 md:py-6">
            <div
              className="flex h-full w-full flex-row"
              style={{ gap: "30px", flexWrap: "wrap" }}
              id={"content"}
            >
              <div className="flex flex-row items-center">
                <span className="text-xl text-grey600">Нийт бүтээгдэхүүн</span>
                <span className="ml-2 text-2xl font-bold text-primary">
                  {data?.length > 0 ? data?.[0]?.total : 0}
                </span>
              </div>

              <div className="flex w-full flex-col items-center">
                <ProductGridList
                  showSkeleton={loading}
                  emptyStateMessage="Ангиллын бараа олдсонгүй"
                  isEmpty={!products || products?.length === 0}
                >
                  {products?.length > 0 &&
                    products.map((e, index) => (
                      <ProductCard
                        key={`product-card-key-${index}-${e?.id}`}
                        src={e?.additionalImage?.[0]}
                        additionalImages={e.additionalImage?.slice(1)}
                        data={e}
                      />
                    ))}
                </ProductGridList>
                <div className="mt-8 flex items-center justify-center">
                  <Pagination
                    total={
                      data?.[0]?.total
                        ? Math.ceil(data[0].total / PAGE_SIZE)
                        : 0
                    }
                    color="teal"
                    radius="xl"
                    value={activePage}
                    siblings={2}
                    onChange={(value) => fetchMore(value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CategoryLayout>
  );
};

export default CategoryPage;
