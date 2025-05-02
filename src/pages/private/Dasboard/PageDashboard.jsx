import React, { useContext, useEffect } from "react";
import { ContextDatas } from "../../../services/Context";


function PageDashboard() {
  const { mobileSide, setmobileSide } = useContext(ContextDatas);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setmobileSide(!mobileSide);
    }
  }, []);

  return (
    
    <div className={`contents ${mobileSide ? "expanded" : ""}`}>
      <div className="demo4 crm">
        <div className="container-fluid">
          <h1 style={{marginTop:'5px'}}>ACCOUNTANTS AND DM'S DASHBOARD</h1>
         <div className="">
  <div className="crm mb-25">
    <div className="container-fluid">
      <div className="row ">
        <div className="col-lg-12">
          <div className="breadcrumb-main">
            <div className="breadcrumb-action justify-content-center flex-wrap">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="#"><i className="uil uil-estate" />Dashboard</a></li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
        <div className="col-xxl-6">
          <div className="row">
            <div className="col-xxl-6 col-sm-6 mb-25">
              {/* Card 1  */}
              <div className="ap-po-details ap-po-details--2 p-25 radius-xl d-flex justify-content-between">
                <div className="overview-content w-100">
                  <div className=" ap-po-details-content d-flex flex-wrap justify-content-between">
                    <div className="ap-po-details__titlebar">
                      <h1>100</h1>
                      <p>Total Projects</p>
                    </div>
                    <div className="ap-po-details__icon-area">
                      <div className="svg-icon order-bg-opacity-primary color-primary">
                        <i className="uil uil-briefcase-alt" />
                      </div>
                    </div>
                  </div>
                  <div className="ap-po-details-time">
                    <span className="color-success"><i className="las la-arrow-up" />
                      <strong>25.36%</strong></span>
                    <small>Since last month</small>
                  </div>
                </div>
              </div>
              {/* Card 1 End  */}
            </div>
            <div className="col-xxl-6 col-sm-6 mb-25">
              {/* Card 2 */}
              <div className="ap-po-details ap-po-details--2 p-25 radius-xl d-flex justify-content-between">
                <div className="overview-content w-100">
                  <div className=" ap-po-details-content d-flex flex-wrap justify-content-between">
                    <div className="ap-po-details__titlebar">
                      <h1>30,825</h1>
                      <p>Total Complete Project</p>
                    </div>
                    <div className="ap-po-details__icon-area">
                      <div className="svg-icon order-bg-opacity-info color-info">
                        <i className="uil uil-shopping-cart-alt" />
                      </div>
                    </div>
                  </div>
                  <div className="ap-po-details-time">
                    <span className="color-success"><i className="las la-arrow-up" />
                      <strong>25.36%</strong></span>
                    <small>Since last month</small>
                  </div>
                </div>
              </div>
              {/* Card 2 End  */}
            </div>
            <div className="col-xxl-6 col-sm-6 mb-25">
              {/* Card 3 */}
              <div className="ap-po-details ap-po-details--2 p-25 radius-xl d-flex justify-content-between">
                <div className="overview-content w-100">
                  <div className=" ap-po-details-content d-flex flex-wrap justify-content-between">
                    <div className="ap-po-details__titlebar">
                      <h1>$30,825</h1>
                      <p>Due payments</p>
                    </div>
                    <div className="ap-po-details__icon-area">
                      <div className="svg-icon order-bg-opacity-secondary color-secondary">
                        <i className="uil uil-usd-circle" />
                      </div>
                    </div>
                  </div>
                  <div className="ap-po-details-time">
                    <span className="color-danger"><i className="las la-arrow-down" />
                      <strong>25.36%</strong></span>
                    <small>Since last month</small>
                  </div>
                </div>
              </div>
              {/* Card 3 End  */}
            </div>
            <div className="col-xxl-6 col-sm-6 mb-25">
              {/* Card 4  */}
              <div className="ap-po-details ap-po-details--2 p-25 radius-xl d-flex justify-content-between">
                <div className="overview-content w-100">
                  <div className=" ap-po-details-content d-flex flex-wrap justify-content-between">
                    <div className="ap-po-details__titlebar">
                      <h1>30,825</h1>
                      <p>New Customers</p>
                    </div>
                    <div className="ap-po-details__icon-area">
                      <div className="svg-icon order-bg-opacity-warning color-warning">
                        <i className="uil uil-users-alt" />
                      </div>
                    </div>
                  </div>
                  <div className="ap-po-details-time">
                    <span className="color-success"><i className="las la-arrow-up" />
                      <strong>25.36%</strong></span>
                    <small>Since last month</small>
                  </div>
                </div>
              </div>
              {/* Card 4 End  */}
            </div>
          </div>
        </div>
        
      </div>
      {/* ends: .row */}
    </div>
  </div>
</div>

      </div>
    </div>
    </div>
  );
}

export default PageDashboard;
