import { rem } from "@mantine/core";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";

const CategoryHoverItem = ({ item, index }) => {
  return (
    <div
      key={index}
      className="flex w-80 flex-row items-center justify-between py-2 text-sm font-normal hover:text-[#F9BC60]"
    >
      {item?.name}
      <IoIosArrowForward size={rem(16)} />
    </div>
  );
};

export default CategoryHoverItem;
