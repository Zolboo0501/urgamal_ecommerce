import { Button, rem } from "@mantine/core";
import React from "react";
import {
  IconBrandFacebook,
  IconBrandGoogle,
  IconDeviceMobile,
} from "@tabler/icons-react";

const facebookIcon = (
  <IconBrandFacebook style={{ width: rem(16), height: rem(16) }} />
);

const googleIcon = (
  <IconBrandGoogle style={{ width: rem(16), height: rem(16) }} />
);

const mobileIcon = (
  <IconDeviceMobile style={{ width: rem(16), height: rem(16) }} />
);

const LoginButton = ({
  handleOTP,
  handleRegister,
  handleFacebook,
  handleGoogle,
}) => {
  return (
    <div>
      <Button
        variant="outline"
        radius="xl"
        className="mt-2"
        w={"100%"}
        type="submit"
        onClick={() => handleRegister()}
      >
        Бүртгүүлэх
      </Button>
      <Button
        onClick={() => handleOTP()}
        variant="outline"
        radius="xl"
        w={"100%"}
        className="mt-4"
        color="dark"
        leftSection={mobileIcon}
      >
        Нэг удаагийн кодоор нэвтрэх
      </Button>
      <Button
        variant="filled"
        radius="xl"
        w={"100%"}
        className="mt-2"
        leftSection={facebookIcon}
        onClick={() => handleFacebook()}
      >
        Facebook-ээр нэвтрэх
      </Button>
      <Button
        variant="filled"
        radius="xl"
        w={"100%"}
        className="mt-2"
        color="orange"
        leftSection={googleIcon}
        onClick={handleGoogle}
      >
        Google-ээр нэвтрэх
      </Button>
    </div>
  );
};

export default LoginButton;
