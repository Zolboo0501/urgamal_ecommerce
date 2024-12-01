/* eslint-disable react/prop-types */
import useUser from "@/hooks/useUser";
import { fetchMethod } from "@/utils/fetch";
import { errorNotification, successNotification } from "@/utils/utils";
import {
  Button,
  Container,
  Divider,
  Group,
  Input,
  Loader,
  PinInput,
  Stack,
} from "@mantine/core";
import { setCookie } from "cookies-next";
import React, { useEffect, useState } from "react";

export default function LoginModal({ context, id }) {
  const { login } = useUser();
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpRequested, setOtpRequested] = useState(false);
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(60);
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        clearInterval(interval);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  const fetchOTP = async () => {
    setLoading(true);
    try {
      const data = await fetchMethod("GET", `auth/code?mobile=${mobileNumber}`);
      if (data.success) {
        setOtpRequested(true);
        setSeconds(60);
        successNotification({
          message: "Таны утсанд 6 оронтой код амжилттай илгээлээ.!",
        });
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };
  const handleLogin = async () => {
    setLoading(true);
    const requestOption = { mobile: mobileNumber, code: otp };
    const res = await fetchMethod("POST", "auth/login/code", "", requestOption);
    if (res?.success) {
      const bigDate = 30 * 24 * 60 * 60 * 1000;
      const token = res.token;
      login(token);
      setCookie("number", mobileNumber, { maxAge: bigDate });
      setCookie("addToCart", true);
      successNotification({
        message: "Амжилттай нэвтэрлээ",
      });
      context.closeModal(id);
    } else {
      errorNotification({
        message: "Код буруу эсвэл хүчинтэй хугацаа дууссан байна.",
      });
    }

    setLoading(false);
  };
  return (
    <Container>
      <Stack spacing="lg">
        <Stack mt="lg" spacing={8}>
          <label htmlFor="mobile-number-input">
            <p className="font-medium">Утасны дугаар</p>
          </label>
          <Input
            id="mobile-number-input"
            inputMode="tel"
            type="number"
            length={8}
            autoFocus
            value={mobileNumber}
            onChange={(event) => setMobileNumber(event.currentTarget.value)}
          />
        </Stack>
        {otpRequested && <Divider />}
        {otpRequested && (
          <Stack mt="md" spacing={8} align="center">
            <label htmlFor="otp-input">
              <p className="font-medium">Нэг удаагийн нууц үг</p>
            </label>
            <Group position="center">
              <PinInput
                id="otp-input"
                oneTimeCode
                inputMode="decimal"
                type="number"
                placeholder=""
                length={6}
                size="md"
                value={otp}
                onChange={setOtp}
              />
              {/* <Button size="xs">Дахин илгээх</Button> */}
              <Group position="right">
                <p className="text-xs">Код очоогүй юу?</p>

                {/* <ActionIcon size="lg">
                    <IconReload size="1.6rem" />
                  </ActionIcon> */}

                {seconds === 0 ? (
                  loading ? (
                    <Loader variant="dots" color="teal" />
                  ) : (
                    <button
                      className="text-xs text-primary underline"
                      onClick={() => {
                        setOtp("");
                        fetchOTP();
                      }}
                    >
                      Дахин авах
                    </button>
                  )
                ) : (
                  <p className="text-xs text-orange-500">
                    {seconds} секунд хүлээнэ үү
                  </p>
                )}
              </Group>
            </Group>
          </Stack>
        )}
        <Button
          mt="md"
          color="teal"
          loading={loading}
          onClick={otpRequested ? handleLogin : fetchOTP}
        >
          {otpRequested ? "Нэвтрэх" : "Үргэлжлүүлэх"}
        </Button>
      </Stack>
    </Container>
  );
}
