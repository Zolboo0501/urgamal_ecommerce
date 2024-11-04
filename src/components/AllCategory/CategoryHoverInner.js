/* eslint-disable react/prop-types */
import { rem } from "@mantine/core";
import { IconArrowBigRight, IconMacroOff } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

const CategoryHoverInner = ({ item }) => {
  return (
    <div>
      {item?.child_cats?.length > 0 ? (
        <>
          <span className="mb-3 mt-1 text-base text-grey600">
            Дотоод ангилал
          </span>
          {item?.child_cats?.map((item, index) => {
            if (index < 20) {
              return (
                <Link
                  href={`/category/${item.id}`}
                  key={index}
                  className="flex w-96 flex-row justify-between py-2 text-sm font-semibold text-grey600 hover:text-primary"
                >
                  {item?.name}
                </Link>
              );
            }
          })}
          <Link
            className="mt-4 flex flex-row items-center gap-2 text-md text-primary"
            href={`/category/${item.id}`}
          >
            Бүгдийг үзэх
            <IconArrowBigRight size={rem(16)} />
          </Link>
        </>
      ) : (
        <div className="flex h-60 w-[32rem] flex-col items-center justify-center">
          <IconMacroOff color="#F9BC60" size={40} />
          Ангилал хоосон байна.
        </div>
      )}
    </div>
  );
};

export default CategoryHoverInner;
