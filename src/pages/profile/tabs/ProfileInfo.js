import { Text, Title } from "@mantine/core";

import { Mail, Mobile, Password, ProfileButton, UserEdit } from "../component";
import { useState } from "react";

const ProfileInfo = (props) => {
  const { givenName, familyName, mobile, email } = props;

  const [tabs, setTabs] = useState("info");

  const handleTabs = (type) => {
    if (type === "info") {
      setTabs("info");
    }
    if (type === "change") {
      setTabs("change");
    }
    if (type === "mobile") {
      setTabs("mobile");
    }
    if (type === "email") {
      setTabs("email");
    }
  };
  return (
    <div className="flex flex-col w-full bg-white px-8 py-6 rounded-md">
      {tabs === "info" && (
        <>
          <Title order={3}>Хувийн мэдээлэл</Title>
          <Text size="sm" c="dimmed">
            Та хувийн мэдээллээ доорх талбаруудаар засварлаарай
          </Text>
        </>
      )}
      {tabs === "change" && (
        <>
          <Title order={3}>Гар ут</Title>
          <Text size="sm" c="dimmed">
            Та нууц үгээ доорх талбаруудаар засварлаарай
          </Text>
        </>
      )}
      {tabs === "mobile" && (
        <>
          <Title order={3}>Гар утас баталгаажуулах</Title>
          <Text size="sm" c="dimmed">
            Та гар утсаа доорх талбаруудаар баталгаажуулаарай
          </Text>
        </>
      )}
      <ProfileButton handleTabs={handleTabs} tabs={tabs} />
      {tabs === "info" && <UserEdit {...props} />}
      {tabs === "change" && <Password />}
      {tabs === "mobile" && <Mobile />}
      {tabs === "email" && <Mail />}
    </div>
  );
};

export default ProfileInfo;
