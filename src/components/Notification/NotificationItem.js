import { Avatar } from "@mantine/core";
import { IconBellFilled } from "@tabler/icons-react";
import Image from "next/image";
import React from "react";

const NotificationItem = ({ data, index }) => {
  return (
    <div className="flex flex-row gap-2">
      {data?.image ? (
        <Image
          src={data?.image}
          alt="notification-image"
          width={24}
          height={24}
          className="h-12 w-12 object-fill"
        />
      ) : (
        <Avatar color="teal" radius={"xl"} size={"md"}>
          <IconBellFilled size={24} />
        </Avatar>
      )}
      <div className="flex flex-col">
        <p className="text-sm font-semibold">{data.title}</p>
        <p className="text-xs font-normal">{data.content}</p>
      </div>
    </div>
  );
};

export default NotificationItem;
