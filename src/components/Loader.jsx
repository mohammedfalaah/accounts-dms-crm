import React from "react";

function Loader() {
  return (
    <div className="loader-overlay">
      <div className="dm-spin-dots spin-lg">
        <span className="spin-dot badge-dot dot-primary" />
        <span className="spin-dot badge-dot dot-primary" />
        <span className="spin-dot badge-dot dot-primary" />
        <span className="spin-dot badge-dot dot-primary" />
      </div>
    </div>
  );
}

export default Loader;
