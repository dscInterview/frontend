import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";

const App = () => {
  return (
    <Router>
      <div className="App">
        {/* Routes */}
        <Routes>
          <Route path="/sign-up" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
