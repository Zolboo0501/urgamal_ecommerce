/* eslint-disable react-hooks/exhaustive-deps */
import { fetcher } from "@/utils/fetch";
import { Autocomplete, Avatar, Group } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconPackage, IconSearch } from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/router";
import { forwardRef, useEffect, useState } from "react";
import useSWR from "swr";

const Search = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [debounced] = useDebouncedValue(searchQuery, 250);
  // const [data, setData] = useState()

  const { data, error, isLoading, mutate, isValidating } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/product?limit=${10}&query=${debounced}`,
    fetcher
  );

  const suggestions = data
    ? data.map((e) => {
        return {
          value: e.name,
          id: e.id,
          image: e.product_image?.images?.[0],
          description: e.description,
        };
      })
    : [];

  useEffect(() => {
    mutate();
  }, [debounced]);

  // eslint-disable-next-line react/display-name
  const AutocompleteItem = forwardRef(({ image, value, ...others }, ref) => {
    return (
      <div
        ref={ref}
        style={{ padding: "10px", marginTop: "5px" }}
        className=" hover:cursor-pointer hover:bg-gray-100 hover:rounded-md"
        {...others}
      >
        <Group noWrap>
          <Avatar src={image} alt="Зураг">
            {" "}
            <IconPackage stroke={1.5} />
          </Avatar>
          <div>
            <p>{value}</p>
          </div>
        </Group>
      </div>
    );
  });
  return (
    <div className="py-2 px-10 flex flex-row justify-center w-full">
      {/* <div
        className="flex flex-row px-4 bg-background-sort py-2 justify-center items-center w-max"
        style={{ borderRadius: "4.34402px" }}
      >
        <IconCategory color="white" size="1.5rem" stroke={1.8} />
        <p className=" text-white ml-2 font-semibold text-base">Бүх ангилал</p>
      </div> */}
      <div className=" bg-search-background rounded-md ml-4 flex flex-row py-1 justify-between flex-grow max-w-[40%]">
        {/* <div
          className="flex justify-center items-center flex-row px-4 my-1"
          style={{ borderRight: "1px solid rgba(0, 30, 29, 0.14)" }}
        >
          <p className="text-sm">Бүгд</p>
          <Image
            src="/icons/arrow-down-outline.svg"
            width={8}
            height={13}
            className="ml-1"
          />
        </div> */}

        <Autocomplete
          className="navbar-input"
          placeholder="Хүссэн бараагаа хайгаарай.."
          itemComponent={AutocompleteItem}
          data={suggestions ? suggestions : []}
          limit={10}
          styles={{
            root: {
              paddingLeft: "5px",
              paddingRight: "5px",
            },
            dropdown: {
              maxHeight: "350px",
              overflow: "auto",
            },
            input: {
              border: "none",
              backgroundColor: "rgba(235, 239, 238, 0.9);",
            },
          }}
          value={searchQuery}
          onChange={setSearchQuery}
          onKeyDown={(e) => {
            if (e.code === "Enter") {
              router.push({
                pathname: "/products",
                query: { q: searchQuery },
              });
            }
          }}
          onItemSubmit={({ id }) =>
            router.push({
              pathname: "/product/[id]",
              query: { id },
            })
          }
          // filter={(value, item) =>
          //   item.value.toLowerCase().includes(value.toLowerCase().trim()) ||
          //   item.description.toLowerCase().includes(value.toLowerCase().trim())
          // }
          // onFocus={mutate}
        />
        <button
          className="flex justify-center items-center bg-background-sort p-2 rounded-md mr-1"
          onClick={() => {
            router.push({
              pathname: "/products",
              query: { q: searchQuery },
            });
          }}
        >
          <IconSearch color="white" size="1.2rem" />
        </button>
      </div>
      <div className="flex flex-row justify-end  w-max">
        {/* <div className="flex gap-10">
          <div className="flex flex-row items-center">
            <Image src="/icons/sales.svg" width={25} height={25} />
            <p className="ml-2 text-sm">Онцлох хямдрал</p>
          </div>
          <div className="flex flex-row items-center">
            <Image src="/icons/new-prod.svg" width={25} height={25} />
            <p className="ml-2 text-sm">Шинэ бүтээгдэхүүн</p>
          </div>
        </div> */}
        <div className="flex flex-row items-center">
          <Image src="/icons/phone.svg" width={25} height={25} alt="phone" />
          <p className="ml-2 text-sm text-green">72720808 </p>
          <p
            className="text-sm font-light ml-1 text-[#696A6C] hover:text-black hover:font-semibold "
            onClick={() => router.push("/location")}
          >
            / Байршил
          </p>
        </div>
      </div>
    </div>
  );
};

export default Search;
