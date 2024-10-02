import { Button } from "@mantine/core";
const PurchaseHistoryOrder = (props) => {
  const ButtonStatus = (status) => {
    switch (status) {
      case 0:
        return (
          <Button variant={"outline"} color="green">
            Баримт харах
          </Button>
        );
      case 1:
        return (
          <Button variant={"outline"} color="orange">
            Төлбөр төлөх
          </Button>
        );
      case 2:
        return (
          <Button variant={"outline"} color="red">
            Устгах
          </Button>
        );
    }
  };

  const PayStatus = (status) => {
    switch (status) {
      case 0:
        return <p className="ml-1 text-[#01FF48]">Төлсөн</p>;
      case 1:
        return <p className="ml-1 text-[#FFD600]">Хүлээгдэж буй</p>;
      case 2:
        return <p className="ml-1 text-[#E16162]">Цуцлагдсан</p>;
    }
  };
  return (
    <div
      className="flex w-full flex-col justify-between px-4 py-4"
      style={{ borderBottom: "1px solid rgba(0, 30, 29, 0.23)" }}
    >
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center">
          <p className="text-grey">Захиалгын дугаар :</p>
          <p className="ml-1">№SM6636911</p>
        </div>
        <div className="flex flex-row items-center">
          <p className="text-grey">Захиалсан огноо :</p>
          <p className="ml-1">2023-03-01</p>
        </div>
      </div>
      <div className="mt-2 flex flex-row justify-between">
        <div className="flex flex-row items-center">
          <p className="text-grey">Үнийн дүн :</p>
          <p className="ml-1">150’000₮</p>
        </div>
        <div className="flex flex-row items-center">
          <p className="text-grey">Төлбөр :</p>

          {PayStatus(props.data.status)}
        </div>
      </div>
      <div className="mt-2 flex flex-row justify-between">
        <div className="flex flex-row items-center">
          <p>Бараа {`(${props.data.productNumber})`}</p>
          <p className="ml-2 text-[#3E503C] underline underline-offset-2">
            Дэлгэрэнгүй харах
          </p>
        </div>
        <div className="flex flex-row items-center">
          {ButtonStatus(props.data.statusPay)}
        </div>
      </div>
    </div>
  );
};

export default PurchaseHistoryOrder;
