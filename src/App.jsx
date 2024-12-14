import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";

const App = () => {
  return (
    <Router>
      <div className="App" style={{ backgroundColor: "#0d0d0d", minHeight: "100vh" }}>
        <Routes>
          <Route path="/sign-up" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
