import React, { useState } from "react";
import axios from "axios";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";

const SignUp = () => {

  const history = useNavigate();

  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confim, setconfirm] = useState("");

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/register", {
        username,
        email,
        password,
      })
      .then((res) => {
        console.log(res);
        if (res.data.errors) {
          setErrors(res.data.errors);
        } else {
          console.log("success!");
          history("/");
        }
      })
      .catch((err) => console.log(err));
  };

  
  return (
    <div className="Register">
      <form onSubmit={onSubmitHandler}>
        <h1>Register </h1>
        <div className="form-group">
          <label>UserName</label>
          <br />
          <input
            type="text"
            onChange={(e) => setusername(e.target.value)}
            value={username}
            className="form-control"
            name="username"
          />
          {errors.username ? (
            <p className="text-danger">{errors.username.message}</p>
          ) : (
            ""
          )}
        </div>

        <div className="form-group">
          <label>Email</label>
          <br />
          <input
            type="email"
            onChange={(e) => setemail(e.target.value)}
            value={email}
            className="form-control"
            name="email"
          />
          {errors.email ? (
            <p className="text-danger">{errors.email.message}</p>
          ) : (
            ""
          )}
        </div>

        <div className="form-group">
          <label>Password</label>
          <br />
          <input
            type="password"
            onChange={(e) => setpassword(e.target.value)}
            value={password}
            className="form-control"
            name="password"
          />
          {errors.password ? (
            <p className="text-danger">{errors.password.message}</p>
          ) : (
            ""
          )}
        </div>

        <div className="form-group">
          <label> Confirm Password</label>
          <br />
          <input
            type="password"
            onChange={(e) => setconfirm(e.target.value)}
            value={confim}
            className="form-control"
            name="confim"
          />
          {errors.confim ? (
            <p className="text-danger">{errors.confim.message}</p>
          ) : (
            ""
          )}
        </div>
        <br />
        <div>
          <button type="submit">Register </button>
        </div>
      </form>
    </div>
  );
};
export default SignUp;
