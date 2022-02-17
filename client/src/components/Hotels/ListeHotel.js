/* eslint-disable jsx-a11y/img-redundant-alt */

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img from "../../assets/Djerba-Plaza.webp";
import React, { useEffect, useState } from "react";
import axios from "axios";
function ListeHotel() {
  const [hotels, setHotels] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/hotels")
      .then((res) => {
        setHotels(res.data);
      })
      .catch((err) => console.error(err));
  }, [hotels]);

  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <div className="row">
        {/*---------------------------------------------------------------------------------*/}
        <div className="col-3">
          {" "}
          <div className="hotel">
            <form>
              <h1>FORM </h1>

              <div>
                <button type="submit">search </button>
              </div>
            </form>
          </div>
        </div>
        {/*---------------------------------------------------------------------------------*/}
        <div className="col-9">
          {hotels.map((hotel, index) => (
            <div class="card">
              <div class="card-body">
                <div className="row">
                  <div
                    className="col-4"
                    style={{ marginTop: "auto", marginBottom: "auto" }}
                  >
                    <img src={img} class="img-fluid rounded-start" alt="..." />
                  </div>
                  <div className="col-8">
                    {" "}
                    <h3>
                      {hotel.name}
                      <img
                        src="https://img.icons8.com/fluency/25/000000/star.png"
                        alt=""
                      />
                      <img
                        src="https://img.icons8.com/fluency/25/000000/star.png"
                        alt=""
                      />
                      <img
                        src="https://img.icons8.com/fluency/25/000000/star.png"
                        alt=""
                      />
                    </h3>
                    <div>
                      <img
                        src="https://img.icons8.com/ios-glyphs/25/000000/marker--v2.png"
                        alt=""
                      />
                      {hotel.location}
                    </div>
                    <br />
                    <div>
                      <img
                        src="https://img.icons8.com/external-itim2101-fill-itim2101/30/000000/external-hotel-bell-travel-itim2101-fill-itim2101.png"
                        alt=""
                      />
                      <img
                        src="https://img.icons8.com/material-outlined/30/000000/single-bed.png"
                        alt=""
                      />
                      <img
                        src="https://img.icons8.com/external-prettycons-solid-prettycons/30/000000/external-towels-furniture-household-prettycons-solid-prettycons.png"
                        alt=""
                      />
                      <img
                        src="https://img.icons8.com/external-flatart-icons-solid-flatarticons/30/000000/external-wifi-network-and-cloud-computing-flatart-icons-solid-flatarticons.png"
                        alt=""
                      />
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <div>
                          <p>
                            <img
                              src="https://img.icons8.com/emoji/25/000000/check-mark-emoji.png"
                              alt=""
                            />{" "}
                            text1
                          </p>
                          <p>
                            <img
                              src="https://img.icons8.com/emoji/25/000000/check-mark-emoji.png"
                              alt=""
                            />{" "}
                            text2{" "}
                          </p>
                          <p>
                            <img
                              src="https://img.icons8.com/emoji/25/000000/check-mark-emoji.png"
                              alt=""
                            />{" "}
                            text3
                          </p>
                        </div>
                      </div>
                      <div className="col-6">
                        <div>
                          <h3>1,300 DT</h3>
                          <div>
                            <h6 style={{ "text-decoration": "line-through" }}>
                              1,999 DT
                            </h6>
                            <h6>32% off</h6>
                          </div>
                          <button class="btn btn-primary">Show Details </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ListeHotel;
