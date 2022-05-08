import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getEventReservation } from "../Redux/eventreservationReducer";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import axios from "axios";
import frLocale from "date-fns/locale/fr";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";

function renameKey(obj, oldKey, newKey) {
  obj[newKey] = obj[oldKey];
  delete obj[oldKey];
}

function ListEventReservations() {
  const reservation = useSelector((state) => state.eventreservation);
  const dispatch = useDispatch();
  const cols = [
    { field: "id", headerName: "ReservationID", width: "250" },
    {
      field: "event",
      headerName: "Evant Name",
      width: "350",
      renderCell: (params) => <h>{params.value?.name}</h>,
    },
    {
      field: "user",
      headerName: "User's Name",
      width: "250",
      renderCell: (params) => (
        <h>{params.value?.firstname + " " + params.value?.lastname}</h>
      ),
    },
    {
      field: "reservedplace",
      headerName: "Reserved Places",
      width: "150",
      renderCell: (params) => <h>{params.value + " person(s)"}</h>,
    },
    {
      field: "price",
      headerName: "Price",
      width: "170",
      renderCell: (params) => <h>{params.value + " DT"}</h>,
    },
    { field: "status", headerName: "State", width: "150" },
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
          label="View"
          onClick={viewEvent(params.id)}
        />,
      ],
    },
  ];
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const [data, setdata] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/reservationEvent/getall")
      .then((res) => {
        var j = res.data;
        j.forEach((obj) => renameKey(obj, "_id", "id"));
        setdata(j);
      })
      .catch((err) => console.log(err));
  }, []);

  const viewEvent = useCallback(
    (id) => () => {
      setTimeout(() => {
        dispatch(getEventReservation(id));
        setOpen(true);
      });
    },
    [dispatch]
  );

  const ConfirmEvent = () => {
    axios
      .put(
        "http://localhost:8000/api/reservationEvent/confirm/" + reservation.id
      )
      .then((res) => window.location.reload(false))
      .catch((err) => console.log(err));
  };
  const cancelEvent = () => {
    axios
      .put(
        "http://localhost:8000/api/reservationEvent/cancel/" + reservation.id
      )
      .then((res) => window.location.reload(false))
      .catch((err) => console.log(err));
  };
  return (
    <div className="row" style={{ marginTop: "20px", marginBottom: "20px" }}>
      <div
        className="col-12"
        style={{ marginTop: "auto", marginBottom: "auto" }}
      >
        <h1>List Event's Reservations</h1>
        <br />
        <div style={{ height: window.innerHeight - 150, width: "100%" }}>
          <DataGrid rows={data} columns={cols} />
        </div>
      </div>
      <Dialog fullWidth maxWidth="lg" open={open} onClose={handleClose}>
        <DialogTitle>Reservation's Details</DialogTitle>
        <DialogContent>
          <div className="row">
            <h4>Event's details :</h4>
          </div>
          <br />
          <div className="row">
            <div className="col-4">
              <TextField
                name="name"
                label="Event Name"
                variant="outlined"
                value={reservation.event.name}
                fullWidth
                readOnly
              />
            </div>
            <div className="col-4" align="center">
              <TextField
                name="type"
                label="Event Type"
                variant="outlined"
                value={reservation.event.type}
                fullWidth
                readOnly
              />
            </div>
            <div className="col-4">
              <TextField
                name="location"
                label="Event Location"
                variant="outlined"
                value={reservation.event.location}
                fullWidth
                readOnly
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-4" align="center">
              <h4>{reservation.reservedplace} Places reserved</h4>
            </div>
            <div className="col-4" align="center">
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                locale={frLocale}
              >
                <DatePicker
                  label="Event Date"
                  mask={"__/__/____"}
                  fullWidth
                  readOnly
                  value={reservation.event.date.day}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
            <div className="col-4" align="center">
              <h4>Price : {reservation.price} DT</h4>
            </div>
          </div>
          <br />
          <div className="row">
            {reservation.details.map((person, i) => {
              return (
                <div key={i}>
                  <TextField
                    name="person"
                    label={"Person" + (i + 1)}
                    variant="outlined"
                    value={person.firstname + " " + person.lastname}
                    fullWidth
                    readOnly
                  />
                  <br />
                  <br />
                </div>
              );
            })}
          </div>
          <br />
          <div className="row">
            <h4>Reservation By :</h4>
          </div>
          <br />
          <div className="row">
            <div className="col-4">
              <TextField
                name="username"
                label="User's Name"
                variant="outlined"
                value={
                  reservation.user.firstname + " " + reservation.user.lastname
                }
                fullWidth
                readOnly
              />
            </div>
            <div className="col-4">
              <TextField
                name="email"
                label="User's Email"
                variant="outlined"
                value={reservation.user.email}
                fullWidth
                readOnly
              />
            </div>
            <div className="col-4">
              <TextField
                name="phone"
                label="User's Phone"
                variant="outlined"
                value={reservation.user.phone}
                fullWidth
                readOnly
              />
            </div>
          </div>
          <br />
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
          {reservation.status !== "canceled" ? (
            <div
              align="right"
              style={{ marginRight: "20px", marginBottom: "10px" }}
            >
              <button className="btn" onClick={cancelEvent}>
                <img
                  src="https://img.icons8.com/glyph-neue/50/000000/delete-sign.png"
                  alt=""
                />
              </button>
              {reservation.status !== "confirmed" ? (
                <button className="btn" onClick={ConfirmEvent}>
                  <img
                    src="https://img.icons8.com/glyph-neue/50/000000/checkmark.png"
                    alt=""
                  />
                </button>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ListEventReservations;
