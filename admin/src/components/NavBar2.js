import { Link } from "react-router-dom";
import "../css/Card.css";
function Navbar2() {
  return (
    <div>
      <br />
      <img
        src="https://res.cloudinary.com/betravel/image/upload/v1646934431/BeTravel/Logo/betravel_sn54ad.png"
        class="card-img-top"
        alt=""
      />
      <hr />
      <h4 style={{ color: "white " }}>DashBoard</h4>
      <hr />
      <Link to="/" className="btn" style={{ color: "white", fontSize: "25px" }}>
        OverView
      </Link>
      <hr />
      <Link
        to="/Users"
        className="btn"
        style={{ color: "white", fontSize: "25px" }}
      >
        Users
      </Link>
      <hr />
      <button
        class="btn"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#hotels"
        aria-expanded="false"
        aria-controls="hotels"
        style={{ color: "white", fontSize: "25px" }}
      >
        Hotels
      </button>
      <div class="collapse" id="hotels">
        <div class="card card-body">
          <Link to="/Hotels" className="btn">
            List Hotels
          </Link>
          <hr />
          <Link to="/AddHotel" className="btn">
            Add Hotel
          </Link>
        </div>
      </div>
      <hr />
      <button
        class="btn"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#events"
        aria-expanded="false"
        aria-controls="events"
        style={{ color: "white", fontSize: "25px" }}
      >
        Events
      </button>
      <div class="collapse" id="events">
        <div class="card card-body">
          <Link to="/Events" className="btn">
            List Events
          </Link>
          <hr />
          <Link to="/AddEvent" className="btn">
            Add Event
          </Link>
        </div>
      </div>
      <hr />
      <Link to="/" className="btn" style={{ color: "white", fontSize: "25px" }}>
        Reservations
      </Link>
      <hr />
      <Link to="/" className="btn" style={{ color: "white", fontSize: "25px" }}>
        Logout
      </Link>
      <hr />
    </div>
  );
}

export default Navbar2;
