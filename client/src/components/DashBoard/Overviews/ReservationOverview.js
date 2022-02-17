import { alpha, styled } from "@mui/material/styles";

function ReservationsOverview() {
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-calendar3-week-fill"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M2 0a2 2 0 0 0-2 2h16a2 2 0 0 0-2-2H2zM0 14V3h16v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm12-8a1 1 0 1 0 2 0 1 1 0 0 0-2 0zM5 9a1 1 0 1 0 2 0 1 1 0 0 0-2 0zm5-2a1 1 0 1 1 0-2 1 1 0 0 1 0 2zM2 9a1 1 0 1 0 2 0 1 1 0 0 0-2 0z"
            />
          </svg>
        </IconWrapperStyle>
        <h5 className="card-title">32435</h5>
        <h6 className="card-subtitle mb-2 text-muted">reservations</h6>
        <p className="card-text">32 reservations waiting</p>
      </div>
    </div>
  );
}

export default ReservationsOverview;
