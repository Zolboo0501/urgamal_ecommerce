import { fetchMethod } from "@/utils/fetch";
import { errorNotification, successNotification } from "@/utils/utils";
import {
  Button,
  Center,
  Group,
  Loader,
  PinInput,
  Stack,
  rem,
} from "@mantine/core";
import {
  IconCheck,
  IconCircleXFilled,
  IconDeviceMobile,
  IconSend,
} from "@tabler/icons-react";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";

const Mobile = () => {
  const [seconds, setSeconds] = useState(60);
  const [number, setNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpRequested, setOtpRequested] = useState(false);

  const fetchOTP = async () => {
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
  };

  useEffect(() => {
    if (otpRequested) {
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
    }
  }, [seconds, otpRequested]);

  const handleSend = async () => {
    if (number.length < 8) {
      errorNotification({
        message: "Дугаар буруу байна.!",

        icon: (
          <IconCircleXFilled
            style={{
              width: rem(30),
              height: rem(30),
            }}
          />
        ),
      });
    } else {
      setLoading(true);
      try {
        const data = await fetchMethod("GET", `auth/code?mobile=${number}`);
        if (data.success) {
          setOtpRequested(true);
          setSeconds(60);
          successNotification({
            message: "Таны утсанд 6 оронтой код амжилттай илгээлээ.!",
          });
        } else {
          errorNotification({
            message: data.message,
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
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    if (otp?.length < 6) {
      errorNotification({
        message: "Нэг удаагийн коду буруу байна.!",
        icon: (
          <IconCircleXFilled
            style={{
              width: rem(30),
              height: rem(30),
            }}
          />
        ),
      });
    } else {
      const token = getCookie("token");
      const requestOption = {
        mobile: number,
        code: otp,
      };
      try {
        const data = await fetchMethod(
          "POST",
          "auth/verify/mobile",
          token,
          requestOption,
        );
        if (data.success) {
          successNotification({
            message: "Таны дугаар амжилттай баталгаажлаа.!",
          });
          setOtpRequested(false);
          setNumber("");
          setOtp("");
        } else {
          errorNotification({
            message: data.message,
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
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div className="mt-4">
      <div className="mt-4 flex w-full flex-col gap-8 py-10">
        <Center>
          <Stack justify="center">
            <Center>
              <IconDeviceMobile
                style={{ width: rem(46), height: rem(46), color: "#48BE5B" }}
                stroke={2}
              />
            </Center>
            <Center>
              <p className="text-base font-semibold">
                {otpRequested
                  ? "Нэг удаагийн код"
                  : "Утасны дугаар баталгаажуулах"}
              </p>
            </Center>
            <Center>
              <p className="text-sm text-gray-500">
                {otpRequested
                  ? "Та 6 оронтой код оруулна уу"
                  : "Та зөвхөн өөрийн утасны дугаарыг оруулна уу"}
              </p>
            </Center>
            <Center>
              <Group justify="center">
                {otpRequested ? (
                  <PinInput
                    id="otp-input"
                    oneTimeCode
                    inputMode="decimal"
                    type="number"
                    length={6}
                    size="md"
                    value={otp}
                    onChange={setOtp}
                  />
                ) : (
                  <PinInput
                    id="number"
                    oneTimeCode
                    inputMode="decimal"
                    type="number"
                    placeholder=""
                    length={8}
                    size="md"
                    value={number}
                    onChange={setNumber}
                  />
                )}
              </Group>
            </Center>
            {otpRequested &&
              (seconds === 0 ? (
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
                <Center>
                  <p className="text-xs text-orange-500">
                    {seconds} секунд хүлээнэ үү
                  </p>
                </Center>
              ))}
            {otpRequested ? (
              <Button
                onClick={() => handleConfirm()}
                variant="outline"
                color="orange"
                styles={() => ({
                  root: {
                    marginTop: rem(10),
                    borderColor: "#48BE5B",
                  },
                  label: {
                    color: "#48BE5B",
                  },
                })}
                leftSection={
                  <IconCheck
                    style={{
                      width: rem(20),
                      height: rem(20),
                      color: "#48BE5B",
                    }}
                    stroke={2}
                  />
                }
              >
                Баталгаажуулах
              </Button>
            ) : (
              <Button
                onClick={() => handleSend()}
                variant="outline"
                color="orange"
                styles={() => ({
                  root: {
                    marginTop: rem(10),
                    borderColor: "#48BE5B",
                  },
                  label: {
                    color: "#48BE5B",
                  },
                })}
                leftSection={
                  <IconSend
                    style={{
                      width: rem(20),
                      height: rem(20),
                      color: "#48BE5B",
                    }}
                    stroke={2}
                  />
                }
              >
                SMS илгээх
              </Button>
            )}
          </Stack>
        </Center>
      </div>
    </div>
  );
};

export default Mobile;
