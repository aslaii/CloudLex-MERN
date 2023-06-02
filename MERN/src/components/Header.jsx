import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../UserContext";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { logout } from "../api/user";
import TemporaryDrawer from "./Drawer";
import FilterDramaIcon from "@mui/icons-material/FilterDrama";

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
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary ml-auto"
      data-bs-theme="dark"
    >
      {user ? (
        <IconButton
          size="large"
          edge="start"
          color="primary"
          // color={colorConfigs.headerButton.color}
          aria-label="menu"
          sx={{ mr: 3, ml: 2 }}
          onClick={toggleDrawer("left", true)}
        >
          <MenuIcon />
        </IconButton>
      ) : (
        <IconButton
          size="large"
          edge="start"
          color="primary"
          aria-label="cloudlex icon"
          sx={{ mr: 3, ml: 2 }}
          // onClick={navigate("/")}
        >
          <FilterDramaIcon />
        </IconButton>
      )}
      {/* <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 3, ml: 2 }}
        onClick={toggleDrawer("left", true)}
      >
        <MenuIcon />
      </IconButton> */}
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
      <TemporaryDrawer
        state={state}
        setState={setState}
        toggleDrawer={toggleDrawer}
      ></TemporaryDrawer>
    </nav>
  );
};

export default Header;
