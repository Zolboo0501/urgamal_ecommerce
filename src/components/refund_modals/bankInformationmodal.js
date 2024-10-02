import { useEffect } from "react";
import { Button, Grid, TextInput, Select, Group } from "@mantine/core";
import { IconAlertCircle, IconCheck } from "@tabler/icons-react";
import { getCookie } from "cookies-next";
import { showNotification } from "@mantine/notifications";
import { isNotEmpty, useForm } from "@mantine/form";

export default function BankInfoModal({
  initialData,
  innerProps,
  context,
  id,
}) {
  const cookie = getCookie("token");

  const form = useForm({
    initialValues: {
      bank_type: initialData?.bank_type ?? "",
      bank_account_number: initialData?.bank_account_number ?? "",
      phone_number: initialData?.phone_number ?? "",
    },
    validate: {
      bank_type: isNotEmpty("Заавал бөглөх"),
      bank_account_number: (value, values) =>
        values.type && value === undefined ? "Заавал бөглөх" : null,
      phone_number: isNotEmpty("Заавал бөглөх"),
    },
    validateInputOnChange: true,
  });

  useEffect(() => {
    form.setValues(initialData);
    return () => {
      form.reset();
    };
  }, [initialData]);

  const handleSubmit = async (values) => {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${cookie}`);
      myHeaders.append("Content-Type", "application/json");

      const requestOption = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          id: innerProps.orderid,
          bank_type: values.bank_type,
          bank_account_number: values.bank_account_number,
          phone_number: values.phone_number,
        }),
      };

      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/order/refund_form`,
        requestOption,
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.success) {
            innerProps.setStatus(data.data.status.toString());
            showNotification({
              message:
                "Амжилттай илгээлээ. Бид танд удахгүй мэдээлэл хүргэх болно.",
              icon: <IconCheck />,
              color: "green",
            });
            context.closeModal(id);
          } else {
            innerProps.setStatus(data.data.status.toString());
            showNotification({
              message: data.message,
              icon: <IconAlertCircle />,
              color: "red",
            });
          }
        });
    } catch (err) {
      console.log(err, "err");
    }
  };

  return (
    <form
      onSubmit={form.onSubmit(async (values, e) => {
        await handleSubmit(values);
        form.setValues(initialData);
      })}
    >
      <Group position="center">
        <Grid grow>
          <Grid.Col span={12}>
            <Select
              data={[
                {
                  value: "Хаан_банк",
                  label: "Хаан банк",
                },
                {
                  value: "Голомт",
                  label: "Голомт",
                },

                {
                  value: "ХХБ",
                  label: "ХХБ",
                },
                {
                  value: "Хас",
                  label: "Хас",
                },
                {
                  value: "Төрийн_банк",
                  label: "Төрийн банк",
                },
                {
                  value: "Монгол_банк",
                  label: "Монгол банк",
                },
                {
                  value: "Ариг",
                  label: "Ариг",
                },
                {
                  value: "Капитрон",
                  label: "Капитрон",
                },
                {
                  value: "ҮХОбанк",
                  label: "ҮХОбанк",
                },
                {
                  value: "Чингис_хаан_банк",
                  label: "Хөгжлийн банк",
                },
                {
                  value: "Хөгжлийн_банк",
                  label: "Хөгжлийн банк",
                },
                {
                  value: "Богд",
                  label: "Богд",
                },
                {
                  value: "М_банк",
                  label: "М Банк",
                },
              ]}
              withAsterisk
              id="input-name"
              label="Банкны төрөл"
              {...form.getInputProps("bank_type")}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <TextInput
              className="w-full"
              withAsterisk
              id="input-phone"
              type="tel"
              label="Дансны дугаар"
              {...form.getInputProps("bank_account_number")}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <TextInput
              className="w-full"
              withAsterisk
              id="input-phone"
              type="tel"
              label="Утасны дугаар"
              {...form.getInputProps("phone_number")}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <Button w="100%" size="xs" type="submit" color="yellow">
              Илгээх
            </Button>
          </Grid.Col>
        </Grid>
      </Group>
    </form>
  );
}
