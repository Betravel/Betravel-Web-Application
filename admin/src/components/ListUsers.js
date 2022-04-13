import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser, getReservations } from "../Redux/userReducer";
import axios from "axios";
import frLocale from "date-fns/locale/fr";
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
    <div className="row" style={{ minHeight: window.innerHeight }}>
      <div className="row" style={{ marginTop: "auto", marginBottom: "auto" }}>
        <div
          className="col-9"
          style={{ marginTop: "auto", marginBottom: "auto" }}
        >
          <h1>List Users</h1>
          <div style={{ height: 600, width: "100%" }}>
            <div style={{ height: 550, width: "100%" }}>
              <DataGrid rows={data} columns={cols} />
            </div>
          </div>
        </div>
        <div className="col-3">
          <h1>Details User</h1>
          <div class="card">
            <div style={{ backgroundColor: "#abc4b1" }}>
              <img
                src="https://img.icons8.com/external-smashingstocks-glyph-smashing-stocks/150/FFFFFF/external-profile-web-smashingstocks-glyph-smashing-stocks.png"
                alt=""
              />
            </div>
            <div class="card-body">
              <TextField
                name="firstname"
                label="First Name"
                variant="outlined"
                value={user.firstname}
                fullWidth
                readOnly
              />
              <br />
              <br />
              <TextField
                name="lastname"
                label="Last Name"
                variant="outlined"
                value={user.lastname}
                fullWidth
                readOnly
              />
              <br />
              <br />
              <TextField
                name="email"
                label="Email"
                variant="outlined"
                value={user.email}
                fullWidth
                readOnly
              />
              <br />
              <br />
              <TextField
                name="phone"
                label="Phone"
                variant="outlined"
                value={user.phone}
                fullWidth
                readOnly
              />
              <br />
              <br />
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                locale={frLocale}
              >
                <DatePicker
                  label="Created At"
                  mask={"__/__/____"}
                  fullWidth
                  readOnly
                  value={user.createdat}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <br />
              <br />
              <h2>{user.nbReservations} reservations</h2>
            </div>
            <div
              align="right"
              style={{ marginRight: "20px", marginBottom: "10px" }}
            >
              <button className="btn" onClick={deleteUser}>
                <img
                  src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/50/000000/external-delete-multimedia-kiranshastry-lineal-kiranshastry.png"
                  alt=""
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ListUsers;
