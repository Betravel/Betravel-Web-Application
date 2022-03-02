import React, { useState } from "react";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DateRangePicker from "@mui/lab/DateRangePicker";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import "./SearchFormHotel.css";

function Search2() {
  const [Destination, setDestination] = useState(
    JSON.parse(localStorage.getItem("search")).destination
  );
  const [Periode, setPeriode] = useState(
    JSON.parse(localStorage.getItem("search")).periode
  );

  const [Adultes, setAdultes] = useState(
    JSON.parse(localStorage.getItem("search")).adultes
  );
  const [Enfants, setEnfants] = useState(
    JSON.parse(localStorage.getItem("search")).enfants
  );
  const [Chambres, setChambres] = useState(
    JSON.parse(localStorage.getItem("search")).chambres
  );

  const destinations = [
    {
      value: "init",
      label: "Choisir votre destination ...",
    },
    {
      value: "Hammamet",
      label: "Hammamet",
    },
    {
      value: "Sousse",
      label: "Sousse",
    },
    {
      value: "Djerba",
      label: "Djerba",
    },
    {
      value: "Mahdia",
      label: "Mahdia",
    },
  ];

  const DestinationChangeHandler = (event) => {
    setDestination(event.target.value);
  };

  const AddAdultes = () => {
    setAdultes(Adultes + 1);
  };

  const ReduceAdultes = () => {
    if (Adultes > 1) {
      setAdultes(Adultes - 1);
    }
  };

  const AddEnfants = () => {
    setEnfants(Enfants + 1);
  };

  const ReduceEnfants = () => {
    if (Enfants > 0) {
      setEnfants(Enfants - 1);
    }
  };

  const AddChambres = () => {
    setChambres(Chambres + 1);
  };

  const ReduceChambres = () => {
    if (Chambres > 1) {
      setChambres(Chambres - 1);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const Search = {
      destination: Destination,
      periode: Periode,
      adultes: Adultes,
      enfants: Enfants,
      chambres: Chambres,
    };
    console.log(Search);
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
                value={Destination}
                onChange={DestinationChangeHandler}
              >
                {destinations.map((option) => (
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
                  value={Periode}
                  minDate={new Date(today)}
                  onChange={(newValue) => {
                    setPeriode(newValue);
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
                  {Adultes}
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
                  {Enfants}
                </Fab>
                <Fab size="small" aria-label="edit" onClick={ReduceEnfants}>
                  <RemoveRoundedIcon />
                </Fab>
              </Box>
            </div>
            {Enfants > 0 ? () => {} : ""}
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
                  {Chambres}
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
