/* eslint-disable react-hooks/exhaustive-deps */
import Image from "next/image";
import { TextInput, Button, rem, PasswordInput, Text } from "@mantine/core";
import React, { useState, useEffect, useContext } from "react";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
import { IconAt, IconLock, IconShieldLock } from "@tabler/icons-react";

import { fetchMethod } from "@/utils/fetch";
import { showNotification } from "@mantine/notifications";
import { UserConfigContext } from "@/utils/userConfigContext";
import { regexNumber } from "@/utils/constant";
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
  const { login } = useContext(UserConfigContext);
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
        setCookie("email", email, { maxAge: bigDate });
        router.push("/home");
        showNotification({
          message: "Амжилттай бүртгүүллээ.",
          color: "green",
        });
      } else {
        showNotification({
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
      <Text size={"sm"} fw={500} color={state ? "#32D583" : "#F97066"}>
        {text}
      </Text>
    );
  };

  return (
    <div className="w-full h-full flex flex-row absolute">
      <div className="w-4/6 md:w-7/12 lg:w-8/12 xl:w-9/12  h-full relative hidden md:block">
        <Image fill src={"/plant.jpg"} alt="plant" objectFit="cover" />
      </div>
      <div className="flex flex-col relative items-center justify-center flex-1">
        <Image src="/logo.png" width={100} height={100} alt="logo" />
        <p className="text-xl font-bold mt-4">Бүртгүүлэх</p>
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
            styles={(theme) => ({
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
            styles={(theme) => ({
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
            styles={(theme) => ({
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
              className="w-full py-2 px-4 rounded-lg mt-2"
              style={{
                backgroundColor:
                  checkNumber && checkSame ? "#D1FADF" : "#FEE4E2",
              }}
            >
              {renderCheck(
                checkNumber,
                "Нууц үг 4 оронтой тооноос бүрдсэн байна"
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
