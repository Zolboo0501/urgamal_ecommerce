/* eslint-disable react-hooks/exhaustive-deps */
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import React, { useContext, useEffect, useState } from "react";
import SliderWithText from "./components/SliderWithText";
import ImageWithParaList from "./components/ImageWithParaList";
import ImageWithHyperlink from "./components/ImageWithHyperlink";

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
      <SliderWithText data={data} />
      <ImageWithParaList data={data} />
      <ImageWithHyperlink data={data} />
    </div>
  );
}
export default Landing;