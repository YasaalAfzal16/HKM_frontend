import { Grid, Card, Typography, Tabs, Tab, Box } from "@mui/material";
import { fontWeight } from "@mui/system";
import { useState } from "react";
import login1 from "../../../assets/login1.png";
import UserLogin from "./UserLogin";
import UserRegistration from "./UserRegistration";
import AutoStoriesSharpIcon from "@mui/icons-material/AutoStoriesSharp";

const TabPanel = (props) => {
  const { children, value, index } = props;
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

const LoginReg = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
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
            <Box sx={{ mx: 3, height: 530 }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  textColor="secondary"
                  indicatorColor="secondary"
                >
                  <Tab
                    label="Login"
                    sx={{
                      textTransform: "none",
                      fontWeight: "bold",
                    }}
                  ></Tab>
                  <Tab
                    label="Registration"
                    sx={{
                      textTransform: "none",
                      fontWeight: "bold",
                    }}
                  ></Tab>
                </Tabs>
                <TabPanel value={value} index={0}>
                  <UserLogin />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <UserRegistration />
                </TabPanel>
              </Box>
            </Box>
            <Box textAlign="center" sx={{ mt: 2 }}>
              <AutoStoriesSharpIcon sx={{ color: "blue", fontSize: 100 }} />
            </Box>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default LoginReg;
