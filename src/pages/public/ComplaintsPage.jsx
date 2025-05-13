import React, { useContext, useEffect, useState } from 'react';
import { ApiCall } from '../../services/ApiCall';
import { ContextDatas } from '../../services/Context';
import moment from 'moment';

const ComplaintsPage = () => {
  const { mobileSide } = useContext(ContextDatas);
  const [complaints, setComplaints] = useState([]);
   const [pagination, setPagination] = useState({
      page: 1,
      limit: 10,
      totalDocs: 0,
      totalPages: 1,
      hasPrevPage: false,
      hasNextPage: false,
    });

  const getComplaints = async () => {
    try {
      const response = await ApiCall("get", "complaints");
      console.log(response);
      const data = response.message.data;
      setComplaints(data.docs);
      setPagination({
        page: data.page,
        limit: data.limit,
        totalDocs: data.totalDocs,
        totalPages: data.totalPages,
        hasPrevPage: data.hasPrevPage,
        hasNextPage: data.hasNextPage,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getComplaints();
  }, []);

  return (
    <div className={`contents ${mobileSide ? "expanded" : ""}`}>
      <div className="demo2 mb-0 t-thead-bg">
        <div className="container-fluid">
          <div className="row mt-4">
            <div className="col-lg-12">
              <div className="card border-0 custom-margin">
                <div className="card-header">
                  <h6>Complaints</h6>
                </div>
                <div className="card-body p-0">
                  <div className="tab-content">
                    <div className="tab-pane fade active show">
                      <div className="userDatatable mt-1 py-2 px-4 table-responsive">
                        <table className="table table--default body-px-25">
                          <thead>
                            <tr className="userDatatable-header">
                              <th>#</th>
                              <th>Complaint</th>
                              <th>Issue Type</th>
                              <th>Priority</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {complaints.length > 0 ? complaints.map((item, index) => (
                              <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>{item.complaint}</td>
                                <td>{item.issueType}</td>
                                <td>{item.priority}</td>
                                <td>{item.status}</td>
                              </tr>
                            )) : (
                              <tr>
                                <td colSpan="6" className="text-center">No complaints found</td>
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
                </div> {/* card-body */}
              </div> {/* card */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintsPage;
