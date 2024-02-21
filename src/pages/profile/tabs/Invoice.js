import InvoiceItem from "@/components/InvoiceItem";
import { Loader, Tabs, Text } from "@mantine/core";
import { getCookie } from "cookies-next";
import React, { useMemo, useState } from "react";

import { IconFileOff } from "@tabler/icons-react";
import useSWR from "swr";
import axios from "axios";
const Invoice = () => {
  const accessToken = getCookie("token");
  const invoiceType = useMemo(
    () => [
      { value: "all", title: "Бүгд" },
      { value: "100", title: "Үүссэн" },
      { value: "101", title: "Илгээгдсэн" },
      { value: "200", title: "Баталгаажсан" },
      { value: "201", title: "Төлбөр илгээгдсэн" },
      { value: "202", title: "Төлбөр баталгаажсан" },
      { value: "300", title: "Цуцалсан" },
      { value: "301", title: "Хугацаа дууссан" },
    ],
    []
  );
  const [tabs, setTabs] = useState();
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  const fetcher = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/order/invoice?status=${
          tabs === "all" ? "" : tabs
        }`,
        config
      );
      return response.data.invoice;
    } catch (error) {
      console.error("Fetch error:", error);
      throw new Error("Network response was not ok.");
    }
  };

  const {
    data: invoice,
    error,
    isLoading,
  } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/order/invoice?status=${
      tabs === "all" ? "" : tabs
    }`,
    fetcher
  );

  return (
    <div className="flex flex-col w-full bg-white px-8 py-6 rounded-md">
      <Tabs
        color="yellow"
        variant="default"
        value={tabs}
        onTabChange={setTabs}
        defaultValue="all"
        classNames={{
          root: "bg-white w-full rounded-md  py-2 overflow-y-auto",
          panel: "my-4 pl-2 flex-grow h-full ",
        }}
      >
        <Tabs.List>
          {invoiceType.map((item, index) => (
            <Tabs.Tab key={index} value={item.value}>
              {item.title}
            </Tabs.Tab>
          ))}
          {invoiceType.map((e) => (
            <Tabs.Panel key={e.title} value={e.value}>
              {isLoading && (
                <div className="h-full w-full flex items-center justify-center">
                  <Loader color="yellow" variant="dots" />
                </div>
              )}

              {invoice && invoice.length === 0 ? (
                <div className="w-full flex items-center justify-center h-56">
                  <div className="flex flex-col gap-2 items-center">
                    <IconFileOff size={"3rem"} stroke={1.2} />
                    <Text span weight={500}>
                      {
                        invoiceType.find((types) => types.value === e.value)
                          .title
                      }
                    </Text>
                    <span className="mt-2 font-medium text-base text-grey">
                      нэхэмжлэл одоогоор байхгүй байна.
                    </span>
                  </div>
                </div>
              ) : (
                <div className="max-h-96 overflow-auto">
                  {invoice?.map((e, index) => {
                    return (
                      <InvoiceItem
                        data={e}
                        key={index}
                        length={invoice?.length}
                      />
                    );
                  })}
                </div>
              )}
            </Tabs.Panel>
          ))}
        </Tabs.List>
      </Tabs>
    </div>
  );
};

export default Invoice;
