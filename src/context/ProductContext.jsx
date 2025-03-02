import React, { createContext, useState } from "react";
export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState({});
  const [posts, setPosts] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        posts,
        setPosts,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
