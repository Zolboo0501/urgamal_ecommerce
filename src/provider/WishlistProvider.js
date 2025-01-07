/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { getCookie } from "cookies-next";
import React, { createContext, useEffect, useState } from "react";
export const WishlistContext = createContext();

const WishlistProvider = ({ children }) => {
  const [wishlistData, setWishlistData] = useState([]);

  const getWishlist = async () => {
    const token = getCookie("token");
    if (token) {
      const requestOption = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/user/wishlist`,
          requestOption,
        );
        if (res.status === 200) {
          const data = await res.json();
          setWishlistData(data.data);
        }
      } catch (err) {
        console.log(err, "err");
      }
    }
  };

  useEffect(() => {
    getWishlist();
  }, []);

  const addItem = (data) => {
    const temp = [...wishlistData];
    temp.push(data);
    setWishlistData(temp);
    getWishlist();
  };

  const removeItem = (id) => {
    const temp = [...wishlistData];
    const filtered = temp.filter((item) => item.productid !== id);
    setWishlistData(filtered);
    getWishlist();
  };

  const mContext = {
    get: wishlistData,
    addItem: (data) => addItem(data),
    removeItem: (data) => removeItem(data),
  };

  return (
    <WishlistContext.Provider value={mContext}>
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistProvider;
