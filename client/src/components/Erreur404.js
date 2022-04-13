import "../css/Erreur404.css";
import { Link } from "react-router-dom";
function Erreur404() {
  return (
    <div className="container-fluid">
      <div className="row err">
        <div className="container">
          <div className="row err2">
            <h1 className="err3" align="right">
              Oups :({" "}
            </h1>
            <h1 className="err3" align="right">
              Can't find this page!!{" "}
            </h1>
            <br />
            <br />
            <br />
            <Link to={"/"}>
              <div className="Search__actions" align="right">
                <button className="btn button">Go Back Home Page</button>
              </div>
            </Link>
            <br />
            <br />
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Erreur404;
