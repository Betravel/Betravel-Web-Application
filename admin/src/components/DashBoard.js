import PromosOverview from "./PromosOverview";
import ReservationsOverview from "./ReservationOverview";
import UsersOverview from "./UsersOverview";
import ListUsers from "./ListUsers";
import ListHotels from "./ListHotels";
import DetailUser from "./DetailUser";
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
            <div className="col-6">
              <DetailUser />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6">
          <ListHotels />
        </div>
        <div className="col-3"></div>
      </div>
    </div>
  );
}

export default DashBoard;
