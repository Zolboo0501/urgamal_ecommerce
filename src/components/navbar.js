import Image from "next/image";
import NavBarLinks from "../components/nav-bar-links"
import Link from "next/link";
import { useRouter } from 'next/router'
import { Button } from '@mantine/core'
import { useContext, useEffect, useState } from "react";
import { Store } from "@/utils/Store";
import { getCookie } from "cookies-next";
const Navbar = () => {
  const router = useRouter()
  const { state, dispatch } = useContext(Store)
  const { cart } = state;
  const [cartItem, setCartItem] = useState([])
  const [quantity, setQuantity] = useState(0)
  const route = useRouter();
  const [number, setNumber] = useState("")
  const linkToCart = () => {
    router.push({
      pathname: '/cart/cartItem',
    })
  }

  const handleChangeStorage = () => {
    let localStorageCart = JSON.parse(localStorage.getItem("cartItems"));
    if (localStorageCart !== null) {
      setCartItem(localStorageCart?.cart?.cartItems)
      let sum = 0
      localStorageCart.cart.cartItems.forEach((e) => {
        if (e !== null) {
          sum = sum + e.quantity
        }
      })
      setQuantity(sum)
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      // client-side operation such as local storage.
      window.addEventListener('storage', handleChangeStorage);
    }
    const number = getCookie("number")
    if (number !== undefined && number !== null && number !== "") {
      setNumber(number)
    }
  }, [])

  return (
    <div
      className="bg-white flex flex-row  justify-between  items-center py-2 px-32 "
      style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.06)" }}
    >
      <Link href={"/home"}>
        <p className="flex flex-row justify-center items-center text-black">
          ТАРИMАЛ{" "}
          <Image src="/logo.png" width={30} height={30} className="mx-4" />{" "}
          УРГАMАЛ
        </p>
      </Link>

      <div className="flex flex-row">
        <NavBarLinks
          name={"Өрхийн тариаланч"}
          linkUrl={"hhhh"}
          onClick={() => print("Hello")}
        />
        {/* <NavBarLinks
          name={"Мэргэжлийхэнд"}
          linkUrl={"hhhh"}
          onClick={() => print("Hello")}
        /> */}
        {/* <NavBarLinks
          name={"Үйлдвэр"}
          linkUrl={"hhhh"}
          onClick={() => print("Hello")}
        /> */}
        <div className="px-4 flex justify-center items-center">
          <Link href={"hhhh"} onClick={() => { }} className="mx-4 text-center text-black">
            Мэргэжлийхэнд
          </Link>
        </div>
      </div>
      <div className="flex flex-row items-center">
        <Button compact variant={"white"} className="static flex flex-col items-center mr-4">
          <Image src="/icons/hearth.svg" width={23} height={23} />
          <div className="absolute">
            <div className="w-3.5 h-3.5 bg-number flex justify-center items-center text-white -mt-5 rounded-full text-xs ml-5">
              <p className="text-sm-5">1</p>
            </div>
          </div>
        </Button>
        <Button compact variant={"white"} className="static flex flex-col items-center mr-4" onClick={() => linkToCart()}>
          <Image src="/icons/trolley.svg" width={23} height={23} />
          <div className="absolute">
            <div className="w-3.5 h-3.5 bg-number flex justify-center items-center text-white -mt-5 rounded-full text-xs ml-5">
              <p className="text-sm-5">{quantity}</p>
            </div>
          </div>
        </Button>

        <div className="flex flex-col ml-6 items-end w-24">
          <p className="text-sm-1 self-end">Таны сагсанд</p>
          <p className="text-sm-1" style={{ fontSize: "16px" }}>
            15000₮
          </p>
        </div>
        <div className="flex flex-row items-center" onClick={() => { route.push("/profile") }}>
          <div className="flex justify-center items-center ml-10">
            <Image src="/user.png" width={40} height={40} className="" />
          </div>
          <div className="ml-4 flex flex-col items-start w-24">
            <p className="text-sm-1">Сайн байна уу?</p>
            <p className="text-base">{number !== "" ? number : "*********"}</p>
          </div>
        </div>

        <Image src="/icons/arrow-down.svg" width={30} height={30} />
      </div>
    </div>
  );
};

export default Navbar;
