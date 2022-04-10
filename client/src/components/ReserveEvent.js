import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { eventActions } from "../Redux/eventReducer";
import RecapEvent from "./recapEvent";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { navbarActions } from "../Redux/navbarReducer";

const steps = ["Select ", "Contact informations", "Confirm"];

function ReserveEvent() {
  const event = useSelector((state) => state.event);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(navbarActions.updatenavbar(false));
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

  const updateDetails = (e, index) => {
    dispatch(
      eventActions.updatedetails({
        type: e.target.name,
        value: e.target.value,
        index,
      })
    );
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
            <br />
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
                {event.details.map((person, i) => {
                  return (
                    <div key={i}>
                      <div className="row">
                        <div className="col-4">Person {i + 1} :</div>
                        <div className="col-4">
                          <TextField
                            variant="outlined"
                            label="First name"
                            id="firstname"
                            name="firstname"
                            value={person.firstname}
                            onChange={(e) => updateDetails(e, i)}
                            fullWidth
                          />
                        </div>
                        <div className="col-4">
                          <TextField
                            variant="outlined"
                            label="Last Name"
                            id="lastname"
                            name="lastname"
                            value={person.lastname}
                            onChange={(e) => updateDetails(e, i)}
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
          </form>
        </div>
        <div className="col-4">
          <RecapEvent />
        </div>
      </div>
      <br />
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
                value={event.paiement}
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
      <br />
      <div className="row">
        <div className="Search__actions">
          <button type="submit">Confirm</button>
        </div>
      </div>
    </div>
  );
}
export default ReserveEvent;
