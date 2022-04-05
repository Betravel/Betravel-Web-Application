import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import DashBoard from "./components/DashBoard";
import Navbar from "./components/Navbar";
import AddHotel from "./components/AddHotel";
import AddEvent from "./components/AddEvent";
import UpdateHotel from "./components/UpdateHotel";
import UpdateEvent from "./components/UpdateEvent";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<DashBoard />} />
          <Route path="/AddHotel" element={<AddHotel />} />
          <Route path="/AddEvent" element={<AddEvent />} />
          <Route path="/UpdateHotel/:id" element={<UpdateHotel />} />
          <Route path="/UpdateEvent/:id" element={<UpdateEvent />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
