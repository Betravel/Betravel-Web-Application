import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { navbarActions } from "../Redux/navbarReducer";
import TextField from "@mui/material/TextField";

function ResetPassword() {
  const dispatch = useDispatch();
  const [email, setemail] = useState("");
  const history = useNavigate();
  useEffect(() => {
    dispatch(navbarActions.updatenavbar(false));
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
    <div className="container-fluid" style={{ backgroundColor: "#E9FBF3" }}>
      <div className="container">
        <div className="row">
          <div
            class="card"
            style={{
              backdropFilter: "blur(30px)",
              marginTop: "200px",
              marginBottom: "200px",
              backgroundColor: "white",
            }}
          >
            <div class="card-body">
              <form onSubmit={Resetpass}>
                <br />
                <h3>Find your account </h3>
                <br />
                <TextField
                  type="email"
                  name="email"
                  label="Enter your email"
                  variant="outlined"
                  onChange={(e) => setemail(e.target.value)}
                  fullWidth
                  required
                />
                <br />
                <br />
                <div className="Search__actions">
                  <button type="submit"> Next </button>
                </div>
                <br />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
