const express = require("express");
const cors = require("cors");
const app = express();
const cookies = require("cookie-parser");
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookies());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// MongoDB config
require("./server/config/mongoose.config");
//Routes
require("./server/routes/auth.routes")(app);
require("./server/routes/send.routes")(app);
require("./server/routes/user.routes")(app);
require("./server/routes/hotel.routes")(app);
require("./server/routes/reservationHotel.routes")(app);
require("./server/routes/event.routes")(app);
require("./server/routes/trip.routes")(app);
require("./server/routes/reservationEvent.routes")(app);

port = 8000;
app.listen(port, () => {
  console.log("Listening at Port 8000");
});
