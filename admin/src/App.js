import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import DashBoard from "./components/DashBoard";
import AddHotel from "./components/AddHotel";
import AddEvent from "./components/AddEvent";
import UpdateHotel from "./components/UpdateHotel";
import UpdateEvent from "./components/UpdateEvent";
import Navbar2 from "./components/NavBar2";
import ListUsers from "./components/ListUsers";
import ListHotels from "./components/ListHotels";
import ListEvents from "./components/ListEvents";

function App() {
  let height = window.innerHeight;
  console.log(height);
  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row" style={{ minHeight: height }}>
          <Router>
            <div className="col-2" style={{ backgroundColor: "#21445B" }}>
              <Navbar2 />
            </div>
            <div className="col-10" style={{ backgroundColor: "#E9FBF3" }}>
              <Routes>
                <Route exact path="/" element={<DashBoard />} />
                <Route path="/Users" element={<ListUsers />} />
                <Route path="/Hotels" element={<ListHotels />} />
                <Route path="/Events" element={<ListEvents />} />
                <Route path="/AddHotel" element={<AddHotel />} />
                <Route path="/AddEvent" element={<AddEvent />} />
                <Route path="/UpdateHotel/:id" element={<UpdateHotel />} />
                <Route path="/UpdateEvent/:id" element={<UpdateEvent />} />
              </Routes>
            </div>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
