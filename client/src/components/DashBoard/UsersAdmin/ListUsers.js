import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";

function renameKey(obj, oldKey, newKey) {
  obj[newKey] = obj[oldKey];
  delete obj[oldKey];
}

function ListUsers() {
  const cols = [
    { field: "firstname", headerName: "FirstName", width: "100" },
    { field: "lastname", headerName: "LastName", width: "100" },
    { field: "email", headerName: "Email", width: "200" },
    { field: "phone", headerName: "Phone Number", width: "150" },
    { field: "confirmed", headerName: "Confirmed", width: "100" },
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
      <div style={{ height: 400, width: "100%" }}>
        <div style={{ height: 350, width: "100%" }}>
          <DataGrid rows={data} columns={cols} />
        </div>
      </div>
    </div>
  );
}
export default ListUsers;
