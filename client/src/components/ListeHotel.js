import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "react-alice-carousel/lib/alice-carousel.css";
import Search2 from "./Search2";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";
import loc from "../assets/icons8-place-marker.gif";
function ListeHotel() {
  const [hotels, setHotels] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/hotels/all")
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
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div
                    className="col-4"
                    style={{ marginTop: "auto", marginBottom: "auto" }}
                  >
                    {hotel.images.map((image) => (
                      <img src={image.toString("base64")} alt="" />
                    ))}
                  </div>
                  <div className="col-8">
                    {" "}
                    <h3>
                      {hotel.name} &nbsp;
                      <Rating name="read-only" value={hotel.rating} readOnly />
                    </h3>
                    <div style={{ marginRight: "40%" }}>
                      <img src={loc} alt="" width="50" />
                      {hotel.location}
                    </div>
                    <br />
                    <div align="left">
                      <span title="Bell">
                        {" "}
                        <img
                          src="https://img.icons8.com/external-itim2101-fill-itim2101/30/000000/external-hotel-bell-travel-itim2101-fill-itim2101.png"
                          alt=""
                        />{" "}
                      </span>
                      <span title="Single bed">
                        {" "}
                        <img
                          src="https://img.icons8.com/material-outlined/30/000000/single-bed.png"
                          alt=""
                        />
                      </span>
                      <span title="Towels">
                        <img
                          src="https://img.icons8.com/external-prettycons-solid-prettycons/30/000000/external-towels-furniture-household-prettycons-solid-prettycons.png"
                          alt=""
                        />
                      </span>
                      <span title="Free wifi">
                        <img
                          src="https://img.icons8.com/external-flatart-icons-solid-flatarticons/30/000000/external-wifi-network-and-cloud-computing-flatart-icons-solid-flatarticons.png"
                          alt=""
                        />
                      </span>
                    </div>
                    <br />
                    <div className="row">
                      <div className="col-6">
                        <div align="left">
                          <p>
                            <img
                              src="https://img.icons8.com/emoji/25/000000/check-mark-emoji.png"
                              alt=""
                            />{" "}
                            Breakfast{" "}
                          </p>
                          <p>
                            <img
                              src="https://img.icons8.com/emoji/25/000000/check-mark-emoji.png"
                              alt=""
                            />{" "}
                            Half Pension{" "}
                          </p>
                          <p>
                            <img
                              src="https://img.icons8.com/emoji/25/000000/check-mark-emoji.png"
                              alt=""
                            />{" "}
                            Full Pension
                          </p>
                          <p>
                            <img
                              src="https://img.icons8.com/emoji/25/000000/check-mark-emoji.png"
                              alt=""
                            />{" "}
                            All inclusif
                          </p>
                        </div>
                      </div>
                      <div className="col-6">
                        <div>
                          <h3>1,300 DT</h3>
                          <div>
                            <h6 style={{ textDecoration: "line-through" }}>
                              1,999 DT
                            </h6>
                            <h6>32% off</h6>
                          </div>

                          <button className="btn btn-primary">
                            Show Details{" "}
                          </button>
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
