import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { reservationActions } from "../Redux/reservationReducer";
import axios from "axios";
import RecapHotel from "./RecapHotel";

const steps = ["Select ", "Contact informations", "Confirm"];

function Reserve() {
  const auth = useSelector((state) => state.auth);
  const hotel = useSelector((state) => state.reservation.hotel);
  const rooms = useSelector((state) => state.reservation.rooms);
  const details = useSelector((state) => state.reservation.details);
  const reservation = useSelector((state) => state.reservation);
  const dispatch = useDispatch();

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
      .get("http://localhost:8000/api/reservation/add")
      .then((res) => {})
      .catch((err) => {});
  };
  return (
    <div className="container" style={{ marginTop: "100px" }}>
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
      </div>
      <div className="row">
        <div className="col-8">
          <form onSubmit={onSubmitHandler}>
            <div className="container">
              <div
                className="row"
                style={{
                  marginTop: "auto",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              ></div>
              <br />
              <div
                className="row"
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <div className="col-12">
                  <h2>Personal informations</h2>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-6">
                  <FormControl variant="filled" fullWidth>
                    <InputLabel htmlFor="firstname">First Name</InputLabel>
                    <FilledInput
                      id="firstname"
                      name="firstname"
                      value={reservation.user.firstname}
                      onChange={UserChangeHandler}
                    />
                  </FormControl>
                </div>
                <div className="col-6">
                  <FormControl variant="filled" fullWidth>
                    <InputLabel htmlFor="lastname">Last Name</InputLabel>
                    <FilledInput
                      id="lastname"
                      name="lastname"
                      value={reservation.user.lastname}
                      onChange={UserChangeHandler}
                    />
                  </FormControl>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-6">
                  <FormControl variant="filled" fullWidth>
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <FilledInput
                      id="email"
                      name="email"
                      value={reservation.user.email}
                      readOnly
                    />
                  </FormControl>
                </div>
                <div className="col-6">
                  <FormControl variant="filled" fullWidth>
                    <InputLabel htmlFor="phone" fullWidth>
                      Phone
                    </InputLabel>
                    <FilledInput
                      id="phone"
                      name="phone"
                      value={reservation.user.phone}
                      onChange={UserChangeHandler}
                    />
                  </FormControl>
                </div>
              </div>
              <div
                className="row"
                style={{
                  marginTop: "100px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <div className="col-12">
                  <h2>Room's informations</h2>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-6">
                  <FormControl variant="filled" fullWidth>
                    <InputLabel htmlFor="hotelname" fullWidth>
                      Hotel Name
                    </InputLabel>
                    <FilledInput
                      id="hotelname"
                      name="hotelname"
                      value={hotel.name}
                      readOnly
                    />
                  </FormControl>
                </div>
                <div className="col-6">
                  <FormControl variant="filled" fullWidth>
                    <InputLabel htmlFor="hotellocation" fullWidth>
                      Location
                    </InputLabel>
                    <FilledInput
                      id="hotellocation"
                      name="hotellocation"
                      value={hotel.location}
                      readOnly
                    />
                  </FormControl>
                </div>
              </div>
              <br />
              {rooms.single.room.map((room, indexroom) => (
                <div key={indexroom}>
                  <div className="row">
                    <div className="col-12">
                      <h4>Room {indexroom + 1} </h4>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <FormControl variant="filled" fullWidth>
                          <InputLabel htmlFor="single" fullWidth>
                            Type
                          </InputLabel>
                          <FilledInput id="single" value="Single" readOnly />
                        </FormControl>
                      </div>
                      <div className="col-6">
                        <FormControl variant="filled" fullWidth>
                          <InputLabel htmlFor="pension" fullWidth>
                            Pension
                          </InputLabel>
                          <FilledInput
                            id="pension"
                            name="pension"
                            value={room.pension}
                          />
                        </FormControl>
                      </div>
                    </div>
                  </div>
                  <br />
                  {details.single[indexroom].adulte.map(
                    (adulte, indexadulte) => {
                      return (
                        <div key={indexadulte}>
                          <div className="row">
                            <div className="col-4">
                              {" "}
                              Adult {indexadulte + 1} :{" "}
                            </div>
                            <div className="col-4">
                              <FormControl variant="filled" fullWidth>
                                <InputLabel htmlFor="firstname" fullWidth>
                                  Prenom
                                </InputLabel>
                                <FilledInput
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
                                />
                              </FormControl>
                            </div>
                            <div className="col-4">
                              <FormControl variant="filled" fullWidth>
                                <InputLabel htmlFor="lastname" fullWidth>
                                  Nom
                                </InputLabel>
                                <FilledInput
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
                                />
                              </FormControl>
                            </div>
                          </div>
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
                              <FormControl variant="filled" fullWidth>
                                <InputLabel htmlFor="firstname" fullWidth>
                                  Prenom
                                </InputLabel>
                                <FilledInput
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
                                />
                              </FormControl>
                            </div>
                            <div className="col-3">
                              <FormControl variant="filled" fullWidth>
                                <InputLabel htmlFor="lastname" fullWidth>
                                  Nom
                                </InputLabel>
                                <FilledInput
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
                                />
                              </FormControl>
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
              {rooms.double.room.map((room, indexroom) => (
                <div key={indexroom}>
                  <div className="row">
                    <div className="col-12">
                      <h4>Room {indexroom + 1} </h4>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <FormControl variant="filled" fullWidth>
                          <InputLabel htmlFor="double" fullWidth>
                            Type
                          </InputLabel>
                          <FilledInput id="double" value="Double" readOnly />
                        </FormControl>
                      </div>
                      <div className="col-6">
                        <FormControl variant="filled" fullWidth>
                          <InputLabel htmlFor="pension" fullWidth>
                            Pension
                          </InputLabel>
                          <FilledInput
                            id="pension"
                            name="pension"
                            value={room.pension}
                          />
                        </FormControl>
                      </div>
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
                              <FormControl variant="filled" fullWidth>
                                <InputLabel htmlFor="firstname" fullWidth>
                                  Prenom
                                </InputLabel>
                                <FilledInput
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
                                />
                              </FormControl>
                            </div>
                            <div className="col-4">
                              <FormControl variant="filled" fullWidth>
                                <InputLabel htmlFor="lastname" fullWidth>
                                  Nom
                                </InputLabel>
                                <FilledInput
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
                                />
                              </FormControl>
                            </div>
                          </div>
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
                              <FormControl variant="filled" fullWidth>
                                <InputLabel htmlFor="firstname" fullWidth>
                                  Prenom
                                </InputLabel>
                                <FilledInput
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
                                />
                              </FormControl>
                            </div>
                            <div className="col-3">
                              <FormControl variant="filled" fullWidth>
                                <InputLabel htmlFor="lastname" fullWidth>
                                  Nom
                                </InputLabel>
                                <FilledInput
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
                                />
                              </FormControl>
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
                    <div className="col-12">
                      <h4>Room {indexroom + 1} </h4>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <FormControl variant="filled" fullWidth>
                          <InputLabel htmlFor="triple" fullWidth>
                            Type
                          </InputLabel>
                          <FilledInput id="triple" value="Triple" readOnly />
                        </FormControl>
                      </div>
                      <div className="col-6">
                        <FormControl variant="filled" fullWidth>
                          <InputLabel htmlFor="pension" fullWidth>
                            Pension
                          </InputLabel>
                          <FilledInput
                            id="pension"
                            name="pension"
                            value={room.pension}
                          />
                        </FormControl>
                      </div>
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
                              <FormControl variant="filled" fullWidth>
                                <InputLabel htmlFor="firstname" fullWidth>
                                  Prenom
                                </InputLabel>
                                <FilledInput
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
                                />
                              </FormControl>
                            </div>
                            <div className="col-4">
                              <FormControl variant="filled" fullWidth>
                                <InputLabel htmlFor="lastname" fullWidth>
                                  Nom
                                </InputLabel>
                                <FilledInput
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
                                />
                              </FormControl>
                            </div>
                          </div>
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
                              <FormControl variant="filled" fullWidth>
                                <InputLabel htmlFor="firstname" fullWidth>
                                  Prenom
                                </InputLabel>
                                <FilledInput
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
                                />
                              </FormControl>
                            </div>
                            <div className="col-3">
                              <FormControl variant="filled" fullWidth>
                                <InputLabel htmlFor="lastname" fullWidth>
                                  Nom
                                </InputLabel>
                                <FilledInput
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
                                />
                              </FormControl>
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
                    <div className="col-12">
                      <h4>Room {indexroom + 1} </h4>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <FormControl variant="filled" fullWidth>
                          <InputLabel htmlFor="quadruple" fullWidth>
                            Type
                          </InputLabel>
                          <FilledInput
                            id="quadruple"
                            value="Quadruple"
                            readOnly
                          />
                        </FormControl>
                      </div>
                      <div className="col-6">
                        <FormControl variant="filled" fullWidth>
                          <InputLabel htmlFor="pension" fullWidth>
                            Pension
                          </InputLabel>
                          <FilledInput
                            id="pension"
                            name="pension"
                            value={room.pension}
                          />
                        </FormControl>
                      </div>
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
                              <FormControl variant="filled" fullWidth>
                                <InputLabel htmlFor="firstname" fullWidth>
                                  Prenom
                                </InputLabel>
                                <FilledInput
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
                                />
                              </FormControl>
                            </div>
                            <div className="col-4">
                              <FormControl variant="filled" fullWidth>
                                <InputLabel htmlFor="lastname" fullWidth>
                                  Nom
                                </InputLabel>
                                <FilledInput
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
                                />
                              </FormControl>
                            </div>
                          </div>
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
                              <FormControl variant="filled" fullWidth>
                                <InputLabel htmlFor="firstname" fullWidth>
                                  Prenom
                                </InputLabel>
                                <FilledInput
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
                                />
                              </FormControl>
                            </div>
                            <div className="col-3">
                              <FormControl variant="filled" fullWidth>
                                <InputLabel htmlFor="lastname" fullWidth>
                                  Nom
                                </InputLabel>
                                <FilledInput
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
                                />
                              </FormControl>
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
                        </div>
                      );
                    }
                  )}
                </div>
              ))}
            </div>
            <div>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
        <div className="col-4">
          <RecapHotel />
        </div>
      </div>
    </div>
  );
}

export default Reserve;
