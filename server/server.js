const express = require("express");
const cors = require("cors");
const app = express();
const cookies = require("cookie-parser");
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

require("./config/config.mongoose");

app.use(express.json());
app.use(cookies());
app.use(express.urlencoded({ extended: true }));
require("./routes/route.user")(app);
require("./routes/route.hotel")(app);

app.listen(8000, () => {
  console.log("Listening at Port 8000");
});
