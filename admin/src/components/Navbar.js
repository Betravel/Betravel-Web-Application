import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "../css/Card.css";
import { hotelActions } from "../Redux/hotelReducer";
import { eventActions } from "../Redux/eventReducer";
function Navbar() {
  const dispatch = useDispatch();
  const history = useNavigate();
  const logout = () => {
    axios
      .get("http://localhost:8000/api/logout", {
        withCredentials: true,
      })
      .then((res) => {
        history("/");
        window.location.reload(false);
      })
      .catch((err) => console.log(err));
  };
  const clearHotel = () => {
    dispatch(hotelActions.clearhotel());
  };
  const clearEvent = () => {
    dispatch(eventActions.clearevent());
  };
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
          <Link to="/AddHotel" className="btn" onClick={clearHotel}>
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
          <Link to="/AddEvent" className="btn" onClick={clearEvent}>
            Add Event
          </Link>
        </div>
      </div>
      <hr />
      <button
        class="btn"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#reservations"
        aria-expanded="false"
        aria-controls="reservations"
        style={{ color: "white", fontSize: "25px" }}
      >
        Reservations
      </button>
      <div class="collapse" id="reservations">
        <div class="card card-body">
          <Link to="/Reservations/Hotel" className="btn">
            Hotel's Reservations
          </Link>
          <hr />
          <Link to="/Reservations/Event" className="btn">
            Event's Reservations
          </Link>
          <hr />
          <Link to="/Reservations/Custom" className="btn">
            Custom Trip's Reservations
          </Link>
        </div>
      </div>
      <hr />
      <Link
        to="/"
        className="btn"
        style={{ color: "white", fontSize: "25px" }}
        onClick={logout}
      >
        Logout
      </Link>
      <hr />
    </div>
  );
}

export default Navbar;
