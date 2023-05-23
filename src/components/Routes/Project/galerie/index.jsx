import React, { useEffect, useRef, useState } from "react";
import { useLocation, useMedia, useMouse } from "react-use";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/black-and-white.css";

import styles from "./main.module.styl";
import GalerieImage from "./GalerieImage";

const Galerie = ({ videos, galerie, type }) => {
  if (!galerie && !type) return;
  const praefix = type === "projectPhoto" ? "full" : "scroll";
  const [overGalerie, setOverGalerie] = useState(undefined);
  const [currentImage, setCurrentImage] = useState(1);
  const location = useLocation();
  const [isScrolling, setIsScrolling] = useState(false);
  const isWide = useMedia("(min-width: 900px)");
  const isSmall = useMedia("(max-width: 550px)");

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
  const posX = isWide ? docX : -220;
  const posY = isWide ? docY : -220;
  const maxImages = galerie?.length + videos?.length;

  const enterHanlderLeft = () => {
    setOverGalerie(0);
  };

  const enterHanlderRight = () => {
    setOverGalerie(1);
  };

  const leaveHanlder = () => {
    setOverGalerie(undefined);
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
    }, 100);
  };

  const footerH = isWide ? 33 : 38;

  const isVideoPlaying = (video) =>
    !!(
      video.currentTime > 0 &&
      !video.paused &&
      !video.ended &&
      video.readyState > 2
    );
  const checkVideoIsPlaying = () => {
    const videos = document.getElementsByTagName("video");
    for (const video of videos) {
      if (isVideoPlaying(video)) return;
      video.play();
    }
  };

  const nextImage = () => {
    if (currentImage === maxImages) return;
    const fullGalerie = _videos ? [..._videos, ...galerie] : galerie;

    setCurrentImage((prevState) => prevState + 1);
    const h1 = fullGalerie[currentImage - 1].height;
    const h2 = fullGalerie[currentImage].height;
    const w1 =
      ((window.innerHeight - footerH) / h1) *
      fullGalerie[currentImage - 1].width;
    const w2 =
      ((window.innerHeight - footerH) / h2) * fullGalerie[currentImage].width;

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

    container.current.scrollTo({
      top: 0,
      left: container.current.scrollLeft + x - 30,
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
      ((window.innerHeight - footerH) / h1) *
      fullGalerie[currentImage - 2].width;
    const w2 =
      ((window.innerHeight - footerH) / h2) *
      fullGalerie[currentImage - 1].width;

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

    container.current.scrollTo({
      top: 0,
      left: container.current.scrollLeft - x - footerH,
      behavior: "smooth",
    });
    isScrollToFinished(container.current);
  };

  const Video = (video, index) => {
    return (
      <div
        key={index + "Video" + video.url}
        className={[
          styles.videoContainer,
          index === 0 ? styles.firstElement : "",
          index + 1 === currentImage
            ? styles.activeImage
            : styles.inactiveImage,
        ].join(" ")}
      >
        <span>
          <video
            id={index + "Video"}
            className={[styles.video].join(" ")}
            autoPlay
            muted
            loop
            playsInline
          >
            <source
              src={`${import.meta.env.VITE_IMAGE_URL}${video.url}`}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </span>
      </div>
    );
  };

  return (
    <div
      ref={container}
      onClick={checkVideoIsPlaying}
      className={[styles[`container--${praefix}`]].join(" ")}
    >
      {(overGalerie === 0 || overGalerie === 1 || !isWide) && (
        <div
          className={[styles.cursor, isScrolling && styles.scrolling].join(" ")}
          style={{
            right: `${window.innerWidth - posX}px`,
            top: `${posY}px`,
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
      )}
      {isWide && (
        <>
          <div
            onMouseEnter={enterHanlderRight}
            onMouseLeave={leaveHanlder}
            onClick={nextImage}
            className={[styles.arrowRight, isScrolling && styles.blocked].join(
              " "
            )}
          />
          <div
            onMouseEnter={enterHanlderLeft}
            onMouseLeave={leaveHanlder}
            onClick={lastImage}
            className={[
              styles.arrowLeft,
              isScrolling && styles.blocked,
              currentImage === 1 && styles.inActive,
            ].join(" ")}
          />
        </>
      )}
      {videos?.map((video, index) => Video(video, index))}
      {galerie?.map((image, index) => (
        <GalerieImage
          key={"image" + index + videos.length}
          image={image}
          index={index + videos.length}
          footerH={footerH}
          currentImage={currentImage}
          classNames={styles}
        />
      ))}
    </div>
  );
};

export default Galerie;
