import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getEvents } from "../Redux/eventsReducer";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

function Events() {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events);
  const [slides, setslides] = useState(3);
  useEffect(() => {
    if (window.innerWidth < 719) {
      setslides(1);
    } else if (window.innerWidth < 991) {
      if (events.length < 2) {
        setslides(1);
      } else {
        setslides(2);
      }
    } else if (window.innerWidth < 1400) {
      if (events.length < 3) {
        setslides(events.length);
      } else {
        setslides(3);
      }
    } else {
      if (events.length < 4) {
        setslides(events.length);
      } else {
        setslides(4);
      }
    }
  }, [events.length]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slides,
    slidesToScroll: 1,
  };

  return (
    <div className="container">
      <div className="row">
        <h1
          style={{
            color: "#2a211c",
          }}
        >
          New Events
        </h1>
      </div>
      <br />
      <div className="row">
        <div className="col"></div>
        <div className="col-10">
          <Slider {...settings}>
            {events.map((event, index) => (
              <div key={index}>
                <div className="card" style={{ width: "95%", height: "600px" }}>
                  <img
                    src={event.images[0].url}
                    alt=""
                    width="100%"
                    height="300px"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{event.name}</h5>
                    <div>
                      <img
                        src="https://res.cloudinary.com/betravel/image/upload/v1646934456/BeTravel/assets/icons8-place-marker_zknh1z.gif"
                        alt=""
                        width="30"
                      />
                      {event.location}
                    </div>
                    <div className="row">
                      <div align="left">
                        <div className="row ">
                          <div className="col-4">
                            <img
                              src="https://img.icons8.com/ios/20/000000/calendar--v1.png"
                              alt=""
                            />
                          </div>
                          {event.type === "randonnee" ? (
                            <div className="col-8">
                              {event.date.day.getDate() +
                                "/" +
                                (event.date.day.getMonth() + 1) +
                                "/" +
                                event.date.day.getFullYear()}
                            </div>
                          ) : (
                            <div className="col-8">
                              {event.date.from.getDate() +
                                "/" +
                                (event.date.from.getMonth() + 1) +
                                "/" +
                                event.date.from.getFullYear()}
                            </div>
                          )}
                        </div>
                      </div>
                      <br />
                      <div align="left">
                        <div className="row ">
                          <div className="col-4">
                            <img
                              src="https://img.icons8.com/ios-filled/20/000000/trainers.png"
                              alt=""
                            />
                          </div>
                          <div className="col-8">Circuit de 20 Km</div>
                        </div>
                      </div>
                      <br />
                      <br />
                      <div className="row">
                        <div className="col-12">
                          <Link to={"/Event/Detail/" + event._id}>
                            <div className="Search__actions">
                              <button className="btn button">
                                show details
                              </button>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div className="col"></div>
      </div>
      <br />
      <div className="row">
        <Link to="/Event/Liste">
          <button
            className="btn "
            style={{
              fontWeight: "bolder",
              fontSize: "30px",
              " textdecoration": "underline",
            }}
          >
            see more <DoubleArrowIcon />
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Events;
