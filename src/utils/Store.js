export const addCart = (product) => {
  if (typeof window !== "undefined") {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      const state = JSON.parse(storedCart);
      const existingItemIndex = state.cart_items.findIndex(
        (item) => item.id === product.id,
      );

      let updatedCartItems;
      if (existingItemIndex !== -1) {
        updatedCartItems = state.cart_items.map((item, index) => {
          if (index === existingItemIndex) {
            const price =
              product.price_sales && product.price_sales.length > 0
                ? product.price_sales[0].listPrice
                : product.listPrice;
            const newQuantity = item.quantity + product.quantity;
            return {
              ...item,
              quantity: newQuantity,
              total: newQuantity * price,
              isChecked: false,
            };
          }
          return item; // leave other items unchanged
        });
      } else {
        const price =
          product.price_sales && product.price_sales.length > 0
            ? product.price_sales[0].listPrice
            : product.listPrice;
        updatedCartItems = [
          ...state.cart_items,
          { ...product, total: product.quantity * price },
        ];
      }

      // Calculate the new cart total
      const total = updatedCartItems.reduce((sum, item) => sum + item.total, 0);

      const updatedState = {
        ...state,
        total,
        cart_items: updatedCartItems,
      };

      localStorage.setItem("cartItems", JSON.stringify(updatedState));
      window.dispatchEvent(new Event("storage"));
    } else {
      // If there is no cart in localStorage yet, create one
      const price =
        product.price_sales && product.price_sales.length > 0
          ? product.price_sales[0].listPrice
          : product.listPrice;
      const updatedState = {
        cart_items: [{ ...product, total: product.quantity * price }],
        total: product.quantity * price,
      };
      localStorage.setItem("cartItems", JSON.stringify(updatedState));
      window.dispatchEvent(new Event("storage"));
    }
  }
};

export const getCart = () => {
  if (typeof window !== "undefined") {
    const get = localStorage.getItem("cartItems");
    let state;
    if (
      get !== "undefined" &&
      get !== undefined &&
      get !== null &&
      get !== ""
    ) {
      state = JSON.parse(get);
      return state;
    }
    return state || [];
  }
};

export const removeFromCart = (listProduct) => {
  if (typeof window !== "undefined") {
    let total = 0;
    listProduct?.forEach((item) => {
      total += parseInt(item.total) || parseInt(item.quantity * item.listPrice);
    });

    const updatedState = {
      total: total,
      cart_items: listProduct,
    };
    localStorage.setItem("cartItems", JSON.stringify(updatedState));
    window.dispatchEvent(new Event("storage"));
  }
};

export const addQuantityProduct = (listProduct) => {
  if (typeof window !== "undefined") {
    let total = 0;
    listProduct?.forEach((item) => {
      total += parseInt(item.total) || parseInt(item.quantity * item.listPrice);
    });

    const updatedState = {
      total: total,
      cart_items: listProduct,
    };
    localStorage.setItem("cartItems", JSON.stringify(updatedState));
    window.dispatchEvent(new Event("storage"));
  }
};

export const removeQuantityProduct = (listProduct) => {
  if (typeof window !== "undefined") {
    let total = 0;
    listProduct?.forEach((item) => {
      total += parseInt(item.total) || parseInt(item.quantity * item.listPrice);
    });

    const updatedState = {
      total: total,
      cart_items: listProduct,
    };
    localStorage.setItem("cartItems", JSON.stringify(updatedState));
    window.dispatchEvent(new Event("storage"));
  }
};

export const emptyCart = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("cartItems");
    window.dispatchEvent(new Event("storage"));
  }
};

export const syncCart = (products) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cartItems", JSON.stringify(products));
    window.dispatchEvent(new Event("storage"));
  }
};

export const rememberMe = (user) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(user));
  }
};

export const rememberMeRemove = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user");
  }
};
