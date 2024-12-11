/* eslint-disable react/prop-types */
import useSocket from "@/hooks/useSocket";
import { fetchMethod } from "@/utils/fetch";
import { errorNotification, tokenDecode } from "@/utils/utils";
import { Button, Popover, rem } from "@mantine/core";
import { IconCircleXFilled } from "@tabler/icons-react";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import NotificationItem from "./NotificationItem";

const Notification = () => {
  const socketContext = useSocket();
  const [list, setList] = useState([]);
  const [opened, setOpened] = useState(false);
  const router = useRouter();
  const getNotification = async () => {
    const token = getCookie("token");
    if (token) {
      const data = await fetchMethod("GET", `user/notification`, token);
      if (data?.success) {
        setList(data?.data);
      }
    }
  };

  useEffect(() => {
    getNotification();
  }, []);

  const handleNew = (data) => {
    console.log(data, "Data");
    // setList(data);
  };

  useEffect(() => {
    if (socketContext.status) {
      const token = getCookie("token");
      if (token) {
        const decode = tokenDecode(token);
        socketContext?.socket?.emit("myNotification", {
          userid: decode.userid,
          limit: 10,
          offset: 0,
        });
        socketContext?.socket.on("newNotification", function (data) {
          handleNew(data);
        });
      }
    }
    return () => socketContext?.socket?.off;
  }, []);

  return (
    <Popover
      position="bottom"
      withArrow
      shadow="md"
      opened={opened}
      onChange={setOpened}
    >
      <Popover.Target>
        <Button
          variant="transparent"
          size="md"
          onClick={() => {
            const token = getCookie("token");
            if (token) {
              setOpened((prev) => !prev);
            } else {
              errorNotification({
                message: "Нэвтрэх шаардлагатай",

                icon: (
                  <IconCircleXFilled
                    style={{
                      width: rem(30),
                      height: rem(30),
                    }}
                  />
                ),
              });
              router.push("/login");
            }
          }}
        >
          <NotificationButtonImage list={list} />
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        <div className="flex max-h-96 w-80 flex-col gap-2 overflow-auto">
          {list?.map((item, index) => (
            <NotificationItem key={index} data={item} index={index} />
          ))}
        </div>
      </Popover.Dropdown>
    </Popover>
  );
};

const NotificationButtonImage = ({ list }) => {
  return (
    <div>
      <Image
        alt="notification"
        src="/icons/notification.svg"
        width={25}
        height={23}
        className="h-6 max-xs:w-6"
      />
      <div className="absolute">
        {list?.length > 0 && (
          <div className="-mt-8 ml-4 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary600 text-xs">
            <p className="text-sm-5 text-white">{list?.length}</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default Notification;
