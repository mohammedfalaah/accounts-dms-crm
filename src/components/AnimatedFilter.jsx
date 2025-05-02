import React, { useState } from "react";

function AnimatedRow({ children }) {
  const [isRowVisible, setIsRowVisible] = useState(true);
  const [buttonText, setButtonText] = useState("Hide Filter");

  const toggleRowAnimation = () => {
    setIsRowVisible(!isRowVisible);
    setButtonText(isRowVisible ? "Show Filter" : "Hide Filter"); // Change button text based on visibility state
  };

  return (
    <div className={`text-right ${isRowVisible ? "mt-2" : "my-2"}`}>
      <a
        href="#"
        onClick={toggleRowAnimation}
        style={{ textDecoration: "underline", transition: "0.3s" }} // Set transition for text change
      >
        {buttonText}
      </a>

      <div
        className=""
        style={{
          overflow: isRowVisible ? "" : "hidden",
          transition: " 0.2s", // Include padding in the transition
          maxHeight: isRowVisible ? "1000px" : "0",
          paddingTop: isRowVisible ? "10px" : "0",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default AnimatedRow;
