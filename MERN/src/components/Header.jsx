import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <Link className="navbar-brand" to="/">
          CloudLex
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Signup
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Login
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
