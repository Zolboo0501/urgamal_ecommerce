import RickText from "@/components/RickText";
import { fetchMethod } from "@/utils/fetch";
import { Button, Grid, Select, TextInput, Title, rem } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import {
  IconCheck,
  IconCircleXFilled,
  IconMail,
  IconSend,
  IconTextSize,
} from "@tabler/icons-react";
import { getCookie } from "cookies-next";
import { useState } from "react";

const Feedback = () => {
  const [feedback, setFeedback] = useState({
    email: "",
    title: "",
    text: "",
    type: "",
  });

  const handleSave = async () => {
    const token = getCookie("token");
    const data = await fetchMethod("POST", "user/feedback", token, {
      ...feedback,
    });
    if (data.success) {
      showNotification({
        message: "Амжилттай санал хүсэлт илгээгдлээ.",
        icon: <IconCheck />,
        color: "green",
      });
    } else {
      showNotification({
        message: data?.message,
        color: "red",
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

  const onChange = (text) => {
    setFeedback((prevState) => ({
      ...prevState,
      text,
    }));
  };

  return (
    <div className="flex flex-col w-full bg-white px-8 py-6 rounded-md">
      <Title order={3}>Санал хүсэлт илгээх</Title>{" "}
      <p class="text-sm text-gray-500">
        Таньд ямар нэгэн асуудал гарсан бол бидэнд мэдэгдээрэй
      </p>
      <div className="w-full flex flex-row gap-8 mt-4">
        <div className="w-full">
          <TextInput
            size="sm"
            label="Гарчиг"
            value={feedback.title}
            onChange={(event) =>
              setFeedback({
                ...feedback,
                title: event.currentTarget.value,
              })
            }
            icon={
              <IconTextSize
                style={{
                  width: rem(20),
                  height: rem(20),
                  color: "#F9BC60",
                }}
                stroke={2}
              />
            }
            placeholder="Гарчиг"
            styles={(theme) => ({
              label: {
                marginBottom: rem(4),
                fontSize: rem(15),
                fontWeight: "400",
              },
            })}
          />
        </div>
        <div className="w-full">
          <TextInput
            size="sm"
            label="Цахим шуудан"
            value={feedback.email}
            onChange={(event) =>
              setFeedback({
                ...feedback,
                email: event.currentTarget.value,
              })
            }
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
            placeholder="Цахим шуудан"
            styles={(theme) => ({
              label: {
                marginBottom: rem(4),
                fontSize: rem(15),
                fontWeight: "400",
              },
            })}
          />
        </div>
      </div>
      <div className="w-full flex flex-row gap-8 mt-4">
        <div className="w-full">
          <Select
            placeholder="Төрөл"
            label="Төрөл"
            data={["Санал хүсэлт", "Гомдол"]}
            value={feedback.type}
            onChange={(value) => setFeedback({ ...feedback, type: value })}
            styles={(theme) => ({
              label: {
                marginBottom: rem(4),
                fontSize: rem(15),
                fontWeight: "400",
              },
              item: {
                // applies styles to selected item
                "&[data-selected]": {
                  "&, &:hover": {
                    backgroundColor: "#F9BC60",
                    color: "white",
                  },
                },
              },
            })}
          />
        </div>
        <div className="w-full" />
      </div>
      <Grid sx={{ marginTop: rem(10) }}>
        <Grid.Col>
          <RickText onChange={onChange} />
        </Grid.Col>
      </Grid>
      <div className="w-full flex justify-end mt-6">
        <Button
          color="yellow"
          leftIcon={
            <IconSend
              style={{
                width: rem(20),
                height: rem(20),
                color: "#fff",
              }}
              stroke={2}
            />
          }
          onClick={() => handleSave()}
        >
          Илгээх
        </Button>
      </div>
    </div>
  );
};

export default Feedback;
