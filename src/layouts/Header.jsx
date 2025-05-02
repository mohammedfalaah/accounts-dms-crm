import React, { useContext, useState } from "react";
import { ContextDatas } from "../services/Context";
import LogoutConfirmModal from "../components/LogoutConfirmModal";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const { mobileSide, setmobileSide } = useContext(ContextDatas);

  const [logoutConfirm, setlogoutConfirm] = useState(false);
  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <header className="header-top">
        <nav className="navbar navbar-light">
          <div className="navbar-left">
            <div className="logo-area">
              <a className="navbar-brand" href="/">
                <img style={{minWidth:'90px', borderRadius:'25px'}} className="dark" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJGyYm_xL81Josj16wvc_z9BMIHK3Iw1vRnQ&s" alt="logo" height={50}  />
                <img className="light" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJGyYm_xL81Josj16wvc_z9BMIHK3Iw1vRnQ&s" height={50} width={50}/>
              </a>
              <a
                href="#"
                className="sidebar-toggle"
                onClick={(e) => {
                  e.preventDefault();
                  setmobileSide(!mobileSide);
                }}
              >
                <img className="svg" src="/img/svg/align-center-alt.svg" alt="/img" />
              </a>
            </div>
          </div>
          <div className="navbar-right">
            <ul className="navbar-right__menu">
              <li className="nav-search header-search-container">
                <form className="search-form-topMenu show" onSubmit={(e) => e.preventDefault()}>
                  <span className="search-icon uil uil-search" />
                  <input
                    type="text"
                    className="form-control me-sm-2 box-shadow-none"
                    placeholder="Search..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                </form>
              </li>

              <li className="nav-author">
                <div className="dropdown-custom">
                  <div className="nav-item-toggle">
                    <img src="/img/Avatar.jpg" alt="img" className="rounded-circle" />
                    <span className="nav-item__title">
                      Admin
                      <i className="las la-angle-down nav-item__arrow" />
                    </span>
                  </div>
                  <div className="dropdown-parent-wrapper">
                    <div className="dropdown-wrapper">
                      <div
                        className="nav-author__info"
                        style={{ cursor: "pointer" }}
                        onClick={() => setlogoutConfirm(true)}
                      >
                        <div className="author-img">
                          <img src="/img/Avatar.jpg" alt="img" className="rounded-circle" />
                        </div>
                        <div>
                          <h6>Logout</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <LogoutConfirmModal
        show={logoutConfirm}
        onHide={() => setlogoutConfirm(false)}
      />
    </>
  );
}

export default Header;
