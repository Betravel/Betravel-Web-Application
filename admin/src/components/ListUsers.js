import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser, getReservations } from "../Redux/userReducer";
import axios from "axios";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";

function renameKey(obj, oldKey, newKey) {
  obj[newKey] = obj[oldKey];
  delete obj[oldKey];
}

function ListUsers() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const cols = [
    { field: "firstname", headerName: "FirstName", width: "150" },
    { field: "lastname", headerName: "LastName", width: "150" },
    { field: "email", headerName: "Email", width: "250" },
    { field: "phone", headerName: "Phone Number", width: "150" },
    { field: "confirmed", headerName: "Confirmed", width: "150" },
    {
      field: "actions",
      type: "actions",
      width: 120,
      getActions: (params) => [
        <GridActionsCellItem
          icon={
            <img
              src="https://img.icons8.com/external-icongeek26-outline-gradient-icongeek26/48/000000/external-view-graphic-design-icongeek26-outline-gradient-icongeek26.png"
              alt=""
            />
          }
          label="Delete"
          onClick={viewUser(params.id)}
        />,
      ],
    },
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

  const viewUser = useCallback(
    (id) => () => {
      setTimeout(() => {
        dispatch(getUser(id));
        dispatch(getReservations(id));
      });
    },
    [dispatch]
  );

  const deleteUser = () => {
    axios
      .delete("http://localhost:8000/api/user/delete/" + user.id)
      .then((res) => window.location.reload(false))
      .catch((err) => console.log(err));
  };

  return (
    <div className="row">
      <div className="col-6">
        <h1>List Users</h1>
        <div style={{ height: 400, width: "100%" }}>
          <div style={{ height: 350, width: "100%" }}>
            <DataGrid rows={data} columns={cols} />
          </div>
        </div>
      </div>
      <div className="col-6">
        <h1>Details User</h1>
        <div className="row">
          <div className="col-6">
            <TextField
              id="firstname"
              label="First Name"
              variant="outlined"
              name="firstname"
              value={user.firstname}
              readOnly
              fullWidth
            />
          </div>
          <div className="col-6">
            <TextField
              id="lastname"
              label="Last Name"
              variant="outlined"
              name="lastname"
              value={user.lastname}
              readOnly
              fullWidth
            />
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-6">
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              name="email"
              value={user.email}
              readOnly
              fullWidth
            />
          </div>
          <div className="col-6">
            <TextField
              id="phone"
              label="Phone"
              variant="outlined"
              name="phone"
              value={user.phone}
              readOnly
              fullWidth
            />
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-6">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Created At"
                fullWidth
                readOnly
                value={user.createdat}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          <div className="col-6">
            <h2>{user.nbReservations} reservations</h2>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-12">
            <button className="btn btn-danger" onClick={deleteUser}>
              Delete User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ListUsers;
