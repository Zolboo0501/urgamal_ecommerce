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
    <div className="flex w-full flex-col rounded-md bg-white px-8 py-6">
      <Title order={3}>Loyalty</Title>
      {loading ? (
        <div className="flex h-[20rem] w-full items-center justify-center">
          <Loader color="yellow" />
        </div>
      ) : loyalty?.length > 0 ? (
        <div className="mt-4 max-h-96 overflow-auto">
          {loyalty?.map((item, index) => (
            <div
              key={index}
              className="flex flex-row items-center justify-between p-2 hover:cursor-pointer hover:bg-gray-50"
              style={{ borderBottom: "1px solid rgba(0, 30, 29, 0.23)" }}
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
