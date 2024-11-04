/* eslint-disable react/prop-types */
import { Badge, Button, Collapse, rem, ThemeIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconCalendarEvent,
  IconCheck,
  IconCircleXFilled,
  IconPackage,
  IconPhotoOff,
} from "@tabler/icons-react";
import { openContextModal } from "@mantine/modals";
import dayjs from "dayjs";
import Image from "next/image";
import React from "react";
import { fetchMethod } from "@/utils/fetch";
import { getCookie } from "cookies-next";
import {
  errorNotification,
  numberWithCommas,
  successNotification,
} from "@/utils/utils";
import { INVOICES_STATUS } from "@/utils/constant";

const InvoiceItem = ({ data, index }) => {
  const [opened, { toggle }] = useDisclosure(false);

  const renderStatus = () => {
    switch (data?.status) {
      case INVOICES_STATUS.VERIFY_REQUEST:
        return (
          <div className="items-center justify-center sm:w-32">
            <Badge color="lime" size="sm">
              Илгээгдсэн
            </Badge>
          </div>
        );
      case INVOICES_STATUS.VERIFIED:
        return (
          <div className="items-center justify-center sm:w-32">
            <Badge color="green" size="sm">
              Баталгаажсан
            </Badge>
          </div>
        );
      case INVOICES_STATUS.PAYMENT_VERIFY_REQUEST:
        return (
          <div className="sm:w-34 items-center justify-center">
            <Badge color="yellow" size="sm">
              Төлбөр илгээгдсэн
            </Badge>
          </div>
        );
      case INVOICES_STATUS.PAYMENT_VERIFIED:
        return (
          <div className="items-center justify-center sm:w-36">
            <Badge color="teal" size="sm">
              Төлбөр баталгаажсан
            </Badge>
          </div>
        );
      case INVOICES_STATUS.DECLINED:
        return (
          <div className="items-center justify-center sm:w-32">
            <Badge color="red" size="sm">
              Цуцалсан
            </Badge>
          </div>
        );

      case INVOICES_STATUS.EXPIRED:
        return (
          <div className="items-center justify-center sm:w-32">
            <Badge color="pink" size="sm">
              Хугацаа дууссан
            </Badge>
          </div>
        );

      default:
        return (
          <div className="w-32 items-center justify-center">
            <Badge color="blue" size="sm">
              Үүссэн
            </Badge>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-1 flex-col rounded-md p-4 shadow-md hover:cursor-pointer hover:bg-gray-50">
      <div className="flex flex-col sm:flex-row sm:items-center">
        <div className="flex flex-1 flex-col">
          <div
            key={index}
            className="flex flex-col p-2 hover:cursor-pointer hover:bg-gray-50 sm:flex-row sm:items-center sm:justify-between"
            onClick={toggle}
          >
            <div className="flex flex-col gap-2 pt-1">
              <div className="flex flex-row">
                <div className="mr-2">
                  <IconPackage color="#344054" />
                </div>
                <p className="text-base text-[#696A6C] lg:text-base">
                  Захиалгын дугаар :
                </p>
                <p className="ml-1 text-start text-base font-medium lg:text-base">
                  {data?.orderid}
                </p>
              </div>
              <div className="flex flex-row">
                <div className="mr-2">
                  <IconCalendarEvent color="#344054" />
                </div>
                <p className="text-base text-[#696A6C] lg:text-base">Огноо :</p>
                <p className="ml-1 text-start text-base font-medium text-grey900 lg:text-base">
                  {dayjs(data?.createdAt).format("YYYY-MM-DD HH:mm")}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-2 flex flex-1">
            <StatusButton status={data.status} data={data} />
          </div>
        </div>
        <div className="mt-2 flex flex-1 flex-row justify-between sm:mt-0">
          {renderStatus()}
          <p className="flex items-center justify-center text-start text-base font-bold text-primary700 sm:w-32 lg:text-lg">
            {numberWithCommas(data?.order?.total) || 0}₮
          </p>
        </div>
      </div>
      <Collapse in={opened}>
        <div>
          <div className="flex w-full flex-col items-center py-2">
            {data?.order?.order_item &&
              data?.order?.order_item.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="ml-6 flex w-full flex-col py-3 sm:flex-row"
                  >
                    {item?.product?.additionalImage?.length > 0 ? (
                      <Image
                        loader={() => item?.product?.additionalImage?.[0]?.url}
                        src={item?.product?.additionalImage?.[0]?.url}
                        alt={item?.product?.additionalImage?.[0]?.url}
                        width={128}
                        height={128}
                        className="h-48 w-full rounded-md object-cover sm:h-24 sm:w-24 2xl:h-32 2xl:w-32"
                      />
                    ) : (
                      <div className="product-card-img flex h-48 flex-col items-center justify-center gap-2 rounded-md bg-gray-50 sm:h-32 sm:w-32">
                        <ThemeIcon size="lg" variant="light" color="green">
                          <IconPhotoOff size="80%" stroke={0.5} />
                        </ThemeIcon>
                      </div>
                    )}
                    <div className="mt-2 flex flex-1 flex-col gap-2 sm:ml-4">
                      <p className="text-lg font-semibold lg:text-lg">
                        {item.name}
                      </p>
                      <div className="flex flex-row gap-5">
                        <div className="mt-1 flex flex-row items-center">
                          <p className="text-base text-[#696A6C] lg:text-base">
                            Ширхэг :
                          </p>
                          <p className="ml-1 text-start text-base font-bold text-primary700 lg:text-base">
                            {item?.qty}
                          </p>
                        </div>
                        <div className="mt-1 flex flex-row items-center">
                          <p className="text-base text-[#696A6C] lg:text-base">
                            Үнэ :
                          </p>
                          <p className="ml-1 text-start text-base font-bold text-primary700 lg:text-base">
                            {numberWithCommas(item?.price) || 0}₮
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
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
      successNotification({
        message: "Төлбөрийн мэдээлэл амжилттай илгээгдлээ.",
        icon: <IconCheck />,
      });
    } else {
      errorNotification({
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
            radius={"xl"}
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
            variant="outline"
            color="teal"
            radius={"xl"}
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
