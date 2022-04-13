import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/home";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Profil from "./components/Profil";
import Confirmed from "./components/Confirmed";
import ResetPassword from "./components/ResetPassword";
import ConfirmPassword from "./components/ConfirmPassword";
import AboutUs from "./components/AboutUs";
import DetailHotel from "./components/DetailHotel";
import ListeHotel from "./components/ListeHotel";
import ListePromo from "./components/ListePromo";
import Reserve from "./components/Resrve";
import "./App.css";
import ListeEvent from "./components/ListeEvent";
import DetailEvent from "./components/DetailEvent";
import ReserveEvent from "./components/ReserveEvent";
import Erreur404 from "./components/Erreur404";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/Confirmed/:id" element={<Confirmed />} />
          <Route path="/Confirmpass/:id" element={<ConfirmPassword />} />
          <Route path="/Profil" element={<Profil />} />
          <Route path="/Restpass" element={<ResetPassword />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/Hotel/Detail/:id" element={<DetailHotel />} />
          <Route path="/Hotel/Liste" element={<ListeHotel />} />
          <Route path="/Hotel/Promos" element={<ListePromo />} />
          <Route path="/Hotel/Reserve" element={<Reserve />} />
          <Route path="/Event/Liste" element={<ListeEvent />} />
          <Route path="/Event/Detail/:id" element={<DetailEvent />} />
          <Route path="/Event/Reserve" element={<ReserveEvent />} />
          <Route path="*" element={<Erreur404 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
