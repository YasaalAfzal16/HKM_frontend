import { TextField, Button, Box, Alert, Grid } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BookRegisterPage = () => {
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });

  const navigate = useNavigate();
  const navToHome = () => {
    navigate("/");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      Book_name: data.get("bk-name"),
      Author_name: data.get("author-name"),
      Publisher_name: data.get("publisher-name"),
      Edition: data.get("edition"),
    };
    if (
      actualData.Book_name &&
      actualData.Author_name &&
      actualData.Publisher_name &&
      actualData.Edition
    ) {
      console.log(actualData);
      document.getElementById("book-request-form").reset();
      setError({
        status: true,
        msg: "Book`s request successful !!! ",
        type: "success",
      });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      setError({ status: true, msg: "All fields are required", type: "error" });
    }
  };

  return (
    <>
      <Grid container justifyContent="center">
        <Grid item lg={6} sm={6} xs={12}>
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
            id="book-request-form"
            onSubmit={handleSubmit}
          >
            <h1 style={{ textAlign: "center", paddingBottom: "7px" }}>
              <u>Book Registeration Page</u>
            </h1>
            <h3>Enter book details</h3>
            <TextField
              required
              fullWidth
              id="bk-name"
              name="bk-name"
              label="Name of the book"
              margin="normal"
            />
            <TextField
              required
              fullWidth
              id="author-name"
              name="author-name"
              label="Author`s name"
              margin="normal"
            />

            <TextField
              required
              fullWidth
              id="publisher-name"
              name="publisher-name"
              label="Publisher`s name"
              margin="normal"
            />

            <TextField
              required
              fullWidth
              id="edition"
              name="edition"
              label="Year of Edition"
              margin="normal"
            />

            <Box textAlign="center">
              <Button
                type="submit"
                variant="contained"
                color="error"
                sx={{ mt: 3, mb: 2, px: 5 }}
              >
                SEND REQUEST
              </Button>
            </Box>
            <Box textAlign="center">
              <Button
                variant="contained"
                color="success"
                sx={{ mt: 3, mb: 2, px: 5 }}
                onClick={navToHome}
              >
                BACK
              </Button>
            </Box>
            {error.status ? (
              <Alert severity={error.type}>{error.msg}</Alert>
            ) : (
              ""
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default BookRegisterPage;
