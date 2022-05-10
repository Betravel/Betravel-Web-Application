import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  getPricesEventReservation,
  getPricesHotelReservation,
} from "../Redux/pricesReducer";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Revenu en DT",
    },
  },
};

function BarCharts() {
  const prices = useSelector((state) => state.prices);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPricesEventReservation());
    dispatch(getPricesHotelReservation());
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
        <Bar options={options} data={prices} />
      </div>
    </div>
  );
}
export default BarCharts;
