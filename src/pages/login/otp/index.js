import Image from "next/image";
import {
  rem,
  Input,
  Button,
  Stack,
  Text,
  Group,
  Loader,
  PinInput,
} from "@mantine/core";
import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { IconPhoneCall } from "@tabler/icons-react";
import { fetchMethod } from "@/utils/fetch";
import { showNotification } from "@mantine/notifications";
import { UserConfigContext } from "@/utils/userConfigContext";
import { setCookie } from "cookies-next";

const icon = (
  <IconPhoneCall
    style={{ width: rem(16), height: rem(16), color: "green" }}
    stroke={1.5}
  />
);

const OTP = () => {
  const router = useRouter();
  const { login } = useContext(UserConfigContext);
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
          showNotification({
            message: "Таны утсанд 6 оронтой код амжилттай илгээлээ.!",
            color: "green",
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

      showNotification({
        message: "Амжилттай нэвтэрлээ",
        color: "green",
      });
      router.push("/home");
    } else {
      showNotification({
        message: "Код буруу эсвэл хүчинтэй хугацаа дууссан байна.",
        color: "red",
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
    <div className="w-full h-full flex flex-row absolute">
      <div className="w-4/6 lg:w-8/12 xl:w-9/12 h-full relative hidden md:block">
        <Image fill src={"/plant.jpg"} alt="plant" objectFit="cover" />
      </div>
      <div className="flex flex-col relative items-center justify-center flex-1">
        <Image src="/logo.png" width={100} height={100} alt="logo" />
        <p className="text-xl font-bold mt-4 font-sans">Нэг удаагийн код</p>
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
              styles={(theme) => ({
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
              <label for="otp-input">
                <Text weight={500}>Нэг удаагийн нууц үг</Text>
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
                  <Text size="xs">Код очоогүй юу?</Text>

                  {seconds === 0 ? (
                    loading ? (
                      <Loader variant="dots" color="yellow" />
                    ) : (
                      <Text
                        size="xs"
                        underline
                        color="yellow"
                        component="button"
                        onClick={() => {
                          setOtp("");
                          fetchOTP();
                        }}
                      >
                        Дахин авах
                      </Text>
                    )
                  ) : (
                    <Text size="xs" color="orange">
                      {seconds} секунд хүлээнэ үү
                    </Text>
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
