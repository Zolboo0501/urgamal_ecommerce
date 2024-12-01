/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
// eslint-disable-next-line no-undef
const { createContext, useState, useEffect } = require("react");
import { fetchMethod } from "../utils/fetch";

export const CategoryContext = createContext();

const CategoryContextProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  const getCats = async () => {
    const data = await fetchMethod("GET", "product/cat-list");
    if (data?.success) {
      setCategories(data?.categories);
    }
  };

  useEffect(() => {
    getCats();
  }, []);

  return (
    <CategoryContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoryContext.Provider>
  );
};
export default CategoryContextProvider;
