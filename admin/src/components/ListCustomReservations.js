import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import axios from "axios";
import frLocale from "date-fns/locale/fr";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";
import { getTrip } from "../Redux/tripreservationReducer";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

function renameKey(obj, oldKey, newKey) {
  obj[newKey] = obj[oldKey];
  delete obj[oldKey];
}

function ListCustomReservations() {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const reservation = useSelector((state) => state.trip);
  const dispatch = useDispatch();
  const cols = [
    { field: "id", headerName: "ReservationID", width: "200" },
    {
      field: "user",
      headerName: "User's Name",
      width: "150",
      renderCell: (params) => (
        <h>{params.value?.firstname + " " + params.value?.lastname}</h>
      ),
    },
    { field: "typeDestination", headerName: "Type", width: "150" },
    {
      field: "nuits",
      headerName: "Periode",
      width: "150",
      renderCell: (params) => <h>{params.value + " nuit(s)"}</h>,
    },
    {
      field: "nbrPersonnes",
      headerName: "Persons",
      width: "150",
      renderCell: (params) => <h>{params.value + " personne(s)"}</h>,
    },
    {
      field: "events",
      headerName: "Selected Events",
      width: "150",
      renderCell: (params) => <h>{params.value?.length}</h>,
    },
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
      .get("http://localhost:8000/api/trip/getall")
      .then((res) => {
        var j = res.data;
        j.forEach((obj) => renameKey(obj, "_id", "id"));
        setdata(j);
        console.log(j);
      })
      .catch((err) => console.log(err));
  }, []);

  const viewEvent = useCallback(
    (id) => () => {
      setTimeout(() => {
        dispatch(getTrip(id));
        setOpen(true);
      });
    },
    [dispatch]
  );

  const ConfirmTrip = () => {
    axios
      .put("http://localhost:8000/api/trip/confirm/" + reservation.id)
      .then((res) => window.location.reload(false))
      .catch((err) => console.log(err));
  };
  const cancelTrip = () => {
    axios
      .put("http://localhost:8000/api/trip/cancel/" + reservation.id)
      .then((res) => window.location.reload(false))
      .catch((err) => console.log(err));
  };
  return (
    <div className="row" style={{ marginTop: "50px", marginBottom: "20px" }}>
      <div className="col-12">
        <h1>List Custom-made's Reservations</h1>
        <br />
        <div style={{ height: window.innerHeight - 150, width: "100%" }}>
          <DataGrid rows={data} columns={cols} />
        </div>
      </div>

      <div>
        <Dialog fullWidth maxWidth="lg" open={open} onClose={handleClose}>
          <DialogTitle>Reservation's Details</DialogTitle>
          <DialogContent>
            <div className="row">
              <h4>Trip's details :</h4>
            </div>
            <br />
            <div className="row">
              <div className="col-4" style={{ margin: "auto" }} align="center">
                <h5>Type</h5>
                <br />
                <TextField
                  name="typeDestination"
                  label="Type Destination"
                  variant="outlined"
                  value={reservation.typeDestination}
                  fullWidth
                  readOnly
                />
              </div>
              <div className="col-4" style={{ margin: "auto" }} align="center">
                <h5> {reservation.nbrDestination} Destination(s)</h5>
                {reservation.destinations.map((destination, i) => {
                  return (
                    <div key={i}>
                      <br />
                      <TextField
                        name="type"
                        label={"Destination" + (i + 1)}
                        variant="outlined"
                        value={destination}
                        fullWidth
                        readOnly
                      />
                      <br />
                    </div>
                  );
                })}
              </div>
              <div className="col-4" style={{ margin: "auto" }} align="center">
                <h5>{reservation.nuits} Nights</h5>
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
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-4" style={{ margin: "auto" }} align="center">
                <h5>{reservation.nbrPersonnes} Person(s)</h5>
              </div>
              <div className="col-8" style={{ margin: "auto" }}>
                {reservation.personnes.map((person, i) => {
                  return (
                    <div key={i}>
                      <TextField
                        name="Person"
                        label={"Person" + (i + 1)}
                        variant="outlined"
                        value={person.firstname + " " + person.lastname}
                        fullWidth
                        readOnly
                      />
                      <br />
                    </div>
                  );
                })}
              </div>
            </div>
            <br />
            <div className="row">
              <h4>Selected Events</h4>
            </div>
            <br />
            <div className="row">
              {reservation.events.length === 0 ? (
                "No Events selected !!!"
              ) : (
                <div>
                  {reservation.events.map((event, i) => {
                    return (
                      <div key={i}>
                        {event.name} / {event.location}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <br />
            <div className="row">
              <h4>Sent By :</h4>
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
          </DialogContent>
          <DialogActions>
            {reservation.status === "canceled" ? (
              <Button autoFocus onClick={cancelTrip}>
                Close
              </Button>
            ) : (
              <Button autoFocus onClick={handleClose}>
                Disagree
              </Button>
            )}
            {reservation.status === "processing" ? (
              <Button onClick={ConfirmTrip} autoFocus>
                Agree
              </Button>
            ) : (
              ""
            )}
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default ListCustomReservations;
