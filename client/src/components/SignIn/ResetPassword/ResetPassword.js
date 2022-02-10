import Card from "../../UI/Card";
import React, { useState } from "react";
import axios from "axios";

function ResetPassword() {
  const [email, setemail] = useState("");

  const Resetpass = (e) => {
    e.preventDefault();
    axios
      .get("http://localhost:8000/api/users/" + email)
      .then((res) => {
        console.log(res);
        if (res.data === null) {
          alert("email not correct !!");
        } else {
          axios
            .post("http://localhost:8000/send", { email })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
          console.log("success!");
          alert("Check your email to continue !!");
        }
      })
      .catch((err) => {
        console.log(err);
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
