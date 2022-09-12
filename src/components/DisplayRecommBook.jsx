import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import DisplaySrchBook from "./DisplaySrchBook";
import Navbar from "./Navbar";
import axios from "axios";
import { useState } from "react";

const DisplayRecommBook = () => {
  let location = useLocation();

  const book_name = location.state.bk_nm;
  console.log(book_name);

  const navigate = useNavigate();
  const [bookData, setBookData] = useState([]);

  try {
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
      });
  } catch (error) {
    console.log(error);
  }

  return (
    <>
      <h3>{book_name}</h3>
      <DisplaySrchBook book={bookData} />

      <Button color="error">BACK</Button>
    </>
  );
};

export default DisplayRecommBook;
