import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  const history = useNavigate();
  let { id } = useParams();
  const [name, setname] = useState("");
  const [locations, setlocations] = useState([]);
  const [location, setlocation] = useState("");
  const [description, setdescription] = useState("");
  const [rating, setrating] = useState(0);
  const [lps, setlp] = useState(false);
  const [lptriples, setlptriples] = useState(false);
  const [lpdoubles, setlpdoubles] = useState(false);
  const [lpsingles, setlpsingles] = useState(false);
  const [lptriple, setlptriple] = useState(0);
  const [lpdouble, setlpdouble] = useState(0);
  const [lpsingle, setlpsingle] = useState(0);
  const [dps, setdp] = useState(false);
  const [dptriples, setdptriples] = useState(false);
  const [dpdoubles, setdpdoubles] = useState(false);
  const [dpsingles, setdpsingles] = useState(false);
  const [dptriple, setdptriple] = useState(0);
  const [dpdouble, setdpdouble] = useState(0);
  const [dpsingle, setdpsingle] = useState(0);
  const [pcs, setpc] = useState(false);
  const [pctriples, setpctriples] = useState(false);
  const [pcdoubles, setpcdoubles] = useState(false);
  const [pcsingles, setpcsingles] = useState(false);
  const [pctriple, setpctriple] = useState(0);
  const [pcdouble, setpcdouble] = useState(0);
  const [pcsingle, setpcsingle] = useState(0);
  const [ais, setai] = useState(false);
  const [aitriples, setaitriples] = useState(false);
  const [aidoubles, setaidoubles] = useState(false);
  const [aisingles, setaisingles] = useState(false);
  const [aitriple, setaitriple] = useState(0);
  const [aidouble, setaidouble] = useState(0);
  const [aisingle, setaisingle] = useState(0);
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
  const [oldimages, setoldimages] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/hotel/" + id)
      .then((res) => {
        const hotel = res.data;
        setname(hotel.name);
        setlocation(hotel.location);
        setrating(hotel.rating);
        setdescription(hotel.description);
        if (hotel.price.lp) {
          setlp(true);
          if (hotel.price.lp.triple) {
            setlptriples(true);
            setlptriple(hotel.price.lp.triple);
          }
          if (hotel.price.lp.double) {
            setlpdoubles(true);
            setlpdouble(hotel.price.lp.double);
          }
          if (hotel.price.lp.single) {
            setlpsingles(true);
            setlpsingle(hotel.price.lp.single);
          }
        }
        if (hotel.price.dp) {
          setdp(true);
          if (hotel.price.dp.triple) {
            setdptriples(true);
            setdptriple(hotel.price.dp.triple);
          }
          if (hotel.price.dp.double) {
            setdpdoubles(true);
            setdpdouble(hotel.price.dp.double);
          }
          if (hotel.price.dp.single) {
            setdpsingles(true);
            setdpsingle(hotel.price.dp.single);
          }
        }
        if (hotel.price.pc) {
          setpc(true);
          if (hotel.price.pc.triple) {
            setpctriples(true);
            setpctriple(hotel.price.pc.triple);
          }
          if (hotel.price.pc.double) {
            setpcdoubles(true);
            setpcdouble(hotel.price.pc.double);
          }
          if (hotel.price.pc.single) {
            setpcsingles(true);
            setpcsingle(hotel.price.pc.single);
          }
        }
        if (hotel.price.ai) {
          setai(true);
          if (hotel.price.ai.triple) {
            setaitriples(true);
            setaitriple(hotel.price.ai.triple);
          }
          if (hotel.price.ai.double) {
            setaidoubles(true);
            setaidouble(hotel.price.ai.double);
          }
          if (hotel.price.ai.single) {
            setaisingles(true);
            setaisingle(hotel.price.ai.single);
          }
        }
        if (hotel.price.kids) {
          setenfants(true);
          setenfant(hotel.price.kids);
        }
        if (hotel.rooms) {
          if (hotel.rooms.single) {
            setsingles(true);
            setsingle(hotel.rooms.single);
          }
          if (hotel.rooms.double) {
            setdoubles(true);
            setdouble(hotel.rooms.double);
          }
          if (hotel.rooms.triple) {
            settriples(true);
            settriple(hotel.rooms.triple);
          }
        }
        setoldimages(hotel.images);
        if (hotel.promo) {
          setpromos(true);
          setpromo(hotel.promo);
        }
        if (hotel.options.parking) {
          setparking(true);
        }
        if (hotel.options.wifi) {
          setwifi(true);
        }
        if (hotel.options.elevator) {
          setelevator(true);
        }
        if (hotel.options.restaurant) {
          setrestaurant(true);
        }
        if (hotel.options.bar) {
          setbar(true);
        }
        if (hotel.options.pool) {
          setpool(true);
        }
        if (hotel.options.indoorpool) {
          setindoorpool(true);
        }
        if (hotel.options.spa) {
          setspa(true);
        }
      })
      .catch();
    axios
      .get("http://localhost:8000/api/destinations/all")
      .then((des) => {
        setlocations(des.data);
      })
      .catch();
  }, []);
  const onsubmitform = (e) => {
    const data = new FormData();
    data.append("name", name);
    data.append("location", location);
    data.append("rating", rating);
    data.append("description", description);
    const price = {};
    if (lps) {
      let lp = {};
      if (lptriples && lptriple !== 0) {
        lp.triple = lptriple;
      }
      if (lpdoubles && lpdouble !== 0) {
        lp.double = lpdouble;
      }
      if (lpsingles && lpsingle !== 0) {
        lp.single = lpsingle;
      }
      if (Object.keys(lp).length !== 0) {
        price.lp = lp;
      }
    }
    if (dps) {
      let dp = {};
      if (dptriples && dptriple !== 0) {
        dp.triple = dptriple;
      }
      if (dpdoubles && dpdouble !== 0) {
        dp.double = dpdouble;
      }
      if (dpsingles && dpsingle !== 0) {
        dp.single = dpsingle;
      }
      if (Object.keys(dp).length !== 0) {
        price.dp = dp;
      }
    }
    if (pcs) {
      let pc = {};
      if (pctriples && pctriple !== 0) {
        pc.triple = pctriple;
      }
      if (pcdoubles && pcdouble !== 0) {
        pc.double = pcdouble;
      }
      if (pcsingles && pcsingle !== 0) {
        pc.single = pcsingle;
      }
      if (Object.keys(pc).length !== 0) {
        price.pc = pc;
      }
    }
    if (ais) {
      let ai = {};
      if (aitriples && aitriple !== 0) {
        ai.triple = aitriple;
      }
      if (aidoubles && aidouble !== 0) {
        ai.double = aidouble;
      }
      if (aisingles && aisingle !== 0) {
        ai.single = aisingle;
      }
      if (Object.keys(ai).length !== 0) {
        price.ai = ai;
      }
    }
    if (lpsingles || dpsingles || pcsingles || aisingles) {
      let s = {};
      if (lpsingles && lpsingle !== 0) {
        s.lp = lpsingle;
      }
      if (dpsingles && dpsingle !== 0) {
        s.dp = dpsingle;
      }
      if (pcsingles && pcsingle !== 0) {
        s.pc = pcsingle;
      }
      if (aisingles && aisingle !== 0) {
        s.ai = aisingle;
      }
      if (Object.keys(s).length !== 0) {
        price.single = s;
      }
    }
    if (lpdoubles || dpdoubles || pcdoubles || aidoubles) {
      let d = {};
      if (lpdoubles && lpdouble !== 0) {
        d.lp = lpdouble;
      }
      if (dpdoubles && dpdouble !== 0) {
        d.dp = dpdouble;
      }
      if (pcdoubles && pcdouble !== 0) {
        d.pc = pcdouble;
      }
      if (aidoubles && aidouble !== 0) {
        d.ai = aidouble;
      }
      if (Object.keys(d).length !== 0) {
        price.double = d;
      }
    }
    if (lptriples || dptriples || pctriples || aitriples) {
      let t = {};
      if (lptriples && lptriple !== 0) {
        t.lp = lptriple;
      }
      if (dptriples && dptriple !== 0) {
        t.dp = dptriple;
      }
      if (pctriples && pctriple !== 0) {
        t.pc = pctriple;
      }
      if (aitriples && aitriple !== 0) {
        t.ai = aitriple;
      }
      if (Object.keys(t).length !== 0) {
        price.triple = t;
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
    data.append("images", JSON.stringify(oldimages));
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
      .put("http://localhost:8000/api/hotel/update/" + id, data)
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
        <div className="row">
          <div className="col-4" align="left">
            <FormControlLabel
              value="end"
              control={
                <Switch
                  color="primary"
                  checked={lps}
                  onChange={(e) => setlp(e.target.checked)}
                />
              }
              label="Logement petit dejeuner"
              labelPlacement="end"
            />
          </div>
          <div className="col-8">
            {lps ? (
              <div className="row">
                <div className="col-1">
                  <Checkbox
                    name="lptriples"
                    checked={lptriples}
                    onChange={(e) => setlptriples(e.target.checked)}
                  />
                </div>
                <div className="col-3">
                  <TextField
                    id="lptriple"
                    label="Triple"
                    variant="outlined"
                    type="number"
                    disabled={!lptriples}
                    fullWidth
                    value={lptriple}
                    onChange={(e) => {
                      setlptriple(parseInt(e.target.value));
                      settriples(true);
                    }}
                  />
                </div>
                <div className="col-1">
                  <Checkbox
                    name="lpdoubles"
                    checked={lpdoubles}
                    onChange={(e) => setlpdoubles(e.target.checked)}
                  />
                </div>
                <div className="col-3">
                  <TextField
                    id="lpdouble"
                    label="Double"
                    variant="outlined"
                    type="number"
                    disabled={!lpdoubles}
                    fullWidth
                    value={lpdouble}
                    onChange={(e) => {
                      setlpdouble(parseInt(e.target.value));
                      setdoubles(true);
                    }}
                  />
                </div>
                <div className="col-1">
                  <Checkbox
                    name="lpsingles"
                    checked={lpsingles}
                    onChange={(e) => setlpsingles(e.target.checked)}
                  />
                </div>
                <div className="col-3">
                  <TextField
                    id="lpsingle"
                    label="Single"
                    type="number"
                    variant="outlined"
                    fullWidth
                    disabled={!lpsingles}
                    value={lpsingle}
                    onChange={(e) => {
                      setlpsingle(parseInt(e.target.value));
                      setsingles(true);
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
                  checked={dps}
                  onChange={(e) => setdp(e.target.checked)}
                />
              }
              label="Demi pension"
              labelPlacement="end"
            />
          </div>

          <div className="col-8">
            {dps ? (
              <div className="row">
                <div className="col-1">
                  <Checkbox
                    name="dptriples"
                    checked={dptriples}
                    onChange={(e) => setdptriples(e.target.checked)}
                  />
                </div>
                <div className="col-3">
                  <TextField
                    id="dptriple"
                    label="Triple"
                    variant="outlined"
                    type="number"
                    disabled={!dptriples}
                    fullWidth
                    value={dptriple}
                    onChange={(e) => {
                      setdptriple(parseInt(e.target.value));
                      settriples(true);
                    }}
                  />
                </div>
                <div className="col-1">
                  <Checkbox
                    name="dpdoubles"
                    checked={dpdoubles}
                    onChange={(e) => setdpdoubles(e.target.checked)}
                  />
                </div>
                <div className="col-3">
                  <TextField
                    id="dpdouble"
                    label="Double"
                    variant="outlined"
                    type="number"
                    disabled={!dpdoubles}
                    fullWidth
                    value={dpdouble}
                    onChange={(e) => {
                      setdpdouble(parseInt(e.target.value));
                      setdoubles(true);
                    }}
                  />
                </div>
                <div className="col-1">
                  <Checkbox
                    name="dpsingles"
                    checked={dpsingles}
                    onChange={(e) => setdpsingles(e.target.checked)}
                  />
                </div>
                <div className="col-3">
                  <TextField
                    id="dpsingle"
                    label="Single"
                    variant="outlined"
                    type="number"
                    fullWidth
                    disabled={!dpsingles}
                    value={dpsingle}
                    onChange={(e) => {
                      setdpsingle(parseInt(e.target.value));
                      setsingles(true);
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
                  checked={pcs}
                  onChange={(e) => setpc(e.target.checked)}
                />
              }
              label="Pension complete"
              labelPlacement="end"
            />
          </div>

          <div className="col-8">
            {pcs ? (
              <div className="row">
                <div className="col-1">
                  <Checkbox
                    name="pctriples"
                    checked={pctriples}
                    onChange={(e) => setpctriples(e.target.checked)}
                  />
                </div>
                <div className="col-3">
                  <TextField
                    id="pctriple"
                    label="Triple"
                    type="number"
                    variant="outlined"
                    disabled={!pctriples}
                    fullWidth
                    value={pctriple}
                    onChange={(e) => {
                      setpctriple(parseInt(e.target.value));
                      settriples(true);
                    }}
                  />
                </div>
                <div className="col-1">
                  <Checkbox
                    name="pcdoubles"
                    checked={pcdoubles}
                    onChange={(e) => setpcdoubles(e.target.checked)}
                  />
                </div>
                <div className="col-3">
                  <TextField
                    id="pcdouble"
                    label="Double"
                    type="number"
                    variant="outlined"
                    disabled={!pcdoubles}
                    fullWidth
                    value={pcdouble}
                    onChange={(e) => {
                      setpcdouble(parseInt(e.target.value));
                      setdoubles(true);
                    }}
                  />
                </div>
                <div className="col-1">
                  <Checkbox
                    name="pcsingles"
                    checked={pcsingles}
                    onChange={(e) => setpcsingles(e.target.checked)}
                  />
                </div>
                <div className="col-3">
                  <TextField
                    id="pcsingle"
                    label="Single"
                    variant="outlined"
                    type="number"
                    fullWidth
                    disabled={!pcsingles}
                    value={pcsingle}
                    onChange={(e) => {
                      setpcsingle(parseInt(e.target.value));
                      setsingles(true);
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
                  checked={ais}
                  onChange={(e) => setai(e.target.checked)}
                />
              }
              label="All inclusif"
              labelPlacement="end"
            />
          </div>

          <div className="col-8">
            {ais ? (
              <div className="row">
                <div className="col-1">
                  <Checkbox
                    name="aitriples"
                    checked={aitriples}
                    onChange={(e) => setaitriples(e.target.checked)}
                  />
                </div>
                <div className="col-3">
                  <TextField
                    id="aitriple"
                    label="Triple"
                    type="number"
                    variant="outlined"
                    disabled={!aitriples}
                    fullWidth
                    value={aitriple}
                    onChange={(e) => {
                      setaitriple(parseInt(e.target.value));
                      settriples(true);
                    }}
                  />
                </div>
                <div className="col-1">
                  <Checkbox
                    name="aidoubles"
                    checked={aidoubles}
                    onChange={(e) => setaidoubles(e.target.checked)}
                  />
                </div>
                <div className="col-3">
                  <TextField
                    id="aidouble"
                    label="Double"
                    type="number"
                    variant="outlined"
                    disabled={!aidoubles}
                    fullWidth
                    value={aidouble}
                    onChange={(e) => {
                      setaidouble(parseInt(e.target.value));
                      setdoubles(true);
                    }}
                  />
                </div>
                <div className="col-1">
                  <Checkbox
                    name="aisingles"
                    checked={aisingles}
                    onChange={(e) => setaisingles(e.target.checked)}
                  />
                </div>
                <div className="col-3">
                  <TextField
                    id="aisingle"
                    label="Single"
                    variant="outlined"
                    type="number"
                    fullWidth
                    disabled={!aisingles}
                    value={aisingle}
                    onChange={(e) => {
                      setaisingle(parseInt(e.target.value));
                      setsingles(true);
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
          <br />
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

export default UpdateHotel;
