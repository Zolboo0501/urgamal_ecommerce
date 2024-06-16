/* eslint-disable react-hooks/exhaustive-deps */
import UserAddress from "@/components/UserProfileForms/UserAddress";
import { fetchMethod } from "@/utils/fetch";
import { Loader, Text, Title } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
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
  const getUserAddress = async () => {
    const data = await fetchMethod("GET", "user/address-v2", token);
    if (data.success) {
      setAddressData(data?.data);
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

  return (
    <div className="flex flex-col w-full bg-white px-8 py-6 rounded-md">
      {loading ? (
        <div className="w-full h-56 flex items-center justify-center">
          <Loader color="yellow" />
        </div>
      ) : (
        <div>
          <Title order={3}>Хүргэлтийн хаяг</Title>
          <Text size="sm" c="dimmed">
            Та хүргэлтийн хаягаа оруулж захиалгаа хялбар хийгээрэй
          </Text>
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
