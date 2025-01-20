"use client";
import GlobalLayout from "@/components/GlobalLayout/GlobalLayout";
import { fetchMethod } from "@/utils/fetch";
import React, { useEffect, useState } from "react";
import animationData from "/public/lottie/tos.json";
import dynamic from "next/dynamic";
import { htmlFrom } from "@/utils/constant";
import { Loader } from "@mantine/core";

// Dynamically import the Lottie component with SSR disabled
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const index = () => {
  const [tos, setTos] = useState();

  useEffect(() => {
    getTos();
  }, []);

  const getTos = async () => {
    const res = await fetchMethod("GET", "/config/tos");
    if (res.success) {
      setTos(res.data);
    } else {
      console.log(res.error);
    }
  };

  if (!tos) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader color="green" />
      </div>
    );
  }
  return (
    <GlobalLayout>
      <div className="flex max-h-[800px] flex-col gap-4 overflow-auto p-4 lg:flex-row">
        <div className="max-w-[450px] flex-shrink-0 self-center bg-slate-50 xl:max-w-[45%]">
          <Lottie animationData={animationData} loop={true} />
        </div>
        <div
          className="tos-container overflow-auto p-4"
          dangerouslySetInnerHTML={{
            __html: htmlFrom(tos?.content),
          }}
        />
      </div>
    </GlobalLayout>
  );
};

export default index;
