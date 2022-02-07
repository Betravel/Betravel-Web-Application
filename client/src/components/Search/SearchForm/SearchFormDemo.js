import React, { useState } from "react";
import "./SearchFormDemo.css";

function SearchFormDemo() {
  const [Destination, setDestination] = useState("");
  const [Checkin, setCheckin] = useState("");
  const [Checkout, setCheckout] = useState("");
  const [Adultes, setAdultes] = useState(1);
  const [Enfants, setEnfants] = useState(0);
  const [Chambres, setChambres] = useState(1);

  const DestinationChangeHandler = (event) => {
    setDestination(event.target.value);
  };

  const CheckinChangeHandler = (event) => {
    setCheckin(event.target.value);
  };

  const CheckoutChangeHandler = (event) => {
    setCheckout(event.target.value);
  };

  const AddAdultes = () => {
    setAdultes(Adultes + 1);
  };

  const ReduceAdultes = () => {
    if (Adultes > 1) {
      setAdultes(Adultes - 1);
    }
  };

  const AddEnfants = () => {
    setEnfants(Enfants + 1);
  };

  const ReduceEnfants = () => {
    if (Enfants > 0) {
      setEnfants(Enfants - 1);
    }
  };

  const AddChambres = () => {
    setChambres(Chambres + 1);
  };

  const ReduceChambres = () => {
    if (Chambres > 1) {
      setChambres(Chambres - 1);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const Search = {
      destination: Destination,
      checkin: new Date(Checkin),
      checkout: new Date(Checkout),
      adultes: Adultes,
      enfants: Enfants,
      chambres: Chambres,
    };
    console.log(Search);
  };
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }

  today = yyyy + "-" + mm + "-" + dd;
  return (
    <div
      className="container"
      style={{ borderStyle: "double", backdropFilter: "blur(15px)" }}
    >
      <form onSubmit={submitHandler}>
        <br />
        <label className="form-label" htmlFor="destination">
          Destination
        </label>
        <div className="input-group mb-3">
          <span
            className="input-group-text"
            id="basic-addon1"
            style={{ backgroundColor: "white" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-geo-alt-fill"
              viewBox="0 0 16 16"
            >
              <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
            </svg>
          </span>
          <select
            value={Destination}
            onChange={DestinationChangeHandler}
            className="form-select"
            id="destination"
            style={{ textAlign: "center" }}
          >
            <option value="">Choisir votre destination ...</option>
            <option value="Hammamet">Hammamet</option>
            <option value="Sousse">Sousse</option>
            <option value="Djerba">Djerba</option>
            <option value="Mahdia">Mahdia</option>
          </select>
        </div>

        <label className="form-label" htmlFor="checkin">
          Check in
        </label>
        <div className="input-group mb-3">
          <span
            className="input-group-text"
            style={{ backgroundColor: "white" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-pin-map-fill"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M3.1 11.2a.5.5 0 0 1 .4-.2H6a.5.5 0 0 1 0 1H3.75L1.5 15h13l-2.25-3H10a.5.5 0 0 1 0-1h2.5a.5.5 0 0 1 .4.2l3 4a.5.5 0 0 1-.4.8H.5a.5.5 0 0 1-.4-.8l3-4z"
              />
              <path
                fillRule="evenodd"
                d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999z"
              />
            </svg>
          </span>
          <input
            type="date"
            className="form-control"
            min={today}
            value={Checkin}
            onChange={CheckinChangeHandler}
            id="checkin"
            style={{ textAlign: "center" }}
          />
        </div>
        <label className="form-label" htmlFor="checkin">
          Check out
        </label>

        <div className="input-group mb-3">
          <span
            className="input-group-text"
            style={{ backgroundColor: "white" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-box-arrow-right"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
              />
              <path
                fillRule="evenodd"
                d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
              />
            </svg>
          </span>
          <input
            type="date"
            className="form-control"
            min={Checkin}
            value={Checkout}
            onChange={CheckoutChangeHandler}
            style={{ textAlign: "center" }}
          />
        </div>

        <div className="container">
          <div className="row">
            <div className="col-6">
              <label className="form-label">Adultes</label>
              <div className="input-group mb-3">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  style={{ backgroundColor: "white" }}
                  onClick={ReduceAdultes}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-dash-square"
                    viewBox="0 0 16 16"
                    style={{ color: "#387ead" }}
                  >
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                  </svg>
                </button>
                <input
                  type="number"
                  className="form-control"
                  disabled
                  value={Adultes}
                  style={{ textAlign: "center" }}
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  style={{ backgroundColor: "white" }}
                  onClick={AddAdultes}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-plus-square"
                    viewBox="0 0 16 16"
                    style={{ color: "#387ead" }}
                  >
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="col-6">
              <label className="form-label">Enfants</label>
              <div className="input-group mb-3">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  style={{ backgroundColor: "white" }}
                  onClick={ReduceEnfants}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-dash-square"
                    viewBox="0 0 16 16"
                    style={{ color: "#387ead" }}
                  >
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                  </svg>
                </button>
                <input
                  type="text"
                  className="form-control"
                  disabled
                  value={Enfants}
                  style={{ textAlign: "center" }}
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  style={{ backgroundColor: "white" }}
                  onClick={AddEnfants}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-plus-square"
                    viewBox="0 0 16 16"
                    style={{ color: "#387ead" }}
                  >
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="col-12">
              <label className="form-label">Chambres</label>
              <div className="input-group mb-3">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  style={{ backgroundColor: "white" }}
                  onClick={ReduceChambres}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-dash-square"
                    viewBox="0 0 16 16"
                    style={{ color: "#387ead" }}
                  >
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                  </svg>
                </button>
                <input
                  type="text"
                  className="form-control"
                  disabled
                  value={Chambres}
                  style={{ textAlign: "center" }}
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  style={{ backgroundColor: "white" }}
                  onClick={AddChambres}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-plus-square"
                    viewBox="0 0 16 16"
                    style={{ color: "#387ead" }}
                  >
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="Search__actions">
          <button type="submit">Search</button>
        </div>
      </form>
      <br />
    </div>
  );
}

export default SearchFormDemo;
