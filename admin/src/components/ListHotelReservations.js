import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import Rating from "@mui/material/Rating";
import { getHotelReservation } from "../Redux/hotelreservationsReducer";
import Typography from "@mui/material/Typography";

function renameKey(obj, oldKey, newKey) {
  obj[newKey] = obj[oldKey];
  delete obj[oldKey];
}

function ListHotelReservations() {
  const reservation = useSelector((state) => state.hotelreservation);
  const dispatch = useDispatch();
  const cols = [
    { field: "id", headerName: "ReservationID", width: "250" },
    {
      field: "hotel",
      headerName: "Hotel's Name",
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
      field: "nuits",
      headerName: "Nights",
      width: "150",
      renderCell: (params) => <h>{params.value + " nuit(s)"}</h>,
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
        setOpen(true);
      });
    },
    [dispatch]
  );
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

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
        className="col-12"
        style={{ marginTop: "auto", marginBottom: "auto" }}
      >
        <h1>List Hotel's Reservations</h1>
        <br />
        <div style={{ height: window.innerHeight - 150, width: "100%" }}>
          <DataGrid rows={data} columns={cols} />
        </div>
      </div>
      <Dialog fullWidth maxWidth="lg" open={open} onClose={handleClose}>
        <DialogTitle>Reservation's Details</DialogTitle>
        <DialogContent>
          <div className="row">
            <h4>Hotel's details :</h4>
          </div>
          <br />
          <div className="row">
            <div className="col-4">
              <TextField
                name="name"
                label="Hotel's Name"
                variant="outlined"
                value={reservation.hotel.name}
                fullWidth
                readOnly
              />
            </div>
            <div className="col-4" align="center">
              <Typography component="legend">Rating</Typography>
              <Rating
                name="read-only"
                value={reservation.hotel.rating}
                readOnly
              />
            </div>
            <div className="col-4">
              <TextField
                name="location"
                label="Hotel's Location"
                variant="outlined"
                value={reservation.hotel.location}
                fullWidth
                readOnly
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-3" align="center">
              <h4>{reservation.nuits} Nights reserved</h4>
            </div>
            <div className="col-3">
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
            </div>
            <div className="col-1">
              <h5>To</h5>
            </div>
            <div className="col-3">
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
            </div>
            <div className="col" align="center">
              <h4>Price : {reservation.price} DT</h4>
            </div>
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
          <div className="row">
            <h4>Rooms'details</h4>
          </div>
          <br />
          <div className="row">
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
          </div>
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

export default ListHotelReservations;
