export const paymentTypeOptions = [
  { value: "", label: "Show All" },
  { value: "prepaid", label: "Prepaid" },
  { value: "cod", label: "Cash On Delivery" },
];
export const shipmentStatusOptions = [
  { value: "manifested", label: "Ready To Ship" },
  { value: "rto_in_transit", label: "RTO In-Transit" },
  { value: "transit", label: "In-Transit" },
  { value: "delivered", label: "Delivered" },
  { value: "ndr_actionable", label: "NDR" },
  { value: "cancelled", label: "Cancelled" },
];
export const ndrStatusOptions = [
  { value: "", label: "All" },
  { value: "reattempt", label: "Re-Attempt" },
  { value: "escalated", label: "Escalated" },
  { value: "rto_initiated", label: "RTO initiated" },
];
export const attempsOptions = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
  { value: 6, label: "More than 5" },
];
export const ndrBucketOption = [
  { value: 0, label: "Exception" },
  { value: 1, label: "Customer Unavailable" },
  { value: 2, label: "Rejected by Customer" },
  { value: 3, label: "Delivery Rescheduled" },
  { value: 4, label: "No Attempt" },
  { value: 5, label: "Customer Unreachable" },
  { value: 6, label: "Address Issue" },
  { value: 7, label: "Payment Issue" },
  { value: 8, label: "Out of Delivery Area" },
  { value: 9, label: "Order Already Cancelled" },
  { value: 10, label: "Self Collect" },
  { value: 11, label: "Shipment Seized by Customer" },
  { value: 12, label: "Customer Wants Open Delivery" },
  { value: 13, label: "Shipment Misrouted by Logistics Partner" },
  { value: 14, label: "OTP-Based Cancellation" },
];
