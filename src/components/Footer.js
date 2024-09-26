import { htmlFrom } from "@/utils/constant";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
const BottomFooter = ({ address, links }) => {
  return (
    <>
      {/* desktop */}
      <div className="hidden md:block">
        <div
          className="flex md:flex-col lg:flex-row justify-between py-8 bg-green2 w-full px-6 xl:px-8 "
          style={{
            backgroundColor: address?.footer_color
              ? address?.footer_color
              : null,
          }}
        >
          <div className="flex flex-row gap-24">
            <div className="flex flex-col gap-3 ">
              <span className="font-bold text-xs text-[#000] md:text-lg pb-3">
                Тусламж
              </span>
              <Link
                href={""}
                className="text-sm md:text-base font-medium text-[#1C3F11]"
              >
                Хэрэглэх заавар
              </Link>
              <Link
                href={""}
                className="text-sm md:text-base font-medium text-[#1C3F11]"
              >
                Түгээмэл асуулт
              </Link>
              <Link
                href={""}
                className="text-sm md:text-base font-medium text-[#1C3F11]"
              >
                Үйлчилгээний нөхцөл
              </Link>
              <Link
                href={""}
                className="text-sm md:text-base font-medium text-[#1C3F11]"
              >
                Нууцлалын баталгаа
              </Link>
            </div>
            <div className="flex flex-col gap-1 ">
              <span className="font-bold text-[#000] md:text-lg pb-3">
                Тухай
              </span>
              <Link
                href={""}
                className="text-sm md:text-base font-medium text-[#1C3F11]"
              >
                Бидний тухай
              </Link>
              <Link
                href={""}
                className="text-sm md:text-base font-medium mt-2 text-[#1C3F11] "
              >
                Вэб үйлчилгээ
              </Link>
              <Link
                href={""}
                className="text-sm md:text-base font-medium mt-2 text-[#1C3F11]"
              >
                Бүтээгдэхүүн үйлчилгээ
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-bold text-[#000] md:text-lg pb-1">
                Холбоо барих
              </span>
              <div className="flex flex-row items-center gap-2">
                <Image
                  alt="time"
                  className=""
                  src={"/icons/phoneFill.svg"}
                  width={24}
                  height={24}
                />
                <div
                  className="text-sm md:text-base font-medium text-[#1C3F11]"
                  dangerouslySetInnerHTML={{
                    __html: htmlFrom(address?.contact),
                  }}
                />
              </div>
              <div className="flex flex-row items-center gap-2">
                <Image
                  alt="mail"
                  className="m-1 max-xs:w-3 max-xs:h-3  "
                  src={"/icons/mail.svg"}
                  width={20}
                  height={20}
                />
                <Link href={`mailto:${"tarimalurgamal2016@gmail.com"}`}>
                  <p className="text-sm md:text-base font-medium text-[#1C3F11]">
                    tarimalurgamal2016@gmail.com
                  </p>
                </Link>
              </div>
              <div className="flex flex-row items-center gap-2">
                <Image
                  alt="mail"
                  className="m-1 max-xs:w-3 max-xs:h-3  "
                  src={"/icons/time.svg"}
                  width={20}
                  height={20}
                />
                <div
                  className="text-sm md:text-base font-medium text-[#1C3F11]"
                  dangerouslySetInnerHTML={{
                    __html: htmlFrom(address?.work_hours),
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-4 items-start justify-start  lg:items-end">
            {address?.logo && (
              <Image
                alt={address?.logo}
                src={address?.logo}
                width={90}
                height={80}
                className="w-32 h-32 rounded"
              />
            )}
            <p className="mt-4 text-sm md:text-lg lg:text-end font-semibold text-black w-[40%] lg:w-[70%] xl:w-[60%]">
              Тэжээл, нөхөн сэргээлт, зүлгэнд зориулсан үрийн худалдаа
            </p>
            <div className="flex mt-3 gap-4">
              <Link href={"https://www.facebook.com/tarimalurgamal"}>
                <Image
                  alt={"facebook"}
                  src={"/icons/facebook-fill.svg"}
                  width={90}
                  height={80}
                  className=" w-8 h-8 "
                />
              </Link>
              <Link href="https://www.instagram.com/urga.mn/">
                <Image
                  alt={"instragram"}
                  src={"/icons/instagram-fill.svg"}
                  width={90}
                  height={80}
                  className=" w-8 h-8 hover:text-[#1C3F11]"
                />
              </Link>
              <Link href={""}>
                <Image
                  alt={"instragram"}
                  src={"/icons/twitter-fill.svg"}
                  width={90}
                  height={80}
                  className=" w-8 h-8 "
                />
              </Link>
            </div>
          </div>
        </div>
        <div
          className="justify-center items-center flex shadow-inner py-2 bg-primary200 border-t-1"
          style={{
            backgroundColor: address?.footer_color
              ? address?.footer_color
              : null,
          }}
        >
          <div className="w-[80%] flex items-center justify-center ">
            <Link
              className="flex flex-row mt-1 hover:text-white items-center text-center"
              href="/location"
            >
              <div
                className="text-base ml-2 max-xs:text-sm-5 text-[#1C3F11]  font-bold"
                dangerouslySetInnerHTML={{
                  __html: htmlFrom(address?.location),
                }}
              ></div>
            </Link>
          </div>
        </div>
      </div>

      {/* mobile */}

      <div className="block md:hidden">
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
              <div className="grid grid-cols-2 gap-8 mb-12">
                <div>
                  <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                    Тухай
                  </h2>
                  <ul className="text-gray-600 font-medium">
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
                  <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                    Тусламж
                  </h2>
                  <ul className="text-gray-600 font-medium">
                    <li className="mb-4">
                      <a
                        href="https://github.com/themesberg/flowbite"
                        className="hover:underline "
                      >
                        Хэрэглэх заавар
                      </a>
                    </li>
                    <li className="mb-4">
                      <a
                        href="https://github.com/themesberg/flowbite"
                        className="hover:underline "
                      >
                        Түгээмэл асуулт
                      </a>
                    </li>
                    <li className="mb-4">
                      <a
                        href="https://github.com/themesberg/flowbite"
                        className="hover:underline "
                      >
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
                <ul className="text-gray-600 font-medium">
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
              <div className="flex mt-4 space-x-6">
                <a href="#" className="text-gray-500 hover:text-gray-900">
                  <svg
                    className="w-5 h-5"
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
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-900">
                  <svg
                    className="w-5 h-5"
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
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-900">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                  <span className="sr-only">Twitter page</span>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default BottomFooter;
