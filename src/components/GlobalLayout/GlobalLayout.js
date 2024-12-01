/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Head from "next/head";
import React, { useContext, useEffect, useState } from "react";
import BottomFooter from "../Footer";
import BottomNavBar from "../BottomNavBar";
import Navbar from "../Navbar/Navbar";
import useUser from "@/hooks/useUser";

export default function GlobalLayout({
  children,
  footer = true,
  title = "Таримал Ургамал ХХК",
}) {
  const userContext = useUser();
  const [_, setUserConfigValue] = useState(userContext.preferenceConfig);

  useEffect(() => {
    setUserConfigValue(userContext.configId);
  }, [userContext.preferenceConfig, userContext.configId]);

  // const handleConfigSelection = (value) => {
  //   if (userConfigValue !== value) {
  //     setCookie("preference_config", value, {
  //       maxAge: 30 * 24 * 60 * 60 * 1000,
  //     });
  //     route.reload();
  //   }
  // };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        {userContext?.address?.logo && (
          <link rel="icon" href={userContext?.address?.logo} />
        )}
        <link
          href="https://fonts.googleapis.com/css2?family=Commissioner:wght@100..900&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />

        <title>{title}</title>
      </Head>
      <div className="bg-white shadow">
        {/* <Search /> */}
        <main
          className="flex flex-col justify-between bg-main"
          style={{
            backgroundColor: userContext?.address?.background_color
              ? userContext?.address?.background_color
              : null,
          }}
        >
          <Navbar address={userContext?.address} />
          {children}
          {footer && (
            <BottomFooter
              address={userContext?.address}
              links={userContext?.links}
            />
          )}
          <BottomNavBar />
        </main>
      </div>
    </div>
  );
}
