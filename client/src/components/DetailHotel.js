import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
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
      </div>
    </div>
  );
}
export default DetailHotel;
