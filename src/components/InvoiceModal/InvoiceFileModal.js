import { fetchMethod } from "@/utils/fetch";
import { errorNotification, successNotification } from "@/utils/utils";
import { Button, TextInput, rem } from "@mantine/core";
import {
  IconBuilding,
  IconCheck,
  IconCircleXFilled,
  IconLocation,
  IconMail,
  IconPhone,
} from "@tabler/icons-react";
import { getCookie } from "cookies-next";

const InvoiceFileModal = ({ context, id, innerProps }) => {
  const { data } = innerProps;

  const confirm = async (id) => {
    context.closeModal(id);
    const token = getCookie("token");
    const res = await fetchMethod(
      "GET",
      `order/invoice/verify?orderid=${data?.order?.orderid}`,
      token,
    );
    if (res.success) {
      successNotification({
        message: "Амжилттай баталгаажлаа.",
        icon: <IconCheck />,
      });
    } else {
      errorNotification({
        message: res?.message,
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
  };
  return (
    <div className="flex flex-col gap-3">
      <TextInput
        size="sm"
        label="Хаяг"
        value={data?.order?.address}
        icon={
          <IconLocation
            style={{
              width: rem(20),
              height: rem(20),
              color: "#F9BC60",
            }}
            stroke={2}
          />
        }
        styles={(theme) => ({
          label: {
            marginBottom: rem(4),
            fontSize: rem(15),
            fontWeight: "400",
          },
        })}
      />
      <TextInput
        size="sm"
        label="Байгуулагын нэр"
        value={data?.company}
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
        styles={(theme) => ({
          label: {
            marginBottom: rem(4),
            fontSize: rem(15),
            fontWeight: "400",
          },
        })}
      />
      <TextInput
        size="sm"
        label="Байгуулагын регистр"
        value={data?.registry}
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
        styles={(theme) => ({
          label: {
            marginBottom: rem(4),
            fontSize: rem(15),
            fontWeight: "400",
          },
        })}
      />
      <TextInput
        size="sm"
        label="Утасны дугаар"
        value={data?.contact}
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
        styles={(theme) => ({
          label: {
            marginBottom: rem(4),
            fontSize: rem(15),
            fontWeight: "400",
          },
        })}
      />
      <TextInput
        size="sm"
        label="Цахим шуудан"
        value={data?.email}
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
        styles={(theme) => ({
          label: {
            marginBottom: rem(4),
            fontSize: rem(15),
            fontWeight: "400",
          },
        })}
      />
      <Button color="yellow" className="mt-6" onClick={() => confirm(id)}>
        Баталгаажуулах
      </Button>
    </div>
  );
};

export default InvoiceFileModal;
