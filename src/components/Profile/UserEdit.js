import {
  TextInput,
  PasswordInput,
  Select,
  Button,
  rem,
  Loader,
} from "@mantine/core";
import React, { useState } from "react";
import { DateInput } from "@mantine/dates";
import {
  IconUser,
  IconUserCircle,
  IconMail,
  IconPhone,
  IconCalendarClock,
  IconShieldLock,
  IconGenderMale,
  IconCircleXFilled,
  IconCheck,
} from "@tabler/icons-react";
import { fetchMethod } from "@/utils/fetch";
import { getCookie } from "cookies-next";
import { showNotification } from "@mantine/notifications";
const UserEdit = (props) => {
  const { data, refresh, setUserInfo } = props;
  const [loading, setLoading] = useState(false);

  const editProfile = async () => {
    const token = getCookie("token");
    const requestOption = {
      ...data,
    };
    setLoading(true);
    const res = await fetchMethod("PUT", "user/profile", token, requestOption);
    if (res?.success) {
      setLoading(false);
      refresh();
      showNotification({
        message: res.message,
        icon: <IconCheck />,
        color: "green",
      });
    } else {
      showNotification({
        message: res?.message,
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
  };

  return (
    <>
      <div className="mt-4">
        <div className="w-full flex flex-col sm:flex-row lg:gap-8 sm:gap-4 lg:mt-4">
          <div className="w-full">
            <TextInput
              size="sm"
              label="Овог"
              icon={
                <IconUser
                  style={{
                    width: rem(20),
                    height: rem(20),
                    color: "#F9BC60",
                  }}
                  stroke={2}
                />
              }
              placeholder="Овог"
              value={data?.family_name}
              onChange={(event) =>
                setUserInfo({
                  ...data,
                  family_name: event.currentTarget.value,
                })
              }
              styles={(theme) => ({
                label: {
                  marginBottom: rem(4),
                  fontSize: rem(15),
                  fontWeight: "400",
                },
              })}
            />
          </div>
          <div className="w-full">
            <TextInput
              size="sm"
              label="Нэр"
              placeholder="Нэр"
              value={data?.given_name}
              onChange={(event) =>
                setUserInfo({
                  ...data,
                  given_name: event.currentTarget.value,
                })
              }
              icon={
                <IconUserCircle
                  style={{
                    width: rem(20),
                    height: rem(20),
                    color: "#F9BC60",
                  }}
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
          </div>
        </div>
        <div className="w-full flex flex-col sm:flex-row lg:gap-8 sm:gap-4 lg:mt-4">
          <div className="w-full">
            <TextInput
              size="sm"
              label="Цахим шуудан"
              value={data?.email}
              onChange={(event) =>
                setUserInfo({
                  ...data,
                  email: event.currentTarget.value,
                })
              }
              icon={
                <IconMail
                  style={{
                    width: rem(20),
                    height: rem(20),
                    color: "#F9BC60",
                  }}
                  stroke={2}
                />
              }
              placeholder="Цахим шуудан"
              styles={(theme) => ({
                label: {
                  marginBottom: rem(4),
                  fontSize: rem(15),
                  fontWeight: "400",
                },
              })}
            />
          </div>
          <div className="w-full">
            <TextInput
              size="sm"
              label="Утасны дугаар"
              placeholder="Утасны дугаар"
              value={data?.mobile}
              onChange={(event) =>
                setUserInfo({
                  ...data,
                  mobile: event.currentTarget.value,
                })
              }
              icon={
                <IconPhone
                  style={{
                    width: rem(20),
                    height: rem(20),
                    color: "#F9BC60",
                  }}
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
          </div>
        </div>
        <div className="w-full flex flex-col sm:flex-row lg:gap-8 sm:gap-4 lg:mt-4">
          <div className="w-full">
            <PasswordInput
              size="sm"
              label="Нууц үг"
              placeholder="*********"
              disabled
              icon={
                <IconShieldLock
                  style={{
                    width: rem(20),
                    height: rem(20),
                    color: "#F9BC60",
                  }}
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
          </div>
          <div className="w-full">
            <DateInput
              dateParser={(input) => {
                if (input === "WW2") {
                  return new Date(1939, 8, 1);
                }
                return new Date(input);
              }}
              icon={
                <IconCalendarClock
                  style={{
                    width: rem(20),
                    height: rem(20),
                    color: "#F9BC60",
                  }}
                  stroke={2}
                />
              }
              value={data?.birthdate ? new Date(data?.birthdate) : new Date()}
              onChange={(date) => setUserInfo({ ...data, birthdate: date })}
              valueFormat="YYYY/MM/DD"
              label="Төрсөн огноо"
              placeholder="Төрсөн огноо"
              mx="auto"
              styles={(theme) => ({
                label: {
                  marginBottom: rem(4),
                  fontSize: rem(15),
                  fontWeight: "400",
                },
              })}
            />
          </div>
        </div>
        <div className="w-full flex flex-col sm:flex-row lg:gap-8 sm:gap-4 lg:mt-4">
          <div className="w-full">
            <Select
              placeholder="Хүйс"
              label="Хүйс"
              data={["Эрэгтэй", "Эмэгтэй"]}
              value={data?.gender}
              onChange={(value) => setUserInfo({ ...data, gender: value })}
              icon={
                <IconGenderMale
                  style={{
                    width: rem(20),
                    height: rem(20),
                    color: "#F9BC60",
                  }}
                  stroke={2}
                />
              }
              styles={(theme) => ({
                label: {
                  marginBottom: rem(4),
                  fontSize: rem(15),
                  fontWeight: "400",
                },
                item: {
                  // applies styles to selected item
                  "&[data-selected]": {
                    "&, &:hover": {
                      backgroundColor: "#F9BC60",
                      color: "white",
                    },
                  },
                },
              })}
            />
          </div>
          <div className="w-full"></div>
        </div>
        <div className="w-full flex flex-row justify-end gap-8 mt-4">
          <Button
            onClick={() => editProfile()}
            variant="filled"
            color="orange"
            styles={(theme) => ({
              root: {
                backgroundColor: "#F9BC60",
              },
            })}
            type="submit"
          >
            Хадгалах
          </Button>
        </div>
      </div>
    </>
  );
};

export default UserEdit;
