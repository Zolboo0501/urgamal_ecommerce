import localFont from "next/font/local";
export const sfProRounded = localFont({
  src: [
    {
      path: "../../public/fonts/SF-Pro-Rounded-Ultralight.otf",
      weight: "100",
    },
    {
      path: "../../public/fonts/SF-Pro-Rounded-Thin.otf",
      weight: "200",
    },
    {
      path: "../../public/fonts/SF-Pro-Rounded-Light.otf",
      weight: "300",
    },
    {
      path: "../../public/fonts/SF-Pro-Rounded-Regular.otf",
      weight: "400",
    },
    {
      path: "../../public/fonts/SF-Pro-Rounded-Medium.otf",
      weight: "500",
    },
    {
      path: "../../public/fonts/SF-Pro-Rounded-Semibold.otf",
      weight: "600",
    },
    {
      path: "../../public/fonts/SF-Pro-Rounded-Bold.otf",
      weight: "700",
    },
  ],
  variable: "--font-sf",
});
