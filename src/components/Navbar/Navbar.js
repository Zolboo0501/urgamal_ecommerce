/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import {
  Autocomplete,
  Avatar,
  Badge,
  Button,
  Select,
  Tooltip,
  rem,
} from "@mantine/core";
import {
  IconCircleXFilled,
  IconHomeEco,
  IconPhotoOff,
  IconReportSearch,
  IconSearch,
  IconX,
} from "@tabler/icons-react";
import { getCookie, setCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useWishlist from "@/hooks/useWishlist";
import { fetchMethod, fetcher } from "@/utils/fetch";
import { getCart } from "@/utils/Store";
import { errorNotification, numberWithCommas } from "@/utils/utils";
import { useDebouncedValue } from "@mantine/hooks";
import useSWR from "swr";
import Notification from "../Notification/Notification";
import useUser from "@/hooks/useUser";
const Navbar = (props) => {
  const { address } = props;
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const wishlist = useWishlist();
  const [debounced] = useDebouncedValue(searchQuery, 250);
  const userContext = useUser();
  const [showSearch, setShowSearch] = useState(false);
  const [cartItem, setCartItem] = useState([]);
  const [userInfo, setUserInfo] = useState({
    name: "",
    picture: "",
    mobile: "",
  });
  const route = useRouter();
  const { data: categories, error: catsError } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/product/cats`,
    fetcher,
    {
      refreshInterval: 0,
    },
  );
  const { data, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/product?limit=${10}${
      debounced && `&query=${debounced}`
    }`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
    },
  );

  const suggestions = data
    ? data.map((e) => ({
        value: e?.name || "",
        id: e?.id || "",
        image: e?.additionalImage[0]?.url || "",

        balance: e?.balance || "",
        price: e?.listPrice || "",
      }))
    : [];

  useEffect(() => {
    mutate();
  }, [debounced]);

  const renderRemains = (balance) => {
    if (balance > 0) {
      const convertInt = parseInt(balance);
      if (convertInt > 10) {
        return (
          <Badge size="xs" color="teal">
            Хангалттай
          </Badge>
        );
      }
      if (convertInt <= 10 && convertInt > 0) {
        return <p className="text-xs font-semibold">{balance}</p>;
      }
    } else {
      return (
        <Badge size="xs" color="gray">
          Үлдэгдэлгүй
        </Badge>
      );
    }
  };
  // useEffect(() => {
  //   if (isMobile === true && catsLoading === false) {
  //     props.getValue(categories);
  //   }
  // }, [categories]);

  const renderOptionItem = ({ option }) => {
    const value = uniqueSuggestions?.filter(
      (item) => item?.value === option?.value,
    )?.[0];

    return (
      <div
        className="flex items-center gap-2 p-2 hover:rounded-md hover:bg-gray-100"
        key={value?.id}
      >
        <Avatar
          src={value?.image}
          alt="Зураг"
          size={"3rem"}
          className="shrink-0"
        >
          <IconPhotoOff stroke={1.5} size={16} color="#40C057" />
        </Avatar>
        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap">
            <p className="line-clamp-2 text-sm font-medium text-grey800 sm:text-base">
              {value?.value}
            </p>
          </div>
          <div className="flex flex-row items-center gap-2 md:gap-4 lg:gap-6">
            <div className="flex items-center">
              <p className="text-xs text-[#696A6C] sm:text-sm">Үнэ : </p>
              <p className="ml-1 text-start text-xs font-bold text-primary700 md:text-sm">
                {numberWithCommas(value?.price) || 0}₮
              </p>
            </div>
            <div className="flex items-center gap-1">
              <p className="text-xs text-[#696A6C] sm:text-sm">Үлдэгдэл : </p>
              {renderRemains(value?.balance)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const linkToCart = () => {
    router.push({
      pathname: "/cart/cartItem",
    });
  };

  const linkToHeart = () => {
    const token = getCookie("token");
    if (token) {
      router.push({
        pathname: "/profile",
        query: "wishlist",
      });
    } else {
      errorNotification({
        message: "Нэвтрэх шаардлагатай",

        icon: (
          <IconCircleXFilled
            style={{
              width: rem(30),
              height: rem(30),
            }}
          />
        ),
      });
      router.push("/login");
    }
  };

  const getUserInfo = async () => {
    const token = getCookie("token");
    if (token) {
      const data = await fetchMethod("GET", "user/profile", token);
      if (data.success) {
        setUserInfo({
          picture: data?.data?.picture,
          name: data?.data?.given_name,
          mobile: data?.data?.mobile,
        });
      } else {
        errorNotification({
          message: data?.message,

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
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("storage", () => {
        let data = getCart();
        if (data) {
          setCartItem(data);
        }
      });
    }
    let data = getCart();
    if (data) {
      setCartItem(data);
    }
    getUserInfo();
  }, []);

  const [userConfigValue, setUserConfigValue] = useState(
    userContext.preferenceConfig,
  );

  useEffect(() => {
    setUserConfigValue(userContext.configId);
  }, [userContext.preferenceConfig, userContext.configId]);

  const handleConfigSelection = (value) => {
    if (userConfigValue !== value) {
      setCookie("preference_config", value, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      route.reload();
    }
  };

  const ProfileButtonImage = () => {
    const token = getCookie("token");
    return (
      <>
        {userInfo?.picture ? (
          <Image
            alt="user"
            src={userInfo.picture}
            width={40}
            height={40}
            className="h-8 w-8 rounded-full"
          />
        ) : token ? (
          <Image
            alt="user"
            src="/farmer.png"
            width={40}
            height={40}
            className="h-8 w-8"
          />
        ) : (
          <Image
            alt="user"
            src="/user.png"
            width={40}
            height={40}
            className="h-8 w-8"
          />
        )}
      </>
    );
  };

  const TrolleyButtonImage = () => {
    return (
      <>
        <Image
          alt="trolley"
          src="/icons/trolley.svg"
          width={23}
          height={23}
          className="h-6 max-xs:w-6"
        />
        <div className="absolute">
          {cartItem?.cart_items?.length > 0 && (
            <div className="-mt-5 ml-5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary600 text-xs">
              <p className="text-sm-5 text-white">
                {cartItem?.cart_items && cartItem?.cart_items?.length}
              </p>
            </div>
          )}
        </div>
      </>
    );
  };

  const HearthButtonImage = () => {
    return (
      <>
        <Image
          alt="heart"
          src="/icons/hearth.svg"
          width={23}
          height={23}
          className="h-6 max-xs:w-6"
        />
        <div className="absolute">
          {wishlist.get.length > 0 && (
            <div className="-mt-5 ml-5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary600 text-xs">
              <p className="text-sm-5 text-white">{wishlist.get.length}</p>
            </div>
          )}
        </div>
      </>
    );
  };

  const uniqueSuggestions = suggestions.filter(
    (item, index, self) =>
      index === self.findIndex((t) => t.value === item.value),
  );

  return (
    <div
      className="sticky top-0 z-30 shadow"
      style={{
        backgroundColor: address?.header_color ? address?.header_color : "#fff",
      }}
    >
      <div className="flex items-center justify-between px-4 py-2 md:px-4 lg:px-8">
        {!showSearch && (
          <Link href={"/home"} className="flex flex-row items-center gap-2">
            <div className="font-open hidden text-base font-medium lg:block">
              ТАРИМАЛ
            </div>
            <div className="flex items-center justify-center">
              {userContext?.address?.logo ? (
                <Image
                  src={userContext?.address?.logo}
                  width={500}
                  height={500}
                  className="h-11 w-11 object-cover"
                  alt={userContext?.address?.logo}
                />
              ) : (
                <Image
                  src={"/logo.png"}
                  width={36}
                  height={36}
                  className="h-12 w-12"
                  alt={"logo"}
                />
              )}
            </div>
            <div className="font-open hidden font-medium lg:block">УРГАМАЛ</div>
          </Link>
        )}
        <div className="flex items-center justify-end gap-8 md:mx-2 md:flex-1 md:justify-center md:gap-3 lg:mx-4 lg:ml-6 lg:flex-grow">
          {catsError && <div>error</div>}
          {categories && (
            <Tooltip
              withArrow
              label="Танд зөвхөн уг төрлийн бараа, ангиллууд харагдана"
              className="md:block"
            >
              <Select
                size="md"
                radius="xl"
                value={userConfigValue}
                onChange={(value) => handleConfigSelection(value)}
                styles={() => ({
                  item: {
                    "&[data-selected]": {
                      "&, &:hover": {
                        backgroundColor: "#f9bc60",
                      },
                    },
                    "&[data-hovered]": {},
                  },
                })}
                data={
                  catsError
                    ? []
                    : categories?.map((e) => {
                        return {
                          value: e.id?.toString(),
                          label: e.name,
                        };
                      })
                }
                icon={
                  userConfigValue === "1" ? (
                    <IconHomeEco stroke={1.5} color="#204900" />
                  ) : (
                    <IconReportSearch stroke={1.5} color="#5E4333" />
                  )
                }
              />
            </Tooltip>
          )}

          {/* <div
            id="scroll"
            className="flex items-center justify-center w-[45%] hover:overflow-x-auto whitespace-nowrap pb-3 pt-3"
          >
            {catsLoading ? (
              <div>
                <Loader variant="dots" color="yellow" />
              </div>
            ) : (
              <>
                <NavBarLinks name={"Цэцэгчин"} />
                <NavBarLinks name={"Ногоочин"} />
                <NavBarLinks name={"Үйлдвэр"} />
                <NavBarLinks name={"Аж ахуйн нэгж"} />
              </>
            )}
          </div> */}
          <div className="hidden flex-grow pl-2 md:block">
            <Autocomplete
              className="w-full"
              size={"md"}
              placeholder="Хайлт хийх.."
              data={uniqueSuggestions ? uniqueSuggestions : []}
              renderOption={renderOptionItem}
              limit={7}
              radius={30}
              maxDropdownHeight={400}
              styles={{
                root: {
                  paddingRight: 0,
                },
                input: {
                  "::placeholder": {
                    fontSize: ".95rem",
                    color: "#344054",
                  },

                  paddingLeft: "1.5rem",
                  borderWidth: 1,
                  boxShadow:
                    "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
                },
                rightSection: {
                  margin: 0,
                  padding: 0,
                },
                dropdown: {
                  borderRadius: 15,
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
              onOptionSubmit={(option) => {
                const value = uniqueSuggestions?.filter(
                  (item) => item?.value === option,
                )?.[0];
                router.push({
                  pathname: "/product/[id]",
                  query: { id: value?.id },
                });
              }}
              rightSection={
                <button
                  className="m-auto h-full rounded-r-full bg-primary p-2 px-3.5 max-xs:flex max-xs:w-11 max-xs:items-center max-xs:justify-center max-xs:p-0 max-xs:px-0"
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
        </div>
        <div
          className={`flex flex-1 items-center md:hidden ${
            !showSearch && "justify-end"
          }`}
        >
          {showSearch && (
            <div className="my-[0.3rem] flex flex-1">
              <Autocomplete
                className="w-full"
                size={"sm"}
                placeholder="Хайлт хийх.."
                data={uniqueSuggestions ? uniqueSuggestions : []}
                renderOption={renderOptionItem}
                limit={7}
                radius={30}
                maxDropdownHeight={400}
                styles={{
                  root: {
                    paddingRight: 0,
                  },
                  input: {
                    "::placeholder": {
                      fontSize: ".95rem",
                      color: "#344054",
                    },
                    paddingLeft: "1.5rem",
                    borderWidth: 1,
                    boxShadow:
                      "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
                  },
                  rightSection: {
                    margin: 0,
                    padding: 0,
                  },
                  dropdown: {
                    borderRadius: 15,
                  },
                }}
                value={searchQuery}
                onChange={setSearchQuery}
                rightSection={
                  <button
                    onClick={() => {
                      setShowSearch(!showSearch);
                    }}
                  >
                    <IconX color="black" size="1.2rem" stroke={2.5} />
                  </button>
                }
                onKeyDown={(e) => {
                  if (e.code === "Enter") {
                    router.push({
                      pathname: "/products",
                      query: { q: searchQuery },
                    });
                  }
                }}
                onOptionSubmit={(option) => {
                  const value = uniqueSuggestions?.filter(
                    (item) => item?.value === option,
                  )?.[0];
                  router.push({
                    pathname: "/product/[id]",
                    query: { id: value?.id },
                  });
                }}
              />
            </div>
          )}
          {!showSearch && (
            <button
              className="rounded-full bg-primary p-2"
              onClick={() => {
                setShowSearch(!showSearch);
              }}
            >
              <IconSearch color="white" size="1.0rem" stroke={2.5} />
            </button>
          )}
        </div>
        <div className="flex items-center gap-4 max-xs:gap-2">
          <div className="hidden md:block">
            <Notification />
            <Button
              variant={"transparent"}
              onClick={() => linkToHeart()}
              styles={() => ({
                root: { paddingLeft: 0, paddingRight: rem(13), margin: 0 },
              })}
              className="mr-1"
              size="md"
              leftSection={<HearthButtonImage />}
            />
            <Button
              styles={() => ({
                root: { paddingLeft: 0, paddingRight: rem(0), margin: 0 },
              })}
              variant={"transparent"}
              onClick={() => linkToCart()}
              size="md"
              leftSection={<TrolleyButtonImage />}
            >
              <div className="ml-2 hidden flex-col gap-1 text-sm-2 font-regular text-[#000] lg:flex">
                Таны сагсанд
                <div className="font-open text-xs font-semibold text-primary700">
                  {numberWithCommas(cartItem?.total) || 0}₮
                </div>
              </div>
            </Button>
          </div>
          <div className="hidden md:block">
            <Button
              variant={"transparent"}
              styles={() => ({
                root: { padding: 0, margin: 0 },
              })}
              rightSection={<ProfileButtonImage />}
              onClick={() => {
                if (!userContext.auth) {
                  route.push("/login");
                } else {
                  route.push("/profile");
                }
              }}
            >
              {userContext.auth && (
                <div className="flex flex-col gap-1 text-sm-2 font-regular text-[#000]">
                  Сайн байна уу?
                  <div className="font-open text-xs font-semibold text-grey700">
                    {userInfo.name ? userInfo?.name : userInfo?.mobile}
                  </div>
                </div>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
