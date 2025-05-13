import React, { useContext, useState, useEffect } from "react";
import { useFormik } from "formik";
import { loginValidationSchema } from "../../utils/Validation";
import { BlockUI } from "primereact/blockui";
import "primeicons/primeicons.css";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router";
import { ContextDatas } from "../../services/Context";
import { ApiCall } from "../../services/ApiCall";
import { LoginUrl } from "../../services/BaseUrls";
import {
  basePath,
} from "../../services/UrlPaths";
import { ShowMessage } from "../../utils/Messages";

function PageLogin() {
  const [pageLoading, setpageLoading] = useState(false);
  const [passShow, setpassShow] = useState(false);
  const {
    setUser,
    setloading,
    setUrlPath,
    User,
  } = useContext(ContextDatas);

  let navigate = useNavigate();

 

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      Login(values);
    },
  });

  const Login = async (values) => {
    setpageLoading(true);
    const response = await ApiCall("post", LoginUrl, values);
    console.log(response,"response-------");
    
    setpageLoading(false);
  
    if (response?.status) {
      const data = response.message?.data;
      const role = response.message?.data?.userDetails?.role;
      console.log(role,"rolerolerole");
      
  // if (role !== "accounts" && role !== "district-manager") {
      if (role !== "accounts" && role !== "district-manager") {
        ShowMessage("Access Denied: Only accounts and district-manager can log in.", "error");
        return;
      }
  
      setloading(false);
      ShowMessage("Successfully Logged In", "success");
  
      setUser(data.token);
      localStorage.setItem("access", data.token ?? null);
  
      setUrlPath(basePath);
      return navigate(basePath);
    } else {
      ShowMessage("Login Failed", "error");
    }
  };
  
  
  

  return (
    <BlockUI fullScreen template={<Loader />} blocked={pageLoading}>
      <div>
        <main className="main-content" style={{ marginTop: "-20px" }}>
          <div className="admin">
            <div className="container-fluid">
              <div className="row justify-content-center">
                <div className="col-xxl-3 col-xl-4 col-md-6 col-sm-8">
                  <div className="edit-profile">
                    <div className="edit-profile__logos">
                    
                                    <img style={{minWidth:'10px', borderRadius:'25px'}} className="dark" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJGyYm_xL81Josj16wvc_z9BMIHK3Iw1vRnQ&s" alt="logo" height={100}  />

                    
                    </div>

                    <div className="card border-0">
                      <div className="card-body">
                        <form
                          onSubmit={(e) => {
                            formik.handleSubmit();
                            e.preventDefault();
                          }}
                        >
                          <div className="edit-profile__body">
                            <div className="form-group mb-25">
                              <label htmlFor="username">
                                 Email Address
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="username"
                                placeholder="name@example.com"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.username}
                              />
                              {formik.touched.username && formik.errors.username ? (
                                <div className="text-danger">
                                  {formik.errors.username}
                                </div>
                              ) : null}
                            </div>

                            <div className="form-group mb-15">
                              <label htmlFor="password-field">password</label>
                              <div className="position-relative">
                                <input
                                  id="password-field"
                                  type={passShow ? "text" : "password"}
                                  className="form-control"
                                  name="password"
                                  placeholder="Password"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.password}
                                />
                                <div
                                  className={`uil ${
                                    passShow ? "uil-eye-slash" : "uil-eye"
                                  } text-lighten fs-15 field-icon toggle-password2`}
                                  onClick={() => setpassShow(!passShow)}
                                ></div>
                              </div>
                              {formik.touched.password &&
                              formik.errors.password ? (
                                <div className="text-danger">
                                  {formik.errors.password}
                                </div>
                              ) : null}
                            </div>

                            <div className="admin-condition">
                              <div className="checkbox-theme-default custom-checkbox ">
                                {/* <input
                                  className="checkbox"
                                  type="checkbox"
                                  id="check-1"
                                  checked={isChecked}
                                  onChange={(e) =>
                                    setIsChecked(e.target.checked)
                                  }
                                />
                                <label htmlFor="check-1">
                                  <span className="checkbox-text">
                                    Keep me logged in
                                  </span>
                                </label> */}
                              </div>
                            </div>
                            <div className="admin__button-group button-group d-flex pt-1 justify-content-md-start justify-content-center">
                              <button
                                className="btn btn-primary btn-default w-100 btn-squared text-capitalize lh-normal px-50 signIn-createBtn"
                                type="submit"
                              >
                                sign in
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </BlockUI>
  );
}

export default PageLogin;
