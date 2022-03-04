import Card from "../../UI/Card";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ConfirmPassword() {
  const [password, setpassword] = useState("");
  const [confim, setconfim] = useState("");
  const [error, seterror] = useState(false);
  let { id } = useParams();
  const history = useNavigate();

  const Confirmpass = (e) => {
    e.preventDefault();

    if (password === confim) {
      axios
        .get("http://localhost:8000/api/user/" + id)
        .then((response) => {
          var user = response.data;
          user.password = password;
          axios
            .put("http://localhost:8000/api/user/update", user)
            .then((response) => {
              history("/SignIn");
            })
            .catch((err) => alert("Error Server"));
        })
        .catch((err) => alert("Error Server"));
    } else {
      seterror(true);
    }
  };
  return (
    <Card className="Login">
      <form onSubmit={Confirmpass}>
        {" "}
        <h3>Enter your new Password </h3>
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-shield-lock"
              viewBox="0 0 16 16"
            >
              <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z" />
              <path d="M9.5 6.5a1.5 1.5 0 0 1-1 1.415l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99a1.5 1.5 0 1 1 2-1.415z" />
            </svg>
          </span>

          <input
            type="password"
            className="form-control"
            onChange={(e) => setpassword(e.target.value)}
            id="password"
            name="password"
            placeholder="Password"
            required
          />
        </div>
        <label htmlFor="password" className="form-label">
          Confirm Password
        </label>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-shield-lock"
              viewBox="0 0 16 16"
            >
              <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z" />
              <path d="M9.5 6.5a1.5 1.5 0 0 1-1 1.415l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99a1.5 1.5 0 1 1 2-1.415z" />
            </svg>
          </span>
          <input
            type="password"
            className="form-control"
            onChange={(e) => setconfim(e.target.value)}
            id="Confirm Password"
            name="Confirm Password"
            placeholder="Confirm Password"
            required
          />
        </div>
        {error ? <p className="text-danger">Doesn't match </p> : ""}
        <br />
        <div>
          <button type="submit">Confirm</button>
        </div>
      </form>
    </Card>
  );
}

export default ConfirmPassword;
