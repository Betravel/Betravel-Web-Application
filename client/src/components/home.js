import React, { useEffect } from "react";
import "../css/home.css";
import SearchFormHotel from "./SearchFormHotel";
import Promos from "./Promos.js";
import Events from "./Events";
import Contact from "./Contact";
import { useDispatch } from "react-redux";
import { navbarActions } from "../Redux/navbarReducer";

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(navbarActions.updatenavbar(true));
  }, [dispatch]);
  return (
    <div className="container-fluid" style={{ backgroundColor: "#E9FBF3" }}>
      <div className="row row1">
        <div className="container">
          <div className="row row2">
            <h1 className="title">Enjoy your trip </h1>
            <br />
            <br />
            <br />
            <SearchFormHotel />
          </div>
        </div>
      </div>
      <br />
      <div className="row ">
        <div className="container">
          <div
            className="row"
            style={{ color: "black", fontSize: "2rem", fontWeight: "bold" }}
          >
            <div className="col-12">You can find </div>
          </div>
          <br />
          <div className="row row3">
            <div className="col-4">
              <div className="cercle">
                <img
                  src="https://img.icons8.com/external-filled-outline-satawat-anukul/100/000000/external-summer-summer-filled-outline-filled-outline-satawat-anukul-43.png"
                  alt=""
                  style={{ marginTop: "30px" }}
                />
                <p>Best destinations</p>
              </div>
            </div>
            <div className="col-4">
              <div className="cercle">
                <img
                  src="https://img.icons8.com/external-xnimrodx-lineal-color-xnimrodx/100/000000/external-wallet-customer-review-xnimrodx-lineal-color-xnimrodx.png"
                  alt=""
                  style={{ marginTop: "30px" }}
                />
                <p>Best prices</p>
              </div>
            </div>
            <div className="col-4">
              <div className="cercle">
                <img
                  src="https://img.icons8.com/external-itim2101-lineal-color-itim2101/100/000000/external-support-services-contact-and-message-itim2101-lineal-color-itim2101-2.png"
                  alt=""
                  style={{ marginTop: "30px" }}
                />
                <p>Best services</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <div className="row">
        <Promos />
      </div>
      <br /> <br />
      <div className="row">
        <Events />
      </div>
      <br /> <br />
      <div className="row" id="contact">
        <Contact />
      </div>
    </div>
  );
}

export default Home;
