// src/App.js
import React, { useEffect } from "react";
import { Route, Routes,Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import HomePage from "./Pages/HomePage";
import AboutPage from "./Pages/AboutPage";
import ContactPage from "./Pages/ContactPage";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer"; // Import Footer
import { initializeAuth } from './redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
const App = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar/>
      
      {/* Main Content Area */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/contact-us" element={<ContactPage />} />
          <Route path="/sign-up" element={<SignupForm />} />
          <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
        />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </main>
      
      {/* Footer */}
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default App;
