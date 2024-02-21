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
    <div className="w-full justify-center items-center flex h-96">
      <Loader color="yellow" />
    </div>
  ) : categories?.length > 0 ? (
    <div className="flex flex-row h-full w-full">
      <div className="flex flex-col justify-start pl-8">
        <p className="font-semibold text-grey500 py-2">Дэд ангилал</p>
        {categories &&
          categories?.map((item, index) => (
            <Link
              href={{
                pathname: `/category/${item?.id}`,
                query: { parent_id: parentId, secondary_id: item?.id },
              }}
              key={index}
              className="flex flex-row gap-2 items-center w-80"
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
      <div className="w-[30rem] max-w-[40rem] h-full flex flex-col pl-8">
        <p className="font-semibold text-grey500 py-2">Дотоод ангилал</p>
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
            className="py-2 text-sm text-grey600 font-semibold flex flex-row justify-between items-center hover:text-[#F9BC60]"
          >
            {item?.name}
            {/* //! pisd sum neheed bvl butsaagarai ..... */}
            {/* <IoIosArrowForward size={rem(16)} /> */}
          </Link>
        ))}
      </div>
    </div>
  ) : (
    <div className="bg-red-500 flex-col flex justify-center items-center gap-3 font-semibold text-md-1">
      <IconMacroOff color="#F9BC60" size={40} />
      <span>Ангилал хоосон байна.</span>
    </div>
  );
};

export default CategoryHover;
