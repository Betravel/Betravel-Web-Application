import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getEvents, tripActions } from "../Redux/tripReducer";
import { Locations } from "../locations";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DateRangePicker from "@mui/lab/DateRangePicker";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { navbarActions } from "../Redux/navbarReducer";
import { authActions } from "../Redux/authReducer";
import { getAuth } from "../Redux/authReducer";

function VanccancesSurMesure() {
  const trip = useSelector((state) => state.trip);
  const user = useSelector((state) => state.auth.user);
  const history = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getAuth());
  }, []);

  useEffect(() => {
    dispatch(navbarActions.updatenavbar(false));
    dispatch(tripActions.getUser(user));
    dispatch(getEvents(trip.destinations));
  }, [dispatch, trip.destinations, user]);

  const updateTrip = (e) => {
    dispatch(
      tripActions.updateTrip({
        type: e.target.name,
        value: e.target.value,
      })
    );
  };
  const updatePersonnes = (e, index) => {
    dispatch(
      tripActions.updatepersonnes({
        index,
        type: e.target.name,
        value: e.target.value,
      })
    );
  };
  const updateDestinations = (value, index) => {
    dispatch(
      tripActions.updatedestinations({
        index,
        value,
      })
    );
  };
  const updateOptions = (e) => {
    dispatch(
      tripActions.updateoptions({
        status: e.target.checked,
        value: e.target.name,
      })
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/trip/add", trip)
      .then((res) => {
        history("/");
      })
      .catch((err) => console.log(err));
  };

  const updateEvents = (e, value) => {
    dispatch(
      tripActions.updateevents({
        type: e.target.checked,
        value,
      })
    );
  };

  const UserChangeHandler = (event) => {
    dispatch(
      authActions.updateUser({
        type: event.target.name,
        value: event.target.value,
      })
    );
  };

  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  today = mm + "-" + dd + "-" + yyyy;
  return (
    <div className="container-fluid">
      <div className="row ">
        <div className="col-12" style={{ marginTop: "100px" }}>
          <h1>Custom-made Trip </h1>
          <form onSubmit={onSubmit}>
            <div className="container">
              <div className="row">
                <div className="col-12" style={{ textAlign: "left" }}>
                  <h3 style={{ textDecoration: "underline" }}>
                    {" "}
                    Personal informations
                  </h3>
                  <br />
                </div>
              </div>
              <div class="card">
                <div class="card-body">
                  <br />
                  <div className="row">
                    <div className="col-6">
                      <TextField
                        id="firstname"
                        label="First Name"
                        variant="outlined"
                        name="firstname"
                        value={trip.user.firstname}
                        onChange={UserChangeHandler}
                        fullWidth
                      />
                    </div>
                    <div className="col-6">
                      <TextField
                        id="lastname"
                        label="Last Name"
                        variant="outlined"
                        name="lastname"
                        value={trip.user.lastname}
                        onChange={UserChangeHandler}
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
                        value={trip.user.email}
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
                        value={trip.user.phone}
                        onChange={UserChangeHandler}
                        fullWidth
                      />
                    </div>
                  </div>
                  <br />
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-12" style={{ textAlign: "left" }}>
                  <h3 style={{ textDecoration: "underline" }}>Destination</h3>
                  <br />
                </div>
              </div>
              <div class="card">
                <div class="card-body">
                  <div className="row">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DateRangePicker
                        startText="Check-in"
                        endText="Check-out"
                        value={trip.periode}
                        minDate={new Date(today)}
                        required
                        onChange={(newValue) => {
                          dispatch(tripActions.updateperiode(newValue));
                        }}
                        renderInput={(startProps, endProps) => (
                          <React.Fragment>
                            <TextField {...startProps} fullWidth />
                            <Box sx={{ mx: 2 }}> to </Box>
                            <TextField {...endProps} fullWidth />
                          </React.Fragment>
                        )}
                      />
                    </LocalizationProvider>
                  </div>
                  <br />
                  <div
                    className="row"
                    style={{ marginLeft: "20px", marginRight: "20px" }}
                  >
                    <div className="col-3">
                      <FormControl fullWidth>
                        <InputLabel id="type">Type Destination</InputLabel>
                        <Select
                          labelId="type"
                          name="typeDestination"
                          value={trip.typeDestination}
                          label="Type Destination"
                          onChange={updateTrip}
                        >
                          <MenuItem value="uni">uniDestination</MenuItem>
                          <MenuItem value="multi">multiDestination</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <div className="col-3">
                      <FormControl fullWidth>
                        <InputLabel id="nbr">Nombre Destinations</InputLabel>
                        {trip.typeDestination === "uni" ? (
                          <Select
                            labelId="nbr"
                            name="nbrDestination"
                            value={trip.nbrDestination}
                            label="Nombre Destinations"
                            onChange={updateTrip}
                          >
                            <MenuItem value={1}>1</MenuItem>
                          </Select>
                        ) : (
                          <Select
                            labelId="nbr"
                            name="nbrDestination"
                            value={trip.nbrDestination}
                            label="Nombre Destinations"
                            onChange={updateTrip}
                          >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                          </Select>
                        )}
                      </FormControl>
                    </div>
                    <div className="col-6">
                      {trip.destinations.map((destination, i) => {
                        return (
                          <div key={i}>
                            <div className="row">
                              <Autocomplete
                                fullWidth
                                name="Destination"
                                options={Locations}
                                value={destination}
                                onChange={(e, value) =>
                                  updateDestinations(value, i)
                                }
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label={"Destination " + (i + 1)}
                                    fullWidth
                                  />
                                )}
                              />
                            </div>
                            <br />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <br />

                  <br />
                </div>
              </div>
            </div>
            <br />
            <div className="container">
              <div className="row">
                <div className="col-12" style={{ textAlign: "left" }}>
                  <h3 style={{ textDecoration: "underline" }}>Personnes</h3>
                  <br />
                </div>
              </div>
              <div class="card">
                <div class="card-body">
                  <div
                    className="row"
                    style={{ marginLeft: "20px", marginRight: "20px" }}
                  >
                    <div className="col-6">
                      <FormControl fullWidth>
                        <InputLabel id="Personnes">Nombre Personnes</InputLabel>
                        <Select
                          labelId="Personnes"
                          name="nbrPersonnes"
                          value={trip.nbrPersonnes}
                          label="Nombre Personnes"
                          onChange={updateTrip}
                        >
                          <MenuItem value={1}>1</MenuItem>
                          <MenuItem value={2}>2</MenuItem>
                          <MenuItem value={3}>3</MenuItem>
                          <MenuItem value={4}>4</MenuItem>
                          <MenuItem value={5}>5</MenuItem>
                          <MenuItem value={6}>6</MenuItem>
                          <MenuItem value={7}>7</MenuItem>
                          <MenuItem value={8}>8</MenuItem>
                          <MenuItem value={9}>9</MenuItem>
                          <MenuItem value={10}>10</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                  <br />
                  {trip.personnes.map((personne, i) => {
                    return (
                      <div key={i}>
                        <div className="row">
                          <div className="col-4">Person {i + 1}</div>
                          <div className="col-4">
                            <TextField
                              variant="outlined"
                              label="Firstname"
                              name="firstname"
                              value={personne.firstname}
                              onChange={(e) => updatePersonnes(e, i)}
                              fullWidth
                            />
                          </div>
                          <div className="col-4">
                            <TextField
                              variant="outlined"
                              label="Lastname"
                              name="lastname"
                              value={personne.lastname}
                              onChange={(e) => updatePersonnes(e, i)}
                              fullWidth
                            />
                          </div>
                        </div>
                        <br />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <br />
            <div className="container">
              <div className="row">
                <div className="col-12" style={{ textAlign: "left" }}>
                  <h3 style={{ textDecoration: "underline" }}>Events</h3>
                  <br />
                </div>
              </div>
              <div class="card">
                <div class="card-body">
                  {trip.listevents.length === 0 ? (
                    <h5>No available events </h5>
                  ) : (
                    <div className="container">
                      <div className="row">
                        {trip.listevents.map((event, index) => {
                          return (
                            <div className="col-4">
                              <div key={index}>
                                <div
                                  class="card"
                                  style={{ width: "95%", height: "600px" }}
                                >
                                  <div align="right">
                                    <Checkbox
                                      label="Label"
                                      name={event._id}
                                      onClick={(e) => updateEvents(e, event)}
                                    />
                                  </div>
                                  <img
                                    src={event.images[0].url}
                                    alt=""
                                    width="100%"
                                    height="300px"
                                  />
                                  <div className="card-body">
                                    <h5 className="card-title">{event.name}</h5>
                                    <div>
                                      <img
                                        src="https://res.cloudinary.com/betravel/image/upload/v1646934456/BeTravel/assets/icons8-place-marker_zknh1z.gif"
                                        alt=""
                                        width="30"
                                      />
                                      {event.location}
                                    </div>
                                    <div className="row">
                                      <div align="left">
                                        <div className="row ">
                                          <div className="col-4">
                                            <img
                                              src="https://img.icons8.com/ios/20/000000/calendar--v1.png"
                                              alt=""
                                            />
                                          </div>
                                          {/* {event.type === "randonnee" ? (
                            <div className="col-8">
                              {event.date.day.getDate() +
                                "/" +
                                (event.date.day.getMonth() + 1) +
                                "/" +
                                event.date.day.getFullYear()}
                            </div>
                          ) : (
                            <div className="col-8">
                              {event.date.from.getDate() +
                                "/" +
                                (event.date.from.getMonth() + 1) +
                                "/" +
                                event.date.from.getFullYear()}
                            </div>
                          )} */}
                                        </div>
                                      </div>
                                      <br />
                                      <div align="left">
                                        <div className="row ">
                                          <div className="col-4">
                                            <img
                                              src="https://img.icons8.com/ios-filled/20/000000/trainers.png"
                                              alt=""
                                            />
                                          </div>
                                          <div className="col-8">
                                            Circuit de 20 Km
                                          </div>
                                        </div>
                                      </div>
                                      <br />
                                      <br />
                                      <div className="row">
                                        <div className="col-12">
                                          <Link
                                            to={"/Event/Detail/" + event._id}
                                          >
                                            <div className="Search__actions">
                                              <button className="btn button">
                                                show details
                                              </button>
                                            </div>
                                          </Link>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}{" "}
                      </div>
                    </div>
                  )}
                  <br />
                </div>
              </div>
            </div>
            <br />
            <div className="container">
              <div className="row">
                <div className="col-12" style={{ textAlign: "left" }}>
                  <h3 style={{ textDecoration: "underline" }}>Options</h3>
                  <br />
                </div>
              </div>
              <div class="card">
                <div class="card-body">
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox name="guide" onClick={updateOptions} />
                      }
                      label="Guide"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox name="transport" onClick={updateOptions} />
                      }
                      label="Means of transport"
                    />
                  </FormGroup>
                </div>
                <br />
              </div>
            </div>
            <br />
            <div className="row">
              <div className="Search__actions">
                <button type="submit">Send Request</button>
              </div>
            </div>
          </form>
          <br />
        </div>
      </div>
    </div>
  );
}
export default VanccancesSurMesure;
