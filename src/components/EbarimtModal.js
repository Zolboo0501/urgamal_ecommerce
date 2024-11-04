/* eslint-disable react/prop-types */
import { IconAward, IconPremiumRights } from "@tabler/icons-react";

import React from "react";

const EbarimtModal = ({ innerProps }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <img
        src={"data:image/jpeg;base64," + innerProps?.paymentData?.lottery_qr}
        alt="Base64 Qr"
        width={64}
        height={64}
        className="h-64 w-64"
      />
      <div className="container mt-2 flex w-[90%] flex-col gap-2">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-center gap-1">
            <IconAward color="#475467" />
            <p className="text-base text-[#696A6C] lg:text-base">
              Сугалааны дугаар :
            </p>
          </div>
          <span className="text-base font-bold">
            {innerProps?.paymentData?.lottery_code}
          </span>
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-center gap-1">
            <IconPremiumRights color="#475467" />
            <p className="text-base text-[#696A6C] lg:text-base">Нийт дүн :</p>
          </div>
          <span className="text-base font-bold">
            {innerProps?.paymentData?.total}₮
          </span>
        </div>
      </div>
    </div>
  );
};

export default EbarimtModal;
