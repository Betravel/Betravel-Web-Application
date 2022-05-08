import { useState } from "react";
import HotelReservationsOverview from "./HotelReservationOverview";
import UsersOverview from "./UsersOverview";
import EventReservationsOverview from "./EventReservationOverview";
import HotelOverview from "./HotelOverview";
import EventOverview from "./EventOverview";
import BarCharts from "./Barcharts";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import HotelLocationOverview from "./HotelLocationOverview";
import EventLocationOverview from "./EventLocationOverview";
function DashBoard() {
  const [value] = useState(new Date());
  return (
    <div
      className="container-fluid"
      style={{ marginTop: "50px", marginBottom: "50px" }}
    >
      <div className="row">
        <div className="col"></div>
        <div className="col-3">
          <UsersOverview />
        </div>
        <div className="col"></div>
        <div className="col-3">
          <HotelOverview />
        </div>
        <div className="col"></div>
        <div className="col-3">
          <EventOverview />
        </div>
        <div className="col"></div>
      </div>
      <br />
      <br />
      <div className="row">
        <div className="col"></div>
        <div className="col-4">
          <HotelLocationOverview />
        </div>
        <div className="col"></div>
        <div className="col-4">
          <EventLocationOverview />
        </div>
        <div className="col"></div>
      </div>
      <br />
      <br />
      <div className="row">
        <div className="col-8">
          <BarCharts />
        </div>
        <div
          className="col-4"
          style={{
            marginTop: "auto",
            marginBottom: "auto",
          }}
        >
          <div align="center">
            
            <Calendar value={value} />
            
          </div>
        </div>
      </div>
      <br />
      <br />
      <div className="row">
        <div className="col"></div>
        <div className="col-4">
          <HotelReservationsOverview />
        </div>
        <div className="col"></div>
        <div className="col-4">
          <EventReservationsOverview />
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
}

export default DashBoard;
