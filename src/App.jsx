import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import HomePage from "./Pages/HomePage";
import AboutPage from "./Pages/AboutPage";
import ContactPage from "./Pages/ContactPage";

const App = () => {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <div className="App" style={{ backgroundColor: "#0d0d0d", minHeight: "100vh" }}>
      <Navbar isLogged={isLogged} setIsLogged={setIsLogged} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutPage />} />
        <Route path="/contact-us" element={<ContactPage />} />
        <Route path="/sign-up" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm setIsLogged={setIsLogged} />} />
      </Routes>
    </div>
  );
};

export default App;
