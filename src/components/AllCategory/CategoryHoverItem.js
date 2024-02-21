import { rem } from "@mantine/core";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";

const CategoryHoverItem = ({ item, index }) => {
  return (
    <div
      key={index}
      className="py-2 text-sm font-normal flex flex-row justify-between w-80 items-center hover:text-[#F9BC60]"
    >
      {item?.name}
      <IoIosArrowForward size={rem(16)} />
    </div>
  );
};

export default CategoryHoverItem;
