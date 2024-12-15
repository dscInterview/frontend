import React from "react";
import { Route, Routes } from "react-router-dom";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";
import HomePage from "./Pages/HomePage";
import AboutPage from "./Pages/AboutPage";
import ContactPage from "./Pages/ContactPage";

const App = () => {
  return (
    <div>
      <Navbar />
      <div className="App" style={{ backgroundColor: "#0d0d0d", minHeight: "100vh" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/contact-us" element={<ContactPage />} />
          <Route path="/sign-up" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
