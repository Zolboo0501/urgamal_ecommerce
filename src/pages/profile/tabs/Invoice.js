import InvoiceItem from "@/components/InvoiceItem";
import { Loader, Tabs } from "@mantine/core";
import { getCookie } from "cookies-next";
import { useMemo, useState } from "react";

import { IconFileOff } from "@tabler/icons-react";
import axios from "axios";
import useSWR from "swr";
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
    [],
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
        config,
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
    fetcher,
  );

  return (
    <div className="flex w-full flex-col rounded-md bg-white px-8 py-6">
      <Tabs
        color="teal"
        variant="default"
        value={tabs}
        onChange={setTabs}
        defaultValue="all"
        classNames={{
          root: "bg-white w-full rounded-md  py-2 overflow-y-auto",
          panel: "my-4 pl-2 flex-grow h-full w-full",
        }}
      >
        <Tabs.List>
          {invoiceType.map((item, index) => (
            <Tabs.Tab key={index} value={item.value}>
              {item.title}
            </Tabs.Tab>
          ))}
        </Tabs.List>
        {invoiceType.map((e) => (
          <Tabs.Panel key={e.title} value={e.value}>
            {isLoading && (
              <div className="flex h-full w-full items-center justify-center">
                <Loader color="yellow" variant="dots" />
              </div>
            )}

            {invoice && invoice.length === 0 ? (
              <div className="flex h-56 w-full items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                  <IconFileOff size={"3rem"} stroke={1.2} />
                  <span class="font-medium">
                    {invoiceType.find((types) => types.value === e.value).title}
                  </span>
                  <span className="mt-2 text-base font-medium text-grey">
                    нэхэмжлэл одоогоор байхгүй байна.
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4 p-1">
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
      </Tabs>
    </div>
  );
};

export default Invoice;
