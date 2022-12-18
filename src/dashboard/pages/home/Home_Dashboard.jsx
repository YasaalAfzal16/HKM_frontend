import Sidebar from "../../components/sidebar/Sidebar";
import "./home.scss";
import { Grid } from "@mui/material";
import {
  useGetAllBooksQuery,
  useGetAllUsersQuery,
} from "../../../services/hkm_CRUD_API";
import { Box } from "@mui/system";

const Home = () => {
  const userResInfo = useGetAllUsersQuery();
  const bookResInfo = useGetAllBooksQuery();

  console.log("UserResInfo: ", userResInfo.data.length);
  console.log("BookResInfo: ", bookResInfo.data.length);

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        {/* <Navbar />
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div> */}
        <div>
          <h2>SUMMARY</h2>
        </div>
        <div>
          <Grid container>
            <Grid item lg={3} px={3}>
              <h4>Total Registered Users</h4>
              <Box>{userResInfo.data.length}</Box>
            </Grid>
            <Grid item lg={3} px={3}>
              <h4>Total Registered Books</h4>
              <Box>{bookResInfo.data.length}</Box>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Home;
