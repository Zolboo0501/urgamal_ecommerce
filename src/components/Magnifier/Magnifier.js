/* eslint-disable react/prop-types */
import Image from "next/image";
// eslint-disable-next-line no-undef
const { useState, default: React } = require("react");

function Magnifier({
  imgSrc,
  imgHeight,
  imgWidth,
  magnifierRadius,
  containerClassname,
  imageClassname,
}) {
  // Store the position of the magnifier and position of the large image relative to the magnifier.
  const [magnifierState, setMagnifierState] = useState({
    top: 0,
    left: 0,
    offsetX: 0,
    offsetY: 0,
  });

  // Store whether the magnifier is currently visible.
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div style={{ position: "relative" }} className={containerClassname}>
      <Image
        alt={imgSrc}
        src={imgSrc}
        // Set the intrinsic width of the element (optional).
        width={imgWidth}
        height={imgHeight}
        loader={() => imgSrc}
        // Image can be a maximum of 50% of the viewport in either direction.
        className={imageClassname}
        style={{
          borderRadius: 10,
          userSelect: "none",
        }}
        // Set the magnifier state on every move of the mouse over the image.
        onMouseMove={(e) => {
          setIsVisible(true);
          const smallImage = e.currentTarget;
          // mouse position on the small image.
          const x = e.nativeEvent.offsetX;
          const y = e.nativeEvent.offsetY;
          setMagnifierState({
            top: y - magnifierRadius,
            left: x - magnifierRadius,
            // scale up to get position relative to the large image.
            offsetX:
              (x / smallImage.width) * smallImage.naturalWidth -
              magnifierRadius,
            offsetY:
              (y / smallImage.height) * smallImage.naturalHeight -
              magnifierRadius,
          });
        }}
        // Hide the magnifier when leaving the image.
        onMouseLeave={() => setIsVisible(false)}
      />
      <div
        style={{
          // Constants:
          boxShadow: "0 5px 10px -2px rgba(0, 0, 0, 0.3)",
          pointerEvents: "none",
          position: "absolute",
          border: "4px solid #efefef",
          zIndex: 99,
          display: "block",
          transition: "opacity 0.2s",
          userSelect: "none",
          // Set background to the image from props:
          background: `url("${imgSrc}") no-repeat #fff`,
          // Set sizing based on the magnifierRadius from props:
          width: 2 * magnifierRadius,
          height: 2 * magnifierRadius,
          borderRadius: 0,
          // Set position based on on the magnifier state:
          top: magnifierState.top + "px",
          left: magnifierState.left + "px",
          backgroundPositionX: -1 * magnifierState.offsetX,
          backgroundPositionY: -1 * magnifierState.offsetY,
          // Toggle opacity based on the isVisible state:
          opacity: isVisible ? 1 : 0,
        }}
      />
    </div>
  );
}
export default Magnifier;
