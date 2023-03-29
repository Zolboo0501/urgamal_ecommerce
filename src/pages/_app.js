import "@/styles/globals.css";
import { StoreProvider } from "@/utils/Store";
import { MantineProvider, createEmotionCache } from "@mantine/core";
import { Notifications } from '@mantine/notifications';
import Router from "next/router";
import { useState, useEffect } from "react";
const appendCache = createEmotionCache({ key: "mantine", prepend: false });

// function Loading() {
//   const [loading, setLoading] = useState(false);

Router.onRouteChangeStart = () => {
  console.log('onRouteChangeStart triggered');
};

Router.onRouteChangeComplete = () => {
  console.log('onRouteChangeComplete triggered');

};

Router.onRouteChangeError = () => {
  console.log('onRouteChangeError triggered');

};
// return loading && (
//   <div className='w-48 h-48 fixed flex justify-center items-center top-0 left-0 bg-white z-10'>
//     <div className='absolute' style={{ left: "50%", top: "50%" }}>
//       loading....
//     </div>
//   </div>
// )


export default function App({ Component, pageProps }) {

  return (
    <MantineProvider
      withCSSVariables
      withGlobalStyles
      withNormalizeCSS
      emotionCache={appendCache}
      theme={{
        /** Put your mantine theme override here */
        colorScheme: "light",
      }}
    >
      <Notifications />
      {/* <Loading /> */}
      <StoreProvider>

        <Component {...pageProps} />


      </StoreProvider>

    </MantineProvider>
  );
}
