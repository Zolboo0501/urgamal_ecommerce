/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import useSWRInfinite from "swr/infinite";
import ProductCard from "@/components/product-card";
import ProductGridList from "@/components/ProductGridList/ProductGridList";
import { Breadcrumbs, Button, rem } from "@mantine/core";
import { fetchMethod, fetcher, getCategory } from "@/utils/fetch";
import { PAGE_SIZE } from "@/utils/constant";
import CategoryLayout from "@/components/GlobalLayout/CategoryLayout";

export async function getServerSideProps({ query }) {
  const { catId } = query;

  const data = await fetchMethod(
    "GET",
    `product?offset=0&limit=${PAGE_SIZE}&query=&categoryId=${catId}`
  );
  return {
    props: {
      initialData: data,
    },
  };
}

const CategoryPage = ({ initialData }) => {
  const router = useRouter();
  const { catId } = router.query;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const { data, size, setSize, isLoading, isValidating } = useSWRInfinite(
    (index) =>
      `${process.env.NEXT_PUBLIC_API_URL}/product?offset=${
        (index + 1) * 20
      }&limit=${PAGE_SIZE}&query=&categoryId=${catId}`,
    fetcher,
    { revalidateFirstPage: false }
  );

  const isEmpty = products?.length === 0;
  const fetchMore = async () => {
    setLoading(true);
    if (total !== products?.length) {
      setSize(size + 1);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (data?.length > 0) {
      setProducts(products.concat(data?.[data?.length - 1]));
    }
  }, [data]);

  useEffect(() => {
    setSize(0);
  }, [catId]);

  useEffect(() => {
    setLoading(true);
    setProducts(initialData?.result);
    setLoading(false);
    setTotal(initialData?.meta?.total);
  }, [initialData]);

  function categoryPositioner() {
    var navbar = document.getElementById("category-menu");
    var content = document.getElementById("content");
    var sticky = navbar?.offsetTop;
    if (window.pageYOffset >= sticky) {
      navbar?.classList.add("fixed", "top-16");
    } else {
      navbar?.classList.remove("fixed", "top-16");
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", categoryPositioner);
    return () => {
      window.removeEventListener("scroll", categoryPositioner);
    };
  }, []);

  return (
    <CategoryLayout>
      <div className="flex-1">
        <div className="px-4 md:px-5 h-full">
          <div className="h-full flex flex-row py-6 md:py-6 justify-between gap-10">
            <div
              className="flex flex-row w-full h-full"
              style={{ gap: "30px", flexWrap: "wrap" }}
              id={"content"}
            >
              {/* <div className="flex flex-row justify-between w-full">
                <div className="flex flex-row items-center"></div>
                <div className="flex justify-center items-center bg-white flex-row  px-4 py-2">
                  <p className="font-semibold text-sm text-[#3E503C]">
                    Эрэмбэлэх
                  </p>
                  <Image
                    width={13}
                    height={13}
                    src={'/icons/arrow-down-outline.svg'}
                    className="ml-2 mt-1"
                    alt="arrow-down"
                  />
                </div>
              </div> */}
              <div className="flex flex-col w-full">
                <ProductGridList
                  showSkeleton={loading}
                  emptyStateMessage="Ангиллын бараа олдсонгүй"
                  isEmpty={isEmpty}
                >
                  {products?.map((e, index) => (
                    <ProductCard
                      key={`product-card-key-${index}-${e?.id}`}
                      src={e?.additionalImage?.[0]}
                      additionalImages={e.additionalImage?.slice(1)}
                      data={e}
                    />
                  ))}
                </ProductGridList>
                {console.log(total, "total")}
                {console.log(products?.length, "length")}
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
          </div>
        </div>
      </div>
    </CategoryLayout>
  );
};

export default CategoryPage;
