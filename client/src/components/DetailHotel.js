import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
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
import IconButton from "@mui/material/IconButton";

function DetailHotel() {
  const [hotel, setHotel] = useState([]);
  const [rate, setrate] = useState([]);
  const [options, setoptions] = useState({});
  const [price, setprice] = useState({});
  const [images, setImages] = useState([]);
  const [image, setimage] = useState("");
  const [single, setSingle] = useState("");
  const [double, setDouble] = useState("");
  const [triple, setTriple] = useState("");
  const [nbRoomSingle, setnbRoomSingle] = useState(0);
  const [PriceSingle, setPriceSingle] = useState(0);
  const [Singlerooms, setSinglerooms] = useState([]);
  const [nbRoomDouble, setnbRoomDouble] = useState(0);
  const [PriceDouble, setPriceDouble] = useState(0);
  const [Doublerooms, setDoublerooms] = useState([]);
  const [nbRoomTriple, setnbRoomTriple] = useState(0);
  const [PriceTriple, setPriceTriple] = useState(0);
  const [Triplerooms, setTriplerooms] = useState([]);
  let { id } = useParams();
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/hotel/" + id)
      .then((res) => {
        setHotel(res.data);
        let r = [];
        for (let index = 0; index < res.data.rating; index++) {
          r.push("star");
        }
        setrate(r);
        setoptions(res.data.options);
        setprice(res.data.price);
        setImages(res.data.images);
      })
      .catch((err) => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeNbsingleRooms = (e) => {
    setnbRoomSingle(parseInt(e.target.value));
    let chambres = new Array(parseInt(e.target.value));
    for (let index = 0; index < parseInt(e.target.value); index++) {
      if (Singlerooms[index]) {
        chambres[index] = Singlerooms[index];
      } else {
        const element = index.toString();
        const ch = {
          adulte: 1,
          enfant: 0,
          pension: Object.keys(price.single)[0],
        };
        chambres[element] = ch;
      }
    }
    setSinglerooms(chambres);
  };

  const changeNbDoubleRooms = (e) => {
    setnbRoomDouble(parseInt(e.target.value));
    let chambres = new Array(parseInt(e.target.value));
    for (let index = 0; index < parseInt(e.target.value); index++) {
      if (Doublerooms[index]) {
        chambres[index] = Doublerooms[index];
      } else {
        const element = index.toString();
        const ch = {
          adulte: 1,
          enfant: 0,
          pension: Object.keys(price.double)[0],
        };
        chambres[element] = ch;
      }
    }
    setDoublerooms(chambres);
  };

  const changeNbTripleRooms = (e) => {
    setnbRoomTriple(parseInt(e.target.value));
    let chambres = new Array(parseInt(e.target.value));
    for (let index = 0; index < parseInt(e.target.value); index++) {
      if (Triplerooms[index]) {
        chambres[index] = Triplerooms[index];
      } else {
        const element = index.toString();
        const ch = {
          adulte: 1,
          enfant: 0,
          pension: Object.keys(price.triple)[0],
        };
        chambres[element] = ch;
      }
    }
    setTriplerooms(chambres);
  };

  const ChangeSingleRooms = (e, i) => {
    if (e.target.name === "adultes") {
      Singlerooms[i].adulte = parseInt(e.target.value);
    }
    if (e.target.name === "enfants") {
      Singlerooms[i].enfant = parseInt(e.target.value);
    }
    if (e.target.name === "pensions") {
      Singlerooms[i].pension = e.target.value;
    }
    setSinglerooms(Singlerooms);
  };

  const ChangeDoubleRooms = (e, i) => {
    if (e.target.name === "adulted") {
      Doublerooms[i].adulte = parseInt(e.target.value);
    }
    if (e.target.name === "enfantd") {
      Doublerooms[i].enfant = parseInt(e.target.value);
    }
    if (e.target.name === "pensiond") {
      Doublerooms[i].pension = e.target.value;
    }
    setDoublerooms(Doublerooms);
  };

  const ChangeTripleRooms = (e, i) => {
    if (e.target.name === "adultet") {
      Triplerooms[i].adulte = parseInt(e.target.value);
    }
    if (e.target.name === "enfantt") {
      Triplerooms[i].enfant = parseInt(e.target.value);
    }
    if (e.target.name === "pensiont") {
      Triplerooms[i].pension = e.target.value;
    }
    setTriplerooms(Triplerooms);
  };

  const totalSignle = () => {
    let t = 0;
    for (let index = 0; index < Singlerooms.length; index++) {
      const element = Singlerooms[index];
      const pension = element.pension;
      t =
        t +
        element.adulte * price.single[pension] +
        price.kids * element.enfant;
    }
    return t;
  };

  const totalDouble = () => {
    let t = 0;
    for (let index = 0; index < Doublerooms.length; index++) {
      const element = Doublerooms[index];
      const pension = element.pension;
      t =
        t +
        element.adulte * price.double[pension] +
        price.kids * element.enfant;
    }
    return t;
  };

  const totalTriple = () => {
    let t = 0;
    for (let index = 0; index < Triplerooms.length; index++) {
      const element = Triplerooms[index];
      const pension = element.pension;
      t =
        t +
        element.adulte * price.triple[pension] +
        price.kids * element.enfant;
    }
    return t;
  };
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <br />
      <br />
      <div className="row">
        <h1> {hotel.name}</h1>
        <h3>
          {rate.map((r) => (
            <img
              src="https://img.icons8.com/fluency/20/000000/star.png"
              alt=""
            />
          ))}
        </h3>
      </div>
      <div className="row">
        <div className="col-2"></div>
        <div className="col-4">
          <Box
            sx={{ width: 1000, height: 700, overflowY: "scroll" }}
            align="center"
          >
            <ImageList variant="masonry" cols={3} gap={8}>
              {images.map((item) => (
                <ImageListItem key={item.url}>
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
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    // aria-labelledby="alert-dialog-title"
                    // aria-describedby="alert-dialog-description"
                  >
                    {/* <DialogTitle id="alert-dialog-title">
                          {"Use Google's location service?"}
                        </DialogTitle> */}
                    <DialogContent>
                      <img src={image} alt="" width="100%" />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>close</Button>
                    </DialogActions>
                  </Dialog>
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
        </div>
      </div>
      <div className="row">
        <h3 aligntext="right">Description</h3>
        <p>{hotel.description}</p>
      </div>
      <div className="row">
        <h3>Options</h3>
        <br />
        {options.wifi ? (
          <div className="col-3">
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
        {options.pool ? (
          <div className="col-3">
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
        {options.restaurant ? (
          <div className="col-3">
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
        {options.parking ? (
          <div className="col-3">
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
        {options.bar ? (
          <div className="col-3">
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
        {options.indoorpool ? (
          <div className="col-3">
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
        {options.spa ? (
          <div className="col-3">
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
        {options.elevator ? (
          <div className="col-3">
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
      <div className="row">
        <h3 aligntext="right">Availablity</h3>
        <br />
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
              {price.single ? (
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
                            {/* {Array.from(Array(nbRoomSingle), (e, i) => {
                              return ( */}
                            {Singlerooms.map((room, i) => {
                              return (
                                <div key={i}>
                                  <div className="row">
                                    <div
                                      className="col-4"
                                      style={{
                                        marginTop: "auto",
                                        marginBottom: "auto",
                                      }}
                                    >
                                      <h6>chambre {i + 1} </h6>
                                    </div>
                                    <div className="col-8">
                                      <div className="row ">
                                        <div className="col-4">
                                          <FormControl fullWidth>
                                            <InputLabel id="adultes">
                                              adultes
                                            </InputLabel>
                                            <Select
                                              labelId="adultes"
                                              name="adultes"
                                              defaultValue={1}
                                              onChange={(event) => {
                                                ChangeSingleRooms(event, i);
                                              }}
                                            >
                                              <MenuItem value={1}>1</MenuItem>
                                            </Select>
                                          </FormControl>
                                        </div>
                                        <div className="col-4">
                                          <FormControl fullWidth>
                                            <InputLabel id="enfants">
                                              enfants
                                            </InputLabel>
                                            <Select
                                              labelId="enfants"
                                              name="enfants"
                                              defaultValue={0}
                                              onChange={(event) => {
                                                ChangeSingleRooms(event, i);
                                              }}
                                            >
                                              <MenuItem value={0}>0</MenuItem>
                                            </Select>
                                          </FormControl>
                                        </div>
                                        <div className="col-4">
                                          <FormControl fullWidth>
                                            <InputLabel id="pensions">
                                              Pension
                                            </InputLabel>
                                            <Select
                                              labelId="pensions"
                                              defaultValue={room["pension"]}
                                              value={room["pension"]}
                                              name="pensions"
                                              onChange={(event) => {
                                                ChangeSingleRooms(event, i);
                                              }}
                                            >
                                              {price.single.lp ? (
                                                <MenuItem value={"lp"}>
                                                  lp
                                                </MenuItem>
                                              ) : (
                                                ""
                                              )}
                                              {price.single.dp ? (
                                                <MenuItem value={"dp"}>
                                                  dp
                                                </MenuItem>
                                              ) : (
                                                ""
                                              )}
                                              {price.single.pc ? (
                                                <MenuItem value={"pc"}>
                                                  pc
                                                </MenuItem>
                                              ) : (
                                                ""
                                              )}
                                              {price.single.ai ? (
                                                <MenuItem value={"ai"}>
                                                  ai
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
                  <TableCell align="center">{totalSignle()}</TableCell>
                </TableRow>
              ) : (
                ""
              )}
              {price.double ? (
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
                            {/* {Array.from(Array(nbRoomDouble), (e, i) => {
                              return ( */}
                            {Doublerooms.map((room, i) => {
                              return (
                                <div>
                                  <div className="row" key={i}>
                                    <div
                                      className="col-4"
                                      style={{
                                        marginTop: "auto",
                                        marginBottom: "auto",
                                      }}
                                    >
                                      Chambre {i + 1}
                                    </div>
                                    <div className="col-8">
                                      <div className="row ">
                                        <div className="col-4">
                                          <FormControl fullWidth>
                                            <InputLabel id="adulted">
                                              adultes
                                            </InputLabel>
                                            <Select
                                              labelId="adulted"
                                              name="adulted"
                                              defaultValue={2}
                                              onChange={(event) => {
                                                ChangeDoubleRooms(event, i);
                                              }}
                                            >
                                              <MenuItem value={1}>1</MenuItem>
                                              <MenuItem value={2}>2</MenuItem>
                                            </Select>
                                          </FormControl>
                                        </div>
                                        <div className="col-4">
                                          <FormControl fullWidth>
                                            <InputLabel id="enfantd">
                                              enfants
                                            </InputLabel>
                                            <Select
                                              labelId="enfantd"
                                              name="enfantd"
                                              defaultValue={0}
                                              onChange={(event, i) => {
                                                ChangeDoubleRooms(event, i);
                                              }}
                                            >
                                              <MenuItem value={0}>0</MenuItem>
                                              <MenuItem value={1}>1</MenuItem>
                                            </Select>
                                          </FormControl>
                                        </div>
                                        <div className="col-4">
                                          <FormControl fullWidth>
                                            <InputLabel id="pensiond">
                                              Pension
                                            </InputLabel>
                                            <Select
                                              labelId="pensiond"
                                              defaultValue={room["pension"]}
                                              value={room["pension"]}
                                              name="pensiond"
                                              onChange={(event) => {
                                                ChangeDoubleRooms(event, i);
                                              }}
                                            >
                                              {price.double.lp ? (
                                                <MenuItem value={"lp"}>
                                                  lp
                                                </MenuItem>
                                              ) : (
                                                ""
                                              )}
                                              {price.double.dp ? (
                                                <MenuItem value={"dp"}>
                                                  dp
                                                </MenuItem>
                                              ) : (
                                                ""
                                              )}
                                              {price.double.pc ? (
                                                <MenuItem value={"pc"}>
                                                  pc
                                                </MenuItem>
                                              ) : (
                                                ""
                                              )}
                                              {price.double.ai ? (
                                                <MenuItem value={"ai"}>
                                                  ai
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
                  <TableCell align="center">{totalDouble()}</TableCell>
                </TableRow>
              ) : (
                ""
              )}
              {price.triple ? (
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
                            {Triplerooms.map((room, i) => {
                              return (
                                <div key={i}>
                                  <div className="row">
                                    <div
                                      className="col-4"
                                      style={{
                                        marginTop: "auto",
                                        marginBottom: "auto",
                                      }}
                                    >
                                      <h6>chambre {i + 1}</h6>
                                    </div>
                                    <div className="col-8">
                                      <div className="row ">
                                        <div className="col-4">
                                          <FormControl fullWidth>
                                            <InputLabel id="adultet">
                                              adultes
                                            </InputLabel>
                                            <Select
                                              labelId="adultet"
                                              name="adultet"
                                              defaultValue={3}
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
                                        <div className="col-4">
                                          <FormControl fullWidth>
                                            <InputLabel id="enfantt">
                                              enfants
                                            </InputLabel>
                                            <Select
                                              labelId="enfantt"
                                              name="enfantt"
                                              defaultValue={0}
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
                                        <div className="col-4">
                                          <FormControl fullWidth>
                                            <InputLabel id="pensiont">
                                              Pension
                                            </InputLabel>
                                            <Select
                                              labelId="pensiont"
                                              value={room["pension"]}
                                              name="pensiont"
                                              onChange={(event) => {
                                                ChangeTripleRooms(event, i);
                                              }}
                                            >
                                              {price.triple.lp ? (
                                                <MenuItem value={"lp"}>
                                                  lp
                                                </MenuItem>
                                              ) : (
                                                ""
                                              )}
                                              {price.triple.dp ? (
                                                <MenuItem value={"dp"}>
                                                  dp
                                                </MenuItem>
                                              ) : (
                                                ""
                                              )}
                                              {price.triple.pc ? (
                                                <MenuItem value={"pc"}>
                                                  pc
                                                </MenuItem>
                                              ) : (
                                                ""
                                              )}
                                              {price.triple.ai ? (
                                                <MenuItem value={"ai"}>
                                                  ai
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
                  <TableCell align="center">{totalTriple()}</TableCell>
                </TableRow>
              ) : (
                ""
              )}
              <TableRow>
                <TableCell rowSpan={3} />
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <IconButton>
        <img
          src="https://img.icons8.com/plasticine/100/000000/arrow.png"
          alt=""
          align="right"
        />
      </IconButton>
    </div>
  );
}
export default DetailHotel;
