import Image from "next/image";
import { rem, Input, Button, TextInput } from "@mantine/core";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { IconCheck, IconMailCode } from "@tabler/icons-react";
import { fetchMethod } from "@/utils/fetch";
import { showNotification } from "@mantine/notifications";

const icon = (
  <IconMailCode
    style={{ width: rem(16), height: rem(16), color: "green" }}
    stroke={1.5}
  />
);

const Forget = () => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");

  const handleSend = async () => {
    if (email.length > 0) {
      if (/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        setError(false);
        const requestOption = {
          email,
        };
        const data = await fetchMethod(
          "POST",
          "auth/resetpass/mail",
          "",
          requestOption,
        );
        if (data.success) {
          showNotification({
            message: data.message,
            icon: <IconCheck />,
            color: "green",
          });
          router.push("/login");
        } else {
          showNotification({
            message: data.message,
            color: "red",
          });
        }
      } else {
        setError(true);
      }
    } else {
      setError(true);
    }
  };

  return (
    <div className="absolute flex h-full w-full flex-row">
      <div className="relative h-full w-4/6">
        <Image fill src={"/plant.jpg"} alt="plant" objectFit="cover" />
      </div>
      <div className="relative flex w-2/6 flex-col items-center justify-center">
        <Image src="/logo.png" width={100} height={100} alt="logo" />
        <p className="mt-4 font-sans text-xl font-bold">Нууц үг сэргээх</p>
        <div className="mt-5 w-4/6">
          <TextInput
            label="Цахим шуудан"
            placeholder="Цахим шуудан"
            radius={"xl"}
            icon={icon}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            styles={(theme) => ({
              label: {
                marginBottom: rem(15),
                fontSize: rem(15),
                fontWeight: "400",
              },
              input: {
                "&:focus-within": {
                  outline: "0.01rem solid green",
                },
              },
            })}
          />
          {error && (
            <Input.Error className="mt-2">Цахим шуудан буруу байна</Input.Error>
          )}
          <Button
            variant="outline"
            color="green"
            radius="xl"
            className="mt-4"
            w={"100%"}
            type="submit"
            onClick={handleSend}
          >
            Илгээх
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Forget;
