import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import i from "../assets/h1.jpg";
import i2 from "../assets/h2.jpg";
import i5 from "../assets/h2.jpg";
import i4 from "../assets/h4.jpg";
import i3 from "../assets/h7.jpg";
import i6 from "../assets/h6.jpg";
import i7 from "../assets/h7.jpg";
import i8 from "../assets/h8.jpg";

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

function DetailHotel() {
  const itemData = [
    {
      img: i,
      title: "Breakfast",
      rows: 2,
      cols: 2,
    },
    {
      img: i2,
      title: "Burger",
    },
    {
      img: i3,
      title: "Camera",
    },
    {
      img: i4,
      title: "Coffee",
      cols: 2,
    },
    {
      img: i5,
      title: "Hats",
      cols: 2,
    },
    {
      img: i6,
      title: "Honey",
      author: "@arwinneil",
      rows: 2,
      cols: 2,
    },
    {
      img: i7,
      title: "Basketball",
    },
    {
      img: i8,
      title: "Fern",
    },
  ];

  const [hotel, setHotel] = useState([]);
  const [rate, setrate] = useState([]);
  const [options, setoptions] = useState({});
  const [price, setprice] = useState({});
  const [single, setSingle] = useState("");
  const [double, setDouble] = useState("");
  const [triple, setTriple] = useState("");
  const [nbRoomSingle, setnbRoomSingle] = useState(0);
  const [PriceSingle, setPriceSingle] = useState(0);
  const [totaleSingle, settotaleSingle] = useState(0);
  const [nbRoomDouble, setnbRoomDouble] = useState(0);
  const [PriceDouble, setPriceDouble] = useState(0);
  const [totaleDouble, settotaleDouble] = useState(0);
  const [nbRoomTriple, setnbRoomTriple] = useState(0);
  const [PriceTriple, setPriceTriple] = useState(0);
  const [totaleTriple, settotaleTriple] = useState(0);
  let { id } = useParams();
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/hotel/" + id)
      .then((res) => {
        setHotel(res.data);
        console.log(res.data);
        let r = [];
        for (let index = 0; index < res.data.rating; index++) {
          r.push("star");
        }
        setrate(r);
        setoptions(res.data.options);
        setprice(res.data.price);
      })
      .catch((err) => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <div className="col-3"></div>
        <div className="col-4">
          <Box
            sx={{
              width: 700,
              height: 600,
            }}
          >
            <div style={{ marginTop: "120px" }}>
              <ImageList
                sx={{ width: 700, height: 600 }}
                variant="quilted"
                cols={4}
                rowHeight={121}
              >
                {itemData.map((item) => (
                  <ImageListItem
                    key={item.img}
                    cols={item.cols || 1}
                    rows={item.rows || 1}
                  >
                    <img
                      {...srcset(item.img, 121, item.rows, item.cols)}
                      alt={item.title}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </div>
          </Box>
          <div className="col-3"></div>
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
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Room's type</th>
              <th scope="col">Occupation</th>
              <th scope="col">Pension </th>
              <th scope="col">Price </th>
            </tr>
          </thead>
          <tbody>
            {price.single ? (
              <tr>
                <th scope="row">
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    style={{ width: "60px" }}
                    onChange={(e) => {
                      setnbRoomSingle(parseInt(e.target.value));
                      settotaleSingle(PriceSingle * nbRoomSingle);
                    }}
                  >
                    <option selected value="0">
                      0
                    </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>

                  <h4> Single room </h4>
                </th>
                <td>
                  <img
                    src="https://img.icons8.com/material/30/000000/guest-male--v1.png"
                    alt=""
                  />
                </td>
                <td align="center">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Pension
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={single}
                      name="single"
                      label="Pension"
                      onChange={(e) => {
                        setSingle(e.target.value);
                        setPriceSingle(price.single[e.target.value]);
                        settotaleSingle(PriceSingle * nbRoomSingle);
                      }}
                    >
                      {price.single.lp ? (
                        <MenuItem value={"lp"}>lp</MenuItem>
                      ) : (
                        ""
                      )}
                      {price.single.dp ? (
                        <MenuItem value={"dp"}>dp</MenuItem>
                      ) : (
                        ""
                      )}
                      {price.single.pc ? (
                        <MenuItem value={"pc"}>pc</MenuItem>
                      ) : (
                        ""
                      )}
                      {price.single.ai ? (
                        <MenuItem value={"ai"}>ai</MenuItem>
                      ) : (
                        ""
                      )}
                    </Select>
                  </FormControl>
                  {/* <select
                    class="form-select"
                    aria-label="Default select example"
                    style={{ width: "200px" }}
                    onChange={(e) => {
                      setPriceSingle(price.single[e.target.value]);
                      settotaleSingle(PriceSingle * nbRoomSingle);
                    }}
                  >
                    {price.single.lp ? (
                      <option selected value="lp">
                        Breakfast
                      </option>
                    ) : (
                      ""
                    )}
                    {price.single.dp ? (
                      <option value="dp">Half Pension</option>
                    ) : (
                      ""
                    )}
                    {price.single.pc ? (
                      <option value="pc">Full Pension</option>
                    ) : (
                      ""
                    )}
                    {price.single.ai ? (
                      <option value="ai">All inclusif</option>
                    ) : (
                      ""
                    )}
                  </select> */}
                </td>
                <td>{totaleSingle}</td>
              </tr>
            ) : (
              ""
            )}

            {price.double ? (
              <tr>
                <th scope="row">
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    style={{ width: "60px" }}
                    onChange={(e) => {
                      setnbRoomDouble(parseInt(e.target.value));
                      settotaleDouble(PriceDouble * nbRoomDouble);
                    }}
                  >
                    <option selected value="0">
                      0
                    </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>

                  <h4> Double room</h4>
                </th>
                <td>
                  <img
                    src="https://img.icons8.com/material/30/000000/guest-male--v1.png"
                    alt=""
                  />
                  <img
                    src="https://img.icons8.com/material/30/000000/guest-male--v1.png"
                    alt=""
                  />
                </td>
                <td align="center">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Pension
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={double}
                      name="double"
                      label="Pension"
                      onChange={(e) => {
                        setDouble(e.target.value);
                        setPriceDouble(price.double[e.target.value]);
                        settotaleDouble(PriceDouble * nbRoomDouble);
                      }}
                    >
                      {price.double.lp ? (
                        <MenuItem value={"lp"}>lp</MenuItem>
                      ) : (
                        ""
                      )}
                      {price.double.dp ? (
                        <MenuItem value={"dp"}>dp</MenuItem>
                      ) : (
                        ""
                      )}
                      {price.double.pc ? (
                        <MenuItem value={"pc"}>pc</MenuItem>
                      ) : (
                        ""
                      )}
                      {price.double.ai ? (
                        <MenuItem value={"ai"}>ai</MenuItem>
                      ) : (
                        ""
                      )}
                    </Select>
                  </FormControl>
                  {/* <select
                    class="form-select"
                    aria-label="Default select example"
                    style={{ width: "200px" }}
                  >
                    {price.double.lp ? (
                      <option selected value="br">
                        Breakfast
                      </option>
                    ) : (
                      ""
                    )}
                    {price.double.dp ? (
                      <option value="hp">Half Pension</option>
                    ) : (
                      ""
                    )}
                    {price.double.pc ? (
                      <option value="fp">Full Pension</option>
                    ) : (
                      ""
                    )}
                    {price.double.ai ? (
                      <option value="ai">All inclusif</option>
                    ) : (
                      ""
                    )}
                  </select> */}
                </td>
                <td>{totaleDouble}</td>
              </tr>
            ) : (
              ""
            )}

            {price.triple ? (
              <tr>
                <th scope="row">
                  <FormControl>
                    <Select
                      value={nbRoomTriple}
                      name="nbRoomTriple"
                      onChange={(e) => {
                        console.log(e);
                        setnbRoomTriple(parseInt(e.target.value));
                        settotaleTriple(PriceTriple * nbRoomTriple);
                      }}
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
                  {/* <select
                    class="form-select"
                    aria-label="Default select example"
                    style={{ width: "60px" }}
                    onChange={(e) => {
                      setnbRoomTriple(parseInt(e.target.value));
                      settotaleTriple(PriceTriple * nbRoomTriple);
                    }}
                  >
                    <option selected value="0">
                      0
                    </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select> */}
                  <h4>triple room</h4>
                </th>
                <td>
                  {" "}
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
                </td>
                <td align="center">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Pension
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={triple}
                      name="triple"
                      label="Pension"
                      onChange={(e) => {
                        console.log(e);
                        setTriple(e.target.value);
                        setPriceTriple(price.triple[e.target.value]);
                        settotaleTriple(PriceTriple * nbRoomTriple);
                      }}
                    >
                      {price.triple.lp ? (
                        <MenuItem value="lp">lp</MenuItem>
                      ) : (
                        ""
                      )}
                      {price.triple.dp ? (
                        <MenuItem value="dp">dp</MenuItem>
                      ) : (
                        ""
                      )}
                      {price.triple.pc ? (
                        <MenuItem value="pc">pc</MenuItem>
                      ) : (
                        ""
                      )}
                      {price.triple.ai ? (
                        <MenuItem value="ai">ai</MenuItem>
                      ) : (
                        ""
                      )}
                    </Select>
                  </FormControl>
                  {/* <select
                    class="form-select"
                    aria-label="Default select example"
                    style={{ width: "200px" }}
                  >
                    {price.triple.lp ? (
                      <option selected value="br">
                        Breakfast
                      </option>
                    ) : (
                      ""
                    )}
                    {price.triple.dp ? (
                      <option value="hp">Half Pension</option>
                    ) : (
                      ""
                    )}
                    {price.triple.pc ? (
                      <option value="fp">Full Pension</option>
                    ) : (
                      ""
                    )}
                    {price.triple.ai ? (
                      <option value="ai">All inclusif</option>
                    ) : (
                      ""
                    )}
                  </select> */}
                </td>
                <td>{PriceTriple * nbRoomTriple}</td>
              </tr>
            ) : (
              ""
            )}
          </tbody>
        </table>
        <br />
      </div>
    </div>
  );
}
export default DetailHotel;
