import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import home from "../assets/home.png";
import Categories from "./Categories";
import Recommend from "./Recommend";
import Promo from "./Promo";
import Choose from "./Choose";
import Footer from "./Footer";
import axios from "axios";
import DisplaySrchBook from "./DisplaySrchBook";

function Home() {
  const [searchItem, setSearchItem] = useState("");
  const [bookData, setBookData] = useState([]);

  const searchBook = (e) => {
    if (e.key === "Enter") {
      axios
        .get(
          "https://www.googleapis.com/books/v1/volumes?q=" +
            searchItem +
            "&key=AIzaSyABSGsmjA2kymz682cek_OytPLzCJ5UBDU" +
            "&maxResults=40"
        )
        .then((data) => {
          console.log(data.data.items[0]);
          setBookData(data.data.items);
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <>
      <div>
        <div className="home">
          <div className="container mx-3 py-3">
            <div className="title-container">
              <h2>Browse Millions of Books for Your Needs</h2>
              <div className="input-container">
                <input
                  type="text"
                  placeholder="Type bookname..."
                  value={searchItem}
                  onChange={(e) => {
                    setSearchItem(e.target.value);
                  }}
                  onKeyPress={searchBook}
                />
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

        {bookData.length !== 0 ? (
          <DisplaySrchBook book={bookData} />
        ) : (
          <>
            <Categories />
            <Recommend />
            <Choose />
            <Promo />
          </>
        )}

        <Footer />
      </div>
    </>
  );
}
export default Home;
