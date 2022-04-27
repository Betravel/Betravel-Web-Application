import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { useDispatch, useSelector } from "react-redux";
import { eventActions } from "../Redux/eventReducer";
import { navbarActions } from "../Redux/navbarReducer";
import { getAuth } from "../Redux/authReducer";
import RecapEvent from "./recapEvent";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import axios from "axios";

const steps = ["Select ", "Contact informations", "Confirm"];

function ReserveEvent() {
  const event = useSelector((state) => state.event);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getAuth());
  }, [dispatch]);

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

  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/reservationEvent/add", event)
      .then((res) => {
        axios
          .post("http://localhost:8000/reservationdetails/event", {
            email: auth.user.email,
            id: res.data._id,
          })
          .then((res) => {
            history("/");
          })
          .catch((err) => console.log(err));
        history("/");
      })
      .catch((err) => console.log(err));
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
      <form onSubmit={onSubmitHandler}>
        <div className="row">
          <div className="col-lg-4 col-sm-12">
            <RecapEvent />
          </div>
          <div className="col-lg-8 col-sm-12">
            <br />
            {/*card personal info*/}
            <div className="card">
              <div className="card-body">
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
                  <div className="col-lg-6 col-sm-12"  style={{
                                              marginTop: "20px",
                                            }}jh >
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
                  <div
                    className="col-lg-6 col-sm-12"
                    style={{
                      marginTop: "20px",
                    }}
                  >
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
                  <div className="col-lg-6 col-sm-12"  style={{
                                              marginTop: "20px",
                                            }}>
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
                  <div
                    className="col-lg-6 col-sm-12"
                    style={{
                      marginTop: "20px",
                    }}
                  >
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
            <div className="card">
              <div className="card-body">
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
                        <div className="col-lg-4 col-sm-12">
                          Person {i + 1} :
                        </div>
                        <div
                          className="col-lg-4 col-sm-12"
                          style={{
                            marginTop: "20px",
                          }}
                        >
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
                        <div
                          className="col-lg-4 col-sm-12"
                          style={{
                            marginTop: "20px",
                          }}
                        >
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
          </div>
        </div>
        <br />
        <div className="card">
          <div className="card-body">
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
      </form>
    </div>
  );
}
export default ReserveEvent;
