import type {
  CartState,
  CartAction,
  CartItem,
} from "../interface/product.interface";

export const initialCartState: CartState = {
  items: [],
  itemCount: 0,
};

export const cartReducer = (state: CartState,action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id,
      );
      let updatedItems: CartItem[];

      if (existingItemIndex > -1) {
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity:
            updatedItems[existingItemIndex].quantity + action.payload.quantity,
        };
      } else {
        updatedItems = [...state.items, action.payload];
      }

      return {
        ...state,
        items: updatedItems,
        itemCount: updatedItems.reduce(
          (count, item) => count + item.quantity,
          0,
        ),
      };
    }
    case "REMOVE_ITEM": {
      const updatedItems = state.items.map(item =>
        item._id === action.payload.id ? { ...item, quantity: item.quantity - 1 }: item
      )
      .filter(item => item.quantity > 0); // remove if reaches 0

      return {
        ...state,
        items: updatedItems,
        itemCount: updatedItems.reduce((c, i) => c + i.quantity, 0),
      }; 
}
    case "CLEAR_CART":
      return initialCartState;
    default:
      return state;
  }
};
