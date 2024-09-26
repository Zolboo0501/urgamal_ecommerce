/* eslint-disable react-hooks/exhaustive-deps */
import ProductModal from "@/components/Profile/ProfileModal";
import { fetchMethod } from "@/utils/fetch";
import { UserConfigContext } from "@/utils/userConfigContext";
import { Button, Card, Chip, Flex, Group, Skeleton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import {
  IconCirclePlus,
  IconCircleXFilled,
  IconTruckOff,
} from "@tabler/icons-react";
import { getCookie } from "cookies-next";
import { useContext, useEffect, useState } from "react";

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
        (item) => item?.name === values?.city
      );
      city = selectedCity;
      const selectedDistrict = selectedCity?.dic_districts?.find(
        (item) => item?.name === values?.district
      );
      district = selectedDistrict;
      const selectedKhoroo = selectedDistrict?.dic_khoroos?.find(
        (item) => item?.name === values?.committee
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
          showNotification({
            message: result.message,
            color: "green",
          });
          getShippingData();
          close();
        } else {
          showNotification({
            message: result.message,
            color: "red",
          });
        }
      });
  };

  return (
    <div className="bg-white rounded-lg lg:px-10 lg:py-8 mt-6 px-3 py-3 overflow-auto  shadow-md">
      {!loading ? (
        <>
          <div className="flex flex-row justify-between">
            <span className="font-[500] lg:text-[1.3rem] text-lg text-[#212529]">
              Хаягийн мэдээлэл
            </span>
            <Button
              leftIcon={<IconCirclePlus size={20} />}
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
          <div className="radio-button lg:px-5 gap-6 w-full px-2 flex-col mt-4">
            {shippingData?.length === 0 && (
              <div className="flex flex-col w-full items-center gap-4 mt-6">
                <IconTruckOff size="2rem" stroke={1.5} />
                <span className="text-grey font-medium">
                  {" "}
                  Хаягийн мэдээлэл оруулаагүй байна
                </span>
              </div>
            )}

            <Chip.Group multiple={false} value={value}>
              {shippingData?.map((item, idx) => {
                return (
                  <Chip
                    key={idx}
                    value={item?.id}
                    variant="light"
                    onClick={() => setValue(item?.id)}
                    radius={10}
                    className="flex flex-wrap"
                  ></Chip>
                );
              })}
            </Chip.Group>
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
