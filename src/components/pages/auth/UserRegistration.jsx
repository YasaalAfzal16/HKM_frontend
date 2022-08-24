import { TextField, Button, Box, Alert, FormControlLabel, Checkbox } from "@mui/material";
import{useState} from "react";
import { useNavigate } from "react-router-dom";

const UserRegistration=()=>{
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
        name: data.get("name"),  
        email: data.get("email"),
        password: data.get("password"),
        password_confirmation: data.get("password_confirmation"),
        tc:data.get('tc')

    };
    if (actualData.name && actualData.email && actualData.password && actualData.tc!==null) {
      if(actualData.password===actualData.password_confirmation){
        console.log(actualData);
      document.getElementById("registration-form").reset();
      setError({ status: true, msg: "Registration successful! You can now login. ", type: "success" });
      setTimeout(() => {
          navigate("/login");
        }, 2000);
      }else{
      setError({ status: true, msg: "Please rewrite your password correctly.", type: "error" });
      }
    } else {
      setError({ status: true, msg: "All fields are required", type: "error" });
    }
  };
    return<>
        <Box
        component="form"
        noValidate
        sx={{ mt: 1 }}
        id="registration-form"
        onSubmit={handleSubmit}
      >
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
        <TextField
          required
          fullWidth
          id="password_confirmation"
          name="password_confirmation"
          label="Confirm password"
          type={"password"}
          margin="normal"
        />
        <FormControlLabel control={<Checkbox value="agree" color="primary" name="tc" id="tc" />} label="I agree to terms & conditions."/>
        <Box textAlign="center">
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, px: 5 }}
          >
            REGISTER
          </Button>
        </Box>
        {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ""}
      </Box>
    </>
}

export default UserRegistration;