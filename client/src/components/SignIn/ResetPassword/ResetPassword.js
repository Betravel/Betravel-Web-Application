import Card from "../../UI/Card";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const [email, setemail] = useState("");
  const history = useNavigate();

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
              msg:
                '<a href="http://localhost:3000/Confirmpass/' +
                res._id.toString() +
                '"> Reset your password here ! </a>',
              sjt: "Reset Password",
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
