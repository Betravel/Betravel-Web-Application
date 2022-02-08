/* eslint-disable jsx-a11y/img-redundant-alt */
import { useState, useEffect } from "react";
import axios from "axios";
import CheckCircleOutlineSharpIcon from "@mui/icons-material/CheckCircleOutlineSharp";

function EditProfil() {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: 0,
  });

  const UserChangeHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users/getloggedinuser", {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.error(err));
  });

  return (
    <div class=" container">
      <br />
      <br />
      <div class="row">
        <div class="col-2"></div>
        <div class="col-8">
          <div class="card user-card-full">
            <div class="row m-l-0 m-r-0">
              <div class="col-sm-4 bg-c-lite-green user-profile">
                <div class="card-block">
                  <div class="m-b-25">
                    <img
                      src="https://img.icons8.com/bubbles/100/000000/user.png"
                      class="img-radius"
                      alt="User-Profile-Image"
                    />
                  </div>
                  <div class="updateIcon">
                    <button>
                      <CheckCircleOutlineSharpIcon />
                    </button>
                  </div>
                </div>
              </div>

              <div class="col-sm-8">
                <div class="card-block">
                  <h2 class="m-b-20 p-b-5 b-b-default f-w-600">Profil</h2>

                  <div class="row">
                    <div class="col-sm-6">
                      <p class="m-b-10 f-w-600">FirstName</p>
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={user.firstname}
                        style={{ textAlign: "center" }}
                        required
                      />
                    </div>
                    <div class="col-sm-6">
                      <p class="m-b-10 f-w-600">LastName</p>
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={user.lastname}
                        style={{ textAlign: "center" }}
                        required
                      />
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-sm-6">
                      <p class="m-b-10 f-w-600">Phone number</p>
                      <input
                        type="number"
                        className="form-control"
                        id="username"
                        value={user.phone}
                        style={{ textAlign: "center" }}
                        onChange={UserChangeHandler}
                        required
                      />
                    </div>
                    <div class="col-sm-6">
                      <p class="m-b-10 f-w-600">Email</p>
                      <input
                        type="email"
                        className="form-control"
                        id="username"
                        value={user.email}
                        style={{ textAlign: "center" }}
                        required
                      />
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
