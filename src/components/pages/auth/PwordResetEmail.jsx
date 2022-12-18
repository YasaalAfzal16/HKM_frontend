import { Grid, TextField, Button, Box, Alert } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const PwordResetEmail = () => {
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      email: data.get("email"),
    };
    if (actualData.email) {
      console.log(actualData);
      document.getElementById("pwd-reset-email-form").reset();
      setError({
        status: true,
        msg: "Password email sent! Check your email.",
        type: "success",
      });
    } else {
      setError({
        status: true,
        msg: "Please provide a valid email.",
        type: "error",
      });
    }
  };
  const navigate = useNavigate();
  const navToHome = () => {
    navigate("/");
  };
  return (
    <>
      <Grid container justifyContent="center">
        <Grid item sm={6} xs={12}>
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
            id="pwd-reset-email-form"
            onSubmit={handleSubmit}
          >
            <TextField
              required
              fullWidth
              id="email"
              name="email"
              label="Email Address"
              margin="normal"
            />

            <Box textAlign="center">
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, px: 5 }}
              >
                SEND
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

export default PwordResetEmail;
