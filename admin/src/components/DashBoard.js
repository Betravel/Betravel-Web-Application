import PromosOverview from "./PromosOverview";
import ReservationsOverview from "./ReservationOverview";
import UsersOverview from "./UsersOverview";
function DashBoard() {
  return (
    <div className="container-fluid">
      <div className="row" style={{ minHeight: window.innerHeight }}>
        <div
          className="container"
          style={{ marginTop: "auto", marginBottom: "auto" }}
        >
          <div className="row">
            <div className="col-2"></div>
            <div className="col-3">
              <UsersOverview />
            </div>
            <div className="col-2"></div>
            <div className="col-3">
              <PromosOverview />
            </div>
            <div className="col-1"></div>
          </div>
          <br />
          <div className="row">
            <div className="col-4"></div>
            <div className="col-4">
              <ReservationsOverview />
            </div>
            <div className="col-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
