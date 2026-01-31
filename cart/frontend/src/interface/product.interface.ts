export interface IProduct {
  _id:string;
  name: string;
  product_image: string;
  qty: number;  
  price: number
}

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

// Type for the overall state of the cart
export type CartState = {
  items: CartItem[];
  itemCount: number;
};

// Types for actions that can be dispatched
export type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'CLEAR_CART' };

// Type for the context value (state and dispatch function)
export type CartContextType = {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
};