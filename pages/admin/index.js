import React, { useState } from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
function Admin() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div style={{ width: "100%", minHeight: "80vh" }}>
      {loggedIn ? <Dashboard /> : <Login setLoggedIn={setLoggedIn} />}
    </div>
  );
}

export default Admin;
