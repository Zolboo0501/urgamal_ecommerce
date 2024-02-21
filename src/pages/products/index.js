/* eslint-disable react-hooks/exhaustive-deps */
import ProductGridList from "@/components/ProductGridList/ProductGridList";
import ProductCard from "@/components/product-card";
import { PAGE_SIZE } from "@/utils/constant";
import { fetchMethod, fetcher, getCategory } from "@/utils/fetch";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
// import { Virtuoso, VirtuosoGrid } from "react-virtuoso";
import useSWRInfinite from "swr/infinite";
import { Button } from "@mantine/core";
import CategoryLayout from "@/components/GlobalLayout/CategoryLayout";

export async function getServerSideProps() {
  const data = await fetchMethod("GET", "product");
  return {
    props: {
      initialData: data,
    },
  };
}

export default function SearchResult({ initialData }) {
  const router = useRouter();
  const { q } = router.query;
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const { data, size, setSize, isValidating, isLoading } = useSWRInfinite(
    (index) =>
      `${process.env.NEXT_PUBLIC_API_URL}/product?offset=${
        index * 20
      }&limit=${PAGE_SIZE}`,
    fetcher,
    { revalidateFirstPage: false }
  );

  const isEmpty = products?.[0]?.length === 0;

  const [isFetch, setIsFetch] = useState(false);

  // useEffect(() => {
  //   if (isFetch) {
  //     setSize((prevSize) => prevSize + 1);
  //   }
  // }, [isFetch]);

  // useEffect(() => {
  //   window.addEventListener("scroll", infiniteScroll);
  //   return () => window.removeEventListener("scroll", infiniteScroll);
  // }, [data]);

  // useEffect(() => {
  //   if (data?.length > 0 && !isEmpty) {
  //     setProducts(products.concat(...data[data.length - 1]));
  //     setIsFetch(false);
  //   }
  //   // data && !isEmpty && setProducts(products.concat(...data.result));
  // }, [data]);

  useEffect(() => {
    if (data?.length > 0) {
      setProducts(products.concat(data?.[data?.length - 1]));
    }
  }, [data]);

  const fetchMore = () => {
    if (total !== products?.length) {
      setSize(size + 1);
    }
  };

  useEffect(() => {
    setProducts(initialData?.result);
    setTotal(initialData?.pagination?.total);
  }, []);

  return (
    <CategoryLayout>
      <div className="flex w-full min-h-screen px-10 py-12 gap-6">
        {/* //! todo */}
        {/* <div className="min-w-[350px] w-[350px] max-w-[350px] hidden lg:block relative">
        </div> */}
        <div className="flex flex-col">
          <ProductGridList
            showSkeleton={isLoading}
            isEmpty={isEmpty}
            emptyStateMessage="хайлтад тохирох бараа олдсонгүй"
            query={q}
          >
            {products?.map((e, index) => {
              return (
                <ProductCard
                  key={`product-card-key-${index}-${e?.id}`}
                  src={e?.additionalImage?.[0]}
                  additionalImages={e.additionalImage?.slice(1)}
                  data={e}
                />
              );
            })}
          </ProductGridList>
          {total !== products?.length && (
            <div className="flex justify-center items-center mt-8">
              <Button
                variant="outline"
                color="yellow"
                onClick={() => fetchMore()}
              >
                Цааш үзэх
              </Button>
            </div>
          )}
        </div>
      </div>
    </CategoryLayout>
  );
}
