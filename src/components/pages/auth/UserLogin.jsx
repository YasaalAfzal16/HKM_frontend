import { TextField, Button, Box, Alert, Grid, Card, Tab } from "@mui/material";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import login1 from "../../../assets/login1.png";
import { useGetAllUsersQuery } from "../../../services/hkm_CRUD_API";
import { useDispatch } from "react-redux";
import {
  login_user,
  addUserName,
  set_as_admin,
  set_user_ID,
} from "../../../features/user/isLogged";

const UserLogin = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });

  const dispatch = useDispatch();

  // RTK Query
  const responseInfo = useGetAllUsersQuery();

  useEffect(() => {
    if (!responseInfo.isLoading) {
      setUsers(responseInfo.data);
      console.log("Response Info:", responseInfo.data);
    }
  }, [responseInfo.isLoading]);

  const navigate = useNavigate();
  const currUsrData = (backEnd_data, entered_data) => {
    return backEnd_data.find((e) => {
      if (
        e.fname === entered_data.fname &&
        e.password === entered_data.password
      ) {
        return e.User_ID;
      }
    });
  };

  const adminLogin = () => {
    dispatch(set_as_admin());
    dispatch(login_user());

    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      fname: data.get("fname"),
      lname: data.get("lname"),
      password: data.get("password"),
    };
    if (actualData.fname && actualData.lname && actualData.password) {
      if (
        actualData.fname === "HKM" &&
        actualData.lname === "_admin" &&
        actualData.password === "admin123456"
      ) {
        alert("Welcome ADMIN !!!");
        adminLogin();

        document.getElementById("login-form").reset();
      } else if (
        users.some((usr) => usr.fname === actualData.fname) &&
        users.some((usr) => usr.lname === actualData.lname) &&
        users.some((usr) => usr.password === actualData.password)
      ) {
        console.log("ActualData: ", actualData);
        setError({
          status: true,
          msg: `Login successful! Welcome ${actualData.fname} !`,
          type: "success",
        });
        dispatch(set_user_ID(currUsrData(users, actualData).User_ID));
        dispatch(login_user());
        dispatch(addUserName(actualData.fname));
        document.getElementById("login-form").reset();
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setError({
          status: true,
          msg: "You need to be Registered before Logging in ! ",
          type: "error",
        });
      }
      /******** */
    } else {
      setError({ status: true, msg: "All fields are required", type: "error" });
    }
  };
  return (
    <>
      <Grid container sx={{ height: "50vh" }}>
        <Grid
          item
          lg={7}
          sm={5}
          sx={{
            backgroundImage: `url(${login1})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: { xs: "none", sm: "block" },
          }}
        ></Grid>
        <Grid item lg={5} sm={7} xs={12}>
          <Card sx={{ width: "100%", height: "100%" }}>
            <Box sx={{ mx: 3, height: 630 }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tab
                  label="Login"
                  sx={{
                    textTransform: "none",
                    fontWeight: "bold",
                    color: "blue",
                  }}
                ></Tab>
                <Box
                  component="form"
                  noValidate
                  sx={{ mt: 1 }}
                  id="login-form"
                  onSubmit={handleSubmit}
                >
                  <TextField
                    required
                    id="fname"
                    name="fname"
                    label="First Name"
                    margin="normal"
                  />
                  <TextField
                    required
                    id="lname"
                    name="lname"
                    label="Last Name"
                    margin="normal"
                    sx={{ ml: 5 }}
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
                  <Box sx={{ pt: 3 }}>
                    <NavLink to="/userRegisteration">
                      Don`t have an account? Register yourself!
                    </NavLink>
                  </Box>
                  <Box sx={{ pt: 5 }}>
                    <NavLink to="/pwordReset">Forgot password ?</NavLink>
                  </Box>
                  {error.status ? (
                    <Alert severity={error.type}>{error.msg}</Alert>
                  ) : (
                    ""
                  )}
                </Box>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default UserLogin;
