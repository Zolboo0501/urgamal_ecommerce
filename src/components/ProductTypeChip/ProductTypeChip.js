import React from "react";

export default function ProductTypeChip({ name }) {
  return (
    <div className="rounded-md bg-chip-grey px-2 py-[2px]">
      <span className="text-sm font-semibold text-chip-text">{name}</span>
    </div>
  );
}
