import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import ProductDetails from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Products */}
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/success" element={<Success />} />
        <Route path="/checkout" element={<ProtectedRoute> <Checkout /></ProtectedRoute>
  }
/>

        {/* Cart */}
        <Route path="/cart" element={<Cart />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      </Routes>
      <Footer/>

    </BrowserRouter>
  );
}

export default App;