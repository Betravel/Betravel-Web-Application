import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
function Confirmed() {
  const history = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/user/" + id)
      .then((res) => {
        var user = res.data;
        if (user.confirmed) {
          alert("Account already confirmed !");
          history("/SignIn");
        } else {
          user.confirmed = true;
          axios
            .put("http://localhost:8000/api/user/" + user._id, user)
            .then((res) => {
              history("/SignIn?path=home");
              alert("Email Confirmed ! 🥳 ");
            })
            .catch((err) => alert("Error Server"));
        }
      })
      .catch((err) => alert("Error Server"));
  }, [history, id]);

  return (
    <div>
      <h1>Email Confirmed </h1>
    </div>
  );
}
export default Confirmed;
