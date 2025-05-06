import React, { useContext, useEffect, useState } from "react";
import { ContextDatas } from "../services/Context";
import { ApiCall } from "../services/ApiCall";

function JoblistPage() {
  const [projectsList, setProjectsList] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showEmiModal, setShowEmiModal] = useState(false);
  const [selectedProjectForEmi, setSelectedProjectForEmi] = useState(null);
  const { mobileSide, setmobileSide } = useContext(ContextDatas);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalDocs: 0,
    totalPages: 1,
    hasPrevPage: false,
    hasNextPage: false
  });
  const [currentProject, setCurrentProject] = useState({
    _id: '',
    name: "",
    startedDate: "",
    status: "active", // active, completed, blocked
    scheme: "",
    district: "",
    handledDM: "",
    handledAccountant: "",
    isBlocked: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProject({
      ...currentProject,
      [name]: value
    });
  };

  const handleEdit = (project) => {
    setCurrentProject({
      _id: project._id,
      name: project.name,
      startedDate: project.startedDate,
      status: project.status,
      scheme: project.scheme,
      district: project.district,
      handledDM: project.handledDM,
      handledAccountant: project.handledAccountant,
      isBlocked: project.isBlocked
    });
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
       const response = await ApiCall("put",`projects/${currentProject._id}`, currentProject);
       console.log(response);
       
      } else {
        // Add new project
       const response = await ApiCall("put",`projects`, currentProject);
       console.log(response);
       
      }
      
      // Refresh the list and close modal
      getProjectList(pagination.page, pagination.limit);
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error('Error saving project:', error);
      setError(`Error ${isEditMode ? 'updating' : 'adding'} project: ${error.response?.data?.message || error.message}`);
    }
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
      isBlocked: false
    });
    setIsEditMode(false);
  };


  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      getProjectList(newPage, pagination.limit);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        const response = await ApiCall("delete",`projects/${id}`);
        console.log(response, "deklete")
        getProjectList(pagination.page, pagination.limit); // Refresh the current page
      } catch (error) {
        console.error('Error deleting project:', error);
        setError('Error deleting project');
      }
    }
  };


  const getProjectList = async (page = 1, limit = 10) => {
    try {
      const response = await ApiCall("get", `projects?page=${page}&limit=${limit}`);
      console.log(response, "====getProjectListgetProjectList");
  
      const data = response.message.data;
  
      setProjectsList(data.docs);
      setPagination({
        page: data.page,
        limit: data.limit,
        totalDocs: data.totalDocs,
        totalPages: data.totalPages,
        hasPrevPage: data.hasPrevPage,
        hasNextPage: data.hasNextPage
      });
      
      // Optional: Clear error if previously set
      // setError(null);
      
    } catch (error) {
      console.error("Error fetching project list:", error);
      // Optional: Set error state here if needed
      // setError(error.message || "An error occurred");
    }
  };
  
