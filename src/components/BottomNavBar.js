import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
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
import Category from "./AllCategory/Category";
import useUser from "@/hooks/useUser";

const BottomNavBar = () => {
  const router = useRouter();
  const userContext = useUser();
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
        title={<p className="text-xl font-light">Ангилал</p>}
        scrollAreaComponent={ScrollArea.Autosize}
      >
        <Category closeCategoryDrawer={closeCategoryDrawer} />
      </Drawer>
      <div className="sticky bottom-0 z-50 block lg:hidden">
        <div className="relative">
          <div className="h-full bg-white">
            <div className="mx-auto grid h-full max-w-lg grid-cols-4">
              <button
                type="button"
                className={`group inline-flex flex-col items-center justify-center px-5 py-3 font-medium hover:bg-gray-50`}
                onClick={openCategoryDrawer}
              >
                <IconCategory2 size={"1.5rem"} color="#475467" />
                <span className="text-sm font-medium text-grey700">
                  Ангилал
                </span>
              </button>
              <button
                type="button"
                onClick={() => router.push("/home")}
                className={`group inline-flex flex-col items-center justify-center px-5 py-3 font-medium hover:bg-gray-50 ${
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
                className={`group inline-flex flex-col items-center justify-center px-5 py-3 font-medium hover:bg-gray-50 ${
                  router.pathname === "/cart/cartItem" &&
                  "border-t-3 border-primary"
                }`}
              >
                <div className="absolute">
                  <div className="-mt-8 ml-8 flex h-5 w-5 items-center justify-center rounded-full bg-number text-sm text-white">
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
                className={`group inline-flex flex-col items-center justify-center px-5 font-medium hover:bg-gray-50 ${
                  router.pathname === "/profile" && "border-t-3 border-primary"
                }`}
                onClick={() => {
                  if (!userContext.auth) {
                    openContextModal({
                      modal: "login",
                      title: (
                        <p className="text-sm font-normal">
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
