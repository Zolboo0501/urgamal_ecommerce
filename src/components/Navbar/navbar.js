/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Autocomplete,
  Avatar,
  Button,
  Group,
  Select,
  Tooltip,
  rem,
  Badge,
} from "@mantine/core";
import {
  IconCircleXFilled,
  IconHomeEco,
  IconPhotoOff,
  IconReportSearch,
  IconSearch,
} from "@tabler/icons-react";
import { getCookie, setCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { forwardRef, useContext, useEffect, useState } from "react";

import useWishlist from "@/hooks/useWishlist";
import { fetchMethod, fetcher } from "@/utils/fetch";
import { getCart } from "@/utils/Store";
import { UserConfigContext } from "@/utils/userConfigContext";
import { useDebouncedValue } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { isMobile } from "react-device-detect";
import useSWR from "swr";
import Notification from "../Notification/Notification";
import { numberWithCommas } from "@/utils/utils";
const Navbar = (props) => {
  const { address } = props;
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const wishlist = useWishlist();
  const [debounced] = useDebouncedValue(searchQuery, 250);
  const userContext = useContext(UserConfigContext);
  const [showSearch, setShowSearch] = useState(false);
  const [cartItem, setCartItem] = useState([]);
  const [userInfo, setUserInfo] = useState({
    name: "",
    picture: "",
    mobile: "",
  });
  const route = useRouter();
  const {
    data: categories,
    error: catsError,
    isLoading: catsLoading,
  } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/product/cats`, fetcher, {
    refreshInterval: 0,
  });
  const { data, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/product?limit=${10}${
      debounced && `&query=${debounced}`
    }`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
    }
  );

  const suggestions = data
    ? data?.map((e) => {
        return {
          value: e?.name || "",
          id: e?.id || "",
          image: e?.additionalImage[0]?.url || "",
          description: e?.description || "",
          balance: e?.balance || "",
          price: e?.listPrice || "",
        };
      })
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
        return <p className="text-xs font-semibold ">{balance}</p>;
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

  // eslint-disable-next-line react/display-name
  const AutocompleteItem = forwardRef(
    ({ image, value, balance, price, ...others }, ref) => {
      return (
        <div
          ref={ref}
          style={{ padding: "10px", marginTop: "5px" }}
          className=" hover:cursor-pointer hover:bg-gray-100 hover:rounded-md"
          {...others}
        >
          <Group noWrap>
            <Avatar src={image} alt="Зураг">
              <IconPhotoOff stroke={1.5} size={16} color="#40C057" />
            </Avatar>
            <div>
              <p className="font-medium text-grey800">{value}</p>
              <div className="flex flex-row items-center gap-6">
                <div className="flex items-center">
                  <p className="text-[#696A6C]  text-xs">Үнэ : </p>
                  <p className="text-xs ml-1 text-start text-primary700 font-bold ">
                    {numberWithCommas(price) || 0}₮
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="text-[#696A6C] text-xs">Үлдэгдэл : </p>
                  {renderRemains(balance)}
                </div>
              </div>
            </div>
          </Group>
        </div>
      );
    }
  );

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
      showNotification({
        message: "Нэвтрэх шаардлагатай",
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
        showNotification({
          message: data?.message,
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
    userContext.preferenceConfig
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
        {userInfo.picture ? (
          <Image
            alt="user"
            src={userInfo.picture}
            width={40}
            height={40}
            className="w-8 h-8 rounded-full"
          />
        ) : token ? (
          <Image
            alt="user"
            src="/farmer.png"
            width={40}
            height={40}
            className="w-8 h-8"
          />
        ) : (
          <Image
            alt="user"
            src="/user.png"
            width={40}
            height={40}
            className="w-8 h-8"
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
          className="max-xs:w-6 h-6"
        />
        <div className="absolute">
          {cartItem?.cart_items?.length > 0 && (
            <div className="w-3.5 h-3.5 bg-primary600 flex justify-center items-center -mt-5 rounded-full text-xs ml-5">
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
          className="max-xs:w-6 h-6"
        />
        <div className="absolute">
          {wishlist.get.length > 0 && (
            <div className="w-3.5 h-3.5 bg-primary600 flex justify-center items-center -mt-5 rounded-full text-xs ml-5">
              <p className="text-sm-5 text-white">{wishlist.get.length}</p>
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <div
      className="sticky top-0 z-30 shadow"
      style={{
        backgroundColor: address?.header_color ? address?.header_color : "#fff",
      }}
    >
      <div className="flex justify-between items-center py-2 px-12 max-sm:px-2">
        <Link href={"/home"} className="flex flex-row items-center gap-2">
          <div className="font-open hidden lg:block font-medium">ТАРИМАЛ</div>
          <div className="flex justify-center items-center ">
            {userContext?.address?.logo ? (
              <Image
                src={userContext?.address?.logo}
                width={42}
                height={42}
                className="w-12 h-12"
                alt={userContext?.address?.logo}
              />
            ) : (
              <Image
                src={"/logo.png"}
                width={36}
                height={36}
                className="w-12 h-12"
                alt={"logo"}
              />
            )}
          </div>
          <div className="font-open hidden lg:block font-medium">УРГАМАЛ</div>
        </Link>
        <div className="flex justify-end md:justify-center items-center gap-8 md:gap-3 flex-grow ml-6 md:mx-11">
          {catsError && <div>error</div>}
          {categories && (
            <Tooltip
              withArrow
              label="Танд зөвхөн уг төрлийн бараа, ангиллууд харагдана"
              className=" md:block"
            >
              <Select
                // variant="filled"
                size="md"
                radius="xl"
                value={userConfigValue}
                onChange={(value) => handleConfigSelection(value)}
                // rightSection={<IconArrowsExchange2 size="1rem" />}
                // rightSectionWidth={30}
                // styles={{ rightSection: { pointerEvents: "none" } }}
                styles={(theme) => ({
                  item: {
                    "&[data-selected]": {
                      "&, &:hover": {
                        backgroundColor: "#f9bc60",
                      },
                    },

                    // applies styles to hovered item (with mouse or keyboard)
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
          <div className="hidden md:block flex-grow">
            <Autocomplete
              className="w-full"
              size={"md"}
              placeholder="Хайлт хийх.."
              itemComponent={AutocompleteItem}
              data={suggestions ? suggestions : []}
              limit={7}
              radius={30}
              styles={{
                root: {
                  paddingLeft: isMobile ? "0px" : "5px",
                  paddingRight: 0,
                },
                input: {
                  "::placeholder": {
                    fontSize: ".95rem",
                    color: "#344054",
                  },
                  paddingLeft: "1.5rem",
                  borderWidth: 0,
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
              onItemSubmit={({ id }) =>
                router.push({
                  pathname: "/product/[id]",
                  query: { id },
                })
              }
              rightSection={
                <button
                  className="m-auto h-full  bg-primary rounded-r-full p-2 px-3.5 max-xs:w-11 max-xs:flex max-xs:items-center max-xs:justify-center max-xs:p-0 max-xs:px-0 "
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
        </div>
        <div className="block md:hidden">
          <button
            className="w-full m-auto h-full bg-background-sort p-3 rounded-full max-xs:w-11 max-xs:h-11 max-xs:flex max-xs:items-center max-xs:justify-center max-xs:p-0 max-xs:px-0 "
            onClick={() => {
              setShowSearch(!showSearch);
            }}
          >
            <IconSearch
              color="white"
              size="1.2rem"
              stroke={2.5}
              className="max-xs:w-4 max-xs:h-4"
            />
          </button>
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
              leftIcon={<HearthButtonImage />}
            />
            <Button
              styles={() => ({
                root: { paddingLeft: 0, paddingRight: rem(0), margin: 0 },
              })}
              variant={"transparent"}
              onClick={() => linkToCart()}
              leftIcon={<TrolleyButtonImage />}
            >
              <div className="hidden lg:flex flex-col font-regular text-sm-2 text-[#000] gap-1 ml-2">
                Таны сагсанд
                <div className="font-open font-semibold text-xs text-primary700">
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
              leftIcon={<ProfileButtonImage />}
              onClick={() => {
                if (!userContext.auth) {
                  route.push("/login");
                } else {
                  route.push("/profile");
                }
              }}
            >
              {userContext.auth && (
                <div className="flex flex-col font-regular text-sm-2 text-[#000] gap-1">
                  Сайн байна уу?
                  <div className="font-open font-semibold text-xs text-grey700">
                    {userInfo.name ? userInfo?.name : userInfo?.mobile}
                  </div>
                </div>
              )}
            </Button>
          </div>
        </div>
      </div>
      <div>
        {showSearch && (
          <div>
            <Autocomplete
              className="w-full"
              size={"md"}
              placeholder="Бараа хайх..."
              itemComponent={AutocompleteItem}
              data={suggestions ? suggestions : []}
              limit={10}
              styles={{
                root: {
                  paddingLeft: isMobile ? "0px" : "5px",
                  paddingRight: 0,
                  borderRadius: 25,
                  flexGrow: 4,
                },
                input: {
                  "::placeholder": {
                    fontSize: ".95rem",
                  },
                  borderWidth: "3px",
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
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
