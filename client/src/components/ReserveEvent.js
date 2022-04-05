import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { eventActions } from "../Redux/eventReducer";

const steps = ["Select ", "Contact informations", "Confirm"];

function ReserveEvent() {
  const event = useSelector((state) => state.event);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [availavleP, setavailavleP] = useState("");

  const handleChange = (event) => {
    setavailavleP(event.target.value);
  };

  useEffect(() => {
    dispatch(eventActions.getUser(auth.user));
  }, [auth.user, dispatch]);

  const UserChangeHandler = (event) => {
    dispatch(
      eventActions.updateUser({
        type: event.target.name,
        value: event.target.value,
      })
    );
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
      <form>
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
                <InputLabel htmlFor="firstname">First Name</InputLabel>
                <FilledInput
                  id="firstname"
                  name="firstname"
                  value={event.user.firstname}
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
                  value={event.user.lastname}
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
                  value={event.user.email}
                  onChange={UserChangeHandler}
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
                  value={event.user.phone}
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
              <h2>Event's informations</h2>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-6">
              <FormControl variant="filled" fullWidth>
                <InputLabel htmlFor="eventname" fullWidth>
                  Event Name
                </InputLabel>
                <FilledInput
                  id="eventname"
                  name="eventname"
                  value={event.event.name}
                  readOnly
                />
              </FormControl>
            </div>
            <div className="col-6">
              <FormControl variant="filled" fullWidth>
                <InputLabel htmlFor="eventlocation" fullWidth>
                  Location
                </InputLabel>
                <FilledInput
                  id="eventlocation"
                  name="eventlocation"
                  value={event.event.location}
                  readOnly
                />
              </FormControl>
            </div>
            <br />
          </div>
          <br />
          <div className="row">
            {" "}
            <div className="col-6">
              <FormControl variant="filled" fullWidth>
                <InputLabel htmlFor="eventdate" fullWidth>
                  Date
                </InputLabel>
                <FilledInput
                  id="eventdate"
                  name="eventdate"
                  value={event.event.date}
                  readOnly
                />
              </FormControl>
            </div>
            <div className="col-6">
              <FormControl variant="filled" fullWidth>
                <InputLabel htmlFor="eventhour" fullWidth>
                  Hour
                </InputLabel>
                <FilledInput
                  id="eventhour"
                  name="eventhour"
                  value={event.event.hour}
                  readOnly
                />
              </FormControl>
            </div>
          </div>
          <br />
          <div className="row">
            {" "}
            <div className="col-6">
              <FormControl variant="filled" fullWidth>
                <InputLabel htmlFor="Availablep" fullWidth>
                  Available places
                </InputLabel>
                <FilledInput id="Availablep" name="Availablep" readOnly />
              </FormControl>
            </div>
            <div className="col-6">
              <FormControl variant="filled" fullWidth>
                <InputLabel id="demo-simple-select-filled-label">
                  Number places to reserve
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={availavleP}
                  onChange={handleChange}
                >
                  <MenuItem defaultValue={1}>
                    <em>1</em>
                  </MenuItem>
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
        <div>
          <button type="submit" class="btn btn-info">
            Confirm Reservation
          </button>
        </div>
      </form>
    </div>
  );
}
export default ReserveEvent;
