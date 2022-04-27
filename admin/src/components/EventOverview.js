import { alpha, styled } from "@mui/material/styles";
import axios from "axios";
import { useEffect, useState } from "react";

function EventOverview() {
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
  const [active, setactive] = useState(0);
  const [events, setevents] = useState(0);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/event/all")
      .then((res) => {
        setevents(res.data.length);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/event/new")
      .then((res) => {
        setactive(res.data.length);
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
            src="https://img.icons8.com/ios-filled/40/01579b/camping-tent.png"
            alt=""
          />
        </IconWrapperStyle>
        <h5 className="card-title">{events}</h5>
        <h6 className="card-subtitle mb-2 text-muted">Events</h6>
        <p className="card-text">{active} Active events</p>
      </div>
    </div>
  );
}

export default EventOverview;
