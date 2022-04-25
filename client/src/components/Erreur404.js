import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { navbarActions } from "../Redux/navbarReducer";
import "../css/Erreur404.css";

function Erreur404() {
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    dispatch(navbarActions.updatenavbar(false));
  }, [dispatch]);
  return (
    <div className="container-fluid">
      <div className="row err">
        <div className="col-12">
          <div
            className="container-fluid"
            style={{ marginTop: "300px", marginBottom: "300px" }}
          >
            <div className="row">
              <h1 className="err3" align="right">
                Oups :
              </h1>
              <h1 className="err3" align="right">
                Can't find this page!!
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
    </div>
  );
}
export default Erreur404;
