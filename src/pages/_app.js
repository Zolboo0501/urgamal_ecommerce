import "@/styles/globals.css";
import { MantineProvider, createEmotionCache, rem } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
const appendCache = createEmotionCache({ key: "mantine", prepend: false });
import { ModalsProvider } from "@mantine/modals";
import LoginModal from "@/components/LoginModal/LoginModal";
import { UserConfigProvider } from "@/utils/userConfigProvider";
import CategoryContextProvider from "@/utils/categoryContextProvider";
import PaymentModal from "@/components/PaymentModal/PaymentModal";
import { Commissioner } from "@next/font/google";
import BankInfoModal from "@/components/refund_modals/bankInformationmodal";
import RefundRichText from "@/components/refund_modals/descriptionModal";
import WishlistProvider from "@/utils/wishlistProvider";
import InvoiceModal from "@/components/InvoiceModal/InvoiceModal";
import InvoiceFileModal from "@/components/InvoiceModal/InvoiceFileModal";
import { NextUIProvider } from "@nextui-org/react";
import SocketProvider from "@/utils/SocketProvider";
import ChangeModal from "@/components/ChangeModal";
import EbarimtModal from "@/components/EbarimtModal";

const commissioner = Commissioner({
  subsets: ["latin"],
  variable: "--font-commissioner",
});

export default function App({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <MantineProvider
        withCSSVariables
        withGlobalStyles
        withNormalizeCSS
        emotionCache={appendCache}
        theme={{
          colorScheme: "light",
          focusRingStyles: {
            styles: (theme) => ({ outline: `${rem(1)} solid #f9bc609d` }),
            inputStyles: (theme) => ({ outline: `${rem(1)} solid #f9bc609d` }),
          },
        }}
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
                      className={`${commissioner.variable}`}
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
