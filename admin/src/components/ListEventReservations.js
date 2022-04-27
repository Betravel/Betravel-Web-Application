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

function renameKey(obj, oldKey, newKey) {
  obj[newKey] = obj[oldKey];
  delete obj[oldKey];
}

function ListEventReservations() {
  const reservation = useSelector((state) => state.eventreservation);
  const dispatch = useDispatch();
  const cols = [
    { field: "id", headerName: "ReservationID", width: "200" },
    {
      field: "event",
      headerName: "Evant Name",
      width: "250",
      renderCell: (params) => <h>{params.value?.name}</h>,
    },
    {
      field: "user",
      headerName: "User's Name",
      width: "150",
      renderCell: (params) => (
        <h>{params.value?.firstname + " " + params.value?.lastname}</h>
      ),
    },
    { field: "reservedplace", headerName: "Reserved Places", width: "150" },
    { field: "price", headerName: "Price", width: "100" },
    { field: "status", headerName: "State", width: "100" },
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
        className="col-9"
        style={{ marginTop: "auto", marginBottom: "auto" }}
      >
        <h1>List Event's Reservations</h1>
        <br />
        <div style={{ height: window.innerHeight, width: "100%" }}>
          <div style={{ height: window.innerHeight - 50, width: "100%" }}>
            <DataGrid rows={data} columns={cols} />
          </div>
        </div>
      </div>
      <div className="col-3">
        <h2>Reservation's Details</h2>
        <div className="card">
          <div style={{ backgroundColor: "#abc4b1" }}>
          <img
            src="https://img.icons8.com/ios-filled/150/ffffff/today.png"
            alt=""
          />
          </div>
          <div className="card-body">
            <h4>Event's details :</h4>
            <br />
            <TextField
              name="name"
              label="Event Name"
              variant="outlined"
              value={reservation.event.name}
              fullWidth
              readOnly
            />
            <br />
            <br />
            <TextField
              name="location"
              label="Event Location"
              variant="outlined"
              value={reservation.event.location}
              fullWidth
              readOnly
            />
            <br />
            <br />
            <TextField
              name="type"
              label="Event Type"
              variant="outlined"
              value={reservation.event.type}
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
                label="Event Date"
                mask={"__/__/____"}
                fullWidth
                readOnly
                value={reservation.event.date.day}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <br />
            <br />
            <h4>Reservation By :</h4>
            <br />
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
            <br />
            <br />
            <TextField
              name="email"
              label="User's Email"
              variant="outlined"
              value={reservation.user.email}
              fullWidth
              readOnly
            />
            <br />
            <br />
            <TextField
              name="phone"
              label="User's Phone"
              variant="outlined"
              value={reservation.user.phone}
              fullWidth
              readOnly
            />
            <br />
            <br />
            <h4>{reservation.reservedplace} Places reserved</h4>
            <br />
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
            <h4>Price : {reservation.price}</h4>
            <br />
            <br />
          </div>
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
        </div>
      </div>
    </div>
  );
}

export default ListEventReservations;
