import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchAction, getDestinations } from "../Redux/searchReducer";
import { useNavigate } from "react-router-dom";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DateRangePicker from "@mui/lab/DateRangePicker";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
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

  const AddAdultes = () => {
    dispatch(searchAction.increment({ name: "adulte" }));
  };

  const ReduceAdultes = () => {
    if (search.adulte > 1) {
      dispatch(searchAction.decrement({ name: "adulte" }));
    }
  };

  const AddEnfants = () => {
    dispatch(searchAction.increment({ name: "enfant" }));
  };

  const ReduceEnfants = () => {
    if (search.enfant > 0) {
      dispatch(searchAction.decrement({ name: "enfant" }));
    }
  };

  const AddChambres = () => {
    dispatch(searchAction.increment({ name: "chambre" }));
  };

  const ReduceChambres = () => {
    if (search.chambre > 1) {
      dispatch(searchAction.decrement({ name: "chambre" }));
    }
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
    <div className="container" style={{ backgroundColor: "beige" }}>
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
              <label
                className="form-label"
                style={{ fontweight: "bold", color: "#43352c" }}
              >
                Adultes
              </label>
              <Box sx={{ "& > :not(style)": { m: 1 }, border: "1px" }}>
                <Fab size="small" aria-label="add" onClick={AddAdultes}>
                  <AddIcon />
                </Fab>
                <Fab disabled variant="extended" style={{ color: "black" }}>
                  {search.adulte}
                </Fab>
                <Fab size="small" aria-label="edit" onClick={ReduceAdultes}>
                  <RemoveRoundedIcon />
                </Fab>
              </Box>
            </div>
            <br />
            <div className="row">
              <label
                className="form-label"
                style={{ fontweight: "bold", color: "#43352c" }}
              >
                Enfants
              </label>
              <Box sx={{ "& > :not(style)": { m: 1 }, border: "1px" }}>
                <Fab size="small" aria-label="add" onClick={AddEnfants}>
                  <AddIcon />
                </Fab>
                <Fab disabled variant="extended" style={{ color: "black" }}>
                  {search.enfant}
                </Fab>
                <Fab size="small" aria-label="edit" onClick={ReduceEnfants}>
                  <RemoveRoundedIcon />
                </Fab>
              </Box>
            </div>
            <br />
            <div className="row">
              <label
                className="form-label"
                style={{ fontweight: "bold", color: "#43352c" }}
              >
                Chambres
              </label>
              <Box sx={{ "& > :not(style)": { m: 1 }, border: "1px" }}>
                <Fab size="small" aria-label="add" onClick={AddChambres}>
                  <AddIcon />
                </Fab>
                <Fab disabled variant="extended" style={{ color: "black" }}>
                  {search.chambre}
                </Fab>
                <Fab size="small" aria-label="edit" onClick={ReduceChambres}>
                  <RemoveRoundedIcon />
                </Fab>
              </Box>
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
