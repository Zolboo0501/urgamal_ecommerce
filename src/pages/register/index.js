import { Button, PasswordInput, rem, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconAt, IconLock, IconShieldLock } from "@tabler/icons-react";
import { setCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { regexNumber } from "@/utils/constant";
import { fetchMethod } from "@/utils/fetch";
import { errorNotification, successNotification } from "@/utils/utils";
import useUser from "@/hooks/useUser";
const icon = (
  <IconAt
    style={{ width: rem(16), height: rem(16), color: "green" }}
    stroke={1.5}
  />
);
const passIcon = (
  <IconLock
    style={{ width: rem(16), height: rem(16), color: "green" }}
    stroke={1.5}
  />
);

const shieldIcon = (
  <IconShieldLock
    style={{ width: rem(16), height: rem(16), color: "green" }}
    stroke={1.5}
  />
);

const Register = () => {
  const router = useRouter();
  const { login } = useUser();
  const [checkNumber, setCheckNumber] = useState(false);
  const [checkSame, setCheckSame] = useState(false);
  const [show, setShow] = useState(false);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      confirmPass: "",
    },
    validate: {
      email: (value) =>
        value.length > 0
          ? /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(value)
            ? null
            : "Цахим шуудан буруу байна."
          : "Цахим шуудан хоосон байна",
      password: (value) => !value && "Нууц үг хоосон байна",
      confirmPass: (value) => !value && "Нууц үг давтах хоосон байна",
    },
  });

  useEffect(() => {
    if (form.values.password.length > 0) {
      setShow(true);
      check("number", regexNumber);
    } else {
      setShow(false);
    }
  }, [form.values.password]);

  useEffect(() => {
    if (form.values.confirmPass.length > 0) {
      check("same", new RegExp(""));
    }
  }, [form.values.confirmPass]);

  const handleRegister = async (values) => {
    if (checkNumber && checkSame) {
      const data = await fetchMethod("POST", "auth", "", {
        email: values?.email,
        password: values?.password,
      });
      if (data?.success) {
        const bigDate = 30 * 24 * 60 * 60 * 1000;
        const token = data.token;
        login(token);
        setCookie("email", values?.email, { maxAge: bigDate });
        router.push("/home");
        successNotification({
          message: "Амжилттай бүртгүүллээ.",
        });
      } else {
        errorNotification({
          message: data.message,
          color: "red",
        });
      }
    }
  };

  const check = (type, regex) => {
    switch (type) {
      case "number":
        regex.test(form.values.password)
          ? setCheckNumber(true)
          : setCheckNumber(false);
        break;
      case "same":
        form.values.password === form.values.confirmPass
          ? setCheckSame(true)
          : setCheckSame(false);
        break;
    }
  };

  const renderCheck = (state, text) => {
    return (
      <p
        className={`text-sm font-medium ${
          state ? "text-green-500" : "text-red-500"
        }`}
      >
        {text}
      </p>
    );
  };

  return (
    <div className="absolute flex h-full w-full flex-row">
      <div className="relative hidden h-full w-4/6 md:block md:w-7/12 lg:w-8/12 xl:w-9/12">
        <Image fill src={"/plant.jpg"} alt="plant" objectFit="cover" />
      </div>
      <div className="relative flex flex-1 flex-col items-center justify-center">
        <Image src="/logo.png" width={100} height={100} alt="logo" />
        <p className="mt-4 text-xl font-bold">Бүртгүүлэх</p>
        <form
          className="mt-5 w-4/6"
          onSubmit={form.onSubmit((values) => handleRegister(values))}
        >
          <TextInput
            className="mt-2"
            label="Цахим шуудан"
            placeholder="Цахим шуудан"
            radius={"xl"}
            {...form.getInputProps("email")}
            icon={icon}
            styles={() => ({
              label: {
                marginBottom: rem(4),
                fontSize: rem(15),
                fontWeight: "400",
              },
              input: {
                "&:focus-within": {
                  outline: "0.01rem solid green",
                },
              },
            })}
          />

          <PasswordInput
            className="mt-2"
            label="Нууц үг"
            placeholder="*********"
            radius={"xl"}
            icon={passIcon}
            {...form.getInputProps("password")}
            styles={() => ({
              label: {
                marginBottom: rem(4),
                fontSize: rem(15),
                fontWeight: "400",
              },
              input: {
                "&:focus-within": {
                  outline: "0.01rem solid green",
                },
              },
            })}
          />

          <PasswordInput
            className="mt-2"
            label="Нууц үг давтах"
            placeholder="*********"
            radius={"xl"}
            icon={shieldIcon}
            {...form.getInputProps("confirmPass")}
            styles={() => ({
              label: {
                marginBottom: rem(4),
                fontSize: rem(15),
                fontWeight: "400",
              },
              input: {
                "&:focus-within": {
                  outline: "0.01rem solid green",
                },
              },
            })}
          />

          {show && (
            <div
              className="mt-2 w-full rounded-lg px-4 py-2"
              style={{
                backgroundColor:
                  checkNumber && checkSame ? "#D1FADF" : "#FEE4E2",
              }}
            >
              {renderCheck(
                checkNumber,
                "Нууц үг 4 оронтой тооноос бүрдсэн байна",
              )}
              {renderCheck(checkSame, "Нууц үг ижилхэн байна")}
            </div>
          )}
          <Button
            variant="outline"
            radius="xl"
            className="mt-8"
            w={"100%"}
            type="submit"
          >
            Бүртгүүлэх
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
