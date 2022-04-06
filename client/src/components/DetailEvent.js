import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getEvent } from "../Redux/eventReducer";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function DetailEvent() {
  const event = useSelector((state) => state.event.event);
  console.log(event);
  const dispatch = useDispatch();
  let { id } = useParams();
  const [reservedp, setReservedp] = React.useState("");

  const handleChange = (event) => {
    setReservedp(event.target.value);
  };

  useEffect(() => {
    dispatch(getEvent(id));
  }, [dispatch, id]);

  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <br />
      <br />
      <div className="row">
        <h1> {event.name}</h1>
      </div>
      <div className="row">
        <div className="col-2"></div>
        <div
          className="col-4"
          style={{ marginLeft: "auto", marginRight: "auto" }}
        >
          <img
            src="https://res.cloudinary.com/betravel/image/upload/v1647176972/BeTravel/assets/Image_e9917i.jpg"
            alt=""
            width="100%"
          />
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-12" style={{ textAlign: "left" }}>
          <h3 style={{ textDecoration: "underline" }}>Description</h3>
          <br />
        </div>{" "}
      </div>
      <div class="card">
        <div class="card-body">
          <div className="row">
            <div className="row">
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
              <div className="col-7">{event.date}</div>
            </div>
            <div className="row">
              <div className="col-5" align="left">
                <h5>Hour :</h5>
              </div>
              <div className="col-7">{event.hour}</div>
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
            <br />
            <br />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12" style={{ textAlign: "left" }}>
          <h3 style={{ textDecoration: "underline" }}>Program</h3>
          <br />
        </div>
      </div>
      <div class="card">
        <div class="card-body">
          <div className="row">
            {event.program.map((prog, i) => {
              return (
                <div key={i}>
                  <div className="row">{prog}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12" style={{ textAlign: "left" }}>
          <h3 style={{ textDecoration: "underline" }}>Note !</h3>
          <br />
        </div>
      </div>
      <div class="card">
        <div class="card-body">
          <div className="row">
            {" "}
            {/* {event.note.map((note, i) => {
        return (
          <div key={i}>
            <div className="row">{note}</div>
          </div>
        );
      })} */}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12" style={{ textAlign: "left" }}>
          <h3 style={{ textDecoration: "underline" }}>Availablity</h3>
          <br />
        </div>
      </div>
      <div class="card">
        <div class="card-body">
          <div className="row">
            <div className="col-12" style={{ textAlign: "left" }}>
              <p>Remaining places : 20 {/*  {event.remaingplaces}*/}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-12" style={{ textAlign: "center" }}>
              <p>
                place to reserve : &nbsp; &nbsp;
                <FormControl>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={reservedp}
                    label="reservedp"
                    onChange={handleChange}
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                  </Select>
                </FormControl>
              </p>
            </div>
          </div>

          <Link to="/Event/Reserve">
            <div className="col-12" style={{ textAlign: "right" }}>
              <div className="Search__actions">
                <button type="button">Book Now </button>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <br />
      <br />
    </div>
  );
}
export default DetailEvent;
