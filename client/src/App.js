import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import CartScreen from "./pages/CartScreen";
import HomeScreen from "./pages/HomeScreen";
import LoginScreen from "./pages/LoginScreen";
import ProductScreen from "./pages/ProductScreen";
import SignupScreen from "./pages/SignupScreen";
import ProfileScreen from "./pages/ProfileScreen";
import ShippingScreen from "./pages/ShippingScreen";
import Footer from "./components/Footer";
import CheckoutScreen from "./pages/CheckoutScreen";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/products/:id/" element={<ProductScreen />} />
        <Route path="/cart/:id/" element={<CartScreen />} />
        <Route path="/cart/" element={<CartScreen />} />
        <Route path="/login/" element={<LoginScreen />} />
        <Route path="/profile/" element={<ProfileScreen />} />
        <Route path="/shipping/" element={<ShippingScreen />} />
        <Route path="/signup/" element={<SignupScreen />} />
        <Route path="/checkout/" element={<CheckoutScreen />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
