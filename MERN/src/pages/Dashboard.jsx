import React, { useContext } from "react";
import { Box } from "@mui/material";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  return user ? (
    <>
      <Box sx={{ ml: 10, mt: -5 }}>
        <div className="container text-center" style={{ marginTop: "12rem" }}>
          <div className="alert alert-primary p-5">
            <h1>
              {user && <span className="text-success">{user}'s</span>} Home
            </h1>
          </div>
        </div>
      </Box>
    </>
  ) : (
    <div>
      <Navigate to={"/login"} />
    </div>
  );
};

export default Dashboard;
