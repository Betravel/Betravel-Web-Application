import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getHotels } from "../Redux/hotelsReducer";
import "react-alice-carousel/lib/alice-carousel.css";
import Search2 from "./Search2";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
function ListeHotel() {
  const dispatch = useDispatch();
  const hotels = useSelector((state) => state.hotels);

  const [Destination] = useState(
    JSON.parse(localStorage.getItem("search")).destination
  );

  useEffect(() => {
    dispatch(getHotels(Destination));
  }, [Destination, dispatch]);

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
            <div
              className="card"
              style={{
                height: "300px",
                width: "100%",
                backgroundColor: "#E9FBF3",
              }}
            >
              <div className="card-body">
                <div className="row">
                  <div
                    className="col-4"
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
                  <div className="col-8">
                    {" "}
                    <h3>
                      {hotel.name} &nbsp;
                      <Rating name="read-only" value={hotel.rating} readOnly />
                    </h3>
                    <div style={{ marginRight: "40%" }}>
                      <img
                        src="https://img.icons8.com/android/20/000000/marker.png"
                        alt=""
                      />
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
                            <div className="Search__actions">
                              <button className="btn btn-primary">
                                {" "}
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
