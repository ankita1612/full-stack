import { Button } from "react-bootstrap";
import type { IProduct, CartItem } from "../interface/product.interface";
import Image from "react-bootstrap/Image";
import { useState, useContext } from "react";
import { useCart } from "../context/CartContext";

type productProp = {
  product: IProduct;
};
function ProductRow(prop: productProp) {
  const { dispatch } = useCart();

  const [cntr, setCntr] = useState(0);
  const addItem = (product: IProduct) => {
    if (cntr < prop.product.qty) {
      setCntr((p) => p + 1);
      dispatch({
        type: "ADD_ITEM",
        payload: { ...product, id: product._id, quantity: 1 },
      });
    }
  };
  const removeItem = (id: string) => {
    if (cntr > 0) {
      setCntr((p) => p - 1);
      dispatch({
        type: "REMOVE_ITEM",
        payload: { id },
      });
    }
  };
  return (
    <tr>
      <td>
        {/* {JSON.stringify(user)} */}
        <Image
          src={prop.product.product_image}
          style={{ height: "100px", width: "100px" }}
        ></Image>
      </td>
      <td>{prop.product.name}</td>
      <td>{prop.product.price}</td>
      <td>Total {prop.product.qty}</td>
      <td>
        <Button onClick={() => addItem(prop.product)}>+</Button>
        {"   "}
        {cntr}
        {"   "}
        <Button onClick={() => removeItem(prop.product._id)}>-</Button>
      </td>
    </tr>
  );
}
export default ProductRow;
