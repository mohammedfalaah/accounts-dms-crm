import { createContext, useEffect, useState } from "react";
import { ApiCall } from "./ApiCall";
import { jwtDecode } from "jwt-decode";
import { Update_Access_Token } from "../utils/Constants";
import { useNavigate } from "react-router-dom";
import { basePath, loginPath } from "./UrlPaths";
import { useLocation } from "react-router-dom";

export const ContextDatas = createContext();

const Context = ({ children }) => {
  const { pathname } = useLocation();
  let navigate = useNavigate();
  const [urlPath, setUrlPath] = useState(window.location.pathname ?? "/");
  const [mobileSide, setmobileSide] = useState(false);
  const [User, setUser] = useState(
  localStorage.getItem("access")
      ? jwtDecode(localStorage.getItem("access"))
      : null
  );
  const [settingsData, setsettingsData] = useState(null);
  const [loading, setloading] = useState(true);
  

  useEffect(() => {
    if (User) {
      const intervalId = setInterval(() => {
        updateAccesToken();
      }, Update_Access_Token);
      return () => clearInterval(intervalId);
    } else {
      localStorage.clear();
      setUser(null);
      return navigate(basePath + loginPath);
    }
  }, [User]);

  const updateAccesToken = async () => {
    const response = await ApiCall("post", "user/refreshToken", {
      token: localStorage.getItem("refresh"),
    });
    if (response?.status) {
      const data = response?.message?.data;
      localStorage.setItem("access", data?.accessToken ?? null);
      localStorage.setItem("refresh", data?.refreshToken ?? null);
    } else {
      localStorage.clear();
      setUser(null);
      return navigate(basePath + loginPath);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <ContextDatas.Provider
      value={{
        mobileSide,
        setmobileSide,
        urlPath,
        settingsData,
        User,
        setUser,
        loading,
        setsettingsData,
        setloading,
        setUrlPath,
      }}
    >
      {children}
    </ContextDatas.Provider>
  );
};

export default Context;
