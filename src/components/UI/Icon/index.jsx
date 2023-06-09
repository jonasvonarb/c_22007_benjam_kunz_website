import React, { useState, useEffect } from "react";

import styles from "./main.module.styl";

const Icon = ({ name, className, clicked = () => {} }) => {
  const onClickHandler = () => {
    console.log(clicked)
    clicked();
  };
  return (
    <img
      className={[className, "icon"].join(" ")}
      onClick={onClickHandler}
      src={`/assets/icons/${name}.svg`}
    />
  );
};

export default Icon;
