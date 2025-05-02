import axios from "axios";
import { BaseUrl } from "./BaseUrls";
import { showToast } from "../utils/Toast";
import { basePath, loginPath } from "./UrlPaths";

export const ApiCall = async (method, endPoint, data, params, is_formdata) => {
  var headers = {
    "Content-Type": is_formdata ? "multipart/form-data" : "application/json",
    Authorization: "Bearer " + localStorage.getItem("access"),
  };
  var url = BaseUrl + endPoint;
  try {
    const res = await axios({
      method,
      url,
      params,
      data,
      headers,
    });

    var response = { status: true, message: res.data };
    return response;
  } catch (error) {
  
    console.log(error);
    if (!error?.response?.status) {
      if (endPoint === "upload") {
        showToast("Uploaded File Is Too Large", "error");
      } else {
        showToast("Something went wrong", "error");
      }

      return {
        status: false,
        message:
          endPoint === "upload"
            ? "Uploaded file is too large"
            : "Something went wrong",
      };
    } else {
      showToast(
        error?.response?.data?.message ?? "Something Went Wrong",
        "error"
      );
      if (error?.response?.status == 401) {
        if (window.location.pathname !== basePath + loginPath) {
          localStorage.clear();
          window.location.reload();
        }
      }
      return {
        status: false,
        message: error?.response?.data?.message ?? "something went wrong",
      };
    }
  }
};
