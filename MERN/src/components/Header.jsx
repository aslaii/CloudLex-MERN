import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary"
      data-bs-theme="dark"
    >
      <Link className="navbar-brand" to="/">
        CloudLex
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-3">
          <li className="nav-item">
            <Link className="nav-link" to="/signup">
              Signup
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
