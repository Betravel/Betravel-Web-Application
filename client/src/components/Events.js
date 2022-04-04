import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/event/all")
      .then((res) => {
        let event = res.data;
        for (let i = event.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [event[i], event[j]] = [event[j], event[i]];
        }
        let randomhotels = [event[0], event[1], event[2]];
        setEvents(randomhotels);
      })
      .catch((err) => console.error(err));
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <h1
            style={{
              color: "#2a211c",
            }}
          >
            New Events
          </h1>
          <br />
          <br />
        </div>

        <div className="row">
          <div className="col-1"></div>
          <div className="col-10">
            <Slider {...settings}>
              {events.map((event, index) => (
                <div key={index}>
                  <div class="card" style={{ width: "95%" }}>
                    <img
                      src="https://res.cloudinary.com/betravel/image/upload/v1647176972/BeTravel/assets/Image_e9917i.jpg"
                      alt=""
                      height="100px"
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
                        <div className="col-6">
                          <div align="left">
                            <div className="row ">
                              <div className="col-4">
                                <img
                                  src="https://img.icons8.com/ios/20/000000/calendar--v1.png"
                                  alt=""
                                />{" "}
                              </div>
                              <div className="col-8">{event.date}</div>
                            </div>
                          </div>
                          <br />
                          <div align="left">
                            <div className="row ">
                              <div className="col-4">
                                <img
                                  src="https://img.icons8.com/external-xnimrodx-lineal-xnimrodx/20/000000/external-time-education-xnimrodx-lineal-xnimrodx.png"
                                  alt=""
                                />{" "}
                              </div>
                              <div className="col-8">{event.hour}</div>
                            </div>
                          </div>
                          <br />
                          <div align="left">
                            <div className="row ">
                              <div className="col-4">
                                <img
                                  src="https://img.icons8.com/ios-filled/20/000000/trainers.png"
                                  alt=""
                                />{" "}
                              </div>
                              <div className="col-8">Circuit de 20 Km</div>
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div>
                            <h3> {event.price} DT</h3>

                            <Link to={"/Event/Detail/" + event._id}>
                              <button className="btn btn-primary">
                                {" "}
                                show details
                              </button>
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
          <div className="col-1"></div>
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
              {" "}
              see more <DoubleArrowIcon />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Events;
