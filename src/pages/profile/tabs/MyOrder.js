import { useMemo, useState } from "react";
import { Loader, Tabs, Text } from "@mantine/core";
import Order from "../../../components/Profile/Order";
import { getCookie } from "cookies-next";
import useSWR from "swr";
import axios from "axios";
import { IconPackageOff } from "@tabler/icons-react";

const MyOrder = () => {
  const [tabs, setTabs] = useState("all");
  const accessToken = getCookie("token");

  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  const fetcher = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/order`,
        {
          status: tabs === "all" ? "all" : tabs,
        },
        config
      );

      return response.data.data;
    } catch (error) {
      console.error("Fetch error:", error);
      throw new Error("Network response was not ok.");
    }
  };

  const {
    data: orders,
    error,
    isLoading,
  } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/user/order?status=${
      tabs === "all" ? "" : tabs
    }`,
    fetcher
  );

  const orderTypes = useMemo(
    () => [
      { value: "all", title: "Бүгд" },
      { value: "100", title: "Үүссэн" },
      { value: "200", title: "Төлбөр хийгдсэн" },
      { value: "201", title: "Хүлээн авсан" },
      { value: "301", title: "Цуцалсан" },
    ],
    []
  );

  return (
    <Tabs
      variant="default"
      value={tabs}
      onTabChange={setTabs}
      classNames={{
        root: "bg-white w-full rounded-md px-4 py-2 overflow-y-auto",
        panel: "my-4 pl-2 flex-grow h-full ",
      }}
      color="yellow"
    >
      <Tabs.List>
        {orderTypes.map((e) => (
          <Tabs.Tab key={e.title} value={e.value}>
            {e.title}
          </Tabs.Tab>
        ))}
      </Tabs.List>
      {orderTypes.map((e) => (
        <Tabs.Panel key={e.title} value={e.value}>
          {isLoading && (
            <div className="h-full w-full flex items-center justify-center">
              <Loader color="yellow" variant="dots" />
            </div>
          )}

          {orders && orders.length === 0 ? (
            <div className="w-full flex items-center justify-center h-56">
              <div className="flex flex-col gap-2 items-center">
                <IconPackageOff size={"3rem"} stroke={1.2} />
                <Text span weight={500}>
                  {orderTypes.find((types) => types.value === e.value).title}
                </Text>
                <span className="mt-2 font-medium text-base text-grey">
                  захиалга одоогоор байхгүй байна.
                </span>
              </div>
            </div>
          ) : (
            <div className="max-h-96 overflow-auto">
              {orders?.map((e, index) => {
                return <Order data={e} key={index} />;
              })}
            </div>
          )}
        </Tabs.Panel>
      ))}
    </Tabs>
  );
};

export default MyOrder;
