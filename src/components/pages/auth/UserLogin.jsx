import { TextField, Button, Box, Alert } from "@mui/material";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const UserLogin = () => {
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    if (actualData.email && actualData.password) {
      console.log(actualData);
      document.getElementById("login-form").reset();
      /********* */
      if (
        actualData.email === "admin@gmail.com" &&
        actualData.password === "admin123456"
      ) {
        alert("Welcome ADMIN !!!");
        setTimeout(() => {
          navigate("/homeDashboard");
        }, 2000);
      } else {
        setError({ status: true, msg: "Login successful!", type: "success" });
        navigate("/");
      }
      /******** */
    } else {
      setError({ status: true, msg: "All fields are required", type: "error" });
    }
  };
  return (
    <>
      <Box
        component="form"
        noValidate
        sx={{ mt: 1 }}
        id="login-form"
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
        <TextField
          required
          fullWidth
          id="password"
          name="password"
          label="Password"
          type={"password"}
          margin="normal"
        />
        <Box textAlign="center">
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, px: 5 }}
          >
            LOGIN
          </Button>
        </Box>
        <NavLink to="/pwordReset">Forgot password ?</NavLink>
        {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ""}
      </Box>
    </>
  );
};

export default UserLogin;
