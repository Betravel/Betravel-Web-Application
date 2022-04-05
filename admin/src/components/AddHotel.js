import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

function AddHotel() {
  const [Single, setSingle] = useState(false);
  const [StateSinglelpd, setStateSinglelpd] = useState(false);
  const [Singlelpd, setSinglelpd] = useState(0);
  const [StateSingledp, setStateSingledp] = useState(false);
  const [Singledp, setSingledp] = useState(0);
  const [StateSinglepc, setStateSinglepc] = useState(false);
  const [Singlepc, setSinglepc] = useState(0);
  const [StateSingleai, setStateSingleai] = useState(false);
  const [Singleai, setSingleai] = useState(0);

  const [Double, setDouble] = useState(false);
  const [StateDoublelpd, setStateDoublelpd] = useState(false);
  const [Doublelpd, setDoublelpd] = useState(0);
  const [StateDoubledp, setStateDoubledp] = useState(false);
  const [Doubledp, setDoubledp] = useState(0);
  const [StateDoublepc, setStateDoublepc] = useState(false);
  const [Doublepc, setDoublepc] = useState(0);
  const [StateDoubleai, setStateDoubleai] = useState(false);
  const [Doubleai, setDoubleai] = useState(0);

  const [Triple, setTriple] = useState(false);
  const [StateTriplelpd, setStateTriplelpd] = useState(false);
  const [Triplelpd, setTriplelpd] = useState(0);
  const [StateTripledp, setStateTripledp] = useState(false);
  const [Tripledp, setTripledp] = useState(0);
  const [StateTriplepc, setStateTriplepc] = useState(false);
  const [Triplepc, setTriplepc] = useState(0);
  const [StateTripleai, setStateTripleai] = useState(false);
  const [Tripleai, setTripleai] = useState(0);

  const [Quadruple, setQuadruple] = useState(false);
  const [StateQuadruplelpd, setStateQuadruplelpd] = useState(false);
  const [Quadruplelpd, setQuadruplelpd] = useState(0);
  const [StateQuadrupledp, setStateQuadrupledp] = useState(false);
  const [Quadrupledp, setQuadrupledp] = useState(0);
  const [StateQuadruplepc, setStateQuadruplepc] = useState(false);
  const [Quadruplepc, setQuadruplepc] = useState(0);
  const [StateQuadrupleai, setStateQuadrupleai] = useState(false);
  const [Quadrupleai, setQuadrupleai] = useState(0);

  const history = useNavigate();
  const [name, setname] = useState("");
  const [locations, setlocations] = useState([]);
  const [location, setlocation] = useState("");
  const [description, setdescription] = useState("");
  const [rating, setrating] = useState(0);

  const [singles, setsingles] = useState(false);
  const [doubles, setdoubles] = useState(false);
  const [triples, settriples] = useState(false);
  const [single, setsingle] = useState(0);
  const [double, setdouble] = useState(0);
  const [triple, settriple] = useState(0);
  const [enfants, setenfants] = useState(false);
  const [enfant, setenfant] = useState(0);
  const [promos, setpromos] = useState(false);
  const [promo, setpromo] = useState(0);
  const [parking, setparking] = useState(false);
  const [wifi, setwifi] = useState(false);
  const [elevator, setelevator] = useState(false);
  const [restaurant, setrestaurant] = useState(false);
  const [bar, setbar] = useState(false);
  const [pool, setpool] = useState(false);
  const [indoorpool, setindoorpool] = useState(false);
  const [spa, setspa] = useState(false);
  const [images, setimages] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/destinations/all")
      .then((des) => {
        setlocations(des.data);
      })
      .catch();
  }, []);

  const onsubmitform = () => {
    const data = new FormData();
    data.append("name", name);
    data.append("location", location);
    data.append("rating", rating);
    data.append("description", description);
    const price = {};

    if (Single) {
      let single = {};
      if (StateSinglelpd && Singlelpd !== 0) {
        single.lpd = Singlelpd;
      }
      if (StateSingledp && Singledp !== 0) {
        single.dp = Singledp;
      }
      if (StateSinglepc && Singlepc !== 0) {
        single.pc = Singlepc;
      }
      if (StateSingleai && Singleai !== 0) {
        single.ai = Singleai;
      }
      if (Object.keys(single).length !== 0) {
        price.single = single;
      }
    }

    if (Double) {
      let double = {};
      if (StateDoublelpd && Doublelpd !== 0) {
        double.lpd = Doublelpd;
      }
      if (StateDoubledp && Doubledp !== 0) {
        double.dp = Doubledp;
      }
      if (StateDoublepc && Doublepc !== 0) {
        double.pc = Doublepc;
      }
      if (StateDoubleai && Doubleai !== 0) {
        double.ai = Doubleai;
      }
      if (Object.keys(double).length !== 0) {
        price.double = double;
      }
    }

    if (Triple) {
      let triple = {};
      if (StateTriplelpd && Triplelpd !== 0) {
        triple.lpd = Triplelpd;
      }
      if (StateTripledp && Tripledp !== 0) {
        triple.dp = Tripledp;
      }
      if (StateTriplepc && Triplepc !== 0) {
        triple.pc = Triplepc;
      }
      if (StateTripleai && Tripleai !== 0) {
        triple.ai = Tripleai;
      }
      if (Object.keys(triple).length !== 0) {
        price.triple = triple;
      }
    }

    if (Quadruple) {
      let quadruple = {};
      if (StateQuadruplelpd && Quadruplelpd !== 0) {
        quadruple.lpd = Quadruplelpd;
      }
      if (StateQuadrupledp && Quadrupledp !== 0) {
        quadruple.dp = Quadrupledp;
      }
      if (StateQuadruplepc && Quadruplepc !== 0) {
        quadruple.pc = Quadruplepc;
      }
      if (StateQuadrupleai && Quadrupleai !== 0) {
        quadruple.ai = Quadrupleai;
      }
      if (Object.keys(quadruple).length !== 0) {
        price.quadruple = quadruple;
      }
    }

    if (enfants) {
      price.kids = enfant;
    }

    let rooms = {};
    if (singles) {
      rooms.single = single;
    }
    if (doubles) {
      rooms.double = double;
    }
    if (triples) {
      rooms.triple = triple;
    }
    data.append("rooms", JSON.stringify(rooms));
    data.append("price", JSON.stringify(price));
    for (let index = 0; index < images.length; index++) {
      const element = images[index];
      data.append("images", element);
    }
    data.append("promo", parseInt(promo));
    let options = {
      parking,
      wifi,
      elevator,
      restaurant,
      bar,
      pool,
      indoorpool,
      spa,
    };

    data.append("options", JSON.stringify(options));
    axios
      .post("http://localhost:8000/api/hotel", data)
      .then((res) => {
        console.log(res);
        setLoading(false);
        history("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <br />
      <h4>Add hotel</h4>
      <form onSubmit={onsubmitform}>
        <div className="row">
          <div className="col-5">
            <TextField
              id="name"
              name="name"
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setname(e.target.value)}
              fullWidth
            />
          </div>
          <div className="col-2">
            <Typography component="legend">Rating</Typography>
            <Rating
              name="rating"
              value={rating}
              onChange={(e) => setrating(parseInt(e.target.value))}
            />
          </div>
          <div className="col-5">
            <Autocomplete
              freeSolo
              id="location"
              options={locations}
              sx={{ width: "auto" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Location"
                  fullWidth
                  value={location}
                  onChange={(e) => setlocation(e.target.value)}
                />
              )}
            />
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-12">
            <TextField
              id="description"
              label="Description"
              variant="outlined"
              multiline
              rows={3}
              style={{ width: "100%" }}
              value={description}
              onChange={(e) => setdescription(e.target.value)}
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
                  color="primary"
                  checked={Single}
                  onChange={(e) => setSingle(e.target.checked)}
                />
              }
              label="Single"
              labelPlacement="end"
            />
          </div>
          <div className="col-8">
            {Single ? (
              <div className="row">
                {" "}
                {/* petit déj*/}
                <div className="col-1">
                  <Checkbox
                    name="Singlelpd"
                    checked={StateSinglelpd}
                    onChange={(e) => setStateSinglelpd(e.target.checked)}
                  />
                </div>
                <div className="col-2">
                  <TextField
                    id="Singlelpd"
                    label="Logement petit dejeuner"
                    variant="outlined"
                    type="number"
                    disabled={!StateSinglelpd}
                    fullWidth
                    value={Singlelpd}
                    onChange={(e) => {
                      setSinglelpd(parseInt(e.target.value));
                    }}
                  />
                </div>
                {/* demi pension */}
                <div className="col-1">
                  <Checkbox
                    name="Singledp"
                    checked={StateSingledp}
                    onChange={(e) => setStateSingledp(e.target.checked)}
                  />
                </div>
                <div className="col-2">
                  <TextField
                    id="Singlepd"
                    label="Demi pension"
                    variant="outlined"
                    type="number"
                    disabled={!StateSingledp}
                    fullWidth
                    value={Singledp}
                    onChange={(e) => {
                      setSingledp(parseInt(e.target.value));
                    }}
                  />
                </div>
                {/* pension complete */}
                <div className="col-1">
                  <Checkbox
                    name="Singlepc"
                    checked={StateSinglepc}
                    onChange={(e) => setStateSinglepc(e.target.checked)}
                  />
                </div>
                <div className="col-2">
                  <TextField
                    id="Singlepd"
                    label="Pension Complete"
                    type="number"
                    variant="outlined"
                    fullWidth
                    disabled={!StateSinglepc}
                    value={Singlepc}
                    onChange={(e) => {
                      setSinglepc(parseInt(e.target.value));
                    }}
                  />
                </div>
                {/* all incl */}
                <div className="col-1">
                  <Checkbox
                    name="Singleai"
                    checked={StateSingleai}
                    onChange={(e) => setStateSingleai(e.target.checked)}
                  />
                </div>
                <div className="col-2">
                  <TextField
                    id="Singleai"
                    label="All inclusif"
                    type="number"
                    variant="outlined"
                    fullWidth
                    disabled={!StateSingleai}
                    value={Singleai}
                    onChange={(e) => {
                      setSingleai(parseInt(e.target.value));
                    }}
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
                  color="primary"
                  checked={Double}
                  onChange={(e) => setDouble(e.target.checked)}
                />
              }
              label="Double"
              labelPlacement="end"
            />
          </div>
          <div className="col-8">
            {Double ? (
              <div className="row">
                {" "}
                {/* petit déj*/}
                <div className="col-1">
                  <Checkbox
                    name="Doublelpd"
                    checked={StateDoublelpd}
                    onChange={(e) => setStateDoublelpd(e.target.checked)}
                  />
                </div>
                <div className="col-2">
                  <TextField
                    id="Doublelpd"
                    label="Logement petit dejeuner"
                    variant="outlined"
                    type="number"
                    disabled={!StateDoublelpd}
                    fullWidth
                    value={Doublelpd}
                    onChange={(e) => {
                      setDoublelpd(parseInt(e.target.value));
                    }}
                  />
                </div>
                {/* demi pension */}
                <div className="col-1">
                  <Checkbox
                    name="Doubledp"
                    checked={StateDoubledp}
                    onChange={(e) => setStateDoubledp(e.target.checked)}
                  />
                </div>
                <div className="col-2">
                  <TextField
                    id="Doublepd"
                    label="Demi pension"
                    variant="outlined"
                    type="number"
                    disabled={!StateDoubledp}
                    fullWidth
                    value={Doubledp}
                    onChange={(e) => {
                      setDoubledp(parseInt(e.target.value));
                    }}
                  />
                </div>
                {/* pension complete */}
                <div className="col-1">
                  <Checkbox
                    name="Doublepc"
                    checked={StateDoublepc}
                    onChange={(e) => setStateDoublepc(e.target.checked)}
                  />
                </div>
                <div className="col-2">
                  <TextField
                    id="Doublepd"
                    label="Pension Complete"
                    type="number"
                    variant="outlined"
                    fullWidth
                    disabled={!StateDoublepc}
                    value={Doublepc}
                    onChange={(e) => {
                      setDoublepc(parseInt(e.target.value));
                    }}
                  />
                </div>
                {/* all incl */}
                <div className="col-1">
                  <Checkbox
                    name="Doubleai"
                    checked={StateDoubleai}
                    onChange={(e) => setStateDoubleai(e.target.checked)}
                  />
                </div>
                <div className="col-2">
                  <TextField
                    id="Doubleai"
                    label="All inclusif"
                    type="number"
                    variant="outlined"
                    fullWidth
                    disabled={!StateDoubleai}
                    value={Doubleai}
                    onChange={(e) => {
                      setDoubleai(parseInt(e.target.value));
                    }}
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
                  color="primary"
                  checked={Triple}
                  onChange={(e) => setTriple(e.target.checked)}
                />
              }
              label="Triple"
              labelPlacement="end"
            />
          </div>
          <div className="col-8">
            {Triple ? (
              <div className="row">
                {" "}
                {/* petit déj*/}
                <div className="col-1">
                  <Checkbox
                    name="Triplelpd"
                    checked={StateTriplelpd}
                    onChange={(e) => setStateTriplelpd(e.target.checked)}
                  />
                </div>
                <div className="col-2">
                  <TextField
                    id="Triplelpd"
                    label="Logement petit dejeuner"
                    variant="outlined"
                    type="number"
                    disabled={!StateTriplelpd}
                    fullWidth
                    value={Triplelpd}
                    onChange={(e) => {
                      setTriplelpd(parseInt(e.target.value));
                    }}
                  />
                </div>
                {/* demi pension */}
                <div className="col-1">
                  <Checkbox
                    name="Tripledp"
                    checked={StateTripledp}
                    onChange={(e) => setStateTripledp(e.target.checked)}
                  />
                </div>
                <div className="col-2">
                  <TextField
                    id="Triplepd"
                    label="Demi pension"
                    variant="outlined"
                    type="number"
                    disabled={!StateTripledp}
                    fullWidth
                    value={Tripledp}
                    onChange={(e) => {
                      setTripledp(parseInt(e.target.value));
                    }}
                  />
                </div>
                {/* pension complete */}
                <div className="col-1">
                  <Checkbox
                    name="Triplepc"
                    checked={StateTriplepc}
                    onChange={(e) => setStateTriplepc(e.target.checked)}
                  />
                </div>
                <div className="col-2">
                  <TextField
                    id="Triplepd"
                    label="Pension Complete"
                    type="number"
                    variant="outlined"
                    fullWidth
                    disabled={!StateTriplepc}
                    value={Triplepc}
                    onChange={(e) => {
                      setTriplepc(parseInt(e.target.value));
                    }}
                  />
                </div>
                {/* all incl */}
                <div className="col-1">
                  <Checkbox
                    name="Tripleai"
                    checked={StateTripleai}
                    onChange={(e) => setStateTripleai(e.target.checked)}
                  />
                </div>
                <div className="col-2">
                  <TextField
                    id="Tripleai"
                    label="All inclusif"
                    type="number"
                    variant="outlined"
                    fullWidth
                    disabled={!StateTripleai}
                    value={Tripleai}
                    onChange={(e) => {
                      setTripleai(parseInt(e.target.value));
                    }}
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
                  color="primary"
                  checked={Quadruple}
                  onChange={(e) => setQuadruple(e.target.checked)}
                />
              }
              label="Quadruple"
              labelPlacement="end"
            />
          </div>
          <div className="col-8">
            {Quadruple ? (
              <div className="row">
                {" "}
                {/* petit déj*/}
                <div className="col-1">
                  <Checkbox
                    name="Quadruplelpd"
                    checked={StateQuadruplelpd}
                    onChange={(e) => setStateQuadruplelpd(e.target.checked)}
                  />
                </div>
                <div className="col-2">
                  <TextField
                    id="Quadruplelpd"
                    label="Logement petit dejeuner"
                    variant="outlined"
                    type="number"
                    disabled={!StateQuadruplelpd}
                    fullWidth
                    value={Quadruplelpd}
                    onChange={(e) => {
                      setQuadruplelpd(parseInt(e.target.value));
                    }}
                  />
                </div>
                {/* demi pension */}
                <div className="col-1">
                  <Checkbox
                    name="Quadrupledp"
                    checked={StateQuadrupledp}
                    onChange={(e) => setStateQuadrupledp(e.target.checked)}
                  />
                </div>
                <div className="col-2">
                  <TextField
                    id="Quadruplepd"
                    label="Demi pension"
                    variant="outlined"
                    type="number"
                    disabled={!StateQuadrupledp}
                    fullWidth
                    value={Quadrupledp}
                    onChange={(e) => {
                      setQuadrupledp(parseInt(e.target.value));
                    }}
                  />
                </div>
                {/* pension complete */}
                <div className="col-1">
                  <Checkbox
                    name="Quadruplepc"
                    checked={StateQuadruplepc}
                    onChange={(e) => setStateQuadruplepc(e.target.checked)}
                  />
                </div>
                <div className="col-2">
                  <TextField
                    id="Quadruplepd"
                    label="Pension Complete"
                    type="number"
                    variant="outlined"
                    fullWidth
                    disabled={!StateQuadruplepc}
                    value={Quadruplepc}
                    onChange={(e) => {
                      setQuadruplepc(parseInt(e.target.value));
                    }}
                  />
                </div>
                {/* all incl */}
                <div className="col-1">
                  <Checkbox
                    name="Quadrupleai"
                    checked={StateQuadrupleai}
                    onChange={(e) => setStateQuadrupleai(e.target.checked)}
                  />
                </div>
                <div className="col-2">
                  <TextField
                    id="Quadrupleai"
                    label="All inclusif"
                    type="number"
                    variant="outlined"
                    fullWidth
                    disabled={!StateQuadrupleai}
                    value={Quadrupleai}
                    onChange={(e) => {
                      setQuadrupleai(parseInt(e.target.value));
                    }}
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
                  color="primary"
                  checked={enfants}
                  onChange={(e) => setenfants(e.target.checked)}
                />
              }
              label="Kids"
              labelPlacement="end"
            />
          </div>
          <div className="col-8">
            {enfants ? (
              <div className="row">
                <div className="col-4"></div>
                <div className="col-4">
                  <TextField
                    id="enfant"
                    label="Kids"
                    type="number"
                    variant="outlined"
                    disabled={!enfants}
                    fullWidth
                    value={enfant}
                    onChange={(e) => {
                      setenfant(parseInt(e.target.value));
                    }}
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
                  color="primary"
                  checked={promos}
                  onChange={(e) => setpromos(e.target.checked)}
                />
              }
              label="Promo"
              labelPlacement="end"
            />
          </div>
          <div className="col-8">
            {promos ? (
              <div className="row">
                <div className="col-4"></div>
                <div className="col-4">
                  <TextField
                    label="Promo en %"
                    id="promo"
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">%</InputAdornment>
                      ),
                    }}
                    value={promo}
                    onChange={(e) => setpromo(parseInt(e.target.value))}
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
                  name="triples"
                  checked={triples}
                  onChange={(e) => settriples(e.target.checked)}
                />
              </div>
              <div className="col-3">
                <TextField
                  id="triple"
                  label="Triple"
                  type="number"
                  variant="outlined"
                  disabled={!triples}
                  fullWidth
                  value={triple}
                  onChange={(e) => settriple(parseInt(e.target.value))}
                />
              </div>
              <div className="col-1">
                <Checkbox
                  name="doubles"
                  checked={doubles}
                  onChange={(e) => setdoubles(e.target.checked)}
                />
              </div>
              <div className="col-3">
                <TextField
                  id="double"
                  label="Double"
                  type="number"
                  variant="outlined"
                  disabled={!doubles}
                  fullWidth
                  value={double}
                  onChange={(e) => setdouble(parseInt(e.target.value))}
                />
              </div>
              <div className="col-1">
                <Checkbox
                  name="singles"
                  checked={singles}
                  onChange={(e) => setsingles(e.target.checked)}
                />
              </div>
              <div className="col-3">
                <TextField
                  id="single"
                  label="Single"
                  variant="outlined"
                  type="number"
                  fullWidth
                  disabled={!singles}
                  value={single}
                  s
                  onChange={(e) => setsingle(parseInt(e.target.value))}
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
                  checked={parking}
                  onChange={(e) => setparking(e.target.checked)}
                  name="parking"
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
                  checked={wifi}
                  onChange={(e) => setwifi(e.target.checked)}
                  name="wifi"
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
                  checked={elevator}
                  onChange={(e) => setelevator(e.target.checked)}
                  name="elevator"
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
                  checked={restaurant}
                  onChange={(e) => setrestaurant(e.target.checked)}
                  name="restaurant"
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
                  checked={bar}
                  onChange={(e) => setbar(e.target.checked)}
                  name="bar"
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
                  checked={pool}
                  onChange={(e) => setpool(e.target.checked)}
                  name="pool"
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
                  checked={indoorpool}
                  onChange={(e) => setindoorpool(e.target.checked)}
                  name="indoorpool"
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
                  checked={spa}
                  onChange={(e) => setspa(e.target.checked)}
                  name="spa"
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

export default AddHotel;
