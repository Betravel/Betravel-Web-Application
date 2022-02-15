import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Contact.css";
import img from "../../assets/pexels14 (2).png";
function Contact() {
  const history = useNavigate();
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [phone, setphone] = useState(0);
  const [email, setemail] = useState("");
  const [message, setmessage] = useState("");
  const send = (e) => {
    e.preventDefault();
    var sjt = "Contact Request";
    var msg =
      "<h1> You have recived a message from " +
      firstname +
      " " +
      lastname +
      " (" +
      email +
      " , " +
      phone +
      " ) </h1><p>" +
      message +
      "</p>";
    axios
      .post("http://localhost:8000/send", {
        email,
        msg,
        sjt,
      })
      .then((res) => {
        alert("Message Sent!");
        history("/");
      })
      .catch((err) => alert("Error Server"));
  };

  return (
    <div className="container-fluid Contact1">
      <div className="row">
        <div className="container Contact">
          <div className="row" align="center">
            <h1>Have you question?</h1>

            <h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="35"
                fill="currentColor"
                className="bi bi-arrow-down-square"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm8.5 2.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"
                />
              </svg>
              &ensp; Feel free to contact us throw the next form &ensp;
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="35"
                fill="currentColor"
                className="bi bi-arrow-down-square"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm8.5 2.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"
                />
              </svg>{" "}
            </h2>
          </div>
          <br />
          <div className="row">
            <div
              className="col-5"
              style={{ marginTop: "auto", marginBottom: "auto" }}
            >
              <img src={img} alt="" width="100%" />
            </div>
            <div className="col-7">
              <div className="container">
                <form className="row g-3" onSubmit={send}>
                  <div className="col-md-6">
                    <label htmlFor="firstname" className="form-label">
                      Firstname
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstname"
                      onChange={(e) => setfirstname(e.target.value)}
                      style={{ background: "white" }}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="lastname" className="form-label">
                      Lastname
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastname"
                      onChange={(e) => setlastname(e.target.value)}
                      style={{ background: "white" }}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      onChange={(e) => setemail(e.target.value)}
                      style={{ background: "white" }}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="phone" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phone"
                      pattern="[0-9]{8}"
                      placeholder="8 digital number"
                      onChange={(e) => setphone(e.target.value)}
                      style={{ background: "white" }}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="message" className="form-label">
                      Message
                    </label>
                    <textarea
                      className="form-control"
                      id="message"
                      rows="4"
                      onChange={(e) => setmessage(e.target.value)}
                      style={{ background: "white" }}
                      required
                    />
                  </div>
                  <br />
                  <div className="col-12">
                    <button type="submit" className="btn">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path d="M0 12l11 3.1 7-8.1-8.156 5.672-4.312-1.202 15.362-7.68-3.974 14.57-3.75-3.339-2.17 2.925v-.769l-2-.56v7.383l4.473-6.031 4.527 4.031 6-22z" />
                      </svg>
                      &ensp; &ensp; Send
                    </button>
                  </div>
                </form>
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Contact;
