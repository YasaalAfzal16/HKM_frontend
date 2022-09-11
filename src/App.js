import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";

import Home from "./components/Home";
import "./scss/index.scss";

import ScrollTop from "./components/ScrollTop";

import scrollreveal from "scrollreveal";
import Layout from "./components/pages/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contact from "./components/Contact";
import LoginReg from "./components/pages/auth/LoginReg";
import PwordResetEmail from "./components/pages/auth/PwordResetEmail";
import ResetPWD from "./components/pages/auth/ResetPWD";
import BookRequestPage from "./components/BookRequestPage";
import BookSellingPage from "./components/BookSellingPage";
//********************************************* */
import HomeDashboard from "./dashboard/pages/home/HomeDashboard";
import Sidebar from "./dashboard/components/sidebar/Sidebar";
import Topbar from "./dashboard/components/topbar/Topbar";
import UserList from "./dashboard/pages/userList/UserList";
import User from "./dashboard/pages/user/User";
import NewUser from "./dashboard/pages/newUser/NewUser";
import ProductList from "./dashboard/pages/productList/ProductList";
import Product from "./dashboard/pages/product/Product";
import NewProduct from "./dashboard/pages/newProduct/NewProduct";
import DisplayRecommBook from "./components/DisplayRecommBook";

function App() {
  window.setTimeout(() => {
    const home = document.getElementsByClassName("home");
    //home[0].style.transform = "none";
  }, 1500);
  /********************** */
  const isLogged = true;
  /********************** */

  return (
    <div className="app">
      <ScrollTop />

      <BrowserRouter>
        <Navbar isLogged={isLogged} />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<LoginReg />} />
            <Route path="pwordReset" element={<PwordResetEmail />} />
            <Route path="reset" element={<ResetPWD />} />
            <Route path="request" element={<BookRequestPage />} />
            <Route path="sell" element={<BookSellingPage />} />
            <Route path="recomm_book" element={<DisplayRecommBook />} />
            //**************************************** *//
            {/* <Route path="homeDashboard" element={<HomeDashboard />} /> */}
            {/* <Route path="users" element={<UserList />} />
            <Route path="user/:userId" element={<User />} />
            <Route path="newUser" element={<NewUser />} />
            <Route path="products" element={<ProductList />} />
            <Route path="product/:productId" element={<Product />} />
            <Route path="newproduct" element={<NewProduct />} />  */}
          </Route>
          <Route path="*" element={<h1>Error 404... Page not found !!! </h1>} />
        </Routes>
      </BrowserRouter>

      {/* <BrowserRouter>
        <Topbar />
        <Sidebar />
        <div style={{ display: "flex", marginTop: "10px" }}>
          <Sidebar />
        </div>

        <Routes>
          <Route path="/homeDashboard" element={<HomeDashboard />}>
            <Route path="users" element={<UserList />} />
            <Route path="user/:userId" element={<User />} />
            <Route path="newUser" element={<NewUser />} />
            <Route path="products" element={<ProductList />} />
            <Route path="product/:productId" element={<Product />} />
            <Route path="newproduct" element={<NewProduct />} />
          </Route>
          <Route path="*" element={<h1>Error 404... Page not found !!! </h1>} />
        </Routes>
      </BrowserRouter> */}

      {/* <Home /> */}
    </div>
  );
}

export default App;
