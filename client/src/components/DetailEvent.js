import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getEvent } from "../Redux/eventReducer";
import { useSelector, useDispatch } from "react-redux";
import IconButton from "@mui/material/IconButton";

function DetailEvent() {
  const event = useSelector((state) => state.event.event);
  console.log(event);
  const dispatch = useDispatch();
  let { id } = useParams();

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
        <h3 aligntext="right">Description</h3>
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
      <div className="row">
        <h3 aligntext="right">Program</h3>
      </div>
      {event.program.map((prog, i) => {
        return (
          <div key={i}>
            <div className="row">{prog}</div>
          </div>
        );
      })}

      <Link to="/Event/Reserve">
        <IconButton>
          <img
            src="https://img.icons8.com/plasticine/100/000000/arrow.png"
            alt=""
            align="right"
          />
        </IconButton>
      </Link>
    </div>
  );
}
export default DetailEvent;
