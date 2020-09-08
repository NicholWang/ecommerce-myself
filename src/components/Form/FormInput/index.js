import React from "react";
import "./sstyle.scss";

function FormInput({ label, ...otherProps }) {
  console.log(otherProps);
  return (
    <div className="form-group">
      {label && (
        <div>
          <label>{label}</label>
        </div>
      )}
      <input {...otherProps} />
    </div>
  );
}

export default FormInput;
