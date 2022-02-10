import React, { useState } from "react";
import axios from "axios";
import "./SignIn.css";
import { useNavigate } from "react-router-dom";
import Card from "../UI/Card";

const SignIn = () => {
  const history = useNavigate();

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [erroremail, seterroremail] = useState("");
  const [errorpassword, seterrorpassword] = useState("");

  const login = (e) => {
    e.preventDefault();
    var loginInfo = { email, password };
    console.log(loginInfo);
    axios
      .get("http://localhost:8000/api/users/" + email)
      .then((res) => {
        if (res.data !== null) {
          if (res.data.confirmed) {
            axios
              .post("http://localhost:8000/api/login", loginInfo, {
                withCredentials: true,
              })
              .then((res) => {
                console.log("LOGGGIN IN RESPONSE", res);
                if (res.data.msg === "success!") {
                  axios
                    .get("http://localhost:8000/api/users/getloggedinuser", {
                      withCredentials: true,
                    })
                    .then((res) => {
                      sessionStorage.setItem(
                        "loggeduser",
                        JSON.stringify(res.data)
                      );
                    })
                    .catch((err) => console.error(err));
                  history("/");
                  sessionStorage.setItem("log", true);
                  window.location.reload(false);
                } else {
                  seterrorpassword("password incorrect");
                }
              })
              .catch((err) => console.log(err));
          } else {
            seterroremail("not confirmed");
          }
        } else {
          seterroremail("not found");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Card className="Login">
      <form onSubmit={login}>
        <h1>Log In </h1>
        <br />
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-at"
              viewBox="0 0 16 16"
            >
              <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z" />
            </svg>
          </span>
          <input
            type="email"
            className="form-control"
            onChange={(e) => setemail(e.target.value)}
            id="email"
            name="email"
            placeholder="Email"
            required
          />
        </div>
        {erroremail !== "" ? <p className="text-danger">{erroremail}</p> : ""}
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

        {errorpassword !== "" ? (
          <p className="text-danger">{errorpassword}</p>
        ) : (
          ""
        )}

        <br />
        <div>
          <button type="submit">Log IN </button>
        </div>
      </form>
    </Card>
  );
};
export default SignIn;
