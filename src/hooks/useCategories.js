import { CategoryContext } from "@/provider/CategoryContextProvider";
import { useContext } from "react";

const useCategories = () => {
  const mContext = useContext(CategoryContext);

  return mContext;
};

export default useCategories;
