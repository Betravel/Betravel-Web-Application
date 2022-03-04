import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import React, { useEffect, useState } from "react";
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
  var id = "6218bde9dcc29a5ce15285ab";
  const [hotel, setHotel] = useState([]);
  const [rate, setrate] = useState([]);
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
      })
      .catch((err) => console.error(err));
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
        <div className="col-3">
          <h6 align="left">
            {" "}
            * Free wifi &nbsp;
            <img
              src="https://img.icons8.com/external-flatart-icons-solid-flatarticons/24/000000/external-wifi-network-and-cloud-computing-flatart-icons-solid-flatarticons.png"
              alt=""
            />{" "}
          </h6>
        </div>
        <div className="col-3">
          <h6 align="left">
            * Pool &nbsp;
            <img
              src="https://img.icons8.com/external-jumpicon-glyph-ayub-irawan/24/000000/external-pool-surfing-jumpicon-glyph-jumpicon-glyph-ayub-irawan.png"
              alt=""
            />
          </h6>
        </div>
        <div className="col-3">
          <h6 align="left">
            {" "}
            * Restaurant &nbsp;
            <img
              src="https://img.icons8.com/external-xnimrodx-lineal-xnimrodx/24/000000/external-restaurant-hotel-xnimrodx-lineal-xnimrodx.png"
              alt=""
            />
          </h6>
        </div>
        <div className="col-3">
          <h6 align="left">
            {" "}
            * Parking &nbsp;
            <img
              src="https://img.icons8.com/external-xnimrodx-lineal-xnimrodx/24/000000/external-restaurant-hotel-xnimrodx-lineal-xnimrodx.png"
              alt=""
            />
          </h6>
        </div>{" "}
        <div className="col-3">
          <h6 align="left">
            {" "}
            * sea view &nbsp;
            <img
              src="https://img.icons8.com/external-xnimrodx-lineal-xnimrodx/24/000000/external-restaurant-hotel-xnimrodx-lineal-xnimrodx.png"
              alt=""
            />
          </h6>
        </div>{" "}
      </div>

      <div className="row">
        <h3 aligntext="right">Availablity</h3>
      </div>
    </div>
  );
}
export default DetailHotel;
