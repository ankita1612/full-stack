import React, { useState, useEffect } from "react";
import type { IProduct } from "../interface/product.interface";
import axios from "axios";
import ProductRow from "./ProductRow";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";

function ProductList() {
  const [products, setProducts] = useState<IProduct[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const result = await axios.get("http://localhost:5000/api/products");
      setProducts(result.data.data);
    };
    fetch();
  }, []);
  return (
    <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>price</th>
            <th>Qty</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((d) => (
            <ProductRow key={d._id} product={d}></ProductRow>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default ProductList;
