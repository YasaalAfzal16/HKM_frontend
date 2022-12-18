import { Box, Button, Grid } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import DisplaySrchBook from "./DisplaySrchBook";
import Navbar from "./Navbar";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const DisplayRecommBook = () => {
  let location = useLocation();

  const book_name = location.state.bk_nm;
  console.log(book_name);

  const navigate = useNavigate();
  const [bookData, setBookData] = useState([]);

  const getData = () => {
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
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Grid container justifyContent="center">
        <Grid item lg={10} md={9} sm={8}>
          <Grid textAlign="center">
            <h2>
              <u>{book_name}</u>
            </h2>
          </Grid>
          <Grid>
            <DisplaySrchBook book={bookData} />
          </Grid>
          <Box textAlign="center">
            <Button variant="contained" color="error">
              BACK
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default DisplayRecommBook;
