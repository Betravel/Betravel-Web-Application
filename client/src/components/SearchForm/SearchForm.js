import React, { useState } from "react";

import "./SearchForm.css";

function SearchForm() {
  const [Destination, setDestination] = useState("");
  const [Checkin, setCheckin] = useState("");
  const [Checkout, setCheckout] = useState("");
  const [Guests, setGuests] = useState("");

  const DestinationChangeHandler = (event) => {
    setDestination(event.target.value);
  };

  const CheckinChangeHandler = (event) => {
    setCheckin(event.target.value);
  };

  const CheckoutChangeHandler = (event) => {
    setCheckout(event.target.value);
  };

  const GuestsChangeHandler = (event) => {
    setGuests(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const Search = {
      destination: Destination,
      checkin: new Date(Checkin),
      checkout: new Date(Checkout),
      guests: Guests,
    };
    console.log(Search);
    setDestination("");
    setCheckin("");
    setCheckout("");
    setGuests("");
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
    <div className="Search">
      <h4> BOOK NOW ! </h4>
      <form onSubmit={submitHandler}>
        <div className="Search__controls">
          <div className="Search__control1">
            <label>Destination</label>
            <select value={Destination} onChange={DestinationChangeHandler}>
              <option value="">Choisir votre destination ...</option>
              <option value="Hammamet">Hammamet</option>
              <option value="Sousse">Sousse</option>
              <option value="Djerba">Djerba</option>
              <option value="Mahdia">Mahdia</option>
            </select>
          </div>
          <div className="Search__control">
            <label>Check-in</label>
            <input
              type="date"
              min={today}
              value={Checkin}
              onChange={CheckinChangeHandler}
            />
          </div>
          <div className="Search__control">
            <label>Check-out</label>
            <input
              type="date"
              min={today}
              value={Checkout}
              onChange={CheckoutChangeHandler}
            />
          </div>
          <div className="Search__control1">
            <label>Guests</label>
            <br />
            <input type="text" value={Guests} onChange={GuestsChangeHandler} />
          </div>
        </div>
        <div className="Search__actions">
          <button type="submit">Search</button>
        </div>
      </form>
      <br/>
    </div>
  );
}

export default SearchForm;
