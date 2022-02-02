import React, { useState } from "react";
import { Link } from "react-router-dom";
import BannerImage from "../assets/vacances.jpeg";
import "../styles/home.css";

function Home() {
  const [Destination, setDestination] = useState("");
  const [Checkin, setCheckin] = useState("");
  const [Checkout, setCheckout] = useState("");
  const [Guests, setGuests] = useState("");

  return (
    <div className="home" style={{ backgroundImage: `url(${BannerImage})` }}>
      <div className="headerContainer">
        <card body>
          <h1> BOOK NOW ! </h1>
          <form className="home">
            <div className="field">
              <label>Destination</label>
              <br />
              <input
                type="text"
                value={Destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <div className="field">
              <label>Check-in</label>
              <br />
              <input
                type="date"
                value={Checkin}
                onChange={(e) => setCheckin(e.target.value)}
              />
            </div>
            <div className="field">
              <label>Check-out</label>
              <br />
              <input
                type="date"
                value={Checkout}
                onChange={(e) => setCheckout(e.target.value)}
              />
            </div>
            <div className="field">
              <label>Guests</label>
              <br />
              <input
                type="text"
                value={Guests}
                onChange={(e) => setGuests(e.target.value)}
              />
            </div>
          </form>
          <Link to="/list">
            <button> ORDER NOW </button>
          </Link>
        </card>
      </div>
    </div>
  );
}

export default Home;
