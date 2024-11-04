/* eslint-disable react-hooks/exhaustive-deps */
import { regexNumber } from "@/utils/constant";
import { fetchMethod } from "@/utils/fetch";
import { errorNotification, successNotification } from "@/utils/utils";
import {
  Button,
  Center,
  Group,
  Input,
  Loader,
  PasswordInput,
  PinInput,
  Stack,
  rem,
} from "@mantine/core";
import {
  IconCircleXFilled,
  IconDeviceMobile,
  IconLock,
  IconSend,
  IconShieldLock,
} from "@tabler/icons-react";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

const Password = (props) => {
  const { setTabs } = props;
  const [seconds, setSeconds] = useState(60);
  const [number, setNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [errorPass, setErrorPass] = useState(false);
  const [errorConPass, setErrorConPass] = useState(false);
  const [checkNumber, setCheckNumber] = useState(false);
  const [checkSame, setCheckSame] = useState(false);
  const [show, setShow] = useState(false);
  const [confirmPass, setConfirmPass] = useState("");
  const [otpRequested, setOtpRequested] = useState(false);

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

  useEffect(() => {
    if (confirmPass.length > 0) {
      check("same", new RegExp(""));
    }
  }, [confirmPass]);

  useEffect(() => {
    if (password.length > 0) {
      setShow(true);
      check("number", regexNumber);
    } else {
      setShow(false);
    }
  }, [password]);

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

  const check = (type, regex) => {
    switch (type) {
      case "number":
        regex.test(password) ? setCheckNumber(true) : setCheckNumber(false);
        break;
      case "same":
        password === confirmPass ? setCheckSame(true) : setCheckSame(false);
        break;
    }
  };

  const handleSave = async () => {
    if (password.length === 0) {
      setErrorPass(true);
    } else {
      setErrorPass(false);
    }
    if (confirmPass.length === 0) {
      setErrorConPass(true);
    } else {
      setErrorConPass(false);
    }

    if (!errorConPass && !errorPass && checkNumber && checkSame) {
      const token = getCookie("token");
      const requestOption = {
        code: otp,
        newpassword: password,
      };
      const data = await fetchMethod(
        "POST",
        "auth/changepass",
        token,
        requestOption,
      );
      if (data.success) {
        successNotification({
          message: "Таны нууц үг амжилттай солигдлоо.!",
          color: "green",
        });
        setTabs("info");
        setOtp("");
        setPassword("");
        setConfirmPass("");
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
    }
  };

  const renderCheck = (state, text) => {
    return (
      <p
        class={`text-sm font-semibold ${state ? "text-primary600" : "text-red-500"}`}
      >
        - {text}
      </p>
    );
  };

  const handleSend = async () => {
    if (number.length < 8) {
      errorNotification({
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
              <p class="text-base font-semibold">
                {otpRequested ? "Нэг удаагийн код" : "Утасны дугаар"}
              </p>
            </Center>
            <Center>
              <p class="text-sm text-gray-500">
                {otpRequested
                  ? "Та 6 оронтой код оруулна уу"
                  : "Та нэг удаагийн код авах дугаараа оруулна уу"}
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
            {otpRequested ? (
              seconds === 0 ? (
                loading ? (
                  <Loader variant="dots" color="yellow" />
                ) : (
                  <button
                    class="text-xs text-blue-400 underline lg:text-sm"
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
                  <p class="text-xs text-primary500">
                    {seconds} секунд хүлээнэ үү
                  </p>
                </Center>
              )
            ) : (
              <Button
                onClick={() => handleSend()}
                variant="outline"
                color="orange"
                styles={(theme) => ({
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
      <div className="flex w-full flex-row gap-8">
        <div className="w-full">
          <PasswordInput
            disabled={otp?.length < 6}
            size="sm"
            label="Шинэ нууц үг"
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
            icon={
              <IconLock
                style={{ width: rem(20), height: rem(20), color: "#48BE5B" }}
                stroke={2}
              />
            }
            placeholder="*********"
            styles={(theme) => ({
              label: {
                marginBottom: rem(4),
                fontSize: rem(15),
                fontWeight: "400",
              },
            })}
          />
          {errorPass && (
            <Input.Error className="mt-1">
              Шинэ нууц үг хоосон байна
            </Input.Error>
          )}
        </div>
        <div className="w-full">
          <PasswordInput
            value={confirmPass}
            disabled={otp?.length < 6}
            size="sm"
            label="Шинэ нууц үг давтах"
            onChange={(event) => setConfirmPass(event.currentTarget.value)}
            placeholder="*********"
            icon={
              <IconShieldLock
                style={{ width: rem(20), height: rem(20), color: "#48BE5B" }}
                stroke={2}
              />
            }
            styles={(theme) => ({
              label: {
                marginBottom: rem(4),
                fontSize: rem(15),
                fontWeight: "400",
              },
            })}
          />
          {errorConPass && (
            <Input.Error className="mt-1">
              Шинэ нууц үг давтах хоосон байна
            </Input.Error>
          )}
        </div>
      </div>
      {show && (
        <div
          className="mt-2 w-full rounded-lg px-4 py-2"
          style={{
            backgroundColor: checkNumber && checkSame ? "#D1FADF" : "#FEE4E2",
          }}
        >
          {renderCheck(checkNumber, "Нууц үг 4 оронтой тооноос бүрдсэн байна")}
          {renderCheck(checkSame, "Нууц үг ижилхэн байна")}
        </div>
      )}
      <div className="mt-4 flex w-full flex-row justify-end gap-8">
        <Button variant="outline" color="red">
          Арилгах
        </Button>
        <Button
          variant="filled"
          color="orange"
          onClick={() => handleSave()}
          styles={(theme) => ({
            root: {
              backgroundColor: "#48BE5B",
            },
          })}
        >
          Хадгалах
        </Button>
      </div>
    </div>
  );
};

export default Password;
