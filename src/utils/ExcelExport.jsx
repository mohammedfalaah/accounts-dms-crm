import React from "react";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

const ExcelExport = ({ tableData, fileName, format,onSuccess }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToExcel = async (
    table,
    fileName,
    fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    fileExtension = ".xlsx"
  ) => {
    try {
      const ws = XLSX.utils.json_to_sheet(table);
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(data, fileName + fileExtension);
      return true;
    } catch (error) {
      ShowMessage(error?.message, "error");
      return false;
    }
  };

  const handleClick =async () => {
    const formattedData = tableData.map(({ _id, ...rest }) => {
      const filteredRest = Object.fromEntries(
        Object.entries(format(rest)).filter(([_, v]) => v !== undefined)
      );
      return filteredRest;
    });
    const success = await exportToExcel(formattedData, fileName, fileType, fileExtension);
    if (success) {
      onSuccess(); // Call the onSuccess callback function
    }
  };

  return (
    <button
      className="btn btn-primary btn-default btn-squared px-20"
      // style={{ margin: "0 -7px" }}
      onClick={handleClick}>
      Export
    </button>
  );
};

export default ExcelExport;
