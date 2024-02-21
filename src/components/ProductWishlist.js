import Image from "next/image";
import { Button, Loader, ThemeIcon, rem } from "@mantine/core";
import {
  IconCheck,
  IconCircleXFilled,
  IconPhotoOff,
} from "@tabler/icons-react";
import { fetchMethod } from "@/utils/fetch";
import { getCookie } from "cookies-next";
import { showNotification } from "@mantine/notifications";
import { addCart } from "@/utils/Store";
import { useState } from "react";
import useWishlist from "@/hooks/useWishlist";
const ProductWishlist = ({ data, refresh }) => {
  const [loading, setLoading] = useState(false);
  const wishlist = useWishlist();
  const handleDelete = async () => {
    const token = getCookie("token");
    const requestOption = {
      productid: data?.productid,
    };
    const res = await fetchMethod(
      "DELETE",
      "user/wishlist",
      token,
      requestOption
    );
    if (res.success) {
      showNotification({
        message: "Амжилттай бараа устлаа.",
        icon: <IconCheck />,
        color: "green",
      });
      wishlist.removeItem(data?.productid);
    } else {
      showNotification({
        message: res?.message,
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
    refresh();
  };

  const handleCart = async () => {
    const token = getCookie("token");
    if (token) {
      setLoading(true);
      const body = {
        product_id: data?.productid,
        quantity: 1,
      };
      const res = await fetchMethod("POST", "cart/add", token, body);
      if (res?.success) {
        addCart({ ...data, quantity: 1 });
        showNotification({
          message: "Сагсанд амжилттай орлоо!",
          icon: <IconCheck />,
          color: "green",
          title: `${data?.name}`,
        });
        setLoading(false);
      } else {
        showNotification({
          message: res?.message,
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
    } else {
      addCart({ ...data, quantity: 1 });
      showNotification({
        message: "Сагсанд амжилттай орлоо!",
        icon: <IconCheck />,
        color: "green",
        title: `${data?.name}`,
      });
    }
  };

  return (
    <div
      className="divide-b-4 divide-slate-700 w-full"
      style={{ borderBottom: "2px solid #DADEDE" }}
    >
      <div className="flex flex-col sm:flex-row p-4">
        <div>
          {data?.product?.additionalImage?.length > 0 ? (
            <Image
              loader={() => data?.product?.additionalImage[0]?.url}
              src={data?.product?.additionalImage[0]?.url}
              alt={data?.product?.additionalImage[0]?.url}
              width={128}
              height={128}
              className="sm:w-32 sm:h-32 h-48 object-contain"
            />
          ) : (
            <div className="product-card-img flex flex-col gap-2 justify-center items-center bg-gray-50 rounded-md sm:w-32 h-48 sm:h-32">
              <ThemeIcon size="lg" variant="light" color="green">
                <IconPhotoOff size="80%" stroke={0.5} />
              </ThemeIcon>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-evenly sm:ml-3 mt-2 sm:mt-0">
          <p className="font-semibold text-sm lg:text-base">{data.name}</p>
          <div className="flex flex-row items-center mt-1">
            <p className="text-sm lg:text-base">
              Ширхэг: {data?.product.balance}
            </p>
            <p className="ml-4 text-sm lg:text-base">
              Нэгж үнэ: {data?.product.listPrice}₮
            </p>
          </div>
          <div className="flex flex-row mt-2">
            <Button
              variant={"filled"}
              className="mr-4"
              onClick={handleCart}
              style={{
                backgroundColor: "#F9BC60",
                padding: "6px",
              }}
            >
              {loading ? (
                <div className="w-full items-center justify-center">
                  <Loader color="white" size={"xs"} />
                </div>
              ) : (
                <p className="text-xs lg:text-base"> Сагсанд хийх</p>
              )}
            </Button>
            <Button
              variant={"outline"}
              color={"red"}
              style={{ fontWeight: "normal", padding: "6px" }}
              onClick={handleDelete}
            >
              <p className="text-xs lg:text-base">Арилгах</p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductWishlist;
