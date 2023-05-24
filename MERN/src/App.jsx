import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Home from './pages/Home';
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <>
      <Header></Header>
        <Routes>
          
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />

        </Routes>
      </>
    </Router>
  );
}

export default App;
