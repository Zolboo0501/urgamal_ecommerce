/* eslint-disable react/prop-types */
import { htmlFrom } from "@/utils/constant";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BottomFooter = ({ address, bottomRef }) => {
  return (
    <>
      {/* desktop */}
      <section className="hidden md:block" ref={bottomRef}>
        <div
          className="flex w-full justify-between bg-green2 px-6 py-8 md:flex-col lg:flex-row xl:px-8"
          style={{
            backgroundColor: address?.footer_color
              ? address?.footer_color
              : null,
          }}
        >
          <div className="flex flex-row gap-24">
            <div className="flex flex-col gap-3">
              <span className="pb-3 text-xs font-bold text-[#000] md:text-lg">
                Тусламж
              </span>
              <Link
                href={""}
                className="text-sm font-medium text-[#1C3F11] md:text-base"
              >
                Хэрэглэх заавар
              </Link>
              <Link
                href={""}
                className="text-sm font-medium text-[#1C3F11] md:text-base"
              >
                Түгээмэл асуулт
              </Link>
              <Link
                href={"tos"}
                className="text-sm font-medium text-[#1C3F11] md:text-base"
              >
                Үйлчилгээний нөхцөл
              </Link>
              <Link
                href={""}
                className="text-sm font-medium text-[#1C3F11] md:text-base"
              >
                Нууцлалын баталгаа
              </Link>
            </div>
            <div className="flex flex-col gap-1">
              <span className="pb-3 font-bold text-[#000] md:text-lg">
                Тухай
              </span>
              <Link
                href={""}
                className="text-sm font-medium text-[#1C3F11] md:text-base"
              >
                Бидний тухай
              </Link>
              <Link
                href={""}
                className="mt-2 text-sm font-medium text-[#1C3F11] md:text-base"
              >
                Вэб үйлчилгээ
              </Link>
              <Link
                href={""}
                className="mt-2 text-sm font-medium text-[#1C3F11] md:text-base"
              >
                Бүтээгдэхүүн үйлчилгээ
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="pb-1 font-bold text-[#000] md:text-lg">
                Холбоо барих
              </span>
              <div className="flex flex-row items-center">
                <Link href={"/location"}>
                  <div
                    className="text-sm font-medium text-[#1C3F11] md:text-base"
                    dangerouslySetInnerHTML={{
                      __html: htmlFrom(address?.location),
                    }}
                  />
                </Link>
              </div>
              <div className="flex flex-row items-center gap-2">
                <Image
                  alt="time"
                  className=""
                  src={"/icons/phoneFill.svg"}
                  width={24}
                  height={24}
                />
                <div
                  className="text-sm font-medium text-[#1C3F11] md:text-base"
                  dangerouslySetInnerHTML={{
                    __html: htmlFrom(address?.contact),
                  }}
                />
              </div>
              <div className="flex flex-row items-center gap-2">
                <Image
                  alt="mail"
                  className="m-1 max-xs:h-3 max-xs:w-3"
                  src={"/icons/mail.svg"}
                  width={20}
                  height={20}
                />
                <Link href={`mailto:${address?.email}`}>
                  <div
                    className="text-sm font-medium text-[#1C3F11] md:text-base"
                    dangerouslySetInnerHTML={{
                      __html: htmlFrom(address?.email),
                    }}
                  />
                </Link>
              </div>
              <div className="flex flex-row items-center gap-2">
                <Image
                  alt="mail"
                  className="m-1 max-xs:h-3 max-xs:w-3"
                  src={"/icons/time.svg"}
                  width={20}
                  height={20}
                />
                <div
                  className="text-sm font-medium text-[#1C3F11] md:text-base"
                  dangerouslySetInnerHTML={{
                    __html: htmlFrom(address?.work_hours),
                  }}
                />
              </div>
            </div>
          </div>
          <div className="mt-4 flex flex-col items-start justify-start lg:items-end">
            {address?.logo && (
              <Image
                alt={address?.logo}
                src={address?.logo}
                width={500}
                height={500}
                className="h-32 w-32 rounded object-cover"
              />
            )}
            <p className="mt-4 w-[40%] text-sm font-semibold text-black md:text-lg lg:w-[70%] lg:text-end xl:w-[60%]">
              Тэжээл, нөхөн сэргээлт, зүлгэнд зориулсан үрийн худалдаа
            </p>
            <div className="mt-3 flex gap-4">
              <Link href={"https://www.facebook.com/tarimalurgamal"}>
                <Image
                  alt={"facebook"}
                  src={"/icons/facebook-fill.svg"}
                  width={90}
                  height={80}
                  className="h-8 w-8"
                />
              </Link>
              <Link href="https://www.instagram.com/urga.mn/">
                <Image
                  alt={"instragram"}
                  src={"/icons/instagram-fill.svg"}
                  width={90}
                  height={80}
                  className="h-8 w-8 hover:text-[#1C3F11]"
                />
              </Link>
              <Link href={""}>
                <Image
                  alt={"instragram"}
                  src={"/icons/twitter-fill.svg"}
                  width={90}
                  height={80}
                  className="h-8 w-8"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* mobile */}

      <section className="block md:hidden">
        <footer
          className="bg-green2"
          style={{
            backgroundColor: address?.footer_color
              ? address?.footer_color
              : null,
          }}
        >
          <div className="mx-auto w-full max-w-screen-xl p-4 py-6">
            <div className="block">
              <div className="mb-12 grid grid-cols-2 gap-8">
                <div>
                  <h2 className="mb-6 text-sm font-semibold uppercase text-gray-900">
                    Тухай
                  </h2>
                  <ul className="font-medium text-gray-600">
                    <li className="mb-4">
                      <a
                        href="https://flowbite.com/"
                        className="hover:underline"
                      >
                        Бидний тухай
                      </a>
                    </li>
                    <li className="mb-4">
                      <a
                        href="https://tailwindcss.com/"
                        className="hover:underline"
                      >
                        Вэб үйлчилгээ
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://tailwindcss.com/"
                        className="hover:underline"
                      >
                        Бүтээгдэхүүн үйлчилгээ
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h2 className="mb-6 text-sm font-semibold uppercase text-gray-900">
                    Тусламж
                  </h2>
                  <ul className="font-medium text-gray-600">
                    <li className="mb-4">
                      <a
                        href="https://github.com/themesberg/flowbite"
                        className="hover:underline"
                      >
                        Хэрэглэх заавар
                      </a>
                    </li>
                    <li className="mb-4">
                      <a
                        href="https://github.com/themesberg/flowbite"
                        className="hover:underline"
                      >
                        Түгээмэл асуулт
                      </a>
                    </li>
                    <li className="mb-4">
                      <a href="tos" className="hover:underline">
                        Үйлчилгээний нөхцөл
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://discord.gg/4eeurUVvTy"
                        className="hover:underline"
                      >
                        Нууцлалын баталгаа
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <ul className="font-medium text-gray-600">
                  <li className="mb-4">
                    <a
                      href="#"
                      className="hover:underline"
                      dangerouslySetInnerHTML={{
                        __html: htmlFrom(address?.location),
                      }}
                    ></a>
                  </li>
                  <li className="mb-4">
                    <a
                      href="#"
                      className="hover:underline"
                      dangerouslySetInnerHTML={{
                        __html: htmlFrom(address?.contact),
                      }}
                    ></a>
                  </li>
                  <li className="mb-4">
                    <a
                      href="#"
                      className="hover:underline"
                      dangerouslySetInnerHTML={{
                        __html: htmlFrom(address?.work_hours),
                      }}
                    ></a>
                  </li>
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      Майл : tarimalurgamal2016@gmail.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <hr className="my-6 border-gray-200" />
            <div className="block">
              <div className="mt-4 flex space-x-6">
                <Link
                  href="https://www.facebook.com/tarimalurgamal"
                  className="text-gray-500 hover:text-gray-900"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="sr-only">Facebook page</span>
                </Link>
                <Link
                  href="https://www.instagram.com/urga.mn/"
                  className="text-gray-500 hover:text-gray-900"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="sr-only">Instagram page</span>
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </section>
    </>
  );
};

export default BottomFooter;
