import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import axios from "axios";
import frLocale from "date-fns/locale/fr";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";
import { getHotelReservation } from "../Redux/hotelreservationsReducer";

function renameKey(obj, oldKey, newKey) {
  obj[newKey] = obj[oldKey];
  delete obj[oldKey];
}

function ListHotelReservations() {
  const reservation = useSelector((state) => state.hotelreservation);
  const dispatch = useDispatch();
  const cols = [
    { field: "id", headerName: "ReservationID", width: "200" },
    {
      field: "hotel",
      headerName: "Hotel's Name",
      width: "300",
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
    { field: "nuits", headerName: "Nights", width: "150" },
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
      .get("http://localhost:8000/api/reservationHotel/getall")
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
        dispatch(getHotelReservation(id));
      });
    },
    [dispatch]
  );

  const ConfirmEvent = () => {
    axios
      .put(
        "http://localhost:8000/api/reservationHotel/confirm/" + reservation.id
      )
      .then((res) => window.location.reload(false))
      .catch((err) => console.log(err));
  };
  const cancelEvent = () => {
    axios
      .put(
        "http://localhost:8000/api/reservationHotel/cancel/" + reservation.id
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
        <h1>List Hotel's Reservations</h1>
        <br />
        <div style={{ height: 1200, width: "100%" }}>
          <div style={{ height: 1150, width: "100%" }}>
            <DataGrid rows={data} columns={cols} />
          </div>
        </div>
      </div>
      <div className="col-3">
        <h2>Reservation's Details</h2>
        <div className="card">
          <div style={{ backgroundColor: "#abc4b1" }}>
            <img
              src="https://img.icons8.com/ios-filled/150/ffffff/reservation.png"
              alt=""
            />
          </div>
          <div className="card-body">
            <h4>Hotel's details :</h4>
            <br />
            <TextField
              name="name"
              label="Hotel's Name"
              variant="outlined"
              value={reservation.hotel.name}
              fullWidth
              readOnly
            />
            <br />
            <br />
            <TextField
              name="location"
              label="Hotel's Location"
              variant="outlined"
              value={reservation.hotel.location}
              fullWidth
              readOnly
            />
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
            <h4>{reservation.nuits} Nights reserved</h4>
            <br />
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              locale={frLocale}
            >
              <DatePicker
                label="From Date"
                mask={"__/__/____"}
                fullWidth
                readOnly
                value={reservation.periode[0]}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <br />
            <br />
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              locale={frLocale}
            >
              <DatePicker
                label="To Date"
                mask={"__/__/____"}
                fullWidth
                readOnly
                value={reservation.periode[1]}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <br />
            <br />
            <h4>Rooms'details</h4>
            <br />
            {reservation.details.single.length !== 0 ? (
              <div>
                <h5>{reservation.details.single.length} Single Room(s)</h5>
                <br />
                {reservation.details.single.map((room, i) => {
                  return (
                    <div key={i}>
                      <h6>Single Room N° {i + 1}</h6>
                      <br />
                      {room.adulte.map((adulte, i) => {
                        return (
                          <div key={i}>
                            <TextField
                              name="Person"
                              label={"Adult" + (i + 1)}
                              variant="outlined"
                              value={adulte.firstname + " " + adulte.lastname}
                              fullWidth
                              readOnly
                            />
                            <br />
                            <br />
                          </div>
                        );
                      })}
                      {room.enfant.map((kid, i) => {
                        return (
                          <div key={i}>
                            <TextField
                              name="Person"
                              label={"kids" + (i + 1)}
                              variant="outlined"
                              value={kid.firstname + " " + kid.lastname}
                              fullWidth
                              readOnly
                            />
                            <br />
                            <br />
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            ) : (
              ""
            )}
            {reservation.details.double.length !== 0 ? (
              <div>
                <h5>{reservation.details.double.length} Double Room(s)</h5>
                <br />
                {reservation.details.double.map((room, i) => {
                  return (
                    <div key={i}>
                      <h6>Double Room N° {i + 1}</h6>
                      <br />
                      {room.adulte.map((adulte, i) => {
                        return (
                          <div key={i}>
                            <TextField
                              name="Person"
                              label={"Adult" + (i + 1)}
                              variant="outlined"
                              value={adulte.firstname + " " + adulte.lastname}
                              fullWidth
                              readOnly
                            />
                            <br />
                            <br />
                          </div>
                        );
                      })}
                      {room.enfant.map((kid, i) => {
                        return (
                          <div key={i}>
                            <TextField
                              name="Person"
                              label={"kids" + (i + 1)}
                              variant="outlined"
                              value={kid.firstname + " " + kid.lastname}
                              fullWidth
                              readOnly
                            />
                            <br />
                            <br />
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            ) : (
              ""
            )}
            {reservation.details.triple.length !== 0 ? (
              <div>
                <h5>{reservation.details.triple.length} Triple Room(s)</h5>
                <br />
                {reservation.details.triple.map((room, i) => {
                  return (
                    <div key={i}>
                      <h6>Triple Room N° {i + 1}</h6>
                      <br />
                      {room.adulte.map((adulte, i) => {
                        return (
                          <div key={i}>
                            <TextField
                              name="Person"
                              label={"Adult" + (i + 1)}
                              variant="outlined"
                              value={adulte.firstname + " " + adulte.lastname}
                              fullWidth
                              readOnly
                            />
                            <br />
                            <br />
                          </div>
                        );
                      })}
                      {room.enfant.map((kid, i) => {
                        return (
                          <div key={i}>
                            <TextField
                              name="Person"
                              label={"kids" + (i + 1)}
                              variant="outlined"
                              value={kid.firstname + " " + kid.lastname}
                              fullWidth
                              readOnly
                            />
                            <br />
                            <br />
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            ) : (
              ""
            )}
            {reservation.details.quadruple.length !== 0 ? (
              <div>
                <h5>
                  {reservation.details.quadruple.length} Quadruple Room(s)
                </h5>
                <br />
                {reservation.details.quadruple.map((room, i) => {
                  return (
                    <div key={i}>
                      <h6>Quadruple Room N° {i + 1}</h6>
                      <br />
                      {room.adulte.map((adulte, i) => {
                        return (
                          <div key={i}>
                            <TextField
                              name="Person"
                              label={"Adult" + (i + 1)}
                              variant="outlined"
                              value={adulte.firstname + " " + adulte.lastname}
                              fullWidth
                              readOnly
                            />
                            <br />
                            <br />
                          </div>
                        );
                      })}
                      {room.enfant.map((kid, i) => {
                        return (
                          <div key={i}>
                            <TextField
                              name="Person"
                              label={"kids" + (i + 1)}
                              variant="outlined"
                              value={kid.firstname + " " + kid.lastname}
                              fullWidth
                              readOnly
                            />
                            <br />
                            <br />
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            ) : (
              ""
            )}
            <h4>Price : {reservation.price}</h4>
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

export default ListHotelReservations;
