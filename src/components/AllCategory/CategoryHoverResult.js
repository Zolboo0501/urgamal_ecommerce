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
    <div className="z-30 flex flex-row items-center justify-center bg-red-300 absolute left-[707px] top-0 rounded-md py-6 px-6 w-full max-w-[20rem] h-[32rem] overflow-auto">
      <div className="flex flex-col flex-wrap items-start px-8" key={index}>
        {item?.map((item, index) => (
          <Link
            href={`/category/${item.id}`}
            key={index}
            className="py-2 text-sm hover:text-primary text-grey600 font-semibold flex flex-row justify-between w-96"
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
