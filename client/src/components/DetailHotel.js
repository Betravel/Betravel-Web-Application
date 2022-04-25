import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getHotel, hotelActions } from "../Redux/hotelReducer";
import { navbarActions } from "../Redux/navbarReducer";
import { getAuth } from "../Redux/authReducer";
import Rating from "@mui/material/Rating";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DateRangePicker from "@mui/lab/DateRangePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TextField from "@mui/material/TextField";

function DetailHotel() {
  const reservation = useSelector((state) => state.hotel);
  const Hotel = useSelector((state) => state.hotel.hotel);
  const rooms = useSelector((state) => state.hotel.rooms);
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const [image, setimage] = useState("");
  const [nbRoomSingle, setnbRoomSingle] = useState(0);
  const [nbRoomDouble, setnbRoomDouble] = useState(0);
  const [nbRoomTriple, setnbRoomTriple] = useState(0);
  const [nbRoomQuadruple, setnbRoomQuadruple] = useState(0);
  let { id } = useParams();
  const history = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getAuth());
    dispatch(getHotel(id));
    dispatch(navbarActions.updatenavbar(false));
  }, [dispatch, id]);

  const changeDate = (value) => {
    dispatch(hotelActions.getPeriode(value));
    dispatch(hotelActions.totalSingle());
    dispatch(hotelActions.totalDouble());
    dispatch(hotelActions.totalTriple());
    dispatch(hotelActions.totalQuadruple());
    dispatch(hotelActions.getTotal());
  };

  const changeNbsingleRooms = (e) => {
    setnbRoomSingle(parseInt(e.target.value));
    dispatch(hotelActions.manageSingleRooms(parseInt(e.target.value)));
    dispatch(hotelActions.totalSingle());
    dispatch(hotelActions.getTotal());
  };

  const changeNbDoubleRooms = (e) => {
    setnbRoomDouble(parseInt(e.target.value));
    dispatch(hotelActions.manageDoubleRooms(parseInt(e.target.value)));
    dispatch(hotelActions.totalDouble());
    dispatch(hotelActions.getTotal());
  };

  const changeNbTripleRooms = (e) => {
    setnbRoomTriple(parseInt(e.target.value));
    dispatch(hotelActions.manageTripleRooms(parseInt(e.target.value)));
    dispatch(hotelActions.totalTriple());
    dispatch(hotelActions.getTotal());
  };

  const changeNbQuadrupleRooms = (e) => {
    setnbRoomQuadruple(parseInt(e.target.value));
    dispatch(hotelActions.manageQuadrupleRooms(parseInt(e.target.value)));
    dispatch(hotelActions.totalQuadruple());
    dispatch(hotelActions.getTotal());
  };

  const ChangeSingleRooms = (e, i) => {
    dispatch(
      hotelActions.changeSingleRooms({
        index: i,
        type: e.target.name,
        value: e.target.value,
      })
    );
    dispatch(hotelActions.totalSingle());
    dispatch(hotelActions.getTotal());
  };

  const ChangeDoubleRooms = (e, i) => {
    dispatch(
      hotelActions.changeDoubleRooms({
        index: i,
        type: e.target.name,
        value: e.target.value,
      })
    );
    dispatch(hotelActions.totalDouble());
    dispatch(hotelActions.getTotal());
  };

  const ChangeTripleRooms = (e, i) => {
    dispatch(
      hotelActions.changeTripleRooms({
        index: i,
        type: e.target.name,
        value: e.target.value,
      })
    );
    dispatch(hotelActions.totalTriple());
    dispatch(hotelActions.getTotal());
  };

  const ChangeQuadrupleRooms = (e, i) => {
    dispatch(
      hotelActions.changeQuadrupleRooms({
        index: i,
        type: e.target.name,
        value: e.target.value,
      })
    );
    dispatch(hotelActions.totalQuadruple());
    dispatch(hotelActions.getTotal());
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }

  today = mm + "-" + dd + "-" + yyyy;

  const submitHandler = (event) => {
    event.preventDefault();

    var ok = true;

    if (
      reservation.periode[0].getDate() === reservation.periode[1].getDate() &&
      reservation.periode[0].getMonth() === reservation.periode[1].getMonth() &&
      reservation.periode[0].getFullYear() ===
        reservation.periode[1].getFullYear() &&
      ok === true
    ) {
      alert("choosing checkin/checkout is required !!");
      ok = false;
    }

    if (rooms.total === 0 && ok === true) {
      alert("PLease choose date and rooms of reservation !!");
      ok = false;
    }

    if (rooms.single.room.length !== 0 && ok === true) {
      rooms.single.room.forEach((element) => {
        if (element.total === 0) {
          alert(
            "Choosing periode and all pensions is required to continue 1 !!",
            element
          );
          ok = false;
        }
      });
    }

    if (rooms.double.room.length !== 0 && ok === true) {
      rooms.double.room.forEach((element) => {
        if (element.total === 0) {
          alert(
            "Choosing periode and all pensions is required to continue 2 !!",
            element
          );
          ok = false;
        }
      });
    }

    if (rooms.triple.room.length !== 0 && ok === true) {
      rooms.triple.room.forEach((element) => {
        if (element.total === 0) {
          alert(
            "Choosing periode and all pensions is required to continue 2 !!",
            element
          );
          ok = false;
        }
      });
    }

    if (rooms.quadruple.room.length !== 0 && ok === true) {
      rooms.quadruple.room.forEach((element) => {
        if (element.total === 0) {
          alert(
            "Choosing periode and all pensions is required to continue 2 !!",
            element
          );
          ok = false;
        }
      });
    }

    if (ok === true) {
      history("/Hotel/Reserve");
    }
  };

  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <div className="row">
        <h1>
          {" "}
          {Hotel.name} <Rating name="read-only" value={Hotel.rating} readOnly />{" "}
        </h1>
      </div>
      <div className="row">
        <div className="col-12">
          <Box
            sx={{ width: "100%", height: 400, overflowY: "scroll" }}
            align="center"
          >
            <ImageList variant="masonry" cols={3} gap={8}>
              {Hotel.images.map((item, i) => (
                <div key={i}>
                  <ImageListItem>
                    <img
                      src={`${item.url}?w=248&fit=crop&auto=format`}
                      srcSet={`${item.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                      alt=""
                      loading="lazy"
                      onClick={() => {
                        handleClickOpen();
                        setimage(item.url);
                      }}
                    />
                    <Dialog open={open} onClose={handleClose}>
                      <DialogContent>
                        <img src={image} alt="" width="100%" />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>close</Button>
                      </DialogActions>
                    </Dialog>
                  </ImageListItem>
                </div>
              ))}
            </ImageList>
          </Box>
        </div>
      </div>
      <div className="row">
        <div className="col-12" style={{ textAlign: "left" }}>
          <h3 style={{ textDecoration: "underline" }}>Description</h3>
          <br />
          <p>{Hotel.description}</p>
        </div>
      </div>
      <div className="row">
        <h3 style={{ textDecoration: "underline", textAlign: "left" }}>
          Options
        </h3>
        <br /> <br />
        {Hotel.options.wifi ? (
          <div className="col-lg-3 col-sm-4">
            <h6 align="left">
              {" "}
              * Free wifi &nbsp;
              <img
                src="https://img.icons8.com/external-xnimrodx-lineal-xnimrodx/30/000000/external-wifi-accommodation-and-hotel-xnimrodx-lineal-xnimrodx.png"
                alt=""
              />
            </h6>
          </div>
        ) : (
          ""
        )}
        {Hotel.options.pool ? (
          <div className="col-lg-3 col-sm-4">
            <h6 align="left">
              * Pool &nbsp;
              <img
                src="https://img.icons8.com/external-xnimrodx-lineal-xnimrodx/30/000000/external-pool-fitness-and-gym-xnimrodx-lineal-xnimrodx.png"
                alt=""
              />
            </h6>
          </div>
        ) : (
          ""
        )}
        {Hotel.options.restaurant ? (
          <div className="col-lg-3 col-sm-4">
            <h6 align="left">
              {" "}
              * Restaurant &nbsp;
              <img
                src="https://img.icons8.com/external-xnimrodx-lineal-xnimrodx/30/000000/external-restaurant-hotel-xnimrodx-lineal-xnimrodx.png"
                alt=""
              />
            </h6>
          </div>
        ) : (
          ""
        )}
        {Hotel.options.parking ? (
          <div className="col-lg-3 col-sm-4">
            <h6 align="left">
              {" "}
              * Parking &nbsp;
              <img
                src="https://img.icons8.com/external-xnimrodx-lineal-xnimrodx/30/000000/external-parking-gas-station-xnimrodx-lineal-xnimrodx.png"
                alt=""
              />
            </h6>
          </div>
        ) : (
          ""
        )}
        {Hotel.options.bar ? (
          <div className="col-lg-3 col-sm-4">
            <h6 align="left">
              {" "}
              * Bar &nbsp;
              <img
                src="https://img.icons8.com/external-xnimrodx-lineal-xnimrodx/30/000000/external-bar-beer-xnimrodx-lineal-xnimrodx.png"
                alt=""
              />
            </h6>
          </div>
        ) : (
          ""
        )}
        {Hotel.options.indoorpool ? (
          <div className="col-lg-3 col-sm-4">
            <h6 align="left">
              {" "}
              * Indoorpool &nbsp;
              <img
                src="https://img.icons8.com/external-kiranshastry-solid-kiranshastry/30/000000/external-swimming-pool-interface-kiranshastry-solid-kiranshastry.png"
                alt=""
              />
            </h6>
          </div>
        ) : (
          ""
        )}
        {Hotel.options.spa ? (
          <div className="col-lg-3 col-sm-4">
            <h6 align="left">
              {" "}
              * Beauty & Spa &nbsp;
              <img
                src="https://img.icons8.com/external-icongeek26-outline-icongeek26/30/000000/external-spa-ayurveda-icongeek26-outline-icongeek26.png"
                alt=""
              />
            </h6>
          </div>
        ) : (
          ""
        )}{" "}
        {Hotel.options.elevator ? (
          <div className="col-lg-3 col-sm-4">
            <h6 align="left">
              {" "}
              * Elevator &nbsp;
              <img
                src="https://img.icons8.com/external-xnimrodx-lineal-xnimrodx/30/000000/external-elevator-shopping-mall-xnimrodx-lineal-xnimrodx.png"
                alt=""
              />
            </h6>
          </div>
        ) : (
          ""
        )}
      </div>
      <br />
      <form onSubmit={submitHandler}>
        <div className="row">
          <h3 style={{ textDecoration: "underline", textAlign: "left" }}>
            Availablity
          </h3>
          <br />
        </div>
        <br />
        <div className="row">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateRangePicker
              startText="Check-in"
              endText="Check-out"
              value={reservation.periode}
              minDate={new Date(today)}
              required
              onChange={(newValue) => {
                changeDate(newValue);
              }}
              renderInput={(startProps, endProps) => (
                <React.Fragment>
                  <TextField {...startProps} fullWidth />
                  <Box sx={{ mx: 2 }}> to </Box>
                  <TextField {...endProps} fullWidth />
                </React.Fragment>
              )}
            />
          </LocalizationProvider>
        </div>
        <br />
        <div className="row">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="spanning table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Room's Detail</TableCell>
                  <TableCell align="center">Occupation</TableCell>
                  <TableCell align="center">Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Hotel.price.single ? (
                  <TableRow>
                    <TableCell align="center">
                      <div className="row">
                        <div
                          className="col-4"
                          style={{
                            marginTop: "auto",
                            marginBottom: "auto",
                            marginLeft: "auto",
                            marginRight: "auto",
                          }}
                        >
                          <FormControl>
                            <Select
                              value={nbRoomSingle}
                              name="nbRoomSingle"
                              defaultValue={0}
                              onChange={changeNbsingleRooms}
                              inputProps={{ "aria-label": "Without label" }}
                            >
                              <MenuItem value={0}>
                                <em>0</em>
                              </MenuItem>
                              <MenuItem value={1}>1</MenuItem>
                              <MenuItem value={2}>2</MenuItem>
                              <MenuItem value={3}>3</MenuItem>
                            </Select>
                          </FormControl>
                          {nbRoomSingle !== 0 ? <h4>single room</h4> : ""}
                        </div>
                        <div
                          className="col-8"
                          style={{
                            marginTop: "auto",
                            marginBottom: "auto",
                          }}
                        >
                          {nbRoomSingle === 0 ? (
                            <h4>single room</h4>
                          ) : (
                            <div>
                              {rooms.single.room.map((room, i) => {
                                return (
                                  <div key={i}>
                                    <div className="row">
                                      <div
                                        className="col-lg-4 col-sm-12"
                                        style={{
                                          marginTop: "30px",
                                          marginBottom: "auto",
                                        }}
                                      >
                                        <h6>chambre {i + 1} </h6>
                                      </div>
                                      <div className="col-8">
                                        <div className="row ">
                                          <div
                                            className="col-lg-4 col-sm-12"
                                            style={{
                                              marginTop: "20px",
                                            }}
                                          >
                                            <FormControl fullWidth>
                                              <InputLabel id="adultes">
                                                adultes
                                              </InputLabel>
                                              <Select
                                                labelId="adultes"
                                                name="adultes"
                                                value={room.adulte}
                                                onChange={(event) => {
                                                  ChangeSingleRooms(event, i);
                                                }}
                                              >
                                                <MenuItem value={1}>1</MenuItem>
                                              </Select>
                                            </FormControl>
                                          </div>
                                          <div
                                            className="col-lg-4 col-sm-12"
                                            style={{
                                              marginTop: "20px",
                                            }}
                                          >
                                            <FormControl fullWidth>
                                              <InputLabel id="enfants">
                                                enfants
                                              </InputLabel>
                                              <Select
                                                labelId="enfants"
                                                name="enfants"
                                                value={room.enfant}
                                                onChange={(event) => {
                                                  ChangeSingleRooms(event, i);
                                                }}
                                              >
                                                <MenuItem value={0}>0</MenuItem>
                                              </Select>
                                            </FormControl>
                                          </div>
                                          <div
                                            className="col-lg-4 col-sm-12"
                                            style={{
                                              marginTop: "20px",
                                            }}
                                          >
                                            <FormControl fullWidth>
                                              <InputLabel id="pensions">
                                                Pension
                                              </InputLabel>
                                              <Select
                                                labelId="pensions"
                                                value={room.pension}
                                                name="pensions"
                                                onChange={(event) => {
                                                  ChangeSingleRooms(event, i);
                                                }}
                                              >
                                                {Hotel.price.single.lpd ? (
                                                  <MenuItem value={"lpd"}>
                                                    Breakfast
                                                  </MenuItem>
                                                ) : (
                                                  ""
                                                )}
                                                {Hotel.price.single.dp ? (
                                                  <MenuItem value={"dp"}>
                                                    Half Board
                                                  </MenuItem>
                                                ) : (
                                                  ""
                                                )}
                                                {Hotel.price.single.pc ? (
                                                  <MenuItem value={"pc"}>
                                                    Full Board
                                                  </MenuItem>
                                                ) : (
                                                  ""
                                                )}
                                                {Hotel.price.single.ai ? (
                                                  <MenuItem value={"ai"}>
                                                    All Inclusif
                                                  </MenuItem>
                                                ) : (
                                                  ""
                                                )}
                                              </Select>
                                            </FormControl>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <br />
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      <img
                        src="https://img.icons8.com/material/30/000000/guest-male--v1.png"
                        alt=""
                      />
                    </TableCell>
                    <TableCell align="center">{rooms.single.total}</TableCell>
                  </TableRow>
                ) : (
                  ""
                )}
                {Hotel.price.double ? (
                  <TableRow>
                    <TableCell align="center">
                      <div className="row">
                        <div
                          className="col-4"
                          style={{
                            marginTop: "auto",
                            marginBottom: "auto",
                          }}
                        >
                          <FormControl>
                            <Select
                              value={nbRoomDouble}
                              name="nbRoomDouble"
                              defaultValue={0}
                              onChange={changeNbDoubleRooms}
                              inputProps={{ "aria-label": "Without label" }}
                            >
                              <MenuItem value={0}>
                                <em>0</em>
                              </MenuItem>
                              <MenuItem value={1}>1</MenuItem>
                              <MenuItem value={2}>2</MenuItem>
                              <MenuItem value={3}>3</MenuItem>
                            </Select>
                          </FormControl>
                          {nbRoomDouble !== 0 ? <h4>double room</h4> : ""}
                        </div>
                        <div
                          className="col-8"
                          style={{ marginTop: "auto", marginBottom: "auto" }}
                        >
                          {nbRoomDouble === 0 ? (
                            <h4>double room</h4>
                          ) : (
                            <div>
                              {rooms.double.room.map((room, i) => {
                                return (
                                  <div key={i}>
                                    <div className="row">
                                      <div
                                        className="col-lg-4 col-sm-12"
                                        style={{
                                          marginTop: "30px",
                                          marginBottom: "auto",
                                        }}
                                      >
                                        Chambre {i + 1}
                                      </div>
                                      <div className="col-8">
                                        <div className="row ">
                                          <div
                                            className="col-lg-4 col-sm-12"
                                            style={{
                                              marginTop: "20px",
                                            }}
                                          >
                                            <FormControl fullWidth>
                                              <InputLabel id="adulted">
                                                adultes
                                              </InputLabel>
                                              <Select
                                                labelId="adulted"
                                                name="adulted"
                                                value={room.adulte}
                                                onChange={(event) => {
                                                  ChangeDoubleRooms(event, i);
                                                }}
                                              >
                                                <MenuItem value={1}>1</MenuItem>
                                                <MenuItem value={2}>2</MenuItem>
                                              </Select>
                                            </FormControl>
                                          </div>
                                          <div
                                            className="col-lg-4 col-sm-12"
                                            style={{
                                              marginTop: "20px",
                                            }}
                                          >
                                            <FormControl fullWidth>
                                              <InputLabel id="enfantd">
                                                enfants
                                              </InputLabel>
                                              <Select
                                                labelId="enfantd"
                                                name="enfantd"
                                                value={room.enfant}
                                                onChange={(event) => {
                                                  ChangeDoubleRooms(event, i);
                                                }}
                                              >
                                                <MenuItem value={0}>0</MenuItem>
                                                <MenuItem value={1}>1</MenuItem>
                                              </Select>
                                            </FormControl>
                                          </div>
                                          <div
                                            className="col-lg-4 col-sm-12"
                                            style={{
                                              marginTop: "20px",
                                            }}
                                          >
                                            <FormControl fullWidth>
                                              <InputLabel id="pensiond">
                                                Pension
                                              </InputLabel>
                                              <Select
                                                labelId="pensiond"
                                                value={room.pension}
                                                name="pensiond"
                                                onChange={(event) => {
                                                  ChangeDoubleRooms(event, i);
                                                }}
                                              >
                                                {Hotel.price.double.lpd ? (
                                                  <MenuItem value={"lpd"}>
                                                    Breakfast
                                                  </MenuItem>
                                                ) : (
                                                  ""
                                                )}
                                                {Hotel.price.double.dp ? (
                                                  <MenuItem value={"dp"}>
                                                    Half Board
                                                  </MenuItem>
                                                ) : (
                                                  ""
                                                )}
                                                {Hotel.price.double.pc ? (
                                                  <MenuItem value={"pc"}>
                                                    Full Board
                                                  </MenuItem>
                                                ) : (
                                                  ""
                                                )}
                                                {Hotel.price.double.ai ? (
                                                  <MenuItem value={"ai"}>
                                                    All Inclusif
                                                  </MenuItem>
                                                ) : (
                                                  ""
                                                )}
                                              </Select>
                                            </FormControl>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <br />
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      <img
                        src="https://img.icons8.com/material/30/000000/guest-male--v1.png"
                        alt=""
                      />
                      <img
                        src="https://img.icons8.com/material/30/000000/guest-male--v1.png"
                        alt=""
                      />
                    </TableCell>
                    <TableCell align="center">{rooms.double.total}</TableCell>
                  </TableRow>
                ) : (
                  ""
                )}
                {Hotel.price.triple ? (
                  <TableRow>
                    <TableCell align="center">
                      <div className="row">
                        <div
                          className="col-4"
                          style={{
                            marginTop: "auto",
                            marginBottom: "auto",
                            marginLeft: "auto",
                            marginRight: "auto",
                          }}
                        >
                          <FormControl>
                            <Select
                              value={nbRoomTriple}
                              name="nbRoomTriple"
                              defaultValue={0}
                              onChange={changeNbTripleRooms}
                              inputProps={{ "aria-label": "Without label" }}
                            >
                              <MenuItem value={0}>
                                <em>0</em>
                              </MenuItem>
                              <MenuItem value={1}>1</MenuItem>
                              <MenuItem value={2}>2</MenuItem>
                              <MenuItem value={3}>3</MenuItem>
                            </Select>
                          </FormControl>
                          {nbRoomTriple !== 0 ? <h4>triple room</h4> : ""}
                        </div>
                        <div
                          className="col-8"
                          style={{
                            marginTop: "auto",
                            marginBottom: "auto",
                          }}
                        >
                          {nbRoomTriple === 0 ? (
                            <h4>triple room</h4>
                          ) : (
                            <div>
                              {/* {Array.from(Array(nbRoomTriple), (e, i) => {
                              return ( */}
                              {rooms.triple.room.map((room, i) => {
                                return (
                                  <div key={i}>
                                    <div className="row">
                                      <div
                                        className="col-lg-4 col-sm-12"
                                        style={{
                                          marginTop: "30px",
                                          marginBottom: "auto",
                                        }}
                                      >
                                        <h6>chambre {i + 1}</h6>
                                      </div>
                                      <div className="col-8">
                                        <div className="row ">
                                          <div
                                            className="col-lg-4 col-sm-12"
                                            style={{
                                              marginTop: "20px",
                                            }}
                                          >
                                            <FormControl fullWidth>
                                              <InputLabel id="adultet">
                                                adultes
                                              </InputLabel>
                                              <Select
                                                labelId="adultet"
                                                name="adultet"
                                                value={room.adulte}
                                                onChange={(event) => {
                                                  ChangeTripleRooms(event, i);
                                                }}
                                              >
                                                <MenuItem value={1}>1</MenuItem>
                                                <MenuItem value={2}>2</MenuItem>
                                                <MenuItem value={3}>3</MenuItem>
                                              </Select>
                                            </FormControl>
                                          </div>
                                          <div
                                            className="col-lg-4 col-sm-12"
                                            style={{
                                              marginTop: "20px",
                                            }}
                                          >
                                            <FormControl fullWidth>
                                              <InputLabel id="enfantt">
                                                enfants
                                              </InputLabel>
                                              <Select
                                                labelId="enfantt"
                                                name="enfantt"
                                                value={room.enfant}
                                                onChange={(event) => {
                                                  ChangeTripleRooms(event, i);
                                                }}
                                              >
                                                <MenuItem value={0}>0</MenuItem>
                                                <MenuItem value={1}>1</MenuItem>
                                                <MenuItem value={2}>2</MenuItem>
                                              </Select>
                                            </FormControl>
                                          </div>
                                          <div
                                            className="col-lg-4 col-sm-12"
                                            style={{
                                              marginTop: "20px",
                                            }}
                                          >
                                            <FormControl fullWidth>
                                              <InputLabel id="pensiont">
                                                Pension
                                              </InputLabel>
                                              <Select
                                                labelId="pensiont"
                                                value={room.pension}
                                                name="pensiont"
                                                onChange={(event) => {
                                                  ChangeTripleRooms(event, i);
                                                }}
                                              >
                                                {Hotel.price.triple.lpd ? (
                                                  <MenuItem value={"lpd"}>
                                                    Breakfast
                                                  </MenuItem>
                                                ) : (
                                                  ""
                                                )}
                                                {Hotel.price.triple.dp ? (
                                                  <MenuItem value={"dp"}>
                                                    Half Board
                                                  </MenuItem>
                                                ) : (
                                                  ""
                                                )}
                                                {Hotel.price.triple.pc ? (
                                                  <MenuItem value={"pc"}>
                                                    Full Board
                                                  </MenuItem>
                                                ) : (
                                                  ""
                                                )}
                                                {Hotel.price.triple.ai ? (
                                                  <MenuItem value={"ai"}>
                                                    All Inclusif
                                                  </MenuItem>
                                                ) : (
                                                  ""
                                                )}
                                              </Select>
                                            </FormControl>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <br />
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      <img
                        src="https://img.icons8.com/material/30/000000/guest-male--v1.png"
                        alt=""
                      />
                      <img
                        src="https://img.icons8.com/material/30/000000/guest-male--v1.png"
                        alt=""
                      />
                      <img
                        src="https://img.icons8.com/material/30/000000/guest-male--v1.png"
                        alt=""
                      />
                    </TableCell>
                    <TableCell align="center">{rooms.triple.total}</TableCell>
                  </TableRow>
                ) : (
                  ""
                )}

                {Hotel.price.quadruple ? (
                  <TableRow>
                    <TableCell align="center">
                      <div className="row">
                        <div
                          className="col-4"
                          style={{
                            marginTop: "auto",
                            marginBottom: "auto",
                            marginLeft: "auto",
                            marginRight: "auto",
                          }}
                        >
                          <FormControl>
                            <Select
                              value={nbRoomQuadruple}
                              name="nbRoomQuadruple"
                              defaultValue={0}
                              onChange={changeNbQuadrupleRooms}
                              inputProps={{ "aria-label": "Without label" }}
                            >
                              <MenuItem value={0}>
                                <em>0</em>
                              </MenuItem>
                              <MenuItem value={1}>1</MenuItem>
                              <MenuItem value={2}>2</MenuItem>
                              <MenuItem value={3}>3</MenuItem>
                            </Select>
                          </FormControl>
                          {nbRoomQuadruple !== 0 ? <h4>Quadruple room</h4> : ""}
                        </div>
                        <div
                          className="col-8"
                          style={{
                            marginTop: "auto",
                            marginBottom: "auto",
                          }}
                        >
                          {nbRoomQuadruple === 0 ? (
                            <h4>Quadruple room</h4>
                          ) : (
                            <div>
                              {rooms.quadruple.room.map((room, i) => {
                                return (
                                  <div key={i}>
                                    <div className="row">
                                      <div
                                        className="col-lg-4 col-sm-12"
                                        style={{
                                          marginTop: "30px",
                                          marginBottom: "auto",
                                        }}
                                      >
                                        <h6>chambre {i + 1}</h6>
                                      </div>
                                      <div className="col-8">
                                        <div className="row ">
                                          <div
                                            className="col-lg-4 col-sm-12"
                                            style={{
                                              marginTop: "20px",
                                            }}
                                          >
                                            <FormControl fullWidth>
                                              <InputLabel id="adulteq">
                                                adultes
                                              </InputLabel>
                                              <Select
                                                labelId="adulteq"
                                                name="adulteq"
                                                value={room.adulte}
                                                onChange={(event) => {
                                                  ChangeQuadrupleRooms(
                                                    event,
                                                    i
                                                  );
                                                }}
                                              >
                                                <MenuItem value={1}>1</MenuItem>
                                                <MenuItem value={2}>2</MenuItem>
                                                <MenuItem value={3}>3</MenuItem>
                                                <MenuItem value={4}>4</MenuItem>
                                              </Select>
                                            </FormControl>
                                          </div>
                                          <div
                                            className="col-lg-4 col-sm-12"
                                            style={{
                                              marginTop: "20px",
                                            }}
                                          >
                                            <FormControl fullWidth>
                                              <InputLabel id="enfantq">
                                                enfants
                                              </InputLabel>
                                              <Select
                                                labelId="enfantq"
                                                name="enfantq"
                                                value={room.enfant}
                                                onChange={(event) => {
                                                  ChangeQuadrupleRooms(
                                                    event,
                                                    i
                                                  );
                                                }}
                                              >
                                                <MenuItem value={0}>0</MenuItem>
                                                <MenuItem value={1}>1</MenuItem>
                                                <MenuItem value={2}>2</MenuItem>
                                                <MenuItem value={3}>3</MenuItem>
                                              </Select>
                                            </FormControl>
                                          </div>
                                          <div
                                            className="col-lg-4 col-sm-12"
                                            style={{
                                              marginTop: "20px",
                                            }}
                                          >
                                            <FormControl fullWidth>
                                              <InputLabel id="pensionq">
                                                Pension
                                              </InputLabel>
                                              <Select
                                                labelId="pensionq"
                                                value={room.pension}
                                                name="pensionq"
                                                onChange={(event) => {
                                                  ChangeQuadrupleRooms(
                                                    event,
                                                    i
                                                  );
                                                }}
                                              >
                                                {Hotel.price.quadruple.lpd ? (
                                                  <MenuItem value={"lpd"}>
                                                    Breakfast
                                                  </MenuItem>
                                                ) : (
                                                  ""
                                                )}
                                                {Hotel.price.quadruple.dp ? (
                                                  <MenuItem value={"dp"}>
                                                    Half Board
                                                  </MenuItem>
                                                ) : (
                                                  ""
                                                )}
                                                {Hotel.price.quadruple.pc ? (
                                                  <MenuItem value={"pc"}>
                                                    Full Board
                                                  </MenuItem>
                                                ) : (
                                                  ""
                                                )}
                                                {Hotel.price.quadruple.ai ? (
                                                  <MenuItem value={"ai"}>
                                                    All Inclusif
                                                  </MenuItem>
                                                ) : (
                                                  ""
                                                )}
                                              </Select>
                                            </FormControl>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <br />
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      <img
                        src="https://img.icons8.com/material/30/000000/guest-male--v1.png"
                        alt=""
                      />
                      <img
                        src="https://img.icons8.com/material/30/000000/guest-male--v1.png"
                        alt=""
                      />
                      <img
                        src="https://img.icons8.com/material/30/000000/guest-male--v1.png"
                        alt=""
                      />
                      <img
                        src="https://img.icons8.com/material/30/000000/guest-male--v1.png"
                        alt=""
                      />
                    </TableCell>
                    <TableCell align="center">
                      {rooms.quadruple.total}
                    </TableCell>
                  </TableRow>
                ) : (
                  ""
                )}
                <TableRow>
                  {reservation.hotel.promo !== 0 ? (
                    <TableCell align="right">
                      - {reservation.hotel.promo} %
                    </TableCell>
                  ) : (
                    ""
                  )}
                  <TableCell align="right">Total</TableCell>
                  <TableCell align="center">{rooms.total} DT</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <br /> <br />
        {auth.isAuth ? (
          <div className="Search__actions">
            <button type="submit">Book Now </button>
          </div>
        ) : (
          <Link to="/SignIn?path=reservehotel">
            <div className="Search__actions">
              <button type="submit">Book Now </button>
            </div>
          </Link>
        )}
      </form>
    </div>
  );
}
export default DetailHotel;
