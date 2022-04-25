import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hotelActions } from "../Redux/hotelReducer";
import { eventActions } from "../Redux/eventReducer";
import { useEffect } from "react";
function Navbar() {
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users/getloggedinuser", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.type === "user") {
          window.location.href = "http://localhost:3000/";
        }
      })
      .catch(
        (err) =>
          (window.location.href = "http://localhost:3000/SignIn?path=home")
      );
  }, []);
  const dispatch = useDispatch();
  const logout = () => {
    axios
      .get("http://localhost:8000/api/logout", {
        withCredentials: true,
      })
      .then((res) => {
        window.location.href = "http://localhost:3000/";
        // window.location.reload(false);
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
        className="card-img-top"
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
        className="btn"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#hotels"
        aria-expanded="false"
        aria-controls="hotels"
        style={{ color: "white", fontSize: "25px" }}
      >
        Hotels
      </button>
      <div className="collapse" id="hotels">
        <div className="card card-body">
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
        className="btn"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#events"
        aria-expanded="false"
        aria-controls="events"
        style={{ color: "white", fontSize: "25px" }}
      >
        Events
      </button>
      <div className="collapse" id="events">
        <div className="card card-body">
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
        className="btn"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#reservations"
        aria-expanded="false"
        aria-controls="reservations"
        style={{ color: "white", fontSize: "25px" }}
      >
        Reservations
      </button>
      <div className="collapse" id="reservations">
        <div className="card card-body">
          <Link to="/Reservations/Hotel" className="btn">
            Hotel's Reservations
          </Link>
          <hr />
          <Link to="/Reservations/Event" className="btn">
            Event's Reservations
          </Link>
          <hr />
          <Link to="/Reservations/CustomTrip" className="btn">
            Custom Trip's Reservations
          </Link>
        </div>
      </div>
      <hr />
      <button
        className="btn"
        style={{ color: "white", fontSize: "25px" }}
        onClick={logout}
      >
        Logout
      </button>
      <hr />
    </div>
  );
}

export default Navbar;
