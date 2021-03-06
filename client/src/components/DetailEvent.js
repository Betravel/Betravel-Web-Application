import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { eventActions, getEvent } from "../Redux/eventReducer";
import { useSelector, useDispatch } from "react-redux";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { navbarActions } from "../Redux/navbarReducer";
import { getAuth } from "../Redux/authReducer";
import axios from "axios";

function DetailEvent() {
  const event = useSelector((state) => state.event.event);
  const reservation = useSelector((state) => state.event);
  const auth = useSelector((state) => state.auth);
  const [places, setPlaces] = useState([]);
  const dispatch = useDispatch();
  let { id } = useParams();

  const handleChange = (event) => {
    dispatch(eventActions.updatePlace(event.target.value));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getAuth());
    dispatch(navbarActions.updatenavbar(false));
    dispatch(getEvent(id));
  }, [dispatch, id]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/getreservationEvent/" + event.name)
      .then((res) => {
        const Remainingp = event.places - res.data;
        setPlaces(Remainingp);
      })
      .catch((err) => console.error(err));
  }, [event.name, event.places]);

  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <br />
      <br />
      <div className="row">
        <h1> {event.name}</h1>
      </div>
      <div className="row">
        <div
          className="col-12"
          style={{ marginLeft: "auto", marginRight: "auto" }}
          align="center"
        >
          {event.images[0] ? (
            <img src={event.images[0].url} alt="" width="50%" />
          ) : (
            ""
          )}
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-12" style={{ textAlign: "left" }}>
          <h3 style={{ textDecoration: "underline" }}>Description</h3>
          <br />
        </div>{" "}
      </div>
      <div className="card">
        <div className="card-body">
          <div className="row" style={{ textAlign: "left" }}>
            <p>{event.description}</p>
          </div>
          <div className="row">
            <div className="col-5" align="left">
              <h5>Location :</h5>
            </div>
            <div className="col-7">{event.location}</div>
          </div>
          <div className="row">
            <div className="col-5" align="left">
              <h5>Date :</h5>
            </div>
            <div className="col-7">
              {event.date.day.getDate() +
                "/" +
                (event.date.day.getMonth() + 1) +
                "/" +
                event.date.day.getFullYear()}
            </div>
          </div>
          <div className="row">
            <div className="col-5" align="left"></div>
            <div className="col-7">
              {" "}
              {event.date.from.getDate() +
                "/" +
                (event.date.from.getMonth() + 1) +
                "/" +
                event.date.from.getFullYear()}
              {" ==> "}
              {event.date.to.getDate() +
                "/" +
                (event.date.to.getMonth() + 1) +
                "/" +
                event.date.to.getFullYear()}
            </div>
          </div>
          <div className="row">
            <div className="col-5" align="left">
              <h5>Duration :</h5>
            </div>
            <div className="col-7">{event.periode} day</div>
          </div>
          <div className="row">
            <div className="col-5" align="left">
              <h5>Price :</h5>
            </div>
            <div className="col-7">{event.price} DT</div>
          </div>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-12" style={{ textAlign: "left" }}>
          <h3 style={{ textDecoration: "underline" }}>Program</h3>
          <br />
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <div className="row">
            {event.program.map((prog, i) => {
              let time = new Date(prog.hour);
              let hour = time.getHours().toString();
              let result = "";
              if (hour.length === 1) {
                result += "0";
              }
              result += hour.toString();
              result += " : ";
              let minute = time.getMinutes().toString();
              if (minute.length === 1) {
                result += "0";
              }
              result += minute.toString();
              return (
                <div key={i}>
                  <div className="row">{result + " : " + prog.text}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-12" style={{ textAlign: "left" }}>
          <h3 style={{ textDecoration: "underline" }}>Note !</h3>
        </div>
      </div>
      <br />
      <div className="card">
        <div className="card-body">
          <div className="row">
            {" "}
            {event.note.map((note, i) => {
              return (
                <div key={i}>
                  <div className="row">
                    <div className="col-12" style={{ textAlign: "left" }}>
                      -- {note}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-12" style={{ textAlign: "left" }}>
          <h3 style={{ textDecoration: "underline" }}>Availablity</h3>
          <br />
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-12" style={{ textAlign: "left" }}>
              <p>Remaining places : {places} </p>
            </div>
          </div>
          <div className="row">
            <div className="col-12" style={{ textAlign: "center" }}>
              {places === 0 ? (
                <h4> plus de place a resrver </h4>
              ) : (
                <p>
                  place to reserve : &nbsp; &nbsp;
                  <FormControl>
                    <Select
                      name="reservedplace"
                      value={reservation.reservedplace}
                      label="ReservedPlace"
                      onChange={handleChange}
                    >
                      <MenuItem value={0}>0</MenuItem>
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                      <MenuItem value={5}>5</MenuItem>
                      <MenuItem value={6}>6</MenuItem>
                    </Select>
                  </FormControl>
                </p>
              )}
            </div>
          </div>
          {reservation.reservedplace > places ? (
            <h4>il reste que {places} places !!!!</h4>
          ) : (
            <div>
              {auth.isAuth ? (
                <Link to="/Event/Reserve">
                  <div className="col-12" style={{ textAlign: "right" }}>
                    <div className="Search__actions">
                      <button type="button">Book Now </button>
                    </div>
                  </div>
                </Link>
              ) : (
                <Link to="/SignIn?path=reserveevent">
                  <div className="Search__actions">
                    <button type="button">Book Now </button>
                  </div>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
      <br />
      <br />
    </div>
  );
}
export default DetailEvent;
