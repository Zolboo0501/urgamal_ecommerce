/* eslint-disable react/prop-types */
import { htmlFrom } from "@/utils/constant";
import React from "react";
const TosModal = ({ innerProps }) => {
  return (
    <div
      className="tos-container p-4"
      dangerouslySetInnerHTML={{
        __html: htmlFrom(innerProps?.data),
      }}
    />
  );
};

export default TosModal;
