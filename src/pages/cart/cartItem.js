/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Checkbox,
  Table,
  ActionIcon,
  Modal,
  Text,
  Badge,
  Loader,
  Stack,
  Switch,
  Tooltip,
  LoadingOverlay,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import {
  IconMinus,
  IconPlus,
  IconTrash,
  IconArrowLeft,
  IconCheck,
  IconCircleXFilled,
} from "@tabler/icons-react";
import { BsCartX } from "react-icons/bs";
import { useState, useEffect, useContext } from "react";
import Address from "./shippingAddress";
import { useRouter } from "next/router";
import {
  getCart,
  removeFromCart,
  addQuantityProduct,
  removeQuantityProduct,
  emptyCart,
  syncCart,
} from "@/utils/Store";
import { IconAlertCircle } from "@tabler/icons-react";
import GlobalLayout from "@/components/GlobalLayout/GlobalLayout";
import {
  SuccessNotification,
  ErrorNotification,
} from "../../utils/SuccessNotification";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { openContextModal } from "@mantine/modals";
import axios from "axios";
import Image from "next/image";
import { UserConfigContext } from "@/utils/userConfigContext";
import { fetchMethod } from "@/utils/fetch";
import InvoiceModal from "@/components/InvoiceModal/InvoiceModal";
import InvoiceInputModal from "@/components/InvoiceModal/InvoiceInputModal";

