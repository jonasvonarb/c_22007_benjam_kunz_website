import React, { useState, useEffect } from "react";

import { LazyLoadImage } from "react-lazy-load-image-component";
import { useMedia, useWindowSize } from "react-use";

const GalerieImage = ({ image, index, currentImage, footerH, classNames }) => {
  const isSmall = useMedia("(max-width: 550px)");
  const { width, height } = useWindowSize();

  const [widthImage, setWidthImage] = useState(width);
  const [heightWindow, setHeightWindow] = useState();

  const updateWidth = (image) => {
    const ratio = image.height / image.width;
    const add = ratio === 1 ? 1 : ratio < 1 ? 0 : 2;
    setWidthImage(+((heightWindow - footerH) / ratio).toFixed(0) + add);
  };

  useEffect(() => {
    updateWidth(image);
    console.log(width);
    setHeightWindow(window.visualViewport.height);
  }, [width, height]);

  return (
    <div
      key={index + "Image"}
      className={[
        classNames.imageContainer,
        index === 0 ? classNames.firstElement : "",
        index + 1 === currentImage
          ? classNames.activeImage
          : classNames.inactiveImage,
      ].join(" ")}
    >
      <LazyLoadImage
        delayMethod="debounce"
        className={[classNames.image].join(" ")}
        src={
          isSmall && image.variations.find((x) => x.url.includes("mobilethumb"))
            ? `${import.meta.env.VITE_IMAGE_URL}${
                image.variations.find((x) => x.url.includes("mobilethumb")).url
              }`
            : `${import.meta.env.VITE_IMAGE_URL}${image.url}`
        }
        placeholderSrc={`${import.meta.env.VITE_IMAGE_URL}${
          image.variations[0].url
        }`}
        threshold={window.innerWidth * 5 + 100}
        style={{
          width: widthImage + "px",
          height: heightWindow - footerH + "px",
        }}
      />
    </div>
  );
};

export default GalerieImage;
