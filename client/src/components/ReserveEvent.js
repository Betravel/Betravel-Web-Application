import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { eventActions } from "../Redux/eventReducer";
import RecapEvent from "./recapEvent";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

const steps = ["Select ", "Contact informations", "Confirm"];

function ReserveEvent() {
  const event = useSelector((state) => state.event);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [availavleP, setavailavleP] = useState("");

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
      </div>
      <div className="row">
        <div className="col-8">
          <form>
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
                      value={event.user.firstname}
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
                      value={event.user.lastname}
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
                      value={event.user.email}
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
                      value={event.user.phone}
                      onChange={UserChangeHandler}
                      fullWidth
                    />
                  </div>
                </div>
              </div>
            </div>
            {/*card persons*/}
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
                      Persons informations
                    </h2>
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-4">Person 1 :</div>
                  <div className="col-4">
                    <TextField
                      variant="outlined"
                      label="First name"
                      id="firstname"
                      name="firstname"
                      // value={adulte.firstname}
                      // onChange={(event) => {
                      //   changeDetails(
                      //     event,
                      //     "single",
                      //     indexadulte,
                      //     indexroom,
                      //     "adulte"
                      //   );
                      // }}
                      fullWidth
                    />
                  </div>
                  <div className="col-4">
                    <TextField
                      variant="outlined"
                      label="Last Name"
                      id="lastname"
                      name="lastname"
                      // value={adulte.lastname}
                      // onChange={(event) => {
                      //   changeDetails(
                      //     event,
                      //     "single",
                      //     indexadulte,
                      //     indexroom,
                      //     "adulte"
                      //   );
                      // }}
                      fullWidth
                    />
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-4">Person 2 :</div>
                  <div className="col-4">
                    <TextField
                      variant="outlined"
                      label="First name"
                      id="firstname"
                      name="firstname"
                      // value={adulte.firstname}
                      // onChange={(event) => {
                      //   changeDetails(
                      //     event,
                      //     "single",
                      //     indexadulte,
                      //     indexroom,
                      //     "adulte"
                      //   );
                      // }}
                      fullWidth
                    />
                  </div>
                  <div className="col-4">
                    <TextField
                      variant="outlined"
                      label="Last Name"
                      id="lastname"
                      name="lastname"
                      // value={adulte.lastname}
                      // onChange={(event) => {
                      //   changeDetails(
                      //     event,
                      //     "single",
                      //     indexadulte,
                      //     indexroom,
                      //     "adulte"
                      //   );
                      // }}
                      fullWidth
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="col-4">
          <RecapEvent />
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
    </div>
  );
}
export default ReserveEvent;
