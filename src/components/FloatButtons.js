/* eslint-disable react/prop-types */
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconChevronDown,
  IconChevronUp,
  IconMessage,
  IconPhone,
} from "@tabler/icons-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
const FloatButtons = ({ address, bottomRef }) => {
  const contact = address?.contact || "";
  const numbers = contact.match(/\d+/)?.[0] || "";
  const [isBottom, setIsBottom] = useState(false);
  const isBrowser = () => typeof window !== "undefined";

  const scrollToTop = () => {
    if (!isBrowser()) return;
    if (isBottom) {
      setIsBottom(false);
      return window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setIsBottom(true);
    return bottomRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 500
      ) {
        setIsBottom(true);
      } else {
        setIsBottom(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        {isBottom ? (
          <IconChevronUp className="h-5 w-5 md:h-7 md:w-7" color="#fff" />
        ) : (
          <IconChevronDown className="h-5 w-5 md:h-7 md:w-7" color="#fff" />
        )}
      </button>
    </div>
  );
};

export default FloatButtons;
