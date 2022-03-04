import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";

function renameKey(obj, oldKey, newKey) {
  obj[newKey] = obj[oldKey];
  delete obj[oldKey];
}

function ListUsers() {
  const cols = [
    { field: "firstname", headerName: "FirstName", width: "150" },
    { field: "lastname", headerName: "LastName", width: "150" },
    { field: "email", headerName: "Email", width: "250" },
    { field: "phone", headerName: "Phone Number", width: "150" },
    { field: "confirmed", headerName: "Confirmed", width: "150" },
  ];
  const [data, setdata] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users/all")
      .then((res) => {
        var j = res.data;
        j.forEach((obj) => renameKey(obj, "_id", "id"));
        setdata(j);
      })

      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>List Users</h1>
      <div style={{ height: 400, width: "100%" }}>
        <div style={{ height: 350, width: "100%" }}>
          <DataGrid rows={data} columns={cols} />
        </div>
      </div>
    </div>
  );
}
export default ListUsers;
