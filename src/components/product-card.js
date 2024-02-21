import {
  Text,
  Button,
  LoadingOverlay,
  Badge,
  ThemeIcon,
  ActionIcon,
  rem,
  Card,
  Group,
  Image,
  Stack,
  Box,
  AspectRatio,
} from '@mantine/core';
import { useState } from 'react';
import { addCart } from '../utils/Store';
import { getCookie } from 'cookies-next';
import { showNotification } from '@mantine/notifications';
import {
  IconCheck,
  IconCircleXFilled,
  IconHeart,
  IconHeartFilled,
  IconMinus,
  IconPhotoOff,
  IconPlus,
} from '@tabler/icons-react';
import {
  SuccessNotification,
  ErrorNotification,
} from '../utils/SuccessNotification';
import { useRouter } from 'next/router';
import { fetchMethod } from '@/utils/fetch';
import useWishlist from '@/hooks/useWishlist';

const ProductCard = ({ src, data, shouldScale = true, additionalImages }) => {
  const [productCount, setProductCount] = useState(1);
  const [currentImage, setCurrentImage] = useState({
    key: src?.key,
    src: src?.url,
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const token = getCookie('token');
  const [toggle, setToggle] = useState(false);
  const wishlist = useWishlist();
  // const averageBgColor = useAverageColor(src?.url);
  const addCount = (event) => {
    event.stopPropagation();
    if (data?.balance - productCount > 0) setProductCount(productCount + 1);
    else
      showNotification({
        message: 'Барааны үлдэгдэл хүрэлцэхгүй байна.',
        color: 'red',
      });
  };

  const handleWishlist = async (event) => {
    event.stopPropagation();
    setToggle(!toggle);
    if (!toggle) {
      if (token) {
        const requestOption = {
          productid: data.id,
        };
        const res = await fetchMethod(
          'POST',
          'user/wishlist',
          token,
          requestOption
        );
        if (res.success) {
          wishlist.addItem(data);
          showNotification({
            message: res.message,
            icon: <IconCheck />,
            color: 'green',
          });
        } else {
          showNotification({
            message: res?.message,
            color: 'red',
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
      } else {
        showNotification({
          message: 'Нэвтрэх шаардлагатай',
          color: 'red',
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
    }
  };

  const minusCount = (event) => {
    event.stopPropagation();
    if (productCount > 1) setProductCount(productCount - 1);
  };

  const addToCartHandler = async (event) => {
    event.stopPropagation();
    if (data?.balance > 0) {
      if (token) {
        setLoading(true);
        const body = {
          product_id: data.id,
          quantity: productCount,
        };
        const fetchData = await fetchMethod('POST', 'cart/add', token, body);
        if (fetchData?.success) {
          setLoading(false);
          SuccessNotification({
            message: data.name,
            title: 'Сагсанд амжилттай орлоо!',
          });
          addCart({ ...data, quantity: productCount });
        } else {
          ErrorNotification({ title: 'Алдаа гарлаа.' });
        }
      } else {
        addCart({ ...data, quantity: productCount });
        SuccessNotification({
          message: data.name,
          title: 'Сагсанд амжилттай орлоо!',
        });
      }
    } else {
      showNotification({
        message: 'Барааны үлдэгдэл хүрэлцэхгүй байна.',
        color: 'red',
      });
    }
  };

  const clickProduct = (e) => {
    e.preventDefault();
    router.push({
      shallow: true,
      pathname: '/product/[id]',
      query: { id: data.id },
    });
  };

  function numberWithCommas(x) {
    return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, "'");
  }

  return (
    <Card
      shadow="md"
      withBorder
      padding="lg"
      radius="md"
      component="a"
      target="_blank"
      maw={320}
      onClick={(event) => {
        clickProduct(event);
      }}
      className={`hover:cursor-pointer ${
        shouldScale &&
        'transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-101'
      }`}
      style={{ border: '0.5px solid #f3f3f3' }}
    >
      <Card.Section>
        <div className="relative block border-b">
          <AspectRatio ratio={4 / 3}>
            <Image
              src={currentImage?.src}
              height={240}
              fit="cover"
              withPlaceholder
              placeholder={
                <div className="flex flex-col items-center gap-2 rounded-md">
                  <ThemeIcon size="lg" variant="light" color="green">
                    <IconPhotoOff size="80%" stroke={0.5} />
                  </ThemeIcon>
                  <Text size="xs" weight={300} color="dimmed">
                    Зураггүй
                  </Text>
                </div>
              }
              alt={currentImage?.src}
            />
            {additionalImages && (
              <Group
                pos="absolute"
                spacing={2}
                px={8}
                grow
                inset={0}
                align="end"
                className="z-10"
              >
                {additionalImages?.map((addImg) => {
                  return (
                    <Box
                      key={addImg?.key}
                      pos="relative"
                      className="h-full z-20"
                      onMouseEnter={() => {
                        setCurrentImage({ key: addImg?.key, src: addImg?.url });
                      }}
                      onMouseLeave={() => {
                        setCurrentImage({ key: src?.key, src: src?.url });
                      }}
                    >
                      <Box
                        pos="absolute"
                        sx={(theme) => ({
                          height: 4,
                          zIndex: 20,
                          bottom: 2,
                          left: 0,
                          right: 0,
                          top: 'auto',
                          backgroundColor:
                            currentImage?.key === addImg?.key
                              ? theme.colors.yellow[2]
                              : theme.colors.gray[3],
                          borderRadius: theme.radius.xl,
                        })}
                      />
                    </Box>
                  );
                })}
              </Group>
            )}
          </AspectRatio>
        </div>
      </Card.Section>
      <Stack position="apart" mt="xs" mb="xs">
        <Text
          weight={500}
          className="text-lg font-medium mt-1 text-start grow"
          lineClamp={1}
        >
          {data?.name}
        </Text>

        <div className="flex flex-row items-center gap-1">
          <p className="text-[#696A6C] font-semibold text-xs">Үлдэгдэл : </p>
          {parseInt(data?.balance) > 10 ? (
            <Badge size="xs" color="teal">
              Хангалттай
            </Badge>
          ) : parseInt(data?.balance) <= 10 ? (
            <p className="text-xs font-semibold ">{data?.balance}</p>
          ) : (
            <Badge size="xs" color="yellow">
              Үлдэгдэлгүй
            </Badge>
          )}
        </div>
      </Stack>
      <div className="flex flex-col w-full">
        <div className="flex flex-row justify-between items-center">
          <p className="font-semibold text-base mt-1 text-start">
            {numberWithCommas(data?.listPrice)}₮
          </p>
          <ActionIcon
            variant="subtle"
            radius="lg"
            onClick={(event) => {
              event.preventDefault();
              handleWishlist(event);
            }}
          >
            {toggle ? (
              <IconHeartFilled
                stroke={1.5}
                size={rem(24)}
                style={{ color: '#F9BC60' }}
              />
            ) : (
              <IconHeart stroke={1.5} size={rem(24)} color="#F9BC60" />
            )}
          </ActionIcon>
        </div>
        <Group pt="md" pb={0} grow align="stretch" w="100%">
          <div className="flex flex-row items-center">
            <ActionIcon
              variant="light"
              size="lg"
              radius="xl"
              className="flex justify-center items-center border rounded-md"
              color="yellow"
              onClick={(event) => {
                event.preventDefault();
                minusCount(event);
              }}
            >
              <IconMinus stroke={2} size={rem(16)} />
            </ActionIcon>
            <p className="text-center text-sm ml-2 mr-2 font-semibold">
              {productCount}
            </p>
            <ActionIcon
              variant="light"
              size="lg"
              radius="xl"
              className="flex justify-center items-center rounded-md"
              color="yellow"
              onClick={(event) => {
                event.preventDefault();
                addCount(event);
              }}
            >
              <IconPlus stroke={2} size={rem(16)} />
            </ActionIcon>
          </div>
          <Button
            variant="filled"
            radius="xl"
            color="yellow"
            onClick={(event) => {
              event.preventDefault();
              addToCartHandler(event);
            }}
          >
            {loading === true ? (
              <LoadingOverlay
                loaderProps={{ size: 'sm', color: 'white' }}
                overlayOpacity={0.1}
                visible={loading}
              />
            ) : (
              <div className="flex items-center">
                <p className="text-sm font-semibold ">Сагслах</p>
                {/* <Image width={18} height={18} src={"/icons/trolley2.svg"} /> */}
              </div>
            )}
          </Button>
        </Group>
        {/* <Button
              variant={"filled"}
              style={{ width: "100%" }}
              className="flex justify-center items-center p-1 bg-button-yellow rounded-md mt-1 hover:cursor-pointer"
              color={"orange"}
              onClick={(event) => addToCartHandler(event, data)}
            >
              {loading === true ? (
                <LoadingOverlay
                  loaderProps={{ size: "sm", color: "white" }}
                  overlayOpacity={0.1}
                  visible={loading}
                />
              ) : (
                <div className="flex items-center">
                  <p className="text-sm text-white font-semibold ">Сагслах</p>
                  <Image
                    className="ml-2"
                    width={18}
                    height={18}
                    src={"/icons/trolley2.svg"}
                  />
                </div>
              )}
            </Button> */}
      </div>
    </Card>
  );
};

export default ProductCard;
