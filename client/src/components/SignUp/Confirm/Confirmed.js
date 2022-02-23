import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../../UI/Card";
function Confirmed() {
  const history = useNavigate();
  let { id } = useParams();

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
              history("/SignIn");
              alert("Email Confirmed ! 🥳 ");
            })
            .catch((err) => alert("Error Server"));
        }
      })
      .catch((err) => alert("Error Server"));
  }, [history, id]);

  return (
    <Card>
      <h1>Email Confirmed </h1>
    </Card>
  );
}
export default Confirmed;
