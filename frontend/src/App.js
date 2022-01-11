import React from "react";

import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/Register";
import ProfilePage from "./pages/ProfilePage.js";
import ShippingPage from "./pages/ShippingPage.js";
import PaymentPage from "./pages/PaymentPage";
import OrderPage from "./pages/OrderPage";
import OrderDetailPage from "./pages/OrderDetailPage";
import UserList from "./pages/Admin/UserList"
import UserEdit from "./pages/Admin/UserEdit"
import ProductList from "./pages/Admin/ProductList"
import ProductEdit from "./pages/Admin/ProductEdit"
import OrderList from "./pages/Admin/OrderList"
import OrderEdit from "./pages/Admin/OrderEdit"


function App() {
  return (
    <div>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomePage />} exact />
            <Route path="/login" element={<LoginPage />} exact />
            <Route path="/register" element={<RegisterPage />} exact />
            <Route path="/profile" element={<ProfilePage />} exact />
            <Route path="/shipping" element={<ShippingPage />} exact />
            <Route path="/payment" element={<PaymentPage />} exact />
            <Route path="/place-order" element={<OrderPage />} exact />
            <Route path="/admin/userlist" element={<UserList />} exact />
            <Route path="/admin/user/:id" element={<UserEdit />} exact />
            <Route path="/admin/productlist" element={<ProductList />} exact />
            <Route path="/admin/productlist/:id" element={<ProductEdit />} exact />
            <Route path="/admin/orderlist" element={<OrderList />} exact />
            <Route path="/admin/orderlist/:id" element={<OrderEdit />} exact />




            <Route path="product/:id" element={<ProductPage />} />
            <Route path="cart/:id" element={<CartPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="order/:id" element={<OrderDetailPage />} />

          </Routes>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;
