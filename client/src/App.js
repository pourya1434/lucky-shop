import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import CartScreen from "./pages/CartScreen";
import HomeScreen from "./pages/HomeScreen";
import ProductScreen from "./pages/ProductScreen";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/products/:id/" element={<ProductScreen />} />
        <Route path="/cart/:id/" element={<CartScreen />} />
        <Route path="/cart/" element={<CartScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
