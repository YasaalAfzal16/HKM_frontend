import { TextField, Button, Box, Alert, Grid } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Contact = () => {
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
      name: data.get("name"),
      email: data.get("email"),
      subject: data.get("subject"),
      message: data.get("message"),
    };
    if (
      actualData.name &&
      actualData.email &&
      actualData.subject &&
      actualData.message
    ) {
      console.log(actualData);
      document.getElementById("contact-form").reset();
      setError({
        status: true,
        msg: "Request successful !!! ",
        type: "success",
      });
      // setTimeout(() => {
      //   navigate("/login");
      // }, 2000);
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
            id="contact-form"
            onSubmit={handleSubmit}
          >
            <h1>Enter your particulars</h1>
            <TextField
              required
              fullWidth
              id="name"
              name="name"
              label="Name"
              margin="normal"
            />
            <TextField
              required
              fullWidth
              id="email"
              name="email"
              label="Email"
              margin="normal"
            />

            <TextField
              required
              fullWidth
              id="subject"
              name="subject"
              label="Subject"
              margin="normal"
            />

            <TextField
              required
              fullWidth
              id="message"
              name="message"
              label="Message"
              margin="normal"
            />

            <Box textAlign="center">
              <Button
                type="submit"
                variant="contained"
                color="error"
                sx={{ mt: 3, mb: 2, px: 5 }}
              >
                SUBMIT
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

export default Contact;
