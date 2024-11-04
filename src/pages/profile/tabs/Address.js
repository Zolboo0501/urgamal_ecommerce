/* eslint-disable react-hooks/exhaustive-deps */
import UserAddress from "@/components/UserProfileForms/UserAddress";
import { fetchMethod } from "@/utils/fetch";
import { errorNotification } from "@/utils/utils";
import { Loader, Title } from "@mantine/core";
import { IconCircleXFilled } from "@tabler/icons-react";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
const Address = () => {
  const [addressData, setAddressData] = useState(null);
  const [selectAddress, setSelectAddress] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = getCookie("token");

  useEffect(() => {
    setLoading(true);
    getUserAddress();
    getSelectAddress();
    setLoading(false);
  }, []);

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
  const getUserAddress = async () => {
    const data = await fetchMethod("GET", "user/address-v2", token);
    if (data.success) {
      setAddressData(data?.data);
    } else {
      errorNotification({
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

  return (
    <div className="flex w-full flex-col rounded-md bg-white px-8 py-6">
      {loading ? (
        <div className="flex h-56 w-full items-center justify-center">
          <Loader color="teal" />
        </div>
      ) : (
        <div>
          <Title order={3}>Хүргэлтийн хаяг</Title>
          <p class="text-sm text-gray-500">
            Та хүргэлтийн хаягаа оруулж захиалгаа хялбар хийгээрэй
          </p>
          <div className="w-full">
            <UserAddress
              data={addressData}
              refresh={getUserAddress}
              selectAddress={selectAddress}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Address;
