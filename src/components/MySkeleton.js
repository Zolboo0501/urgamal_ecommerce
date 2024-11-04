/* eslint-disable react/prop-types */
import { Skeleton } from "@mantine/core";
import React from "react";

const MySkeleton = ({ key }) => {
  return (
    <div key={key || ""} className="h-full w-full rounded-md bg-white">
      <Skeleton mb="xl" width={"100%"} height={"40%"} />
      <div className="-mt-4 p-3">
        <Skeleton height={12} />
        <Skeleton height={12} mt={10} />
        <Skeleton height={12} mt={10} width="80%" />
        <Skeleton height={12} mt={10} width="50%" />
        <Skeleton height={12} mt={10} />
        <Skeleton height={12} mt={10} width="80%" />
        <Skeleton height={12} mt={10} width="50%" />
      </div>
    </div>
  );
};

export default MySkeleton;
