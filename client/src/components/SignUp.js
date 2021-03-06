import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/SignUp.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { navbarActions } from "../Redux/navbarReducer";

function SignUp() {
  const dispatch = useDispatch();
  const history = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(navbarActions.updatenavbar(true));
    if (sessionStorage.getItem("log")) {
      history("/Profil");
    }
  }, [dispatch, history]);
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [phone, setphone] = useState(0);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confim, setconfim] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confim: "",
  });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .get("http://localhost:8000/api/users/" + email)
      .then((res) => {
        if (res.data === null) {
          axios
            .post("http://localhost:8000/api/register", {
              firstname,
              lastname,
              phone,
              email,
              password,
              confirm: confim,
              confirmed: false,
              type: "user",
            })
            .then((res) => {
              if (res.data.errors) {
                setErrors(res.data.errors);
              } else {
                axios
                  .post("http://localhost:8000/account", {
                    email,
                    type: "welcome",
                  })
                  .then((res) => {
                    alert("Confirm your account , link sent by mail !");
                    history("/SignIn?path=home");
                  })
                  .catch((err) => alert("Error Server"));
              }
            })
            .catch((err) => alert("Error Server"));
        } else {
          alert(" Email already exist !!");
        }
      })
      .catch((err) => alert("Error Server"));
  };

  return (
    <div className="container-fluid">
      <div className="row Register">
        <div className="col-12">
          <div className="container">
            <div className="row">
              <div
                className="card"
                style={{
                  backdropFilter: "blur(30px)",
                  marginTop: "150px",
                  marginBottom: "150px",
                  backgroundColor: "#E9FBF3",
                }}
              >
                <div className="card-body">
                  <form onSubmit={onSubmitHandler}>
                    <h1>Register </h1>
                    <br />
                    <label htmlFor="firstname" className="form-label">
                      Username
                    </label>
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          className="bi bi-person"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                        </svg>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setfirstname(e.target.value)}
                        id="firstname"
                        placeholder="Firstname"
                        required
                      />
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setlastname(e.target.value)}
                        id="lastname"
                        placeholder="Lastname"
                        required
                      />
                    </div>
                    {errors.username ? (
                      <p className="text-danger">{errors.username.message}</p>
                    ) : (
                      ""
                    )}
                    <label htmlFor="phone" className="form-label">
                      Phone Number
                    </label>
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          className="bi bi-telephone"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                        </svg>
                      </span>
                      <input
                        type="tel"
                        className="form-control"
                        onChange={(e) => setphone(e.target.value)}
                        id="phone"
                        placeholder="Phone Number"
                        pattern="[0-9]{8}"
                        required
                      />
                    </div>
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
                        placeholder="Email"
                        required
                      />
                    </div>
                    {errors.email ? (
                      <p className="text-danger">{errors.email.message}</p>
                    ) : (
                      ""
                    )}

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
                        placeholder="Password"
                        required
                      />
                    </div>
                    {errors.password ? (
                      <p className="text-danger">{errors.password.message}</p>
                    ) : (
                      ""
                    )}
                    <label htmlFor="confim" className="form-label">
                      Confirm Password
                    </label>
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          className="bi bi-lock"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
                        </svg>
                      </span>
                      <input
                        type="password"
                        className="form-control"
                        onChange={(e) => setconfim(e.target.value)}
                        id="confim"
                        placeholder="Confirm Password"
                        required
                      />
                    </div>
                    {errors.confim ? (
                      <p className="text-danger">{errors.confim.message}</p>
                    ) : (
                      ""
                    )}
                    <br />
                    <div className="Search__actions">
                      <button type="submit">Register </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SignUp;
