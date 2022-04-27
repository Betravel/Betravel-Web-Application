import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import axios from "axios";

function Promos() {
  const [hotels, setHotels] = useState([]);
  const [slides, setslides] = useState(3);
  useEffect(() => {
    if (window.innerWidth < 719) {
      setslides(1);
    } else if (window.innerWidth < 991) {
      setslides(2);
    } else if (window.innerWidth < 1400) {
      setslides(3);
    } else {
      setslides(4);
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/hotel/promo")
      .then((res) => {
        let hotel = res.data;
        for (let i = hotel.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [hotel[i], hotel[j]] = [hotel[j], hotel[i]];
        }
        let randomhotels = [hotel[0], hotel[1], hotel[2], hotel[3]];
        setHotels(randomhotels);
      })
      .catch((err) => console.error(err));
  }, []);

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
          Best deals
        </h1>
      </div>
      <br />
      <div className="row">
        <div className="col"></div>
        <div className="col-10">
          <Slider {...settings}>
            {hotels.map((hotel, index) => (
              <div key={index}>
                <div className="card" style={{ width: "95%", height: "600px" }}>
                  {hotel.images[0] ? (
                    <img src={hotel.images[0].url} alt="" height="100%" />
                  ) : (
                    <img
                      src="https://res.cloudinary.com/betravel/image/upload/v1647176972/BeTravel/assets/Image_e9917i.jpg"
                      alt=""
                      height="100px"
                    />
                  )}
                  <div className="card-body">
                    <h3 className="card-title">{hotel.name}</h3>
                    <h5 className="card-title">{hotel.location}</h5>
                    <p className="card-text">
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
                    </p>
                    <Link to={"/Hotel/Detail/" + hotel._id}>
                      <div className="Search__actions">
                        <button className="btn button"> show details</button>
                      </div>
                    </Link>
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
        <Link to="/Hotel/Promos">
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

export default Promos;
