import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getHotel, hotelActions } from "../Redux/hotelReducer";
import { Locations } from "../locations";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Rating from "@mui/material/Rating";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";

function UpdateHotel() {
  const hotel = useSelector((state) => state.hotel);
  const dispatch = useDispatch();
  const history = useNavigate();
  let { id } = useParams();
  const [images, setimages] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    dispatch(getHotel(id));
  }, [dispatch, id]);

  const updateHotel = (e) => {
    dispatch(
      hotelActions.updatehotel({
        type: e.target.name,
        value: e.target.value,
      })
    );
  };

  const updateOptions = (e) => {
    dispatch(
      hotelActions.updateoptions({
        type: e.target.name,
        value: e.target.checked,
      })
    );
  };

  const updateStatus = (e) => {
    dispatch(
      hotelActions.updatestatus({
        type: e.target.name,
        value: e.target.checked,
      })
    );
  };

  const updatePrice = (e) => {
    dispatch(
      hotelActions.updateprice({
        type: e.target.name,
        value: e.target.value,
      })
    );
  };
  const updateRooms = (e) => {
    dispatch(
      hotelActions.updaterooms({
        type: e.target.name,
        value: e.target.value,
      })
    );
  };

  const onsubmitform = (e) => {
    const data = new FormData();
    data.append("name", hotel.name);
    data.append("location", hotel.location);
    data.append("rating", hotel.rating);
    data.append("description", hotel.description);
    const price = {};

    if (hotel.status.single) {
      let single = {};
      if (hotel.status.singlelpd && hotel.price.single.lpd !== 0) {
        single.lpd = hotel.price.single.lpd;
      }
      if (hotel.status.singledp && hotel.price.single.dp !== 0) {
        single.dp = hotel.price.single.dp;
      }
      if (hotel.status.singlepc && hotel.price.single.pc !== 0) {
        single.pc = hotel.price.single.pc;
      }
      if (hotel.status.singleai && hotel.price.single.ai !== 0) {
        single.ai = hotel.price.single.ai;
      }
      if (Object.keys(single).length !== 0) {
        price.single = single;
      }
    }

    if (hotel.status.double) {
      let double = {};
      if (hotel.status.doublelpd && hotel.price.double.lpd !== 0) {
        double.lpd = hotel.price.double.lpd;
      }
      if (hotel.status.doubledp && hotel.price.double.dp !== 0) {
        double.dp = hotel.price.double.dp;
      }
      if (hotel.status.doublepc && hotel.price.double.pc !== 0) {
        double.pc = hotel.price.double.pc;
      }
      if (hotel.status.doubleai && hotel.price.double.ai !== 0) {
        double.ai = hotel.price.double.ai;
      }
      if (Object.keys(double).length !== 0) {
        price.double = double;
      }
    }

    if (hotel.status.triple) {
      let triple = {};
      if (hotel.status.triplelpd && hotel.price.triple.lpd !== 0) {
        triple.lpd = hotel.price.triple.lpd;
      }
      if (hotel.status.tripledp && hotel.price.triple.dp !== 0) {
        triple.dp = hotel.price.triple.dp;
      }
      if (hotel.status.triplepc && hotel.price.triple.pc !== 0) {
        triple.pc = hotel.price.triple.pc;
      }
      if (hotel.status.tripleai && hotel.price.triple.ai !== 0) {
        triple.ai = hotel.price.triple.ai;
      }
      if (Object.keys(triple).length !== 0) {
        price.triple = triple;
      }
    }

    if (hotel.status.triple) {
      let quadruple = {};
      if (hotel.status.triplelpd && hotel.price.quadruple.lpd !== 0) {
        quadruple.lpd = hotel.price.quadruple.lpd;
      }
      if (hotel.status.tripledp && hotel.price.quadruple.dp !== 0) {
        quadruple.dp = hotel.price.quadruple.dp;
      }
      if (hotel.status.triplepc && hotel.price.quadruple.pc !== 0) {
        quadruple.pc = hotel.price.quadruple.pc;
      }
      if (hotel.status.tripleai && hotel.price.quadruple.ai !== 0) {
        quadruple.ai = hotel.price.quadruple.ai;
      }
      if (Object.keys(quadruple).length !== 0) {
        price.quadruple = quadruple;
      }
    }

    if (hotel.status.enfant) {
      price.kids = hotel.price.kids;
    }
    let rooms = {};
    if (hotel.status.singleroooms) {
      rooms.single = hotel.rooms.single;
    }
    if (hotel.status.doublerooms) {
      rooms.double = hotel.rooms.double;
    }
    if (hotel.status.triplerooms) {
      rooms.triple = hotel.rooms.triple;
    }
    if (hotel.status.quadruplerooms) {
      rooms.quadruple = hotel.rooms.quadruple;
    }
    data.append("rooms", JSON.stringify(rooms));
    data.append("price", JSON.stringify(price));
    for (let index = 0; index < images.length; index++) {
      const element = images[index];
      data.append("images", element);
    }
    data.append("images", JSON.stringify(hotel.images));
    data.append("promo", parseInt(hotel.promo));
    let options = {
      parking: hotel.options.parking,
      wifi: hotel.options.wifi,
      elevator: hotel.options.elevator,
      restaurant: hotel.options.restaurant,
      bar: hotel.options.bar,
      pool: hotel.options.pool,
      indoorpool: hotel.options.indoorpool,
      spa: hotel.options.spa,
    };
    data.append("options", JSON.stringify(options));
    axios
      .put("http://localhost:8000/api/hotel/update/" + id, data)
      .then((res) => {
        console.log(res);
        setLoading(false);
        history("/");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div
      className="container"
      style={{ marginTop: "50px", marginBottom: "50px" }}
    >
      <br />
      <h1>Update hotel</h1>
      <br />
      <form onSubmit={onsubmitform}>
        <div className="row">
          <div className="col-5">
            <TextField
              name="name"
              label="Name"
              variant="outlined"
              value={hotel.name}
              onChange={updateHotel}
              fullWidth
            />
          </div>
          <div className="col-2">
            <Typography component="legend">Rating</Typography>
            <Rating name="rating" value={hotel.rating} onChange={updateHotel} />
          </div>
          <div className="col-5">
            <Autocomplete
              name="location"
              options={Locations}
              value={hotel.location}
              onChange={updateHotel}
              sx={{ width: "auto" }}
              renderInput={(params) => (
                <TextField {...params} label="Location" fullWidth />
              )}
            />
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-12">
            <TextField
              name="description"
              label="Description"
              variant="outlined"
              multiline
              rows={3}
              style={{ width: "100%" }}
              value={hotel.description}
              onChange={updateHotel}
            />
          </div>
        </div>
        <br />
        {/*Single*/}
        <div className="row">
          <div className="col-4" align="left">
            <FormControlLabel
              value="end"
              control={
                <Switch
                  name="single"
                  color="primary"
                  checked={hotel.status.single}
                  onChange={updateStatus}
                />
              }
              label="Single"
              labelPlacement="end"
            />
          </div>
          <div className="col-8">
            {hotel.status.single ? (
              <div className="row">
                {/* petit déj*/}
                <div className="col-1">
                  <Checkbox
                    name="singlelpd"
                    checked={hotel.status.singlelpd}
                    onChange={updateStatus}
                  />
                </div>
                <div className="col-2">
                  <TextField
                    name="Singlelpd"
                    label="Logement petit dejeuner"
                    variant="outlined"
                    type="number"
                    disabled={!hotel.status.singlelpd}
                    fullWidth
                    value={hotel.price.single.lpd}
                    onChange={updatePrice}
                  />
                </div>
                {/* demi pension */}
                <div className="col-1">
                  <Checkbox
                    name="singledp"
                    checked={hotel.status.singledp}
                    onChange={updateStatus}
                  />
                </div>
                <div className="col-2">
                  <TextField
                    name="Singledp"
                    label="Demi pension"
                    variant="outlined"
                    type="number"
                    disabled={!hotel.status.singledp}
                    fullWidth
                    value={hotel.price.single.dp}
                    onChange={updatePrice}
                  />
                </div>
                {/* pension complete */}
                <div className="col-1">
                  <Checkbox
                    name="singlepc"
                    checked={hotel.status.singlepc}
                    onChange={updateStatus}
                  />
                </div>
                <div className="col-2">
                  <TextField
                    name="Singlepc"
                    label="Pension Complete"
                    type="number"
                    variant="outlined"
                    fullWidth
                    disabled={!hotel.status.singlepc}
                    value={hotel.price.single.pc}
                    onChange={updatePrice}
                  />
                </div>
                {/* all incl */}
                <div className="col-1">
                  <Checkbox
                    name="singleai"
                    checked={hotel.status.singleai}
                    onChange={updateStatus}
                  />
                </div>
                <div className="col-2">
                  <TextField
                    name="Singleai"
                    label="All inclusif"
                    type="number"
                    variant="outlined"
                    fullWidth
                    disabled={!hotel.status.singleai}
                    value={hotel.price.single.ai}
                    onChange={updatePrice}
                  />
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <br />
        {/* double */}
        <div className="row">
          <div className="col-4" align="left">
            <FormControlLabel
              value="end"
              control={
                <Switch
                  name="double"
                  color="primary"
                  checked={hotel.status.double}
                  onChange={updateStatus}
                />
              }
              label="Double"
              labelPlacement="end"
            />
          </div>
          <div className="col-8">
            {hotel.status.double ? (
              <div className="row">
                {" "}
                {/* petit déj*/}
                <div className="col-1">
                  <Checkbox
                    name="doublelpd"
                    checked={hotel.status.doublelpd}
                    onChange={updateStatus}
                  />
                </div>
                <div className="col-2">
                  <TextField
                    name="Doublelpd"
                    label="Logement petit dejeuner"
                    variant="outlined"
                    type="number"
                    disabled={!hotel.status.doublelpd}
                    fullWidth
                    value={hotel.price.double.lpd}
                    onChange={updatePrice}
                  />
                </div>
                {/* demi pension */}
                <div className="col-1">
                  <Checkbox
                    name="doubledp"
                    checked={hotel.status.doubledp}
                    onChange={updateStatus}
                  />
                </div>
                <div className="col-2">
                  <TextField
                    name="Doubledp"
                    label="Demi pension"
                    variant="outlined"
                    type="number"
                    disabled={!hotel.status.doubledp}
                    fullWidth
                    value={hotel.price.double.dp}
                    onChange={updatePrice}
                  />
                </div>
                {/* pension complete */}
                <div className="col-1">
                  <Checkbox
                    name="doublepc"
                    checked={hotel.status.doublepc}
                    onChange={updateStatus}
                  />
                </div>
                <div className="col-2">
                  <TextField
                    name="Doublepc"
                    label="Pension Complete"
                    type="number"
                    variant="outlined"
                    fullWidth
                    disabled={!hotel.status.doublepc}
                    value={hotel.price.double.pc}
                    onChange={updatePrice}
                  />
                </div>
                {/* all incl */}
                <div className="col-1">
                  <Checkbox
                    name="doubleai"
                    checked={hotel.status.doubleai}
                    onChange={updateStatus}
                  />
                </div>
                <div className="col-2">
                  <TextField
                    name="Doubleai"
                    label="All inclusif"
                    type="number"
                    variant="outlined"
                    fullWidth
                    disabled={!hotel.status.doubleai}
                    value={hotel.price.double.ai}
                    onChange={updatePrice}
                  />
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <br />
        {/* triple */}
        <div className="row">
          <div className="col-4" align="left">
            <FormControlLabel
              value="end"
              control={
                <Switch
                  name="triple"
                  color="primary"
                  checked={hotel.status.triple}
                  onChange={updateStatus}
                />
              }
              label="Triple"
              labelPlacement="end"
            />
          </div>
          <div className="col-8">
            {hotel.status.triple ? (
              <div className="row">
                {" "}
                {/* petit déj*/}
                <div className="col-1">
                  <Checkbox
                    name="triplelpd"
                    checked={hotel.status.triplelpd}
                    onChange={updateStatus}
                  />
                </div>
                <div className="col-2">
                  <TextField
                    name="Triplelpd"
                    label="Logement petit dejeuner"
                    variant="outlined"
                    type="number"
                    disabled={!hotel.status.triplelpd}
                    fullWidth
                    value={hotel.price.triple.lpd}
                    onChange={updatePrice}
                  />
                </div>
                {/* demi pension */}
                <div className="col-1">
                  <Checkbox
                    name="tripledp"
                    checked={hotel.status.tripledp}
                    onChange={updateStatus}
                  />
                </div>
                <div className="col-2">
                  <TextField
                    name="Tripledp"
                    label="Demi pension"
                    variant="outlined"
                    type="number"
                    disabled={!hotel.status.tripledp}
                    fullWidth
                    value={hotel.price.triple.dp}
                    onChange={updatePrice}
                  />
                </div>
                {/* pension complete */}
                <div className="col-1">
                  <Checkbox
                    name="triplepc"
                    checked={hotel.status.triplepc}
                    onChange={updateStatus}
                  />
                </div>
                <div className="col-2">
                  <TextField
                    name="Triplepc"
                    label="Pension Complete"
                    type="number"
                    variant="outlined"
                    fullWidth
                    disabled={!hotel.status.triplepc}
                    value={hotel.price.triple.pc}
                    onChange={updatePrice}
                  />
                </div>
                {/* all incl */}
                <div className="col-1">
                  <Checkbox
                    name="tripleai"
                    checked={hotel.status.tripleai}
                    onChange={updateStatus}
                  />
                </div>
                <div className="col-2">
                  <TextField
                    name="Tripleai"
                    label="All inclusif"
                    type="number"
                    variant="outlined"
                    fullWidth
                    disabled={!hotel.status.tripleai}
                    value={hotel.price.triple.ai}
                    onChange={updatePrice}
                  />
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <br />
        {/* Quadruple */}
        <div className="row">
          <div className="col-4" align="left">
            <FormControlLabel
              value="end"
              control={
                <Switch
                  name="quadruple"
                  color="primary"
                  checked={hotel.status.quadruple}
                  onChange={updateStatus}
                />
              }
              label="Quadruple"
              labelPlacement="end"
            />
          </div>
          <div className="col-8">
            {hotel.status.quadruple ? (
              <div className="row">
                {" "}
                {/* petit déj*/}
                <div className="col-1">
                  <Checkbox
                    name="quadruplelpd"
                    checked={hotel.status.quadruplelpd}
                    onChange={updateStatus}
                  />
                </div>
                <div className="col-2">
                  <TextField
                    name="Quadruplelpd"
                    label="Logement petit dejeuner"
                    variant="outlined"
                    type="number"
                    disabled={!hotel.status.quadruplelpd}
                    fullWidth
                    value={hotel.price.quadruple.lpd}
                    onChange={updatePrice}
                  />
                </div>
                {/* demi pension */}
                <div className="col-1">
                  <Checkbox
                    name="quadrupledp"
                    checked={hotel.status.quadrupledp}
                    onChange={updateStatus}
                  />
                </div>
                <div className="col-2">
                  <TextField
                    name="Quadrupledp"
                    label="Demi pension"
                    variant="outlined"
                    type="number"
                    disabled={!hotel.status.quadrupledp}
                    fullWidth
                    value={hotel.price.quadruple.dp}
                    onChange={updatePrice}
                  />
                </div>
                {/* pension complete */}
                <div className="col-1">
                  <Checkbox
                    name="quadruplepc"
                    checked={hotel.status.quadruplepc}
                    onChange={updateStatus}
                  />
                </div>
                <div className="col-2">
                  <TextField
                    name="Quadruplepc"
                    label="Pension Complete"
                    type="number"
                    variant="outlined"
                    fullWidth
                    disabled={!hotel.status.quadruplepc}
                    value={hotel.price.quadruple.pc}
                    onChange={updatePrice}
                  />
                </div>
                {/* all incl */}
                <div className="col-1">
                  <Checkbox
                    name="quadrupleai"
                    checked={hotel.status.quadrupleai}
                    onChange={updateStatus}
                  />
                </div>
                <div className="col-2">
                  <TextField
                    name="Quadrupleai"
                    label="All inclusif"
                    type="number"
                    variant="outlined"
                    fullWidth
                    disabled={!hotel.status.quadrupleai}
                    value={hotel.price.quadruple.ai}
                    onChange={updatePrice}
                  />
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-4" align="left">
            <FormControlLabel
              value="end"
              control={
                <Switch
                  name="enfant"
                  color="primary"
                  checked={hotel.status.enfant}
                  onChange={updateStatus}
                />
              }
              label="Kids"
              labelPlacement="end"
            />
          </div>
          <div className="col-8">
            {hotel.status.enfant ? (
              <div className="row">
                <div className="col-4"></div>
                <div className="col-4">
                  <TextField
                    name="Enfant"
                    label="Kids"
                    type="number"
                    variant="outlined"
                    fullWidth
                    value={hotel.price.kids}
                    onChange={updatePrice}
                  />
                </div>
                <div className="col-4"></div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-4" align="left">
            <FormControlLabel
              value="end"
              control={
                <Switch
                  name="promo"
                  color="primary"
                  checked={hotel.status.promo}
                  onChange={updateStatus}
                />
              }
              label="Promo"
              labelPlacement="end"
            />
          </div>
          <br />
          <div className="col-8">
            {hotel.status.promo ? (
              <div className="row">
                <div className="col-4"></div>
                <div className="col-4">
                  <TextField
                    label="Promo en %"
                    name="Promo"
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">%</InputAdornment>
                      ),
                    }}
                    value={hotel.promo}
                    onChange={updatePrice}
                  />
                </div>
                <div className="col-4"></div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-4" align="left">
            <label>Available rooms</label>
          </div>
          <div className="col-8">
            <div className="row">
              <div className="col-1">
                <Checkbox
                  name="quadruplerooms"
                  checked={hotel.status.quadruplerooms}
                  onChange={updateStatus}
                />
              </div>
              <div className="col-2">
                <TextField
                  name="QuadrupleRooms"
                  label="Quadruple"
                  type="number"
                  variant="outlined"
                  disabled={!hotel.status.quadruplerooms}
                  fullWidth
                  value={hotel.rooms.quadruple}
                  onChange={updateRooms}
                />
              </div>
              <div className="col-1">
                <Checkbox
                  name="triplerooms"
                  checked={hotel.status.triplerooms}
                  onChange={updateStatus}
                />
              </div>
              <div className="col-2">
                <TextField
                  name="TripleRooms"
                  label="Triple"
                  type="number"
                  variant="outlined"
                  disabled={!hotel.status.triplerooms}
                  fullWidth
                  value={hotel.rooms.triple}
                  onChange={updateRooms}
                />
              </div>
              <div className="col-1">
                <Checkbox
                  name="doublerooms"
                  checked={hotel.status.doublerooms}
                  onChange={updateStatus}
                />
              </div>
              <div className="col-2">
                <TextField
                  name="DoubleRooms"
                  label="Double"
                  type="number"
                  variant="outlined"
                  disabled={!hotel.status.doublerooms}
                  fullWidth
                  value={hotel.rooms.double}
                  onChange={updateRooms}
                />
              </div>
              <div className="col-1">
                <Checkbox
                  name="singlerooms"
                  checked={hotel.status.singlerooms}
                  onChange={updateStatus}
                />
              </div>
              <div className="col-2">
                <TextField
                  name="SingleRooms"
                  label="Single"
                  variant="outlined"
                  type="number"
                  fullWidth
                  disabled={!hotel.status.singlerooms}
                  value={hotel.rooms.single}
                  onChange={updateRooms}
                />
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-3">
            <FormControlLabel
              control={
                <Checkbox
                  name="parking"
                  checked={hotel.options.parking}
                  onChange={updateOptions}
                  icon={
                    <img
                      src="https://img.icons8.com/external-xnimrodx-lineal-xnimrodx/30/000000/external-parking-gas-station-xnimrodx-lineal-xnimrodx.png"
                      alt=""
                    />
                  }
                  checkedIcon={
                    <img
                      src="https://img.icons8.com/external-xnimrodx-lineal-gradient-xnimrodx/32/000000/external-parking-gas-station-xnimrodx-lineal-gradient-xnimrodx.png"
                      alt=""
                    />
                  }
                />
              }
              label="Parking"
            />
          </div>
          <div className="col-3">
            <FormControlLabel
              control={
                <Checkbox
                  name="wifi"
                  checked={hotel.options.wifi}
                  onChange={updateOptions}
                  icon={
                    <img
                      src="https://img.icons8.com/external-xnimrodx-lineal-xnimrodx/30/000000/external-wifi-accommodation-and-hotel-xnimrodx-lineal-xnimrodx.png"
                      alt=""
                    />
                  }
                  checkedIcon={
                    <img
                      src="https://img.icons8.com/external-xnimrodx-lineal-gradient-xnimrodx/32/000000/external-wifi-accommodation-and-hotel-xnimrodx-lineal-gradient-xnimrodx.png"
                      alt=""
                    />
                  }
                />
              }
              label="Free Wifi"
            />
          </div>
          <div className="col-3">
            <FormControlLabel
              control={
                <Checkbox
                  name="elevator"
                  checked={hotel.options.elevator}
                  onChange={updateOptions}
                  icon={
                    <img
                      src="https://img.icons8.com/external-xnimrodx-lineal-xnimrodx/30/000000/external-elevator-shopping-mall-xnimrodx-lineal-xnimrodx.png"
                      alt=""
                    />
                  }
                  checkedIcon={
                    <img
                      src="https://img.icons8.com/external-xnimrodx-lineal-gradient-xnimrodx/32/000000/external-elevator-shopping-mall-xnimrodx-lineal-gradient-xnimrodx.png"
                      alt=""
                    />
                  }
                />
              }
              label="Elevator"
            />
          </div>
          <div className="col-3">
            <FormControlLabel
              control={
                <Checkbox
                  name="restaurant"
                  checked={hotel.options.restaurant}
                  onChange={updateOptions}
                  icon={
                    <img
                      src="https://img.icons8.com/external-xnimrodx-lineal-xnimrodx/30/000000/external-restaurant-hotel-xnimrodx-lineal-xnimrodx.png"
                      alt=""
                    />
                  }
                  checkedIcon={
                    <img
                      src="https://img.icons8.com/external-xnimrodx-lineal-gradient-xnimrodx/32/000000/external-restaurant-hotel-xnimrodx-lineal-gradient-xnimrodx.png"
                      alt=""
                    />
                  }
                />
              }
              label="Restaurant"
            />
          </div>
          <div className="col-3">
            <FormControlLabel
              control={
                <Checkbox
                  name="bar"
                  checked={hotel.options.bar}
                  onChange={updateOptions}
                  icon={
                    <img
                      src="https://img.icons8.com/external-xnimrodx-lineal-xnimrodx/30/000000/external-bar-beer-xnimrodx-lineal-xnimrodx.png"
                      alt=""
                    />
                  }
                  checkedIcon={
                    <img
                      src="https://img.icons8.com/external-xnimrodx-lineal-gradient-xnimrodx/32/000000/external-bar-beer-xnimrodx-lineal-gradient-xnimrodx.png"
                      alt=""
                    />
                  }
                />
              }
              label="Bar"
            />
          </div>
          <div className="col-3">
            <FormControlLabel
              control={
                <Checkbox
                  name="pool"
                  checked={hotel.options.pool}
                  onChange={updateOptions}
                  icon={
                    <img
                      src="https://img.icons8.com/external-xnimrodx-lineal-xnimrodx/30/000000/external-pool-fitness-and-gym-xnimrodx-lineal-xnimrodx.png"
                      alt=""
                    />
                  }
                  checkedIcon={
                    <img
                      src="https://img.icons8.com/external-xnimrodx-lineal-gradient-xnimrodx/32/000000/external-pool-fitness-and-gym-xnimrodx-lineal-gradient-xnimrodx.png"
                      alt=""
                    />
                  }
                />
              }
              label="Pool"
            />
          </div>
          <div className="col-3">
            <FormControlLabel
              control={
                <Checkbox
                  name="indoorpool"
                  checked={hotel.options.indoorpool}
                  onChange={updateOptions}
                  icon={
                    <img
                      src="https://img.icons8.com/external-kiranshastry-solid-kiranshastry/30/000000/external-swimming-pool-interface-kiranshastry-solid-kiranshastry.png"
                      alt=""
                    />
                  }
                  checkedIcon={
                    <img
                      src="https://img.icons8.com/external-kiranshastry-gradient-kiranshastry/32/000000/external-swimming-pool-interface-kiranshastry-gradient-kiranshastry.png"
                      alt=""
                    />
                  }
                />
              }
              label="Indoor Pool"
            />
          </div>
          <div className="col-3">
            <FormControlLabel
              control={
                <Checkbox
                  name="spa"
                  checked={hotel.options.spa}
                  onChange={updateOptions}
                  icon={
                    <img
                      src="https://img.icons8.com/external-icongeek26-outline-icongeek26/30/000000/external-spa-ayurveda-icongeek26-outline-icongeek26.png"
                      alt=""
                    />
                  }
                  checkedIcon={
                    <img
                      src="https://img.icons8.com/external-icongeek26-outline-colour-icongeek26/32/000000/external-spa-ayurveda-icongeek26-outline-colour-icongeek26.png"
                      alt=""
                    />
                  }
                />
              }
              label="Beauty & Spa"
            />
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-12">
            <input
              id="images"
              label="image"
              type="file"
              multiple
              variant="filled"
              accept="image/png,image/jpg"
              onChange={(e) => setimages(e.target.files)}
            />
          </div>
        </div>
        <br />
        <LoadingButton
          color="secondary"
          onClick={(e) => {
            setLoading(true);
            onsubmitform(e);
          }}
          loading={loading}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="contained"
        >
          Save
        </LoadingButton>
      </form>
      <br />
    </div>
  );
}

export default UpdateHotel;
