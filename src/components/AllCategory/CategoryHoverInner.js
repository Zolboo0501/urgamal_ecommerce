import { rem } from "@mantine/core";
import { IconArrowBigRight, IconMacroOff } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

const CategoryHoverInner = ({ item }) => {
  return (
    <div>
      {item?.child_cats?.length > 0 ? (
        <>
          <span className="mt-1 mb-3 text-grey600 text-base">
            Дотоод ангилал
          </span>
          {item?.child_cats?.map((item, index) => {
            if (index < 20) {
              return (
                <Link
                  href={`/category/${item.id}`}
                  key={index}
                  className="py-2 text-sm hover:text-primary text-grey600 font-semibold flex flex-row justify-between w-96"
                >
                  {item?.name}
                </Link>
              );
            }
          })}
          <Link
            className="mt-4 text-md text-primary flex flex-row items-center gap-2"
            href={`/category/${item.id}`}
          >
            Бүгдийг үзэх
            <IconArrowBigRight size={rem(16)} />
          </Link>
        </>
      ) : (
        <div className="flex justify-center items-center w-[32rem] h-60 flex-col">
          <IconMacroOff color="#F9BC60" size={40} />
          Ангилал хоосон байна.
        </div>
      )}
    </div>
  );
};

export default CategoryHoverInner;
