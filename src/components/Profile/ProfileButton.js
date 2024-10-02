import { rem } from "@mantine/core";
import {
  IconDeviceMobile,
  IconLock,
  IconMail,
  IconUserEdit,
} from "@tabler/icons-react";

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
    <div className="mt-4 flex w-full flex-col flex-wrap gap-6 sm:flex-row">
      {changeDate.map((item, index) => {
        return (
          <div
            style={{
              backgroundColor: item.tabs === tabs ? "#F9BC60" : "#fff",
            }}
            onClick={() => item.onClick()}
            key={index}
            id="profile-button"
            className="delay-50 flex flex-row rounded-md bg-white px-3 py-4 drop-shadow-lg transition duration-100 ease-in-out hover:-translate-y-1 hover:font-semibold"
          >
            <div className="flex w-full flex-row">
              {item.icon}
              <div className="ml-4 flex flex-col">
                <p
                  class={`text-base ${
                    tabs === item.tabs ? "font-semibold text-white" : ""
                  }`}
                >
                  {item.title}
                </p>
                <p
                  class={`text-xs ${
                    tabs === item.tabs
                      ? "font-medium text-white"
                      : "text-gray-500"
                  }`}
                >
                  {item.text}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProfileButton;
