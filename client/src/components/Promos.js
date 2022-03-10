import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import img from "../assets/Djerba-Plaza.webp";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

function Promos() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/hotel/promo")
      .then((res) => {
        let hotel = res.data;
        for (let i = hotel.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [hotel[i], hotel[j]] = [hotel[j], hotel[i]];
        }
        let randomhotels = [hotel[0], hotel[1], hotel[2]];
        setHotels(randomhotels);
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
            Best deals{" "}
          </h1>
          <br />
          <br />
        </div>

        <div className="row">
          <div className="col-1"></div>
          <div className="col-10">
            <Slider {...settings}>
              {hotels.map((hotel, index) => (
                <div key={index}>
                  <div className="wrapper">
                    <h1>{hotel.name}</h1>{" "}
                    <div
                      className="image "
                      style={{ backgroundImage: `url(${img})` }}
                    ></div>
                    <div className="details">
                      <h1>
                        <em>{hotel.location}</em>
                      </h1>
                    </div>
                    <div>
                      <h3>
                        {" "}
                        A partir{" "}
                        {hotel.price.best -
                          (hotel.price.best * hotel.promo) / 100}{" "}
                        DT
                      </h3>
                      <div>
                        <h6 style={{ textDecoration: "line-through" }}>
                          {hotel.price.best} DT
                        </h6>
                        <h6>{hotel.promo}% off</h6>
                      </div>
                    </div>
                    <Link to={"/Hotel/Detail/" + hotel._id}>
                      <button className="btn button"> show details</button>
                    </Link>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
          <div className="col-1"></div>
        </div>
        <br />
        <div className="row">
          <Link to="/Hotel/Promos">
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

export default Promos;
