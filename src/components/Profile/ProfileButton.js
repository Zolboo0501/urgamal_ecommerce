import React from "react";

import {
  IconUserEdit,
  IconLock,
  IconDeviceMobile,
  IconMail,
} from "@tabler/icons-react";
import { rem, Text } from "@mantine/core";

const ProfileButton = ({ handleTabs, tabs }) => {
  const changeDate = [
    {
      tabs: "info",
      icon: (
        <IconUserEdit
          style={{
            width: rem(20),
            height: rem(20),
            color: tabs === "info" ? "#fff" : "#F9BC60",
          }}
          className="profile-icon"
          stroke={2}
        />
      ),
      text: "Мэдээлэл засах",
      title: "Нэр",
      onClick: () => handleTabs("info"),
    },
    {
      icon: (
        <IconLock
          style={{
            width: rem(20),
            height: rem(20),
            color: tabs === "change" ? "#fff" : "#F9BC60",
          }}
          stroke={2}
          className="profile-icon"
        />
      ),
      tabs: "change",
      title: "Нууц үг",
      text: "Солих",
      onClick: () => handleTabs("change"),
    },
    {
      icon: (
        <IconDeviceMobile
          style={{
            width: rem(20),
            height: rem(20),
            color: tabs === "mobile" ? "#fff" : "#F9BC60",
          }}
          stroke={2}
        />
      ),
      tabs: "mobile",
      title: "Гар утас",
      text: "Баталгаажаагүй",
      onClick: () => handleTabs("mobile"),
    },
    {
      icon: (
        <IconMail
          style={{
            width: rem(20),
            height: rem(20),
            color: tabs === "email" ? "#fff" : "#F9BC60",
          }}
          stroke={2}
        />
      ),
      tabs: "email",
      title: "Цахим шуудан",
      text: "Баталгаажаагүй",
      onClick: () => handleTabs("email"),
    },
  ];

  return (
    <div className="mt-4 flex flex-col sm:flex-row w-full gap-6 flex-wrap">
      {changeDate.map((item, index) => {
        return (
          <div
            style={{
              backgroundColor: item.tabs === tabs ? "#F9BC60" : "#fff",
            }}
            onClick={() => item.onClick()}
            key={index}
            id="profile-button"
            className="flex flex-row bg-white rounded-md drop-shadow-lg py-4 px-3 transition ease-in-out delay-50 hover:-translate-y-1  duration-100 hover:font-semibold"
          >
            <div className="w-full flex flex-row">
              {item.icon}
              <div className="ml-4 flex flex-col">
                <Text
                  size={"md"}
                  color={tabs === item.tabs ? "#fff" : undefined}
                  fw={tabs === item.tabs ? 600 : undefined}
                >
                  {item.title}
                </Text>
                <Text
                  size={"xs"}
                  color={tabs === item.tabs ? "#fff" : "#667085"}
                  fw={tabs === item.tabs ? 500 : undefined}
                >
                  {item.text}
                </Text>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProfileButton;
