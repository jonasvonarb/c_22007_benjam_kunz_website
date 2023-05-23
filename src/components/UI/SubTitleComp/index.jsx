import React, { useState, useEffect } from "react";
import Icon from "../Icon";

import styles from "./main.module.styl";

const SubTiotleComp = ({
  text,
  linkIntern,
  link,
  icon,
  className,
  clicked,
  open,
}) => {
  const clickHandler = () => {
    clicked();
  };

  return !link && !linkIntern ? (
    <div
      onClick={clickHandler}
      className={[styles.container, className].join(" ")}
    >
      {text} <Icon className={open && styles.open} name={icon || "closing_x"} />
    </div>
  ) : !link ? (
    <a
      href={`${import.meta.env.VITE_IMAGE_URL}${linkIntern}`}
      rel="noreferrer"
      target="_blank"
      className={[styles.container, "link"].join(" ")}
    >
      {text} <p>{String.fromCharCode(8594)}</p>
    </a>
  ) : (
    <a
      href={`${link}`}
      rel="noreferrer"
      target="_blank"
      className={[styles.container, "link"].join(" ")}
    >
      {text} <p>{String.fromCharCode(8594)}</p>
    </a>
  );
};

export default SubTiotleComp;
