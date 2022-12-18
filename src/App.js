import React, { useContext, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import "./scss/index.scss";

import ScrollTop from "./components/ScrollTop";

import PrivateRoutes from "./PrivateRoutes";

import Layout from "./components/pages/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contact from "./components/Contact";
import PwordResetEmail from "./components/pages/auth/PwordResetEmail";
import ResetPWD from "./components/pages/auth/ResetPWD";
import BookRequestPage from "./components/BookRequestPage";
import BookSellingPage from "./components/BookSellingPage";
import DisplayRecommBook from "./components/DisplayRecommBook";
import BookRegisterPage from "./components/BookRegisterPage";
import UserLogin from "./components/pages/auth/UserLogin";
import UserRegistration from "./components/pages/auth/UserRegistration";
/*********************************************************************** */

import Home_Dashboard from "./dashboard/pages/home/Home_Dashboard";
import Login from "./dashboard/pages/login/Login";
import List from "./dashboard/pages/list/List";
import Single from "./dashboard/pages/single/Single";
import New from "./dashboard/pages/new/New";
import { productInputs, userInputs } from "./formSource";
import "./dashboard/style/dark.scss";
import { DarkModeContext } from "./dashboard/context/darkModeContext";
import { useSelector } from "react-redux";
import UserDashboard from "./userDashboard/UserDashboard";
import EditPassword from "./userDashboard/pages/Home/EditPassword";
import DisplayBooks from "./userDashboard/pages/Home/DisplayBooks";
import DisplayBooksAdmin from "./dashboard/pages/DisplayBooksAdmin";

function App() {
  window.setTimeout(() => {
    const home = document.getElementsByClassName("home");
  }, 1500);

  return (
    <div className="app">
      <ScrollTop />

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route path="userLogin" element={<UserLogin />} />
            <Route path="userRegisteration" element={<UserRegistration />} />
            <Route path="pwordReset" element={<PwordResetEmail />} />
            <Route path="reset" element={<ResetPWD />} />
            {/* <Route element={<PrivateRoutes />}> */}
            <Route path="request" element={<BookRequestPage />} />
            <Route path="sell" element={<BookSellingPage />} />
            <Route path="recomm_book" element={<DisplayRecommBook />} />
            //**************************************** *//
            <Route path="dashboard">
              <Route index element={<Home_Dashboard />} />
              <Route path="login" element={<Login />} />
              <Route path="RegisterBook" element={<BookRegisterPage />} />
              <Route path="displayBooksAdmin" element={<DisplayBooksAdmin />} />
              <Route path="users">
                <Route index element={<List />} />
                <Route path=":userId" element={<Single />} />
                <Route
                  path="new"
                  element={<New inputs={userInputs} title="Add New User" />}
                />
              </Route>
              <Route path="products">
                <Route index element={<List />} />
                <Route path=":productId" element={<Single />} />
                <Route
                  path="new"
                  element={
                    <New inputs={productInputs} title="Add New Product" />
                  }
                />
              </Route>
            </Route>
            /************************************************** */
            <Route path="user-dashboard">
              <Route index element={<UserDashboard />} />
              <Route path="reset-userPassword" element={<EditPassword />} />
              <Route path="userBooks" element={<DisplayBooks />} />
            </Route>
            {/* </Route> */}
          </Route>
        </Routes>
        {/* <Routes>
          
        </Routes> */}
      </BrowserRouter>

      {/* <div className={darkMode ? "app dark" : "app"}>
        <BrowserRouter>
          
        </BrowserRouter>
      </div> */}
    </div>
  );
}

export default App;
