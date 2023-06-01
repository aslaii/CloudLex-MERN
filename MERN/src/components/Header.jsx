import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../UserContext";

import { logout } from "../api/user";

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();

    logout()
      .then((res) => {
        toast.success(res.message);
        // set user to null
        setUser(null);
        // redirect the user to logins
        navigate("/login");
      })
      .catch((err) => console.error(err));
  };

  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary ml-auto"
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
        <ul className="navbar-nav ms-auto">
          {!user ? (
            <div>
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
            </div>
          ) : (
            <li className="nav-item">
              <span
                className="nav-link"
                style={{ cursor: "pointer" }}
                onClick={handleLogout}
              >
                Logout
              </span>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
