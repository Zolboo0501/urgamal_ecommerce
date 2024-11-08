/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import GlobalLayout from "@/components/GlobalLayout/GlobalLayout";
import InvoiceInputModal from "@/components/InvoiceModal/InvoiceInputModal";
import InvoiceModal from "@/components/InvoiceModal/InvoiceModal";
import Magnifier from "@/components/Magnifier/Magnifier";
import { fetchMethod } from "@/utils/fetch";
import {
  addQuantityProduct,
  getCart,
  removeFromCart,
  removeQuantityProduct,
} from "@/utils/Store";
import { UserConfigContext } from "@/utils/userConfigContext";
import {
  errorNotification,
  numberWithCommas,
  successNotification,
} from "@/utils/utils";
import {
  ActionIcon,
  Badge,
  Button,
  Checkbox,
  Loader,
  Modal,
  Stack,
  Switch,
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { openContextModal } from "@mantine/modals";
import {
  IconAlertCircle,
  IconCheck,
  IconCircleXFilled,
  IconMinus,
  IconPhotoOff,
  IconPlus,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { BsCartX } from "react-icons/bs";

import Address from "./shippingAddress";

const CartItems = () => {
  const [isCheckAll, setIsCheckAll] = useState(true);
  const router = useRouter();
  const { auth } = useContext(UserConfigContext);
  const [cartItem, setCartItem] = useState();
  const [checked, setChecked] = useState(false);
  const [addressVisible, setAddressVisible] = useState(false);
  const userToken = getCookie("token");
  const [shippingPee, setShippingPee] = useState(0);
  const [selectedShippingData, setSelectedShippingData] = useState({});
  const [select, setSelect] = useState(false);
  const [selectedItemsTotal, setSelectedItemsTotal] = useState(0);
  const [selectedItemsIds, setSelectedItemsIds] = useState([]);
  const [loaderOpened, { open: openLoader, close: closeLoader }] =
    useDisclosure(false);
  const [optionOpened, { open: optionOpen, close: optionClose }] =
    useDisclosure(false);
  const [inputOpened, { open: openInput, close: closeInput }] =
    useDisclosure(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("storage", () => {
        let data = getCart();
        if (data) {
          setCartItem(data);
        }
      });
    }
    let data = getCart();
    if (data) {
      setCartItem(data);
    }
  }, []);

  useEffect(() => {
    const allItemsChecked = cartItem?.cart_items?.every(
      (item) => item.isChecked,
    );
    setIsCheckAll(allItemsChecked);

    const checkIsChecked = cartItem?.cart_items?.filter(
      (item) => item.isChecked,
    );

    const ids = checkIsChecked?.map((item) => {
      if (item?.id) {
        return { product_id: item?.id, qty: item?.quantity };
      }
    });
    setSelectedItemsIds(ids);
    let total = checkIsChecked?.reduce(
      (acc, item) => acc + item.quantity * item.listPrice,
      0,
    );
    setSelectedItemsTotal(total);
  }, [cartItem]);

  useEffect(() => {
    if (userToken) {
      setAddressVisible(true);
    } else {
      setAddressVisible(false);
    }
  }, [userToken]);

  useEffect(() => {
    if (selectedShippingData) {
      if (selectedShippingData.zone === "A") {
        setShippingPee(5000);
      }
      if (selectedShippingData.zone === "B") {
        setShippingPee(10000);
      }
      if (selectedShippingData.zone === "C") {
        setShippingPee(15000);
      }
    }
  }, [selectedShippingData]);

  const deleteCartItem = (event, id) => {
    event.stopPropagation();
    const temp = [...(cartItem?.cart_items || [])];
    const filter = temp?.filter((item) => item?.id !== id);
    setCartItem({ ...cartItem, cart_items: filter });
    removeFromCart(filter);
  };

  const deleteFromCart = async () => {
    let isSelected = true;
    let temp = [...(cartItem?.cart_items || [])];

    const filter = temp?.filter((item) => {
      if (item?.isChecked) {
        isSelected = false;
      }
      return item?.isChecked !== true;
    });

    if (isSelected) {
      return errorNotification({
        message: "Устгах бараа сонгоно уу",
      });
    }
    setCartItem({ ...cartItem, cart_items: filter });
    removeFromCart(filter);
    successNotification({
      message: "Бараа амжилттай устлаа.",
      title: "Сагс",
    });
  };

  const handleOrder = async () => {
    optionClose();
    openLoader();
    let data = checked ? null : selectedShippingData?.id;
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
        address_id: data,
        cart_items: selectedItemsIds,
      }),
    };
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/order/v3`,
        requestOption,
      );
      if (res.status === 200) {
        const data = await res.json();
        if (data.success === true) {
          let total = 0;
          const temp = cartItem?.cart_items.filter((item, index) => {
            if (item?.id !== selectedItemsIds[index]?.product_id) {
              total +=
                parseInt(item.total) ||
                parseInt(item.quantity * item.listPrice);
              return item;
            }
          });
          removeFromCart(temp);
          setCartItem({ ...cartItem, cart_items: temp, total: total });
          successNotification({ message: data.message, title: "Захиалга" });
          axios
            .get(
              `${process.env.NEXT_PUBLIC_API_URL}/order/payment/${data.orderid}`,
              axiosReqOption,
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
                errorNotification({
                  message: err.response.data,
                });
              } else {
                errorNotification({
                  message: "Төлбөрийн мэдээлэл авахад алдаа гарлаа",
                });
              }
            });
        } else {
          errorNotification({ title: "Алдаа гарлаа." });
        }
      } else if (res.status === 500) {
        errorNotification({
          message: "Сагсанд бараа байхгүй байна!",
          color: "red",
        });
      } else {
        const error = await res.json();
        errorNotification({
          message: error?.message,
        });
      }
    } catch (error) {
      console.log(error, "error");
      errorNotification({
        message: "Захиалга үүсгэхэд алдаа гарлаа!",
        color: "red",
      });
    }
    closeLoader();
  };

  const handleInvoice = () => {
    optionClose();
    openInput();
  };

  const makeOrder = async () => {
    if (cartItem?.cart_items?.length > 0) {
      if (selectedItemsIds.length > 0) {
        if (auth) {
          if (select) {
            optionOpen();
          } else {
            if (checked === false) {
              errorNotification({
                message: "Хаяг сонгоно уу эсвэл очиж авахыг идэвхжүүлнэ үү",
                color: "red",
              });
            } else {
              optionOpen();
            }
          }
        } else {
          router.push("/login");
        }
      } else {
        errorNotification({
          message: "Захиалга хийхийн тулд бараа сонгоно уу.",
          color: "red",
        });
      }
    } else {
      errorNotification({
        message: "Сагс хоосон байна.",
        color: "red",
      });
    }
  };

  const handleInvoiceInput = async (values) => {
    let addressData = checked
      ? "Очиж авна"
      : `Хот: ${selectedShippingData?.city}, Дүүрэг: ${selectedShippingData?.district}, Хороо: ${selectedShippingData?.committee}, Гудамж: ${selectedShippingData?.street}, Байр: ${selectedShippingData?.apartment}, Тоот: ${selectedShippingData?.number}`;
    const requestOption = {
      address: addressData,
      method: "invoice",
      companyName: values?.companyName,
      contact: values?.contact,
      email: values?.email,
      registry: values?.registry,
      cart_items: selectedItemsIds,
    };
    const token = getCookie("token");
    const data = await fetchMethod(
      "POST",
      "order/invoice",
      token,
      requestOption,
    )
      .then(() => {
        successNotification({
          message: "Амжилттай нэхэмжлэл үүслээ.",
          icon: <IconCheck />,
          color: "green",
        });
        let total = 0;
        const temp = cartItem?.cart_items.filter((item, index) => {
          if (item?.id !== selectedItemsIds[index]?.product_id) {
            total +=
              parseInt(item.total) || parseInt(item.quantity * item.listPrice);
            return item;
          }
        });
        removeFromCart(temp);
        setCartItem({ ...cartItem, cart_items: temp, total: total });
        closeInput();
        router.push({
          pathname: "/profile",
          query: { cr: "invoice" },
        });
      })
      .catch(() => {
        closeInput();
        errorNotification({
          message: data?.message,

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
  };

  const minusQuantity = async (event, count, product) => {
    event.stopPropagation();

    const { balance: initialStock, id, listPrice } = product;
    const newCount = count - 1;

    if (newCount <= 0 || newCount > initialStock) return;

    const updatedProduct = {
      ...product,
      quantity: newCount,
      total: newCount * listPrice,
    };

    const updatedCartItems = cartItem.cart_items.map((item) =>
      item.id === id ? updatedProduct : item,
    );

    const totalSelectedItems = updatedCartItems
      .filter((item) => item.isChecked)
      .reduce((acc, item) => acc + item.quantity * item.listPrice, 0);

    setSelectedItemsTotal(totalSelectedItems);
    setCartItem((prevCart) => ({ ...prevCart, cart_items: updatedCartItems }));
    removeQuantityProduct(updatedCartItems);
  };

  const addQuantity = async (event, count, product) => {
    event.stopPropagation();

    const { balance: initialStock, id, listPrice } = product;
    const newCount = count + 1;

    if (newCount > initialStock) {
      errorNotification({
        message: "Барааны үлдэгдэл хүрэлцэхгүй байна.",
      });
      return;
    }

    const updatedProduct = {
      ...product,
      quantity: newCount,
      total: newCount * listPrice,
    };

    const updatedCartItems = cartItem.cart_items.map((item) =>
      item.id === id ? updatedProduct : item,
    );

    const totalSelectedItems = updatedCartItems
      .filter((item) => item.isChecked)
      .reduce((acc, item) => acc + item.quantity * item.listPrice, 0);

    setSelectedItemsTotal(totalSelectedItems);
    setCartItem((prevCart) => ({ ...prevCart, cart_items: updatedCartItems }));
    addQuantityProduct(updatedCartItems);
  };

  const handleClick = (clickedItem) => {
    const updatedCartItems = cartItem.cart_items.map((item) => {
      if (item.id === clickedItem.id) {
        return { ...item, isChecked: !item.isChecked };
      }
      return item;
    });

    const total = updatedCartItems
      .filter((item) => item.isChecked)
      .reduce((acc, item) => acc + item.quantity * item.listPrice, 0);

    setSelectedItemsTotal(total);
    setCartItem({ ...cartItem, cart_items: updatedCartItems });
  };

  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    const newData = cartItem?.cart_items?.map((item) => {
      if (isCheckAll) {
        item.isChecked = false;
        setIsCheckAll(false);
        return item;
      } else {
        item.isChecked = true;
        setIsCheckAll(true);
        return item;
      }
    });
    setCartItem({ ...cartItem, cart_items: newData });

    const total = newData
      ?.filter((item) => item.isChecked)
      ?.reduce((acc, item) => acc + item.quantity * item.listPrice, 0);

    setSelectedItemsTotal(total);
  };

  const renderBalanceBadge = (balance) => {
    if (balance > 0) {
      const convertInt = parseInt(balance);
      if (convertInt > 10) {
        return (
          <Badge color="teal" size="xs" classNames={{ root: "text-xl" }}>
            Хангалттай
          </Badge>
        );
      }
      if (convertInt <= 10 && convertInt > 0) {
        return (
          <span className="text-sm-3 font-medium text-primary500 sm:text-xs">
            {balance}
          </span>
        );
      }
    } else {
      return (
        <Badge color="gray" size="xs">
          Үлдэгдэлгүй
        </Badge>
      );
    }
  };

  const QuantityControl = ({ item }) => (
    <div className="flex items-center justify-center gap-2 rounded py-1 sm:w-[40%] lg:p-1">
      <ActionIcon
        variant="light"
        color="teal"
        radius={"xl"}
        onClick={(event) => minusQuantity(event, item?.quantity, item)}
      >
        <IconMinus
          size={24}
          color="#40C057"
          className="h-4 w-4 lg:h-4 lg:w-4"
        />
      </ActionIcon>
      <span className="text-[0.9rem] font-[500] text-[#212529] lg:text-[1rem]">
        {item?.quantity}
      </span>
      <ActionIcon
        variant="light"
        color="teal"
        radius={"xl"}
        onClick={(event) => addQuantity(event, item?.quantity, item)}
      >
        <IconPlus size={24} color="#40C057" className="h-4 w-4 lg:h-4 lg:w-4" />
      </ActionIcon>
    </div>
  );

  const renderCartContent = () => {
    const hasItems = cartItem?.cart_items?.length > 0;

    if (!hasItems) {
      return (
        <div className="flex h-72 min-h-full flex-col items-center justify-center">
          <BsCartX size="2rem" stroke={1.5} />
          <span className="mt-2 text-base font-medium text-grey">
            Таны сагс хоосон байна.
          </span>
        </div>
      );
    }

    return (
      <div className="flex flex-col">
        {cartItem?.cart_items?.map((item, index) => {
          return (
            <button
              className={`flex items-center justify-start gap-2 px-1 py-4 ${
                index !== cartItem?.cart_items?.length - 1 && "border-b-1"
              } hover:bg-grey100 ${item?.isChecked === true && "bg-grey100"}`}
              key={index}
              onClick={() => handleClick(item)}
            >
              <Checkbox
                className={"checkbox-input"}
                checked={item.isChecked}
                id={item.id}
                onClick={() => handleClick(item)}
                size={"xs"}
                sx={{
                  "@media (max-width: 40em)": {
                    ".mantine-Checkbox-input": {
                      width: "16px",
                      height: "16px",
                    },
                  },
                }}
              />
              <div className="flex flex-1 flex-col gap-2" key={index}>
                <div className="flex flex-1 flex-col">
                  <div className="flex flex-1 items-center justify-between gap-1">
                    <div className="flex flex-1 gap-1">
                      {item?.additionalImage?.[0]?.url ? (
                        <Magnifier
                          imgSrc={item?.additionalImage?.[0]?.url}
                          imgWidth={32}
                          imgHeight={32}
                          magnifierRadius={50}
                          containerClassname={
                            "self-center shrink-0 bg-grey100 rounded"
                          }
                          imageClassname={"w-16 h-16"}
                        />
                      ) : (
                        <div className="flex h-16 w-16 items-center justify-center rounded bg-grey100">
                          <IconPhotoOff
                            stroke={1.5}
                            size={20}
                            color="#40C057"
                          />
                        </div>
                      )}
                      <div className="flex flex-1 flex-col">
                        <div className="ml-2 flex flex-1 flex-col sm:flex-row">
                          <div className="flex flex-col sm:w-[60%]">
                            <span className="line-clamp-2 text-start text-ss font-medium text-grey800 lg:text-base xl:text-lg">
                              {item?.name}
                            </span>
                            <span className="text-start text-sm font-medium text-grey600 lg:text-ss xl:text-base">
                              {numberWithCommas(item.listPrice)}₮
                            </span>
                            <div className="hidden items-center gap-1 sm:flex">
                              <span className="text-sm font-[500] text-[#2125297a] lg:text-ss xl:text-base">
                                Үлдэгдэл:
                              </span>
                              {renderBalanceBadge(item?.balance)}
                            </div>
                          </div>

                          <div className="flex items-center justify-between sm:relative sm:flex-1">
                            <QuantityControl item={item} />
                            <div className="flex sm:flex-1 sm:flex-col">
                              <span className="text-ss font-medium text-[#212529] lg:text-lg">
                                {numberWithCommas(item.total)}₮
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="ml-0 mt-2 flex flex-1 justify-between sm:hidden">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-[500] text-[#2125297a] lg:text-[0.87rem]">
                        Үлдэгдэл:
                      </span>
                      {renderBalanceBadge(item?.balance)}
                    </div>
                    <button
                      className="flex flex-row items-center gap-1 px-2"
                      onClick={(event) => deleteCartItem(event, item?.id)}
                    >
                      <span className="text-sm text-grey500">Устгах</span>
                      <IconX className="h-5 w-5 text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    );
  };

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
          <p className="text-center">Уншиж байна...</p>
          <Loader size="lg" color="teal" />
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
      <div className="relative w-full bg-grey-back px-4 py-8 lg:px-8">
        {/* <div className="absolute top-9">
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
        </div> */}
        <div className="flex flex-col gap-4 md:flex-row lg:mt-8 lg:gap-6">
          <div className="lg:gap- relative flex w-[100%] flex-col md:w-[65%] lg:w-[70%]">
            <div className="rounded-lg bg-white px-3 py-3 shadow-md lg:px-10 lg:py-6">
              <div className="flex flex-row justify-between">
                <div className="">
                  <span className="text-lg font-[500] text-[#212529] lg:text-[1.3rem]">
                    Миний сагс
                  </span>
                  <div className="mt-2 flex items-center gap-2 py-1 text-ss font-regular text-grey500">
                    <Checkbox
                      value="selectAll"
                      onClick={handleSelectAll}
                      checked={isCheckAll}
                      size="xs"
                      className="px-1"
                    />
                    Бүгдийг сонгох
                  </div>
                </div>
                <Button
                  component="a"
                  href="#"
                  compact
                  variant="subtle"
                  leftSection={<IconTrash size={"1rem"} />}
                  sx={(theme) => ({
                    "@media (max-width: 40em)": {
                      fontSize: theme.fontSizes.md,
                    },
                  })}
                  color="red"
                  onClick={() => deleteFromCart()}
                >
                  Устгах
                </Button>
              </div>
              {renderCartContent()}
            </div>
            {addressVisible === true && (
              <Address
                setSelectedShippingData={setSelectedShippingData}
                setSelect={setSelect}
              />
            )}
          </div>

          <div className="flex h-2/5 flex-1 rounded-lg bg-white px-4 py-4 shadow-md lg:px-10 lg:py-8">
            <div className="flex flex-1 flex-col gap-3 lg:gap-5">
              <span className="flex justify-between text-ss font-[400] text-[#2125297a] lg:text-[1.05rem]">
                Нийт үнэ
                <span className="text-sm font-[500] text-[#212529] lg:text-[1.05rem]">
                  {numberWithCommas(selectedItemsTotal) || 0}₮
                </span>
              </span>
              {/* <span className="flex justify-between font-[400] lg:text-[1.05rem] text-ss text-[#2125297a]">
                Хөнгөлөлт
                <span className="font-[500] lg:text-[1.05rem] text-sm text-[#212529]">
                  0 ₮
                </span>
              </span> */}
              <span className="flex justify-between text-ss font-[400] text-[#2125297a] lg:text-[1.05rem]">
                Хүргэлт
                <span className="text-ss font-[500] text-[#212529] lg:text-[1.05rem]">
                  {numberWithCommas(shippingPee)}₮
                </span>
              </span>
              <div className="flex flex-row items-center justify-between">
                <div className="flex items-center">
                  <span className="flex justify-between text-ss font-[400] text-[#2125297a] lg:text-[1.05rem]">
                    Очиж авах
                    <Tooltip label="Очиж авах бол заавал баруун гар талд байгаа товчийг идэвхжүүлнэ үү">
                      <IconAlertCircle
                        className="ml-2 h-5 w-5 self-center"
                        color="black"
                      />
                    </Tooltip>
                  </span>
                </div>
                <span className="text-sm font-[500] text-[#212529] lg:text-[1.05rem]">
                  <Switch
                    checked={checked}
                    onChange={(event) =>
                      setChecked(event.currentTarget.checked)
                    }
                  />
                </span>
              </div>
              <hr className="border-t-dashed my-1 h-px border-0 bg-gray-300" />
              <span className="mb-1 flex justify-between text-sm font-[400] text-[#212529af] lg:text-[1.1rem]">
                Нийлбэр үнэ
                <span className="text-sm font-[500] text-[#212529] lg:text-[1.1rem]">
                  {numberWithCommas(
                    shippingPee
                      ? selectedItemsTotal + shippingPee
                      : selectedItemsTotal || 0,
                  )}
                  ₮
                </span>
              </span>
              <Button
                styles={() => ({
                  root: {
                    border: 0,
                    height: 42,
                    paddingLeft: 20,
                    paddingRight: 20,
                  },

                  leftSection: {
                    marginRight: 15,
                  },
                })}
                sx={(theme) => ({
                  "@media (max-width: 40em)": {
                    fontSize: theme.fontSizes.xs,
                  },
                })}
                color="green"
                // disabled={loadingOrder && true}
                variant="filled"
                radius="md"
                size="md"
                uppercase
                onClick={() => makeOrder()}
              >
                {/* {loadingOrder && (
                  <Loader size={"xs"} color="white" className="mr-2" />
                )} */}
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
