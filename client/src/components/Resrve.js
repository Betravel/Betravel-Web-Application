import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import TextField from "@mui/material/TextField";
import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const steps = ["Select ", "Contact informations", "Confirm"];

function Reserve() {
  const auth = useSelector((state) => state.auth);
  const hotel = useSelector((state) => state.hotel);
  const rooms = useSelector((state) => state.rooms);
  const [user, setUser] = useState(auth.user);

  const UserChangeHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
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
      <div className="container">
        <div
          className="row"
          style={{
            marginTop: "100px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <div className="col-12">BOOKING FORM</div>
        </div>
        <br />
        <div
          className="row"
          style={{
            marginTop: "100px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <div className="col-12">Personal informations</div>
        </div>
        <br />
        <div className="row">
          <div className="col-6">
            <TextField
              fullWidth
              name="firstname"
              label="First Name"
              variant="filled"
              value={user.firstname}
              onChange={UserChangeHandler}
            />
          </div>
          <div className="col-6">
            <TextField
              fullWidth
              name="lastname"
              label="Last Name"
              variant="filled"
              value={user.lastname}
              onChange={UserChangeHandler}
            />
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-6">
            {/* <TextField
              fullWidth
              name="email"
              label="Email"
              variant="filled"
              Value={user.email}
              onChange={UserChangeHandler}
            /> */}
            <FormControl fullWidth variant="filled">
              <InputLabel htmlFor="email">Email</InputLabel>
              <FilledInput
                id="email"
                name="email"
                defaultValue={user.email}
                value={user.email}
                onChange={UserChangeHandler}
              />
            </FormControl>
          </div>
          <div className="col-6">
            <TextField
              fullWidth
              name="phone"
              label="Phone Number"
              variant="filled"
              value={user.phone}
              onChange={UserChangeHandler}
            />
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
          <div className="col-12">Room's informations</div>
        </div>
        <br />
      </div>
    </div>
  );
}

export default Reserve;
