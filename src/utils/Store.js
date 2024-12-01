export const addCart = (product) => {
  if (typeof window !== "undefined") {
    // client-side operation such as local storage.
    const get = localStorage.getItem("cartItems");
    if (get) {
      let state = JSON.parse(get);
      const existingItemIndex = state?.cart_items?.findIndex(
        (item) => item.id === product.id,
      );
      let updatedCartItems;
      if (existingItemIndex !== -1) {
        updatedCartItems = state?.cart_items?.map((item, index) => {
          if (index === existingItemIndex) {
            return {
              ...item,
              isChecked: false,
              quantity: item.quantity + product.quantity,
              total: (item.quantity + product.quantity) * item.listPrice,
            };
          }
          return item;
        });
      } else {
        updatedCartItems = [
          ...state.cart_items,
          { ...product, total: product.quantity * product.listPrice },
        ];
      }

      let total = 0;
      updatedCartItems?.forEach((item) => {
        total +=
          parseInt(item.total) || parseInt(item.quantity * item.listPrice);
      });

      const updatedState = {
        ...state,
        total: total,
        cart_items: updatedCartItems,
      };
      localStorage.setItem("cartItems", JSON.stringify(updatedState));
      window.dispatchEvent(new Event("storage"));
    } else {
      const updatedState = {
        cart_items: [
          { ...product, total: product.quantity * product.listPrice },
        ],
        total: product.quantity * product.listPrice,
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
