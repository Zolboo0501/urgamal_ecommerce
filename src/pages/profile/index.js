import { fetchMethod } from "@/utils/fetch";
import { UserConfigContext } from "@/utils/userConfigContext";
import { Button, Loader, rem } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import {
  IconBoxSeam,
  IconCircleXFilled,
  IconClipboard,
  IconClipboardText,
  IconGift,
  IconHeart,
  IconTruck,
  IconUserEdit,
} from "@tabler/icons-react";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import GlobalLayout from "../../components/GlobalLayout/GlobalLayout";
import ProfileTabs from "../../components/ProfileTab";
import Address from "./tabs/Address";
import Feedback from "./tabs/Feedback";
import Invoice from "./tabs/Invoice";
import Loyalty from "./tabs/Loyalty";
import MyOrder from "./tabs/MyOrder";
import ProfileInfo from "./tabs/ProfileInfo";
import Wishlist from "./tabs/Wishlist";

const Profile = () => {
  const router = useRouter();
  const [tabs, setTabs] = useState(1);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState();
  const userContext = useContext(UserConfigContext);
  const token = getCookie("token");
  const getUserInfo = async () => {
    setLoading(true);
    const data = await fetchMethod("GET", "user/profile", token);
    if (data.success) {
      setUserInfo(data.data);
      setLoading(false);
    } else {
      showNotification({
        message: data.message,
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
    setLoading(false);
  };

  const onClickTabs = (e) => {
    setTabs(e);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    if (router.query.hasOwnProperty("wishlist")) {
      setTabs(3);
    }
    if (router.query.hasOwnProperty("cr")) {
      if (router.query?.cr === "order") {
        setTabs(4);
      }
      if (router.query?.cr === "invoice") {
        setTabs(7);
      }
    }
  }, [router]);

  const UserProfileImage = () => {
    const imageSrc = userInfo?.picture || (token ? "/farmer.png" : "/user.png");

    return (
      <Image
        src={imageSrc}
        width={150}
        height={150}
        style={{
          objectFit: "cover",
          border: "3px solid #EBEFEE",
        }}
        className="h-28 w-28 rounded-full bg-white"
      />
    );
  };

  const logOut = () => {
    userContext.logout();
  };

  return (
    <GlobalLayout>
      <div className="w-full bg-grey-back lg:px-6 lg:py-8">
        <div className="relative mx-4 mt-2 h-56 rounded-md bg-white lg:mx-0 lg:mt-0">
          <div className="absolute left-4 top-14 flex h-32 flex-1 lg:left-14 lg:top-12 lg:h-36 lg:w-36">
            <UserProfileImage />
          </div>
          <div className="w-full" style={{ height: "50%" }}>
            <Image
              src={"/profile-back.jpg"}
              height={1000}
              width={1000}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div
            className="flex flex-1 flex-col items-start bg-white pl-36 pt-4 sm:flex-row sm:justify-between sm:pt-8 lg:pl-44"
            style={{ height: "50%" }}
          >
            <p className="text-base font-semibold lg:text-xl">
              {userInfo?.family_name} {userInfo?.given_name}
            </p>

            <div className="mt-1">
              <Button
                leftSection={
                  <Image
                    src={"/icons/logout-icon.svg"}
                    width={20}
                    height={20}
                  />
                }
                variant="outline"
                color="red"
                className="mr-16"
                onClick={() => logOut()}
              >
                <p className="text-xs">Системээс гарах</p>
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-col lg:flex-row">
          <div className="mx-4 rounded-md bg-white py-6 lg:mx-0 lg:w-4/12">
            {tabs === 1 ? (
              <ProfileTabs
                icon={
                  <IconUserEdit
                    style={{
                      width: rem(30),
                      height: rem(30),
                      color: "#fff",
                    }}
                    stroke={1.5}
                  />
                }
                text={"Хувийн мэдээлэл"}
                onClickTabs={() => onClickTabs(1)}
                id={1}
                first={true}
              />
            ) : (
              <ProfileTabs
                icon={
                  <IconUserEdit
                    style={{
                      width: rem(30),
                      height: rem(30),
                      color: "#F9BC60",
                    }}
                    stroke={1.5}
                  />
                }
                text={"Хувийн мэдээлэл"}
                onClickTabs={() => onClickTabs(1)}
                id={1}
              />
            )}
            {tabs === 2 ? (
              <ProfileTabs
                icon={
                  <IconTruck
                    style={{
                      width: rem(30),
                      height: rem(30),
                      color: "#fff",
                    }}
                    stroke={1.5}
                  />
                }
                text={"Хаяг"}
                onClickTabs={() => onClickTabs(2)}
                id={2}
                first={true}
              />
            ) : (
              <ProfileTabs
                icon={
                  <IconTruck
                    style={{
                      width: rem(30),
                      height: rem(30),
                      color: "#F9BC60",
                    }}
                    stroke={1.5}
                  />
                }
                text={"Хаяг"}
                onClickTabs={() => onClickTabs(2)}
                id={2}
              />
            )}
            {tabs === 3 ? (
              <ProfileTabs
                icon={
                  <IconHeart
                    style={{
                      width: rem(30),
                      height: rem(30),
                      color: "#fff",
                    }}
                    stroke={1.5}
                  />
                }
                text={"Хадгалсан"}
                onClickTabs={() => onClickTabs(3)}
                id={3}
                first={true}
              />
            ) : (
              <ProfileTabs
                icon={
                  <IconHeart
                    style={{
                      width: rem(30),
                      height: rem(30),
                      color: "#F9BC60",
                    }}
                    stroke={1.5}
                  />
                }
                text={"Хадгалсан"}
                onClickTabs={() => onClickTabs(3)}
                id={3}
              />
            )}
            {tabs === 4 ? (
              <ProfileTabs
                icon={
                  <IconBoxSeam
                    style={{
                      width: rem(30),
                      height: rem(30),
                      color: "#fff",
                    }}
                    stroke={1.5}
                  />
                }
                text={"Захиалга"}
                onClickTabs={() => onClickTabs(4)}
                id={4}
                first={true}
              />
            ) : (
              <ProfileTabs
                icon={
                  <IconBoxSeam
                    style={{
                      width: rem(30),
                      height: rem(30),
                      color: "#F9BC60",
                    }}
                    stroke={1.5}
                  />
                }
                text={"Захиалга"}
                onClickTabs={() => onClickTabs(4)}
                id={4}
              />
            )}
            {tabs === 5 ? (
              <ProfileTabs
                icon={
                  <IconClipboardText
                    style={{
                      width: rem(30),
                      height: rem(30),
                      color: "#fff",
                    }}
                    stroke={1.5}
                  />
                }
                text={"Санал хүсэлт илгээх"}
                onClickTabs={() => onClickTabs(5)}
                id={5}
                first={true}
              />
            ) : (
              <ProfileTabs
                icon={
                  <IconClipboardText
                    style={{
                      width: rem(30),
                      height: rem(30),
                      color: "#F9BC60",
                    }}
                    stroke={1.5}
                  />
                }
                text={"Санал хүсэлт илгээх"}
                onClickTabs={() => onClickTabs(5)}
                id={5}
              />
            )}
            {tabs === 6 ? (
              <ProfileTabs
                icon={
                  <IconGift
                    style={{
                      width: rem(30),
                      height: rem(30),
                      color: "#fff",
                    }}
                    stroke={1.5}
                  />
                }
                text={"Loyalty"}
                onClickTabs={() => onClickTabs(6)}
                id={6}
                first={true}
              />
            ) : (
              <ProfileTabs
                icon={
                  <IconGift
                    style={{
                      width: rem(30),
                      height: rem(30),
                      color: "#F9BC60",
                    }}
                    stroke={1.5}
                  />
                }
                text={"Loyalty"}
                onClickTabs={() => onClickTabs(6)}
                id={6}
              />
            )}
            {tabs === 7 ? (
              <ProfileTabs
                icon={
                  <IconClipboard
                    style={{
                      width: rem(30),
                      height: rem(30),
                      color: "#fff",
                    }}
                    stroke={1.5}
                  />
                }
                text={"Нэхэмжлэл"}
                onClickTabs={() => onClickTabs(7)}
                id={7}
                first={true}
              />
            ) : (
              <ProfileTabs
                icon={
                  <IconClipboard
                    style={{
                      width: rem(30),
                      height: rem(30),
                      color: "#F9BC60",
                    }}
                    stroke={1.5}
                  />
                }
                text={"Нэхэмжлэл"}
                onClickTabs={() => onClickTabs(7)}
                id={7}
              />
            )}
          </div>
          <div className="w-full py-6 lg:py-0 lg:pl-4">
            {loading ? (
              <div className="flex h-full w-full items-center justify-center bg-white">
                <Loader color="yellow" />
              </div>
            ) : (
              tabs === 1 && (
                <ProfileInfo
                  data={userInfo}
                  refresh={getUserInfo}
                  setUserInfo={setUserInfo}
                />
              )
            )}
            {tabs === 2 && <Address />}
            {tabs === 3 && <Wishlist />}
            {tabs === 4 && <MyOrder />}
            {tabs === 5 && <Feedback />}
            {tabs === 6 && <Loyalty userInfo={userInfo} />}
            {tabs === 7 && <Invoice />}
          </div>
        </div>
      </div>
    </GlobalLayout>
  );
};

export default Profile;
