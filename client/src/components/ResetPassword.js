import Card from "./Card";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { navbarActions } from "../Redux/navbarReducer";

function ResetPassword() {
  const dispatch = useDispatch();
  const [email, setemail] = useState("");
  const history = useNavigate();
  useEffect(() => {
    dispatch(navbarActions.updatenavbar(true));
  }, [dispatch]);
  const Resetpass = (e) => {
    e.preventDefault();
    axios
      .get("http://localhost:8000/api/users/" + email)
      .then((res) => {
        if (res.data === null) {
          alert("email not correct !!");
        } else {
          axios
            .post("http://localhost:8000/send", {
              email,
              type: "reset",
            })
            .then((res) => {
              alert("Check your email to continue !!");
              history("/SignIn");
            })
            .catch((err) => alert("Error Server"));
        }
      })
      .catch((err) => {
        alert("Error Server");
      });
  };
  return (
    <Card className="Login">
      <form onSubmit={Resetpass}>
        {" "}
        <h3>Find your account </h3>
        <label htmlFor="email" className="form-label">
          Enter your email
        </label>
        <input
          type="email"
          className="form-control"
          onChange={(e) => setemail(e.target.value)}
          id="email"
          name="email"
          placeholder="Email"
          required
        />
        <br />
        <div>
          <button type="submit">Next</button>
        </div>
      </form>
    </Card>
  );
}

export default ResetPassword;
