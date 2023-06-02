import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const Home = () => {
  const { user } = useContext(UserContext);
  return user ? (
    <>
      {/* <div className="container text-center" style={{ marginTop: "12rem" }}>
        <div className="alert alert-primary p-5">
          <h1>{user && <span className="text-success">{user}'s</span>} Home</h1>
        </div>
      </div> */}
    </>
  ) : (
    <Navigate to={"/login"} />
  );
};

export default Home;
