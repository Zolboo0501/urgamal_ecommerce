/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import {
  Button,
  Badge,
  Grid,
  Loader,
  Text,
  ThemeIcon,
  rem,
} from "@mantine/core";
import { addCart } from "@/utils/Store";
import { getCookie } from "cookies-next";
import { SuccessNotification } from "../../utils/SuccessNotification";
import {
  IconCheck,
  IconCircleXFilled,
  IconHeart,
  IconNotesOff,
  IconPhotoOff,
} from "@tabler/icons-react";
import { fetchMethod } from "@/utils/fetch";
import Image from "next/image";
import CategoryLayout from "@/components/GlobalLayout/CategoryLayout";
import { showNotification } from "@mantine/notifications";
import useWishlist from "@/hooks/useWishlist";
import SpecialDeal from "../../components/SpecialDeal";
export async function getServerSideProps({ params }) {
  const requestOption = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/product/id/${params.id}`,
    requestOption
  );
  const data = await res.json();

  const specialDeal = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/product/specials`,
    requestOption
  );
  const dealData = await specialDeal.json();
  return {
    props: {
      product: data,
      dealData: dealData,
    },
  };
}

const ProductDetail = ({ product, dealData }) => {
  const [loading, setLoading] = useState(false);
  const [renderImage, setRenderImage] = useState("");
  const wishlist = useWishlist();
  const [toggle, setToggle] = useState("description");
  const addToCartHandler = async () => {
    const token = getCookie("token");
    if (token) {
      setLoading(true);
      const body = {
        product_id: product.id,
        quantity: 1,
      };
      const fetchData = await fetchMethod("POST", "cart/add", token, body);
      if (fetchData?.success) {
        addCart({ ...product, quantity: 1 });
        SuccessNotification({
          message: "Сагсанд амжилттай орлоо!",
          title: `${product?.name}`,
        });
        setLoading(false);
      } else {
        ErrorNotification({ title: "Алдаа гарлаа." });
      }
    } else {
      addCart({ ...product, quantity: 1 });
      SuccessNotification({
        message: "Сагсанд амжилттай орлоо!",
        title: `${product?.name}`,
      });
    }
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
        requestOption
      );
      if (data.success) {
        wishlist.addItem(data);
        showNotification({
          message: res.message,
          icon: <IconCheck />,
          color: "green",
        });
      } else {
        showNotification({
          message: data.message,
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
      <div className="relative w-full h-full overflow-hidden">
        <Image
          src={src}
          className="w-full h-full"
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

  return (
    <CategoryLayout title={product?.name}>
      <div className="flex flex-col min-h-screen xl:px-10 lg:px-20 md:px-16 sm:px-11 lg:py-12  items-start py-4 px-4 min-w-96">
        <div className="flex w-full lg:gap-20 justify-start ">
          <div className="flex lg:gap-14 gap-4 justify-center xl:flex-row lg:flex-col md:flex-col  sm:flex-col xs:flex-col xs2:flex-col flex-col lg:none w-full">
            <div className="flex flex-col">
              <div className="relative h-[50vh] lg:w-[100%] xl:w-[33vw] lg:h-[33vw] sm:w-[100%] sm:h-[66vw] xs:w-[100%] xs:h-[66vw]  xs2:w-[66vw] xs2:h-[66vw] bg-gray-100 border-2 rounded-md w-full">
                {product?.additionalImage?.length > 0 ? (
                  <ImageMagnifier
                    src={
                      renderImage === ""
                        ? `${product?.additionalImage[0]?.url}`
                        : renderImage
                    }
                    width={400}
                    fill
                    className="object-contain rounded-md"
                  />
                ) : (
                  <div className="h-full flex flex-col gap-2 justify-center items-center bg-gray-50 rounded-md">
                    <ThemeIcon
                      size="lg"
                      variant="light"
                      color="green"
                      // gradient={{ from: "teal", to: "lime", deg: 105 }}
                    >
                      <IconPhotoOff size="80%" stroke={0.5} />
                    </ThemeIcon>

                    <Text size="sm" weight={300}>
                      Зураггүй{" "}
                    </Text>
                  </div>
                )}
              </div>
              <div>
                <Grid gutter={1}>
                  {product?.additionalImage?.map((item, index) => {
                    return (
                      <Grid.Col span={3} key={index}>
                        <div
                          className={
                            renderImage === item?.url
                              ? "relative w-full h-32 rounded-md border-2 border-button-yellow"
                              : "relative h-32 rounded-md hover:border-2 border-gray-300 w-full"
                          }
                          onClick={() => clickImage(item)}
                        >
                          <Image
                            alt="item"
                            src={item.url}
                            fill
                            className="object-cover rounded-md p-1"
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
                <div className="lg:text-2xl text-lg font-semibold">
                  {product?.name}
                </div>
                <div className="flex font-semibold gap-2">
                  <span className="text-greenish-grey text-base">
                    Ширхэгийн үнэ:
                  </span>
                  <span className="text-base">
                    {Intl.NumberFormat("mn-MN").format(product?.listPrice)}₮
                  </span>
                </div>
                <div className="flex font-semibold gap-2">
                  <span className="text-greenish-grey text-base  ">
                    Бөөний үнэ:
                  </span>
                  <span className="text-greenish-grey line-through text-base ">
                    {" "}
                    {Intl.NumberFormat("mn-MN").format(product?.listPrice)}₮
                  </span>
                  <span className="text-greenish-grey text-base "> / </span>
                  <span className="text-base">
                    {" "}
                    {Intl.NumberFormat("mn-MN").format(product?.wholePrice)}₮
                  </span>
                </div>
                <div className="flex font-semibold  gap-2 items-center">
                  <span className="text-greenish-grey text-base  ">
                    Үлдэгдэл:
                  </span>
                  {product?.balance > 10 ? (
                    <Badge color="teal">Хангалттай</Badge>
                  ) : product?.balance == 0 ? (
                    <Badge color="yellow">Үлдэгдэлгүй</Badge>
                  ) : (
                    <span className="text-greenish-grey text-base  ">
                      {product?.balance}
                    </span>
                  )}
                </div>
                <div className="flex gap-2 font-semibold text-base flex-row ">
                  <span className="text-greenish-grey text-base ">Төрөл:</span>
                  <div className="flex flex-row gap-3 lg:flex-col">
                    <span className="text-base	">
                      {product?.categoryName + " " + product?.groupName}
                    </span>
                  </div>
                </div>
                {product?.note && (
                  <div className="flex gap-2 font-semibold text-base flex-row ">
                    <span className="text-greenish-grey text-base ">
                      Тэмдэглэл:
                    </span>

                    <div className="flex flex-row gap-3 lg:flex-col">
                      <Text className="text-base break-all">
                        {product?.note}
                      </Text>
                    </div>
                  </div>
                )}
                {product?.description && (
                  <div className="flex flex-col gap-4">
                    <span className="flex font-semibold text-greenish-grey text-base">
                      Хэрэглэх заавар
                    </span>
                    <textarea
                      cols={60}
                      rows={8}
                      readOnly
                      className="w-full overflow-x-hidden overflow-y-auto focus: outline-0 py-3 px-3 rounded-md text-base"
                      value={product.description}
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

              <div className="flex gap-6 w-full mt-5">
                <Button
                  variant={"outline"}
                  rightIcon={<IconHeart size={20} stroke={2} />}
                  size="md"
                  styles={{
                    label: { fontWeight: 500 },
                  }}
                  color={"red"}
                  className=" flex justify-between items-center px-5 py-3 rounded-md"
                  onClick={() => addToWishlist()}
                >
                  Хадгалах
                </Button>
                <Button
                  variant={"filled"}
                  size="md"
                  color={"orange"}
                  className="flex justify-between items-center px-5 py-3 rounded-md"
                  disabled={loading}
                  rightIcon={
                    loading ? (
                      <Loader size="xs" color="yellow" />
                    ) : (
                      <AiOutlineShoppingCart
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

        <hr className="my-12 lg:my-14 w-full border" />
        <div className="container flex flex-col">
          <div className="flex flex-row gap-10">
            <button
              className={`text-black text-lg py-3 ${
                toggle === "description"
                  ? "font-semibold border-b-1  border-[#F9BC60]"
                  : "font-normal text-[#98A2B3]"
              }`}
              onClick={() => setToggle("description")}
            >
              Тайлбар
            </button>
            <button
              className={`text-lg ${
                toggle === "detailed_description"
                  ? "font-semibold text-black border-b-1  border-[#F9BC60]"
                  : "font-normal text-[#98A2B3]"
              }`}
              onClick={() => setToggle("detailed_description")}
            >
              Дэлгэрэнгүй тайлбар
            </button>
            <button
              className={`text-lg ${
                toggle === "note"
                  ? "font-semibold text-black border-b-1  border-[#F9BC60]"
                  : "font-normal text-[#98A2B3]"
              }`}
              onClick={() => setToggle("note")}
            >
              Тэмдэглэл
            </button>
          </div>
          {toggle === "description" && (
            <div className="mt-4 bg-white p-4 rounded-md">
              {product?.description ? (
                <textarea
                  cols={60}
                  rows={8}
                  readOnly
                  className="w-full overflow-x-hidden overflow-y-auto focus: outline-0 py-3 px-3 rounded-md text-base font-normal"
                  value={product?.description}
                />
              ) : (
                <div className="flex justify-center items-center h-40 flex-col">
                  <IconNotesOff size="2.5rem" stroke={1.5} color="orange" />
                  <span className="mt-2 font-medium text-base text-grey">
                    Тайлбар хоосон байна.
                  </span>
                </div>
              )}
            </div>
          )}
          {toggle === "detailed_description" && (
            <div className="mt-4 bg-white p-4 rounded-md">
              {product?.description ? (
                <textarea
                  cols={60}
                  rows={8}
                  readOnly
                  className="w-full overflow-x-hidden overflow-y-auto focus: outline-0 py-3 px-3 rounded-md text-base"
                  value={product?.description}
                />
              ) : (
                <div className="flex justify-center items-center h-40 flex-col">
                  <IconNotesOff size="2.5rem" stroke={1.5} color="orange" />
                  <span className="mt-2 font-medium text-base text-grey">
                    Дэлгэрэнгүй тайлбар хоосон байна.
                  </span>
                </div>
              )}
            </div>
          )}
          {toggle === "note" && (
            <div className="mt-4 bg-white p-4 rounded-md">
              {product?.description ? (
                <textarea
                  cols={60}
                  rows={8}
                  readOnly
                  className="w-full overflow-x-hidden overflow-y-auto focus: outline-0 py-3 px-3 rounded-md text-base"
                  value={product?.note}
                />
              ) : (
                <div className="flex justify-center items-center h-40 flex-col">
                  <IconNotesOff size="2.5rem" stroke={1.5} color="orange" />
                  <span className="mt-2 font-medium text-base text-grey">
                    Тэмдэглэл хоосон байна.
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="w-full">
          {dealData &&
            dealData?.data &&
            dealData?.data.map((item, index) => {
              if (index === 0) {
                return (
                  <SpecialDeal
                    key={`list-with-category-${index}`}
                    suggest={true}
                    categoryId={item?.id}
                    categoryName={"Санал болгож буй бүтээгдэхүүн"}
                    cols={5}
                    product={item}
                    className="mt-12"
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
