import { alpha, styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import axios from "axios";

function UsersOverview() {
  const IconWrapperStyle = styled("div")(({ theme }) => ({
    margin: "auto",
    display: "flex",
    borderRadius: "50%",
    alignItems: "center",
    width: theme.spacing(8),
    height: theme.spacing(8),
    justifyContent: "center",
    marginBottom: theme.spacing(3),
    color: theme.palette.info.dark,
    backgroundImage: `linear-gradient(135deg, ${alpha(
      theme.palette.info.dark,
      0
    )} 0%, ${alpha(theme.palette.info.dark, 0.24)} 100%)`,
  }));
  const [users, setusers] = useState([]);
  const [newusers, setnewusers] = useState(0);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users/all")
      .then((res) => {
        setusers(res.data);
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth(); //January is 0 so need to add 1 to make it 1!
        var yyyy = today.getFullYear();
        var i = 0;
        res.data.forEach((user) => {
          var d = new Date(user.createdAt);
          if (
            d.getDate() === dd &&
            d.getMonth() === mm &&
            d.getFullYear() === yyyy
          ) {
            i += 1;
          }
        });
        setnewusers(i);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div
      className="card"
      style={{
        width: "auto",
        marginRight: "auto",
        marginLeft: "auto",
      }}
    >
      <div className="card-body">
        <IconWrapperStyle>
          <img
            src="https://img.icons8.com/ios-filled/40/01579b/user-group-man-man.png"
            alt=""
          />
        </IconWrapperStyle>
        <h5 className="card-title">{users.length}</h5>
        <h6 className="card-subtitle mb-2 text-muted">Users</h6>
        <p className="card-text ">+{newusers} today</p>
      </div>
    </div>
  );
}

export default UsersOverview;
