/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Head from "next/head";
import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import BottomFooter from "../Footer";
import BottomNavBar from "../BottomNavBar";
import Category from "@/components/AllCategory/Category";
import { ColorSchemeScript } from "@mantine/core";
import useUser from "@/hooks/useUser";

export default function CategoryLayout({
  children,
  footer = true,
  title = "Таримал Ургамал ХХК",
  initPage,
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
        <title>{title}</title>
        <ColorSchemeScript />
      </Head>
      <div className="bg-white shadow">
        <main
          className="flex flex-col justify-between bg-main"
          style={{
            backgroundColor: userContext?.address?.background_color
              ? userContext?.address?.background_color
              : null,
          }}
        >
          <Navbar address={userContext?.address} />
          <div className="flex flex-row">
            <aside className="sticky top-0 hidden h-screen lg:block">
              <Category initPage={initPage} />
            </aside>
            {children}
          </div>
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
