import React from "react";
import "./style.scss";

const FormWrap = ({ title, children }) => {
  return (
    <div className="formWrap">
      {title && <h2>{title}</h2>}
      {children}
    </div>
  );
};

export default FormWrap;
