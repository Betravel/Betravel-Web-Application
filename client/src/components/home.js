import React from "react";
import "./home.css";
import SearchFormHotel from "../Search/SearchForm/SearchFormHotel";
import Promos from "../PromosHotel/Promos";

function Home() {
  return (
    <div className="container-fluid">
      <div className="row row1">
        <div className="container">
          <div className="row row2">
            <h1 className="title">Enjoy your trip </h1>
            <br />
            <br />
            <br />
            <br />
            <br />
            <SearchFormHotel />
          </div>
        </div>
      </div>
      <div className="row ">
        <div className="container">
          <br />
          <br />
          <br />
          <br />

          <div className="row row3">
            <div className="col-4">
              <img
                src="https://img.icons8.com/external-filled-outline-satawat-anukul/100/000000/external-summer-summer-filled-outline-filled-outline-satawat-anukul-43.png"
                alt=""
              />{" "}
              Best destinations
            </div>
            <div className="col-4">
              <img
                src="https://img.icons8.com/fluency/100/000000/card-wallet.png"
                alt=""
              />{" "}
              Best prices{" "}
            </div>
            <div className="col-4">
              <img
                src="https://img.icons8.com/external-itim2101-lineal-color-itim2101/100/000000/external-support-services-contact-and-message-itim2101-lineal-color-itim2101-2.png"
                alt=""
              />
              Best services
            </div>
          </div>
          <br />
          <br />
          <br />
        </div>
      </div>
      <div className="row">
        <Promos />
      </div>
    </div>
  );
}

export default Home;
