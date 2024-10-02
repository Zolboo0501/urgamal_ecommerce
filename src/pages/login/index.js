/* eslint-disable react-hooks/exhaustive-deps */
import { fetchMethod } from "@/utils/fetch";
import { rememberMe, rememberMeRemove } from "@/utils/Store";
import { UserConfigContext } from "@/utils/userConfigContext";
import {
  Button,
  Checkbox,
  Loader,
  PasswordInput,
  rem,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { IconAt, IconCheck, IconLock } from "@tabler/icons-react";
import { setCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Buttons from "../../components/Buttons";

const Login = () => {
  const router = useRouter();
  const { login } = useContext(UserConfigContext);
  const [remember, setRemember] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
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
        showNotification({
          message: "Амжилттай нэвтэрлээ.",
          icon: <IconCheck />,
          color: "green",
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
        showNotification({
          message: "Амжилттай нэвтэрлээ.",
          icon: <IconCheck />,
          color: "green",
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
      showNotification({
        message: "Амжилттай нэвтэрлээ.",
        color: "green",
      });
      const token = data.token;
      const bigDate = 30 * 24 * 60 * 60 * 1000;
      login(token);
      setCookie("email", form.values.email, { maxAge: bigDate });
      setLoginLoading(false);
      router.push("/home");
    } else {
      setLoginLoading(false);
      showNotification({
        message: data.message,
        color: "red",
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
        <Image src="/logo.png" width={100} height={100} alt="logo" />
        <p className="mt-4 text-xl font-bold">Нэвтрэх</p>
        <div className="mt-5 px-8 xl:px-12">
          <form onSubmit={form.onSubmit((values) => loginFetchData(values))}>
            <TextInput
              label="Цахим шуудан"
              placeholder="Цахим шуудан"
              radius={"xl"}
              icon={icon}
              {...form.getInputProps("email")}
              styles={(theme) => ({
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
              styles={(theme) => ({
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
                <p class="text-xs text-gray-500">Нууц үгээ мартсан уу?</p>
              </Button>
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