const CartItems = (props) => {
  const [isCheckAll, setIsCheckAll] = useState(false);
  const router = useRouter();
  const { auth } = useContext(UserConfigContext);
  const [cartItem, setCartItem] = useState();
  const [checked, setChecked] = useState(false);
  const [addressVisible, setAddressVisible] = useState(false);
  const [orderId, setOrderId] = useState();
  const userToken = getCookie("token");
  const addToCart = getCookie("addToCart");
  const [loadingOrder, setLoadingOrder] = useState(false);
  const [selectedShippingData, setSelectedShippingData] = useState({});
  const [select, setSelect] = useState(false);
  const [loadingCart, setLoadingCart] = useState(false);

  const [loaderOpened, { open: openLoader, close: closeLoader }] =
    useDisclosure(false);
  const [optionOpened, { open: optionOpen, close: optionClose }] =
    useDisclosure(false);
  const [inputOpened, { open: openInput, close: closeInput }] =
    useDisclosure(false);
  const handleBack = () => {
    router.push("/");
  };

  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    const newData = cartItem?.cart_items?.map((item) => {
      if (isCheckAll) {
        item.isChecked = false;
        return item;
      } else {
        item.isChecked = true;
        return item;
      }
    });
    setCartItem({ ...cartItem, cart_items: newData });
  };

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

  useEffect(() => {
    if (userToken) {
      setAddressVisible(true);
    } else {
      setAddressVisible(false);
    }
  }, [userToken]);

  const storageToCart = async () => {
    let dataStorage = getCart();
    if (dataStorage) {
      const convert = dataStorage?.cart_items?.map((item) => {
        return {
          id: item.id,
          quantity: item.quantity,
        };
      });
      const requestOption = {
        products: convert,
      };
      const data = await fetchMethod(
        "POST",
        "cart/sync",
        userToken,
        requestOption
      );
      if (data?.success) {
      } else {
        ErrorNotification({ title: "Алдаа гарлаа." });
      }
    }
  };

  const getUserCart = async () => {
    const data = await fetchMethod("GET", "cart", userToken);
    if (data?.success) {
      if (data?.cart) {
        if (data?.cart?.cart_items?.length === 0) {
          setCartItem(data?.cart);
          emptyCart();
        } else {
          setCartItem(data?.cart);
          syncCart(data?.cart);
        }
      } else {
        setCartItem({ cart: { cart_items: [] } });
        emptyCart();
      }
    } else {
      setCartItem({ cart: { cart_items: [] } });
      emptyCart();
    }
  };

  useEffect(() => {
    const addedCartItems = async () => {
      if (addToCart) {
        setLoadingCart(true);
        await storageToCart();
        await getUserCart();
        deleteCookie("addToCart");
        setTimeout(() => setLoadingCart(false), 1500);
      }
    };
    addedCartItems();
  }, [addToCart]);

  const deleteFromCart = async () => {
    let check = true;
    let newArr = [...cartItem?.cart_items];
    let removedArr = [];
    let cartId;
    newArr.forEach((e) => {
      if (e.isChecked === true) {
        const index = newArr.indexOf(e);
        delete newArr[index];
        cartId = e.cartid;
        removedArr.push(e.id);
        check = false;
      }
    });
    let temp = [];
    if (check === true) {
      return showNotification({
        message: "Устгах бараа сонгоно уу",
        color: "red",
      });
    } else {
      newArr.forEach((e) => {
        if (e !== null && e !== undefined && !e.length) {
          temp.push(e);
        }
      });
      if (userToken) {
        if (temp.length === 0) {
          const data = await fetchMethod("DELETE", "cart/whole", userToken);
          if (data?.success) {
            // setCartItem({ ...cartItem, cart_items: temp });
            // removeFromCart(temp);
            getUserCart();
            SuccessNotification({
              message: "Бараа амжилттай устлаа.",
              title: "Сагс",
            });
          } else {
            ErrorNotification({ title: "Алдаа гарлаа." });
          }
        } else {
          const requestOption = {
            cart_item_id: removedArr,
            cart_id: cartId,
          };
          const data = await fetchMethod(
            "DELETE",
            "cart",
            userToken,
            requestOption
          );
          if (data?.success) {
            getUserCart();
            // setCartItem({ ...cartItem, cart_items: temp });
            // removeFromCart(temp);
            SuccessNotification({
              message: "Бараа амжилттай устлаа.",
              title: "Сагс",
            });
          } else {
            ErrorNotification({ title: "Алдаа гарлаа." });
          }
        }
      } else {
        setCartItem({ ...cartItem, cart_items: temp });
        removeFromCart(temp);
        SuccessNotification({
          message: "Бараа амжилттай устлаа.",
          title: "Сагс",
        });
      }
      removedArr = [];
    }
  };

  const handleClick = (e) => {
    let newArr = [...cartItem?.cart_items];
    newArr.forEach((item) => {
      if (item.id === e.id) {
        item.isChecked = !e.isChecked;
      }
    });
    setCartItem({ ...cartItem, cart_items: newArr });
  };

  const handleOrder = async () => {
    optionClose();
    openLoader();
    const data = `Хот: ${selectedShippingData?.city}, Дүүрэг: ${selectedShippingData?.district}, Хороо: ${selectedShippingData.committee}, Гудамж: ${selectedShippingData?.street}, Байр: ${selectedShippingData?.apartment}, Тоот: ${selectedShippingData?.number}, Утас: ${selectedShippingData?.phone}`;
    const axiosReqOption = {
      headers: {
        Authorization: "Bearer " + userToken,
        "Content-Type": "application/json",
      },
    };
    const requestOption = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + userToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address: data,
      }),
    };
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/order`,
        requestOption
      );
      if (res.status === 200) {
        const data = await res.json();
        if (data.success === true) {
          setOrderId(data.orderid);
          let temp = [];
          setCartItem(temp);
          emptyCart();
          SuccessNotification({ message: data.message, title: "Захиалга" });
          axios
            .get(
              `${process.env.NEXT_PUBLIC_API_URL}/order/payment/${data.orderid}`,
              axiosReqOption
            )
            .then((res) => {
              openContextModal({
                modal: "payment",
                title: "Төлбөр төлөлт",
                innerProps: {
                  paymentData: res.data?.invoice,
                  shouldRedirect: true,
                },
                centered: true,
                size: "lg",
                closeOnClickOutside: false,
                withCloseButton: false,
              });
            })
            .catch((err) => {
              if (err.response) {
                showNotification({
                  message: err.response.data,
                  color: "red",
                });
              } else {
                showNotification({
                  message: "Төлбөрийн мэдээлэл авахад алдаа гарлаа",
                  color: "red",
                });
              }
            });
        } else {
          ErrorNotification({ title: "Алдаа гарлаа." });
        }
      } else if (res.status === 500) {
        showNotification({
          message: "Сагсанд бараа байхгүй байна!",
          color: "red",
        });
      }
    } catch (error) {
      console.log(error, "error");
      showNotification({
        message: "Захиалга үүсгэхэд алдаа гарлаа!",
        color: "red",
      });
    }
    closeLoader();
  };

  const handleInvoice = () => {
    optionClose();
    inputOpened();
  };

  const makeOrder = async () => {
    if (cartItem?.cart_items?.length > 0) {
      if (auth) {
        if (select) {
          optionOpen();
        } else {
          if (checked === false) {
            showNotification({
              message: "Хаяг сонгоно уу эсвэл очиж авахыг идэвхжүүлнэ үү",
              color: "red",
            });
          } else {
            openLoader();
            setLoadingOrder(true);
            const axiosReqOption = {
              headers: {
                Authorization: "Bearer " + userToken,
                "Content-Type": "application/json",
              },
            };
            const requestOption = {
              method: "POST",
              headers: {
                Authorization: "Bearer " + userToken,
                "Content-Type": "application/json",
              },
            };
            try {
              const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/order`,
                requestOption
              );
              if (res.status === 200) {
                const data = await res.json();
                if (data.success === true) {
                  // open();
                  setLoadingOrder(false);
                  setOrderId(data.orderid);
                  let temp = [];
                  const cartItems = cartItem;
                  setCartItem(temp);
                  emptyCart();
                  SuccessNotification({
                    message: data.message,
                    title: "Захиалга",
                  });
                  axios
                    .post(
                      `${process.env.NEXT_PUBLIC_API_URL}/payment`,
                      { orderid: data.orderid },
                      axiosReqOption
                    )
                    .then((res) => {
                      openContextModal({
                        modal: "payment",
                        title: "Төлбөр төлөлт",
                        innerProps: {
                          paymentData: res.data.data,
                          shouldRedirect: true,
                        },
                        centered: true,
                        size: "lg",
                        closeOnClickOutside: false,
                        withCloseButton: false,
                      });
                    })
                    .catch((err) => {
                      if (err.response) {
                        showNotification({
                          message: err.response.data,
                          color: "red",
                        });
                      } else {
                        showNotification({
                          message: "Төлбөрийн мэдээлэл авахад алдаа гарлаа",
                          color: "red",
                        });
                      }
                    });
                } else {
                  setLoadingOrder(false);
                  ErrorNotification({ title: "Алдаа гарлаа." });
                }
              } else if (res.status === 500) {
                setLoadingOrder(false);
                showNotification({
                  message: "Сагсанд бараа байхгүй байна!",
                  color: "red",
                });
              }
            } catch (error) {
              setLoadingOrder(false);
              showNotification({
                message: "Захиалга үүсгэхэд алдаа гарлаа!",
                color: "red",
              });
            }
            closeLoader();
          }
        }
      } else {
        router.push("/login");
      }
    } else {
      showNotification({
        message: "Сагс хоосон байна.",
        color: "red",
      });
    }
  };

  const handleInvoiceInput = async (values) => {
    const addressData = `Хот: ${selectedShippingData?.city}, Дүүрэг: ${selectedShippingData?.district}, Хороо: ${selectedShippingData.committee}, Гудамж: ${selectedShippingData?.street}, Байр: ${selectedShippingData?.apartment}, Тоот: ${selectedShippingData?.number}`;
    const requestOption = {
      address: addressData,
      method: "invoice",
      companyName: values?.companyName,
      contact: values?.contact,
      email: values?.email,
      registry: values?.registry,
    };
    const token = getCookie("token");
    const data = await fetchMethod(
      "POST",
      "order/invoice",
      token,
      requestOption
    )
      .then(() => {
        showNotification({
          message: "Амжилттай нэхэмжлэл үүслээ.",
          icon: <IconCheck />,
          color: "green",
        });
        let temp = [];
        setCartItem(temp);
        emptyCart();
        closeInput();
        router.push({
          pathname: "/profile",
          query: { cr: "invoice" },
        });
      })
      .catch(() => {
        closeInput();
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
      });

    // if (auth) {
    //   if (select) {
    //     openLoader();
    //     const data = `Хот: ${selectedShippingData?.city}, Дүүрэг: ${selectedShippingData?.district}, Хороо: ${selectedShippingData.committee}, Гудамж: ${selectedShippingData?.street}, Байр: ${selectedShippingData?.apartment}, Тоот: ${selectedShippingData?.number}, Утас: ${selectedShippingData?.phone}`;
    //     const axiosReqOption = {
    //       headers: {
    //         Authorization: "Bearer " + userToken,
    //         "Content-Type": "application/json",
    //       },
    //     };
    //     const requestOption = {
    //       method: "POST",
    //       headers: {
    //         Authorization: "Bearer " + userToken,
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         address: data,
    //       }),
    //     };
    //     try {
    //       const res = await fetch(
    //         `${process.env.NEXT_PUBLIC_API_URL}/order`,
    //         requestOption
    //       );
    //       if (res.status === 200) {
    //         const data = await res.json();
    //         if (data.success === true) {
    //           // open();
    //           const token = getCookie("token");
    //           const decoded = tokenDecode(token);
    //           console.log(decoded, "devocede");
    //           socket.emit("storeMySocketId", decoded.userid);
    //           setOrderId(data.orderid);
    //           let temp = [];
    //           const cartItems = cartItem;
    //           setCartItem(temp);
    //           emptyCart();
    //           SuccessNotification({ message: data.message, title: "Захиалга" });
    //           axios
    //             .get(
    //               `${process.env.NEXT_PUBLIC_API_URL}/order/payment/${data.orderid}`,
    //               axiosReqOption
    //             )
    //             .then((res) => {
    //               openContextModal({
    //                 modal: "payment",
    //                 title: "Төлбөр төлөлт",
    //                 innerProps: {
    //                   paymentData: res.data?.invoice,
    //                   shouldRedirect: true,
    //                 },
    //                 centered: true,
    //                 size: "lg",
    //                 closeOnClickOutside: false,
    //                 withCloseButton: false,
    //               });
    //             })
    //             .catch((err) => {
    //               if (err.response) {
    //                 showNotification({
    //                   message: err.response.data,
    //                   color: "red",
    //                 });
    //               } else {
    //                 showNotification({
    //                   message: "Төлбөрийн мэдээлэл авахад алдаа гарлаа",
    //                   color: "red",
    //                 });
    //               }
    //             });
    //         } else {
    //           ErrorNotification({ title: "Алдаа гарлаа." });
    //         }
    //       } else if (res.status === 500) {
    //         showNotification({
    //           message: "Сагсанд бараа байхгүй байна!",
    //           color: "red",
    //         });
    //       }
    //     } catch (error) {
    //       console.log(error, "error");
    //       showNotification({
    //         message: "Захиалга үүсгэхэд алдаа гарлаа!",
    //         color: "red",
    //       });
    //     }
    //     closeLoader();
    //   } else {
    //     if (checked === false) {
    //       showNotification({
    //         message: "Хаяг сонгоно уу эсвэл очиж авахыг идэвхжүүлнэ үү",
    //         color: "red",
    //       });
    //     } else {
    //       openLoader();
    //       const axiosReqOption = {
    //         headers: {
    //           Authorization: "Bearer " + userToken,
    //           "Content-Type": "application/json",
    //         },
    //       };
    //       const requestOption = {
    //         method: "POST",
    //         headers: {
    //           Authorization: "Bearer " + userToken,
    //           "Content-Type": "application/json",
    //         },
    //       };
    //       try {
    //         const res = await fetch(
    //           `${process.env.NEXT_PUBLIC_API_URL}/order`,
    //           requestOption
    //         );
    //         if (res.status === 200) {
    //           const data = await res.json();
    //           if (data.success === true) {
    //             // open();
    //             setOrderId(data.orderid);
    //             let temp = [];
    //             const cartItems = cartItem;
    //             setCartItem(temp);
    //             emptyCart();
    //             SuccessNotification({
    //               message: data.message,
    //               title: "Захиалга",
    //             });
    //             axios
    //               .post(
    //                 `${process.env.NEXT_PUBLIC_API_URL}/payment`,
    //                 { orderid: data.orderid },
    //                 axiosReqOption
    //               )
    //               .then((res) => {
    //                 openContextModal({
    //                   modal: "payment",
    //                   title: "Төлбөр төлөлт",
    //                   innerProps: {
    //                     paymentData: res.data.data,
    //                     shouldRedirect: true,
    //                   },
    //                   centered: true,
    //                   size: "lg",
    //                   closeOnClickOutside: false,
    //                   withCloseButton: false,
    //                 });
    //               })
    //               .catch((err) => {
    //                 if (err.response) {
    //                   showNotification({
    //                     message: err.response.data,
    //                     color: "red",
    //                   });
    //                 } else {
    //                   showNotification({
    //                     message: "Төлбөрийн мэдээлэл авахад алдаа гарлаа",
    //                     color: "red",
    //                   });
    //                 }
    //               });
    //           } else {
    //             ErrorNotification({ title: "Алдаа гарлаа." });
    //           }
    //         } else if (res.status === 500) {
    //           showNotification({
    //             message: "Сагсанд бараа байхгүй байна!",
    //             color: "red",
    //           });
    //         }
    //       } catch (error) {
    //         showNotification({
    //           message: "Захиалга үүсгэхэд алдаа гарлаа!",
    //           color: "red",
    //         });
    //       }
    //       closeLoader();
    //     }
    //   }
    // } else {
    //   router.push("/login");
    // }
  };

  const minusQuantity = async (count, product) => {
    const initialStock = product.balance;
    count--;
    if (initialStock >= count && count > 0) {
      let clone = { ...product };
      clone.quantity = count;
      clone.total = count * clone.listPrice;
      let temp = [...cartItem?.cart_items];
      temp.forEach((e, index) => {
        if (e.id === product.id) {
          temp[index] = clone;
        }
      });
      if (userToken) {
        const requestOption = {
          cart_item_id: product.id,
          cart_id: product.cartid,
          quantity: count,
        };
        const data = await fetchMethod("PUT", "cart", userToken, requestOption);
        if (data?.success) {
          getUserCart();
          // setCartItem({ ...cartItem, cart_items: temp });
          // removeQuantityProduct(temp);
        } else {
          ErrorNotification({ title: "Алдаа гарлаа." });
        }
      } else {
        setCartItem({ ...cartItem, cart_items: temp });
        removeQuantityProduct(temp);
      }
    }
  };

  const addQuantity = async (count, product) => {
    const initialStock = product.balance;
    count++;
    if (initialStock >= count) {
      let clone = { ...product };
      clone.quantity = count;
      clone.total = count * clone.listPrice;
      let temp = [...cartItem?.cart_items];
      temp.forEach((e, index) => {
        if (e.id === product.id) {
          temp[index] = clone;
        }
      });
      if (userToken) {
        const requestOption = {
          cart_item_id: product.id,
          cart_id: product.cartid,
          quantity: count,
        };
        const data = await fetchMethod("PUT", "cart", userToken, requestOption);
        if (data?.success) {
          getUserCart();
          // setCartItem({ ...cartItem, cart_items: temp });
          // addQuantityProduct(temp);
        } else {
          ErrorNotification({ title: "Алдаа гарлаа." });
        }
      } else {
        setCartItem({ ...cartItem, cart_items: temp });
        addQuantityProduct(temp);
      }
    } else {
      showNotification({
        message: "Барааны үлдэгдэл хүрэлцэхгүй байна.",
        color: "red",
      });
    }
  };

  const ths = (
    <tr className="table-row">
      <th className="lg:py-10 w-[5%]">
        <Checkbox
          value="selectAll"
          onClick={handleSelectAll}
          checked={isCheckAll}
          size="sm"
        />
      </th>
      <th className="w-[40%] text-center">Бараа</th>
      <th className="w-[15%] text-center">Ширхэг</th>
      <th className="w-[20%] text-center">Үнэ</th>
      <th className="w-[20%] text-center">Дүн</th>
    </tr>
  );

  const rows =
    cartItem &&
    cartItem?.cart_items?.map((item, idx) => {
      if (item !== undefined) {
        return (
          <tr key={idx}>
            <td>
              <Checkbox
                className="checkbox-input"
                checked={item.isChecked}
                id={item.id}
                onClick={(e) => handleClick(item)}
                size="sm"
              />
            </td>
            <td>
              <div className="flex flex-row lg:gap-8">
                {/* <Magnifier
                  imgSrc={"/bundle-1.svg"}
                  imgWidth={80}
                  imgHeight={80}
                  magnifierRadius={50}
                /> */}
                {/* <Image
                  loader={() => item?.pictureurl}
                  src={item?.pictureurl}
                  width={80}
                  height={80}
                  alt={item.name}
                /> */}
                <div className="flex flex-col justify-around ml-2 lg:ml-0">
                  <span className="font-[500] lg:text-[1.002rem] text-[0.55rem] text-[#212529]">
                    {item.name}
                  </span>
                  <span className="font-[500] lg:text-[0.87rem] text-[0.6rem] text-[#2125297a]">
                    Үлдэгдэл:{" "}
                    <span className="text-[#212529]">
                      {/* {item.remainStock !== undefined || item.remainStock !== null
                        ? item.remainStock
                        : item.instock - item.quantity} */}
                      {item.balance > 10 ? (
                        <Badge color="teal" size={"xs"}>
                          Хангалттай
                        </Badge>
                      ) : item.balance == 0 ? (
                        <Badge color="yellow" size={"xs"}>
                          Үлдэгдэлгүй
                        </Badge>
                      ) : (
                        <span className="text-greenish-grey text-xs  ">
                          {item.balance}
                        </span>
                      )}
                    </span>
                  </span>
                </div>
              </div>
            </td>
            <td>
              <div className="inherit">
                <div className="flex items-center border border-[#21252923] rounded lg:p-1">
                  <ActionIcon
                    sx={{
                      ":hover": { backgroundColor: "#fff5f5" },
                    }}
                    className="lg:mr-3 w-4 h-4 p-0 m-0"
                    onClick={() => minusQuantity(item.quantity, item)}
                  >
                    <IconMinus
                      size="1.2rem"
                      color="#212529"
                      className="w-2 h-2 lg:w-4 lg:h-4"
                    />
                  </ActionIcon>
                  <span className="font-[500] lg:text-[1rem] text-[0.6rem] text-[#212529]">
                    {item.quantity}
                  </span>
                  <ActionIcon
                    sx={{
                      ":hover": { backgroundColor: "#ebfbee" },
                    }}
                    className="lg:ml-3"
                    onClick={() => addQuantity(item.quantity, item)}
                  >
                    <IconPlus
                      size="1.2rem"
                      color="#212529"
                      className="w-2 h-2 lg:w-4 lg:h-4"
                    />
                  </ActionIcon>
                </div>
              </div>
            </td>
            <td width={"100px"} style={{ textAlign: "center" }}>
              <span className="font-[600] lg:text-[1rem] text-[0.6rem] text-[#212529]">
                {item.listPrice} ₮
              </span>
            </td>
            <td width={"100px"} style={{ textAlign: "center" }}>
              <span className="font-[600] lg:text-[1rem] text-[0.6rem] text-[#212529]">
                {item?.total} ₮
              </span>
            </td>
          </tr>
        );
      }
    });

  return (
    <GlobalLayout>
      <Modal
        centered
        opened={loaderOpened}
        closeOnClickOutside={false}
        closeOnEscape={false}
        withCloseButton={false}
        size="xs"
      >
        <Stack align="center" my="lg" spacing="lg">
          <Text align="center">Уншиж байна...</Text>
          <Loader size="lg" color="yellow" />
        </Stack>
      </Modal>

      <InvoiceModal
        opened={optionOpened}
        onClose={optionClose}
        handleOrder={handleOrder}
        handleInvoice={handleInvoice}
      />

      <InvoiceInputModal
        opened={inputOpened}
        onClose={closeInput}
        handleInvoiceInput={handleInvoiceInput}
      />
      <div className="bg-grey-back w-full lg:px-8 lg:py-4 px-4 py-4  h-screen relative">
        <div className="absolute top-9">
          <Button
            variant="subtle"
            color=""
            leftIcon={<IconArrowLeft />}
            px={0}
            size="lg"
            styles={(theme) => ({
              root: {
                color: theme.fn.darken("#F9BC60", 0.04),
                "&:hover": theme.fn.hover({
                  color: theme.fn.darken("#F9BC60", 0.06),
                  background: "none",
                  textDecoration: "underline",
                }),
              },
            })}
            onClick={handleBack}
          >
            Буцах
          </Button>
        </div>
        <div className="flex md:flex-row flex-col lg:gap-10 lg:mt-8 gap-4 lg:px-32">
          <div className="flex relative flex-col lg:w-[70%] w-[100%] lg:gap-8">
            <div>
              <div className=" bg-white rounded-lg lg:px-10 lg:py-6 px-3 py-3">
                <div className="flex flex-row justify-between">
                  <span className="font-[500] lg:text-[1.3rem] text-[#212529]">
                    Сагс
                  </span>
                  <div className="font-[400] text-[1rem] text-[#ff6868]"></div>
                  <Button
                    component="a"
                    href="#"
                    compact
                    variant="subtle"
                    leftIcon={<IconTrash size="1rem" />}
                    sx={(theme) => ({
                      "@media (max-width: 40em)": {
                        fontSize: theme.fontSizes.xs,
                      },
                    })}
                    color="red"
                    onClick={() => deleteFromCart()}
                  >
                    Устгах
                  </Button>
                </div>
                {/* <Suspense fallback={<Loading />}> */}
                {cartItem?.cart_items?.length > 0 ? (
                  loadingCart ? (
                    <div className="min-h-full h-72 flex flex-col items-center justify-center relative">
                      <LoadingOverlay
                        loaderProps={{ size: "md", color: "#f9bc60" }}
                        overlayOpacity={0.1}
                        visible={loadingCart}
                      />
                    </div>
                  ) : (
                    <div className="mt-6 overflow-auto max-h-80">
                      <Table captionSide="bottom" striped>
                        {/* <caption>Some elements from periodic table</caption> */}
                        <thead>{ths}</thead>
                        <tbody>{rows}</tbody>
                      </Table>
                    </div>
                  )
                ) : (
                  <div className="min-h-full h-72 flex flex-col items-center justify-center">
                    <BsCartX size="2rem" stroke={1.5} />
                    <span className="mt-2 font-medium text-base text-grey">
                      Таны сагс хоосон байна.
                    </span>
                  </div>
                )}
                {/* </Suspense> */}
              </div>
            </div>
            {addressVisible === true && (
              <Address
                setSelectedShippingData={setSelectedShippingData}
                setSelect={setSelect}
              />
            )}
          </div>

          <div className="lg:w-[30%] h-2/5	bg-white rounded-lg lg:px-10 lg:py-8 px-4 py-4">
            <div className="flex flex-col lg:gap-5 gap-3">
              <span className="flex justify-between font-[400] lg:text-[1.05rem] text-sm text-[#2125297a]">
                Нийт үнэ
                <span className="font-[500] lg:text-[1.05rem] text-sm text-[#212529]">
                  {cartItem?.total || 0}
                </span>
              </span>
              <span className="flex justify-between font-[400] lg:text-[1.05rem] text-sm text-[#2125297a]">
                Хөнгөлөлт
                <span className="font-[500] lg:text-[1.05rem] text-sm text-[#212529]">
                  0 ₮
                </span>
              </span>
              <span className="flex justify-between font-[400] lg:text-[1.05rem] text-sm text-[#2125297a]">
                Хүргэлт
                <span className="font-[500] lg:text-[1.05rem] text-sm text-[#212529]">
                  0 ₮
                </span>
              </span>
              <div className="flex flex-row justify-between items-center">
                <div className="flex items-center">
                  <span className="flex justify-between font-[400] lg:text-[1.05rem] text-sm text-[#2125297a]">
                    Очиж авах
                    <Tooltip label="Очиж авах бол заавал баруун гар талд байгаа товчийг идэвхжүүлнэ үү">
                      <IconAlertCircle
                        className="h-5 w-5 self-center ml-2 "
                        color="black"
                      />
                    </Tooltip>
                  </span>
                </div>
                <span className="font-[500] lg:text-[1.05rem] text-sm text-[#212529]">
                  <Switch
                    checked={checked}
                    onChange={(event) =>
                      setChecked(event.currentTarget.checked)
                    }
                  />
                </span>
              </div>
              <hr className="h-px my-1 border-0 border-t-dashed bg-gray-300" />
              <span className="flex justify-between mb-1 font-[400] lg:text-[1.1rem] text-sm text-[#212529af]">
                Нийлбэр үнэ{" "}
                <span className="font-[500] lg:text-[1.1rem] text-sm text-[#212529]">
                  {cartItem?.total || 0}
                </span>
              </span>
              <Button
                styles={(theme) => ({
                  root: {
                    backgroundColor: "#f9bc60",
                    border: 0,
                    height: 42,
                    paddingLeft: 20,
                    paddingRight: 20,
                  },

                  leftIcon: {
                    marginRight: 15,
                  },
                })}
                sx={(theme) => ({
                  "@media (max-width: 40em)": {
                    fontSize: theme.fontSizes.xs,
                  },
                })}
                color="yellow"
                disabled={loadingOrder && true}
                variant="filled"
                radius="md"
                size="md"
                uppercase
                onClick={() => makeOrder()}
              >
                {loadingOrder && (
                  <Loader size={"xs"} color="white" className="mr-2" />
                )}
                Захиалга хийх
              </Button>
            </div>
          </div>
        </div>
      </div>
    </GlobalLayout>
  );
};

export default CartItems;
