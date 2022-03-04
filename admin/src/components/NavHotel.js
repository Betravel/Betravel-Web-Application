import { useEffect, useState } from "react";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Rating from "@mui/material/Rating";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import AddHotel from "./AddHotel";

function NavHotel() {
  const [name, setname] = useState("");
  const [locations, setlocations] = useState([]);
  const [location, setlocation] = useState("");
  const [description, setdescription] = useState("");
  const [rating, setrating] = useState(0);
  const [lps, setlp] = useState(false);
  const [lptriples, setlptriples] = useState(true);
  const [lpdoubles, setlpdoubles] = useState(true);
  const [lpsingles, setlpsingles] = useState(true);
  const [lptriple, setlptriple] = useState(0);
  const [lpdouble, setlpdouble] = useState(0);
  const [lpsingle, setlpsingle] = useState(0);
  const [dps, setdp] = useState(false);
  const [dptriples, setdptriples] = useState(true);
  const [dpdoubles, setdpdoubles] = useState(true);
  const [dpsingles, setdpsingles] = useState(true);
  const [dptriple, setdptriple] = useState(0);
  const [dpdouble, setdpdouble] = useState(0);
  const [dpsingle, setdpsingle] = useState(0);
  const [pcs, setpc] = useState(false);
  const [pctriples, setpctriples] = useState(true);
  const [pcdoubles, setpcdoubles] = useState(true);
  const [pcsingles, setpcsingles] = useState(true);
  const [pctriple, setpctriple] = useState(0);
  const [pcdouble, setpcdouble] = useState(0);
  const [pcsingle, setpcsingle] = useState(0);
  const [ais, setai] = useState(false);
  const [aitriples, setaitriples] = useState(true);
  const [aidoubles, setaidoubles] = useState(true);
  const [aisingles, setaisingles] = useState(true);
  const [aitriple, setaitriple] = useState(0);
  const [aidouble, setaidouble] = useState(0);
  const [aisingle, setaisingle] = useState(0);
  const [promos, setpromos] = useState(false);
  const [promo, setpromo] = useState(0);
  const [images, setimages] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/destinations/all")
      .then((des) => {
        setlocations(des.data);
      })
      .catch();
  }, []);
  const onsubmitform = (e) => {
    e.preventDefault();
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
    data.append("price", JSON.stringify(price));
    for (let index = 0; index < images.length; index++) {
      const element = images[index];
      data.append("images", element);
    }
    data.append("promo", parseInt(promo));
    axios
      .post("http://localhost:8000/api/hotel", data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <br />
      <nav>
        <div
          className="nav nav-tabs"
          id="nav-tab"
          role="tablist"
          style={{
            backgroundColor: "tranparent",
            border: "2px  ",
            borderRadius: " 5px",
            padding: "5px",
          }}
        >
          <button
            className="nav-link active"
            id="nav-add-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-add"
            type="button"
            role="tab"
            aria-controls="nav-add"
            aria-selected="true"
          >
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAJmElEQVRoge2Ze2xUVR7HP797z51pS0EQEcojC6I8FkQKEl8oIAIBW1FhEF21IGjUDfjCXUhcLRIjWUPUGjeuIG83yJQoYMWgvASrgkgtsDwWhGCxrAYR2tLX3PPbP6asSKfTDi3+xTe5ydyZ3/md32fO75zfPefCRV3URcWTXAing7PVHCmmixrSVEkBEKXMEYo7Xc7hjdkSaeo+mwhE5YrHuclVRisMAa4GAnUYVyEUqrIBZeXBt8gH0cZG0CiQ/o9oSilMdoSpCl0BC+wUId9a9gLFjnICwAqtENo7QndVbgT6AIJyACGnNIV5Ra9K+e8MotL7Ye5H+TtCO6AQ4R3HYVnhW/IjRNPrpx9oL5ZmAOpQ9scTHA2HxQfoPVnbIowHJhEdwWKBZ3fOlXd/F5A+j+rljs8SlOHAbhWmfzuXvFAIZ39LbnMgA2WQQndqp1eVwD4LG7F82K2EdeEwNv1hMlWZDfREWSOWrB0L5KcLBtJvsvZ3LKuBy4BsNbxSXU7A83gUeEqgAxAR5WsVCoDvBE4CqNISoQuQDvQHDFCk8Gp1Nf/0kqkiwnSB5xX+61gyti2UgiYHuWGiDlJlNXBahLu/WCD5103U0aK8AXQCCgVerwqwYvvbcjKer8ETtGWlMkaFJ4im1RGUKV8uklXXPaQDxbICSLKQsXWhbG4ykIFZ2h/YoHDc+gw7VcmRVim8BjwGHFHl+c+vYAnZYhvi7//KVufmwzyoyotE/4w3y4M81ayKztbyCUIrKwzKb8DI1Asy9F5tGzHsABxRBgaE4gpYITACCJcmM2H723I6IYBzNPwBbVYBiwTGAB+XJjMmuYKOrrIZqLaG9M31zBknfhcq4rDYWC5zlbvbVHLEt6zwLMM9ZeamJdzTWAiAtUuk7LMlhIzlRWMZ0bKM3PIkDhllrLG0DVSxqD4fcUFGjOd+1zLcKNnrl0r+KZfXjGWEp7z46VLJbopC9qtE170rLxjLLGMZ2aaEOeuWyuYz9yPG631xW9f1Q2ampthmHASOH2tBevsSbrfK+0Bu3jLGNS3E2VLJuIewCmNUyWxmWXva5VugRVkSXTculIpYreocESeZycbSLqBMb11OwPHJMZYjThlZFw4CQLQqQJaxfO9FV0TXs8wwlvaXnGZSnfHG/lrF+Ew1lsL33yOvRTmPGUsnz/K31asbPiee3qKjnszXrU/m69ant+iohrZbu0TKPMsLxtLZwiMfLGelUXYZyxOgMbMoJkgoxE0GuhrLvFAIx1GeMEph794sbWgwAB4MS1IGJCkDPBiWSFsRFtcE/0x2NmJ83jHKVaEQ1zcYJBhhtLHYgPKeZ7nNs3R0fXKyE6wTSRaCNVdSYhWGcFh8Y8kxlk7/KWBIsssyY9FAhDsaDOJahhhL4ZL35UcvQqaxRFI9chMLBZI1CpBko58TlVaRayy+B5kLw3LMWHYZy62xbGuBZA9WY5SrjfIFgKfcYpSv3w7Hf+yIpaD97ZWo/pUnJ4xlu2sZDGAs+Ua5JhRSt16Q4lS6GEvAVfaGQuq6lm6esiPxMCAIJGn0Cp6PA8BAgbH0qIllr7EEW5XSOYbdbxVQ2lkFgaPtSkmzQlCE7+J1tmC9jlLLLed+rz4Dz7odOP9TnV3LRtg0aaisqcu3F+GgCsHW5bRzLEUioEoacDAuiPg0N4AVSoAWxoIKp+KBBHxmofSLZwNcW3Od0yHDgDpBXOUkCp7QQpUSFERofq5dLRBDtNw5PlgDKNENbBwF/XoQGiG3Jh6/EkyceGqBuEqJY0GU5gKnxIIIl8TrLGB5DodBtX5QhkrNKCh8jbCulo1lUzzfnh/tO8lyqtrSXBQcamdILZCg5ZhaEOi4L5UPuv1MJcIV8Tq7Y5SsIUZ6fPKRvorWpJOwZdhImR7PTywZnysRKve35lj3E3RSBVGOnWtXa9Uy1RwySpWr9AiHxTfKPs+SnmgAAMHIWcvveZ5kedDXwJ5wWHxX6eEplftac/hcu9p1ZKNEHEuha7kBwLV85lj6Zw/WlokGkcSvy2/SeUBkj9BLHUs/x4+mn/G50bEUnDmJiQsCEFA2GEufl4ZqW8+y2lhM0GdsooEE9awROY/KHqxgrLG4Acuql27WNNfSy1XWx7KNCSI+q4wigUru6dqWdUYpcmHq8hgVNZ6S7VmPKAlW9uXRAjjVKEcqP2NjQLnXKBLwWdlgkL9u4XNjOeDC5FAYa5TXjOXq74/yQCLBBHw+CVi2BSzbAhHWJtK26AcmGEsv12cOgKs8ZCz7n90iX8Wyr3OH+Pr1OkWEHFFGV5xmXbAZ/0aQylJ6PlsoZYkElajeHKypfiV7gOoI9DLKSIQVIvx5Sr78I1abOneIvjDPWIpdZfYffKqNMsX4dGqWzCKtY3PTFFJUqGCxsXQwPlNMS6xRXvYsRakB5tfVrk6Qp7+QcleZZpSev6Twl8e/lFWu5U2jjJk7gOwLgwHzrmOmZ7nLWHIe3yp5wePMMEo3Y5k2cWPs/TrUc66lqCy4ljxgmCpDIvCVEVYJjECZNXE72dJE+3dFZeEAZqryHLCmWrnTc7gRZR3Cmoe2SWa89vWmyPx0bWOEHYDnWgaWuhxNUXIVRgIriJD1YCPnzPJemloZZLHCXSgflTuEUoROatkClKshPWurHG8UCMC7fbWvCJuAE45l+EnDoeaWOcAU4HuEF0xXFo+LUajiAoTU9Q+QpTAT6ICQk9aCaUU/09VxWStwCcIt930jhfX5avCkDffRm1X4EKgQZWyoUDaHr9EMhTeAzsAuFXIiPrl/2ikn4gL00kvxGIsyFegFHEKYMq5A8pan6yAsuYAHZIz7VrY0JL6EVp/cazS95rVCW2BWxDKbFrheGY+o8gzRg2gfZbsKBQKHBH4GULhUoYtEXyv0A1yJHoDPiTRnbupP2PIUZkh0jvxglYyxu+ofifMCAfgoXdtEqliEMBLYK8KMjJ2snAnSvw9DsGQqDAZ6UHuHW6mwx4FNqqz6ZjcbAdJ7cyfKyyJ0Az6MRJhw9974c6LRIGeU10vvE+UVoD2wG2WeOiy7fbccA1iOuql9SLM2uptzHEpKCykeR3QefdxT09RhvCqTiKZXEcq0UXvkvfOJp1GFbUNnTYokMVlhKnAV0f3bLiBfhX1iKVKHXwDE0lIdOorSHbipJngB9qvweqCc+UMO110nLijI2fr0Sr3BdbhD4VagL3W/nq4ECoD1Ylk15IB82RT9X5BHjeWo2+FKOqtDmvqkAqihxPU5dvQAh8+k10Vd1EX9fvofMnwAfBr++JkAAAAASUVORK5CYII="
              alt=""
            ></img>
            <br />
            Add
          </button>
          <button
            className="nav-link"
            id="nav-update-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-update"
            type="button"
            role="tab"
            aria-controls="nav-update"
            aria-selected="false"
          >
            <img
              src="data:image/png;base64,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"
              alt=""
            ></img>
            <br />
            Update
          </button>
        </div>
      </nav>

      <div className="tab-content" id="nav-tabContent">
        <div
          className="tab-pane fade show active "
          id="nav-add"
          role="tabpanel"
          aria-labelledby="nav-add-tab"
        >
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
                  disablePortal
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
              <div className="col-12">
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
            </div>
            <br />
            {lps ? (
              <div className="row">
                <div className="col-1">
                  <Checkbox
                    name="lptriples"
                    defaultChecked
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
                    onChange={(e) => setlptriple(parseInt(e.target.value))}
                  />
                </div>
                <div className="col-1">
                  <Checkbox
                    name="lpdoubles"
                    defaultChecked
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
                    onChange={(e) => setlpdouble(parseInt(e.target.value))}
                  />
                </div>
                <div className="col-1">
                  <Checkbox
                    name="lpsingles"
                    defaultChecked
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
                    onChange={(e) => setlpsingle(parseInt(e.target.value))}
                  />
                </div>
              </div>
            ) : (
              ""
            )}
            <br />
            <div className="row">
              <div className="col-12">
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
            </div>
            <br />
            {dps ? (
              <div className="row">
                <div className="col-1">
                  <Checkbox
                    name="dptriples"
                    defaultChecked
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
                    onChange={(e) => setdptriple(parseInt(e.target.value))}
                  />
                </div>
                <div className="col-1">
                  <Checkbox
                    name="dpdoubles"
                    defaultChecked
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
                    onChange={(e) => setdpdouble(parseInt(e.target.value))}
                  />
                </div>
                <div className="col-1">
                  <Checkbox
                    name="dpsingles"
                    defaultChecked
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
                    onChange={(e) => setdpsingle(parseInt(e.target.value))}
                  />
                </div>
              </div>
            ) : (
              ""
            )}
            <br />
            <div className="row">
              <div className="col-12">
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
            </div>
            <br />
            {pcs ? (
              <div className="row">
                <div className="col-1">
                  <Checkbox
                    name="pctriples"
                    defaultChecked
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
                    onChange={(e) => setpctriple(parseInt(e.target.value))}
                  />
                </div>
                <div className="col-1">
                  <Checkbox
                    name="pcdoubles"
                    defaultChecked
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
                    onChange={(e) => setpcdouble(parseInt(e.target.value))}
                  />
                </div>
                <div className="col-1">
                  <Checkbox
                    name="pcsingles"
                    defaultChecked
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
                    onChange={(e) => setpcsingle(parseInt(e.target.value))}
                  />
                </div>
              </div>
            ) : (
              ""
            )}
            <br />
            <div className="row">
              <div className="col-12">
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
            </div>
            <br />
            {ais ? (
              <div className="row">
                <div className="col-1">
                  <Checkbox
                    name="aitriples"
                    defaultChecked
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
                    onChange={(e) => setaitriple(parseInt(e.target.value))}
                  />
                </div>
                <div className="col-1">
                  <Checkbox
                    name="aidoubles"
                    defaultChecked
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
                    onChange={(e) => setaidouble(parseInt(e.target.value))}
                  />
                </div>
                <div className="col-1">
                  <Checkbox
                    name="aisingles"
                    defaultChecked
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
                    onChange={(e) => setaisingle(parseInt(e.target.value))}
                  />
                </div>
              </div>
            ) : (
              ""
            )}
            <br />
            <div className="row">
              <div className="col-12">
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
            </div>
            <br />
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
            <br />
            <div className="row">
              <div className="col-12">
                <input
                  id="images"
                  label="image"
                  type="file"
                  multiple
                  variant="filled"
                  accept="image/png, image/jpg"
                  onChange={(e) => setimages(e.target.files)}
                />
              </div>
            </div>
            <br />
            <button className="btn btn-primary" type="submit">
              Add
            </button>
          </form>
        </div>
        <div
          className="tab-pane fade"
          id="nav-update"
          role="tabpanel"
          aria-labelledby="nav-update-tab"
        >
          <h1>Update</h1>
        </div>
      </div>
      <br />
    </div>
  );
}

export default NavHotel;
