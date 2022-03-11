import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "react-alice-carousel/lib/alice-carousel.css";
import Search2 from "./Search2";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
function ListeHotel() {
  const [hotels, setHotels] = useState([]);

  const [Destination] = useState(
    JSON.parse(localStorage.getItem("search")).destination
  );

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/hotel/search/" + Destination)
      .then((res) => {
        setHotels(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <div className="row">
        <div className="col-4">
          {" "}
          <div className="hotel">
            <Search2 />
          </div>
        </div>
        <div className="col-8">
          {hotels.map((hotel, index) => (
            <div className="card" style={{ height: "300px", width: "100%" }}>
              <div className="card-body">
                <div className="row">
                  <div
                    className="col-4"
                    style={{ marginTop: "auto", marginBottom: "auto" }}
                  >
                    <img src={hotel.imagesurl[0].url} alt="" width="100%" />
                  </div>
                  <div className="col-8">
                    {" "}
                    <h3>
                      {hotel.name} &nbsp;
                      <Rating name="read-only" value={hotel.rating} readOnly />
                    </h3>
                    <div style={{ marginRight: "40%" }}>
                      <img
                        src="https://res.cloudinary.com/betravel/image/upload/v1646934456/BeTravel/assets/icons8-place-marker_zknh1z.gif"
                        alt=""
                        width="50"
                      />
                      {hotel.location}
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <div align="left">
                          {hotel.price.lp ? (
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

                          {hotel.price.dp ? (
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
                          {hotel.price.pc ? (
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

                          {hotel.price.ai ? (
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
                            {" "}
                            A partir{" "}
                            {hotel.price.best -
                              (hotel.price.best * hotel.promo) / 100}{" "}
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
          ))}
          <Stack spacing={2} alignItems="center">
            <Pagination count={5} />
          </Stack>
        </div>
      </div>
    </div>
  );
}

export default ListeHotel;
