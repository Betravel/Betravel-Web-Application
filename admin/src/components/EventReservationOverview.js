import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { getOverviewEventReservation } from "../Redux/reservationoverviewReducer";

ChartJS.register(ArcElement, Tooltip, Legend);

function EventReservationsOverview() {
  const overview = useSelector((state) => state.overview.event);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOverviewEventReservation());
  }, [dispatch]);
  return (
    <div
      className="card"
      style={{
        width: "auto",
        marginRight: "auto",
        marginLeft: "auto",
      }}
    >
      <div className="card-body">
        <h5 className="card-title">Events Reservations / Place</h5>
        <br />
        <Pie data={overview} />
      </div>
    </div>
  );
}

export default EventReservationsOverview;
