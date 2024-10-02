import { fetchMethod } from "@/utils/fetch";
import {
  Button,
  Center,
  Input,
  PinInput,
  Stack,
  TextInput,
  rem,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
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
            showNotification({
              message: "Таны цахим шуудан луу код илгээлээ.!",
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
      } else {
        showNotification({
          message: "Цахим шуудан буруу байна.",
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
          showNotification({
            message: "Таны цахим шуудан амжилттай баталгаажлаа.!",
            color: "green",
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
              <IconMail
                style={{ width: rem(46), height: rem(46), color: "#F9BC60" }}
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
                      color: "#F9BC60",
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
