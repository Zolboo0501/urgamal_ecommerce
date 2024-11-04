/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import useSocket from "@/hooks/useSocket";
import { errorNotification, successNotification } from "@/utils/utils";
import { Button, Card, Stack, Tabs, rem } from "@mantine/core";
import { IconCircleXFilled } from "@tabler/icons-react";
import axios from "axios";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

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
        axiosReqOption,
      )
      .then((res) => {
        if (res.data?.result.success) {
          successNotification({
            message: "Төлбөр амжилттай төлөгдлөө устлаа.",
          });
        } else {
          errorNotification({
            message: "Төлбөр төлөгдөөгүй байна",

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
    <div className="mt-2 flex flex-col items-center gap-4">
      <Tabs defaultValue="qpay" classNames={{ panel: "mt-6" }} color="teal">
        <Tabs.List grow>
          <Tabs.Tab value="qpay">Qpay- р төлөх</Tabs.Tab>
          <div className="flex flex-1 lg:hidden">
            <Tabs.Tab value="others">Бусад апп</Tabs.Tab>
          </div>
        </Tabs.List>
        <Tabs.Panel value="qpay">
          <Stack align="center">
            <p className="text-sm">
              Та Qpay ашиглан төлбөрөө доорх зургийг уншуулан төлөөрэй
            </p>
            <div className="relative h-64 w-64 lg:h-96 lg:w-96">
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
            <p className="text-sm">
              Та доорх төлбөрийн хэрэгслүүдээр төлбөрөө гар утаснаасаа шууд хийх
              боломжтой
            </p>
            <p className="text-sm font-medium text-gray-500">
              Зөвхөн гар утаснаас үйлдлийг хийх боломжтой
            </p>
            <div className="mt-1 flex flex-wrap justify-center gap-4">
              {innerProps.paymentData?.urls?.map((e, index) => {
                return (
                  <Card component="a" href={e?.link} radius="lg" key={index}>
                    <div
                      key={e?.name}
                      className="flex w-14 max-w-14 flex-col items-center justify-center gap-2"
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
                      <p className="text-center text-xs">{e?.description}</p>
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
        color="teal"
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
