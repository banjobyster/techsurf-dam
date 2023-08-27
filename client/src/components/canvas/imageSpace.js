import React, { useRef, useEffect, useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Box } from "@mui/material";

const ImageSpace = ({
  editedFile,
  setEditedFile,
  imageData,
  setImageData,
  isCropping,
  imgRef
}) => {
  const cropperRef = useRef(null);
  const [imageStyle, setImageStyle] = useState({});
  const boxRef = useRef(null);
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [viewImageDimensions, setViewImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  const calculateImageDimensions = () => {
    const { offsetWidth, offsetHeight } = boxRef.current;
    const imageAspectRatio = imageDimensions.width / imageDimensions.height;
    let newWidth = 0, newHeight = 0;
    if (imageAspectRatio > 1) {
      newWidth = offsetWidth;
      newHeight = offsetWidth / imageAspectRatio;
      if(newHeight > offsetHeight) {
        newHeight = offsetHeight;
        newWidth = offsetHeight * imageAspectRatio;
      }
    } else {
      newWidth = offsetHeight * imageAspectRatio;
      newHeight = offsetHeight;
      if (newWidth > offsetWidth) {
        newWidth = offsetWidth;
        newHeight = offsetWidth / imageAspectRatio;
      }
    }
    setViewImageDimensions({ width: newWidth, height: newHeight });
  };

  useEffect(() => {
    const updateContainerDimensions = () => {
      if (boxRef?.current) {
        calculateImageDimensions();
      }
    };
    window.addEventListener("resize", updateContainerDimensions);
    updateContainerDimensions();
    return () => {
      window.removeEventListener("resize", updateContainerDimensions);
    };
  }, [imageDimensions]);

  useEffect(() => {
    const image = new Image();
    image.src = imageData;
    image.onload = () => {
      setImageDimensions({ width: image.width, height: image.height });
    };
  }, [imageData]);

  useEffect(() => {
    const tempImageStyle = {
      filter: `brightness(${
        editedFile.properties.effects?.brightness || 1
      }) contrast(${editedFile.properties.effects?.contrast || 1}) saturate(${
        editedFile.properties.effects?.saturation || 1
      }) blur(${editedFile.properties.effects?.blur || 0}px)`,
      transform: `scaleX(${editedFile.properties.scale.x || 1}) scaleY(${
        editedFile.properties.scale.y || 1
      })`,
    };
    setImageStyle(tempImageStyle);
  }, [editedFile]);

  useEffect(() => {
    setEditedFile({ ...editedFile });
  }, []);

  useEffect(() => {
    if (isCropping === false && cropperRef?.current) {
      const cropper = cropperRef.current?.cropper;
      setImageData(cropper.getCroppedCanvas().toDataURL());
    }
  }, [isCropping]);

  return (
    <>
      {isCropping && (
        <Cropper
          ref={cropperRef}
          style={{ height: 400, width: "100%", ...imageStyle }}
          zoomTo={0.5}
          initialAspectRatio={1}
          preview=".img-preview"
          src={editedFile.reference}
          viewMode={1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false}
          guides={true}
        />
      )}
      {!isCropping && (
        <Box
          height="400px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          ref={boxRef}
          position="relative"
        >
          <img
            ref={imgRef}
            src={imageData}
            alt=""
            style={{
              width: viewImageDimensions.width,
              height: viewImageDimensions.height,
              ...imageStyle,
            }}
          />
        </Box>
      )}
    </>
  );
};

export default ImageSpace;
