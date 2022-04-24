import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getEvents } from "../Redux/eventsReducer";
import { Link } from "react-router-dom";
import { navbarActions } from "../Redux/navbarReducer";
function ListeEvent() {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(navbarActions.updatenavbar(false));
    dispatch(getEvents());
  }, [dispatch]);

  return (
    <div className="container" style={{ marginTop: "120px" }}>
      <div className="row">
        {events.map((event, index) => (
          <div className="col-4" key={index}>
            <div className="card" style={{ width: "100%", height: "100%" }}>
              <img
                src={event.images[0].url}
                alt=""
                width="100%"
                height="300px"
              />
              <div className="card-body">
                <h5 className="card-title">{event.name}</h5>
                <div>
                  <img
                    src="https://res.cloudinary.com/betravel/image/upload/v1646934456/BeTravel/assets/icons8-place-marker_zknh1z.gif"
                    alt=""
                    width="30"
                  />
                  {event.location}
                </div>
                <div className="row">
                  <div align="left">
                    <div className="row ">
                      <div className="col-4">
                        <img
                          src="https://img.icons8.com/ios/20/000000/calendar--v1.png"
                          alt=""
                        />{" "}
                      </div>
                      {event.type === "randonnee" ? (
                        <div className="col-8">
                          {event.date.day.getDate() +
                            "/" +
                            (event.date.day.getMonth() + 1) +
                            "/" +
                            event.date.day.getFullYear()}
                        </div>
                      ) : (
                        <div className="col-8">
                          {event.date.from.getDate() +
                            "/" +
                            (event.date.from.getMonth() + 1) +
                            "/" +
                            event.date.from.getFullYear()}
                        </div>
                      )}
                    </div>
                  </div>
                  <br />
                  <div align="left">
                    <div className="row ">
                      <div className="col-4">
                        <img
                          src="https://img.icons8.com/ios-filled/20/000000/trainers.png"
                          alt=""
                        />{" "}
                      </div>
                      <div className="col-8">Circuit de 20 Km</div>
                    </div>
                  </div>
                  <br />
                  <br />
                  <div className="row">
                    <div className="col-12">
                      <Link to={"/Event/Detail/" + event._id}>
                        <div className="Search__actions">
                          <button className="btn button"> show details</button>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <br />
      <Stack spacing={2} alignItems="center">
        <Pagination count={5} />
      </Stack>
    </div>
  );
}
export default ListeEvent;
