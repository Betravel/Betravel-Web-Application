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
      .get("http://localhost:8000/api/hotels/all")
      .then((res) => {
        setHotels(res.data);
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
                    <h1>{hotel.location}</h1>{" "}
                    <div
                      className="image "
                      style={{ backgroundImage: `url(${img})` }}
                    ></div>
                    <div className="details">
                      <h1>
                        <em>{hotel.name}</em>
                      </h1>

                      <h2>{hotel.description}</h2>

                      <p>4 Days - 3 Nights</p>
                    </div>
                    <h1>{hotel.price.prix} DT</h1>
                    <Link to="/Hotel/Detail">
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
        </div>
      </div>
    </div>
  );
}

export default Promos;
