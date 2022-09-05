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

function App() {
  const [theme, setTheme] = useState("light");
  const changeTheme = () => {
    theme === "dark" ? setTheme("light") : setTheme("dark");
  };
  useEffect(() => {
    const registerAnimations = () => {
      const sr = scrollreveal({
        origin: "bottom",
        distance: "80px",
        duration: 1000,
        reset: false,
      });
      sr.reveal(
        `
        nav,
        .home,
        .services-container,
        .categories-container,
        .recommend-container,
        .choose-us-container,
        .products-container,
        .promo-container,
        footer
    `,
        {
          interval: 500,
        }
      );
    };
    registerAnimations();
  }, []);
  window.setTimeout(() => {
    const home = document.getElementsByClassName("home");
    //home[0].style.transform = "none";
  }, 1500);
  return (
    <div data-theme={theme} className="app">
      <ScrollTop />
      <Navbar changeTheme={changeTheme} currentTheme={theme} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<LoginReg />} />
            <Route path="pwordReset" element={<PwordResetEmail />} />
            <Route path="reset" element={<ResetPWD />} />
            <Route path="request" element={<BookRequestPage />} />
            <Route path="sell" element={<BookSellingPage />} />
          </Route>
          <Route path="*" element={<h1>Error 404... Page not found !!! </h1>} />
        </Routes>
      </BrowserRouter>

      {/* <Home /> */}
    </div>
  );
}

export default App;
