/* eslint-disable react/prop-types */
import { ActionIcon, Group } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import React from "react";

export default function ShippingAddressCard({ name, address, onDelete }) {
  return (
    <div className="hover:scale-101 rounded-md px-5 py-3 shadow-md transition delay-100 ease-in-out hover:translate-x-2 hover:cursor-pointer hover:shadow-2xl">
      <div className="flex flex-1 flex-row justify-between">
        <p className="text-sm font-semibold lg:text-base">{name}</p>
        <Group spacing="xs">
          {/* <ActionIcon
            color="blue"
            radius="xl"
            onClick={() => onUpdate(address)}
          >
            <IconEdit size="1.2rem" />
          </ActionIcon> */}
          <ActionIcon
            color="red"
            radius="xl"
            onClick={() => onDelete(address?.id)}
          >
            <IconTrash size="1.2rem" />
          </ActionIcon>
        </Group>
      </div>
      <div className="flex w-full flex-col items-start gap-1">
        <div className="flex w-full flex-col gap-2">{address.type}</div>
        <div className="flex w-full flex-col gap-4 pr-8">
          <p className="text-sm font-medium text-gray-500 lg:text-base">
            {`${address.city ? address.city?.name : ""}, ${
              address.district ? address.district?.name : ""
            }, ${address.khoroo ? address.khoroo?.name : ""}`}
          </p>
          <p className="text-xs text-grey700 lg:text-ss">{address.note}</p>
        </div>
      </div>
    </div>
  );
}
