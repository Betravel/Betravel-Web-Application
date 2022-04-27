import { alpha, styled } from "@mui/material/styles";
import axios from "axios";
import { useEffect, useState } from "react";

function PromosOverview() {
  const IconWrapperStyle = styled("div")(({ theme }) => ({
    margin: "auto",
    display: "flex",
    borderRadius: "50%",
    alignItems: "center",
    width: theme.spacing(8),
    height: theme.spacing(8),
    justifyContent: "center",
    marginBottom: theme.spacing(3),
    color: theme.palette.info.dark,
    backgroundImage: `linear-gradient(135deg, ${alpha(
      theme.palette.info.dark,
      0
    )} 0%, ${alpha(theme.palette.info.dark, 0.24)} 100%)`,
  }));
  const [promos, setpromos] = useState(0);
  const [reservations, setreservations] = useState(0);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/hotel/promo")
      .then((res) => {
        setpromos(res.data.length);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/reservationHotel/getPromos")
      .then((res) => {
        setreservations(res.data.length);
      })
      .catch((err) => console.log(err));
  }, []);
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
        <IconWrapperStyle>
          <img
            src="https://img.icons8.com/ios-filled/40/01579b/winter-sales.png"
            alt=""
          />
        </IconWrapperStyle>
        <h5 className="card-title">{promos}</h5>
        <h6 className="card-subtitle mb-2 text-muted">Active Promotions</h6>
        <p className="card-text">{reservations} reservations on promos</p>
      </div>
    </div>
  );
}

export default PromosOverview;
