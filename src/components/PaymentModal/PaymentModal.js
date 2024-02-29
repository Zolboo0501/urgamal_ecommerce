/* eslint-disable react-hooks/exhaustive-deps */
import useSocket from "@/hooks/useSocket";
import { Button, Card, Stack, Tabs, Text, rem } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconCheck, IconCircleXFilled } from "@tabler/icons-react";
import axios from "axios";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function PaymentModal({ context, id, innerProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const socket = useSocket();
  useEffect(() => {
    if (socket?.socket?.connected) {
      socket?.socket?.on("inquiryStatus", (data) => {
        if (data.success) {
          callInquiry(innerProps.paymentData?.invoice_id);
          context.closeModal(id);
          if (innerProps.shouldRedirect) {
            router.push({
              pathname: "/profile",
              query: {
                cr: "order",
              },
            });
          }
        }
      });
    }
  }, []);

  const callInquiry = (invoiceId) => {
    setLoading(true);
    const userToken = getCookie("token");
    const axiosReqOption = {
      headers: {
        Authorization: "Bearer " + userToken,
        "Content-Type": "application/json",
      },
    };
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/order/payment/inquiry/${invoiceId}`,
        axiosReqOption
      )
      .then((res) => {
        if (res.data?.result.success) {
          showNotification({
            message: "Төлбөр амжилттай төлөгдлөө устлаа.",
            icon: <IconCheck />,
            color: "green",
          });
        } else {
          showNotification({
            message: "Төлбөр төлөгдөөгүй байна",
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
      })
      .catch((err) => {
        console.log(err, "err");
      });
    setLoading(false);
  };
  return (
    <div className="flex flex-col mt-2 gap-4 items-center">
      <Tabs defaultValue="qpay" classNames={{ panel: "mt-6" }} color="yellow">
        <Tabs.List grow>
          <Tabs.Tab value="qpay">Qpay- р төлөх</Tabs.Tab>
          <div className="lg:hidden">
            <Tabs.Tab value="others">Бусад апп</Tabs.Tab>
          </div>
        </Tabs.List>
        <Tabs.Panel value="qpay">
          <Stack align="center">
            <Text size="sm">
              Та Qpay ашиглан төлбөрөө доорх зургийг уншуулан төлөөрэй
            </Text>
            <div className="relative w-64 h-64 lg:h-96 lg:w-96">
              <Image
                src={`data:image/png;base64,${innerProps.paymentData?.qr_image}`}
                alt="qpay QR"
                fill
              />
            </div>
          </Stack>
        </Tabs.Panel>
        <Tabs.Panel value="others">
          <Stack align="start" spacing={6}>
            <Text size="sm">
              Та доорх төлбөрийн хэрэгслүүдээр төлбөрөө гар утаснаасаа шууд хийх
              боломжтой
            </Text>
            <Text color="dimmed" size="sm" fw={"500"}>
              Зөвхөн гар утаснаас үйлдлийг хийх боломжтой
            </Text>
            <div className="flex flex-wrap gap-4 justify-center mt-1">
              {innerProps.paymentData?.urls?.map((e, index) => {
                return (
                  <Card component="a" href={e?.link} radius="lg" key={index}>
                    <div
                      key={e?.name}
                      className="flex flex-col gap-2 w-14 max-w-14 justify-center items-center"
                    >
                      <div className="relative h-12 w-12">
                        <Image
                          loader={() => e?.logo}
                          src={e?.logo}
                          alt={e?.description}
                          fill
                          className="rounded-md"
                        />
                      </div>
                      <Text size="xs" align="center">
                        {e?.description}
                      </Text>
                    </div>
                  </Card>
                );
              })}
            </div>
          </Stack>
        </Tabs.Panel>
      </Tabs>
      <Button
        variant="subtle"
        color="yellow"
        fullWidth
        loading={loading}
        onClick={() => {
          callInquiry(innerProps.paymentData?.invoice_id);
          context.closeModal(id);
          if (innerProps.shouldRedirect) {
            router.push({
              pathname: "/profile",
              query: {
                cr: "order",
              },
            });
          }
        }}
      >
        Болсон
      </Button>
    </div>
  );
}
