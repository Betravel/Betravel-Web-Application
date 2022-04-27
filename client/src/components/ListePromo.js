import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "react-alice-carousel/lib/alice-carousel.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";
import loc from "../assets/icons8-place-marker.gif";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { navbarActions } from "../Redux/navbarReducer";
function ListePromo() {
  const dispatch = useDispatch();
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(navbarActions.updatenavbar(false));
    axios
      .get("http://localhost:8000/api/hotel/promo")
      .then((res) => {
        setHotels(res.data);
      })
      .catch((err) => console.error(err));
  }, [dispatch]);
  return (
    <div
      className="container"
      style={{ marginTop: "150px", marginBottom: "50px" }}
    >
      {hotels.map((hotel, index) => (
        <div className="row" key={index}>
          <div
            className="card"
            style={{
              width: "100%",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            <div className="card-body">
              <div className="row">
                <div
                  className="col-lg-4 col-sm-12"
                  style={{ marginTop: "auto", marginBottom: "auto" }}
                >
                  {hotel.images[0] ? (
                    <img src={hotel.images[0].url} alt="" width="100%" />
                  ) : (
                    <img
                      src="https://res.cloudinary.com/betravel/image/upload/v1647176972/BeTravel/assets/Image_e9917i.jpg"
                      alt=""
                      width="100%"
                    />
                  )}
                </div>
                <div className="col-lg-8 col-sm-12">
                  <h3>
                    {hotel.name} &nbsp;
                    <Rating name="read-only" value={hotel.rating} readOnly />
                  </h3>
                  <div style={{ marginRight: "40%" }}>
                    <img src={loc} alt="" width="50" />
                    {hotel.location}
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <div align="left">
                        {hotel.price.single.lpd ||
                        hotel.price.double.lpd ||
                        hotel.price.triple.lpd ||
                        hotel.price.quadruple.ldp ? (
                          <p>
                            <img
                              src="https://img.icons8.com/emoji/25/000000/check-mark-emoji.png"
                              alt=""
                            />{" "}
                            Breakfast{" "}
                          </p>
                        ) : (
                          ""
                        )}

                        {hotel.price.single.dp ||
                        hotel.price.double.dp ||
                        hotel.price.triple.dp ||
                        hotel.price.quadruple.dp ? (
                          <p>
                            <img
                              src="https://img.icons8.com/emoji/25/000000/check-mark-emoji.png"
                              alt=""
                            />{" "}
                            Half Pension{" "}
                          </p>
                        ) : (
                          ""
                        )}
                        {hotel.price.single.pc ||
                        hotel.price.double.pc ||
                        hotel.price.triple.pc ||
                        hotel.price.quadruple.pc ? (
                          <p>
                            <img
                              src="https://img.icons8.com/emoji/25/000000/check-mark-emoji.png"
                              alt=""
                            />{" "}
                            Full Pension
                          </p>
                        ) : (
                          ""
                        )}

                        {hotel.price.single.ai ||
                        hotel.price.double.ai ||
                        hotel.price.triple.ai ||
                        hotel.price.quadruple.ai ? (
                          <p>
                            <img
                              src="https://img.icons8.com/emoji/25/000000/check-mark-emoji.png"
                              alt=""
                            />{" "}
                            All inclusif
                          </p>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="col-6">
                      <div>
                        <h3>
                          A partir
                          {hotel.price.best -
                            (hotel.price.best * hotel.promo) / 100}
                          DT
                        </h3>
                        {hotel.promo === 0 ? (
                          ""
                        ) : (
                          <div>
                            <h6 style={{ textDecoration: "line-through" }}>
                              {hotel.price.best} DT
                            </h6>
                            <h6>{hotel.promo}% off</h6>
                          </div>
                        )}

                        <Link to={"/Hotel/Detail/" + hotel._id}>
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
          </div>
        </div>
      ))}
      <Stack spacing={2} alignItems="center">
        <Pagination count={5} />
      </Stack>
    </div>
  );
}
export default ListePromo;
