import React from "react";
import { FacebookProvider, CustomChat } from "react-facebook";
const FacebookMsg = () => {
  return (
    <FacebookProvider appId="1494961574670512" chatSupport>
      <CustomChat pageId="397673053768058" minimized={false} />
    </FacebookProvider>
  );
};

export default FacebookMsg;
