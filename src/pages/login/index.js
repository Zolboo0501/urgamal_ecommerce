/* eslint-disable no-undef */
import { fetchMethod } from "@/utils/fetch";
import { rememberMe, rememberMeRemove } from "@/utils/Store";
import { errorNotification, successNotification } from "@/utils/utils";
import {
  Button,
  Checkbox,
  Loader,
  PasswordInput,
  rem,
  TextInput,
} from "@mantine/core";

import { useForm } from "@mantine/form";
import { IconAt, IconLock } from "@tabler/icons-react";
import { setCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Buttons from "../../components/Buttons";
import useUser from "@/hooks/useUser";
import { openContextModal } from "@mantine/modals";

const Login = () => {
  const router = useRouter();
  const { login } = useUser();
  const [remember, setRemember] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [tos, setTos] = useState();
  const userContext = useUser();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },
    validate: {
      email: (value) =>
        value.length > 0
          ? /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(value)
            ? null
            : "Цахим шуудан буруу байна."
          : "Цахим шуудан хоосон байна",
      password: (value) =>
        value.length > 0
          ? value.length < 4 && "Нууц үг хамгийн багадаа 4 үсэгтэй байна"
          : "Нууц үг хоосон байна",
    },
  });

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

  const handleRegister = () => {
    router.push("register");
  };

  const handleOTP = () => {
    router.push("login/otp");
  };

  const getQueryParams = async () => {
    try {
      const requestOption = {
        "Content-Type": "application/json",
      };
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/google/callback?code=${router.query.code}&scope=${router.query.scope}&authuser=${router.query.authuser}&prompt=${router.query.prompt}`,
        requestOption,
      );
      const data = await res.json();

      if (data.success) {
        const bigDate = 30 * 24 * 60 * 60 * 1000;
        successNotification({
          message: "Амжилттай нэвтэрлээ.",
        });
        setCookie("token", data.token, {
          maxAge: bigDate,
        });
        router.push("/home");
      } else {
        console.log("error in else");
      }
    } catch (err) {
      console.log(err, "err");
    }
  };

  const getFacebook = async () => {
    try {
      const requestOption = {
        "Content-Type": "application/json",
      };
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/facebook/callback?code=${router.query.code}`,
        requestOption,
      );
      const data = await res.json();
      if (data.success) {
        const bigDate = 30 * 24 * 60 * 60 * 1000;
        successNotification({
          message: "Амжилттай нэвтэрлээ.",
        });
        setCookie("token", data.token, {
          maxAge: bigDate,
        });
        router.push("/home");
      } else {
        console.log("error in else");
      }
    } catch (err) {
      console.log(err, "err");
    }
  };

  const getTos = async () => {
    const res = await fetchMethod("GET", "/config/tos");
    if (res.success) {
      setTos(res.data);
    } else {
      console.log(res.error);
    }
  };

  useEffect(() => {
    if (
      router.query.code &&
      router.query.scope &&
      router.query.authuser &&
      router.query.prompt
    ) {
      getQueryParams();
    }
    if (router.query.code) {
      getFacebook();
    }
    getTos();
  }, [router.query]);

  const getStorageUser = () => {
    const user = localStorage.getItem("user");
    if (user) {
      const userInfo = JSON.parse(user);
      form.setValues({
        email: userInfo.email,
        password: userInfo.password,
      });
      setRemember(userInfo.remember);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      getStorageUser();
    }
  }, []);

  const loginFetchData = async (values) => {
    const requestOption = {
      email: values.email,
      password: values.password,
    };
    setLoginLoading(true);
    const data = await fetchMethod("POST", `auth/login`, "", requestOption);
    if (data?.success) {
      if (remember) {
        rememberMe({ ...requestOption, remember: true });
      } else {
        rememberMeRemove();
      }
      successNotification({
        message: "Амжилттай нэвтэрлээ.",
      });
      const token = data.token;
      const bigDate = 30 * 24 * 60 * 60 * 1000;
      login(token);
      setCookie("email", form.values.email, { maxAge: bigDate });
      setLoginLoading(false);
      router.push("/home");
    } else {
      setLoginLoading(false);
      errorNotification({
        message: data.message,
      });
    }
  };

  const handleFacebook = async () => {
    location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/facebook`;
  };

  const handleGoogle = async () => {
    location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  return (
    <div className="absolute flex h-full w-full flex-row">
      <div className="relative hidden h-full w-4/6 md:block lg:w-8/12 xl:w-9/12">
        <Image fill src={"/plant.jpg"} alt="plant" objectFit="cover" />
      </div>
      <div className="relative flex flex-1 flex-col items-center justify-center">
        {userContext?.address?.logo ? (
          <Image
            src={userContext?.address?.logo}
            width={100}
            height={100}
            alt={userContext?.address?.logo}
          />
        ) : (
          <Image src={"/logo.png"} width={100} height={100} alt={"logo"} />
        )}
        <p className="mt-4 text-xl font-bold">Нэвтрэх</p>
        <div className="mt-5 px-8 xl:px-12">
          <form onSubmit={form.onSubmit((values) => loginFetchData(values))}>
            <TextInput
              label="Цахим шуудан"
              placeholder="Цахим шуудан"
              radius={"xl"}
              icon={icon}
              {...form.getInputProps("email")}
              styles={() => ({
                label: {
                  marginBottom: rem(10),
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
              className="mt-4"
              label="Нууц үг"
              placeholder="*********"
              radius={"xl"}
              icon={passIcon}
              {...form.getInputProps("password")}
              styles={() => ({
                label: {
                  marginBottom: rem(10),
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
            <div className="flex items-center justify-between">
              <Checkbox
                label="Сануулах"
                size={"xs"}
                variant="outline"
                checked={remember}
                onChange={(event) => setRemember(event.currentTarget.checked)}
              />
              <Button
                variant="transparent"
                styles={() => ({ root: { padding: 0 } })}
                color="gray"
                onClick={() => router.push("/login/forget")}
              >
                <p className="text-xs text-gray-500">Нууц үгээ мартсан уу?</p>
              </Button>
            </div>
            <div className="mt-4 text-justify text-md leading-relaxed">
              <p className="">
                Үргэлжлүүлэх товчийг дарж, Facebook эрхээрээ нэвтрэх болон
                бүртгэл үүсгэснээр Та манай{" "}
                <button
                  className="m-0 p-0 font-semibold text-blue-600 hover:underline"
                  onClick={() => {
                    openContextModal({
                      modal: "tosModal",
                      centered: true,
                      size: "xl",
                      innerProps: {
                        data: tos?.content,
                      },
                    });
                  }}
                >
                  Үйлчилгээний нөхцөл
                </button>{" "}
                болон{" "}
                <button className="font-semibold text-blue-600 hover:underline">
                  Нууцлалын бодлогыг
                </button>{" "}
                хүлээн зөвшөөрч буй болно.
              </p>
            </div>

            <Button
              variant="outline"
              color="green"
              radius="xl"
              className="mt-4"
              w={"100%"}
              type="submit"
              disabled={loginLoading && true}
            >
              <div className="flex flex-row items-center">
                Нэвтрэх
                {loginLoading && (
                  <Loader color="lime" size={"xs"} className="ml-2" />
                )}
              </div>
            </Button>
          </form>
          <Buttons
            handleOTP={handleOTP}
            handleRegister={handleRegister}
            handleFacebook={handleFacebook}
            handleGoogle={handleGoogle}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
