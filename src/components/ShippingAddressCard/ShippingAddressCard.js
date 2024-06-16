import { ActionIcon, Card, Group, Text } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import React from "react";

export default function ShippingAddressCard({
  name,
  address,
  onUpdate,
  onDelete,
}) {
  return (
    <Card p="xs" radius="md" withBorder fluid>
      <Group position="apart">
        <Text weight="500" size="sm">
          {name}
        </Text>
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
            onClick={() => onDelete(address.id)}
          >
            <IconTrash size="1.2rem" />
          </ActionIcon>
        </Group>
      </Group>
      <div className="flex flex-col items-start gap-3 w-full">
        <div className="flex flex-col gap-2 w-full">{address.type}</div>
        <div className="flex flex-col gap-4 w-full pr-8">
          <Text size="sm" weight={500} color="grey">
            {`${address.city ? address.city?.name : ""}, ${
              address.district ? address.district?.name : ""
            }, ${address.khoroo ? address.khoroo?.name : ""}`}
          </Text>
          <Text size="xs" weight={500}>
            Нэмэлт тайлбар: {address.note}
          </Text>
        </div>
      </div>
    </Card>
  );
}
