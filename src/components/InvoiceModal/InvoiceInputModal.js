/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Loader, Modal, TextInput, rem } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  Icon123,
  IconBuilding,
  IconMail,
  IconPhone,
  IconSend,
} from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
const InvoiceInputModal = ({ opened, onClose, handleInvoiceInput }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async (values) => {
    setLoading(true);
    await handleInvoiceInput(values);
    setLoading(false);
  };

  const form = useForm({
    initialValues: {
      companyName: "",
      contact: "",
      email: "",
      registry: "",
    },

    validate: {
      companyName: (value) =>
        !value
          ? "Компани нэр хоосон байна"
          : value.length < 4 && "Хамгийн багадаа 4 урттай байна",
      registry: (value) =>
        !value
          ? "Компани регистр хоосон байна"
          : value.length === 7
            ? null
            : "Компани регистр буруу байна",
      contact: (value) =>
        !value
          ? "Утасны дугаар хоосон байна"
          : value.length === 8
            ? null
            : "Утасны дугаар буруу байна",
      email: (value) =>
        value.length > 0
          ? /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(value)
            ? null
            : "Цахим шуудан буруу байна."
          : "Цахим шуудан хоосон байна",
    },
  });

  useEffect(() => {
    if (form.values.contact.length > 8) {
      form.setFieldValue("contact", form.values.contact.slice(0, 8));
    }
  }, [form.values.contact]);

  useEffect(() => {
    if (form.values.registry.length > 7) {
      form.setFieldValue("registry", form.values.registry.slice(0, 7));
    }
  }, [form.values.registry]);

  useEffect(() => {
    if (form.values.companyName.length > 25) {
      form.setFieldValue("companyName", form.values.companyName.slice(0, 25));
    }
  }, [form.values.companyName]);

  return (
    <Modal centered opened={opened} onClose={onClose} title="Нэхэмжлэх бөглөх">
      <form onSubmit={form.onSubmit((values) => handleClick(values))}>
        <TextInput
          label="Компани нэр"
          placeholder="Компани нэр"
          {...form.getInputProps("companyName")}
          icon={
            <IconBuilding
              style={{
                width: rem(20),
                height: rem(20),
                color: "#F9BC60",
              }}
              stroke={2}
            />
          }
        />
        <div className="mt-3">
          <TextInput
            label="Компани регистр"
            placeholder="Компани регистр"
            type="number"
            {...form.getInputProps("registry")}
            icon={
              <Icon123
                style={{
                  width: rem(20),
                  height: rem(20),
                  color: "#F9BC60",
                }}
                stroke={2}
              />
            }
          />
        </div>
        <div className="mt-3">
          <TextInput
            label="Утасны дугаар"
            placeholder="Утасны дугаар"
            type="number"
            {...form.getInputProps("contact")}
            icon={
              <IconPhone
                style={{
                  width: rem(20),
                  height: rem(20),
                  color: "#F9BC60",
                }}
                stroke={2}
              />
            }
          />
        </div>

        <div className="mt-3">
          <TextInput
            label="Цахим шуудан"
            placeholder="Цахим шуудан"
            {...form.getInputProps("email")}
            icon={
              <IconMail
                style={{
                  width: rem(20),
                  height: rem(20),
                  color: "#F9BC60",
                }}
                stroke={2}
              />
            }
          />
        </div>
        <div className="mt-3 flex w-full justify-end">
          <Button
            color="yellow"
            className="w-full"
            disabled={loading && true}
            leftSection={
              loading ? (
                <Loader size={"xs"} color="white" />
              ) : (
                <IconSend stroke={1.5} size={"1.3rem"} />
              )
            }
            type="submit"
          >
            Илгээх
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default InvoiceInputModal;
