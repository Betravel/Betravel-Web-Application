import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { reservationActions } from "../Redux/reservationReducer";
import axios from "axios";
import RecapHotel from "./RecapHotel";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useNavigate } from "react-router-dom";

const steps = ["Select ", "Contact informations", "Confirm"];

function Reserve() {
  const auth = useSelector((state) => state.auth);
  const rooms = useSelector((state) => state.reservation.rooms);
  const details = useSelector((state) => state.reservation.details);
  const reservation = useSelector((state) => state.reservation);
  const dispatch = useDispatch();
  const history = useNavigate();
  useEffect(() => {
    dispatch(reservationActions.getUser(auth.user));
  }, [auth.user, dispatch]);

  const UserChangeHandler = (event) => {
    dispatch(
      reservationActions.updateUser({
        type: event.target.name,
        value: event.target.value,
      })
    );
  };

  const changeDetails = (event, type, i, index, champs) => {
    dispatch(
      reservationActions.addDetails({
        index,
        type,
        i,
        name: event.target.name,
        value: event.target.value,
        champs,
      })
    );
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/reservation/add", reservation)
      .then((res) => {
        history("/");
      })
      .catch((err) => console.log(err));
  };

  const [value, setValue] = useState("payment at the agency");

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <div className="container-fluid" style={{ backgroundColor: "#E9FBF3" }}>
      <br />
      <br />
      <br />
      <br />
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={1} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      <div className="col-12">
        <h1>BOOKING FORM</h1>
      </div>{" "}
      <form onSubmit={onSubmitHandler}>
        <div className="row">
          <div className="col-8">
            <br />
            {/*card personal info*/}
            <div class="card">
              <div class="card-body">
                <div
                  className="row"
                  style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  <div className="col-12">
                    <h2
                      style={{
                        textDecoration: "underline",
                        textAlign: "left",
                      }}
                    >
                      Personal informations
                    </h2>
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-6">
                    <TextField
                      id="firstname"
                      label="First Name"
                      variant="outlined"
                      name="firstname"
                      value={reservation.user.firstname}
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
                      value={reservation.user.lastname}
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
                      value={reservation.user.email}
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
                      value={reservation.user.phone}
                      onChange={UserChangeHandler}
                      fullWidth
                    />
                  </div>
                </div>
              </div>
            </div>
            {/*card rooms*/}
            <div class="card">
              <div class="card-body">
                {" "}
                <div
                  className="row"
                  style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  <div className="col-12">
                    <h2
                      style={{
                        textDecoration: "underline",
                        textAlign: "left",
                      }}
                    >
                      Room's informations
                    </h2>
                  </div>
                </div>
                <br />
                <br />
                {rooms.single.room.map((room, indexroom) => (
                  <div key={indexroom}>
                    <div className="row">
                      <div className="col-8">
                        <h4>Single room {indexroom + 1} </h4>
                      </div>
                      <div className="col-4">
                        <h6 style={{ textAlign: "left" }}>{room.pension}</h6>
                      </div>
                    </div>
                    <br />
                    {details.single[indexroom].adulte.map(
                      (adulte, indexadulte) => {
                        return (
                          <div key={indexadulte}>
                            <div className="row">
                              <div className="col-4">
                                Adult {indexadulte + 1} :
                              </div>
                              <div className="col-4">
                                <TextField
                                  variant="outlined"
                                  label="First name"
                                  id="firstname"
                                  name="firstname"
                                  value={adulte.firstname}
                                  onChange={(event) => {
                                    changeDetails(
                                      event,
                                      "single",
                                      indexadulte,
                                      indexroom,
                                      "adulte"
                                    );
                                  }}
                                  fullWidth
                                />
                              </div>
                              <div className="col-4">
                                <TextField
                                  variant="outlined"
                                  label="Last Name"
                                  id="lastname"
                                  name="lastname"
                                  value={adulte.lastname}
                                  onChange={(event) => {
                                    changeDetails(
                                      event,
                                      "single",
                                      indexadulte,
                                      indexroom,
                                      "adulte"
                                    );
                                  }}
                                  fullWidth
                                />
                              </div>
                            </div>
                            <br />
                            <br />
                          </div>
                        );
                      }
                    )}
                    <br />
                    {details.single[indexroom].enfant.map(
                      (enfant, indexenfant) => {
                        return (
                          <div key={indexenfant}>
                            <div className="row">
                              <div className="col-4">
                                {" "}
                                Enfant {indexenfant + 1}:{" "}
                              </div>
                              <div className="col-3">
                                <TextField
                                  variant="outlined"
                                  label="First name"
                                  id="firstname"
                                  name="firstname"
                                  value={enfant.firstname}
                                  onChange={(event) => {
                                    changeDetails(
                                      event,
                                      "single",
                                      indexenfant,
                                      indexroom,
                                      "enfant"
                                    );
                                  }}
                                  fullWidth
                                />
                              </div>
                              <div className="col-3">
                                <TextField
                                  variant="outlined"
                                  label="Last name"
                                  id="lastname"
                                  name="lastname"
                                  value={enfant.lastname}
                                  onChange={(event) => {
                                    changeDetails(
                                      event,
                                      "single",
                                      indexenfant,
                                      indexroom,
                                      "enfant"
                                    );
                                  }}
                                  fullWidth
                                />
                              </div>
                              <div className="col-2">
                                <FormControl fullWidth>
                                  <InputLabel id="age">Age</InputLabel>
                                  <Select
                                    labelId="age"
                                    id="age"
                                    name="age"
                                    value={enfant.age}
                                    onChange={(event) => {
                                      changeDetails(
                                        event,
                                        "single",
                                        indexenfant,
                                        indexroom,
                                        "enfant"
                                      );
                                    }}
                                  >
                                    <MenuItem value={0}>
                                      <em>0</em>
                                    </MenuItem>
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
                                    <MenuItem value={11}>11</MenuItem>
                                    <MenuItem value={12}>12</MenuItem>
                                  </Select>
                                </FormControl>
                              </div>{" "}
                              <br />
                            </div>
                            <br />
                          </div>
                        );
                      }
                    )}
                  </div>
                ))}
                <br />
                {rooms.double.room.map((room, indexroom) => (
                  <div key={indexroom}>
                    <div className="row">
                      <div className="col-8">
                        <h4> Double room {indexroom + 1} </h4>
                      </div>
                      <div className="col-4">
                        <h6 style={{ textAlign: "left" }}>{room.pension}</h6>
                      </div>
                    </div>
                    <br />

                    {details.double[indexroom].adulte.map(
                      (adulte, indexadulte) => {
                        return (
                          <div key={indexadulte}>
                            <div className="row">
                              <div className="col-4">
                                {" "}
                                Adult {indexadulte + 1} :{" "}
                              </div>
                              <div className="col-4">
                                <TextField
                                  variant="outlined"
                                  label="First name"
                                  id="firstname"
                                  name="firstname"
                                  value={adulte.firstname}
                                  onChange={(event) => {
                                    changeDetails(
                                      event,
                                      "double",
                                      indexadulte,
                                      indexroom,
                                      "adulte"
                                    );
                                  }}
                                  fullWidth
                                />
                              </div>
                              <div className="col-4">
                                <TextField
                                  variant="outlined"
                                  label="Last name"
                                  id="lastname"
                                  name="lastname"
                                  value={adulte.lastname}
                                  onChange={(event) => {
                                    changeDetails(
                                      event,
                                      "double",
                                      indexadulte,
                                      indexroom,
                                      "adulte"
                                    );
                                  }}
                                  fullWidth
                                />
                              </div>
                            </div>
                            <br />
                            <br />
                          </div>
                        );
                      }
                    )}
                    <br />
                    {details.double[indexroom].enfant.map(
                      (enfant, indexenfant) => {
                        return (
                          <div key={indexenfant}>
                            <div className="row">
                              <div className="col-4">
                                {" "}
                                Enfant {indexenfant + 1}:{" "}
                              </div>
                              <div className="col-3">
                                <TextField
                                  variant="outlined"
                                  label="First name"
                                  id="firstname"
                                  name="firstname"
                                  value={enfant.firstname}
                                  onChange={(event) => {
                                    changeDetails(
                                      event,
                                      "double",
                                      indexenfant,
                                      indexroom,
                                      "enfant"
                                    );
                                  }}
                                  fullWidth
                                />
                              </div>
                              <div className="col-3">
                                <TextField
                                  variant="outlined"
                                  label="Last name"
                                  id="lastname"
                                  name="lastname"
                                  value={enfant.lastname}
                                  onChange={(event) => {
                                    changeDetails(
                                      event,
                                      "double",
                                      indexenfant,
                                      indexroom,
                                      "enfant"
                                    );
                                  }}
                                  fullWidth
                                />
                              </div>
                              <div className="col-2">
                                <FormControl fullWidth>
                                  <InputLabel id="age">Age</InputLabel>
                                  <Select
                                    labelId="age"
                                    id="age"
                                    name="age"
                                    value={enfant.age}
                                    onChange={(event) => {
                                      changeDetails(
                                        event,
                                        "double",
                                        indexenfant,
                                        indexroom,
                                        "enfant"
                                      );
                                    }}
                                  >
                                    <MenuItem value={0}>
                                      <em>0</em>
                                    </MenuItem>
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
                                    <MenuItem value={11}>11</MenuItem>
                                    <MenuItem value={12}>12</MenuItem>
                                  </Select>
                                </FormControl>
                              </div>
                            </div>
                            <br />
                          </div>
                        );
                      }
                    )}
                  </div>
                ))}
                <br />
                {rooms.triple.room.map((room, indexroom) => (
                  <div key={indexroom}>
                    <div className="row">
                      <div className="col-8">
                        <h4> Triple room {indexroom + 1} </h4>
                      </div>
                      <div className="col-4">
                        <h6 style={{ textAlign: "left" }}>{room.pension}</h6>
                      </div>
                    </div>
                    <br />

                    {details.triple[indexroom].adulte.map(
                      (adulte, indexadulte) => {
                        return (
                          <div key={indexadulte}>
                            <div className="row">
                              <div className="col-4">
                                {" "}
                                Adult {indexadulte + 1} :{" "}
                              </div>
                              <div className="col-4">
                                <TextField
                                  variant="outlined"
                                  label="First name"
                                  id="firstname"
                                  name="firstname"
                                  value={adulte.firstname}
                                  onChange={(event) => {
                                    changeDetails(
                                      event,
                                      "triple",
                                      indexadulte,
                                      indexroom,
                                      "adulte"
                                    );
                                  }}
                                  fullWidth
                                  readOnly
                                />
                              </div>
                              <div className="col-4">
                                <TextField
                                  variant="outlined"
                                  label="Last name"
                                  id="lastname"
                                  name="lastname"
                                  value={adulte.lastname}
                                  onChange={(event) => {
                                    changeDetails(
                                      event,
                                      "triple",
                                      indexadulte,
                                      indexroom,
                                      "adulte"
                                    );
                                  }}
                                  fullWidth
                                />
                              </div>
                            </div>
                            <br />
                            <br />
                          </div>
                        );
                      }
                    )}
                    <br />
                    {details.triple[indexroom].enfant.map(
                      (enfant, indexenfant) => {
                        return (
                          <div key={indexenfant}>
                            <div className="row">
                              <div className="col-4">
                                {" "}
                                Enfant {indexenfant + 1}:{" "}
                              </div>
                              <div className="col-3">
                                <TextField
                                  variant="outlined"
                                  label="Last name"
                                  id="firstname"
                                  name="firstname"
                                  value={enfant.firstname}
                                  onChange={(event) => {
                                    changeDetails(
                                      event,
                                      "triple",
                                      indexenfant,
                                      indexroom,
                                      "enfant"
                                    );
                                  }}
                                  fullWidth
                                />
                              </div>
                              <div className="col-3">
                                <TextField
                                  variant="outlined"
                                  label="Last name"
                                  id="lastname"
                                  name="lastname"
                                  value={enfant.lastname}
                                  onChange={(event) => {
                                    changeDetails(
                                      event,
                                      "triple",
                                      indexenfant,
                                      indexroom,
                                      "enfant"
                                    );
                                  }}
                                  fullWidth
                                />
                              </div>
                              <div className="col-2">
                                <FormControl fullWidth>
                                  <InputLabel id="age">Age</InputLabel>
                                  <Select
                                    labelId="age"
                                    id="age"
                                    name="age"
                                    value={enfant.age}
                                    onChange={(event) => {
                                      changeDetails(
                                        event,
                                        "triple",
                                        indexenfant,
                                        indexroom,
                                        "enfant"
                                      );
                                    }}
                                  >
                                    <MenuItem value={0}>
                                      <em>0</em>
                                    </MenuItem>
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
                                    <MenuItem value={11}>11</MenuItem>
                                    <MenuItem value={12}>12</MenuItem>
                                  </Select>
                                </FormControl>
                              </div>
                            </div>
                            <br />
                            <br />
                          </div>
                        );
                      }
                    )}
                  </div>
                ))}
                <br />
                {rooms.quadruple.room.map((room, indexroom) => (
                  <div key={indexroom}>
                    <div className="row">
                      <div className="col-8">
                        <h4> Quadruple room {indexroom + 1} </h4>
                      </div>
                      <div className="col-4">
                        <h6 style={{ textAlign: "left" }}>{room.pension}</h6>
                      </div>
                    </div>
                    <br />

                    {details.quadruple[indexroom].adulte.map(
                      (adulte, indexadulte) => {
                        return (
                          <div key={indexadulte}>
                            <div className="row">
                              <div className="col-4">
                                {" "}
                                Adult {indexadulte + 1} :{" "}
                              </div>
                              <div className="col-4">
                                <TextField
                                  variant="outlined"
                                  label="First name"
                                  id="firstname"
                                  name="firstname"
                                  value={adulte.firstname}
                                  onChange={(event) => {
                                    changeDetails(
                                      event,
                                      "quadruple",
                                      indexadulte,
                                      indexroom,
                                      "adulte"
                                    );
                                  }}
                                  fullWidth
                                />
                              </div>
                              <div className="col-4">
                                <TextField
                                  variant="outlined"
                                  label="Last name"
                                  id="lastname"
                                  name="lastname"
                                  value={adulte.lastname}
                                  onChange={(event) => {
                                    changeDetails(
                                      event,
                                      "quadruple",
                                      indexadulte,
                                      indexroom,
                                      "adulte"
                                    );
                                  }}
                                  fullWidth
                                />
                              </div>
                            </div>
                            <br />
                            <br />
                          </div>
                        );
                      }
                    )}
                    <br />
                    {details.quadruple[indexroom].enfant.map(
                      (enfant, indexenfant) => {
                        return (
                          <div key={indexenfant}>
                            <div className="row">
                              <div className="col-4">
                                {" "}
                                Enfant {indexenfant + 1}:{" "}
                              </div>
                              <div className="col-3">
                                <TextField
                                  variant="outlined"
                                  label="Last name"
                                  id="firstname"
                                  name="firstname"
                                  value={enfant.firstname}
                                  onChange={(event) => {
                                    changeDetails(
                                      event,
                                      "quadruple",
                                      indexenfant,
                                      indexroom,
                                      "enfant"
                                    );
                                  }}
                                  fullWidth
                                />
                              </div>
                              <div className="col-3">
                                <TextField
                                  variant="outlined"
                                  label="Last name"
                                  id="lastname"
                                  name="lastname"
                                  value={enfant.lastname}
                                  onChange={(event) => {
                                    changeDetails(
                                      event,
                                      "quadruple",
                                      indexenfant,
                                      indexroom,
                                      "enfant"
                                    );
                                  }}
                                  fullWidth
                                />
                              </div>
                              <div className="col-2">
                                <FormControl fullWidth>
                                  <InputLabel id="age">Age</InputLabel>
                                  <Select
                                    labelId="age"
                                    id="age"
                                    name="age"
                                    value={enfant.age}
                                    onChange={(event) => {
                                      changeDetails(
                                        event,
                                        "quadruple",
                                        indexenfant,
                                        indexroom,
                                        "enfant"
                                      );
                                    }}
                                  >
                                    <MenuItem value={0}>
                                      <em>0</em>
                                    </MenuItem>
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
                                    <MenuItem value={11}>11</MenuItem>
                                    <MenuItem value={12}>12</MenuItem>
                                  </Select>
                                </FormControl>
                              </div>
                            </div>
                            <br />
                            <br />
                          </div>
                        );
                      }
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-4">
            <RecapHotel />
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <div className="row">
              <div className="col-12">
                <h2
                  style={{
                    textDecoration: "underline",
                    textAlign: "left",
                  }}
                >
                  Payment
                </h2>
              </div>
            </div>
            <div
              className="row"
              style={{
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={value}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="payment at the agency"
                    control={<Radio />}
                    label="Payment at the agency"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="Search__actions">
            <button type="submit">Confirm</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Reserve;
