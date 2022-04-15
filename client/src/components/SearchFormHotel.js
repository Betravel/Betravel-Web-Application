import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { searchAction, getDestinations } from "../Redux/searchReducer";
import { reservationActions } from "../Redux/reservationReducer";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DateRangePicker from "@mui/lab/DateRangePicker";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import "../css/SearchFormHotel.css";

function SearchFormHotel() {
  const search = useSelector((state) => state.search);
  console.log(search);
  const dispatch = useDispatch();
  const history = useNavigate();

  useEffect(() => {
    dispatch(getDestinations());
  }, [dispatch]);

  const DestinationChangeHandler = (event) => {
    dispatch(searchAction.dest(event.target.value));
  };

  // const AddAdultes = () => {
  //   dispatch(searchAction.increment({ name: "adulte" }));
  // };

  // const ReduceAdultes = () => {
  //   if (search.adulte > 1) {
  //     dispatch(searchAction.decrement({ name: "adulte" }));
  //   }
  // };

  // const AddEnfants = () => {
  //   dispatch(searchAction.increment({ name: "enfant" }));
  // };

  // const ReduceEnfants = () => {
  //   if (search.enfant > 0) {
  //     dispatch(searchAction.decrement({ name: "enfant" }));
  //   }
  // };

  // const AddChambres = () => {
  //   dispatch(searchAction.increment({ name: "chambre" }));
  // };

  // const ReduceChambres = () => {
  //   if (search.chambre > 1) {
  //     dispatch(searchAction.decrement({ name: "chambre" }));
  //   }
  // };

  const submitHandler = (event) => {
    event.preventDefault();
    if (search.destination === "init") {
      alert("Choosing destination is required !!");
    } else if (search.periode[0] === null) {
      alert("choosing checkin/checkout is required !!");
    } else if (search.periode[1] === null) {
      alert("choosing checkin/checkout is required !!");
    } else {
      console.log(search);
      localStorage.setItem("search", JSON.stringify(search));
      history("/Hotel/Liste");
    }
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
    <div
      className="container"
      style={{ backdropFilter: "blur(30px)", marginTop: "50px" }}
    >
      <div className="row">
        <form onSubmit={submitHandler} autoComplete="off">
          <br />
          <div className="container">
            <div
              className="row"
              style={{ marginTop: "auto", marginBottom: "auto" }}
            >
              <TextField
                fullWidth
                id="outlined-select-currency"
                select
                label="Destination"
                value={search.destination}
                onChange={DestinationChangeHandler}
                required
              >
                {search.destinations.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <br />
            <div className="row">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateRangePicker
                  startText="Check-in"
                  endText="Check-out"
                  value={search.periode}
                  minDate={new Date(today)}
                  required
                  onChange={(newValue) => {
                    dispatch(searchAction.periode(newValue));
                    dispatch(reservationActions.getPeriode(newValue));
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
            <div className="row">
              <div className="Search__actions">
                <button type="submit">Search</button>
              </div>
            </div>
            <br />
          </div>
        </form>
        <br />
      </div>
    </div>
  );
}

export default SearchFormHotel;
