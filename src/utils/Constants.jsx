export const StatusColors = {
  awaiting_impression: "#FF0C5460",
  cancelled: "rgb(25 156 255 / 26%)",
  completed: "#FF9A7D0A",
  delivered: "rgb(26 204 83 / 22%)",
  dispatched: "#FF2C5282",
  fabrication: "#FF2F855A",
  impression_recieved: "#FF027A48",
  payment_confirmation: "#FFC53030",
  pricing_plan_added: "#FFC53030",
  refined: "#FFC53030",
  refinement: "#FFC53030",
  scanned_document: "#FFC53030",
  total: "#FFC53030",
  treatment_plan: "#FFC53030",
  waiting_for_delivery: "#FFC53030",
};

export const OrdersStatusCount = [
  { status: "scanned_document", count: 0 },
  { status: "awaiting_impression", count: 0 },
  { status: "impression_recieved", count: 0 },
  { status: "pricing_plan_added", count: 0 },
  { status: "fabrication", count: 0 },
  { status: "treatment_plan", count: 0 },
  { status: "payment_confirmation", count: 0 },
  { status: "waiting_for_delivery", count: 0 },
  { status: "dispatched", count: 0 },
  { status: "delivered", count: 0 },
  { status: "refinement", count: 0 },
  { status: "refined", count: 0 },
  { status: "cancelled", count: 0 },
  { status: "completed", count: 0 },
];

export const Status = [
  { label: "Status", value: null },
  { label: "Scanned document", value: "scanned document" },
  { label: "Awaiting impression", value: "awaiting impression" },
  { label: "Impression received", value: "impression recieved" },
  { label: "Pricing plan added", value: "pricing plan added" },
  { label: "Fabrication", value: "fabrication" },
  { label: "Treatment plan", value: "treatment plan" },
  { label: "Waiting for delivery", value: "waiting for delivery" },
  { label: "Payment confirmation", value: "payment confirmation" },
  { label: "Dispatched", value: "dispatched" },
  { label: "Delivered", value: "delivered" },
  { label: "Refined", value: "refined" },
  { label: "Cancelled", value: "cancelled" },
  { label: "Completed", value: "completed" },
];

export const OrdeStatusOptions = [
  ...Status,
  { label: "Rescue", value: "rescue" },
];

export const statusOptions = [
  ...Status,
  { label: "Rescue", value: "refinement" },
];

export const Update_Access_Token = 2 * 60 * 60 * 1000;
