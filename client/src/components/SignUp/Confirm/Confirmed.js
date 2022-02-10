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
        user.confirmed = true;
        axios
          .put("http://localhost:8000/api/user/" + user._id, user)
          .then((res) => {
            console.log(res);
            history("/SignIn");
            alert("Email Confirmed ! 🥳 ");
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  }, [history, id]);

  return (
    <Card>
      <h1>Email Confirmed</h1>
    </Card>
  );
}
export default Confirmed;
