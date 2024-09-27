/* eslint-disable jsx-a11y/alt-text */
import { htmlFrom } from "@/utils/constant";
import { Autocomplete, rem } from "@mantine/core";
import { IconCircleXFilled, IconSearch } from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CategoryHover from "../AllCategory/CategoryHover";
import { fetchMethod } from "@/utils/fetch";
import { showNotification } from "@mantine/notifications";

const NavbarBottom = ({
  AutocompleteItem,
  suggestions,
  searchQuery,
  setSearchQuery,
  address,
}) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const getCats = async () => {
    setLoading(true);
    const data = await fetchMethod("GET", "product/cat-list");
    if (data.success) {
      setCategories(data.categories);
    } else {
      showNotification({
        message: data.message,
        color: "red",
        icon: (
          <IconCircleXFilled
            style={{
              width: rem(30),
              height: rem(30),
            }}
          />
        ),
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    getCats();
  }, []);

  return (
    <div className="py-2 px-12 max-sm:px-2 flex flex-row justify-between relative">
      <button
        className="flex flex-row bg-button-yellow items-center justify-center rounded-md gap-1 px-3"
        onMouseEnter={() => setIsHovered(true)}
      >
        <Image
          src={"/icons/cube.svg"}
          width={20}
          height={24}
          className="object-contain"
        />
        <div className="font-open text-white font-normal text-sm">
          Бүх ангилал
        </div>
      </button>
      {isHovered && (
        <CategoryHover
          setIsHovered={setIsHovered}
          categories={categories}
          loading={loading}
        />
      )}

      <div className="hidden md:block flex-grow mx-12">
        <Autocomplete
          className="w-full"
          size={"md"}
          placeholder="Хүссэн бараагаа хайгаарай.."
          itemComponent={AutocompleteItem}
          data={suggestions ? suggestions : []}
          limit={10}
          styles={{
            root: {
              paddingRight: 0,
              borderRadius: 6,
              flexGrow: 1,
            },
            input: {
              borderRadius: 6,
              "::placeholder": {
                fontSize: ".95rem",
              },
            },
            rightSection: {
              margin: 0,
              padding: 0,
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
          rightSection={
            <button
              className="m-auto h-full  bg-background-sort p-2 px-4 rounded-md max-xs:w-11 max-xs:flex max-xs:items-center max-xs:justify-center max-xs:p-0 max-xs:px-0 "
              onClick={() => {
                router.push({
                  pathname: "/products",
                  query: { q: searchQuery },
                });
              }}
            >
              <IconSearch
                color="white"
                size="1.2rem"
                stroke={2.5}
                className="max-xs:w-4 max-xs:h-4"
              />
            </button>
          }
        />
      </div>
      <div className="flex flex-row justify-center">
        <div className="flex flex-row gap-2 items-center">
          <Image width={20} height={20} src={"/icons/phone.svg"} />
          <div
            className="text-sm"
            dangerouslySetInnerHTML={{ __html: htmlFrom(address?.contact) }}
          />
        </div>
      </div>
    </div>
  );
};

export default NavbarBottom;
