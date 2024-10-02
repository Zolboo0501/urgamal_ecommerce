import ProductWishlist from "@/components/ProductWishlist";
import { fetchMethod } from "@/utils/fetch";
import { Loader, Title, rem } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconCircleXFilled, IconHeartOff } from "@tabler/icons-react";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getWishlist();
  }, []);

  const getWishlist = async () => {
    setLoading(true);
    const token = getCookie("token");
    const data = await fetchMethod("GET", "user/wishlist", token);
    if (data.success) {
      setWishlist(data.data);
      setLoading(false);
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
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full flex-col rounded-md bg-white px-4 py-6 lg:px-8">
      <Title order={3}>Хадгалсан бараа</Title>
      <div className="mt-4 max-h-96 w-full overflow-auto">
        {loading ? (
          <div className="flex h-96 w-full items-center justify-center">
            <Loader color="yellow" />
          </div>
        ) : wishlist.length > 0 ? (
          wishlist.map((item, index) => (
            <ProductWishlist data={item} key={index} refresh={getWishlist} />
          ))
        ) : (
          <div className="flex h-72 min-h-full flex-col items-center justify-center">
            <IconHeartOff size="2rem" stroke={1.5} />
            <span className="mt-2 text-base font-medium text-grey">
              Таны таалагдсан бараа хоосон байна.
            </span>
          </div>
        )}
      </div>
      <div className="mt-4 flex flex-row items-center justify-end">
        {/* <Button
          variant="transparent"
          styles={(theme) => ({
            label: {
              fontSize: rem(14),
              fontWeight: "400",
            },
          })}
          leftIcon={
            <IconTrashX
              style={{ width: rem(25), height: rem(25) }}
              stroke={2}
              color="red"
            />
          }
        >
          Бүгдийг устгах
        </Button> */}
      </div>
    </div>
  );
};

export default Wishlist;
