import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { getOverviewHotelReservation } from "../Redux/reservationoverviewReducer";

ChartJS.register(ArcElement, Tooltip, Legend);

function HotelReservationsOverview() {
  const overview = useSelector((state) => state.overview.hotel);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOverviewHotelReservation());
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
        <h5 className="card-title">Hotels Reservations / Place</h5>
        <br />
        <Pie data={overview} />
      </div>
    </div>
  );
}

export default HotelReservationsOverview;
