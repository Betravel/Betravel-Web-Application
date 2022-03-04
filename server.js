const express = require("express");
const cors = require("cors");
const app = express();
const cookies = require("cookie-parser");
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use(cookies());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// MongoDB config
require("./server/config/mongoose.config");
//Routes
require("./server/routes/auth.route")(app);
require("./server/routes/send.route")(app);
require("./server/routes/user.route")(app);
require("./server/routes/hotel.route")(app);

port = 8000;
app.listen(port, () => {
  console.log("Listening at Port 8000");
});
