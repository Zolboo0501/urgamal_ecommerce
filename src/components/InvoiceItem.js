import { Button, Collapse, ThemeIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconCheck,
  IconCircleXFilled,
  IconPhotoOff,
} from "@tabler/icons-react";
import { openContextModal } from "@mantine/modals";
import dayjs from "dayjs";
import Image from "next/image";
import React from "react";
import { fetchMethod } from "@/utils/fetch";
import { getCookie } from "cookies-next";
import { showNotification } from "@mantine/notifications";

const InvoiceItem = ({ data, index }) => {
  const [opened, { toggle }] = useDisclosure(false);
  return (
    <div>
      <div
        key={index}
        className="flex flex-col p-2 hover:cursor-pointer hover:bg-gray-50 sm:flex-row sm:items-center sm:justify-between"
        onClick={toggle}
        style={{ borderBottom: "1px solid rgba(0, 30, 29, 0.23)" }}
      >
        <div className="flex flex-col">
          <div className="flex flex-row">
            <p className="text-base text-grey">Захиалгын дугаар :</p>
            <p className="ml-1 text-base">{data?.orderid}</p>
          </div>
          <div className="flex flex-row">
            <p className="text-base text-grey">Огноо : </p>
            <p className="ml-1 text-base">
              {dayjs(data?.createdAt)?.format("YYYY-MM-DD HH:mm")}
            </p>
          </div>
        </div>
        <StatusButton status={data.status} data={data} />
      </div>
      <Collapse in={opened}>
        <div>
          <div className="flex w-full flex-col items-center py-2">
            {data?.order?.order_item &&
              data?.order?.order_item?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex w-full flex-col p-4 sm:flex-row"
                    style={{ borderBottom: "2px solid #DADEDE" }}
                  >
                    {item?.product?.additionalImage?.lengh > 0 ? (
                      <Image
                        loader={() => item?.product?.additionalImage[0]?.url}
                        src={item?.product?.additionalImage[0]?.url}
                        alt={item?.product?.additionalImage[0]?.url}
                        width={100}
                        height={150}
                        className="h-48 object-contain sm:h-32 sm:w-32"
                      />
                    ) : (
                      <div className="product-card-img flex h-48 flex-col items-center justify-center gap-2 rounded-md bg-gray-50 sm:h-32 sm:w-32">
                        <ThemeIcon size="lg" variant="light" color="green">
                          <IconPhotoOff size="80%" stroke={0.5} />
                        </ThemeIcon>
                      </div>
                    )}
                    <div className="flex flex-col sm:ml-3 sm:justify-evenly">
                      <p className="text-sm font-semibold lg:text-base">
                        {item?.name}
                      </p>
                      <div className="mt-1 flex flex-row items-center">
                        <p className="text-sm lg:text-base">
                          Ширхэг: {item?.qty}
                        </p>
                        <p className="ml-4 text-sm lg:text-base">
                          Нэгж үнэ: {item?.price}₮
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="flex justify-end">
            <p className="text-grey">Нийт үнийн дүн :</p>
            <p className="ml-1 font-semibold">{data?.order?.total}₮</p>
          </div>
        </div>
      </Collapse>
    </div>
  );
};

const StatusButton = ({ status, data }) => {
  const handleInvoice = () => {
    openContextModal({
      modal: "invoiceFile",
      title: "Нэхэмжлэл дэлгэрэнгүй",
      centered: true,
      style: { padding: "8px" },
      innerProps: { data },
    });
  };

  const paymentDone = async () => {
    const token = getCookie("token");
    const res = await fetchMethod(
      "GET",
      `order/invoice/payment?orderid=${data?.orderid}`,
      token,
    );
    if (res?.success) {
      showNotification({
        message: "Төлбөрийн мэдээлэл амжилттай илгээгдлээ.",
        icon: <IconCheck />,
        color: "green",
      });
    } else {
      showNotification({
        message: res?.message,
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

  switch (status) {
    case 100:
      return (
        <div className="mt-1 flex flex-row justify-end gap-2 sm:mt-0 sm:justify-start">
          <Button
            variant="outline"
            color="orange"
            onClick={(e) => {
              e.stopPropagation();
              handleInvoice();
            }}
          >
            Дэлгэрэнгүй
          </Button>
        </div>
      );
    case 200:
      return (
        <div className="mt-1 flex flex-row justify-end gap-2 sm:mt-0 sm:justify-start">
          <Button
            variant="filled"
            color="orange"
            onClick={(e) => {
              e.stopPropagation();
              paymentDone();
            }}
          >
            Төлбөр хийгдсэн
          </Button>
        </div>
      );
    default:
      null;
  }
};
export default InvoiceItem;
