import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAuth } from "../Redux/authReducer";
import { getHotelReservations } from "../Redux/hotelreservationsReducer";
import { getEventReservations } from "../Redux/eventreservationsReducer";
import { getTripReservations } from "../Redux/tripreservationsReducer";
import { navbarActions } from "../Redux/navbarReducer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Rating from "@mui/material/Rating";
function ReservationsHistory() {
  const user = useSelector((state) => state.auth.user);
  const reservations = useSelector((state) => state.hotelreservations);
  const reservationsEvent = useSelector((state) => state.eventreservations);
  const reservationsTrip = useSelector((state) => state.tripreservations);
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getAuth());
    dispatch(getHotelReservations(user._id));
    dispatch(getEventReservations(user._id));
    dispatch(getTripReservations(user._id));
    dispatch(navbarActions.updatenavbar(false));
  }, [dispatch, user._id]);
  return (
    <div className="container" style={{ marginTop: "120px" }}>
      <div className="row">
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
      </div>
      <br />
      <div className="row">
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
      <br />
      <div className="row">
        <h4>Trip's reservations</h4>
        <br />
        {reservationsTrip.length === 0 ? (
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
                  <TableCell align="center">Type</TableCell>
                  <TableCell align="center">nbrDestinations</TableCell>
                  <TableCell align="center">nbrPersonnes </TableCell>
                  <TableCell align="center">Periode</TableCell>
                  <TableCell align="center">evenements </TableCell>
                  <TableCell align="center">status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reservationsTrip.map((reservation, i) => (
                  <TableRow
                    key={i}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {reservation._id}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {reservation.typeDestination}{" "}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {reservation.nbrDestination}{" "}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {reservation.nbrPersonnes}{" "}
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
                      {reservation.events.length}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {reservation.status}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
}

export default ReservationsHistory;
