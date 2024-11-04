/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Loader } from "@mantine/core";
import CategoryHoverItem from "./CategoryHoverItem";
import { IconMacroOff } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

const CategoryHover = ({ loading, categories, parentId }) => {
  const [filterData, setFilterData] = useState([]);
  const [secondaryId, setSecondaryId] = useState("");

  return loading ? (
    <div className="flex h-96 w-full items-center justify-center">
      <Loader color="teal" />
    </div>
  ) : categories?.length > 0 ? (
    <div className="flex h-full w-full flex-row">
      <div className="flex flex-col justify-start pl-8">
        <p className="py-2 font-semibold text-grey500">Дэд ангилал</p>
        {categories &&
          categories?.map((item, index) => (
            <Link
              href={{
                pathname: `/category/${item?.id}`,
                query: { parent_id: parentId, secondary_id: item?.id },
              }}
              key={index}
              className="flex w-80 flex-row items-center gap-2"
              onMouseEnter={() => {
                setFilterData(item?.tertiary_cats);
                setSecondaryId(item?.id);
              }}
            >
              {item.icon && (
                <Image src={item.icon} width={24} height={24} alt="icon" />
              )}

              <CategoryHoverItem item={item} index={index} />
            </Link>
          ))}
      </div>
      <div className="flex h-full w-[30rem] max-w-[40rem] flex-col pl-8">
        <p className="py-2 font-semibold text-grey500">Дотоод ангилал</p>
        {filterData?.map((item, index) => (
          <Link
            href={{
              pathname: `/category/${item?.id}`,
              query: {
                parent_id: parentId,
                secondary_id: secondaryId,
                tertiary_id: item?.id,
              },
            }}
            key={index}
            className="flex flex-row items-center justify-between py-2 text-sm font-semibold text-grey600 hover:text-[#F9BC60]"
          >
            {item?.name}
            {/* //! pisd sum neheed bvl butsaagarai ..... */}
            {/* <IoIosArrowForward size={rem(16)} /> */}
          </Link>
        ))}
      </div>
    </div>
  ) : (
    <div className="text-md-1 flex flex-col items-center justify-center gap-3 bg-red-500 font-semibold">
      <IconMacroOff color="#F9BC60" size={40} />
      <span>Ангилал хоосон байна.</span>
    </div>
  );
};

export default CategoryHover;
