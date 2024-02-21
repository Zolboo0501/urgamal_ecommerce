import { Text, Title, rem } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { IconCheck, IconUserShield } from "@tabler/icons-react";
import { getCookie } from "cookies-next";

export default function UserBasicInfo({ data, refresh }) {
  const dateValue = data?.birthdate?.toString();
  const form = useForm({
    initialValues: {
      givenName: data?.given_name,
      familyName: data?.family_name,
      mobile: data?.mobile?.toString(),
      birthdate: dateValue && dateValue,
      gender: data?.gender,
    },
    validate: {
      givenName: isNotEmpty("Нэр оруулна уу"),
      familyName: isNotEmpty("Овог оруулна уу"),
    },
  });

  const handleEdit = ({ givenName, familyName, birthdate, gender }) => {
    var raw = JSON.stringify({
      gender: gender,
      given_name: givenName,
      family_name: familyName,
      birthdate: birthdate,
    });

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
        "Content-Type": "application/json",
      },
      body: raw,
    })
      .then(async (response) => {
        if (!response.ok) {
          const res = await response.json();
          throw new Error(res.message);
        }
        return response.json();
      })
      .then((data) => {
        showNotification({
          message: data.message,
          icon: <IconCheck />,
          color: "green",
        });
        refresh();
      })
      .catch((error) => {
        showNotification({
          message: error.message,

          color: "red",
        });
      });
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row items-center w-full bg-white drop-shadow-lg px-6 py-4">
        <div className="flex justify-center items-centerp-3 rounded-full bg-background-sort">
          <IconUserShield
            style={{ width: rem(64), height: rem(64), color: "black" }}
            stroke={1.5}
          />
        </div>
        <div className="ml-4 flex flex-col">
          <Title order={3}>Хувийн мэдээлэл</Title>
          <Text size="md" c="dimmed">
            Та хувийн мэдээллээ доорх талбаруудаар засварлаарай
          </Text>
        </div>
      </div>
      {/* <form
        className="mt-6"
        onSubmit={form.onSubmit((values) => handleEdit(values))}
      >
        <Stack spacing="lg">
          <TextInput
            size="sm"
            label="Нэр"
            {...form.getInputProps("givenName")}
            withAsterisk
          />
          <TextInput
            size="sm"
            label="Овог"
            {...form.getInputProps("familyName")}
            withAsterisk
          />

          <TextInput
            size="sm"
            label="Нас"
            {...form.getInputProps("birthdate")}
            withAsterisk
          />
          <Radio.Group
            label="Хүйс"
            withAsterisk
            {...form.getInputProps("gender")}
          >
            <Group mt="xs">
              <Radio value="male" color="yellow.6" label="Эрэгтэй" />
              <Radio value="female" color="yellow.6" label="Эмэгтэй" />
            </Group>
          </Radio.Group>
          <TextInput
            size="sm"
            label="Гар утас"
            disabled
            {...form.getInputProps("mobile")}
            withAsterisk
          />
        </Stack>
        <Group mt="xl" position="right">
          <Button variant="subtle" color="red">
            Цуцлах
          </Button>
          <Button type="submit" color="yellow">
            Засварлах
          </Button>
        </Group>
      </form> */}
    </div>
  );
}
