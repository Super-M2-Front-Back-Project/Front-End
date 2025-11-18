import React from "react";
import "./style.css";

interface IProps {
    label: string;
}

const Checkbox = ({ label }:IProps) => {
  return (
    <div>
      <label htmlFor="">
        <input 
          type="checkbox"
          className="checkbox"
        />
        {label}
      </label>
    </div>
  );
};
export default Checkbox;