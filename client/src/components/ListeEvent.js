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
          <div className="col-4">
            <div class="card" style={{ width: "100%", height: "100%" }}>
              <img
                src="https://res.cloudinary.com/betravel/image/upload/v1647176972/BeTravel/assets/Image_e9917i.jpg"
                alt=""
                height="100px"
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
                      <div className="col-8">{event.date}</div>
                    </div>
                  </div>
                  <br />
                  <div align="left">
                    <div className="row ">
                      <div className="col-4">
                        <img
                          src="https://img.icons8.com/external-xnimrodx-lineal-xnimrodx/20/000000/external-time-education-xnimrodx-lineal-xnimrodx.png"
                          alt=""
                        />{" "}
                      </div>
                      <div className="col-8">{event.hour}</div>
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
