import {
  TextField,
  Button,
  Box,
  Alert,
  FormControlLabel,
  Checkbox,
  Grid,
  Card,
  Tab,
} from "@mui/material";
import { useEffect, useState } from "react";
import reg1 from "../../../assets/reg1.png";
import {
  useGetAllUsersQuery,
  useAddUserInfoMutation,
} from "../../../services/hkm_CRUD_API";

const UserRegistration = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });

  //RTK Query
  const responseInfo = useGetAllUsersQuery();
  const [addUserInfo] = useAddUserInfoMutation();

  useEffect(() => {
    if (!responseInfo.isLoading) {
      setUsers(responseInfo.data);
      console.log(responseInfo.data);
    }
  }, [responseInfo.isLoading, responseInfo.data]);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      fname: data.get("fname"),
      lname: data.get("lname"),
      email: data.get("email"),
      contact_num: data.get("cont_no"),
      password: data.get("password"),
      password_confirmation: data.get("password_confirmation"),
      tc: data.get("tc"),
    };
    if (
      actualData.fname &&
      actualData.lname &&
      actualData.email &&
      actualData.contact_num &&
      actualData.password &&
      actualData.password_confirmation &&
      actualData.tc !== null
    ) {
      if (actualData.password === actualData.password_confirmation) {
        if (
          users.some((usr) => usr.email === actualData.email) ||
          users.some((usr) => usr.password === actualData.password)
        ) {
          console.log("ActualData: ", actualData);
          setError({
            status: true,
            msg: "Invalid Credentials. Email or password is already taken !",
            type: "error",
          });
        } else {
          if (!actualData.contact_num.match("[0-9]{11}")) {
            alert("Please provide a valid phone no.");
          } else {
            console.log(actualData);

            let fd = new FormData();
            fd.append("fname", actualData.fname);
            fd.append("lname", actualData.lname);
            fd.append("email", actualData.email);
            fd.append("contact_num", actualData.contact_num);
            fd.append("password", actualData.password);

            const res = await addUserInfo(fd);
            console.log("Response : ", res);

            document.getElementById("registration-form").reset();
            setError({
              status: true,
              msg: "Registration successful! You can now login. ",
              type: "success",
            });
          }
        }
      } else {
        setError({
          status: true,
          msg: "Please rewrite your password correctly.",
          type: "error",
        });
      }
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
            backgroundImage: `url(${reg1})`,
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
                  label="Registration"
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
                  id="registration-form"
                  onSubmit={HandleSubmit}
                >
                  <TextField
                    required
                    id="fname"
                    name="fname"
                    label="First Name"
                    margin="normal"
                    sx={{ ml: 1 }}
                  />
                  <TextField
                    required
                    id="lname"
                    name="lname"
                    label="Last Name"
                    margin="normal"
                    sx={{ ml: 7 }}
                  />
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
                    id="cont_no"
                    name="cont_no"
                    label="Contact Number"
                    margin="normal"
                  />
                  <TextField
                    required
                    id="password"
                    name="password"
                    label="Password"
                    type={"password"}
                    margin="normal"
                    sx={{ ml: 1 }}
                  />
                  <TextField
                    required
                    id="password_confirmation"
                    name="password_confirmation"
                    label="Confirm password"
                    type={"password"}
                    margin="normal"
                    sx={{ ml: 7 }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="agree"
                        color="primary"
                        name="tc"
                        id="tc"
                      />
                    }
                    label="I agree to terms & conditions."
                  />
                  <Box textAlign="center">
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ mt: 3, mb: 2, px: 5 }}
                    >
                      REGISTER
                    </Button>
                  </Box>
                  <Box textAlign="center">
                    {error.status ? (
                      <Alert severity={error.type}>{error.msg}</Alert>
                    ) : (
                      ""
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default UserRegistration;
