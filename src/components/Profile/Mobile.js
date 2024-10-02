import { fetchMethod } from "@/utils/fetch";
import {
  Button,
  Center,
  Group,
  Loader,
  PinInput,
  Stack,
  rem,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import {
  IconCheck,
  IconCircleXFilled,
  IconDeviceMobile,
  IconSend,
} from "@tabler/icons-react";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

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
        showNotification({
          message: "Таны утсанд 6 оронтой код амжилттай илгээлээ.!",
          color: "green",
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
      showNotification({
        message: "Дугаар буруу байна.!",
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
    } else {
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
        } else {
          showNotification({
            message: data.message,
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
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    if (otp?.length < 6) {
      showNotification({
        message: "Нэг удаагийн коду буруу байна.!",
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
          showNotification({
            message: "Таны дугаар амжилттай баталгаажлаа.!",
            color: "green",
          });
          setOtpRequested(false);
          setNumber("");
          setOtp("");
        } else {
          showNotification({
            message: data.message,
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
                style={{ width: rem(46), height: rem(46), color: "#F9BC60" }}
                stroke={2}
              />
            </Center>
            <Center>
              <p class="text-base font-semibold">
                {otpRequested
                  ? "Нэг удаагийн код"
                  : "Утасны дугаар баталгаажуулах"}
              </p>
            </Center>
            <Center>
              <p class="text-sm text-gray-500">
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
                  <Loader variant="dots" color="yellow" />
                ) : (
                  <button
                    class="text-xs text-yellow-500 underline"
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
                  <p class="text-xs text-orange-500">
                    {seconds} секунд хүлээнэ үү
                  </p>
                </Center>
              ))}
            {otpRequested ? (
              <Button
                onClick={() => handleConfirm()}
                variant="outline"
                color="orange"
                styles={(theme) => ({
                  root: {
                    marginTop: rem(10),
                    borderColor: "#F9BC60",
                  },
                  label: {
                    color: "#F9BC60",
                  },
                })}
                leftSection={
                  <IconCheck
                    style={{
                      width: rem(20),
                      height: rem(20),
                      color: "#F9BC60",
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
                styles={(theme) => ({
                  root: {
                    marginTop: rem(10),
                    borderColor: "#F9BC60",
                  },
                  label: {
                    color: "#F9BC60",
                  },
                })}
                leftSection={
                  <IconSend
                    style={{
                      width: rem(20),
                      height: rem(20),
                      color: "#F9BC60",
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
