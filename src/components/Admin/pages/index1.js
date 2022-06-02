import React from "react";
import { NavLink } from "react-router-dom";
const index1 = () => {
  return (
    <div>
      <div>
        <NavLink to="/index2">index2</NavLink>
      </div>
      <div>
        <NavLink to="/admin">admin</NavLink>
      </div>
    </div>
  );
};

export default index1;
