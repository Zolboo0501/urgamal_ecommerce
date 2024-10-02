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
    <div className="relative flex flex-row justify-between px-12 py-2 max-sm:px-2">
      <button
        className="flex flex-row items-center justify-center gap-1 rounded-md bg-button-yellow px-3"
        onMouseEnter={() => setIsHovered(true)}
      >
        <Image
          src={"/icons/cube.svg"}
          width={20}
          height={24}
          className="object-contain"
          alt="cube"
        />
        <div className="font-open text-sm font-normal text-white">
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

      <div className="mx-12 hidden flex-grow md:block">
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
              className="m-auto h-full rounded-md bg-background-sort p-2 px-4 max-xs:flex max-xs:w-11 max-xs:items-center max-xs:justify-center max-xs:p-0 max-xs:px-0"
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
                className="max-xs:h-4 max-xs:w-4"
              />
            </button>
          }
        />
      </div>
      <div className="flex flex-row justify-center">
        <div className="flex flex-row items-center gap-2">
          <Image width={20} height={20} src={"/icons/phone.svg"} alt="phone" />
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
