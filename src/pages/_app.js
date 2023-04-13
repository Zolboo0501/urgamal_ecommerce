import "@/styles/globals.css";
import { StoreProvider } from "@/utils/Store";
import { MantineProvider, createEmotionCache, rem } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { getCookie, setCookie } from "cookies-next";
import Router from "next/router";
import { useState, useEffect, use } from "react";
const appendCache = createEmotionCache({ key: "mantine", prepend: false });
import { ModalsProvider } from "@mantine/modals";
import LoginModal from "@/components/LoginModal/LoginModal";
import { UserConfigProvider } from "@/utils/userConfigProvider";
import CategoryContextProvider from "@/utils/categoryContext";
// function Loading() {
//   const [loading, setLoading] = useState(false);

Router.onRouteChangeStart = () => {
  console.log("onRouteChangeStart triggered");
};

Router.onRouteChangeComplete = () => {
  console.log("onRouteChangeComplete triggered");
};

Router.onRouteChangeError = () => {
  console.log("onRouteChangeError triggered");
};
// return loading && (
//   <div className='w-48 h-48 fixed flex justify-center items-center top-0 left-0 bg-white z-10'>
//     <div className='absolute' style={{ left: "50%", top: "50%" }}>
//       loading....
//     </div>
//   </div>
// )

export default function App({ Component, pageProps }) {
  const userConfigs = getCookie("preference_config");
  return (
    <MantineProvider
      withCSSVariables
      withGlobalStyles
      withNormalizeCSS
      emotionCache={appendCache}
      theme={{
        /** Put your mantine theme override here */
        colorScheme: "light",
        focusRingStyles: {
          styles: (theme) => ({ outline: `${rem(2)} solid #f9bc609d` }),
          inputStyles: (theme) => ({ outline: `${rem(2)} solid #f9bc609d` }),
        },
      }}
    >
      <Notifications />
      {/* <Loading /> */}
      <ModalsProvider modals={{ login: LoginModal }}>
        <UserConfigProvider preferenceConfig={userConfigs ? userConfigs : null}>
          <CategoryContextProvider>
            <StoreProvider>
              <Component {...pageProps} />
            </StoreProvider>
          </CategoryContextProvider>
        </UserConfigProvider>
      </ModalsProvider>
    </MantineProvider>
  );
}
