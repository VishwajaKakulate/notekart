import React from "react";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Welcome to notes App 🚀</h1>
      {/* <p>This is the landing page.</p> */}
      <div>
        <Link to="/login">
          <button style={{ margin: "10px" }}>Login</button>
        </Link>
        <Link to="/register">
          <button style={{ margin: "10px" }}>Register</button>
        </Link>
      </div>
    </div>
  );
}

export default Landing;
