/* eslint-disable jsx-a11y/img-redundant-alt */
import { useState, useEffect } from "react";
import "./Profil.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ModeEditOutlineSharpIcon from "@mui/icons-material/ModeEditOutlineSharp";

function Profil() {
  const history = useNavigate();
  if (sessionStorage.getItem("log")) {
  } else {
    history("/SignIn");
  }
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
  }, []);

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
                  <div className="updateIcon" >
                    <Link to="/Profil/Edit">
                      <ModeEditOutlineSharpIcon style={{color:"white"}}/>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="col-sm-8">
                <div className="card-block">
                  <h2 className="m-b-20 p-b-5 b-b-default f-w-600">Profil</h2>

                  <div className="row">
                    <div className="col-sm-6">
                      <p className="m-b-10 f-w-600">FirstName</p>
                      <h6 className="text-muted f-w-400">{user.firstname}</h6>
                    </div>
                    <div className="col-sm-6">
                      <p className="m-b-10 f-w-600">LastName</p>
                      <h6 className="text-muted f-w-400">{user.lastname}</h6>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-6">
                      <p className="m-b-10 f-w-600">Phone number</p>
                      <h6 className="text-muted f-w-400">{user.phone}</h6>
                    </div>
                    <div className="col-sm-6">
                      <p className="m-b-10 f-w-600">Email</p>
                      <h6 className="text-muted f-w-400">{user.email}</h6>
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
