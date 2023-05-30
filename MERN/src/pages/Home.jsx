import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import Button from "@mui/material/Button";
const Home = () => {
  const { user } = useContext(UserContext);
  return (
    <div className="container text-center" style={{ marginTop: "12rem" }}>
      3
      <div className="alert alert-secondary p-5">
        <h1>{user && <span className="text-success">{user}'s</span>} Home</h1>
      </div>
    </div>
  );
};

export default Home;
