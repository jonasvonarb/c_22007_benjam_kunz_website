import React, { useState, useEffect } from "react";

// import styles from './main.module.styl'

const Chevron = ({ left = false }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      style={left ? { transform: "rotate(180deg)" } : null}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8L4.646 2.354a.5.5 0 0 1 0-.708z"
      ></path>
    </svg>
  );
};

export default Chevron;
