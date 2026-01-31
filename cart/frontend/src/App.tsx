import ProductList from "./components/ProductList";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
function App() {
  return (
    <>
      <CartProvider>
        <Header></Header>
        <ProductList></ProductList>
      </CartProvider>
    </>
  );
}

export default App;
