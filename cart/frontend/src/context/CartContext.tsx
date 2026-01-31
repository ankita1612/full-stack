// CartContext.tsx

import React, { createContext, useReducer, useContext, ReactNode } from "react";
import { cartReducer, initialCartState } from "./cartReducer";
import type { CartContextType, CartItem } from "../interface/product.interface";

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  const contextValue: CartContextType = {
    state,
    dispatch,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

// Custom hook to easily consume the context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
