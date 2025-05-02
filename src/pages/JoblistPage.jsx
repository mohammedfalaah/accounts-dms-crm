import React, { useContext } from "react";
import { ContextDatas } from "../services/Context";

function JoblistPage() {
  const { mobileSide, setmobileSide } = useContext(ContextDatas);

  const dummyData = [
    {
      name: "John Doe",
      startedDate: "2024-12-01",
      status: "Active",
      scheme: " Plus",
      district: "Dubai",
      dm: "Ali Khan",
      accountant: "Sara Lee",
      blockStatus: "Unblocked",
    },
    {
      name: "Jane Smith",
      startedDate: "2024-11-10",
      status: "Pending",
      scheme: "Basic Plan",
      district: "Sharjah",
      dm: "Ayesha Noor",
      accountant: "Imran Ali",
      blockStatus: "Blocked",
    },
  ];

  return (
    <>
      <div className={`contents ${mobileSide ? "expanded" : ""}`}>
        <div className="demo2 mb-0 t-thead-bg">
          <div className="container-fluid">
            <div className="row mt-4">
              <div className="col-lg-12">
                <div className="card border-0 custom-margin">
                  <div className="card-header">
                    <h6>Job List</h6>
                  </div>
                  <div className="card-body p-0">
                    <div className="tab-content">
                      <div className="tab-pane fade active show">
                        <div className="userDatatable mt-1 py-2 px-4 table-responsive">
                          <table className="table table--default body-px-25">
                            <thead>
                              <tr className="userDatatable-header">
                                <th>#</th>
                                <th>Name</th>
                                <th>Started Date</th>
                                <th>Status</th>
                                <th>Scheme</th>
                                <th>District</th>
                                <th>Handled DM</th>
                                <th>Handled Accountant</th>
                                <th>Block Status</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {dummyData.length > 0 ? (
                                dummyData.map((item, index) => (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.startedDate}</td>
                                    <td>{item.status}</td>
                                    <td>{item.scheme}</td>
                                    <td>{item.district}</td>
                                    <td>{item.dm}</td>
                                    <td>{item.accountant}</td>
                                    <td>{item.blockStatus}</td>
                                    <td>
                                      <button className="btn btn-sm btn-primary">
                                        View
                                      </button>
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan="10" className="text-center">
                                    No Data Available
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                        {/* <Pagination
                          pagination={{ hasNextPage: false, hasPrevPage: false, totalDocs: dummyData.length }}
                          pages={{ page: 1, limit: 10 }}
                          setPages={() => {}}
                        /> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default JoblistPage;
