/* eslint-disable react/prop-types */
import React, { useState } from "react";
import CategoryHoverInner from "./CategoryHoverInner";
import { IoIosArrowForward } from "react-icons/io";
import { rem } from "@mantine/core";
import Link from "next/link";

const CategoryHoverResult = ({ item, index }) => {
  const [filterData, setFilterData] = useState([]);

  const handleEnter = (item) => {
    setFilterData(item);
  };

  return (
    <div className="absolute left-[707px] top-0 z-30 flex h-[32rem] w-full max-w-[20rem] flex-row items-center justify-center overflow-auto rounded-md bg-red-300 px-6 py-6">
      <div className="flex flex-col flex-wrap items-start px-8" key={index}>
        {item?.map((item, index) => (
          <Link
            href={`/category/${item.id}`}
            key={index}
            className="flex w-96 flex-row justify-between py-2 text-sm font-semibold text-grey600 hover:text-primary"
            onMouseEnter={() => {
              handleEnter(item);
            }}
          >
            {item?.name}
            <IoIosArrowForward size={rem(16)} />
          </Link>
        ))}
      </div>
      <CategoryHoverInner item={filterData} />
    </div>
  );
};

export default CategoryHoverResult;
