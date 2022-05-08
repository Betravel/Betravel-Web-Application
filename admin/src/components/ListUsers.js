import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUser,
  getHotelReservations,
  getEventReservations,
  userActions,
} from "../Redux/userReducer";
import axios from "axios";
import frLocale from "date-fns/locale/fr";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

function renameKey(obj, oldKey, newKey) {
  obj[newKey] = obj[oldKey];
  delete obj[oldKey];
}

function ListUsers() {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const [open1, setOpen1] = useState(false);
  const handleClose1 = () => {
    setOpen1(false);
  };

  const [open2, setOpen2] = useState(false);
  const handleClose2 = () => {
    setOpen2(false);
  };

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
        dispatch(getHotelReservations(id));
        dispatch(getEventReservations(id));
        setOpen(true);
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
  const updateUser = (e) => {
    dispatch(
      userActions.updateuser({ type: e.target.name, value: e.target.value })
    );
  };
  const updateStatus = (e) => {
    dispatch(
      userActions.updateuser({ type: e.target.name, value: e.target.checked })
    );
  };

  const confirmUpdateUser = (e) => {
    axios
      .put("http://localhost:8000/api/user/" + user.id, user)
      .then((res) => {
        window.location.reload(false);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="row" style={{ marginTop: "50px", marginBottom: "50px" }}>
      <div
        className="col-12"
        style={{ marginTop: "auto", marginBottom: "auto" }}
      >
        <h1>List Users</h1>
        <br />

        <div style={{ height: window.innerHeight - 200, width: "100%" }}>
          <DataGrid rows={data} columns={cols} />
        </div>
      </div>
      <Dialog fullWidth maxWidth="lg" open={open} onClose={handleClose}>
        <DialogTitle>Details User</DialogTitle>
        <DialogContent>
          <br />
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
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={frLocale}>
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
          <h2>
            {user.nbHotelReservations + user.nbEventReservations} reservations
          </h2>

          <Box
            noValidate
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              m: "auto",
              width: "fit-content",
            }}
          ></Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <div
            align="right"
            style={{ marginRight: "20px", marginBottom: "10px" }}
          >
            <button className="btn" onClick={() => setOpen2(true)}>
              <img
                src="https://img.icons8.com/external-tanah-basah-detailed-outline-tanah-basah/50/000000/external-pen-user-interface-tanah-basah-detailed-outline-tanah-basah.png"
                alt=""
              />
            </button>
            <button className="btn" onClick={() => setOpen1(true)}>
              <img
                src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/50/000000/external-delete-multimedia-kiranshastry-lineal-kiranshastry.png"
                alt=""
              />
            </button>
          </div>

          <Dialog
            open={open1}
            onClose={handleClose1}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Delete User?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete this User?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose1}>Disagree</Button>
              <Button onClick={deleteUser} autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog fullWidth maxWidth="lg" open={open2} onClose={handleClose2}>
            <DialogTitle>Update User</DialogTitle>
            <DialogContent>
              <br />
              <div className="row">
                <div
                  className="col-lg-6 col-sm-12"
                  style={{ marginBottom: "20px" }}
                >
                  <TextField
                    name="firstname"
                    label="First Name"
                    variant="outlined"
                    value={user.firstname}
                    fullWidth
                    onChange={updateUser}
                  />
                </div>
                <div className="col-lg-6 col-sm-12">
                  <TextField
                    name="lastname"
                    label="Last Name"
                    variant="outlined"
                    value={user.lastname}
                    fullWidth
                    onChange={updateUser}
                  />
                </div>
              </div>
              <br />
              <div className="row">
                <div
                  className="col-lg-6 col-sm-12"
                  style={{ marginBottom: "20px" }}
                >
                  <TextField
                    name="email"
                    label="Email"
                    variant="outlined"
                    value={user.email}
                    fullWidth
                    onChange={updateUser}
                  />
                </div>
                <div className="col-lg-6 col-sm-12">
                  <TextField
                    name="phone"
                    label="Phone"
                    variant="outlined"
                    value={user.phone}
                    fullWidth
                    onChange={updateUser}
                  />
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-12">
                  <FormControlLabel
                    value="end"
                    control={
                      <Switch
                        name="confirmed"
                        color="primary"
                        checked={user.confirmed}
                        onChange={updateStatus}
                      />
                    }
                    label={user.confirmed ? "Confirmed" : "Not Confirmed"}
                    labelPlacement="end"
                  />
                </div>
              </div>
            </DialogContent>
            <DialogActions>
              <button className="btn" onClick={confirmUpdateUser}>
                <img
                  src="https://img.icons8.com/ios/50/000000/save--v1.png"
                  alt=""
                />
              </button>
            </DialogActions>
          </Dialog>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default ListUsers;
