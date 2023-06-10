import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useNavigate, Navigate } from "react-router-dom";

import { UserContext } from "./UserContext";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Pages
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Analytics from "./pages/Analytics";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/";
//Components
import Header from "./components/Header";
import Appdrawer from "./components/Appdrawer.jsx";

import { getUser } from "./api/user";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = getUser()
      .then((res) => {
        if (res.error) console.log(res.error);
        else setUser(res.username);
      })
      .catch((err) => toast(err));

    return () => unsubscribe;
  }, []);

  return (
    <Router>
      <UserContext.Provider value={{ user, setUser }}>
        <>
          <ToastContainer />
          <Appdrawer />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/analytics" element={<Analytics />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/inventory" element={<Inventory />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
