/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React from "react";

const EbarimtModal = ({ context, innerProps }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <img
        src={"data:image/jpeg;base64," + innerProps?.paymentData?.lottery_qr}
        alt="Base64 Qr"
        width={64}
        height={64}
        className="h-64 w-64"
      />
      <div className="container w-[90%] flex-col">
        <div className="flex flex-row justify-between">
          <span className="text-grey600">Сугалааны дугаар :</span>
          <span className="text-base font-semibold">
            {innerProps?.paymentData?.lottery_code}
          </span>
        </div>
        <div className="flex flex-row justify-between">
          <span className="text-grey600">Нийт дүн :</span>
          <span className="text-base font-semibold">
            {innerProps?.paymentData?.total}₮
          </span>
        </div>
      </div>
    </div>
  );
};

export default EbarimtModal;
