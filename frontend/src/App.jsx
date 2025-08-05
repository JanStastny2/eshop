
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import AddProduct from "./components/AddProduct";
import Product from "./components/Product"
import UpdateProduct from "./components/UpdateProduct";

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add_product" element={<AddProduct />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/product/:id/update" element={<UpdateProduct />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;