import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img from "../../assets/Djerba-Plaza.webp";
import img1 from "../../assets/travel.jpg";
import img2 from "../../assets/banner.jpg";
import img3 from "../../assets/img.png";
import React, { useEffect, useState } from "react";
import axios from "axios";
// import Search2 from "../Search/SearchForm/Search2.js";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./ListeHotel.css";
import Search2 from "../Search/SearchForm/Search2";

function ListeHotel() {
  const [hotels, setHotels] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/hotels/all")
      .then((res) => {
        setHotels(res.data);
      })
      .catch((err) => console.error(err));
  }, [hotels]);

  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <div className="row">
        {/*---------------------------------------------------------------------------------*/}
        <div className="col-4">
          {" "}
          <div className="hotel">
            <Search2 />
          </div>
        </div>
        {/*---------------------------------------------------------------------------------*/}
        <div className="col-8">
          {hotels.map((hotel, index) => (
            <div class="card">
              <div class="card-body">
                <div className="row">
                  <div
                    className="col-4"
                    style={{ marginTop: "auto", marginBottom: "auto" }}
                  >
                    <AliceCarousel autoPlay autoPlayInterval="3000">
                      <img src={img} className="sliderimg" alt="" />
                      <img src={img1} className="sliderimg" alt="" />
                      <img src={img2} className="sliderimg" alt="" />
                      <img src={img3} className="sliderimg" alt="" />
                    </AliceCarousel>
                    {/* <img src={img} class="img-fluid rounded-start" alt="..." /> */}
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
