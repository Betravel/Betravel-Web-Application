import React, { useEffect, useState } from "react";
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
import axios from "axios";

function SearchFormHotel() {
  const history = useNavigate();
  const [Destination, setDestination] = useState("init");
  const [Adultes, setAdultes] = useState(1);
  const [Enfants, setEnfants] = useState(0);
  const [Chambres, setChambres] = useState(1);
  const [Periode, setPeriode] = useState([null, null]);
  const [Dests, setDests] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/destinations/all")
      .then((res) => {
        setDests(res.data);
      })
      .catch();
  }, []);

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
    if (Destination === "init") {
      alert("Choosing destination is required !!");
    } else if (Periode[0] === null) {
      alert("choosing checkin/checkout is required !!");
    } else if (Periode[1] === null) {
      alert("choosing checkin/checkout is required !!");
    } else {
      const Search = {
        destination: Destination,
        periode: Periode,
        adultes: Adultes,
        enfants: Enfants,
        chambres: Chambres,
      };
      console.log(Search);
      localStorage.setItem("search", JSON.stringify(Search));
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
    <div className="container" style={{ backdropFilter: "blur(15px)" }}>
      <div className="row">
        <form onSubmit={submitHandler} autoComplete="off">
          <br />
          <div className="container">
            <div className="row">
              <div
                className="col-6"
                style={{ marginTop: "auto", marginBottom: "auto" }}
              >
                <div className="row">
                  <TextField
                    fullWidth
                    id="outlined-select-currency"
                    select
                    label="Destination"
                    value={Destination}
                    onChange={DestinationChangeHandler}
                    required
                  >
                    {Dests.map((option) => (
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
                      required
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
              </div>
              <div className="col-6">
                <div className="container">
                  <div className="row">
                    <div className="col-6">
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
                        <Fab
                          disabled
                          variant="extended"
                          style={{ color: "black" }}
                        >
                          {Adultes}
                        </Fab>
                        <Fab
                          size="small"
                          aria-label="edit"
                          onClick={ReduceAdultes}
                        >
                          <RemoveRoundedIcon />
                        </Fab>
                      </Box>
                    </div>
                    <div className="col-6">
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
                        <Fab
                          disabled
                          variant="extended"
                          style={{ color: "black" }}
                        >
                          {Enfants}
                        </Fab>
                        <Fab
                          size="small"
                          aria-label="edit"
                          onClick={ReduceEnfants}
                        >
                          <RemoveRoundedIcon />
                        </Fab>
                      </Box>
                    </div>
                    {Enfants > 0 ? () => {} : ""}
                    <div className="col-12">
                      <label
                        className="form-label"
                        style={{ fontweight: "bold", color: "#43352c" }}
                      >
                        Chambres
                      </label>
                      <Box sx={{ "& > :not(style)": { m: 1 }, border: "1px" }}>
                        <Fab
                          size="small"
                          aria-label="add"
                          onClick={AddChambres}
                        >
                          <AddIcon />
                        </Fab>
                        <Fab
                          disabled
                          variant="extended"
                          style={{ color: "black" }}
                        >
                          {Chambres}
                        </Fab>
                        <Fab
                          size="small"
                          aria-label="edit"
                          onClick={ReduceChambres}
                        >
                          <RemoveRoundedIcon />
                        </Fab>
                      </Box>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
