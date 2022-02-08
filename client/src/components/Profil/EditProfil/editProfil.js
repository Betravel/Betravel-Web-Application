/* eslint-disable jsx-a11y/img-redundant-alt */
import { useState } from "react";
import axios from "axios";
import CheckCircleOutlineSharpIcon from "@mui/icons-material/CheckCircleOutlineSharp";
import { useNavigate } from "react-router-dom";

function EditProfil() {
  const history = useNavigate();

  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("loggeduser"))
  );

  const UserChangeHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  //Update
  const updateUser = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:8000/api/user/" + user._id, user)
      .then((res) => {
        console.log(res);
        sessionStorage.setItem("loggeduser", JSON.stringify(user));
        history("/profil");
      })
      .catch((err) => console.error(err));
  };
  console.log("user", user);

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
                    <button onClick={updateUser} className="btn">
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
                        name="firstname"
                        value={user.firstname}
                        style={{ textAlign: "center" }}
                        onChange={UserChangeHandler}
                        required
                      />
                    </div>
                    <div class="col-sm-6">
                      <p class="m-b-10 f-w-600">LastName</p>
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="lastname"
                        value={user.lastname}
                        style={{ textAlign: "center" }}
                        onChange={UserChangeHandler}
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
                        name="phone"
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
                        name="email"
                        value={user.email}
                        style={{ textAlign: "center" }}
                        onChange={UserChangeHandler}
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
