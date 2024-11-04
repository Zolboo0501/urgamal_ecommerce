import dynamic from "next/dynamic";
import React from "react";

const DynamicMap = dynamic(() => import("./DynamicMap"), {
  ssr: false,
});

// Set default sizing to control aspect ratio which will scale responsively
// but also help avoid layout shift

const Map = (props) => {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <DynamicMap {...props} />
    </div>
  );
};

export default Map;
