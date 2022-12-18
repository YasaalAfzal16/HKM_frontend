import { Alert, Box, Button, Grid, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetAllUsersQuery } from "../../../services/hkm_CRUD_API";
import SideBar from "../Sidebar/SideBar";

const EditPassword = () => {
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });
  const [old_pwd, set_old_pwd] = useState("");
  const [new_pwd, set_new_pwd] = useState("");
  const [confirm_new_pwd, set_confirm_new_pwd] = useState("");

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
      set_old_pwd(current_usr_data.password);
    } else {
      console.log("Loading data...");
    }
  }, [responseInfo.isLoading]);

  const handleOldPWDChange = (text) => {
    setBtnDisabled(!text.target.value.trim());
    set_old_pwd(text.target.value);
  };

  const handleNewPWDChange = (text) => {
    setBtnDisabled(!text.target.value.trim());
    set_new_pwd(text.target.value);
  };

  const handleConfirmNewPWDChange = (text) => {
    setBtnDisabled(!text.target.value.trim());
    set_confirm_new_pwd(text.target.value);
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
          password: old_pwd,
        }),
      };

      const response = await axios(config);
      console.log("Updated Data: ", response.data);
      setBtnDisabled(true);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Update Button clicked...");
    if (old_pwd && new_pwd && confirm_new_pwd) {
      if (old_pwd !== new_pwd) {
        if (new_pwd === confirm_new_pwd) {
          UpdateUserInfo();
          setError({
            status: true,
            msg: "Password updated successfully! ",
            type: "success",
          });
        } else {
          setError({
            status: true,
            msg: "Please re-enter same password again! ",
            type: "error",
          });
        }
      } else {
        setError({
          status: true,
          msg: "The password entered is same as before! ",
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
      <div>
        <Grid container>
          <Grid item lg={2}>
            <SideBar />
          </Grid>
          <Grid item lg={5} alignSelf={"center"} sx={{ ml: 5 }}>
            <Box
              sx={{ mx: 6, px: 3, py: 3 }}
              onSubmit={handleSubmit}
              component="form"
              noValidate
              border={3}
              borderColor={"blue"}
            >
              <Box>
                <h2>Reset password</h2>
              </Box>
              <TextField
                sx={{ mt: 5 }}
                required
                fullWidth
                id="old-pass"
                name="old-pass"
                label="Enter old password"
                margin="normal"
                onChange={(text) => handleOldPWDChange(text)}
              />
              <TextField
                required
                fullWidth
                id="new-pass"
                name="new-pass"
                label="Enter new password"
                margin="normal"
                value={new_pwd || ""}
                onChange={(text) => handleNewPWDChange(text)}
              />
              <TextField
                required
                fullWidth
                id="confirm-new-pass"
                name="confirm-new-pass"
                label="Confirm new password"
                margin="normal"
                value={confirm_new_pwd || ""}
                onChange={(text) => handleConfirmNewPWDChange(text)}
              />
              <Box>
                {error.status ? (
                  <Alert severity={error.type}>{error.msg}</Alert>
                ) : (
                  ""
                )}
              </Box>

              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                p={2}
              >
                <Button
                  type="submit"
                  variant="contained"
                  color="warning"
                  disabled={btnDisabled}
                >
                  UPDATE
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default EditPassword;
