/* eslint-disable react-hooks/exhaustive-deps */
import { UserConfigContext } from "@/utils/userConfigContext";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

import { getCart } from "@/utils/Store";
import { Drawer, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { openContextModal } from "@mantine/modals";
import {
  IconCategory2,
  IconHomeEco,
  IconShoppingCart,
  IconUserCircle,
} from "@tabler/icons-react";
import { getCookie } from "cookies-next";
import Link from "next/link";
import Category from "./AllCategory/category";

const BottomNavBar = () => {
  const router = useRouter();
  const userContext = useContext(UserConfigContext);
  const [cartItem, setCartItem] = useState();
  const userToken = getCookie("token");
  const [
    categoryDrawerOpened,
    { open: openCategoryDrawer, close: closeCategoryDrawer },
  ] = useDisclosure(false);

  const linkToCart = () => {
    router.push({
      pathname: "/cart/cartItem",
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("storage", () => {
        if (!userToken) {
          let data = getCart();
          if (data) {
            setCartItem(data);
          }
        }
      });
    }
    let data = getCart();
    if (data) {
      setCartItem(data);
    }
  }, []);

  return (
    <>
      <Drawer
        w={"100%"}
        padding={10}
        opened={categoryDrawerOpened}
        onClose={closeCategoryDrawer}
        title={<p class="text-xl font-light">Ангилал</p>}
        scrollAreaComponent={ScrollArea.Autosize}
      >
        <Category closeCategoryDrawer={closeCategoryDrawer} />
      </Drawer>
      <div className="block lg:hidden sticky bottom-0 z-50">
        <div className="relative">
          <div className="bg-white h-full">
            <div className="grid h-full max-w-lg grid-cols-4 mx-auto">
              <button
                type="button"
                className={`inline-flex flex-col items-center justify-center font-medium px-5 hover:bg-gray-50 group py-3`}
                onClick={openCategoryDrawer}
              >
                <IconCategory2 size={"1.5rem"} color="#475467" />
                <span className="text-sm text-grey700 font-medium">
                  Ангилал
                </span>
              </button>
              <button
                type="button"
                onClick={() => router.push("/home")}
                className={`inline-flex flex-col  items-center justify-center font-medium px-5 hover:bg-gray-50 group py-3 ${
                  router.pathname === "/home" && "border-t-3 border-primary"
                }`}
              >
                <IconHomeEco
                  size={"1.5rem"}
                  color={`${
                    router.pathname === "/home" ? "#2D7E39" : "#475467"
                  }`}
                />
                <span
                  className={`text-sm font-medium ${
                    router.pathname === "/home"
                      ? "text-primary600"
                      : "text-grey700"
                  }`}
                >
                  Нүүр
                </span>
              </button>
              <button
                onClick={() => linkToCart()}
                type="button"
                className={`inline-flex flex-col  items-center justify-center font-medium px-5 hover:bg-gray-50 group py-3 ${
                  router.pathname === "/cart/cartItem" &&
                  "border-t-3 border-primary"
                }`}
              >
                <div className="absolute">
                  <div className="w-5 h-5 bg-number flex justify-center items-center text-white -mt-8 rounded-full text-sm ml-8">
                    <p className="text-xs">
                      {cartItem?.cart_items ? cartItem?.cart_items?.length : 0}
                    </p>
                  </div>
                </div>
                <IconShoppingCart
                  size={"1.5rem"}
                  color={`${
                    router.pathname === "/cart/cartItem" ? "#2D7E39" : "#475467"
                  }`}
                />
                <span
                  className={`text-sm font-medium ${
                    router.pathname === "/cart/cartItem"
                      ? "text-primary600"
                      : "text-grey700"
                  }`}
                >
                  Сагс
                </span>
              </button>
              <button
                type="button"
                className={`inline-flex flex-col  items-center justify-center font-medium px-5 hover:bg-gray-50 group  ${
                  router.pathname === "/profile" && "border-t-3 border-primary"
                }`}
                onClick={() => {
                  if (!userContext.auth) {
                    openContextModal({
                      modal: "login",
                      title: (
                        <p class="text-sm font-normal">
                          Хэрэглэгч та өөрийн утасны дугаараар нэвтрэнэ үү
                        </p>
                      ),
                      centered: true,
                    });
                  } else {
                    router.push("/profile");
                  }
                }}
              >
                <IconUserCircle
                  size={"1.5rem"}
                  color={`${
                    router.pathname === "/profile" ? "#2D7E39" : "#475467"
                  }`}
                />
                <span
                  className={`text-sm font-medium ${
                    router.pathname === "/profile"
                      ? "text-primary600"
                      : "text-grey700"
                  }`}
                >
                  Профайл
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BottomNavBar;
