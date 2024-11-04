import { useContext } from "react";
import { WishlistContext } from "../utils/wishlistProvider";

const useWishlist = () => {
  const mContext = useContext(WishlistContext);

  return mContext;
};

export default useWishlist;
