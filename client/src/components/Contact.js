import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Contact.css";
import img from "../assets/pexels14 (2).png";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
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
      .post("http://localhost:8000/contact", {
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
              className="col-lg-5 col-sm-12"
              style={{ marginTop: "auto", marginBottom: "auto" }}
            >
              <img src={img} alt="" width="100%" />
            </div>
            <div className="col-lg-7 col-sm-12">
              <div className="container">
                <form className="row g-3" onSubmit={send}>
                  <div className="col-lg-6 col-sm-12">
                    <Box
                      component="form"
                      sx={{
                        "& > :not(style)": { m: 1, width: "100%" },
                        input: { backgroundColor: "white", opacity: "50%" },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        id="Firstname"
                        label="Firstname"
                        variant="outlined"
                        onChange={(e) => setfirstname(e.target.value)}
                        required
                      />
                    </Box>
                  </div>
                  <div className="col-lg-6 col-sm-12">
                    <Box
                      component="form"
                      sx={{
                        "& > :not(style)": { m: 1, width: "100%" },
                        input: { backgroundColor: "white", opacity: "50%" },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        id="Lastname"
                        label="Lastname"
                        variant="outlined"
                        onChange={(e) => setlastname(e.target.value)}
                        required
                      />
                    </Box>
                  </div>
                  <div className="col-lg-6 col-sm-12">
                    <Box
                      component="form"
                      sx={{
                        "& > :not(style)": { m: 1, width: "100%" },
                        input: { backgroundColor: "white", opacity: "50%" },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        id="email"
                        label="email"
                        variant="outlined"
                        onChange={(e) => setemail(e.target.value)}
                        required
                      />
                    </Box>
                  </div>
                  <div className="col-lg-6 col-sm-12">
                    <Box
                      component="form"
                      sx={{
                        "& > :not(style)": { m: 1, width: "100%" },
                        input: { backgroundColor: "white", opacity: "50%" },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        id="outlined-number"
                        label="phone"
                        type="phone"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        pattern="[0-9]{8}"
                        placeholder="8 digital number"
                        onChange={(e) => setphone(e.target.value)}
                        required
                      />
                    </Box>
                  </div>
                  <div className="col-12">
                    <Box
                      component="form"
                      sx={{
                        "& > :not(style)": { m: 1, width: "100%" },
                        input: { backgroundColor: "white", opacity: "50%" },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        id="outlined-multiline-static"
                        label="message"
                        multiline
                        rows={4}
                        onChange={(e) => setmessage(e.target.value)}
                        required
                        fullWidth
                        style={{ backgroundColor: "white", opacity: "50%" }}
                      />
                    </Box>
                  </div>
                  <br />
                  <div className="col-12">
                    <div className="Search__actions">
                      <button type="submit" className="btn ">
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
