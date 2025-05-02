import React, { useLayoutEffect, useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

export const Photoviewer = ({ imgUrl, height, width, isRound }) => (
  <Zoom
    zoomImageStyle={{ cursor: "pointer" }} // Change cursor style
  >
    <div
      style={{
        width: "100%",
        // paddingBottom: '65%',
        position: "relative",
        overflow: "hidden",
        borderRadius: "5px",
      }}
    >
      <img
        alt="Image"
        onError={(e) => {
          e.target.src =
            "https://montevista.greatheartsamerica.org/wp-content/uploads/sites/2/2016/11/default-placeholder.png "; // Replace with the path to your default image
        }}
        src={imgUrl}
        style={{
          // position: 'absolute', // You can uncomment this line if needed
          width: isRound ? "130px" : width ? width : "100%",
          height: isRound ? "130px" : height ? height : "100%",
          objectFit: "cover",
          cursor: "pointer",
          borderRadius: isRound ? "50%" : "",
        }}
      />
    </div>
  </Zoom>
);
