import Mail from "@/components/Profile/Mail";
import Mobile from "@/components/Profile/Mobile";
import Password from "@/components/Profile/Password";
import ProfileButton from "@/components/Profile/ProfileButton";
import UserEdit from "@/components/Profile/UserEdit";
import { Title } from "@mantine/core";
import { useState } from "react";

const ProfileInfo = (props) => {
  const { data, setUserInfo, refresh } = props;
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
    <div className="flex w-full flex-col rounded-md bg-white px-4 py-6 lg:px-8">
      {tabs === "info" && (
        <>
          <Title order={3}>Хувийн мэдээлэл</Title>
          <p class="text-sm text-gray-500">
            Та хувийн мэдээллээ доорх талбаруудаар засварлаарай
          </p>
        </>
      )}
      {tabs === "change" && (
        <>
          <Title order={3}>Гар утас</Title>
          <p class="text-sm text-gray-500">
            Та нууц үгээ доорх талбаруудаар засварлаарай
          </p>
        </>
      )}
      {tabs === "mobile" && (
        <>
          <Title order={3}>Гар утас баталгаажуулах</Title>
          <p class="text-sm text-gray-500">
            Та гар утсаа доорх талбаруудаар баталгаажуулаарай
          </p>
        </>
      )}
      <ProfileButton handleTabs={handleTabs} tabs={tabs} />
      {tabs === "info" && (
        <UserEdit data={data} setUserInfo={setUserInfo} refresh={refresh} />
      )}
      {tabs === "change" && <Password setTabs={setTabs} />}
      {tabs === "mobile" && <Mobile />}
      {tabs === "email" && <Mail />}
    </div>
  );
};

export default ProfileInfo;
