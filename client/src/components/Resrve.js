import { useEffect, useState } from "react";
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

const steps = ["Select ", "Contact informations", "Confirm"];

function Reserve() {
  const auth = useSelector((state) => state.auth);
  const hotel = useSelector((state) => state.reservation.hotel);
  const rooms = useSelector((state) => state.reservation.rooms);
  const reservation = useSelector((state) => state.reservation);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(reservationActions.getUser(auth.user));
  }, [auth.user, dispatch]);

  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .get("http://localhost:8000/api/reservation/add")
      .then((res) => {})
      .catch((err) => {});
  };
  return (
    <div style={{ marginTop: "100px" }}>
      {" "}
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={1} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      <form onSubmit={onSubmitHandler}>
        <div className="container">
          <div
            className="row"
            style={{
              marginTop: "auto",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <div className="col-12">
              <h1>BOOKING FORM</h1>
            </div>
          </div>
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
                <InputLabel htmlFor="component-filled">First Name</InputLabel>
                <FilledInput
                  id="component-filled"
                  value={reservation.user.firstname}
                  // onChange={UserChangeHandler}
                />
              </FormControl>
            </div>
            <div className="col-6">
              <FormControl variant="filled" fullWidth>
                <InputLabel htmlFor="component-filled">Last Name</InputLabel>
                <FilledInput
                  id="component-filled"
                  value={reservation.user.lastname}
                  // onChange={UserChangeHandler}
                />
              </FormControl>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-6">
              <FormControl variant="filled" fullWidth>
                <InputLabel htmlFor="component-filled">Email</InputLabel>
                <FilledInput
                  id="component-filled"
                  value={reservation.user.email}
                  // onChange={UserChangeHandler}
                />
              </FormControl>
            </div>
            <div className="col-6">
              <FormControl variant="filled" fullWidth>
                <InputLabel htmlFor="component-filled" fullWidth>
                  Phone
                </InputLabel>
                <FilledInput
                  id="component-filled"
                  value={reservation.user.phone}
                  // onChange={UserChangeHandler}
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
              {" "}
              <FormControl variant="filled" fullWidth>
                <InputLabel htmlFor="component-filled" fullWidth>
                  Hotel Name
                </InputLabel>
                <FilledInput id="component-filled" value={hotel.name} />
              </FormControl>
            </div>
            <div className="col-6">
              {" "}
              <FormControl variant="filled" fullWidth>
                <InputLabel htmlFor="component-filled" fullWidth>
                  {" "}
                  Location
                </InputLabel>
                <FilledInput id="component-filled" value={hotel.location} />
              </FormControl>
            </div>
          </div>
          <br />
          {rooms.single.room.map((room, i) => (
            <div key={i}>
              <div className="row">
                <div className="col-12">
                  <h4>Room {i + 1} </h4>
                </div>
                <div className="row">
                  <div className="col-6">
                    {" "}
                    <FormControl variant="filled" fullWidth>
                      <InputLabel htmlFor="component-filled" fullWidth>
                        Type
                      </InputLabel>
                      <FilledInput id="component-filled" value=" Single" />
                    </FormControl>
                  </div>
                  <div className="col-6">
                    {" "}
                    <FormControl variant="filled" fullWidth>
                      <InputLabel htmlFor="component-filled" fullWidth>
                        {" "}
                        Pension
                      </InputLabel>
                      <FilledInput id="component-filled" value={room.pension} />
                    </FormControl>
                  </div>
                </div>
              </div>
              <br />
              {Array.from(Array(room.adulte), (e, i) => {
                return (
                  <div key={i}>
                    <div className="row">
                      <div className="col-4"> Adult {i + 1} : </div>
                      <div className="col-4">
                        {" "}
                        <FormControl variant="filled" fullWidth>
                          <InputLabel htmlFor="component-filled" fullWidth>
                            Nom
                          </InputLabel>
                          <FilledInput id="component-filled" />
                        </FormControl>
                      </div>
                      <div className="col-4">
                        {" "}
                        <FormControl variant="filled" fullWidth>
                          <InputLabel htmlFor="component-filled" fullWidth>
                            {" "}
                            Prenom
                          </InputLabel>
                          <FilledInput id="component-filled" />
                        </FormControl>
                      </div>
                    </div>
                    <br />
                  </div>
                );
              })}
              {Array.from(Array(room.enfant), (e, i) => {
                return (
                  <div key={i}>
                    <div className="row">
                      <div className="col-4"> Enfant {i + 1}: </div>
                      <div className="col-3">
                        {" "}
                        <FormControl variant="filled" fullWidth>
                          <InputLabel htmlFor="component-filled" fullWidth>
                            Nom
                          </InputLabel>
                          <FilledInput id="component-filled" />
                        </FormControl>
                      </div>
                      <div className="col-3">
                        {" "}
                        <FormControl variant="filled" fullWidth>
                          <InputLabel htmlFor="component-filled" fullWidth>
                            {" "}
                            Prenom
                          </InputLabel>
                          <FilledInput id="component-filled" />
                        </FormControl>
                      </div>
                      <div className="col-2">
                        {" "}
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Age
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            label="Age"
                            onChange={handleChange}
                          >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                    </div>
                    <br />
                  </div>
                );
              })}
            </div>
          ))}
          <br />
          {rooms.double.room.map((room, i) => (
            <div key={i}>
              <div className="row">
                <div className="col-12">
                  <h4>Room {i + 1} </h4>
                </div>
                <div className="row">
                  <div className="col-6">
                    <FormControl variant="filled" fullWidth>
                      <InputLabel htmlFor="component-filled" fullWidth>
                        Type
                      </InputLabel>
                      <FilledInput id="component-filled" value=" Double" />
                    </FormControl>
                  </div>
                  <div className="col-6">
                    <FormControl variant="filled" fullWidth>
                      <InputLabel htmlFor="component-filled" fullWidth>
                        Pension
                      </InputLabel>
                      <FilledInput id="component-filled" value={room.pension} />
                    </FormControl>
                  </div>
                </div>
              </div>
              <br />
              {Array.from(Array(room.adulte), (e, i) => {
                return (
                  <div key={i}>
                    <div className="row">
                      <div className="col-4"> Adult {i + 1} : </div>
                      <div className="col-4">
                        <FormControl variant="filled" fullWidth>
                          <InputLabel htmlFor="component-filled" fullWidth>
                            Nom
                          </InputLabel>
                          <FilledInput id="component-filled" />
                        </FormControl>
                      </div>
                      <div className="col-4">
                        <FormControl variant="filled" fullWidth>
                          <InputLabel htmlFor="component-filled" fullWidth>
                            Prenom
                          </InputLabel>
                          <FilledInput id="component-filled" />
                        </FormControl>
                      </div>
                    </div>
                    <br />
                  </div>
                );
              })}
              <br />
              {Array.from(Array(room.enfant), (e, i) => {
                return (
                  <div key={i}>
                    <div className="row">
                      <div className="col-4"> Enfant {i + 1}: </div>
                      <div className="col-3">
                        <FormControl variant="filled" fullWidth>
                          <InputLabel htmlFor="component-filled" fullWidth>
                            Nom
                          </InputLabel>
                          <FilledInput id="component-filled" />
                        </FormControl>
                      </div>
                      <div className="col-3">
                        <FormControl variant="filled" fullWidth>
                          <InputLabel htmlFor="component-filled" fullWidth>
                            Prenom
                          </InputLabel>
                          <FilledInput id="component-filled" />
                        </FormControl>
                      </div>
                      <div className="col-2">
                        <FormControl
                          variant="filled"
                          sx={{ m: 1, minWidth: 120 }}
                        >
                          <InputLabel id="demo-simple-select-filled-label">
                            Age
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            value={age}
                            onChange={handleChange}
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
              })}
            </div>
          ))}
          <br />
          {rooms.triple.room.map((room, i) => (
            <div key={i}>
              <div className="row">
                <div className="col-12">
                  <h4>Room {i + 1} </h4>
                </div>
                <div className="row">
                  <div className="col-6">
                    <FormControl variant="filled" fullWidth>
                      <InputLabel htmlFor="component-filled" fullWidth>
                        Type
                      </InputLabel>
                      <FilledInput id="component-filled" value="Triple" />
                    </FormControl>
                  </div>
                  <div className="col-6">
                    <FormControl variant="filled" fullWidth>
                      <InputLabel htmlFor="component-filled" fullWidth>
                        Pension
                      </InputLabel>
                      <FilledInput id="component-filled" value={room.pension} />
                    </FormControl>
                  </div>
                </div>
              </div>
              <br />
              {Array.from(Array(room.adulte), (e, i) => {
                return (
                  <div key={i}>
                    <div className="row">
                      <div className="col-4"> Adult {i + 1} : </div>
                      <div className="col-4">
                        <FormControl variant="filled" fullWidth>
                          <InputLabel htmlFor="component-filled" fullWidth>
                            Nom
                          </InputLabel>
                          <FilledInput id="component-filled" />
                        </FormControl>
                      </div>
                      <div className="col-4">
                        <FormControl variant="filled" fullWidth>
                          <InputLabel htmlFor="component-filled" fullWidth>
                            Prenom
                          </InputLabel>
                          <FilledInput id="component-filled" />
                        </FormControl>
                      </div>
                    </div>
                    <br />
                  </div>
                );
              })}
              <br />
              {Array.from(Array(room.enfant), (e, i) => {
                return (
                  <div key={i}>
                    <div className="row">
                      <div className="col-4"> Enfant {i + 1}: </div>
                      <div className="col-3">
                        <FormControl variant="filled" fullWidth>
                          <InputLabel htmlFor="component-filled" fullWidth>
                            Nom
                          </InputLabel>
                          <FilledInput id="component-filled" />
                        </FormControl>
                      </div>
                      <div className="col-3">
                        <FormControl variant="filled" fullWidth>
                          <InputLabel htmlFor="component-filled" fullWidth>
                            Prenom
                          </InputLabel>
                          <FilledInput id="component-filled" />
                        </FormControl>
                      </div>
                      <div className="col-2">
                        <FormControl variant="filled" fullWidth>
                          <InputLabel htmlFor="component-filled" fullWidth>
                            Age
                          </InputLabel>
                          <FilledInput id="component-filled" />
                        </FormControl>
                      </div>
                    </div>
                    <br />
                  </div>
                );
              })}
            </div>
          ))}
          <br />
          {rooms.quadruple.room.map((room, i) => (
            <div key={i}>
              <div className="row">
                <div className="col-12">
                  <h4>Room {i + 1} </h4>
                </div>
                <div className="row">
                  <div className="col-6">
                    <FormControl variant="filled" fullWidth>
                      <InputLabel htmlFor="component-filled" fullWidth>
                        Type
                      </InputLabel>
                      <FilledInput id="component-filled" value="Quadruple" />
                    </FormControl>
                  </div>
                  <div className="col-6">
                    <FormControl variant="filled" fullWidth>
                      <InputLabel htmlFor="component-filled" fullWidth>
                        Pension
                      </InputLabel>
                      <FilledInput id="component-filled" value={room.pension} />
                    </FormControl>
                  </div>
                </div>
              </div>
              <br />
              {Array.from(Array(room.adulte), (e, i) => {
                return (
                  <div key={i}>
                    <div className="row">
                      <div className="col-4"> Adult {i + 1} : </div>
                      <div className="col-4">
                        <FormControl variant="filled" fullWidth>
                          <InputLabel htmlFor="component-filled" fullWidth>
                            Nom
                          </InputLabel>
                          <FilledInput id="component-filled" />
                        </FormControl>
                      </div>
                      <div className="col-4">
                        <FormControl variant="filled" fullWidth>
                          <InputLabel htmlFor="component-filled" fullWidth>
                            Prenom
                          </InputLabel>
                          <FilledInput id="component-filled" />
                        </FormControl>
                      </div>
                    </div>
                    <br />
                  </div>
                );
              })}
              <br />
              {Array.from(Array(room.enfant), (e, i) => {
                return (
                  <div key={i}>
                    <div className="row">
                      <div className="col-4"> Enfant {i + 1}: </div>
                      <div className="col-3">
                        <FormControl variant="filled" fullWidth>
                          <InputLabel htmlFor="component-filled" fullWidth>
                            Nom
                          </InputLabel>
                          <FilledInput id="component-filled" />
                        </FormControl>
                      </div>
                      <div className="col-3">
                        <FormControl variant="filled" fullWidth>
                          <InputLabel htmlFor="component-filled" fullWidth>
                            Prenom
                          </InputLabel>
                          <FilledInput id="component-filled" />
                        </FormControl>
                      </div>
                      <div className="col-2">
                        <FormControl variant="filled" fullWidth>
                          <InputLabel htmlFor="component-filled" fullWidth>
                            Age
                          </InputLabel>
                          <FilledInput id="component-filled" />
                        </FormControl>
                      </div>
                    </div>
                    <br />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Reserve;
