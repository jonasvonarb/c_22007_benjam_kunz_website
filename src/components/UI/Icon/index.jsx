import React, { useState, useEffect } from "react";

import styles from "./main.module.styl";

const Icon = ({ name, className, clicked = () => {} }) => {
  const onClickHandler = () => {
    clicked();
  };
  return (
    <img
      className={[className, styles.icon, "icon"].join(" ")}
      onClick={onClickHandler}
      src={`/assets/icons/${name}.svg`}
    />
  );
};

export default Icon;
