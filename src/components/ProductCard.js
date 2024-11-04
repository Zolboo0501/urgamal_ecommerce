import useWishlist from "@/hooks/useWishlist";
import { fetchMethod } from "@/utils/fetch";
import {
  errorNotification,
  numberWithCommas,
  successNotification,
} from "@/utils/utils";
import {
  ActionIcon,
  AspectRatio,
  Badge,
  Box,
  Button,
  Card,
  Group,
  Image,
  LoadingOverlay,
  rem,
  ThemeIcon,
} from "@mantine/core";
import {
  IconCircleXFilled,
  IconHeart,
  IconHeartFilled,
  IconMinus,
  IconPhotoOff,
  IconPlus,
  IconShoppingCartPlus,
} from "@tabler/icons-react";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useState } from "react";
import { IoIosBarcode } from "react-icons/io";
import { addCart } from "../utils/Store";

const ProductCard = ({ src, data, shouldScale = true, additionalImages }) => {
  const [productCount, setProductCount] = useState(1);
  const [currentImage, setCurrentImage] = useState({
    key: src?.key,
    src: src?.url,
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const token = getCookie("token");
  const [toggle, setToggle] = useState(false);
  const wishlist = useWishlist();
  const addCount = (event) => {
    event.stopPropagation();
    if (data?.balance - productCount > 0) {
      setProductCount(productCount + 1);
    } else {
      errorNotification({
        message: "Барааны үлдэгдэл хүрэлцэхгүй байна.",
      });
    }
  };

  const handleWishlist = async (event) => {
    event.stopPropagation();
    setToggle(!toggle);
    if (!toggle) {
      if (token) {
        const requestOption = {
          productid: data.id,
        };
        const res = await fetchMethod(
          "POST",
          "user/wishlist",
          token,
          requestOption,
        );
        if (res.success) {
          wishlist.addItem(data);
          successNotification({
            message: res.message,
          });
        } else {
          errorNotification({
            message: res?.message,
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
      }
    }
  };

  const minusCount = (event) => {
    event.stopPropagation();
    if (productCount > 1) setProductCount(productCount - 1);
  };

  const addToCartHandler = async (event) => {
    event.stopPropagation();
    if (data?.balance > 0) {
      addCart({ ...data, quantity: productCount });
      successNotification({
        message: data.name,
        title: "Сагсанд амжилттай орлоо!",
      });
    } else {
      errorNotification({
        message: "Барааны үлдэгдэл хүрэлцэхгүй байна.",
      });
    }
  };

  const clickProduct = (e) => {
    e.preventDefault();
    router.push({
      shallow: true,
      pathname: "/product/[id]",
      query: { id: data.id },
    });
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
    <Card
      shadow="md"
      withBorder
      padding="lg"
      radius="md"
      component="a"
      target="_blank"
      onClick={(event) => {
        clickProduct(event);
      }}
      className={`hover:cursor-pointer hover:bg-grey25 ${
        shouldScale &&
        "hover:scale-101 transition delay-100 ease-in-out hover:-translate-y-2"
      }`}
      style={{ border: "0.5px solid #f3f3f3" }}
    >
      <Card.Section>
        <div className="relative block border-b">
          <AspectRatio ratio={4 / 3}>
            <Image
              src={currentImage?.src}
              height={240}
              fit="cover"
              withPlaceholder
              placeholder={
                <div className="flex flex-col items-center gap-2 rounded-md">
                  <ThemeIcon size="lg" variant="light" color="green">
                    <IconPhotoOff size="80%" stroke={0.5} />
                  </ThemeIcon>
                  <p class="text-xs font-light text-gray-500">Зураггүй</p>
                </div>
              }
              alt={currentImage?.src}
            />
            {additionalImages && (
              <Group
                pos="absolute"
                spacing={2}
                px={8}
                grow
                inset={0}
                align="end"
                className="z-10"
              >
                {additionalImages?.map((addImg) => {
                  return (
                    <Box
                      key={addImg?.key}
                      pos="relative"
                      className="z-20 h-full"
                      onMouseEnter={() => {
                        setCurrentImage({ key: addImg?.key, src: addImg?.url });
                      }}
                      onMouseLeave={() => {
                        setCurrentImage({ key: src?.key, src: src?.url });
                      }}
                    >
                      <Box
                        pos="absolute"
                        sx={(theme) => ({
                          height: 4,
                          zIndex: 20,
                          bottom: 2,
                          left: 0,
                          right: 0,
                          top: "auto",
                          backgroundColor:
                            currentImage?.key === addImg?.key
                              ? theme.colors.green[3]
                              : theme.colors.gray[3],
                          borderRadius: theme.radius.xl,
                        })}
                      />
                    </Box>
                  );
                })}
              </Group>
            )}
          </AspectRatio>
        </div>
      </Card.Section>
      <div className="mt-3">
        <p class="mt-1 line-clamp-1 grow text-start text-lg font-medium">
          {data?.name}
        </p>
        <div className="flex flex-row items-center gap-1">
          <p className="text-xs font-semibold text-[#696A6C]">Үлдэгдэл : </p>
          {renderRemains(data?.balance)}
        </div>
      </div>
      <div className="flex w-full flex-col">
        <div className="flex flex-row items-center justify-between">
          <p className="mt-1 text-start text-lg font-bold text-primary600">
            {numberWithCommas(data?.listPrice)}₮
          </p>
          <ActionIcon
            variant="subtle"
            radius="lg"
            onClick={(event) => {
              event.preventDefault();
              handleWishlist(event);
            }}
          >
            {toggle ? (
              <IconHeartFilled
                stroke={1.5}
                size={rem(24)}
                style={{ color: "#40C057" }}
              />
            ) : (
              <IconHeart stroke={1.5} size={rem(24)} color="green" />
            )}
          </ActionIcon>
        </div>
        {data?.barCode ? (
          <div className="flex flex-row items-center gap-1">
            <IoIosBarcode size={"2rem"} color="#696A6C" />{" "}
            <p className="text-sm text-grey800">{data?.barCode}</p>
          </div>
        ) : (
          <IoIosBarcode size={"2rem"} color="white" />
        )}
      </div>
      <Group pt="xs" pb={0} grow align="stretch" w="100%">
        <div className="flex flex-row items-center">
          <ActionIcon
            variant="light"
            size="md"
            radius="xl"
            className="flex items-center justify-center rounded-md border"
            color="green"
            onClick={(event) => {
              event.preventDefault();
              minusCount(event);
            }}
          >
            <IconMinus stroke={2} size={"1.2rem"} />
          </ActionIcon>
          <p className="ml-2 mr-2 text-center text-sm font-semibold">
            {productCount}
          </p>
          <ActionIcon
            variant="light"
            size="md"
            radius="xl"
            className="flex items-center justify-center rounded-md"
            color="green"
            onClick={(event) => {
              event.preventDefault();
              addCount(event);
            }}
          >
            <IconPlus stroke={2} size={"1.2rem"} />
          </ActionIcon>
        </div>
        <Button
          variant="filled"
          radius="xl"
          color="green"
          onClick={(event) => {
            event.preventDefault();
            addToCartHandler(event);
          }}
        >
          {loading === true ? (
            <LoadingOverlay
              loaderProps={{ size: "sm", color: "white" }}
              overlayOpacity={0.1}
              visible={loading}
            />
          ) : (
            <div className="flex items-center">
              <IconShoppingCartPlus />
            </div>
          )}
        </Button>
      </Group>
    </Card>
  );
};

export default ProductCard;
