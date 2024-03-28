import { Button, Collapse, Badge, ThemeIcon, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import { showNotification } from "@mantine/notifications";
import { getCookie } from "cookies-next";
import { useState } from "react";
import { openContextModal } from "@mantine/modals";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import Image from "next/image";
import { IconPhotoOff } from "@tabler/icons-react";

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

  return (
    <div>
      <div
        className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-2 py-3 hover:bg-gray-50 hover:cursor-pointer"
        onClick={toggle}
        style={{ borderBottom: "1px solid rgba(0, 30, 29, 0.23)" }}
      >
        <div className="flex flex-col">
          <div className="flex flex-row">
            <p className="text-base text-grey">Захиалгын дугаар :</p>
            <p className="text-base ml-1">{data?.orderid}</p>
          </div>
          <div className="flex flex-row">
            <p className="text-base text-grey">Огноо : </p>
            <p className="text-base ml-1">
              {dayjs(data?.createdAt).format("YYYY-MM-DD HH:mm")}
            </p>
          </div>
        </div>
        <div className="flex flex-row justify-end sm:justify-start gap-2 mt-1 sm:mt-0">
          {data?.status === 200 && data?.lottery_qr && (
            <Button
              variant="light"
              color="orange"
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
          {data?.status?.toString() === "100" && (
            <Button
              variant="light"
              color="orange"
              loading={loading}
              onClick={(e) => {
                e.stopPropagation();
                fetchPaymentData(data?.orderid);
              }}
            >
              Төлбөр төлөх
            </Button>
          )}
          {data?.refund_request === null &&
          data?.status?.toString() === "200" ? (
            <>
              <Button
                variant="light"
                color="red.5"
                loading={loading}
                onClick={(e) => {
                  e.stopPropagation();
                  refundFormRequest();
                }}
              >
                Буцаалт
              </Button>
              <Button
                variant="outline"
                color="orange.5"
                loading={loading}
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
      </div>
      <Collapse in={opened}>
        <div>
          <div className="w-full py-2 flex flex-col items-center">
            {data?.order_item &&
              data?.order_item.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row p-4 w-full"
                    style={{ borderBottom: "2px solid #DADEDE" }}
                  >
                    {item?.product?.additionalImage?.length > 0 ? (
                      <Image
                        loader={() => item?.product?.additionalImage?.[0]?.url}
                        src={item?.product?.additionalImage?.[0]?.url}
                        alt={item?.product?.additionalImage?.[0]?.url}
                        width={128}
                        height={128}
                        className="sm:w-32 sm:h-32 h-48 object-contain"
                      />
                    ) : (
                      <div className="product-card-img flex flex-col gap-2 justify-center items-center bg-gray-50 rounded-md sm:w-32 h-48 sm:h-32">
                        <ThemeIcon size="lg" variant="light" color="green">
                          <IconPhotoOff size="80%" stroke={0.5} />
                        </ThemeIcon>
                      </div>
                    )}
                    <div className="flex flex-col sm:justify-evenly sm:ml-3 sm:mt-2">
                      <p className="font-semibold text-sm lg:text-base">
                        {item?.name}
                      </p>
                      <div className="flex flex-row items-center mt-1">
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
            <p className="ml-1 font-semibold">{data.total}₮</p>
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default Order;
