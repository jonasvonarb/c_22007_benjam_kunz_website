import React, { useState, useEffect } from "react";

import styles from "./main.module.styl";

const TitleComp = ({ text, border = false, className }) => {
  return (
    <div className={[styles.container, className, border && styles.border].join(" ")}>
      {text}
    </div>
  );
};

export default TitleComp;
