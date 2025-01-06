/* eslint-disable react/prop-types */
import useWishlist from "@/hooks/useWishlist";
import { fetchMethod } from "@/utils/fetch";
import { addCart } from "@/utils/Store";
import {
  errorNotification,
  numberWithCommas,
  successNotification,
} from "@/utils/utils";
import { Badge, Button, Loader, ThemeIcon, rem } from "@mantine/core";
import {
  IconCircleXFilled,
  IconHeartX,
  IconPhotoOff,
  IconShoppingCartPlus,
} from "@tabler/icons-react";
import { getCookie } from "cookies-next";
import React, { useState } from "react";
import Magnifier from "./Magnifier/Magnifier";
import Link from "next/link";

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
      requestOption,
    );
    if (res.success) {
      successNotification({
        message: "Амжилттай бараа устлаа.",
      });
      wishlist.removeItem(data?.productid);
    } else {
      errorNotification({
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
    setLoading(true);
    addCart({ ...data?.product, quantity: 1 });
    successNotification({
      message: "Сагсанд амжилттай орлоо!",
      title: `${data?.name}`,
    });
    setLoading(false);
  };

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

  return (
    <div className="w-full rounded p-4 shadow-md hover:bg-gray-50">
      <div className="flex flex-col gap-2 p-4 sm:flex-row">
        <div>
          {data?.product?.additionalImage?.length > 0 ? (
            <Magnifier
              loader={() => data?.product?.additionalImage[0]?.url}
              imgSrc={data?.product?.additionalImage[0]?.url}
              imgWidth={0}
              imgHeight={0}
              magnifierRadius={40}
              imageClassname="h-48 rounded object-cover sm:h-32 sm:w-32"
            />
          ) : (
            <div className="product-card-img flex h-48 flex-col items-center justify-center gap-2 rounded-md bg-gray-50 sm:h-32 sm:w-32">
              <ThemeIcon size="lg" variant="light" color="green">
                <IconPhotoOff size="80%" stroke={0.5} />
              </ThemeIcon>
            </div>
          )}
        </div>
        <Link
          className="flex flex-col justify-around sm:ml-3"
          href={`/product/${data.productid}`}
        >
          <p className="text-lg font-semibold lg:text-lg">{data.name}</p>
          <div className="mt-1 flex flex-row flex-wrap items-center gap-5">
            <div className="flex flex-row items-center">
              <p className="text-base text-[#696A6C] lg:text-base">Үнэ :</p>
              <p className="ml-1 text-start text-base font-bold text-primary700 lg:text-base">
                {numberWithCommas(data?.product?.listPrice) || 0}₮
              </p>
            </div>
            <div className="flex items-center gap-1">
              <p className="text-base text-[#696A6C] lg:text-base">
                Үлдэгдэл :
              </p>
              {renderRemains(data?.product?.balance)}
            </div>
          </div>
          <div className="mt-4 flex flex-row gap-3">
            <Button
              color="green"
              variant="filled"
              radius="xl"
              onClick={handleCart}
            >
              {loading ? (
                <div className="w-full items-center justify-center">
                  <Loader color="white" size={"xs"} />
                </div>
              ) : (
                <div className="flex items-center gap-2 text-base font-semibold lg:text-ss">
                  <IconShoppingCartPlus />
                  Сагслах
                </div>
              )}
            </Button>
            <Button
              variant={"outline"}
              color={"red"}
              onClick={handleDelete}
              radius="xl"
            >
              <div className="flex items-center gap-2 text-base font-semibold lg:text-ss">
                <IconHeartX />
                Устгах
              </div>
            </Button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProductWishlist;
