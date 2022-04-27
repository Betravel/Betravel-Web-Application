import { useSelector } from "react-redux";
import Rating from "@mui/material/Rating";
function RecapHotel() {
  const hotel = useSelector((state) => state.hotel.hotel);
  const reservation = useSelector((state) => state.hotel);

  console.log(reservation.periode);
  return (
    <div className="container">
      <div className="card">
        {hotel.images[0] ? (
          <img src={hotel.images[0].url} alt="" width="100%" />
        ) : (
          <img
            src="https://res.cloudinary.com/betravel/image/upload/v1647176972/BeTravel/assets/Image_e9917i.jpg"
            alt=""
            width="100%"
          />
        )}
        <div className="card-body">
          <img
            src="https://img.icons8.com/android/20/000000/marker.png"
            alt=""
          />
          {hotel.location}
          <h2>
            {hotel.name}{" "}
            <Rating name="read-only" value={hotel.rating} readOnly />
          </h2>
          <br />
          <br />
          <h5 style={{ textDecoration: "underline", textAlign: "center" }}>
            Recap Reservation
          </h5>
          <p style={{ textAlign: "left" }}>
            {" "}
            Periode : &ensp;
            <br />
            <p style={{ textAlign: "center" }}>
              {reservation.periode[0].getDate() +
                "/" +
                (reservation.periode[0].getMonth() + 1) +
                "/" +
                reservation.periode[0].getFullYear()}{" "}
              {" to "}{" "}
              {reservation.periode[1].getDate() +
                "/" +
                (reservation.periode[1].getMonth() + 1) +
                "/" +
                reservation.periode[1].getFullYear()}
            </p>
          </p>
          <p style={{ textAlign: "left" }}>
            Rooms : &ensp; <br />
            {reservation.rooms.single.room.length !== 0 ? (
              <p style={{ textAlign: "center" }}>
                {reservation.rooms.single.room.length} Single room(s)
              </p>
            ) : (
              ""
            )}
            {reservation.rooms.double.room.length !== 0 ? (
              <p style={{ textAlign: "center" }}>
                {reservation.rooms.double.room.length} Double room(s)
              </p>
            ) : (
              ""
            )}
            {reservation.rooms.triple.room.length !== 0 ? (
              <p style={{ textAlign: "center" }}>
                {reservation.rooms.triple.room.length} Triple room(s)
              </p>
            ) : (
              ""
            )}
            {reservation.rooms.quadruple.room.length !== 0 ? (
              <p style={{ textAlign: "center" }}>
                {reservation.rooms.quadruple.room.length} Quadruple room(s)
              </p>
            ) : (
              ""
            )}
          </p>
          <p style={{ textAlign: "left" }}>
            Total : &ensp;
            <br />
            <p style={{ textAlign: "center" }}>{reservation.rooms.total} DT</p>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RecapHotel;
