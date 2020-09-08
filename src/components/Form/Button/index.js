import React from "react";
import "./style.scss";

function Button({ children, cName, ...otherProps }) {
  return (
    <button className={`btn ${cName}`} {...otherProps}>
      {children}
    </button>
  );
}

export default Button;
