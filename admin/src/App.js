import logo from "./logo.svg";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import DashBoard from "./components/DashBoard";
import Navbar from "./components/Navbar";
import AddHotel from "./components/AddHotel";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<DashBoard />} />
          <Route path="/AddHotel" element={<AddHotel />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
