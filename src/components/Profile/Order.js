import { ORDER_STATUS } from "@/utils/constant";
import { numberWithCommas } from "@/utils/utils";
import { Badge, Button, Collapse, ThemeIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { openContextModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import {
  IconCalendarEvent,
  IconPackage,
  IconPhotoOff,
} from "@tabler/icons-react";
import axios from "axios";
import { getCookie } from "cookies-next";
import dayjs from "dayjs";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

const Order = ({ data }) => {
  const Router = useRouter();
  const [opened, { toggle }] = useDisclosure(false);
  const userToken = getCookie("token");
  const [loading, setLoading] = useState(false);
  const [refundStatus, setRefundStatus] = useState("");

  const refundFormRequest = async () => {
    openContextModal({
      modal: "refundDescription",
      title: "Буцаалт хийх",
      innerProps: {
        orderid: data?.orderid,
        setStatus: setRefundStatus,
        status: refundStatus,
      },
      centered: true,
      size: "lg",
      onclose: () => {
        Router.reload();
      },
    });
  };

  const bankInfomation = async () => {
    openContextModal({
      modal: "bankInfo",
      title: "Ta банкны мэдээллээ үнэн зөв оруулна уу!",
      innerProps: {
        orderid: data?.refund_request?.id,
        setStatus: setRefundStatus,
        status: refundStatus,
      },
      centered: true,
      size: "lg",
    });
  };

  const handleEbarimt = () => {
    openContextModal({
      modal: "ebarimt",
      title: "Баримт",
      centered: true,
      size: "md",
      innerProps: {
        paymentData: data,
      },
    });
  };

  const handleChange = () => {
    openContextModal({
      modal: "changeModal",
      title: "Солиулалт хийх",
      centered: true,
      size: "md",
    });
  };
  const fetchPaymentData = async (orderId) => {
    setLoading(true);
    const axiosReqOption = {
      headers: {
        Authorization: "Bearer " + userToken,
        "Content-Type": "application/json",
      },
    };
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/order/payment/${orderId}`)
      .then((res) => {
        openContextModal({
          modal: "payment",
          title: "Төлбөр төлөлт",
          innerProps: {
            paymentData: res.data?.invoice,
          },
          centered: true,
          size: "lg",
        });
      })
      .catch((err) => {
        if (err.response) {
          showNotification({
            message: err.response.data.message,
            color: "red",
          });
        } else {
          showNotification({
            message: "Төлбөрийн мэдээлэл авахад алдаа гарлаа",
            color: "red",
          });
        }
      });
    setLoading(false);
  };

  const renderButtons = () => {
    return (
      <div className="mt-1 flex flex-row justify-end gap-3 sm:mt-0 sm:justify-start">
        {data?.status === ORDER_STATUS.PAID && data?.lottery_qr && (
          <Button
            variant="outline"
            color="violet"
            radius={"xl"}
            loading={loading}
            onClick={(e) => {
              e.stopPropagation();
              handleEbarimt();
              // fetchPaymentData(data?.orderid);
            }}
          >
            Баримт
          </Button>
        )}
        {data?.status === ORDER_STATUS?.CREATED && (
          <Button
            variant="outline"
            loading={loading}
            radius={"xl"}
            color="teal"
            onClick={(e) => {
              e.stopPropagation();
              fetchPaymentData(data?.orderid);
            }}
          >
            Төлбөр төлөх
          </Button>
        )}
        {data?.refund_request === null && data?.status?.toString() === "200" ? (
          <>
            <Button
              variant="outline"
              color="red"
              loading={loading}
              radius={"xl"}
              onClick={(e) => {
                e.stopPropagation();
                refundFormRequest();
              }}
            >
              Буцаалт
            </Button>
            <Button
              variant="outline"
              color="orange"
              loading={loading}
              radius={"xl"}
              onClick={(e) => {
                e.stopPropagation();
                handleChange();
              }}
            >
              Солиулалт
            </Button>
          </>
        ) : data?.refund_request?.status === 100 ? (
          <Badge color="voilet.4" radius="xs" p={15}>
            Хүлээгдэж байна
          </Badge>
        ) : data?.refund_request?.status === 200 ? (
          <Button
            variant="light"
            color="indigo"
            loading={loading}
            onClick={(e) => {
              e.stopPropagation();
              bankInfomation();
            }}
          >
            Банк мэдээлэл
          </Button>
        ) : data?.refund_request?.status === 300 ? (
          <Badge color="voilet.4" radius="xs" p={15}>
            Хүлээгдэж байна
          </Badge>
        ) : data?.refund_request?.status === 400 ? (
          <Badge color="red.9" radius="xs" p={15}>
            Татгалзсан
          </Badge>
        ) : data?.refund_request?.status === 500 ? (
          <Badge color="green" radius="xs" p={15}>
            Буцаалт хийгдсэн
          </Badge>
        ) : null}
      </div>
    );
  };

  const renderStatus = () => {
    switch (data?.status) {
      case ORDER_STATUS.PAID:
        return (
          <div className="items-center justify-center sm:w-32">
            <Badge color="teal" size="sm">
              Төлөгдсөн
            </Badge>
          </div>
        );

      case ORDER_STATUS.CONFIRMED:
        return (
          <div className="w-32 items-center justify-center">
            <Badge color="yellow" size="sm">
              Хүлээн авсан
            </Badge>
          </div>
        );
      case ORDER_STATUS.DECLINED:
        return (
          <div className="w-32 items-center justify-center">
            <Badge color="red" size="sm">
              Цуцалсан
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
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
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
          <div className="mt-2 flex flex-1">{renderButtons()}</div>
        </div>
        <div className="mt-2 flex flex-1 flex-row justify-between sm:mt-0">
          {renderStatus()}
          <p className="flex items-center justify-center text-start text-base font-bold text-primary700 sm:w-32 lg:text-lg">
            {numberWithCommas(data?.total) || 0}₮
          </p>
        </div>
      </div>

      <Collapse in={opened}>
        <div>
          <div className="flex w-full flex-col items-center py-2">
            {data?.order_item &&
              data?.order_item.map((item, index) => {
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
          {/* <div className="flex justify-end">
            <p className="text-grey">Нийт үнийн дүн :</p>
            <p className="ml-1 font-semibold">{data.total}₮</p>
          </div> */}
        </div>
      </Collapse>
    </div>
  );
};

export default Order;
