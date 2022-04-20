import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authActions, getAuth } from "../Redux/authReducer";
import { getHotelReservations } from "../Redux/hotelreservationsReducer";
import { getEventReservations } from "../Redux/eventreservationsReducer";
import { navbarActions } from "../Redux/navbarReducer";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Rating from "@mui/material/Rating";

function Profil() {
  const [disable, setdisable] = useState(false);
  const [password, setpassword] = useState("");
  const [confim, setconfim] = useState("");
  const [error, seterror] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const reservations = useSelector((state) => state.hotelreservations);
  const reservationsEvent = useSelector((state) => state.eventreservations);

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getAuth());
    dispatch(getHotelReservations(user._id));
    dispatch(getEventReservations(user._id));
    dispatch(navbarActions.updatenavbar(false));
  }, [dispatch, user._id]);

  const changeDisabled = (e) => {
    e.preventDefault();
    setdisable(true);
  };

  const updateUser = (e) => {
    dispatch(
      authActions.updateuser({ type: e.target.name, value: e.target.value })
    );
  };

  const confirmUpdateUser = (e) => {
    if (password === confim) {
      if (password === "") {
        axios
          .put("http://localhost:8000/api/user/" + user._id, user)
          .then((res) => {
            setdisable(false);
          })
          .catch((err) => console.error(err));
      } else {
        user.password = password;
        axios
          .put("http://localhost:8000/api/user/update", user)
          .then((response) => {
            setdisable(false);
          })
          .catch((err) => alert("Error Server"));
      }
    } else {
      seterror(true);
    }
  };

  return (
    <div className=" container" style={{ marginTop: "100px" }}>
      <br />
      <br />
      <div className="row">
        <div className="col-4">
          <div class="card">
            <div style={{ backgroundColor: "#abc4b1" }}>
              {" "}
              <img
                src="https://img.icons8.com/external-smashingstocks-glyph-smashing-stocks/150/FFFFFF/external-profile-web-smashingstocks-glyph-smashing-stocks.png"
                alt=""
              />
            </div>
            <div class="card-body">
              <TextField
                name="firstname"
                label="First Name"
                variant="outlined"
                value={user.firstname}
                fullWidth
                disabled={!disable}
                onChange={updateUser}
              />
              <br />
              <br />
              <TextField
                name="lastname"
                label="Last Name"
                variant="outlined"
                value={user.lastname}
                fullWidth
                disabled={!disable}
                onChange={updateUser}
              />
              <br />
              <br />
              <TextField
                name="email"
                label="Email"
                variant="outlined"
                value={user.email}
                fullWidth
                disabled={!disable}
                onChange={updateUser}
              />
              <br />
              <br />
              <TextField
                name="phone"
                label="Phone"
                variant="outlined"
                value={user.phone}
                fullWidth
                disabled={!disable}
                onChange={updateUser}
              />
              {disable ? (
                <div>
                  <br />
                  <TextField
                    id="password"
                    label="Password"
                    variant="outlined"
                    value={password}
                    fullWidth
                    disabled={!disable}
                    onChange={(e) => setpassword(e.target.value)}
                  />
                  <br />
                  <br />
                  <TextField
                    id="confim"
                    label="Confirm Password"
                    variant="outlined"
                    value={confim}
                    fullWidth
                    disabled={!disable}
                    onChange={(e) => setconfim(e.target.value)}
                  />
                  {error ? <p className="text-danger">Doesn't match </p> : ""}
                </div>
              ) : (
                ""
              )}
            </div>
            <div
              align="right"
              style={{ marginRight: "20px", marginBottom: "10px" }}
            >
              {disable ? (
                <button className="btn" onClick={confirmUpdateUser}>
                  <img
                    src="https://img.icons8.com/ios/50/000000/save--v1.png"
                    alt=""
                  />
                </button>
              ) : (
                <button className="btn" onClick={changeDisabled}>
                  <img
                    src="https://img.icons8.com/external-tanah-basah-detailed-outline-tanah-basah/50/000000/external-pen-user-interface-tanah-basah-detailed-outline-tanah-basah.png"
                    alt=""
                  />
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="col-8">
          <h2 style={{ textDecoration: "underline", marginBottom: "70px" }}>
            Booking history
          </h2>

          <h4>Hotel's reservations</h4>
          {reservations.length === 0 ? (
            <h5>No Reservation 😞 </h5>
          ) : (
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Reservation id</TableCell>
                    <TableCell align="center">Hotel Name</TableCell>
                    <TableCell align="center">Location </TableCell>
                    <TableCell align="center">Date</TableCell>
                    <TableCell align="center">Rooms</TableCell>
                    <TableCell align="center">Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reservations.map((reservation) => (
                    <TableRow
                      key={reservation.hotel.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {reservation._id}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {reservation.hotel.name}{" "}
                        <Rating
                          name="read-only"
                          value={reservation.hotel.rating}
                          size="small"
                          readOnly
                        />
                      </TableCell>

                      <TableCell component="th" scope="row">
                        {reservation.hotel.location}{" "}
                      </TableCell>
                      <TableCell component="th" scope="row">
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
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {reservation.rooms.single.room.length !== 0 ? (
                          <p style={{ textAlign: "center" }}>
                            {reservation.rooms.single.room.length} Single
                            room(s)
                          </p>
                        ) : (
                          ""
                        )}
                        {reservation.rooms.double.room.length !== 0 ? (
                          <p style={{ textAlign: "center" }}>
                            {reservation.rooms.double.room.length} Double
                            room(s)
                          </p>
                        ) : (
                          ""
                        )}
                        {reservation.rooms.triple.room.length !== 0 ? (
                          <p style={{ textAlign: "center" }}>
                            {reservation.rooms.triple.room.length} Triple
                            room(s)
                          </p>
                        ) : (
                          ""
                        )}
                        {reservation.rooms.quadruple.room.length !== 0 ? (
                          <p style={{ textAlign: "center" }}>
                            {reservation.rooms.quadruple.room.length} Quadruple
                            room(s)
                          </p>
                        ) : (
                          ""
                        )}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {reservation.rooms.total} DT
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          <br />
          <h4>Event's reservations</h4>
          <br />

          {reservationsEvent.length === 0 ? (
            <h5>No Reservation 😞 </h5>
          ) : (
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Reservation id</TableCell>
                    <TableCell align="center">event Name</TableCell>
                    <TableCell align="center">Type </TableCell>
                    <TableCell align="center">Location </TableCell>
                    <TableCell align="center">Date</TableCell>
                    <TableCell align="center">PlaceReserved</TableCell>
                    <TableCell align="center">Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reservationsEvent.map((reservation) => (
                    <TableRow
                      key={reservation.event.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {reservation._id}
                      </TableCell>

                      <TableCell component="th" scope="row">
                        {reservation.event.name}{" "}
                      </TableCell>

                      <TableCell component="th" scope="row">
                        {reservation.event.type}{" "}
                      </TableCell>

                      <TableCell component="th" scope="row">
                        {reservation.event.location}{" "}
                      </TableCell>

                      <TableCell component="th" scope="row">
                        {reservation.event.date.from.getDate() +
                          "/" +
                          (reservation.event.date.from.getMonth() + 1) +
                          "/" +
                          reservation.event.date.from.getFullYear()}{" "}
                        {" to "}{" "}
                        {reservation.event.date.to.getDate() +
                          "/" +
                          (reservation.event.date.to.getMonth() + 1) +
                          "/" +
                          reservation.event.date.to.getFullYear()}
                      </TableCell>

                      <TableCell component="th" scope="row">
                        {reservation.reservedplace}
                      </TableCell>

                      <TableCell component="th" scope="row">
                        {reservation.event.price} DT
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profil;
