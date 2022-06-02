import React from "react";
import { NavLink } from "react-router-dom";
function Admin() {
  return (
    <div>
      <div>
        <NavLink to="/index1">index1</NavLink>
      </div>
      <div>
        <NavLink to="/index2">index2</NavLink>
      </div>
      <div>
        <NavLink to="/home">Home</NavLink>
      </div>
    </div>
  );
}

export default Admin;
