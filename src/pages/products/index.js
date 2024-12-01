/* eslint-disable no-undef */
import ProductGridList from "@/components/ProductGridList/ProductGridList";
import { PAGE_SIZE } from "@/utils/constant";
import React, { useEffect, useState } from "react";
import CategoryLayout from "@/components/GlobalLayout/CategoryLayout";
import ProductCard from "@/components/ProductCard";
import { Pagination } from "@mantine/core";
import axios from "axios";
import useSWRInfinite from "swr/infinite";

export default function SearchResult() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [activePage, setActivePage] = useState(1);

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
    }&limit=${PAGE_SIZE}`;
  };

  const { data, setSize } = useSWRInfinite(getKey, fetcher, {
    revalidateFirstPage: false,
  });

  useEffect(() => {
    if (data?.length > 0 && data?.[0]?.data) {
      setLoading(true);
      setProducts(data?.[data?.length - 1]?.data);
      setLoading(false);
    }
  }, [data]);

  const initPage = () => {
    setSize(1);
    setActivePage(1);
  };

  const fetchMore = (page) => {
    setActivePage(page);
    setSize(page);
  };

  return (
    <CategoryLayout initPage={initPage}>
      <div className="flex min-h-screen w-full gap-6 px-10 py-12">
        <div className="flex flex-col">
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
                data?.[0]?.total ? Math.ceil(data[0].total / PAGE_SIZE) : 0
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
    </CategoryLayout>
  );
}
