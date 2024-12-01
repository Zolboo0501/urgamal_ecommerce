// useActivePage.js
import { useContext } from "react";
import { ActivePageContext } from "@/provider/ActivePageProvider"; // Ensure the path is correct

const useActivePage = () => {
  const mContext = useContext(ActivePageContext);

  // Throw an error if the context is undefined (useful for debugging)
  if (!mContext) {
    throw new Error("useActivePage must be used within an ActivePageProvider");
  }

  return mContext;
};

export default useActivePage;
