/* eslint-disable react/prop-types */
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconChevronUp,
  IconMessage,
  IconPhone,
} from "@tabler/icons-react";
import Link from "next/link";
import React from "react";
const FloatButtons = ({ address }) => {
  const contact = address?.contact || "";
  const numbers = contact.match(/\d+/)?.[0] || "";

  const isBrowser = () => typeof window !== "undefined";

  const scrollToTop = () => {
    if (!isBrowser()) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-20 right-4 z-50 flex flex-col items-center justify-center gap-3">
      <Link
        href={`tel:${numbers}}`}
        className="rounded-full bg-primary10 p-2.5 md:p-3.5"
      >
        <IconPhone className="h-5 w-5 md:h-7 md:w-7" color="#fff" />
      </Link>
      <Link
        href="https://www.instagram.com/urga.mn/"
        className="rounded-full bg-primary10 p-2.5 md:p-3.5"
      >
        <IconBrandInstagram className="h-5 w-5 md:h-7 md:w-7" color="#fff" />
      </Link>
      <Link
        href="https://www.facebook.com/tarimalurgamal"
        className="rounded-full bg-primary10 p-2.5 md:p-3.5"
      >
        <IconBrandFacebook className="h-5 w-5 md:h-7 md:w-7" color="#fff" />
      </Link>
      <Link
        href="http://m.me/tarimalurgamal"
        className="rounded-full bg-primary10 p-2.5 md:p-3.5"
      >
        <IconMessage className="h-5 w-5 md:h-7 md:w-7" color="#fff" />
      </Link>
      <button
        onClick={() => scrollToTop()}
        href="http://m.me/tarimalurgamal"
        className="rounded-full bg-primary10 p-2.5 md:p-3.5"
      >
        <IconChevronUp className="h-5 w-5 md:h-7 md:w-7" color="#fff" />
      </button>
    </div>
  );
};

export default FloatButtons;
