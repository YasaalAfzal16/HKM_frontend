import { Grid, TextField, Button, Box, Alert } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const ResetPWD = () => {
  const navigate = useNavigate();
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      password: data.get("password"),
      password_confirmation: data.get("password_confirmation"),
    };
    if (actualData.password && actualData.password_confirmation) {
      if (actualData.password === actualData.password_confirmation) {
        console.log(actualData);
        document.getElementById("pwd-reset-form").reset();
        setError({
          status: true,
          msg: "Password reset successfully! Redirecting to login page...",
          type: "success",
        });
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        setError({
          status: true,
          msg: "Please rewrite your password correctly.",
          type: "error",
        });
      }
    } else {
      setError({
        status: true,
        msg: "All fields are required!",
        type: "error",
      });
    }
  };
  return (
    <>
      <Grid container justifyContent="center">
        <Grid item sm={6} xs={12}>
          <h1>Reset Password</h1>
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
            id="pwd-reset-form"
            onSubmit={handleSubmit}
          >
            <TextField
              required
              fullWidth
              id="password"
              name="password"
              label="New Password"
              type={"password"}
              margin="normal"
            />
            <TextField
              required
              fullWidth
              id="password_confirmation"
              name="password_confirmation"
              label="New Confirm password"
              type={"password"}
              margin="normal"
            />

            <Box textAlign="center">
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, px: 5 }}
              >
                SAVE
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

export default ResetPWD;
