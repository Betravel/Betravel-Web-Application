import PromosOverview from "./Overviews/PromosOverview";
import ReservationsOverview from "./Overviews/ReservationOverview";
import UsersOverview from "./Overviews/UsersOverview";
import ListUsers from "./UsersAdmin/ListUsers";
function DashBoard() {
  return (
    <div className="container-fluid" style={{ marginTop: "120px" }}>
      <div className="row" style={{ backgroundColor: "beige" }}>
        <div className="container" style={{ marginTop: "50px" }}>
          <div className="row">
            <div className="col-4">
              <UsersOverview />
            </div>
            <div className="col-4">
              <PromosOverview />
            </div>
            <div className="col-4">
              <ReservationsOverview />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="container">
          <div className="row">
            <div className="col-6">
              <ListUsers />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
