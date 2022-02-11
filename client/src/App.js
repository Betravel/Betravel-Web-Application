import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/homepage/home";
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/SignIn";
import Profil from "./components/Profil/Profil";
import EditProfil from "./components/Profil/EditProfil/EditProfil";
import Contact from "./components/Contact/Contact";
import Confirmed from "./components/SignUp/Confirm/Confirmed";
import ResetPassword from "./components/SignIn/ResetPassword/ResetPassword";
import ConfirmPassword from "./components/SignIn/ResetPassword/ConfirmPassword";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <br />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/Confirmed/:id" element={<Confirmed />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/editprofil" element={<EditProfil />} />
          <Route path="/Restpass" element={<ResetPassword />} />
          <Route path="/Confirmpass/:id" element={<ConfirmPassword />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
