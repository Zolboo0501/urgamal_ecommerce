import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { UserConfigContext } from "@/utils/userConfigContext";
import Link from "next/link";
import { openContextModal } from "@mantine/modals";
import {
  IconShoppingCart,
  IconHomeEco,
  IconCategory2,
  IconUserCircle,
} from "@tabler/icons-react";
import axios from "axios";
import { useDisclosure } from "@mantine/hooks";
import { Drawer, ScrollArea, Text } from "@mantine/core";
import useSWR from "swr";
import AllCategory from "./AllCategory/AllCategory";
import { getCategory } from "@/utils/fetch";
import { getCookie } from "cookies-next";
import { getCart } from "@/utils/Store";

const BottomNavBar = () => {
  const router = useRouter();
  const userContext = useContext(UserConfigContext);
  const [categories, setCategories] = useState();
  const [categoriesLoading, setCategoriesLoading] = useState(false);
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

  const userConfigs = useContext(UserConfigContext);
  const { configId } = userConfigs;

  useEffect(() => {
    const get = async () => {
      setCategoriesLoading(true);
      const data = await getCategory();
      if (data) {
        setCategories(data);
      }
      setCategoriesLoading(false);
    };
    get();
  }, []);

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
    if (!userToken) {
      let data = getCart();
      if (data) {
        setCartItem(data);
      }
    } else {
      getUserCart();
    }
  }, []);

  return (
    <>
      <Drawer
        opened={categoryDrawerOpened}
        onClose={closeCategoryDrawer}
        title={<Text fw="lighter">Ангилал</Text>}
        scrollAreaComponent={ScrollArea.Autosize}
      >
        {categoriesLoading && <div></div>}
        {configId && categories && (
          <AllCategory
            type="drawer"
            categories={categories}
            isLoading={categoriesLoading}
          />
        )}
      </Drawer>
      <div className="block lg:hidden  sticky bottom-0 z-50">
        <div className="relative">
          <div className="w-full bg-white p-4 h-full border-t border-gray-200 ">
            <div className="grid h-full max-w-lg grid-cols-4 mx-auto">
              <button
                type="button"
                className="inline-flex flex-col gap-2 items-center justify-center font-medium px-5 hover:bg-gray-50 group"
                onClick={openCategoryDrawer}
              >
                <IconCategory2 className="group-hover:text-blue-600 " />
                <span className="text-lg text-gray-600 group-hover:text-blue-600 ">
                  Ангилал
                </span>
              </button>
              <Link
                type="button"
                href={"/"}
                className="inline-flex flex-col gap-2 items-center justify-center font-medium px-5 hover:bg-gray-50 group"
              >
                <IconHomeEco className="group-hover:text-blue-600 " />
                <span className="text-lg text-gray-600 group-hover:text-blue-600 ">
                  Нүүр
                </span>
              </Link>
              <button
                onClick={() => linkToCart()}
                type="button"
                className="inline-flex flex-col gap-2 items-center justify-center font-medium px-5 hover:bg-gray-50 group"
              >
                <div className="absolute">
                  <div className="w-5 h-5 bg-number flex justify-center items-center text-white -mt-9 rounded-full text-sm ml-8">
                    {console.log(cartItem, "cartItem")}
                    <p className="text-md">
                      {cartItem?.cart_items ? cartItem?.cart_items?.length : 0}
                    </p>
                  </div>
                </div>
                <IconShoppingCart className="group-hover:text-blue-600 " />
                <span className="text-lg text-gray-600 group-hover:text-blue-600 ">
                  Сагс
                </span>
              </button>
              <button
                type="button"
                className="inline-flex flex-col gap-2 items-center justify-center font-medium px-5 hover:bg-gray-50 group"
                onClick={() => {
                  if (!userContext.auth) {
                    openContextModal({
                      modal: "login",
                      title: (
                        <Text size="sm" weight={400}>
                          Хэрэглэгч та өөрийн утасны дугаараар нэвтрэнэ үү
                        </Text>
                      ),
                      centered: true,
                    });
                  } else {
                    router.push("/profile");
                  }
                }}
              >
                <IconUserCircle className="group-hover:text-blue-600 " />
                <span className="text-lg text-gray-600 group-hover:text-blue-600 ">
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
