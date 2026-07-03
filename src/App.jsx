import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
// import Products from "./pages/Products";
// import ProductDetails from "./pages/ProductDetail";
import Cart from "./components/Cart";
// import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

       <Routes>
        <Route path="/" element={<Home />} />
         {/* <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} /> */}
        <Route path="/cart" element={<Cart />} />
        {/* <Route path="/checkout" element={<Checkout />} />  */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes> 

    </BrowserRouter>
  );
}

export default App;
