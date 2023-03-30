import React, { useEffect, useRef, useState } from "react";
import { useLocation, useMouse } from "react-use";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import styles from "./main.module.styl";

const Galerie = ({ videos, galerie, type }) => {
  if (!galerie && !type) return;
  const praefix = type === "projectPhoto" ? "full" : "scroll";
  const [overGalerie, setOverGalerie] = useState();
  const [currentImage, setCurrentImage] = useState(1);
  const location = useLocation();
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    setCurrentImage(1);
    container.current.scrollTo({
      top: 0,
      left: 0,
    });
  }, [location.pathname]);

  var [_videos, setVideos] = useState();

  for (let video in videos) {
    var v = document.getElementById(video + "Video");
    let wait = setInterval(() => {
      if (!v) return;
      clearInterval(wait);
      v.addEventListener(
        "loadedmetadata",
        function () {
          var width = this.videoWidth,
            height = this.videoHeight;
          setVideos(
            videos.map((x) => {
              return { height: height, width: width, ...x };
            })
          );
        },
        false
      );
    }, 10);
  }

  const container = useRef();

  const { docX, docY } = useMouse(container);
  const maxImages = galerie?.length + videos?.length;

  const enterHanlderLeft = () => {
    setOverGalerie(0);
  };

  const enterHanlderRight = () => {
    setOverGalerie(1);
  };

  const isScrollToFinished = (scrollContainer) => {
    setIsScrolling(true);
    const scrollCheck = [0, 1];
    const checkIfScrollToIsFinished = setInterval(() => {
      scrollCheck.shift();
      scrollCheck.push(scrollContainer.scrollLeft);
      if (scrollCheck[0] === scrollContainer.scrollLeft) {
        setIsScrolling(false);
        clearInterval(checkIfScrollToIsFinished);
      }
    }, 25);
  };

  const nextImage = () => {
    if (currentImage === maxImages) return;
    const fullGalerie = _videos ? [..._videos, ...galerie] : galerie;

    setCurrentImage((prevState) => prevState + 1);
    const h1 = fullGalerie[currentImage - 1].height;
    const h2 = fullGalerie[currentImage].height;
    const w1 =
      ((window.innerHeight - 25) / h1) * fullGalerie[currentImage - 1].width;
    const w2 =
      ((window.innerHeight - 25) / h2) * fullGalerie[currentImage].width;

    const ws1 = window.innerWidth / 2 - (window.innerWidth - w1);
    const d =
      praefix === "scroll"
        ? currentImage === 1
          ? (ws1 >= window.innerWidth ? window.innerWidth : ws1) +
            (w2 >= window.innerWidth ? window.innerWidth : w2 / 2)
          : ((w1 >= window.innerWidth ? window.innerWidth : w1) +
              (w2 >= window.innerWidth ? window.innerWidth : w2)) /
            2
        : window.innerWidth;
    const x = d;

    console.log(d);

    container.current.scrollTo({
      top: 0,
      left: container.current.scrollLeft + x,
      behavior: "smooth",
    });

    isScrollToFinished(container.current);
  };

  const lastImage = () => {
    if (currentImage === 1) return;
    const fullGalerie = _videos ? [..._videos, ...galerie] : galerie;

    setCurrentImage((prevState) => prevState - 1);
    const h1 = fullGalerie[currentImage - 2].height;
    const h2 = fullGalerie[currentImage - 1].height;
    const w1 =
      ((window.innerHeight - 25) / h1) * fullGalerie[currentImage - 2].width;
    const w2 =
      ((window.innerHeight - 25) / h2) * fullGalerie[currentImage - 1].width;

    const ws1 = window.innerWidth / 2 - (window.innerWidth - w1);
    const d =
      praefix === "scroll"
        ? currentImage === 2
          ? (ws1 >= window.innerWidth ? window.innerWidth : ws1) +
            (w2 >= window.innerWidth ? window.innerWidth : w2 / 2)
          : ((w1 >= window.innerWidth ? window.innerWidth : w1) +
              (w2 >= window.innerWidth ? window.innerWidth : w2)) /
            2
        : window.innerWidth;
    const x = d;

    console.log(d);

    container.current.scrollTo({
      top: 0,
      left: container.current.scrollLeft - x,
      behavior: "smooth",
    });
    isScrollToFinished(container.current);
  };

  const Video = (video, index) => {
    return (
      <div key={index + "Video"} className={[styles.videoContainer].join(" ")}>
        <video
          id={index + "Video"}
          className={[styles.video].join(" ")}
          autoPlay
          muted
          loop
        >
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
      <div
        className={[styles.cursor, isScrolling && styles.scrolling].join(" ")}
        style={{
          left: `${docX}px`,
          top: `${docY}px`,
        }}
      >
        <img
          className={[
            styles.arrowInline,
            overGalerie === 0 && currentImage !== 1 && styles.activeArrow,
          ].join(" ")}
          src={`/assets/icons/arrow_left.svg`}
        />
        {currentImage}|{maxImages}
        <img
          className={[
            styles.arrowInline,
            overGalerie === 1 &&
              currentImage !== maxImages &&
              styles.activeArrow,
          ].join(" ")}
          src={`/assets/icons/arrow_right.svg`}
        />
      </div>
      <div
        onMouseEnter={enterHanlderRight}
        onClick={nextImage}
        className={[styles.arrowRight, isScrolling && styles.blocked].join(" ")}
      />
      <div
        onMouseEnter={enterHanlderLeft}
        onClick={lastImage}
        className={[styles.arrowLeft, isScrolling && styles.blocked].join(" ")}
      />
      {videos?.map((video, index) => Video(video, index))}
      {galerie?.map((image, index) => Image(image, index))}
    </div>
  );
};

export default Galerie;
