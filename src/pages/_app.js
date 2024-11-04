import ChangeModal from "@/components/ChangeModal";
import EbarimtModal from "@/components/EbarimtModal";
import InvoiceFileModal from "@/components/InvoiceModal/InvoiceFileModal";
import InvoiceModal from "@/components/InvoiceModal/InvoiceModal";
import LoginModal from "@/components/LoginModal/LoginModal";
import PaymentModal from "@/components/PaymentModal/PaymentModal";
import BankInfoModal from "@/components/refund_modals/bankInformationmodal";
import RefundRichText from "@/components/refund_modals/descriptionModal";
import "@/styles/globals.css";
import CategoryContextProvider from "@/utils/categoryContextProvider";
import SocketProvider from "@/utils/SocketProvider";
import { UserConfigProvider } from "@/utils/userConfigProvider";
import WishlistProvider from "@/utils/wishlistProvider";
import {
  createTheme,
  Input,
  MantineProvider,
  rem,
  TextInput,
} from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { NextUIProvider } from "@nextui-org/react";
import { sfProRounded } from "public/fonts";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/tiptap/styles.css";
import classes from "@/styles/focus.module.css";
export default function App({ Component, pageProps }) {
  const theme = createTheme({
    fontFamily: sfProRounded.style.fontFamily,
    activeClassName: "",
    focusClassName: classes,
  });
  return (
    <NextUIProvider>
      <MantineProvider
        withCSSVariables
        withGlobalStyles
        withNormalizeCSS
        theme={theme}
        // theme={{
        //   colorScheme: "light",
        //   fontFamily: sfProRounded.style.fontFamily,
        //   focusRingStyles: {
        //     // styles: (theme) => ({ outline: `${rem(1)} solid #f9bc609d` }),
        //     // inputStyles: (theme) => ({ outline: `${rem(1.5)} solid #40C057` }),
        //   },
        // }}
      >
        <SocketProvider>
          <Notifications />
          <UserConfigProvider>
            <WishlistProvider>
              <ModalsProvider
                modals={{
                  login: LoginModal,
                  payment: PaymentModal,
                  invoice: InvoiceModal,
                  bankInfo: BankInfoModal,
                  refundDescription: RefundRichText,
                  invoiceFile: InvoiceFileModal,
                  changeModal: ChangeModal,
                  ebarimt: EbarimtModal,
                }}
              >
                <CategoryContextProvider>
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <main
                      className={`${sfProRounded.variable}`}
                      style={{ width: "100%", height: "100%" }}
                    >
                      <Component {...pageProps} />
                    </main>
                  </div>
                </CategoryContextProvider>
              </ModalsProvider>
            </WishlistProvider>
          </UserConfigProvider>
        </SocketProvider>
      </MantineProvider>
    </NextUIProvider>
  );
}
