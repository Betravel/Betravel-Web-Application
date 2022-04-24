import PromosOverview from "./PromosOverview";
import HotelReservationsOverview from "./HotelReservationOverview";
import UsersOverview from "./UsersOverview";
import EventReservationsOverview from "./EventReservationOverview";
import TripOverview from "./TripOverview";
import HotelOverview from "./HotelOverview";
import EventOverview from "./EventOverview";
function DashBoard() {
  return (
    <div className="container-fluid">
      <div className="row" style={{ minHeight: window.innerHeight }}>
        <div
          className="container"
          style={{ marginTop: "auto", marginBottom: "auto" }}
        >
          <div className="row">
            <div className="col"></div>
            <div className="col-3">
              <UsersOverview />
            </div>
            <div className="col"></div>
            <div className="col-3">
              <PromosOverview />
            </div>
            <div className="col"></div>
          </div>
          <br />
          <br />
          <div className="row">
            <div className="col"></div>
            <div className="col-3">
              <HotelReservationsOverview />
            </div>
            <div className="col"></div>
            <div className="col-3">
              <EventReservationsOverview />
            </div>
            <div className="col"></div>
            <div className="col-3">
              <TripOverview />
            </div>
            <div className="col"></div>
          </div>
          <br />
          <br />
          <div className="row">
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
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
