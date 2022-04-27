import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchAction, getDestinations } from "../Redux/searchReducer";
import { useNavigate } from "react-router-dom";
import { hotelActions } from "../Redux/hotelReducer";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DateRangePicker from "@mui/lab/DateRangePicker";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import "../css/SearchFormHotel.css";

function Search2() {
  const search = useSelector((state) => state.search);
  console.log(search);
  const dispatch = useDispatch();
  const history = useNavigate();

  useEffect(() => {
    const oldsearch = JSON.parse(localStorage.getItem("search"));
    if (oldsearch.destination) {
      dispatch(searchAction.replacesearch(oldsearch));
    }
    dispatch(getDestinations());
  }, [dispatch]);

  const DestinationChangeHandler = (event) => {
    dispatch(searchAction.dest(event.target.value));
  };

  const submitHandler = (event) => {
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
  var mm = today.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
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
      style={{ backgroundColor: "beige", marginBottom: "20px  " }}
    >
      <div className="row">
        <form onSubmit={submitHandler}>
          <br />
          <div className="container">
            <div className="row">
              <TextField
                fullWidth
                id="outlined-select-currency"
                select
                label="Destination"
                value={search.destination}
                onChange={DestinationChangeHandler}
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
                  onChange={(newValue) => {
                    dispatch(searchAction.periode(newValue));
                    dispatch(hotelActions.getPeriode(newValue));
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

export default Search2;
