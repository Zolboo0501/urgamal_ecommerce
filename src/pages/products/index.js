/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import ProductGridList from "@/components/ProductGridList/ProductGridList";
import { PAGE_SIZE } from "@/utils/constant";
import { fetchMethod } from "@/utils/fetch";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
// import { Virtuoso, VirtuosoGrid } from "react-virtuoso";
import CategoryLayout from "@/components/GlobalLayout/CategoryLayout";
import ProductCard from "@/components/ProductCard";
import { Pagination } from "@mantine/core";
import axios from "axios";
import useSWRInfinite from "swr/infinite";

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
  const [activePage, setActivePage] = useState(1);
  const fetcher = async (url) =>
    axios
      .get(url, { headers: { "Content-Type": "application/json" } })
      .then((res) => {
        return { data: res?.data?.result, total: res.data?.meta?.total };
      })
      .catch((error) => console.log(error, "err in fetcher"));

  const { data, setSize, isLoading } = useSWRInfinite(
    (index) =>
      `${process.env.NEXT_PUBLIC_API_URL}/product?offset=${
        (index + 1) * 20
      }&limit=${PAGE_SIZE}`,
    fetcher,
    { revalidateFirstPage: false },
  );

  const isEmpty = products?.[0]?.length === 0;

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
      setProducts(data?.[data?.length - 1]?.data);
      setTotal(data?.[data?.length - 1]?.total);
      // setProducts(data?.[data?.length - 1]);
    } else {
      setProducts(initialData?.result);
      setTotal(initialData?.meta?.total);
    }
  }, [data]);

  const fetchMore = (value) => {
    setSize(value);
  };

  useEffect(() => {
    setProducts(initialData?.result);
    setTotal(initialData?.pagination?.total);
  }, []);

  return (
    <CategoryLayout>
      <div className="flex min-h-screen w-full gap-6 px-10 py-12">
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
          <div className="mt-8 flex items-center justify-center">
            <Pagination
              total={total / 20 + 1}
              color="teal"
              radius="xl"
              value={activePage}
              onChange={(value) => {
                setActivePage(value);
                fetchMore(value - 1);
              }}
              siblings={2}
            />
          </div>
        </div>
      </div>
    </CategoryLayout>
  );
}
