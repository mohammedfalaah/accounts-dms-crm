import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { basePath, loginPath } from "../services/UrlPaths";
import { ContextDatas } from "../services/Context";

function PrivateRoute({ children }) {
  const { User } = useContext(ContextDatas);

  if (User === null || User === false) {
    return <Navigate to={basePath + loginPath} />;
  }

  return children;
}

export default PrivateRoute;
