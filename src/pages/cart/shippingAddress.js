/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import ProductModal from "@/components/Profile/ProfileModal";
import { fetchMethod } from "@/utils/fetch";
import { UserConfigContext } from "@/utils/userConfigContext";
import { errorNotification, successNotification } from "@/utils/utils";
import { Button, Checkbox, rem, Skeleton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconCirclePlus,
  IconCircleXFilled,
  IconTruckOff,
} from "@tabler/icons-react";
import { getCookie } from "cookies-next";
import React, { useContext, useEffect, useState } from "react";

const Address = ({ setSelectedShippingData, setSelect }) => {
  const [value, setValue] = useState(1);
  const [opened, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useState(true);
  const [shippingData, setShippingData] = useState([]);
  const [editingProdData, setEditingProdData] = useState();
  const [cookie, setCookie] = useState();
  const token = getCookie("token");
  const [selectAddress, setSelectAddress] = useState([]);
  const { auth } = useContext(UserConfigContext);
  const [isAddAddress, setIsAddAddress] = useState(false);
  useEffect(() => {
    const cookie = getCookie("token");
    setCookie(cookie);
    setSelectedShippingData(shippingData[1]);
    setValue(shippingData[1]);
    getSelectAddress();
    if (cookie) {
      getShippingData(cookie);
    } else {
      getShippingData();
    }
  }, [auth]);

  const getSelectAddress = async () => {
    const data = await fetchMethod("GET", "config/address", token);
    if (data.success) {
      setSelectAddress(data?.data);
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
  };

  useEffect(() => {
    getShippingData(cookie);
  }, [isAddAddress]);

  const handleClick = () => {
    setIsAddAddress(!isAddAddress);
  };

  const getShippingData = async (cookie = token) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${cookie}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/address-v2`, requestOptions)
      .then((req) => req.json())
      .then((res) => {
        if (res.success === true) {
          setShippingData(res.data);
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    console.log(value, "dasdas");
  }, [value]);
  const openProductEditingModal = () => {
    setEditingProdData({ create: true });
    open();
  };

  const SubmitCreateShippingData = async (values) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${cookie}`);
    myHeaders.append("Content-Type", "application/json");
    let city = "";
    let district = "";
    let khoroo = "";
    if (values?.city || values?.district || values?.committee) {
      const selectedCity = selectAddress?.find(
        (item) => item?.name === values?.city,
      );
      city = selectedCity;
      const selectedDistrict = selectedCity?.dic_districts?.find(
        (item) => item?.name === values?.district,
      );
      district = selectedDistrict;
      const selectedKhoroo = selectedDistrict?.dic_khoroos?.find(
        (item) => item?.name === values?.committee,
      );
      khoroo = selectedKhoroo;
    }

    const initialData = {
      name: values.name,
      city: city?.id,
      // province: values?.province, //? daraa nemeh
      district: district?.id,
      khoroo: khoroo.id,
      phone: values.phone,
      type: values.type === undefined ? false : values.type,
      note: `Гудамж: ${values.street} Байр: ${values?.apartment} Тоот: ${values.number} ${values.note}`,
    };

    const requestOption = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(initialData),
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/address-v2`, requestOption)
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          successNotification({
            message: result.message,
          });
          getShippingData();
          close();
        } else {
          errorNotification({
            message: result.message,
          });
        }
      });
  };

  return (
    <div className="mt-6 overflow-auto rounded-lg bg-white px-3 py-3 shadow-md lg:px-10 lg:py-8">
      {!loading ? (
        <>
          <div className="flex flex-row justify-between">
            <span className="text-lg font-[500] text-[#212529] lg:text-[1.3rem]">
              Хаягийн мэдээлэл
            </span>
            <Button
              leftSection={<IconCirclePlus size={20} />}
              variant="subtle"
              compact
              sx={(theme) => ({
                "@media (max-width: 40em)": {
                  fontSize: theme.fontSizes.md,
                },
              })}
              onClick={(e) => {
                e.preventDefault();
                openProductEditingModal({}, "creation");
              }}
            >
              Шинэ хаяг нэмэх
            </Button>
          </div>
          <div className="radio-button mt-4 w-full flex-col gap-6 pb-4">
            {shippingData?.length === 0 && (
              <div className="mt-6 flex w-full flex-col items-center gap-4">
                <IconTruckOff size="2rem" stroke={1.5} />
                <span className="font-medium text-grey">
                  {" "}
                  Хаягийн мэдээлэл оруулаагүй байна
                </span>
              </div>
            )}

            <div className="flex flex-col gap-6">
              {shippingData?.map((item, idx) => (
                <Checkbox.Card
                  key={idx}
                  className={`${
                    value === item?.id &&
                    "scale-101 translate-x-2 transition delay-100 ease-in-out hover:cursor-pointer"
                  } shadow-md`}
                  withBorder={true}
                  style={{
                    borderColor: value === item?.id ? "#228BE6" : "white",
                  }}
                  onClick={() => {
                    setSelectedShippingData(item);
                    setSelect(true);
                    setValue(item?.id);
                  }}
                >
                  <div className="flex gap-3 px-3 py-4">
                    <Checkbox.Indicator
                      checked={value === item?.id ? true : false}
                    />
                    <div className="flex flex-col gap-1">
                      <span className="text-ss font-semibold sm:text-base lg:text-lg">
                        {item.city?.name} {item.district?.name}
                      </span>
                      <div className="flex gap-2">
                        <span className="text-sm font-medium text-grey600 sm:text-ss lg:text-base">
                          {item.khoroo?.name} {item.note}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-medium text-grey800 sm:text-ss">
                        Утас: {item.phone}
                      </div>
                    </div>
                  </div>
                </Checkbox.Card>
              ))}
            </div>
          </div>
        </>
      ) : (
        <Skeleton sx={{ height: "100%" }} visible={loading} />
      )}
      <ProductModal
        initialData={editingProdData}
        isOpen={opened}
        close={close}
        onSubmit={SubmitCreateShippingData}
        handleClick={handleClick}
        address={selectAddress}
      />
    </div>
  );
};

export default Address;
