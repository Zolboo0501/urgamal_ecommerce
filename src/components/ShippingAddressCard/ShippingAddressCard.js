import { ActionIcon, Card, Group } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

export default function ShippingAddressCard({
  name,
  address,
  onUpdate,
  onDelete,
}) {
  return (
    <Card p="xs" radius="md" withBorder fluid>
      <Group position="apart">
        <p class="text-sm font-medium">{name}</p>
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
          <p class="text-sm font-medium text-gray-500">
            {`${address.city ? address.city?.name : ""}, ${
              address.district ? address.district?.name : ""
            }, ${address.khoroo ? address.khoroo?.name : ""}`}
          </p>
          <p class="text-xs font-medium">{address.note}</p>
        </div>
      </div>
    </Card>
  );
}
