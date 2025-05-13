import React, { useContext, useEffect } from "react";
import { ContextDatas } from "../services/Context";
import {
  basePath,
  clientlistPath,
  monthlyEmiPath,
  projectlistPath,
} from "../services/UrlPaths";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const {
    mobileSide,
    urlPath,
    setUrlPath,
    loading,
    notification_count,
  } = useContext(ContextDatas);

  const location = useLocation();

  useEffect(() => {
    setUrlPath(location.pathname);

    const handlePopstate = () => {
      setUrlPath(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopstate);
    return () => window.removeEventListener("popstate", handlePopstate);
  }, [location.pathname, setUrlPath]);

  const renderLoadingSkeleton = () => (
    <ul className="dm-skeleton__list">
      <li
        className="shimmer-effect"
        style={{
          width: "90%",
          borderRadius: "0 30px 30px 0",
          height: "40px",
        }}
      ></li>
    </ul>
  );

  return (
    <div className="sidebar-wrapper">
      <div
        className={`sidebar sidebar-collapse ${mobileSide ? "collapsed" : ""}`}
        id="sidebar"
      >
        <div className="sidebar__menu-group">
          <ul className="sidebar_nav">
            
              <>
                <li className={urlPath === basePath ? "active" : ""}>
                  <Link to={basePath} onClick={() => setUrlPath(basePath)}>
                    <span className="nav-icon uil uil-create-dashboard" />
                    <span className="menu-text">Dashboard</span>
                  </Link>
                </li>

                <li className={urlPath.includes("project-list") ? "active" : ""}>
                  <Link
                    to={basePath + projectlistPath}
                    onClick={() => setUrlPath(basePath + projectlistPath)}
                  >
                    <span className="nav-icon uil uil-clipboard-alt" />
                    <span className="menu-text">Project List</span>
                  </Link>
                </li>

                <li className={urlPath.includes("client-list") ? "active" : ""}>
                  <Link
                    to={basePath + clientlistPath}
                    onClick={() => setUrlPath(basePath + clientlistPath)}
                  >
                    <span className="nav-icon uil uil-users-alt" />
                    <span className="menu-text">Clients</span>
                  </Link>
                </li>

                <li className={urlPath.includes("monthly-emi") ? "active" : ""}>
                  <Link
                    to={basePath + monthlyEmiPath}
                    onClick={() => setUrlPath(basePath + monthlyEmiPath)}
                  >
                    <span className="nav-icon uil uil-clipboard-alt" />
                    <span className="menu-text">Monthly Emi's</span>
                  </Link>
                </li>

                <li className={urlPath.includes("payments") ? "active" : ""}>
                  <Link
                    // to={basePath + paymentsPath}
                    // onClick={() => setUrlPath(basePath + paymentsPath)}
                  >
                    <span className="nav-icon uil uil-credit-card" />
                    <span className="menu-text">Payments</span>
                  </Link>
                </li>
              </>
          
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
