/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import CategoryLayout from "@/components/GlobalLayout/CategoryLayout";
import useWishlist from "@/hooks/useWishlist";
import { addCart } from "@/utils/Store";
import { fetchMethod } from "@/utils/fetch";
import {
  errorNotification,
  numberWithCommas,
  successNotification,
} from "@/utils/utils";
import { Badge, Button, Grid, ThemeIcon, rem } from "@mantine/core";
import {
  IconChevronRight,
  IconCircleXFilled,
  IconHeart,
  IconPhotoOff,
  IconShoppingCartPlus,
} from "@tabler/icons-react";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import SpecialDeal from "../../components/SpecialDeal";

export async function getServerSideProps({ params }) {
  const requestOption = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  try {
    // Fetch the product data
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/product/id/${params.id}`,
      requestOption,
    );
    const productData = await res.json();

    // Fetch special deal data
    const specialDealRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/product/specials`,
      requestOption,
    );
    const dealData = await specialDealRes.json();

    // Process the category sortOrder if exists
    const sortOrder = productData?.category?.sortOrder;
    const categoryCodes = sortOrder?.split("/").filter(Boolean) || [];

    // Fetch categories
    const categoryPromises = categoryCodes.slice(0, 3).map(async (code) => {
      const categoryRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/product/cats/code/${code}`,
        requestOption,
      );
      const categoryData = await categoryRes.json();
      return {
        code,
        name: categoryData?.category?.name,
        id: categoryData?.category?.id,
      };
    });

    const categories = await Promise.all(categoryPromises);

    return {
      props: {
        product: productData,
        dealData,
        category: categories,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        product: null,
        dealData: null,
        category: [],
      },
    };
  }
}

const ProductDetail = ({ product, dealData, category }) => {
  const [renderImage, setRenderImage] = useState("");
  const wishlist = useWishlist();
  const router = useRouter();

  const addToCartHandler = async () => {
    if (product?.balance > 0) {
      addCart({ ...product, quantity: 1 });
      successNotification({
        message: "Сагсанд амжилттай орлоо!",
        title: `${product?.name}`,
      });
    } else {
      errorNotification({
        message: "Барааны үлдэгдэл хүрэлцэхгүй байна.",
      });
    }
  };

  const showErrorNotification = (message) => {
    errorNotification({
      message,
      icon: (
        <IconCircleXFilled
          style={{
            width: rem(30),
            height: rem(30),
          }}
        />
      ),
    });
  };

  const addToWishlist = async () => {
    const token = getCookie("token");

    if (!token) {
      showErrorNotification("Нэвтрэх шаардлагатай");
      return;
    }

    try {
      const requestOption = { productid: product?.id };
      const data = await fetchMethod(
        "POST",
        "user/wishlist",
        token,
        requestOption,
      );

      if (data.success) {
        wishlist.addItem(data);
        successNotification({
          message: data.message,
        });
      } else {
        showErrorNotification(data.message);
      }
    } catch {
      showErrorNotification("Алдаа гарлаа. Дахин оролдоно уу.");
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
            const { top, left } = elem.getBoundingClientRect();
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

  const handleCategoryClick = (item, index) => {
    const query = {
      parent_id: category?.[0]?.id,
    };

    if (index === 0) {
      query.parent_id = item?.id;
    } else if (index === category?.length - 1) {
      query.tertiary_id = item?.id;
      query.secondary_id = category?.[1]?.id;
    } else {
      query.secondary_id = item?.id;
    }

    router.push(
      {
        pathname: `/category/${item?.id}`,
        query,
      },
      undefined,
      { shallow: false },
    );
  };

  return (
    <CategoryLayout title={product?.name}>
      <div className="flex min-h-screen min-w-96 flex-col items-start bg-white px-4 py-4 sm:px-11 md:px-16 lg:px-20 lg:py-12 xl:px-10">
        <div className="mb-6 flex flex-row gap-3">
          {category?.map((item, index) => (
            <button
              key={item?.name}
              className={`font-medium hover:font-semibold hover:underline ${
                index !== category?.length - 1
                  ? "flex flex-row items-center gap-3"
                  : ""
              }`}
              onClick={() => handleCategoryClick(item, index)}
            >
              {item?.name}
              {index !== category?.length - 1 && (
                <IconChevronRight size={20} color={"#40C057"} />
              )}
            </button>
          ))}
        </div>
        <div className="flex w-full justify-start lg:gap-20">
          <div className="lg:none flex w-full flex-col justify-center gap-4 2xs:flex-col xs:flex-col sm:flex-col md:flex-col lg:flex-col lg:gap-14 xl:flex-row">
            <div className="flex flex-col">
              <div className="relative h-[20rem] w-full rounded-md bg-gray-100 shadow-md xs:w-full sm:h-[24rem] sm:w-full lg:h-[33rem] lg:w-full xl:w-[33rem] 2xl:w-[40rem]">
                {product?.additionalImage?.length > 0 ? (
                  <ImageMagnifier
                    src={renderImage || product?.additionalImage[0]?.url}
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-2 rounded-md bg-gray-50">
                    <ThemeIcon size="lg" variant="light" color="green">
                      <IconPhotoOff size="80%" stroke={0.5} />
                    </ThemeIcon>
                    <p className="text-sm font-light">Зураггүй</p>
                  </div>
                )}
              </div>

              <div>
                <Grid gutter={12} mt="lg">
                  {product?.additionalImage?.map((item, index) => (
                    <Grid.Col span={3} key={index}>
                      <div
                        className={`relative h-20 w-full rounded-md border-2 sm:h-32 ${renderImage === item?.url ? "border-primary" : "border-gray-300 hover:border-2"}`}
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
                  ))}
                </Grid>
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
                    {numberWithCommas(product?.listPrice) || 0}₮
                  </p>
                </div>

                {product?.wholePrice > 0 && (
                  <div className="flex gap-2">
                    <span className="text-base text-greenish-grey lg:text-base">
                      Ширхэгийн үнэ:
                    </span>
                    <p className="ml-1 text-start text-base font-bold text-primary700 lg:text-lg">
                      {numberWithCommas(product?.listPrice) || 0}₮
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
                      {`${product?.categoryName} ${product?.groupName}`}
                    </span>
                  </div>
                </div>
                {product?.instruction && (
                  <div className="flex flex-col gap-4">
                    <span className="flex text-base font-semibold text-greenish-grey">
                      Хэрэглэх заавар
                    </span>
                    <div
                      className="w-full overflow-y-auto overflow-x-hidden rounded-md bg-[#F8FAFC] px-3 py-3 text-base outline-0"
                      dangerouslySetInnerHTML={{
                        __html: product.instruction || "",
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="bg mt-5 flex w-full justify-end gap-6 pr-4">
                <Button
                  variant="outline"
                  radius="xl"
                  rightSection={<IconHeart size={20} stroke={2} />}
                  size="md"
                  styles={{ label: { fontWeight: 500 } }}
                  color="red"
                  className="flex items-center justify-between rounded-md px-5 py-3"
                  onClick={addToWishlist}
                >
                  Хадгалах
                </Button>

                <Button
                  size="md"
                  radius="xl"
                  color="teal"
                  className="flex items-center justify-between rounded-md px-5 py-3"
                  rightSection={
                    <IconShoppingCartPlus className="font-semibold" size={20} />
                  }
                  onClick={addToCartHandler}
                >
                  Сагсанд хийх
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="container mt-8 flex flex-col gap-6 rounded-md px-4 py-2">
          {product?.description && (
            <div className="flex flex-col gap-3 text-lg font-semibold text-grey700">
              Тайлбар
              <div
                className="text-base font-regular text-black"
                dangerouslySetInnerHTML={{
                  __html: product?.description || "",
                }}
              />
            </div>
          )}
          {product?.note && (
            <div className="flex flex-col gap-3 text-lg font-semibold text-grey700">
              Тэмдэглэл
              <p className="text-sm font-regular text-black">{product?.note}</p>
            </div>
          )}
          {product?.detailed_description && (
            <div
              dangerouslySetInnerHTML={{
                __html: product?.detailed_description,
              }}
            />
          )}
          {/* <p>
            {["description", "detailed_description", "note"].map((section) => {
              return product?.[section];
            })}
          </p> */}
          {/* <div className="flex flex-row gap-10">
            {["description", "detailed_description", "note"].map((section) => (
              <button
                key={section}
                className={`py-3 text-lg ${
                  toggle === section
                    ? "border-b-2 border-[#40C057] font-semibold text-black"
                    : "font-normal text-[#98A2B3]"
                }`}
                onClick={() => setToggle(section)}
              >
                {section === "description" && "Тайлбар"}
                {section === "detailed_description" && "Дэлгэрэнгүй тайлбар"}
                {section === "note" && "Тэмдэглэл"}
              </button>
            ))}
          </div> */}

          {/* <div className="mt-4">
            {["description", "detailed_description", "note"].map(
              (section) =>
                toggle === section && (
                  <div
                    key={section}
                    className="mt-4 rounded-md p-4"
                    style={{
                      backgroundColor:
                        section === "detailed_description" || section === "note"
                          ? "#F8FAFC"
                          : "inherit",
                    }}
                  >
                    {product?.[section] ? (
                      section === "detailed_description" ? (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: product?.detailed_description,
                          }}
                        />
                      ) : (
                        <textarea
                          cols={60}
                          rows={8}
                          readOnly
                          className="w-full overflow-y-auto overflow-x-hidden rounded-md px-3 py-3 text-base font-normal outline-0"
                          value={product?.[section]}
                        />
                      )
                    ) : (
                      <div className="flex h-40 flex-col items-center justify-center">
                        <IconNotesOff size="2.5rem" stroke={1.5} color="teal" />
                        <span className="mt-2 text-base font-medium">
                          {section === "description" && "Тайлбар хоосон байна."}
                          {section === "detailed_description" &&
                            "Дэлгэрэнгүй тайлбар хоосон байна."}
                          {section === "note" && "Тэмдэглэл хоосон байна."}
                        </span>
                      </div>
                    )}
                  </div>
                ),
            )}
          </div> */}
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
