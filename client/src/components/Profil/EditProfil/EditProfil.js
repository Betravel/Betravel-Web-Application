/* eslint-disable jsx-a11y/img-redundant-alt */
import { useState } from "react";
import axios from "axios";
import CheckCircleOutlineSharpIcon from "@mui/icons-material/CheckCircleOutlineSharp";
import { useNavigate } from "react-router-dom";

function EditProfil() {
  const history = useNavigate();

  if (sessionStorage.getItem("log")) {
  } else {
    history("/SignIn");
  }

  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("loggeduser"))
  );
  const [password, setpassword] = useState("");
  const [confim, setconfim] = useState("");
  const [error, seterror] = useState(false);

  const UserChangeHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  //Update
  const updateUser = (e) => {
    e.preventDefault();
    if (password === confim) {
      if (password === "") {
        axios
          .put("http://localhost:8000/api/user/" + user._id, user)
          .then((res) => {
            sessionStorage.setItem("loggeduser", JSON.stringify(user));
            history("/Profil");
          })
          .catch((err) => console.error(err));
      } else {
        user.password = password;
        axios
          .put("http://localhost:8000/api/user/update", user)
          .then((response) => {
            axios
              .get("http://localhost:8000/api/user/" + user._id)
              .then((response) => {
                sessionStorage.setItem(
                  "loggeduser",
                  JSON.stringify(response.data)
                );
              })
              .catch((err) => alert("Error Server"));
            history("/Profil");
          })
          .catch((err) => alert("Error Server"));
      }
    } else {
      seterror(true);
    }
  };

  return (
    <div className=" container">
      <br />
      <br />
      <div className="row">
        <div className="col-2"></div>
        <div className="col-8">
          <div className="card user-card-full">
            <div className="row m-l-0 m-r-0">
              <div className="col-sm-4 bg-c-lite-green user-profile">
                <div className="card-block">
                  <div className="m-b-25">
                    <img
                      src="https://img.icons8.com/bubbles/100/000000/user.png"
                      className="img-radius"
                      alt="User-Profile-Image"
                    />
                  </div>
                  <div className="updateIcon">
                    <button onClick={updateUser} className="btn" style={{color:"white"}}>
                      <CheckCircleOutlineSharpIcon />
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-sm-8">
                <div className="card-block">
                  <h2 className="m-b-20 p-b-5 b-b-default f-w-600">Profil</h2>
                  <br />
                  <div className="row">
                    <div className="col-sm-6">
                      <p className="m-b-10 f-w-600">FirstName</p>
                      <input
                        type="text"
                        className="form-control"
                        id="firstname"
                        name="firstname"
                        value={user.firstname}
                        style={{ textAlign: "center" }}
                        onChange={UserChangeHandler}
                        required
                      />
                    </div>
                    <div className="col-sm-6">
                      <p className="m-b-10 f-w-600">LastName</p>
                      <input
                        type="text"
                        className="form-control"
                        id="lastname"
                        name="lastname"
                        value={user.lastname}
                        style={{ textAlign: "center" }}
                        onChange={UserChangeHandler}
                        required
                      />
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-sm-6">
                      <p className="m-b-10 f-w-600">Phone number</p>
                      <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={user.phone}
                        style={{ textAlign: "center" }}
                        pattern="[0-9]{8}"
                        onChange={UserChangeHandler}
                        required
                      />
                    </div>
                    <div className="col-sm-6">
                      <p className="m-b-10 f-w-600">Email</p>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={user.email}
                        style={{ textAlign: "center" }}
                        onChange={UserChangeHandler}
                        required
                      />
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-sm-6">
                      <h6 className="text-danger">Optional*:</h6>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <p className="m-b-10 f-w-600">Password</p>
                      <input
                        type="password"
                        className="form-control"
                        onChange={(e) => setpassword(e.target.value)}
                        id="password"
                        name="password"
                        placeholder="Password"
                        style={{ textAlign: "center" }}
                        required
                      />
                    </div>
                    <div className="col-sm-6">
                      <p className="m-b-10 f-w-600">Confirm Password</p>
                      <input
                        type="password"
                        className="form-control"
                        onChange={(e) => setconfim(e.target.value)}
                        id="confim"
                        name="confim"
                        placeholder="Confirm Password"
                        style={{ textAlign: "center" }}
                        required
                      />
                      {error ? (
                        <p className="text-danger">Doesn't match </p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfil;
