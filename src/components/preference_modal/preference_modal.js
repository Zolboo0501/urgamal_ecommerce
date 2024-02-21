import {
  Text,
  Modal,
  Group,
  Image,
  Card,
  createStyles,
  Container,
} from "@mantine/core";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";

const useStyles = createStyles(() => ({
  description: {
    textAlign: "center",

    "@media (max-width: 520px)": {
      textAlign: "left",
    },
  },
  card1: {
    ":hover": {
      background: "#8acc72",
    },
  },
  card2: {
    ":hover": {
      background: "#ead358",
    },
  },
}));

export default function Preference_modal({ close, opened, preference_cookie }) {
  const router = useRouter();
  const { classes } = useStyles();

  return (
    <>
      <Modal
        withCloseButton={false}
        closeOnClickOutside={false}
        closeOnEscape={false}
        size="auto"
        opened={opened}
        onClose={close}
        padding="xl"
      >
        <Text weight={600} size={20} mb={10} align="center">
          Хэрэглэгч таны сонирхож байгаа төрөл
        </Text>

        <Container p={10} size={600} mb={20}>
          <Text size="lg" color="dimmed" className={classes.description}>
            Та доорх хоёр төрлөөс аль нэгийн сонгож өөрт тохирсон бараагаа харах
            боломжтой.
          </Text>
        </Container>
        <Group spacing={50}>
          <Card
            padding={30}
            bg={"#96E579"}
            component="button"
            className={classes.card1}
            onClick={() => {
              setCookie("preference_config", 1), close();
              preference_cookie(1);
              router.reload();
            }}
          >
            <Card.Section>
              <Image
                src="/Begginer.png"
                width={200}
                className="mx-10 my-10"
                alt="begginer"
              />
            </Card.Section>

            <Text align="center" color="dark" weight={500} size="xl">
              Өрхийн тариаланч
            </Text>
          </Card>
          <Card
            padding="xl"
            bg={"#FFE663"}
            component="button"
            className={classes.card2}
            onClick={() => {
              setCookie("preference_config", 2), close();
              preference_cookie(2);
              router.reload();
            }}
          >
            <Card.Section>
              <Image
                src="/Pro.png"
                width={200}
                className="mx-auto my-10"
                alt="pro"
              />
            </Card.Section>

            <Text align="center" color="dark" weight={500} size="xl">
              Мэргэжлийн тариаланч
            </Text>
          </Card>
        </Group>
      </Modal>
    </>
  );
}
