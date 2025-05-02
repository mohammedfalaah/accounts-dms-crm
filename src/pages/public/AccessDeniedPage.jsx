import React, { useContext } from "react";
import { ContextDatas } from "../../services/Context";
import { useNavigate } from "react-router-dom";
import { basePath, loginPath } from "../../services/UrlPaths";

function AccessDeniedPage() {
  const { setUser } = useContext(ContextDatas);
  let navigate = useNavigate();

  const BacktoLogin = () => {
    localStorage.clear();
    setUser(null);
    return navigate(basePath + loginPath);
  };
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-12">
          <div className="min-vh-100 content-center">
            <div className="error-page text-center">
              <img src="/img/svg/maintenance.svg" alt={404} className="svg" />
              <h5 className="fw-500 mt-35">
                Sorry! You Cannot Access This Page.
              </h5>
              <div className="content-center mt-30">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    BacktoLogin();
                  }}
                  className="btn btn-primary btn-default btn-squared px-30"
                >
                  Back To Login
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccessDeniedPage;
