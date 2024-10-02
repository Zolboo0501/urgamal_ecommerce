import RickText from "../RickText";
import { useState } from "react";
import { Button } from "@mantine/core";
import { IconAlertCircle, IconCheck, IconError404 } from "@tabler/icons-react";
import { getCookie } from "cookies-next";
import { showNotification } from "@mantine/notifications";

export default function RefundRichText({ innerProps, context, id }) {
  const cookie = getCookie("token");

  const [feedback, setFeedback] = useState({
    text: "",
  });

  const handleSubmit = async () => {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${cookie}`);
      myHeaders.append("Content-Type", "application/json");

      const requestOption = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          orderid: innerProps.orderid,
          description: feedback.text,
        }),
      };

      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/order/refund`,
        requestOption,
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.success) {
            innerProps.setStatus(data.data.status.toString());
            showNotification({
              message: "Амжилттай илгээлээ.",
              icon: <IconCheck />,
              color: "green",
            });
            context.closeModal(id);
          } else {
            innerProps.setStatus("400");
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

  const onChange = (text) => {
    setFeedback((prevState) => ({
      ...prevState,
      text,
    }));
  };

  return (
    <>
      <RickText onChange={onChange} />
      <Button w={"100%"} mt={10} color="orange.4" onClick={handleSubmit}>
        Илгээх
      </Button>
    </>
  );
}
