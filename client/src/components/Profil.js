import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authActions, getAuth, logout } from "../Redux/authReducer";
import { navbarActions } from "../Redux/navbarReducer";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function Profil() {
  const [disable, setdisable] = useState(false);
  const [password, setpassword] = useState("");
  const [confim, setconfim] = useState("");
  const [error, seterror] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getAuth());
    dispatch(navbarActions.updatenavbar(false));
  }, [dispatch]);

  const changeDisabled = (e) => {
    e.preventDefault();
    setdisable(true);
  };

  const updateUser = (e) => {
    dispatch(
      authActions.updateuser({ type: e.target.name, value: e.target.value })
    );
  };

  const confirmUpdateUser = (e) => {
    if (password === confim) {
      if (password === "") {
        axios
          .put("http://localhost:8000/api/user/" + user._id, user)
          .then((res) => {
            setdisable(false);
          })
          .catch((err) => console.error(err));
      } else {
        user.password = password;
        axios
          .put("http://localhost:8000/api/user/update", user)
          .then((response) => {
            setdisable(false);
          })
          .catch((err) => alert("Error Server"));
      }
    } else {
      seterror(true);
    }
  };

  const deleteUser = () => {
    axios
      .delete("http://localhost:8000/api/user/delete/" + user._id)
      .then((res) => {
        dispatch(logout());
        window.location.reload(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className=" container" style={{ marginTop: "120px" }}>
      <div className="row">
        <div className="col-12">
          <div className="card" style={{ marginBottom: "50px" }}>
            <div
              style={{
                backgroundColor: "#abc4b1",
                marginBottom: "20px",
              }}
            >
              <img
                src="https://img.icons8.com/external-smashingstocks-glyph-smashing-stocks/150/FFFFFF/external-profile-web-smashingstocks-glyph-smashing-stocks.png"
                alt=""
              />
            </div>
            <div className="card-body">
              <div className="row">
                <div
                  className="col-lg-6 col-sm-12"
                  style={{ marginBottom: "20px" }}
                >
                  <TextField
                    name="firstname"
                    label="First Name"
                    variant="outlined"
                    value={user.firstname}
                    fullWidth
                    disabled={!disable}
                    onChange={updateUser}
                  />
                </div>
                <div className="col-lg-6 col-sm-12">
                  <TextField
                    name="lastname"
                    label="Last Name"
                    variant="outlined"
                    value={user.lastname}
                    fullWidth
                    disabled={!disable}
                    onChange={updateUser}
                  />
                </div>
              </div>
              <br />
              <div className="row">
                <div
                  className="col-lg-6 col-sm-12"
                  style={{ marginBottom: "20px" }}
                >
                  <TextField
                    name="email"
                    label="Email"
                    variant="outlined"
                    value={user.email}
                    fullWidth
                    disabled={!disable}
                    onChange={updateUser}
                  />
                </div>
                <div className="col-lg-6 col-sm-12">
                  <TextField
                    name="phone"
                    label="Phone"
                    variant="outlined"
                    value={user.phone}
                    fullWidth
                    disabled={!disable}
                    onChange={updateUser}
                  />
                </div>
              </div>
              <br />
              {disable ? (
                <div>
                  <div className="row">
                    <div
                      className="col-lg-6 col-sm-12"
                      style={{ marginBottom: "20px" }}
                    >
                      <TextField
                        id="password"
                        label="Password"
                        variant="outlined"
                        value={password}
                        fullWidth
                        disabled={!disable}
                        onChange={(e) => setpassword(e.target.value)}
                      />
                    </div>
                    <div className="col-lg-6 col-sm-12">
                      <TextField
                        id="confim"
                        label="Confirm Password"
                        variant="outlined"
                        value={confim}
                        fullWidth
                        disabled={!disable}
                        onChange={(e) => setconfim(e.target.value)}
                      />
                    </div>
                  </div>
                  <br />
                  {error ? <p className="text-danger">Doesn't match </p> : ""}
                </div>
              ) : (
                ""
              )}
            </div>
            <div
              align="right"
              style={{ marginRight: "20px", marginBottom: "10px" }}
            >
              <button className="btn" onClick={() => setOpen(true)}>
                <img
                  src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/50/000000/external-delete-multimedia-kiranshastry-lineal-kiranshastry.png"
                  alt=""
                />
              </button>
              {disable ? (
                <button className="btn" onClick={confirmUpdateUser}>
                  <img
                    src="https://img.icons8.com/ios/50/000000/save--v1.png"
                    alt=""
                  />
                </button>
              ) : (
                <button className="btn" onClick={changeDisabled}>
                  <img
                    src="https://img.icons8.com/external-tanah-basah-detailed-outline-tanah-basah/50/000000/external-pen-user-interface-tanah-basah-detailed-outline-tanah-basah.png"
                    alt=""
                  />
                </button>
              )}
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Delete User?"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete this User?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Disagree</Button>
                  <Button onClick={deleteUser} autoFocus>
                    Agree
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profil;
