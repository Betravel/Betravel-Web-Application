import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function ListeEvent() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/event/all")
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => console.error(err));
  });

  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <div className="row">
        {events.map((event, index) => (
          <div className="col-6">
            <div className="card">
              <img
                src="https://res.cloudinary.com/betravel/image/upload/v1647176972/BeTravel/assets/Image_e9917i.jpg"
                alt=""
                width="100%"
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
                  <div className="col-6">
                    <div align="left">
                      <img
                        src="https://img.icons8.com/ios/20/000000/calendar--v1.png"
                        alt=""
                      />{" "}
                      {event.date}
                    </div>
                    <br />
                    <div align="left">
                      <img
                        src="https://img.icons8.com/external-xnimrodx-lineal-xnimrodx/20/000000/external-time-education-xnimrodx-lineal-xnimrodx.png"
                        alt=""
                      />{" "}
                      {event.hour}
                    </div>
                    <br />
                    <div align="left">
                      <img
                        src="https://img.icons8.com/ios-filled/20/000000/trainers.png"
                        alt=""
                      />{" "}
                      Circuit de 20 Km
                    </div>
                  </div>
                  <div className="col-6">
                    <div>
                      <h3> {event.price} DT</h3>

                      <Link to={"/Event/Detail/" + event._id}>
                            <button className="btn btn-primary">
                              {" "}
                              show details
                            </button>
                          </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Stack spacing={2} alignItems="center">
        <Pagination count={5} />
      </Stack>
    </div>
  );
}
export default ListeEvent;
