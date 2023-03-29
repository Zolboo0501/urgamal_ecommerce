import Image from "next/image";
import { useEffect, useContext, useState } from "react";
import GlobalLayout from "../../components/GlobalLayout/GlobalLayout";
import ProductTypeChip from "../../components/ProductTypeChip/ProductTypeChip";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Magnifier from "../../components/Magnifier/Magnifier";
import { BsSuitHeart, BsSuitHeartFill } from 'react-icons/bs';
import { AiOutlineShoppingCart } from 'react-icons/ai';
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import ProductCardExample from "../../components/ProductCardExample";
import { LoadingOverlay, Button } from "@mantine/core";
import { Store } from "@/utils/Store";
import { getCookie } from "cookies-next";
import { SuccessNotification } from "../../utils/SuccessNotification";
import { IconHeart } from "@tabler/icons-react";
export async function getServerSideProps({ params }) {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/single?productid=${params.id}`)
  const data = await res.json();
  return {
    props: {
      product: data.data,
    },
  };
}

const ProductDetail = ({ product }) => {

  const { state, dispatch } = useContext(Store)
  const [loading, setLoading] = useState(false)
  console.log(product, "product")
  const addToCartHandler = async () => {
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity: 1, purchaseCount: 1 } });
    setLoading(true)
    const token = getCookie("token")
    console.log(token, "token");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append('Content-Type', 'application/json',);
    const requestOption = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        item_id: product.id,
        qty: 1,
        businessId: "local_test"
      })
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/add/local`, requestOption)
    if (res.status === 200) {
      const data = await res.json();
      console.log(data, "data")
      if (data.success === true) {
        console.log("sucesssss")
        SuccessNotification({ message: "Сагсанд амжилттай орлоо.!", title: "Сагс" })
        setLoading(false)
      }
    }
  }
  return (
    <GlobalLayout title={product.name}>

      <div className="px-32">
        <div className="flex gap-14 pt-12 justify-center">
          {/* <Image src="https://m.media-amazon.com/images/I/71MzNrCPYsL.jpg" width={50} height={50} /> */}
          {/* <Image src="/bundle-1.svg" width={315} height={380} /> */}
          <Magnifier imgSrc={product.product_image !== null ? `http://${product.product_image.images[0]}` : "/bundle-1.svg"} imgWidth={515} imgHeight={515} magnifierRadius={50} />
          {/* <ReactImageMagnify
            {...{
              smallImage: {
                alt: "Wristwatch by Ted Baker London",
                height: 380,
                width: 315,
                src: "https://picsum.photos/id/1019/1000/600/",
              },
              largeImage: {
                src: "https://picsum.photos/id/1019/1000/600/",
                width: 1200,
                height: 1800,
              },
              enlargedImagePosition: "over",
              enlargedImageContainerDimensions: {
                width: "100%",
                height: "100%",
              },
            }}
          /> */}
          {/* <Magnifier imgSrc="https://picsum.photos/id/1019/1000/600/" imgWidth={600} imgHeight={600} magnifierRadius={150} /> */}
          {/* <Carousel
            infiniteLoop={true}
            autoPlay
            interval={3000}
            showThumbs={true}
            showArrows={false}
            showStatus={true}
            showIndicators={false}
            swipeable={true}
            renderThumbs={() =>
              images.map((img, idx) => (
                <div key={idx} className="w-full h-20 relative">
                  <Image src={img.thumbnail} fill alt="logo"></Image>
                </div>
              ))
            }
          >
            {images.map((e) => (
              <div>
                <Magnifier imgSrc={e.original} imgWidth={600} imgHeight={600} magnifierRadius={50} />
                
              </div>
            ))}
          </Carousel> */}

          <div className="flex flex-col gap-6">
            <div className=" text-lg font-semibold">{product.name}</div>
            <div className="flex font-semibold gap-2">
              <span className="text-greenish-grey  ">Ширхэгийн үнэ:</span>
              <span className=" ">{
                Intl.NumberFormat('mn-MN').format(product.price)}₮</span>
            </div>
            <div className="flex font-semibold gap-2" >
              <span className="text-greenish-grey  ">Бөөний үнэ:</span>
              <span className="text-greenish-grey line-through "> {Intl.NumberFormat('mn-MN').format(product.promo_price)}₮</span>
              <span className="text-greenish-grey  "> / </span>
              <span> {Intl.NumberFormat('mn-MN').format(product.price)}₮</span>
            </div>
            <div className="flex font-semibold  gap-2">
              <span className="text-greenish-grey  ">Үлдэгдэл:</span>
              <span>{product.instock}</span>
            </div>
            <div className="flex gap-2 font-semibold">
              <span className="text-greenish-grey  ">Төрөл:</span>
              {product.CategoryName &&
                <ProductTypeChip name={product.CategoryName} />
              }
              <ProductTypeChip name="Бордоо" />
            </div>
            <div className="flex flex-col gap-4">
              <span className="flex font-semibold text-greenish-grey">Хэрэглэх заавар</span>
              <textarea
                cols={60}
                rows={12}
                readOnly
                className=" overflow-x-hidden overflow-y-hidden focus: outline-0 py-3 px-3 rounded-md"
                value="Хэрэглэх заавар, Хэрэглэх заавар, Хэрэглэх заавар, Хэрэглэх заавар, Хэрэглэх заавар, Хэрэглэх заавар, Хэрэглэх заавар,Хэрэглэх заавар, Хэрэглэх заавар, Хэрэглэх заавар, Хэрэглэх
                заавар, Хэрэглэх заавар, Хэрэглэх заавар, Хэрэглэх заавар, Хэрэглэх заавар, Хэрэглэх заавар, Хэрэглэх заавар, Хэрэглэх заавар , Хэрэглэх заавар, Хэрэглэх заавар, Хэрэглэх заавар,
                Хэрэглэх заавар, Хэрэглэх"
              ></textarea>
            </div>

            <div className="flex gap-6 w-full mt-5">
              <Button variant={"outline"} rightIcon={<IconHeart size={20} stroke={2.5} />} size="md" styles={{
                label: { fontWeight: 500 }
              }} color={"red"} className="flex-grow flex justify-between items-center px-5 py-3 rounded-md"  >
                Хадгалах
              </Button>
              <Button variant={"filled"} style={{ width: "30%" }} size="md" color={"orange"} className="flex-grow flex justify-between items-center px-5 py-3 rounded-md" rightIcon={loading === false && <AiOutlineShoppingCart className="font-semibold" size={20} />}
                onClick={() => addToCartHandler()} >
                {loading === true ? <LoadingOverlay
                  loaderProps={{ size: 'sm', color: 'white', }}
                  overlayOpacity={0.1} visible={loading} /> : <span className="font-semibold" > Сагсанд хийх </span>}
              </Button>
            </div>
          </div>

        </div>
        <hr className="my-10" />
        <div className="w-full flex flex-col">
          <div className="flex flex-row w-full justify-between">
            <p className="ml-2 text-lg font-semibold">Санал болгож буй бүтээгдэхүүнүүд</p>
            <div className="flex flex-row">
              <div className="flex justify-center items-center rounded-full bg-white w-7 ">
                <Image src="/icons/arrow-left.svg" width={10} height={22} />
              </div>
              <div className="flex justify-center items-center rounded-full w-7 ml-2 bg-background-sort pl-1 ">
                <Image src="/icons/arrow-right.svg" width={10} height={22} />
              </div>
            </div>
          </div>
          <div style={{ width: "100%", gap: "30px", flexWrap: "wrap" }}
            className="flex flex-row mt-12">
            <div style={{ width: "18%", }} >
              <ProductCardExample
                src={"/bundle-1.svg"}
                name={"Энерген Экстра"}
                count={"50ш"}
                price={"15’000"}
              />
            </div>
            <div style={{ width: "18%", }} >
              <ProductCardExample
                src={"/bundle-1.svg"}
                name={"Энерген Экстра"}
                count={"50ш"}
                price={"15’000"}
              />
            </div>
            <div style={{ width: "18%", }} >
              <ProductCardExample
                src={"/bundle-1.svg"}
                name={"Энерген Экстра"}
                count={"50ш"}
                price={"15’000"}
              />
            </div>
            <div style={{ width: "18%", }} >
              <ProductCardExample
                src={"/bundle-1.svg"}
                name={"Энерген Экстра"}
                count={"50ш"}
                price={"15’000"}
              />
            </div>
            <div style={{ width: "18%", }} >
              <ProductCardExample
                src={"/bundle-1.svg"}
                name={"Энерген Экстра"}
                count={"50ш"}
                price={"15’000"}
              />
            </div>
            <div style={{ width: "18%", }} >
              <ProductCardExample
                src={"/bundle-1.svg"}
                name={"Энерген Экстра"}
                count={"50ш"}
                price={"15’000"}
              />
            </div>
            <div style={{ width: "18%", }} >
              <ProductCardExample
                src={"/bundle-1.svg"}
                name={"Энерген Экстра"}
                count={"50ш"}
                price={"15’000"}
              />
            </div>
            <div style={{ width: "18%", }} >
              <ProductCardExample
                src={"/bundle-1.svg"}
                name={"Энерген Экстра"}
                count={"50ш"}
                price={"15’000"}
              />
            </div>
            <div style={{ width: "18%", }} >
              <ProductCardExample
                src={"/bundle-1.svg"}
                name={"Энерген Экстра"}
                count={"50ш"}
                price={"15’000"}
              />
            </div>
            <div style={{ width: "18%", }} >
              <ProductCardExample
                src={"/bundle-1.svg"}
                name={"Энерген Экстра"}
                count={"50ш"}
                price={"15’000"}
              />
            </div>
            {/* <Swiper
              slidesPerView={5}
              spaceBetween={30}
              auto
              pagination={{
                clickable: true,
              }}
            >
              <SwiperSlide className="rounded-md">
                <ProductCardSwiper
                  src={"/bundle-1.svg"}
                  name={"Энерген Экстра"}
                  count={"50ш"}
                  price={"15’000₮"}
                />
              </SwiperSlide>
              <SwiperSlide className="rounded-md">
                <ProductCardSwiper
                  src={"/bundle-1.svg"}
                  name={"Энерген Экстра"}
                  count={"50ш"}
                  price={"15’000₮"}
                />
              </SwiperSlide>
              <SwiperSlide className="rounded-md">
                <ProductCardSwiper
                  src={"/bundle-1.svg"}
                  name={"Энерген Экстра"}
                  count={"50ш"}
                  price={"15’000₮"}
                />
              </SwiperSlide>
              <SwiperSlide className="rounded-md">
                <ProductCardSwiper
                  src={"/bundle-1.svg"}
                  name={"Энерген Экстра"}
                  count={"50ш"}
                  price={"15’000₮"}
                />
              </SwiperSlide>
              <SwiperSlide className="rounded-md">
                <ProductCardSwiper
                  src={"/bundle-1.svg"}
                  name={"Энерген Экстра"}
                  count={"50ш"}
                  price={"15’000₮"}
                />
              </SwiperSlide>
            </Swiper> */}
          </div>
        </div>
      </div >
    </GlobalLayout >
  );
}

export default ProductDetail;