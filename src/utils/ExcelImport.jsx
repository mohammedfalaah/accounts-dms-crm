import React, { useRef } from "react";
import PropTypes from "prop-types";
import { ApiCall } from "../services/ApiCall";
import { ShowMessage } from "./Messages";

function ExcelImporter({
  apiUrl,
  onImportSuccess,
  onDataImport,
  onSetButtonLoading,
  setShowImport,
}) {
  const fileInputRef = useRef(null);

  const handleExcelUpload = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("file", file);

    onSetButtonLoading(true);
    const response = await ApiCall(
      "post",
      apiUrl,
      formData,
      { type: "document" },
      "multipart/form-data"
    );
    onSetButtonLoading(false);

    if (response.status) {
      ShowMessage("Imported Successfully", "success");
      onImportSuccess();
      setShowImport(false);
      onDataImport([]);
      fileInputRef.current.value = "";
    } else {
      ShowMessage("Failed To Import Data", "error");
    }
  };

  return (
    <input
      ref={fileInputRef}
      type="file"
      accept=".xlsx, .xls"
      style={{ display: "none" }}
      onChange={handleExcelUpload}
      id="fileInput"
    />
  );
}

ExcelImporter.propTypes = {
  apiUrl: PropTypes.string.isRequired,
  onDataImport: PropTypes.func.isRequired,
  onSetButtonLoading: PropTypes.func.isRequired,
  onImportSuccess: PropTypes.func.isRequired,
};

export default ExcelImporter;
