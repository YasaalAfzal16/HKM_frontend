import { Alert, Button, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetAllUsersQuery } from "../../../services/hkm_CRUD_API";

const EditAccount = () => {
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, SetLname] = useState("");
  const [contNo, setContNo] = useState("");

  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });

  const [btnDisabled, setBtnDisabled] = useState(true);

  const responseInfo = useGetAllUsersQuery();

  const UserID = useSelector((state) => state.isLogged.user_id);

  const currUsrData = (backEnd_data, usr_id) => {
    return backEnd_data.find((e) => {
      if (e.User_ID === usr_id) {
        return e;
      }
    });
  };

  useEffect(() => {
    if (!responseInfo.isLoading) {
      //   setUsers(responseInfo.data);
      //   set_curr_usr(responseInfo.data);
      const usrData = responseInfo.data;
      console.log("Response Info:", usrData);
      //   console.log("Current User Data:", currUsrData(users, UserID));
      const current_usr_data = currUsrData(usrData, UserID);
      console.log("Current User Data:", current_usr_data);
      console.log("Current user ID:", UserID);
      setEmail(current_usr_data.email);
      setFname(current_usr_data.fname);
      SetLname(current_usr_data.lname);
      setContNo(current_usr_data.contact_num);
    } else {
      console.log("Loading data...");
    }
  }, [responseInfo.isLoading]);

  //   console.log("Current User Data:", currUsrData(users, UserID));

  const handleEmailChange = (text) => {
    setBtnDisabled(!text.target.value.trim());
    setEmail(text.target.value);
  };

  const handleFnameChange = (text) => {
    setBtnDisabled(!text.target.value.trim());
    setFname(text.target.value);
  };
  const handleLnameChange = (text) => {
    setBtnDisabled(!text.target.value.trim());
    SetLname(text.target.value);
  };
  const handleContNoChange = (text) => {
    setBtnDisabled(!text.target.value.trim());
    setContNo(text.target.value);
  };

  async function UpdateUserInfo() {
    try {
      console.log("In PUT function ...");

      const config = {
        method: "PUT",
        url: "http://127.0.0.1:8000/api/user/",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        data: JSON.stringify({
          User_ID: UserID,
          fname: fname,
          lname: lname,
          email: email,
          contact_num: contNo,
        }),
      };

      const response = await axios(config);
      console.log("Updated Data: ", response.data);
      setError({
        status: true,
        msg: "Account details updated successfully! ",
        type: "success",
      });
    } catch (error) {
      console.log(error);
      setError({
        status: true,
        msg: "Failed to update! ",
        type: "error",
      });
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Update Button clicked...");

    UpdateUserInfo();
    setBtnDisabled(true);
  };

  return (
    <Grid container>
      <Grid item lg={8} alignSelf={"center"} sx={{ ml: 4 }}>
        <Box
          sx={{ mx: 6, px: 3, py: 3 }}
          onSubmit={handleSubmit}
          component="form"
          noValidate
          border={3}
          borderColor={"blue"}
        >
          <Box>
            <h2>Account Details</h2>
          </Box>
          <TextField
            sx={{ mt: 5 }}
            required
            fullWidth
            id="email"
            name="email"
            label="Email"
            margin="normal"
            value={email || ""}
            onChange={(text) => handleEmailChange(text)}
          />
          <TextField
            required
            id="fname"
            name="fname"
            label="First Name"
            margin="normal"
            value={fname || ""}
            onChange={(text) => handleFnameChange(text)}
          />
          <TextField
            required
            id="lname"
            name="lname"
            label="Last Name"
            margin="normal"
            sx={{ ml: 1 }}
            value={lname || ""}
            onChange={(text) => handleLnameChange(text)}
          />
          <TextField
            required
            fullWidth
            id="contNo"
            name="contNo"
            label="Contact No."
            margin="normal"
            value={contNo || ""}
            onChange={(text) => handleContNoChange(text)}
          />
          <Box>
            {error.status ? (
              <Alert severity={error.type}>{error.msg}</Alert>
            ) : (
              ""
            )}
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Button type="submit" variant="contained" disabled={btnDisabled}>
              UPDATE
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default EditAccount;
