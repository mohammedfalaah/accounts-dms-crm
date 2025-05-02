import React, { useState } from "react";

function ToggledFilter({ children }) {
  const [showCardBody, setShowCardBody] = useState(false);

  const toggleFilter = () => {
    setShowCardBody(!showCardBody);
  };
  return (
    <>
      <div
        className="card-header"
        style={{ borderRadius: showCardBody ? "" : "10px" }}
      >
        <h6>Filter</h6>
        <div
          className="layout-button mt-0  justify-content-end p-0"
          style={{ margin: "0 -7px" }}
        >
          <div className="dm-switch-wrap">
            <div className="form-check form-switch form-switch-primary form-switch-md toggle-switch-align">
              <input
                type="checkbox"
                className="form-check-input"
                id="switch-s1"
                defaultChecked={showCardBody}
                onChange={toggleFilter}
                style={{ transition: "0.2s" }}
              />
              <label className="form-check-label" htmlFor="switch-s1" />
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          overflow: showCardBody ? "" : "hidden",
          transition: " 0.2s",
          maxHeight: showCardBody ? "1000px" : "0",
          paddingTop: showCardBody ? "10px" : "0",
        }}
      >
        {children}
      </div>
    </>
  );
}

export default ToggledFilter;
