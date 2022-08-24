import React from "react";
import { BiSearch } from "react-icons/bi";
import home from "../assets/home.png";
import Services from "./Services";
import Categories from "./Categories";
import Recommend from "./Recommend";
import Products from "./Products";
import Promo from "./Promo";
import Choose from "./Choose";
import Footer from "./Footer";

function Home() {
  return (
    <div>
      <div className="home">
        <div className="container mx-3 py-3">
          <div className="title-container">
            <h2>Browse Million Products for Your Needs</h2>
            <div className="input-container">
              <input type="text" placeholder="I want to buy..." />
              <div className="icon">
                <BiSearch />
              </div>
            </div>
          </div>
          <div className="extra-image">
            <img src={home} alt="Home" />
          </div>
        </div>
      </div>
      <Services />
      <Categories />
      <Recommend />
      <Choose />
      <Products />
      <Promo />
      <Footer />
    </div>
  );
}

export default Home;