useEffect(() => {
  getProjectList();
}, [])


  return (
    <>
      <div className={`contents ${mobileSide ? "expanded" : ""}`}>
        <div className="demo2 mb-0 t-thead-bg">
          <div className="container-fluid">
            <div className="row mt-4">
              <div className="col-lg-12">
                <div className="card border-0 custom-margin">
                  <div className="card-header">
                    <h6>Project List</h6>
                  </div>
                  <div style={{float:'right'}}>
                  <button style={{float:'right'}} 
                        className="btn mt-10 btn-primary me-2" 
                        onClick={() => {
                          resetForm();
                          setShowModal(true);
                        }}
                      >
                        Add New Project
                      </button>

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
  {projectsList.map((project, index) => (
    <tr key={project._id}>
      <td>{(pagination.page - 1) * pagination.limit + index + 1}</td>
      <td>{project.clientDetails?.name || '-'}</td>
      <td>{new Date(project.startDate).toLocaleDateString()}</td>
      <td>
        <span className={`badge bg-${project.status === 'assigned' ? 'warning' : project.status === 'active' ? 'success' : 'secondary'}`}>
          {project.status}
        </span>
      </td>
      <td>{project.planName || '-'}</td>
      <td>{project.clientDetails?.district || '-'}</td>
      <td>{project.districtManager?.name || '-'}</td>
      <td>{project.districtManager?.email || '-'}</td>
      <td>-</td> {/* Block status not present in the response */}
      <td>
        <div className="dropdown">
        <button
                                        className="btn btn-sm btn-light"
                                        type="button"
                                        // id={`dropdown-${client._id}`}
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                      >
                                        <i className="fas fa-ellipsis-v"></i>
                                      </button>
                                      <ul className="dropdown-menu" aria-labelledby={`dropdown-${project._id}`}>
                                        <li>
                                          <button className="dropdown-item" onClick={() => handleEdit(project)}>
                                            Edit

                                          </button>

                                        </li>
                                        <li>
                                          <button className="dropdown-item">
                                            View
                                          </button>
                                        </li>
                                        <li>
  <button 
    className="dropdown-item" 
    onClick={() => {
      setSelectedProjectForEmi(project);
      setShowEmiModal(true);
    }}
  >
    EMI Plan
  </button>
</li>

                                        <li>
                                          <button className="dropdown-item" onClick={() => handleDelete(project._id)}>
                                            Delete

                                          </button>
                                        </li>
                                      </ul>


        </div>
                         {/* <div className="table-actions">
 
  <a onClick={() => handleDelete(project._id)} >
    <img className="svg" src="img/svg/trash-2.svg" alt />
  </a>
</div> */}

                          </td>
    </tr>
  ))}
</tbody>

                          </table>
                        </div>
                        <div className="card-footer">
                      <div className="row align-items-center">
                        <div className="col-md-6">
                          <div>Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.totalDocs)} of {pagination.totalDocs} entries</div>
                        </div>
                        <div className="col-md-6">
                          <nav aria-label="Page navigation">
                            <ul className="pagination justify-content-end mb-0">
                              <li className={`page-item ${!pagination.hasPrevPage ? 'disabled' : ''}`}>
                                <button 
                                  className="page-link" 
                                  onClick={() => handlePageChange(pagination.page - 1)}
                                  disabled={!pagination.hasPrevPage}
                                >
                                  Previous
                                </button>
                              </li>
                              
                              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(pageNum => (
                                <li 
                                  key={pageNum} 
                                  className={`page-item ${pagination.page === pageNum ? 'active' : ''}`}
                                >
                                  <button 
                                    className="page-link" 
                                    onClick={() => handlePageChange(pageNum)}
                                  >
                                    {pageNum}
                                  </button>
                                </li>
                              ))}
                              
                              <li className={`page-item ${!pagination.hasNextPage ? 'disabled' : ''}`}>
                                <button 
                                  className="page-link" 
                                  onClick={() => handlePageChange(pagination.page + 1)}
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
                {isEditMode ? 'Edit Project' : 'Add New Project'}
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
                  <label htmlFor="name" className="form-label">Client ID</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    id="name" 
                    name="name"
                    value={currentProject.clientid}
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
                    {isEditMode ? 'Update' : 'Save'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {showModal && <div className="modal-backdrop fade show"></div>}
{/* EMI MODAL */}
{/* EMI Plan Modal */}
<div 
  className={`modal fade ${showEmiModal ? 'show' : ''}`} 
  style={{ display: showEmiModal ? 'block' : 'none' }}
  tabIndex={-1}
>
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">EMI Plan</h5>
        <button 
          type="button" 
          className="btn-close" 
          onClick={() => setShowEmiModal(false)}
          aria-label="Close"
        />
      </div>
      <div className="modal-body">
        {/* You can show project name or custom EMI details here */}
        <p>Project: <strong>{selectedProjectForEmi?.clientDetails?.name || '-'}</strong></p>
        <p>Start Date: {new Date(selectedProjectForEmi?.startDate).toLocaleDateString()}</p>
        {/* Add EMI form or details here */}
        <div className="mb-3">
          <label className="form-label">EMI Amount</label>
          <input type="number" className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Installments</label>
          <input type="number" className="form-control" />
        </div>
      </div>
      <div className="modal-footer">
        <button className="btn btn-secondary" onClick={() => setShowEmiModal(false)}>Close</button>
        <button className="btn btn-primary">Save EMI Plan</button>
      </div>
    </div>
  </div>
</div>
{showEmiModal && <div className="modal-backdrop fade show"></div>}

    </>
  );
}

export default JoblistPage;
