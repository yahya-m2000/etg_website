"use client";
import React from "react";

const Button: React.FC<ButtonProps> = ({
  onClick,
  size = "base",
  outline,
  color,
  title,
}) => {
  return (
    <div>
      <button
        onClick={onClick}
        className={`px-5 py-1 ${
          outline
            ? `border-${color} border-b-2 text-${color} hover:bg-${color} hover:text-black `
            : `text-black bg-${color}`
        }  ${
          size === "small"
            ? "text-sm"
            : size === "large"
            ? "text-xl"
            : size === "heroImage"
            ? "font-bitter font-semibold text-xl"
            : "text-base"
        }`}
      >
        {title}
      </button>
    </div>
  );
};

export default Button;
