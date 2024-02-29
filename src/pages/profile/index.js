/* eslint-disable jsx-a11y/alt-text */
// /* eslint-disable react-hooks/exhaustive-deps */
// import Image from "next/image";
// import GlobalLayout from "../../components/GlobalLayout/GlobalLayout";
// import {
//   ActionIcon,
//   Button,
//   Divider,
//   Group,
//   NavLink,
//   Stack,
//   Tabs,
//   TextInput,
// } from "@mantine/core";
// import { useContext, useEffect, useState } from "react";
// import MyOrder from "./tabs/MyOrder";
// import { deleteCookie, getCookie } from "cookies-next";
// import { useRouter } from "next/router";
// import {
//   IconBox,
//   IconLogout,
//   IconMap2,
//   IconUserCheck,
//   IconUserEdit,
// } from "@tabler/icons-react";
// import UserBasicInfo from "@/components/UserProfileForms/UserBasicInfo";
// import UserAddress from "@/components/UserProfileForms/UserAddress";
// import { UserConfigContext } from "@/utils/userConfigContext";
// import { emptyCart } from "@/utils/Store";

// const Profile = () => {
//   const token = getCookie("token");
//   const { logout } = useContext(UserConfigContext);
//   const router = useRouter();
//   const [activeTab, setActiveTab] = useState(0);
//   const [userInfo, setUserInfo] = useState(null);
//   const [addressData, setAddressData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [sorryForUsingStateForThis, setSorry] = useState(false);
//   useEffect(() => {
//     window.dispatchEvent(new Event("storage"));
//     function updateSize() {
//       setSorry(window.innerWidth > 640);
//     }
//     window.addEventListener("resize", updateSize);
//     return () => window.removeEventListener("resize", updateSize);
//   }, []);

//   useEffect(() => {
//     const { cr } = router.query;
//     if (cr && cr === "order") {
//       setActiveTab(1);
//     }
//     getUserInfo();
//     getUserAddress();
//   }, []);

//   const getUserInfo = async () => {
//     setLoading(true);
//     if (!token) {
//       router.push("/login");
//     }
//     const requestOption = {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     };
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/user/profile`,
//       requestOption
//     );
//     if (res.status === 200) {
//       const data = await res.json();
//       if (data.success === true) {
//         setUserInfo(data.data);
//       }
//     }
//     setLoading(false);
//   };

// const getUserAddress = async () => {
//   setLoading(true);
//   var requestOptions = {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/address`, requestOptions)
//     .then((req) => req.json())
//     .then((res) => {
//       if (res.success === true) {
//         setLoading(false);
//         setAddressData(res.data);
//       }
//     });
//   setLoading(false);
// };

//   const handleLogOut = () => {
//     deleteCookie("token");
//     emptyCart();
//     logout();
//     router.replace("/login");
//   };

//   const data = [
//     {
//       icon: <IconUserCheck size="1.3rem" stroke={1.5} />,
//       label: "Хувийн мэдээлэл",
//     },
//     {
//       icon: <IconBox size="1.3rem" stroke={1.5} />,
//       label: "Захиалга",
//     },
//     {
//       icon: <IconLogout color="red" size="1.3rem" stroke={1.5} />,
//       label: <span className="text-red-400">Системээс гарах</span>,
//     },
//   ];
//   const items = data.map((item, index) => (
//     <>
//       {index === 2 ? <Divider color="gray.2" w="100%" /> : null}
//       <NavLink
//         key={item.label}
//         active={index === activeTab}
//         label={item.label}
//         description={item.description}
//         rightSection={item.rightSection}
//         icon={item.icon}
//         color="yellow"
//         variant="subtle"
//         onClick={() => (index === 2 ? handleLogOut() : setActiveTab(index))}
//         className="rounded-md"
//       />
//     </>
//   ));

