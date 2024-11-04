/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
//packages
import { useEffect, useState } from "react";
import React from "react";
import { IconLocation, IconPhoneCall, IconClock } from "@tabler/icons-react";
import { SegmentedControl, Center, Box } from "@mantine/core";
import Image from "next/image";
import sanitizeHtml from "sanitize-html";
import Map from "@/components/Map";
import GlobalLayout from "@/components/GlobalLayout/GlobalLayout";
import axios from "axios";
import { Carousel } from "@mantine/carousel";

const Location = ({ data }) => {
  const [selectedLocation, setSelectedLocation] = useState(0);
  const [loadingData, setLoadingData] = useState(true);
  const [loadingMap, setLoadingMap] = useState(false);
  const location = data[selectedLocation];
  const [loc, setLoc] = useState([]);

  useEffect(() => {
    window.dispatchEvent(new Event("storage"));
  }, [selectedLocation]);

  const handleLocationChange = (value) => {
    setLoadingData(true);

    const index = data.findIndex((location) => location.name === value);
    if (index !== -1) {
      setSelectedLocation(index);
      setLoadingData(false);
    }
  };

  useEffect(() => {
    setLoadingMap(true);
    setLoc([location?.latitute, location?.longtitute]);
    setLoadingMap(false);
  }, [location]);

  const htmlFrom = (htmlString) => {
    const cleanHtmlString = sanitizeHtml(htmlString);
    return cleanHtmlString;
  };

  return (
    <GlobalLayout>
      <div className="h-full bg-nav-background px-4 py-4 sm:px-6 sm:py-6">
        <div className="rounded-md">
          <div className="flex flex-col gap-10 p-4 md:p-10">
            <Carousel
              withIndicators
              height={"100%"}
              style={{ flex: 1 }}
              slideSize="100%"
              sx={{ flex: 1 }}
              loop
            >
              {location?.img_url.map((el, idx) => {
                return (
                  <Carousel.Slide key={(el, idx)}>
                    <div
                      className="relative h-[20rem] w-full lg:h-[34rem]"
                      key={el}
                    >
                      <Image
                        key={el}
                        src={el}
                        alt="image"
                        fill
                        className="rounded-lg object-cover"
                      />
                    </div>
                  </Carousel.Slide>
                );
              })}
            </Carousel>
            <div className="flex justify-center">
              <div className="overflow-x-auto">
                <SegmentedControl
                  data={data?.map((location, index) => ({
                    value: location?.name,
                    label: (
                      <Center key={index}>
                        <Box key={index}>{`${location?.name}`}</Box>
                      </Center>
                    ),
                  }))}
                  color="teal"
                  size="md"
                  fullWidth
                  radius="xl"
                  bg={"none"}
                  onChange={(value) => handleLocationChange(value)}
                />
              </div>
            </div>
            <div className="relative flex h-full flex-col items-center justify-center gap-4 md:h-96 md:flex-row">
              <div className="h-80 w-full rounded-lg shadow-lg md:h-full">
                {!loadingMap && !loadingData && (
                  <Map center={loc} zoom={14} key={location?.name}>
                    {({ TileLayer, Marker, Popup }) => (
                      <>
                        <TileLayer
                          key={location?.name}
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        />

                        <Marker position={loc} key={location?.name}>
                          <Popup key={location?.name}>{location?.name}</Popup>
                        </Marker>
                      </>
                    )}
                  </Map>
                )}
              </div>
              <ul className="h-full w-full list-none text-start md:text-lg">
                <li className="flex gap-4 text-start">
                  <div className="flex items-start gap-4">
                    <IconLocation
                      color={"#40C057"}
                      className="h-5 w-5 lg:h-6 lg:w-6 2xl:h-8 2xl:w-8"
                    />
                    <span className="text-sm text-grey600 lg:text-base">
                      Хаяг:
                    </span>
                  </div>
                  <span
                    className="text-sm font-bold lg:text-base"
                    dangerouslySetInnerHTML={{
                      __html: htmlFrom(location?.address),
                    }}
                  />
                </li>
                <li className="mt-5 flex items-center gap-4">
                  <IconPhoneCall
                    color={"#40C057"}
                    className="h-5 w-5 lg:h-6 lg:w-6 2xl:h-8 2xl:w-8"
                  />
                  <span className="text-sm text-grey600 lg:text-base">
                    Утас :
                  </span>
                  <span
                    className="text-sm font-bold lg:text-base"
                    dangerouslySetInnerHTML={{
                      __html: htmlFrom(location?.phone),
                    }}
                  />
                </li>
                <li className="mt-5 flex items-center gap-4">
                  <IconClock
                    className="h-5 w-5 lg:h-6 lg:w-6 2xl:h-8 2xl:w-8"
                    color={"#40C057"}
                  />
                  <span className="text-sm text-grey600 lg:text-base">
                    Хуваарь :
                  </span>
                  <span
                    className="text-sm font-bold lg:text-base"
                    dangerouslySetInnerHTML={{
                      __html: htmlFrom(location?.time_table),
                    }}
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </GlobalLayout>
  );
};

export async function getServerSideProps() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/config/branch`,
    );
    const data = await response?.data?.data;

    return {
      props: {
        data: data || null,
      },
    };
  } catch {
    return {
      props: {
        data: null,
      },
    };
  }
}

export default Location;
