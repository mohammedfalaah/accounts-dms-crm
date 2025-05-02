import React from "react";
import { StlViewer } from "react-stl-viewer";

function StlViewerComponent(props) {
  const { url, style, orbitControls, shadows, onLoaded } = props;

  const handleFinishLoading = () => {
    if (onLoaded) {
      onLoaded();
    }
  };

  return (
    <StlViewer
      onFinishLoading={handleFinishLoading} // Call handleFinishLoading when the viewer finishes loading
      style={style}
      orbitControls={orbitControls}
      shadows={shadows}
      url={url}
    />
  );
}

export default StlViewerComponent;
