import React from "react";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Input = ({ label, type, value, onChange, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <label>{label}</label>
      <div className="input-box">
        <input
          type={type == "password" && showPassword ? "text" : type}
          value={value}
          onChange={(e) => onChange(e)}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none"
        />

        {type === "password" && (
          <span
            onClick={togglePassword}
            className="text-slate-400 cursor-pointer"
          >
            {showPassword ? <FaEyeSlash size={22} /> : <FaEye size={22} />}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
