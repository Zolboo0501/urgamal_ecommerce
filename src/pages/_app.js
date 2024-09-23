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
import { MantineProvider, createEmotionCache, rem } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { NextUIProvider } from "@nextui-org/react";
import { sfProRounded } from "public/fonts";
const appendCache = createEmotionCache({ key: "mantine", prepend: false });

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
          fontFamily: sfProRounded.style.fontFamily,
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
