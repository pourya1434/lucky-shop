import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import CartScreen from "./pages/CartScreen";
import HomeScreen from "./pages/HomeScreen";
import LoginScreen from "./pages/LoginScreen";
import ProductScreen from "./pages/ProductScreen";
import SignupScreen from "./pages/SignupScreen";
import ProfileScreen from "./pages/ProfileScreen";

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
        <Route path="/signup/" element={<SignupScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
