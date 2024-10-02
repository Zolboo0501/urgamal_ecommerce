import { useState } from "react";

import { Title } from "@mantine/core";
import PurchaseHistoryOrder from "@/components/Profile/PurchaseHistoryOrder";

const PurchaseHistory = () => {
  let data = {
    orderNumber: "№SM6636911",
    price: "150’000₮",
    productNumber: 2,
    date: "2023-03-01",
    status: 0,
    statusPay: 0,
  };
  let data1 = {
    orderNumber: "№SM6636911",
    price: "150’000₮",
    productNumber: 2,
    date: "2023-03-01",
    status: 1,
    statusPay: 1,
  };
  let data2 = {
    orderNumber: "№SM6636911",
    price: "150’000₮",
    productNumber: 2,
    date: "2023-03-01",
    status: 2,
    statusPay: 2,
  };
  const [tabs, setTabs] = useState(1);

  const clickTabs = (id) => {
    setTabs(id);
  };

  return (
    <div className="flex w-full flex-col rounded-md bg-white px-8 py-6">
      <Title order={3}>Худалдан авсан түүх</Title>
      <div className="mt-4 w-full rounded-md bg-white">
        <div className="flex flex-row items-center justify-around">
          {tabs === 1 ? (
            <p
              className="w-full border-b-2 border-background-sort py-2 text-center text-base"
              id={1}
              onClick={() => clickTabs(1)}
            >
              Хүргэгдсэн
            </p>
          ) : (
            <p
              className="w-full py-2 text-center text-base text-grey hover:bg-button-yellow hover:text-black"
              id={1}
              onClick={() => clickTabs(1)}
            >
              Хүргэгдсэн
            </p>
          )}
          {tabs === 2 ? (
            <p
              className="w-full border-b-2 border-background-sort py-2 text-center text-base"
              id={2}
              onClick={() => clickTabs(2)}
            >
              Хүргэгдээгүй
            </p>
          ) : (
            <p
              className="w-full py-2 text-center text-base text-grey hover:bg-button-yellow hover:text-black"
              id={2}
              onClick={() => clickTabs(2)}
            >
              Хүргэгдээгүй
            </p>
          )}
        </div>
        {tabs === 1 && (
          <div>
            <PurchaseHistoryOrder data={data} />
            <PurchaseHistoryOrder data={data1} />
            <PurchaseHistoryOrder data={data2} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PurchaseHistory;
