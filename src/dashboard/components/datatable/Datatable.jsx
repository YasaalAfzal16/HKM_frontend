import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../../dashboard/../datatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGetAllUsersQuery } from "../../../services/hkm_CRUD_API";
import axios from "axios";

const Datatable = () => {
  const responseInfo = useGetAllUsersQuery();

  const [data, setData] = useState([]);

  // const handleDelete = (User_ID) => {
  //   setData(data.filter((item) => item.User_ID !== User_ID));
  // };

  async function deleteUser(id) {
    try {
      const config = {
        method: "DELETE",
        url: `http://127.0.0.1:8000/api/user/${id}/`,
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      };
      const response = await axios(config);
      console.log("Data DELETED Successfully... ", response);
    } catch (error) {
      console.log(error);
    }
    console.log("User ID: ", id);
  }

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/dashboard/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => deleteUser(params.row.User_ID.toString())}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    if (!responseInfo.isLoading) {
      setData(responseInfo.data);
      console.log("Response Info:", responseInfo.data);
    }
  }, [responseInfo.isLoading]);

  return (
    <div className="datatable">
      <div className="datatableTitle">Add New User</div>
      <DataGrid
        getRowId={(row) => row.User_ID}
        className="datagrid"
        rows={data}
        columns={userColumns}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
