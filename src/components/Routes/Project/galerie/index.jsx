import React, { useRef, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useLocation, useParams } from "react-router-dom";

import Icon from "@/components/UI/Icon";

import styles from "./main.module.styl";

const Galerie = ({ videos, galerie, type }) => {
  if (!galerie && !type) return;
  const praefix = type === "projectPhoto" ? "full" : "scroll";

  const container = useRef();

  const nextImage = () => {
    const x = window.innerWidth / 2 + 50;
    container.current.scrollBy({
      top: 0,
      left: x,
      behavior: "smooth",
    });
  };

  const lastImage = () => {
    const x = -window.innerWidth / 2 + 50;
    container.current.scrollBy({
      top: 0,
      left: x,
      behavior: "smooth",
    });
  };

  const Video = (video, index) => {
    return (
      <div key={index + "Video"} className={[styles.videoContainer].join(" ")}>
        <video className={[styles.video].join(" ")} autoPlay muted loop>
          <source
            src={`${import.meta.env.VITE_IMAGE_URL}${video.url}`}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  };

  const Image = (image, index) => {
    const ratio = image.height / image.width;
    const width = (window.innerHeight - 25) / ratio;
    return (
      <div key={index + "Image"} className={[styles.imageContainer].join(" ")}>
        <LazyLoadImage
          delayMethod="debounce"
          className={[styles.image].join(" ")}
          src={`${import.meta.env.VITE_IMAGE_URL}${image.url}`}
          placeholderSrc={`${import.meta.env.VITE_IMAGE_URL}${
            image.variations[0].url
          }`}
          threshold={window.innerWidth * 2 + 100}
          style={{
            width: width + "px",
            height: 100 + "%",
          }}
        />
      </div>
    );
  };

  return (
    <div
      ref={container}
      className={[styles[`container--${praefix}`]].join(" ")}
    >
      <Icon
        name="arrow_right"
        clicked={nextImage}
        className={styles.arrowRight}
      />
      <Icon
        name="arrow_left"
        clicked={lastImage}
        className={styles.arrowLeft}
      />
      {videos?.map((video, index) => Video(video, index))}
      {galerie?.map((image, index) => Image(image, index))}
    </div>
  );
};

export default Galerie;
