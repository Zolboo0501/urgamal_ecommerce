/* eslint-disable react-hooks/exhaustive-deps */
import CategoryLayout from "@/components/GlobalLayout/CategoryLayout";
import ProductCard from "@/components/ProductCard";
import ProductGridList from "@/components/ProductGridList/ProductGridList";
import { PAGE_SIZE } from "@/utils/constant";
import { fetchMethod } from "@/utils/fetch";
import { Pagination } from "@mantine/core";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWRInfinite from "swr/infinite";
export async function getServerSideProps({ query }) {
  const { catId } = query;
  try {
    const data = await fetchMethod(
      "GET",
      `product?offset=0&limit=${PAGE_SIZE}&query=&categoryId=${catId}`,
    );

    return {
      props: {
        initialData: data,
      },
    };
  } catch (err) {
    console.log(err, "err");
    return {
      props: {
        initialData: [],
      },
    };
  }
}

const CategoryPage = ({ initialData }) => {
  const router = useRouter();
  const { catId } = router.query;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const fetcher = async (url) =>
    axios
      .get(url, { headers: { "Content-Type": "application/json" } })
      .then((res) => {
        return { data: res?.data?.result, total: res.data?.meta?.total };
      })
      .catch((error) => console.log(error, "err in fetcher"));

  const { data, size, setSize, isLoading, isValidating } = useSWRInfinite(
    (index) =>
      `${process.env.NEXT_PUBLIC_API_URL}/product?offset=${
        (index + 1) * 20
      }&limit=${PAGE_SIZE}&query=&categoryId=${catId}`,
    fetcher,
    { revalidateFirstPage: false },
  );

  const isEmpty = products?.length === 0;
  const fetchMore = async (value) => {
    setLoading(true);
    setSize(value);
    setLoading(false);
  };

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

  useEffect(() => {
    setSize(0);
    setActivePage(1);
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

  const calculateTotal = () => {
    let page = total / 20;
    const pageMore = total % 20;
    return pageMore > 0 ? page + 1 : page;
  };
  return (
    <CategoryLayout>
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
                  {total}
                </span>
              </div>

              <div className="flex w-full flex-col items-center">
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
                <div className="mt-8 flex items-center justify-center">
                  <Pagination
                    total={calculateTotal()}
                    color="yellow"
                    radius="xl"
                    value={activePage}
                    siblings={2}
                    onChange={(value) => {
                      setActivePage(value);
                      fetchMore(value - 1);
                    }}
                  />
                </div>
                {/* {total !== products?.length && (
                  <div className="flex justify-center items-center mt-8">
                    <Button
                      variant="outline"
                      color="yellow"
                      onClick={() => fetchMore()}
                    >
                      Цааш үзэх
                    </Button>
                  </div>
                )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </CategoryLayout>
  );
};

export default CategoryPage;
