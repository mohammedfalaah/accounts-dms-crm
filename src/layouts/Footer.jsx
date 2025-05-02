import React from "react";

function Footer() {
  return (
    <footer className="footer-wrapper">
      <div className="footer-wrapper__inside">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12" style={{ textAlign: "center" }}>
              <div className="footer-copyright">
                <p>
                  <span>© {new Date().getFullYear()}</span>
                  <a href="#">DIGIBIZ BUILD ON QUALITY</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
