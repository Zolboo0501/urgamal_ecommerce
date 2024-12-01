import { useContext } from "react";
import { WishlistContext } from "../provider/WishlistProvider";

const useWishlist = () => {
  const mContext = useContext(WishlistContext);

  return mContext;
};

export default useWishlist;
