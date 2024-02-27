/* eslint-disable react-hooks/exhaustive-deps */
import {
  Modal,
  Button,
  Grid,
  Group,
  Select,
  TextInput,
  LoadingOverlay,
  Textarea,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useEffect, useState } from "react";

function ProductModal({
  initialData,
  isOpen,
  close,
  onSubmit,
  loading,
  address,
  handleClick,
}) {
  const [districts, setDistricts] = useState([]);
  const [committee, setCommittee] = useState([]);
  const form = useForm({
    initialValues: {
      name: initialData?.name ?? "",
      city: initialData?.city ?? "",
      province: initialData?.province ?? "",
      district: initialData?.district ?? "",
      committee: initialData?.committee ?? "",
      street: initialData?.street ?? "",
      fence: initialData?.fence ?? "",
      apartment: initialData?.apartment ?? "",
      number: initialData?.number ?? "",
      phone: initialData?.phone ?? "",
      // type: false, // ? нэмэгдэж магад
      note: initialData?.note ?? "",
    },
    validate: {
      name: isNotEmpty("Заавал бөглөх"),
      city: (value, values) =>
        values.type && value === undefined ? "Заавал бөглөх city" : null,
      province: (value, values) =>
        values.type && value === undefined ? "Заавал бөглөх province" : null,
      district: isNotEmpty("Заавал бөглөх"),
      committee: isNotEmpty("Заавал бөглөх"),
      street: isNotEmpty("Заавал бөглөх"),
      apartment: isNotEmpty("Заавал бөглөх"),
      number: isNotEmpty("Заавал бөглөх"),
      phone: isNotEmpty("Заавал бөглөх"),
    },
    validateInputOnChange: true,
  });

  useEffect(() => {
    form.setValues(initialData);
    return () => {
      form.reset();
    };
  }, [initialData]);

  useEffect(() => {
    if (form.values.province || form.values.city) {
      form.setValues({ district: "" });
      form.setValues({ committee: "" });
      const districtsOfProvince = address?.filter(
        (item) => item?.id == form.values.city
      )[0]?.dic_districts;

      setDistricts(
        districtsOfProvince?.map((item) => ({
          value: item?.id,
          label: item?.name,
          dic_khoroos: item?.dic_khoroos,
        }))
      );
    }
  }, [form.values.province, form.values.city]);

  useEffect(() => {
    if (form.values.district) {
      form.setValues({ committee: "" });
      const committeeOfDistrict = districts?.filter(
        (item) => item?.value == form.values.district
      )[0]?.dic_khoroos;
      setCommittee(
        committeeOfDistrict?.map((item) => ({
          value: item?.id,
          label: item?.name,
        }))
      );
    }
  }, [form.values.district]);
  return (
    <Modal
      opened={isOpen}
      onClose={() => {
        form.setValues(initialData);
        close();
      }}
      title={initialData?.create ? "Шинэ хаяг нэмэх" : "Хаяг засах"}
      size="lg"
      centered
      closeOnClickOutside={false}
    >
      <LoadingOverlay visible={loading} overlayBlur={2} />
      <form
        onSubmit={form.onSubmit(async (values, e) => {
          await onSubmit(values);
          form.setValues(initialData);
        })}
      >
        <Group position="center">
          <Grid grow>
            {/* <Grid.Col span={12}> // ? нэмэгдэж магад
              <Switch
                label="Орон нутаг"
                {...form.getInputProps("type", { type: "checkbox" })}
                color="teal"
                size="sm"
              />
            </Grid.Col> */}
            <Grid.Col span={12}>
              <TextInput
                withAsterisk
                id="input-name"
                label="Нэр"
                {...form.getInputProps("name")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Select
                className="w-full"
                label="Хот/Аймаг"
                placeholder="Хот / Аймаг сонгоно уу."
                required
                {...form.getInputProps(form.values.type ? "province" : "city")}
                withinPortal
                data={address?.map((item) => ({
                  value: item?.id,
                  label: item?.name,
                }))}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Select
                className="w-full"
                withAsterisk
                id="input-district"
                label="Дүүрэг / Сум"
                {...form.getInputProps("district")}
                placeholder="Дүүрэг / Сум сонгоно уу."
                required
                withinPortal
                data={districts}
              />
            </Grid.Col>
            <Grid.Col span={2}>
              <Select
                className="w-full"
                withAsterisk
                id="input-committee"
                label="Хороо / Баг"
                {...form.getInputProps("committee")}
                placeholder="Дүүрэг / Сум сонгоно уу."
                required
                withinPortal
                data={committee}
              />
            </Grid.Col>
            <Grid.Col span={2}>
              <TextInput
                className="w-full"
                withAsterisk
                id="input-street"
                label="Гудамж"
                {...form.getInputProps("street")}
              />
            </Grid.Col>
            <Grid.Col span={2}>
              <TextInput
                className="w-full"
                withAsterisk
                id="input-apartment"
                label="Байр / Байгуулга"
                {...form.getInputProps("apartment")}
              />
            </Grid.Col>
            <Grid.Col span={2}>
              <TextInput
                className="w-full"
                withAsterisk
                id="input-number"
                label="Тоот"
                {...form.getInputProps("number")}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <TextInput
                className="w-full"
                withAsterisk
                id="input-phone"
                type="tel"
                label="Утасны дугаар"
                {...form.getInputProps("phone")}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <Textarea
                className="w-full"
                withAsterisk
                id="input-note"
                label="Нэмэлт тайлбар"
                {...form.getInputProps("note")}
                maxLength={250}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <Group position="right">
                <Button variant="subtle" size="xs" color="red" onClick={close}>
                  Цуцлах
                </Button>
                <Button size="xs" type="submit" color="yellow">
                  {initialData?.create ? "Үүсгэх" : "Хадгалах"}
                </Button>
              </Group>
            </Grid.Col>
          </Grid>
        </Group>
      </form>
    </Modal>
  );
}

export default ProductModal;
