import React from "react";
import "./home.css";
// import Card from "../UI/Card";
import SearchFormHotel from "../Search/SearchForm/SearchFormHotel";
import img from "../../assets/Image.jpg";

function Home() {
  return (
    <div className="container-fluid">
      <div className="row row1">
        <div className="container">
          <div className="row row2">
            <h1 className="title">Enjoy your trip </h1>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <SearchFormHotel />
          </div>
        </div>
      </div>
      <div className="row ">
        <div className="container">
          <br />
          <br />
          <br />
          <br />

          <div className="row row3">
            <div className="col-4">
              <img
                src="https://img.icons8.com/external-filled-outline-satawat-anukul/100/000000/external-summer-summer-filled-outline-filled-outline-satawat-anukul-43.png"
                alt=""
              />{" "}
              Best destinations
            </div>
            <div className="col-4">
              <img
                src="https://img.icons8.com/fluency/100/000000/card-wallet.png"
                alt=""
              />{" "}
              Best prices{" "}
            </div>
            <div className="col-4">
              <img
                src="https://img.icons8.com/external-itim2101-lineal-color-itim2101/100/000000/external-support-services-contact-and-message-itim2101-lineal-color-itim2101-2.png"
                alt=""
              />
              Best services
            </div>
          </div>
          <br />
          <br />
          <br />
        </div>
      </div>
      <div className="row">
        <div className="container">
          <div className="row">
            <h1
              style={{
                color: "#2a211c",
              }}
            >
              Best deals{" "}
            </h1>
          </div>
          <div className="row">
            <div className="col-4">
              <div className="card">
                <img src={img} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Hotel 1</h5>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <a href="/" className="btn btn-primary">
                    Go somewhere
                  </a>
                </div>
              </div>
            </div>

            <div className="col-4">
              <div className="card">
                <img src={img} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Hotel 2</h5>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <a href="/" className="btn btn-primary">
                    Go somewhere
                  </a>
                </div>
              </div>
            </div>

            <div className="col-4">
              <div className="card">
                <img src={img} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Hotel 3</h5>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <a href="/" className="btn btn-primary">
                    Go somewhere
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <button
              className="btn btn-light"
              style={{
                fontWeight: "bolder",
                fontSize: "30px",
                " textdecoration": "underline",
              }}
            >
              {" "}
              see more...
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
