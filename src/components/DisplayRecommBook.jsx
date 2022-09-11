import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import DisplaySrchBook from "./DisplaySrchBook";
import Navbar from "./Navbar";
import axios from "axios";
import { useState } from "react";

const DisplayRecommBook = () => {
  let bk = useLocation();

  const book_name = bk.state.recomm_book;

  const navigate = useNavigate();
  const [bookData, setBookData] = useState([]);

  if (!!book_name) {
    axios
      .get(
        "https://www.googleapis.com/books/v1/volumes?q=" +
          book_name +
          "&key=AIzaSyABSGsmjA2kymz682cek_OytPLzCJ5UBDU" +
          "&maxResults=40"
      )
      .then((data) => {
        console.log(data.data.items);
        setBookData(data.data.items);
      })
      .catch((error) => console.log(error));
  }
  return (
    <>
      <h3>{book_name}</h3>
      <DisplaySrchBook book={bookData} />
      <Button color="error" onClick={navigate("/")}>
        BACK
      </Button>
    </>
  );
};

export default DisplayRecommBook;
