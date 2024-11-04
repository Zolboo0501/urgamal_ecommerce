/* eslint-disable react/prop-types */
import { fetchMethod } from "@/utils/fetch";
import { Loader, Title } from "@mantine/core";
import { IconCarambola, IconGiftOff } from "@tabler/icons-react";
import { getCookie } from "cookies-next";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

const Loyalty = ({ userInfo }) => {
  const [loyalty, setLoyalty] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getLoyalty();
  }, []);

  const getLoyalty = async () => {
    const token = getCookie("token");
    setLoading(true);
    const data = await fetchMethod("GET", "user/loyalty", token);
    if (data.success) {
      setLoyalty(data.data);
    }
    setLoading(false);
  };
  return (
    <div className="flex w-full flex-col rounded-md bg-white px-8 py-6">
      <div className="flex flex-row pb-2">
        <Title order={3} className="flex flex-1">
          Loyalty
        </Title>
        <div className="flex flex-row items-center gap-1">
          <p className="text-base text-[#696A6C] lg:text-base">Нийт оноо :</p>
          <p className="ml-1 text-start text-base font-bold lg:text-base">
            {userInfo?.loyalty_wallet?.balance || 0}
          </p>
          <IconCarambola color="#ffd27d" />
        </div>
      </div>
      {/* <div className="mt-2 w-full justify-between">
        {userInfo?.loyalty_wallet?.balance && (
          <span className="font-semibold">
            Нийт оноо : {userInfo?.loyalty_wallet?.balance}
          </span>
        )}
        {userInfo?.loyalty_wallet?.onhold > 0 && (
          <span className="font-semibold">
            Хүлээгдэж буй оноо : {userInfo?.loyalty_wallet?.onhold}
          </span>
        )}
      </div> */}
      {loading ? (
        <div className="flex h-[20rem] w-full items-center justify-center">
          <Loader color="teal" />
        </div>
      ) : loyalty?.length > 0 ? (
        <div className="flex flex-col gap-3 overflow-auto px-2 py-2">
          {loyalty?.map((item, index) => (
            <div
              key={index}
              className="hover:scale-101 flex flex-row items-center justify-between rounded-md p-3 shadow-md transition delay-100 ease-in-out hover:translate-x-2 hover:cursor-pointer hover:shadow-2xl"
            >
              <div className="flex flex-col">
                <div className="flex flex-row">
                  <p className="text-base text-grey">Захиалгын дугаар :</p>
                  <p className="ml-1 text-base">{item?.orderid}</p>
                </div>
                <div className="flex flex-row">
                  <p className="text-base text-grey">Огноо : </p>
                  <p className="ml-1 text-base">
                    {dayjs(item?.createdAt).format("YYYY-MM-DD HH:mm")}
                    {/* {data?.createdAt} */}
                  </p>
                </div>
              </div>
              <div className="flex flex-row items-center gap-2">
                <p className="text-base font-semibold">{item.amount}</p>
                <IconCarambola color="#ffd27d" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex h-80 w-full flex-col items-center justify-center">
          <IconGiftOff size="2rem" stroke={1.5} />
          <span className="mt-2 text-base font-medium text-grey">
            Таны loyalty хоосон байна.
          </span>
        </div>
      )}
    </div>
  );
};

export default Loyalty;
