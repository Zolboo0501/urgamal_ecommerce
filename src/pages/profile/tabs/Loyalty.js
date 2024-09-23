import { fetchMethod } from "@/utils/fetch";
import { Loader, Title, rem } from "@mantine/core";
import { IconGiftOff, IconStarFilled } from "@tabler/icons-react";
import { getCookie } from "cookies-next";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

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
    <div className="flex flex-col w-full bg-white px-8 py-6 rounded-md">
      <Title order={3}>Loyalty</Title>
      {loading ? (
        <div className="w-full h-[20rem] flex items-center justify-center">
          <Loader color="yellow" />
        </div>
      ) : loyalty?.length > 0 ? (
        <div className="mt-4 max-h-96 overflow-auto">
          {loyalty?.map((item, index) => (
            <div
              key={index}
              className="flex flex-row justify-between items-center p-2 hover:bg-gray-50 hover:cursor-pointer"
              style={{ borderBottom: "1px solid rgba(0, 30, 29, 0.23)" }}
            >
              <div className="flex flex-col">
                <div className="flex flex-row">
                  <p className="text-base text-grey">Захиалгын дугаар :</p>
                  <p className="text-base ml-1">{item?.orderid}</p>
                </div>
                <div className="flex flex-row">
                  <p className="text-base text-grey">Огноо : </p>
                  <p className="text-base ml-1">
                    {dayjs(item?.createdAt).format("YYYY-MM-DD HH:mm")}
                    {/* {data?.createdAt} */}
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <p class="text-base font-semibold">{item.amount}</p>

                <IconStarFilled
                  style={{
                    width: rem(20),
                    height: rem(20),
                    color: "#F9BC60",
                  }}
                  stroke={2}
                />
              </div>
            </div>
          ))}
          <div className="mt-2 w-full justify-between">
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
          </div>
        </div>
      ) : (
        <div className="w-full h-80 flex justify-center items-center flex-col">
          <IconGiftOff size="2rem" stroke={1.5} />
          <span className="mt-2 font-medium text-base text-grey">
            Таны loyalty хоосон байна.
          </span>
        </div>
      )}
    </div>
  );
};

export default Loyalty;
