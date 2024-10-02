/* eslint-disable @next/next/no-page-custom-font */
import Head from "next/head";
import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Navbar/navbar";
import BottomFooter from "../Footer";
import { UserConfigContext } from "@/utils/userConfigContext";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import BottomNavBar from "../bottomNavigation";
import Category from "@/components/AllCategory/category";
import { ColorSchemeScript } from "@mantine/core";

export default function CategoryLayout({
  children,
  footer = true,
  title = "Таримал Ургамал ХХК",
}) {
  const [type, setType] = useState();
  const userContext = useContext(UserConfigContext);
  const [userConfigValue, setUserConfigValue] = useState(
    userContext.preferenceConfig,
  );
  const route = useRouter();
  useEffect(() => {
    setUserConfigValue(userContext.configId);
  }, [userContext.preferenceConfig, userContext.configId]);

  const getValue = (data) => {
    setType(data);
  };

  const handleConfigSelection = (value) => {
    if (userConfigValue !== value) {
      setCookie("preference_config", value, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      route.reload();
    }
  };

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
          <Navbar getValue={getValue} address={userContext?.address} />
          <div className="flex flex-row">
            <aside className="sticky top-0 hidden h-screen lg:block">
              <Category />
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
