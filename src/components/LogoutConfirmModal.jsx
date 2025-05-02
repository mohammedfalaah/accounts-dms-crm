import React, { useContext } from "react";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router";
import { ContextDatas } from "../services/Context";
import { basePath, loginPath } from "../services/UrlPaths";

export default function LogoutConfirmModal(props) {
  let navigate = useNavigate();
  const { setUser } = useContext(ContextDatas);
  const { show, onHide } = props;
  const Logout = () => {
    localStorage.clear();
    setUser(null);
    return navigate(basePath + loginPath);
  };
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
                <h6>Are you sure you want to Logout?</h6>
                {/* <p>Some descriptions...</p> */}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-light btn-outlined "
              data-bs-dismiss="modal"
              onClick={onHide}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary "
              data-bs-dismiss="modal"
              onClick={Logout}
            >
              Logout
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
