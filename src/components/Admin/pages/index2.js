import React from "react";
import { NavLink } from "react-router-dom";
const index2 = () => {
  return (
    <div>
      <div>
        <NavLink to="/index1">index1</NavLink>
      </div>
      <div>
        <NavLink to="/admin">admin</NavLink>
      </div>
    </div>
  );
};

export default index2;
