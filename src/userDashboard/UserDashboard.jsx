import EditAccount from "./pages/Home/EditAccount";
import SideBar from "./pages/Sidebar/SideBar";

const Dashboard = () => {
  return (
    <>
      <div className="home">
        <SideBar />
        <EditAccount />
      </div>
    </>
  );
};

export default Dashboard;
