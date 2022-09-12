import React, { useState } from "react";
import axios from "axios";
import recommend1 from "../assets/recommend1.jpg";
import recommend2 from "../assets/recommend2.jpg";
import recommend3 from "../assets/recommend3.jpeg";
import recommend4 from "../assets/recommend4.jpg";
/************************** */
import mughal from "../assets/mughal.jpg";
import pak_country from "../assets/pak_country.jpg";
import sherlock_holmes from "../assets/sherlock_holmes.jpg";
import war_and_peace from "../assets/war_and_peace.jpg";
import { useNavigate } from "react-router-dom";

function Recommend() {
  const navigate = useNavigate();

  const data = [
    {
      image: mughal,
      text: "The Last Mughal",
    },
    {
      image: pak_country,
      text: "Pakistan A Hard Contry",
    },
    {
      image: sherlock_holmes,
      text: "The Adventures of Sherlock Holmes",
    },
    {
      image: war_and_peace,
      text: "War And Peace",
    },
  ];

  return (
    <div className="recommend-container mx-3 py-3">
      <div className="container">
        <div className="title-container">
          <h2>Recommended for You</h2>
        </div>
        <div className="categories">
          {data.map(({ image, text }, index) => {
            return (
              <div className="category" key={index}>
                <a>
                  <img
                    src={image}
                    alt="Category"
                    onClick={() => {
                      console.log("image clicked...");
                      navigate("/recomm_book", { state: { bk_nm: text } });
                    }}
                  />
                </a>
                <h3>{text}</h3>
              </div>
            );
          })}
        </div>
        {/* <BkDetails show={show} item={bookItem} /> */}
        {/* <button>Show All</button> */}
      </div>
    </div>
  );
}

export default Recommend;
