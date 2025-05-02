import React from "react";

function Pagination({ pages, pagination, px, setPages }) {
  const handleItemsPerPageChange = (event) => {
    setPages({ ...pages, limit: event.target.value });
  };

  return (
    <nav
      className={`dm-page mb-2 px-${px || px === 0 ? px : 4}  pb-2`}
      style={{ float: "right" }}
    >
      <ul className="dm-pagination d-flex">
        <li className="dm-pagination__item">
          <a
            href="#"
            className={`dm-pagination__link pagination-control ${
              !pagination?.hasPreviousPage ? "disabled" : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              if (pagination?.hasPreviousPage) {
                setPages({ ...pages, page: pages.page - 1 });
              }
            }}
            style={{
              pointerEvents: !pagination?.hasPreviousPage ? "none" : "auto",
              opacity: !pagination?.hasPreviousPage ? 0.5 : 1,
              cursor: !pagination?.hasPreviousPage ? "none" : "auto",
            }}
          >
            <span className="la la-angle-left" />
          </a>
          <a href="#" className={`dm-pagination__link active`}>
            <span className="page-number">{pages?.page}</span>
          </a>
          <a
            href="#"
            className={`dm-pagination__link pagination-control ${
              !pagination?.hasNextPage ? "disabled" : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              if (pagination?.hasNextPage) {
                setPages({ ...pages, page: pages.page + 1 });
              }
            }}
            style={{
              pointerEvents: !pagination?.hasNextPage ? "none" : "auto",
              opacity: !pagination?.hasNextPage ? 0.5 : 1,
              cursor: !pagination?.hasNextPage ? "not-allowed" : "pointer",
            }}
          >
            <span className="la la-angle-right" />
          </a>
          <div className="paging-option">
            <select
              name="page-number"
              className="page-selection"
              value={pages.limit}
              onChange={handleItemsPerPageChange}
            >
              <option value={20}>20/page</option>
              <option value={40}>40/page</option>
              <option value={60}>60/page</option>
            </select>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
