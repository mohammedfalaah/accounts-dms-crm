import { showToast } from "./Toast";

export function ShowMessage(result, type) {
  let message = "";

  switch (type) {
    case "success":
      switch (result) {
        case "add":
          message = "Added Successfully";
          break;
        case "update":
          message = "Updated Successfully";
          break;
        case "delete":
          message = "Deleted Successfully";
          break;
        default:
          message = result;
          break;
      }
      showToast(message, "success");
      break;
    case "error":
      showToast(result, "error"); 
      break;
    default:
      console.warn("Unknown type: " + type);
      break;
  }
}
