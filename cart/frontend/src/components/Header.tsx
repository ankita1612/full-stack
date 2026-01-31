import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import Table from "react-bootstrap/Table";

function Header() {
  const { state } = useCart();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalItem, setTotalItem] = useState<number>(0);

  useEffect(() => {
    if (state?.items?.length) {
      const data = state.items.reduce((sum, item) => {
        return sum + item.price * item.quantity;
      }, 0);
      setTotalPrice(data);

      const total = state.items.reduce((sum, item) => {
        return sum + item.quantity;
      }, 0);

      setTotalItem(total);
    } else {
      setTotalPrice(0);
    }
  }, [state, totalPrice]);

  return (
    <div>
      {JSON.stringify(state?.items)}
      <Table striped bordered hover>
        <tbody>
          <tr>
            <td>
              <b>Total Price:</b> ₹ {totalPrice}
              <br></br>
              <b>Total Item:</b> ₹ {totalItem}
              <br></br>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default Header;
