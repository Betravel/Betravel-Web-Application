import React, { useState } from "react";
import axios from "axios";
import "./SignIn.css";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const history = useNavigate();

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const loginChangeHandler = (e) => {
    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value,
    });
  };

  const login = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/login", loginInfo, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("LOGGGIN IN RESPONSE", res);
        if (res.data.msg === "success!") {
          history("/");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="Register">
      <form onSubmit={login}>
        <h1>Log In </h1>

        <div className="form-group">
          <label>Email</label>
          <input
            onChange={loginChangeHandler}
            type="text"
            className="form-control"
            name="email"
          />
          {/* {errors.email? <p className="text-danger">{errors.email.message}</p>: ""} */}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            onChange={loginChangeHandler}
            type="password"
            className="form-control"
            name="password"
          />
          {/* {errors.password? <p className="text-danger">{errors.password.message}</p>: ""} */}
        </div>

        <br />
        <div>
          <button type="submit">Log IN </button>
        </div>
      </form>
    </div>
  );
};
export default SignIn;
