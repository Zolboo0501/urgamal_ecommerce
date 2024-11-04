import { fetchMethod } from "@/utils/fetch";
import { errorNotification, successNotification } from "@/utils/utils";
import { Button, PasswordInput, rem, Select, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import {
  IconCalendarClock,
  IconCircleXFilled,
  IconGenderMale,
  IconMail,
  IconPhone,
  IconShieldLock,
  IconUser,
  IconUserCircle,
} from "@tabler/icons-react";
import { getCookie } from "cookies-next";
import { useState } from "react";
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
      successNotification({
        message: res.message,
      });
    } else {
      errorNotification({
        message: res?.message,

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
        <div className="flex w-full flex-col sm:flex-row sm:gap-4 lg:mt-4 lg:gap-8">
          <div className="w-full">
            <TextInput
              size="sm"
              label="Овог"
              leftSection={
                <IconUser
                  style={{
                    width: rem(20),
                    height: rem(20),
                    color: "#48BE5B",
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
              leftSection={
                <IconUserCircle
                  style={{
                    width: rem(20),
                    height: rem(20),
                    color: "#48BE5B",
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
        <div className="flex w-full flex-col sm:flex-row sm:gap-4 lg:mt-4 lg:gap-8">
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
              leftSection={
                <IconMail
                  style={{
                    width: rem(20),
                    height: rem(20),
                    color: "#48BE5B",
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
              leftSection={
                <IconPhone
                  style={{
                    width: rem(20),
                    height: rem(20),
                    color: "#48BE5B",
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
        <div className="flex w-full flex-col sm:flex-row sm:gap-4 lg:mt-4 lg:gap-8">
          <div className="w-full">
            <PasswordInput
              size="sm"
              label="Нууц үг"
              placeholder="*********"
              disabled
              leftSection={
                <IconShieldLock
                  style={{
                    width: rem(20),
                    height: rem(20),
                    color: "#48BE5B",
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
              leftSection={
                <IconCalendarClock
                  style={{
                    width: rem(20),
                    height: rem(20),
                    color: "#48BE5B",
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
        <div className="flex w-full flex-col sm:flex-row sm:gap-4 lg:mt-4 lg:gap-8">
          <div className="w-full">
            <Select
              placeholder="Хүйс"
              label="Хүйс"
              data={["Эрэгтэй", "Эмэгтэй"]}
              value={data?.gender}
              onChange={(value) => setUserInfo({ ...data, gender: value })}
              leftSection={
                <IconGenderMale
                  style={{
                    width: rem(20),
                    height: rem(20),
                    color: "#48BE5B",
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
                      backgroundColor: "#48BE5B",
                      color: "white",
                    },
                  },
                },
              })}
            />
          </div>
          <div className="w-full"></div>
        </div>
        <div className="mt-4 flex w-full flex-row justify-end gap-8">
          <Button
            onClick={() => editProfile()}
            variant="filled"
            color="orange"
            styles={(theme) => ({
              root: {
                backgroundColor: "#48BE5B",
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
