/* eslint-disable react-hooks/exhaustive-deps */
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import React, { useContext, useEffect, useState } from "react";
import SliderWithText from "../landing/components/SliderWithText";
import ImageWithParaList from "../landing/components/ImageWithParaList";
import ImageWithHyperlink from "../landing/components/ImageWithHyperlink";
import BannerToTheRight from "../landing/components/BannerToTheRight";
import ParaUnderImage from "../landing/components/ParaUnderImage";
import ParaRight from "../landing/components/ParaRight";
import TextSandwich from "../landing/components/TextSandwich";
import MultipleArray from "../landing/components/MultipleArray";

const Landing = () => {
  const [data, setData] = useState({
    type: "default"
  });
  const getLandingData = async () => {
    await fetch("http://localhost:3003/dev/page?slug=slug", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
      });
  }
  useEffect(() => {
    console.log("Landing");
    getLandingData();
  }
    , []);
  return (
    <div className="mx-auto w-[900px]">
      <BannerToTheRight data={data} />
      <ParaUnderImage data={data} />
      <ParaRight data={data} />
      <TextSandwich data={data} />
      <MultipleArray data={data} />
    </div>
  );
}
export default Landing;