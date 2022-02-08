/* eslint-disable jsx-a11y/img-redundant-alt */
import { useState, useEffect } from "react";
import "./Profil.css";
import axios from "axios";
import { Link } from "react-router-dom";
import ModeEditOutlineSharpIcon from "@mui/icons-material/ModeEditOutlineSharp";

function Profil() {
  const [user, setUser] = useState({});

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
                    <Link to="/editprofil">
                      <ModeEditOutlineSharpIcon />
                    </Link>
                  </div>
                </div>
              </div>

              <div class="col-sm-8">
                <div class="card-block">
                  <h2 class="m-b-20 p-b-5 b-b-default f-w-600">Profil</h2>

                  <div class="row">
                    <div class="col-sm-6">
                      <p class="m-b-10 f-w-600">FirstName</p>
                      <h6 class="text-muted f-w-400">{user.firstname}</h6>
                    </div>
                    <div class="col-sm-6">
                      <p class="m-b-10 f-w-600">LastName</p>
                      <h6 class="text-muted f-w-400">{user.lastname}</h6>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-sm-6">
                      <p class="m-b-10 f-w-600">Phone number</p>
                      <h6 class="text-muted f-w-400">{user.phone}</h6>
                    </div>
                    <div class="col-sm-6">
                      <p class="m-b-10 f-w-600">Email</p>
                      <h6 class="text-muted f-w-400">{user.email}</h6>
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

export default Profil;
