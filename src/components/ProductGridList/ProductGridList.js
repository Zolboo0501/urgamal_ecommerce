/* eslint-disable react/no-unescaped-entities */
import { SimpleGrid, Stack } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import MySkeleton from "../MySkeleton";

export default function ProductGridList({
  children,
  showSkeleton,
  isEmpty,
  emptyStateMessage,
  query,
  className,
}) {
  return isEmpty ? (
    <div className={`w-full h-screen flex justify-center items-start mt-32`}>
      <Stack align="center" className=" grow">
        <IconSearch size="2rem" stroke={1.5} />
        <p class="text-lg font-normal">Ангилал дээрх бараа олдсонгүй...</p>
      </Stack>
    </div>
  ) : (
    <SimpleGrid
      cols={4}
      spacing={20}
      verticalSpacing={20}
      className={className}
      breakpoints={[
        { maxWidth: "110em", cols: 4, spacing: "md" },
        { maxWidth: "90em", cols: 3, spacing: "md" },
        { maxWidth: "74em", cols: 3, spacing: "md" },
        { maxWidth: "64em", cols: 3, spacing: "md" },
        { maxWidth: "48rem", cols: 2, spacing: "sm" },
        { maxWidth: "30em", cols: 1, spacing: "xs" },
      ]}
    >
      {children}
      {showSkeleton &&
        new Array(5).fill(null).map((e, index) => {
          return <MySkeleton key={`product-skeleton-${index}`} />;
        })}
    </SimpleGrid>
  );
}