//   return (
//     <GlobalLayout footer={false}>
//       <div className="bg-grey-back h-[100vh] flex flex-col sm:flex-row flex-grow items-stretch">
//         <div className="flex flex-row sm:flex-col items-center sm:items-start bg-white w-[94%] sm:w-[250px] mb-0 mt-4 sm:mb-4 sm:mt-4 ml-4 rounded-md px-3 py-2">
//           <div className="w-full flex flex-row sm:flex-col grow sm:grow-0 items-center gap-2">
//             {items}
//           </div>
//           {/* <div>
//             {sorryForUsingStateForThis ? (
//               items[2]
//             ) : (
//               <span className="text-red-400">
//                 <Button
//                   leftIcon={
//                     <IconLogout color="red" size="1.625rem" stroke={1.5} />
//                   }
//                   variant="subtle"
//                   size="xs"
//                 >
//                   Системээс гарах
//                 </Button>
//               </span>
//             )}
//           </div> */}
//         </div>
//         <div className="h-full flex flex-grow px-4 py-4 ">
//           {activeTab === 0 && (
//             <Tabs
//               defaultValue="info"
//               variant="outline"
//               classNames={{
//                 root: "bg-white  h-full w-full rounded-md px-4 py-2 overflow-y-auto",
//                 panel: "mt-7 pl-6 flex-grow pr-6",
//               }}
//             >
//               <Tabs.List>
//                 <Tabs.Tab
//                   value="info"
//                   icon={<IconUserEdit size="1rem" stroke={1.5} />}
//                 >
//                   Хувийн мэдээлэл
//                 </Tabs.Tab>
//                 <Tabs.Tab
//                   value="address"
//                   icon={<IconMap2 size="1rem" stroke={1.5} />}
//                 >
//                   Хүргэлтийн хаяг
//                 </Tabs.Tab>
//               </Tabs.List>
//               <Tabs.Panel value="info" className="mt-6">
//                 <UserBasicInfo
//                   key={userInfo?.toString()}
//                   data={userInfo}
//                   refresh={getUserInfo}
//                 />
//               </Tabs.Panel>
//               <Tabs.Panel value="address" className="mt-6">
//                 <UserAddress data={addressData} refresh={getUserAddress} />
//               </Tabs.Panel>
//             </Tabs>
//           )}
//           {activeTab === 1 && <MyOrder />}
//         </div>
//       </div>
//     </GlobalLayout>
//   );
// };

// export default Profile;

import Image from "next/image";
import GlobalLayout from "../../components/GlobalLayout/GlobalLayout";
import { Button, Loader, rem } from "@mantine/core";
import ProfileTabs from "../../components/ProfileTab";
import { useContext, useEffect, useState } from "react";
import ProfileInfo from "./tabs/ProfileInfo";
import Address from "./tabs/Address";
import MyOrder from "./tabs/MyOrder";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/router";
import {
  IconBoxSeam,
  IconCircleXFilled,
  IconClipboardText,
  IconHeart,
  IconTruck,
  IconUserEdit,
  IconGift,
  IconClipboard,
} from "@tabler/icons-react";
import { fetchMethod } from "@/utils/fetch";
import { showNotification } from "@mantine/notifications";
import Wishlist from "./tabs/Wishlist";
import Loyalty from "./tabs/Loyalty";
import Feedback from "./tabs/Feedback";
import { UserConfigContext } from "@/utils/userConfigContext";
import Invoice from "./tabs/Invoice";

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

  const logOut = () => {
    userContext.logout();
  };

  return (
    <GlobalLayout>
      <div className="bg-grey-back w-full lg:px-6 lg:py-8">
        <div className="h-56 bg-white rounded-md relative mx-4 mt-2 lg:mx-0 lg:mt-0">
          <div className="absolute lg:left-14 lg:w-36 lg:h-36 lg:top-12 h-32 top-14 left-4 flex flex-1">
            {userInfo?.picture ? (
              <Image
                src={userInfo.picture}
                width={150}
                height={150}
                style={{
                  objectFit: "cover",
                  border: "3px solid #EBEFEE",
                }}
                className="rounded-full w-28 h-28"
              />
            ) : token ? (
              <Image
                src={"/farmer.png"}
                width={150}
                height={150}
                style={{
                  objectFit: "cover",
                  border: "3px solid #EBEFEE",
                }}
                className="rounded-full w-28 h-28 bg-white"
              />
            ) : (
              <Image
                src={"/user.png"}
                width={150}
                height={150}
                style={{
                  objectFit: "cover",
                  border: "3px solid #EBEFEE",
                }}
                className="rounded-full w-28 h-28"
              />
            )}
            {/* <div
              className="absolute bottom-0 left-28 w-8 h-8 flex justify-center items-center bg-grey-back rounded-full"
              style={{ border: "3px solid white" }}
            >
              <Image width={20} height={20} src={"/icons/change-pic.svg"} />
            </div> */}
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
            className="bg-white flex flex-1 flex-col sm:flex-row sm:justify-between items-start pl-36 lg:pl-44 pt-4 sm:pt-8"
            style={{ height: "50%" }}
          >
            <p className="text-base lg:text-xl font-semibold">
              {userInfo?.family_name} {userInfo?.given_name}
            </p>

            <div className="mt-1">
              <Button
                leftIcon={
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
        <div className="mt-4 flex  flex-col lg:flex-row">
          <div className="bg-white rounded-md lg:w-4/12 py-6 mx-4 lg:mx-0">
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
          <div className="w-full lg:pl-4 py-6 lg:py-0">
            {loading ? (
              <div className="w-full h-full flex items-center justify-center bg-white">
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
