/* eslint-disable no-undef */
import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      "2xs": "320px",
      xs: "420px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1890px",
    },
    fontSize: {
      "sm-5": "0.5rem",
      "sm-4": "0.55rem",
      "sm-3": "0.6rem",
      "sm-2": "0.65rem",
      "sm-1": "0.7rem",
      xs: "0.75rem",
      md: "0.8rem",
      "md-2": "0.85rem",
      sm: "0.875rem",
      ss: "0.95rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      xxl: "2rem",
    },
    extend: {
      animation: {
        "infinite-scroll": "infinite-scroll 25s linear infinite",
      },
      keyframes: {
        "infinite-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
      },
      fontFamily: {
        sf: ["var(--font-sf)"],
      },
      fontWeight: {
        ultralight: 100,
        thin: 200,
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
      colors: {
        "main-background": "#3E503C",
        "nav-background": "#F6F7FB",
        number: "#E16162",
        "background-sort": "#F9BC60",
        primary10: "#15B392",
        primary20: "#54C392",
        primary30: "#73EC8B",
        primary40: "#D2FF72",
        primary: "#40C057",
        primary25: "#E6F9E9",
        primary50: "#CCF4D3",
        primary100: "#99E9A6",
        primary200: "#66DE7A",
        primary300: "#33D34D",
        primary400: "#1ABB33",
        primary500: "#40C057",
        primary600: "#369A46",
        primary700: "#2D7E39",
        "search-background": "rgba(235, 239, 238, 0.9)",
        green: "#5B8151",
        grey: "rgba(0, 30, 29, 0.55)",
        green2: "#B8E986",
        // green2: "#149c5c",
        tertiary: "#e16162",
        "chip-text": "#173140",
        grey25: "#FCFCFD",
        grey50: "#F9FAFB",
        grey100: "#F2F4F7",
        grey200: "#EAECF0",
        grey300: "#D0D5DD",
        grey400: "#98A2B3",
        grey500: "#667085",
        grey600: "#475467",
        grey700: "#344054",
        grey800: "#1D2939",
        grey900: "#101828",
        success: "#D1FADF",
        success400: "#32D583",
      },
      textColor: {
        "greenish-grey": "rgba(53, 105, 102, 0.75)",
        description: "#001E1D",
        tertiary: "#e16162",
        primary: "#40C057",
        primary10: "#15B392",
        primary20: "#54C392",
        primary30: "#73EC8B",
        primary40: "#D2FF72",
        primary25: "#E6F9E9",
        primary50: "#CCF4D3",
        primary100: "#99E9A6",
        primary200: "#66DE7A",
        primary300: "#33D34D",
        primary400: "#1ABB33",
        primary500: "#40C057",
        primary600: "#369A46",
        primary700: "#2D7E39",
        primary2: "#48BE5B",
      },
      backgroundColor: {
        main: "#F1F4F0",
        "chip-grey": "rgba(53, 105, 102, 0.25)",
        "button-yellow": "#F9BC60",
        "grey-back": "#EBEFEE",
        "sutble-blue": "rgba(25, 113, 194, 0.2)",
      },
      borderColor: {
        "button-yellow": "#F9BC60",
      },
    },
  },
  plugins: [nextui()],
};

export default config;
