/* eslint-disable react/prop-types */
import { SimpleGrid, Stack } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import MySkeleton from "../MySkeleton";
import React from "react";

export default function ProductGridList({
  children,
  showSkeleton,
  isEmpty,
  className,
}) {
  return isEmpty ? (
    <div className={`mt-32 flex h-screen w-full items-start justify-center`}>
      <Stack align="center" className="grow">
        <IconSearch size="2rem" stroke={1.5} />
        <p className="text-lg font-normal">Ангилал дээрх бараа олдсонгүй...</p>
      </Stack>
    </div>
  ) : (
    <SimpleGrid
      type="container"
      cols={{
        "300px": 1,
        "400px": 2,
        "640px": 3,
        "900px": 4,
        "1200px": 5,
        "1500px": 6,
      }}
      spacing={20}
      verticalSpacing={20}
      className={className}
    >
      {children}
      {showSkeleton &&
        new Array(5)
          .fill(null)
          .map((e, index) => <MySkeleton key={`product-skeleton-${index}`} />)}
    </SimpleGrid>
  );
}
