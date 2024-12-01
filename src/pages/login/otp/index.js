import useUser from "@/hooks/useUser";
import { fetchMethod } from "@/utils/fetch";
import { errorNotification, successNotification } from "@/utils/utils";
import {
  Button,
  Group,
  Input,
  Loader,
  PinInput,
  rem,
  Stack,
} from "@mantine/core";
import { IconPhoneCall } from "@tabler/icons-react";
import { setCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const icon = (
  <IconPhoneCall
    style={{ width: rem(16), height: rem(16), color: "green" }}
    stroke={1.5}
  />
);

const OTP = () => {
  const router = useRouter();
  const { login } = useUser();
  const [otpRequested, setOtpRequested] = useState(false);
  const [otp, setOtp] = useState("");
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const [error, setError] = useState(false);

  const fetchOTP = async () => {
    if (number.length < 8) {
      setError(true);
    } else {
      setError(false);
      setLoading(true);
      try {
        const data = await fetchMethod("GET", `auth/code?mobile=${number}`);
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
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    const requestOption = { mobile: number, code: otp };
    const res = await fetchMethod("POST", "auth/login/code", "", requestOption);
    if (res?.success) {
      const bigDate = 30 * 24 * 60 * 60 * 1000;
      const token = res.token;
      login(token);
      setCookie("number", number, { maxAge: bigDate });
      setCookie("addToCart", true);

      successNotification({
        message: "Амжилттай нэвтэрлээ",
      });
      router.push("/home");
    } else {
      errorNotification({
        message: "Код буруу эсвэл хүчинтэй хугацаа дууссан байна.",
      });
    }
    setLoading(false);
  };

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

  return (
    <div className="absolute flex h-full w-full flex-row">
      <div className="relative hidden h-full w-4/6 md:block lg:w-8/12 xl:w-9/12">
        <Image fill src={"/plant.jpg"} alt="plant" objectFit="cover" />
      </div>
      <div className="relative flex flex-1 flex-col items-center justify-center">
        <Image src="/logo.png" width={100} height={100} alt="logo" />
        <p className="mt-4 font-sans text-xl font-bold">Нэг удаагийн код</p>
        <div className="mt-5 w-4/6">
          <Input.Wrapper label="Утасны дугаар" size="md">
            <Input
              radius={"xl"}
              className="mt-3"
              id="mobile-number-input"
              inputMode="tel"
              type="number"
              icon={icon}
              length={8}
              autoFocus
              required
              value={number}
              onChange={(event) => setNumber(event.currentTarget.value)}
              styles={() => ({
                input: {
                  "&:focus-within": {
                    outline: "0.01rem solid green",
                  },
                },
              })}
            />
            {error && (
              <Input.Error className="mt-2">
                Утасны дугаар буруу байна
              </Input.Error>
            )}
          </Input.Wrapper>
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

                <Group position="right">
                  <p className="text-xs">Код очоогүй юу?</p>

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
            variant="outline"
            color="green"
            radius="xl"
            className="mt-4"
            w={"100%"}
            type="submit"
            onClick={otpRequested ? handleLogin : fetchOTP}
          >
            {otpRequested ? "Нэвтрэх" : "Илгээх"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OTP;
