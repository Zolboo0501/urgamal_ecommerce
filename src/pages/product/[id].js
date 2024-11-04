/* eslint-disable react-hooks/exhaustive-deps */
import CategoryLayout from "@/components/GlobalLayout/CategoryLayout";
import useWishlist from "@/hooks/useWishlist";
import { addCart } from "@/utils/Store";
import { fetchMethod } from "@/utils/fetch";
import {
  errorNotification,
  numberWithCommas,
  successNotification,
} from "@/utils/utils";
import { Badge, Button, Grid, Loader, ThemeIcon, rem } from "@mantine/core";
import {
  IconChevronRight,
  IconCircleXFilled,
  IconHeart,
  IconNotesOff,
  IconPhotoOff,
  IconShoppingCartPlus,
} from "@tabler/icons-react";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import SpecialDeal from "../../components/SpecialDeal";
export async function getServerSideProps({ params }) {
  const requestOption = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/product/id/${params.id}`,
    requestOption,
  );
  const data = await res.json();
  const specialDeal = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/product/specials`,
    requestOption,
  );
  const dealData = await specialDeal.json();
  const sortOrder = data?.category?.sortOrder;
  const convert = sortOrder?.split("/").filter(Boolean);
  let arr = [];
  let index = 0;
  for (const element of convert || []) {
    if (index < 3) {
      const category = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/product/cats/code/${element}`,
        requestOption,
      );
      const categoryData = await category.json();
      arr.push({
        code: element,
        name: categoryData?.category?.name,
        id: categoryData?.category?.id,
      });
    }
    index++;
  }
  return {
    props: {
      product: data,
      dealData: dealData,
      category: arr,
    },
  };
}

const ProductDetail = ({ product, dealData, category }) => {
  const [loading, setLoading] = useState(false);
  const [renderImage, setRenderImage] = useState("");
  const wishlist = useWishlist();
  const [toggle, setToggle] = useState("description");
  const router = useRouter();
  const addToCartHandler = async () => {
    addCart({ ...product, quantity: 1 });
    successNotification({
      message: "Сагсанд амжилттай орлоо!",
      title: `${product?.name}`,
    });
  };

  const addToWishlist = async () => {
    const token = getCookie("token");
    if (token) {
      const requestOption = {
        productid: product.id,
      };
      const data = await fetchMethod(
        "POST",
        "user/wishlist",
        token,
        requestOption,
      );
      if (data.success) {
        wishlist.addItem(data);
        successNotification({
          message: res.message,
        });
      } else {
        errorNotification({
          message: data.message,
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
  };
  const clickImage = (item) => {
    setRenderImage(item?.url);
  };

  function ImageMagnifier({
    src,
    magnifierHeight = 200,
    magnifieWidth = 200,
    zoomLevel = 1.5,
  }) {
    const [[x, y], setXY] = useState([0, 0]);
    const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
    const [showMagnifier, setShowMagnifier] = useState(false);
    return (
      <div className="relative h-full w-full overflow-hidden">
        <Image
          src={src}
          className="h-full w-full"
          fill
          objectFit="contain"
          onMouseEnter={(e) => {
            // update image size and turn-on magnifier
            const elem = e.currentTarget;
            const { width, height } = elem.getBoundingClientRect();
            setSize([width, height]);
            setShowMagnifier(true);
          }}
          onMouseMove={(e) => {
            // update cursor position
            const elem = e.currentTarget;
            const { top, left, width, height } = elem.getBoundingClientRect();
            // calculate cursor position on the image
            const x = e.pageX - left - window.pageXOffset;
            const y = e.pageY - top - window.pageYOffset;
            setXY([x, y]);
          }}
          onMouseLeave={() => {
            // close magnifier
            setShowMagnifier(false);
          }}
          alt={"img"}
        />
        <div
          style={{
            display: showMagnifier ? "" : "none",
            position: "absolute",
            // prevent maginier blocks the mousemove event of img
            pointerEvents: "none",
            // set size of magnifier
            height: `${magnifierHeight}px`,
            width: `${magnifieWidth}px`,
            // move element center to cursor pos
            top: `${y - magnifierHeight / 2}px`,
            left: `${x - magnifieWidth / 2}px`,
            opacity: "1", // reduce opacity so you can verify position
            border: "1px solid lightgray",
            backgroundColor: "white",
            backgroundImage: `url('${src}')`,
            backgroundRepeat: "no-repeat",

            //calculate zoomed image size
            backgroundSize: `${imgWidth * zoomLevel}px ${
              imgHeight * zoomLevel
            }px`,

            //calculete position of zoomed image.
            backgroundPositionX: `${-x * zoomLevel + magnifieWidth / 2}px`,
            backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
          }}
        ></div>
      </div>
    );
  }

  const renderBalanceBadge = (balance) => {
    if (balance > 0) {
      const convertInt = parseInt(balance);
      if (convertInt > 10) {
        return <Badge color="teal">Хангалттай</Badge>;
      }
      if (convertInt <= 10 && convertInt > 0) {
        return (
          <span className="text-base font-bold text-primary-50">
            {product?.balance}
          </span>
        );
      }
    } else {
      return <Badge color="grey">Үлдэгдэлгүй</Badge>;
    }
  };

  return (
    <CategoryLayout title={product?.name}>
      <div className="flex min-h-screen min-w-96 flex-col items-start bg-white px-4 py-4 sm:px-11 md:px-16 lg:px-20 lg:py-12 xl:px-10">
        <div className="mb-4 flex flex-row gap-3">
          {category?.map((item, index) => {
            if (index !== category?.length - 1) {
              return (
                <button
                  key={item?.name}
                  className="flex flex-row items-center gap-3 font-medium hover:font-semibold hover:underline"
                  onClick={() =>
                    index === 0
                      ? router.push(
                          {
                            pathname: `/category/${item?.id}`,
                            query: {
                              parent_id: item?.id,
                            },
                          },
                          undefined,
                          { shallow: false },
                        )
                      : router.push(
                          {
                            pathname: `/category/${item?.id}`,
                            query: {
                              parent_id: category?.[0]?.id,
                              secondary_id: item?.id,
                            },
                          },
                          undefined,
                          { shallow: false },
                        )
                  }
                >
                  {item?.name}
                  <IconChevronRight size={20} color={"#40C057"} />
                </button>
              );
            } else {
              return (
                <button
                  onClick={() =>
                    router.push(
                      {
                        pathname: `/category/${item?.id}`,
                        query: {
                          parent_id: category?.[0]?.id,
                          secondary_id: category?.[1]?.id,
                          tertiary_id: item?.id,
                        },
                      },
                      undefined,
                      { shallow: false },
                    )
                  }
                  key={item?.name}
                  className="font-medium hover:font-semibold hover:underline"
                >
                  {item?.name}
                </button>
              );
            }
          })}
        </div>
        <div className="flex w-full justify-start lg:gap-20">
          <div className="xs2:flex-col lg:none flex w-full flex-col justify-center gap-4 xs:flex-col sm:flex-col md:flex-col lg:flex-col lg:gap-14 xl:flex-row">
            <div className="flex flex-col">
              <div className="xs2:w-[66vw] xs2:h-[66vw] relative h-[50vh] w-full rounded-md bg-gray-100 shadow-md xs:h-[66vw] xs:w-[100%] sm:h-[66vw] sm:w-[100%] lg:h-[33vw] lg:w-[100%] xl:w-[33vw]">
                {product?.additionalImage?.length > 0 ? (
                  <ImageMagnifier
                    src={
                      renderImage === ""
                        ? `${product?.additionalImage[0]?.url}`
                        : renderImage
                    }
                    width={400}
                    fill
                    className="rounded-md object-contain"
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-2 rounded-md bg-gray-50">
                    <ThemeIcon
                      size="lg"
                      variant="light"
                      color="green"
                      // gradient={{ from: "teal", to: "lime", deg: 105 }}
                    >
                      <IconPhotoOff size="80%" stroke={0.5} />
                    </ThemeIcon>

                    <p class="text-sm font-light">Зураггүй </p>
                  </div>
                )}
              </div>
              <div>
                <Grid gutter={12} mt={"lg"}>
                  {product?.additionalImage?.map((item, index) => {
                    return (
                      <Grid.Col span={3} key={index}>
                        <div
                          className={
                            renderImage === item?.url
                              ? "relative h-20 w-full rounded-md border-2 border-primary sm:h-32"
                              : "relative h-20 w-full rounded-md border-gray-300 hover:border-2 sm:h-32"
                          }
                          onClick={() => clickImage(item)}
                        >
                          <Image
                            alt="item"
                            src={item.url}
                            fill
                            className="rounded-md object-cover p-1"
                          />
                        </div>
                      </Grid.Col>
                    );
                  })}
                </Grid>
                {/* <div className="flex flex-row  h-36 mt-2 flex-wrap gap-3">
                  {product?.product_image?.images?.map((item, index) => {
                    return (
                      <div className={renderImage === item ? "relative h-full rounded-md border-2 border-button-yellow" : "relative h-full rounded-md hover:border-2 border-gray-300"} onClick={() => clickImage(item)} style={{
                        width: `${25}% - ${1}px`
                      }}>
                        <Image src={item} fill
                          className="object-fill rounded-md p-1" />
                      </div>
                    )
                  })}
                </div> */}
              </div>
            </div>
            <div className="flex flex-col justify-between lg:gap-6">
              <div className="flex flex-col gap-6">
                <div className="text-lg font-semibold lg:text-2xl">
                  {product?.name}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-base text-greenish-grey lg:text-base">
                    Ширхэгийн үнэ:
                  </span>
                  <p className="ml-1 text-start text-base font-bold text-primary700 lg:text-lg">
                    {numberWithCommas(product.listPrice) || 0}₮
                  </p>
                </div>
                {product?.wholePrice > 0 && (
                  <div className="flex gap-2">
                    <span className="text-base text-greenish-grey lg:text-base">
                      Ширхэгийн үнэ:
                    </span>
                    <p className="ml-1 text-start text-base font-bold text-primary700 lg:text-lg">
                      {numberWithCommas(product.listPrice) || 0}₮
                    </p>
                    <span className="text-base text-[#696A6C] lg:text-base">
                      /
                    </span>
                    <p className="ml-1 text-start text-base font-bold text-grey600 lg:text-lg">
                      {numberWithCommas(product?.wholePrice) || 0}₮
                    </p>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <span className="text-base text-greenish-grey lg:text-base">
                    Үлдэгдэл :
                  </span>
                  {renderBalanceBadge(product?.balance)}
                </div>
                <div className="flex flex-row gap-2 text-base">
                  <span className="text-base text-greenish-grey">Төрөл:</span>
                  <div className="flex flex-row gap-3 lg:flex-col">
                    <span className="text-base font-semibold">
                      {product?.categoryName + " " + product?.groupName}
                    </span>
                  </div>
                </div>
                {product?.instruction && (
                  <div className="flex flex-col gap-4">
                    <span className="flex text-base font-semibold text-greenish-grey">
                      Хэрэглэх заавар
                    </span>
                    <textarea
                      cols={80}
                      rows={15}
                      readOnly
                      className="focus: w-full overflow-y-auto overflow-x-hidden rounded-md bg-[#F8FAFC] px-3 py-3 text-base outline-0"
                      value={product.instruction}
                    ></textarea>
                  </div>
                )}
                {/* {product?.detailed_description && (
                  <div className="flex flex-col gap-4">
                    <span className="flex font-semibold text-greenish-grey text-base">
                      Нэмэлт мэдээлэл
                    </span>
                    <textarea
                      cols={60}
                      rows={10}
                      readOnly
                      className="w-full overflow-x-hidden overflow-y-auto focus: outline-0 py-3 px-3 rounded-md text-base "
                      value={product?.detailed_description}
                    ></textarea>
                  </div>
                )} */}
              </div>

              <div className="bg mt-5 flex w-full justify-end gap-6 pr-4">
                <Button
                  variant={"outline"}
                  radius={"xl"}
                  rightSection={<IconHeart size={20} stroke={2} />}
                  size="md"
                  styles={{
                    label: { fontWeight: 500 },
                  }}
                  color={"red"}
                  className="flex items-center justify-between rounded-md px-5 py-3"
                  onClick={() => addToWishlist()}
                >
                  Хадгалах
                </Button>
                <Button
                  size="md"
                  radius={"xl"}
                  color={"teal"}
                  className="flex items-center justify-between rounded-md px-5 py-3"
                  disabled={loading}
                  rightSection={
                    loading ? (
                      <Loader size="xs" color="yellow" />
                    ) : (
                      <IconShoppingCartPlus
                        className="font-semibold"
                        size={20}
                      />
                    )
                  }
                  onClick={addToCartHandler}
                >
                  Сагсанд хийх
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="container mt-8 flex flex-col rounded-md px-4 py-2">
          <div className="flex flex-row gap-10">
            <button
              className={`py-3 text-lg text-black ${
                toggle === "description"
                  ? "border-b-2 border-[#40C057] font-semibold"
                  : "font-normal text-[#98A2B3]"
              }`}
              onClick={() => setToggle("description")}
            >
              Тайлбар
            </button>
            <button
              className={`text-lg ${
                toggle === "detailed_description"
                  ? "border-b-2 border-[#40C057] font-semibold text-black"
                  : "font-normal text-[#98A2B3]"
              }`}
              onClick={() => setToggle("detailed_description")}
            >
              Дэлгэрэнгүй тайлбар
            </button>
            <button
              className={`text-lg ${
                toggle === "note"
                  ? "border-b-2 border-[#40C057] font-semibold text-black"
                  : "font-normal text-[#98A2B3]"
              }`}
              onClick={() => setToggle("note")}
            >
              Тэмдэглэл
            </button>
          </div>
          <div className="mt-4 bg-grey50">
            {toggle === "description" && (
              <div className="mt-4 rounded-md p-4">
                {product?.description ? (
                  <textarea
                    cols={60}
                    rows={8}
                    readOnly
                    className="focus: w-full overflow-y-auto overflow-x-hidden rounded-md px-3 py-3 text-base font-normal outline-0"
                    value={product?.description}
                  />
                ) : (
                  <div className="flex h-40 flex-col items-center justify-center">
                    <IconNotesOff size="2.5rem" stroke={1.5} color="teal" />
                    <span className="mt-2 text-base font-medium">
                      Тайлбар хоосон байна.
                    </span>
                  </div>
                )}
              </div>
            )}
            {toggle === "detailed_description" && (
              <div className="mt-4 rounded-md bg-[#F8FAFC] p-4">
                {product?.detailed_description ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: product?.detailed_description,
                    }}
                  />
                ) : (
                  <div className="flex h-40 flex-col items-center justify-center">
                    <IconNotesOff size="2.5rem" stroke={1.5} color="teal" />
                    <span className="mt-2 text-base font-medium">
                      Дэлгэрэнгүй тайлбар хоосон байна.
                    </span>
                  </div>
                )}
              </div>
            )}
            {toggle === "note" && (
              <div className="mt-4 rounded-md bg-[#F8FAFC] p-4">
                {product?.description ? (
                  <textarea
                    cols={60}
                    rows={8}
                    readOnly
                    className="focus: w-full overflow-y-auto overflow-x-hidden rounded-md px-3 py-3 text-base outline-0"
                    value={product?.note}
                  />
                ) : (
                  <div className="flex h-40 flex-col items-center justify-center">
                    <IconNotesOff size="2.5rem" stroke={1.5} color="teal" />
                    <span className="mt-2 text-base font-medium">
                      Тэмдэглэл хоосон байна.
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="mt-12 w-full">
          {dealData &&
            dealData?.data &&
            dealData?.data.map((item, index) => {
              if (index === 0) {
                return (
                  <SpecialDeal
                    key={`list-with-category-${index}`}
                    suggest={true}
                    categoryName={"Санал болгож буй бүтээгдэхүүн"}
                  />
                );
              }
            })}
        </div>
      </div>
    </CategoryLayout>
  );
};

export default ProductDetail;
