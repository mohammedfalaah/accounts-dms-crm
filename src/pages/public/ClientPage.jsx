import React, { useContext, useEffect, useState } from 'react';
import { ContextDatas } from '../../services/Context';
import { ApiCall } from '../../services/ApiCall';

const ClientPage = () => {
  const { mobileSide } = useContext(ContextDatas);
  const [clientList, setClientList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalDocs: 0,
    totalPages: 1,
    hasPrevPage: false,
    hasNextPage: false
  });

   const [currentProject, setCurrentProject] = useState({
    clientId: '',
      name: "",
      startedDate: "",
      status: "active", // active, completed, blocked
      scheme: "",
      district: "",
      handledDM: "",
      handledAccountant: "",
      isBlocked: false
    });

  const getClientList = async (page = 1, limit = 10) => {
    try {
      const response = await ApiCall("get", "projects/clients");
      const data = response.message.data;
      setClientList(data.docs);
      setPagination({
        page: data.page,
        limit: data.limit,
        totalDocs: data.totalDocs,
        totalPages: data.totalPages,
        hasPrevPage: data.hasPrevPage,
        hasNextPage: data.hasNextPage
      });
    } catch (error) {
      console.error("Error fetching client list:", error);
    }
  };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const response = await ApiCall("put",`projects`, currentProject);
         console.log(response);
         
        getProjectList(pagination.page, pagination.limit);
        setShowModal(false);
        resetForm();
      } catch (error) {
        console.error('Error saving project:', error);
        setError(`Error ${isEditMode ? 'updating' : 'adding'} project: ${error.response?.data?.message || error.message}`);
      }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentProject({
          ...currentProject,
          [name]: value
        });
      };

      const resetForm = () => {
        setCurrentProject({
          _id: '',
          name: "",
          startedDate: "",
          status: "active",
          scheme: "",
          district: "",
          handledDM: "",
          handledAccountant: "",
          isBlocked: false,
          clientid: ''
        });
        setSelectedClientId(null);
      };
      
  

  useEffect(() => {
    getClientList();
  }, []);

  // Dummy action handlers
  const handleView = (id) => console.log("View", id);
  const handleDelete = async (id) =>
    {
        if (window.confirm("Are you sure you want to delete this project?")){
            try {
                const response = await ApiCall ("delete",`projects/clients/${id}`)
                console.log(response);
                
                
            } catch (error) {
                
            }
        }

    } 


  return (
    <div className={`contents ${mobileSide ? "expanded" : ""}`}>
      <div className="demo2 mb-0 t-thead-bg">
        <div className="container-fluid">
          <div className="row mt-4">
            <div className="col-lg-12">
              <div className="card border-0 custom-margin">
                <div className="card-header">
                  <h6>Client List</h6>
                </div>
                <div className="card-body p-0">
                  <div className="tab-content">
                    <div className="tab-pane fade active show">
                      <div className='userDatatable mt-1 py-2 px-4 table-responsive'>
                        <table className="table table--default body-px-25">
                          <thead>
                            <tr className="userDatatable-header">
                              <th>#</th>
                              <th>Name</th>
                              <th>Address</th>
                              <th>Contact No</th>
                              <th>Email</th>
                              <th>District</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {clientList.map((client, index) => {
                              const address = client.address?.[0] || {};
                              const fullAddress = [
                                address.line1 || address.houseno || address.house,
                                address.line2,
                                address.city,
                                address.state,
                                address.pincode
                              ]
                                .filter(Boolean)
                                .join(', ');

                              return (
                                <tr key={client._id}>
                                  <td>{(pagination.page - 1) * pagination.limit + index + 1}</td>
                                  <td>{client.name}</td>
                                  <td>{fullAddress || '-'}</td>
                                  <td>{client.contactNo}</td>
                                  <td>{client.email}</td>
                                  <td>{client.district}</td>
                                  <td>
                                    <div className="dropdown">
                                      <button
                                        className="btn btn-sm btn-light"
                                        type="button"
                                        id={`dropdown-${client._id}`}
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                      >
                                        <i className="fas fa-ellipsis-v"></i>
                                      </button>
                                      <ul className="dropdown-menu" aria-labelledby={`dropdown-${client._id}`}>
                                        <li>
                                          <button className="dropdown-item" onClick={() => handleEdit(client)}>
                                            Edit
                                          </button>
                                        </li>
                                        <li>
                                        <button
  className="dropdown-item"
  onClick={() => {
    setSelectedClientId(client._id); // Save selected client ID
    setCurrentProject(prev => ({
      ...prev,
      clientId: client._id, // Set client ID in project
      name: "",
      startedDate: "",
      status: "active",
      scheme: "",
      plan:"",
      district: client.district || "",
      handledDM: "",
      handledAccountant: "",
      isBlocked: false
    }));
    setShowModal(true); // Show modal
  }}
>
  Add Project
</button>

                                        </li>
                                        <li>
                                          <button className="dropdown-item text-danger" onClick={() => handleDelete(client._id)}>
                                            Delete
                                          </button>
                                        </li>
                                      </ul>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
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
          {/* Add/Edit Project Modal */}
          <div 
        className={`modal fade ${showModal ? 'show' : ''}`} 
        style={{ display: showModal ? 'block' : 'none' }}
        id="projectModal" 
        tabIndex={-1} 
        aria-labelledby="projectModalLabel" 
        aria-hidden={!showModal}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="projectModalLabel">
                {
                // isEditMode ? 'Edit Project' : 
                'Add New Project'
                }
              </h5>
              <button 
                type="button" 
                className="btn-close" 
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
              {/* <div className="mb-3">
  <label htmlFor="clientid" className="form-label">Client ID</label>
  <input 
    type="text" 
    className="form-control" 
    id="clientid" 
    name="clientid"
    value={currentProject.clientid}
    readOnly
  />
</div> */}

                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Project Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="name" 
                    name="name"
                    value={currentProject.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
            
                <div className="mb-3">
                  <label htmlFor="startedDate" className="form-label">Started Date</label>
                  <input 
                    type="date" 
                    className="form-control" 
                    id="startedDate" 
                    name="startedDate"
                    value={currentProject.startedDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="status" className="form-label">Status</label>
                  <select
                    className="form-select"
                    id="status"
                    name="status"
                    value={currentProject.status}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="scheme" className="form-label">Scheme</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="scheme" 
                    name="scheme"
                    value={currentProject.scheme}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="district" className="form-label">District</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="district" 
                    name="district"
                    value={currentProject.district}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="handledDM" className="form-label">Handled DM</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="handledDM" 
                    name="handledDM"
                    value={currentProject.handledDM}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="handledAccountant" className="form-label">Handled Accountant</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="handledAccountant" 
                    name="handledAccountant"
                    value={currentProject.handledAccountant}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {
                    // isEditMode ? 'Update' :
                     'Save'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {showModal && <div className="modal-backdrop fade show"></div>}

    </div>
    
  );
};

export default ClientPage;
