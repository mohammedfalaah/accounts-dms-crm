import React, { useContext, useEffect, useState } from 'react';
import { ContextDatas } from '../services/Context';
import { ApiCall } from '../services/ApiCall';
import moment from 'moment';

const MonthlyEmiPage = () => {
  const { mobileSide } = useContext(ContextDatas);
  const [emiData, setEmiData] = useState([]);

  const getMonthWiseEmi = async () => {
    try {
      const response = await ApiCall("get", "monthly-emi/month-wise");
      const data = response?.message?.data;
      setEmiData(data?.docs || []);
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
