import React, { useContext, useEffect, useState } from 'react';
import { ContextDatas } from '../services/Context';
import { ApiCall } from '../services/ApiCall';
import moment from 'moment';

const MonthlyEmiPage = () => {
  const { mobileSide } = useContext(ContextDatas);
  const [emiData, setEmiData] = useState([]);
   const [pagination, setPagination] = useState({
      page: 1,
      limit: 10,
      totalDocs: 0,
      totalPages: 1,
      hasPrevPage: false,
      hasNextPage: false
    });

  const getMonthWiseEmi = async  (page = 1, limit = 10) => {
    try {
      const response = await ApiCall("get", "monthly-emi/month-wise");
      const data = response?.message?.data;
      setEmiData(data?.docs || []);
       setPagination({
        page: data.page,
        limit: data.limit,
        totalDocs: data.totalDocs,
        totalPages: data.totalPages,
        hasPrevPage: data.hasPrevPage,
        hasNextPage: data.hasNextPage
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMonthWiseEmi();
  }, []);

  return (
    <div className={`contents ${mobileSide ? "expanded" : ""}`}>
      <div className="demo2 mb-0vt-t-head-bg">
        <div className="container-fluid">
          <div className="row mt-4">
            <div className="col-lg-12">
              <div className="card border-0 custom-margin">
                <div className="card-header">
                  <h6>Monthly EMI</h6>
                </div>
                <div className="card-body">
                  <div className="tab-content">
                    <div className='userDatatable mt-1 py-2 px-4 table-responsive'>
     <table className="table table--default body-px-25">
                      <thead className="table-light">
                        <tr className='userDatatable-header'>
                          <th>#</th>
                          <th>Project Code</th>
                          <th>Plan</th>
                          <th>Monthly EMI</th>
                          <th>Total Amount</th>
                          <th>Balance</th>
                          <th>Status</th>
                          <th>EMI Date</th>
                          <th>Due Date</th>
                          <th>Start</th>
                          <th>End</th>
                        </tr>
                      </thead>
                      <tbody>
                        {emiData.length > 0 ? emiData.map((item, index) => (
                          <tr key={item._id}>
                            <td>{index + 1}</td>
                            <td>{item.projectId?.projectCode || 'N/A'}</td>
                            <td>{item?.projectId?.planName}</td>
                            <td>{item.monthlyEmiAmount}</td>
                            <td>{item?.projectId?.totalAmount}</td>
                            <td>{item?.projectId?.balAmount}</td>
                            <td>{item.status}</td>
                            <td>{moment(item.emiDate).format("YYYY-MM-DD")}</td>
                            <td>{moment(item.dueDate).format("YYYY-MM-DD")}</td>
                            <td>{moment(item.startDate).format("YYYY-MM-DD")}</td>
                            <td>{moment(item.endDate).format("YYYY-MM-DD")}</td>
                          </tr>
                        )) : (
                          <tr>
                            <td colSpan="11" className="text-center">No EMI records found</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                    </div>
                     <div className="card-footer">
                          <div className="row align-items-center">
                            <div className="col-md-6">
                              <div>
                                Showing{" "}
                                {(pagination.page - 1) * pagination.limit + 1}{" "}
                                to{" "}
                                {Math.min(
                                  pagination.page * pagination.limit,
                                  pagination.totalDocs
                                )}{" "}
                                of {pagination.totalDocs} entries
                              </div>
                            </div>
                            <div className="col-md-6">
                              <nav aria-label="Page navigation">
                                <ul className="pagination justify-content-end mb-0">
                                  <li
                                    className={`page-item ${
                                      !pagination.hasPrevPage ? "disabled" : ""
                                    }`}
                                  >
                                    <button
                                      className="page-link"
                                      onClick={() =>
                                        handlePageChange(pagination.page - 1)
                                      }
                                      disabled={!pagination.hasPrevPage}
                                    >
                                      Previous
                                    </button>
                                  </li>

                                  {Array.from(
                                    { length: pagination.totalPages },
                                    (_, i) => i + 1
                                  ).map((pageNum) => (
                                    <li
                                      key={pageNum}
                                      className={`page-item ${
                                        pagination.page === pageNum
                                          ? "active"
                                          : ""
                                      }`}
                                    >
                                      <button
                                        className="page-link"
                                        onClick={() =>
                                          handlePageChange(pageNum)
                                        }
                                      >
                                        {pageNum}
                                      </button>
                                    </li>
                                  ))}

                                  <li
                                    className={`page-item ${
                                      !pagination.hasNextPage ? "disabled" : ""
                                    }`}
                                  >
                                    <button
                                      className="page-link"
                                      onClick={() =>
                                        handlePageChange(pagination.page + 1)
                                      }
                                      disabled={!pagination.hasNextPage}
                                    >
                                      Next
                                    </button>
                                  </li>
                                </ul>
                              </nav>
                            </div>
                          </div>
                        </div>

                    
               
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default MonthlyEmiPage;
