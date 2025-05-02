import React from "react";
import Modal from "react-bootstrap/Modal";

export default function ImportConfirmBox(props) {
  const { show, onHide, children } = props;

  return (
    <>
      <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        show={show}
        onHide={onHide}
      >
        <div className="modal-content">
          <div className="modal-body">
            <div className="modal-info-body d-flex">
              <div className="modal-info-icon warning">
                <img
                  src="/img/warning.svg"
                  alt="alert-circle"
                  className="svg"
                  style={{ filter: "hue-rotate(90deg)" }}
                />
              </div>
              <div className="modal-info-text">
                <h6>
                  Please ensure that the heading is{" "}
                  <span style={{ color: "red", fontWeight: "bolder" }}>
                    name
                  </span>{" "}
                  , otherwise the import process will fail.
                </h6>
              </div>
            </div>
          </div>
          {children}
        </div>
      </Modal>
    </>
  );
}
