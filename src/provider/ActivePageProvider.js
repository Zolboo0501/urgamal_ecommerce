// ActivePageProvider.js
import React, { createContext, useState } from "react";

// Create the context object
export const ActivePageContext = createContext();

// eslint-disable-next-line react/prop-types
export const ActivePageProvider = ({ children }) => {
  const [activePage, setActivePage] = useState(1);

  const mContext = {
    activePage,
    setActivePage,
  };

  return (
    <ActivePageContext.Provider value={mContext}>
      {children}
    </ActivePageContext.Provider>
  );
};
