import { fetchMethod } from "@/utils/fetch";
import { errorNotification, successNotification } from "@/utils/utils";
import {
  Button,
  Center,
  Input,
  PinInput,
  Stack,
  TextInput,
  rem,
} from "@mantine/core";
import {
  IconAt,
  IconCheck,
  IconCircleCheckFilled,
  IconCircleXFilled,
  IconMail,
  IconSend,
} from "@tabler/icons-react";
import { getCookie } from "cookies-next";
import { useState } from "react";

const Mail = () => {
  const [emailRequested, setEmailRequested] = useState(false);
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [otp, setOtp] = useState("");
  const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;

  const handleSend = async () => {
    if (email?.length === 0) {
      setErrorEmail(true);
    } else {
      setErrorEmail(false);
      if (emailRegex.test(email)) {
        const token = getCookie("token");
        const requestOption = { email: email };
        try {
          const data = await fetchMethod(
            "POST",
            "auth/verify/mail",
            token,
            requestOption,
          );
          if (data.success) {
            setEmailRequested(true);
            successNotification({
              message: "Таны цахим шуудан луу код илгээлээ.!",
              color: "green",
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
      } else {
        errorNotification({
          message: "Цахим шуудан буруу байна.",

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
        email: email,
        code: otp,
      };
      try {
        const data = await fetchMethod(
          "POST",
          "auth/verify",
          token,
          requestOption,
        );
        if (data.success) {
          successNotification({
            message: "Таны цахим шуудан амжилттай баталгаажлаа.!",

            icon: (
              <IconCircleCheckFilled
                style={{
                  width: rem(30),
                  height: rem(30),
                }}
              />
            ),
          });
          setEmailRequested(false);
          setEmail("");
          setOtp("");
        } else {
          errorNotification({
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
              <IconMail
                style={{ width: rem(46), height: rem(46), color: "#48BE5B" }}
                stroke={2}
              />
            </Center>
            <Center>
              <p class="text-base font-semibold">
                {emailRequested
                  ? "Нэг удаагийн код"
                  : "Цахим шуудан баталгаажуулах"}
              </p>
            </Center>
            <Center>
              <p class="text-sm text-gray-500">
                {emailRequested
                  ? "Таны цахим шуудан дээрх 6 оронтой код оруулна уу"
                  : "Та зөвхөн өөрийн цахим шууданг оруулна уу"}
              </p>
            </Center>
            {emailRequested ? (
              <Center>
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
              </Center>
            ) : (
              <TextInput
                placeholder="Цахим шуудан"
                radius={"xl"}
                icon={
                  <IconAt
                    style={{
                      width: rem(20),
                      height: rem(20),
                      color: "#48BE5B",
                    }}
                    stroke={2}
                  />
                }
                onChange={(event) => setEmail(event.currentTarget.value)}
                value={email}
                styles={(theme) => ({
                  label: {
                    fontSize: rem(15),
                    fontWeight: "400",
                  },
                })}
              />
            )}
            {errorEmail && <Input.Error>Шинэ нууц үг хоосон байна</Input.Error>}

            {emailRequested ? (
              <Button
                onClick={() => handleConfirm()}
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
                Илгээх
              </Button>
            )}
          </Stack>
        </Center>
      </div>
    </div>
  );
};

export default Mail;
