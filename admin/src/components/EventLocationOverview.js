import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { getOverviewEventLocation } from "../Redux/locationReducer";

ChartJS.register(ArcElement, Tooltip, Legend);

function EventLocationOverview() {
  const overview = useSelector((state) => state.location.event);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOverviewEventLocation());
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
        <h5 className="card-title">Events / Place</h5>
        <br />
        <Doughnut data={overview} />
      </div>
    </div>
  );
}
export default EventLocationOverview;
