"use client";
import React from "react";

function Button({ value, onClick, type }) {
  return (
    <div>
      <button
        onClick={onClick}
        type={type}
        className="bg-sky-400 text-white hover:text-sky-600 hover:bg-sky-200 rounded-lg outline-none px-4 py-2"
      >
        {value}
      </button>
    </div>
  );
}

export default Button;
