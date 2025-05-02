import React, { useState } from "react";
// import { Route, Routes } from "react-router-dom/dist";
import { Route, Routes } from "react-router-dom";

import RouterConnection from "./connection/RouterConnection";
import PageLogin from "./pages/public/PageLogin";
import PageDashboard from "./pages/private/Dasboard/PageDashboard";
import PageNotFound from "./pages/public/PageNotFound";
import {
  basePath,
  loginPath,
  projectlistPath,
 
} from "./services/UrlPaths";
import PrivateRoute from "./utils/PrivateRoute";
import JoblistPage from "./pages/JoblistPage";
function App() {
  return (
    <div>
      <Routes>
        {/* <Route path="/access-denied" element={<AccessDeniedPage />} /> */}
        <Route path={loginPath} element={<PageLogin />} />
        <Route
          path={basePath}
          element={
            <PrivateRoute>
              <RouterConnection />
            </PrivateRoute>
          }
        >
          <Route index element={<PageDashboard />} />
          <Route path={projectlistPath} element={<JoblistPage />} />

         
        
         
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
