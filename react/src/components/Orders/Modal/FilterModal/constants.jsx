export const serviceabilityOptions = [
  { value: "", label: "Show All" },
  { value: "serviceable", label: "Serviceable" },
  { value: "not_serviceable", label: "Not Serviceable" },
];
export const tagsOptions = [
  { value: "", label: "Show All" },
  { value: "", label: "Show All" },
  { value: "", label: "Show All" },
  { value: "", label: "Show All" },
  { value: "", label: "Show All" },
  { value: "", label: "Show All" },
];
export const duplicateOrdersOptions = [
  { value: "", label: "Show All" },
  { value: "repeated", label: "Repeated" },
  { value: "duplicate", label: "Duplicate" },
  { value: "unique", label: "Unique" },
];
export const paymentTypeOptions = [
  { value: "", label: "Show All" },
  { value: "prepaid", label: "Prepaid" },
  { value: "cod", label: "Cash On Delivery" },
];
export const rtoRiskOption = [
  { value: "high", label: "High" },
  { value: "moderate", label: "Moderate" },
  { value: "low", label: "Low" },
];
export const addressReasons = [
  { value: "address_incomplete", label: "Address Incomplete" },
  { value: "address_complete", label: "Address Complete" },
  { value: "city_rto_history", label: "City RTO History" },
  { value: "no_city_rto_history", label: "No City RTO History" },
  { value: "pincode_rto_history", label: "Pincode RTO History" },
  { value: "no_pincode_rto_history", label: "No Pincode RTO History" },
  { value: "customer_reachability", label: "Customer Reachability" },
  { value: "customer_reachable", label: "Customer Reachable" },
  { value: "invalid_address", label: "Invalid Address" },
  { value: "valid_address", label: "Valid Address" },
  { value: "short_address_length", label: "Short Address Length" },
  { value: "full_address_length", label: "Full Address Length" },
  { value: "house_flat_no_absent", label: "House/Flat No. Absent" },
  { value: "house_flat_no_present", label: "House/Flat No. Present" },
];
export const orderStatusOptions = [
  { value: "open", label: "Open" },
  { value: "calling_inprogress", label: "In Calling" },//Newly Added
  { value: "verified", label: "Verified" },
  { value: "verified_ordered", label: "Placed" },
  { value: "processing", label: "In-Processing" },
  { value: "manifested", label: "To Be Shipped" },
  { value: "transit", label: "In-Transit" },
  { value: "delivered", label: "Delivered" },
  { value: "rto", label: "Returned" },
  { value: "rto_in_transit", label: "RTO In-Transit" },
  { value: "ndr_actionable", label: "NDR" },//Newly Added
  { value: "cancelled", label: "Cancelled" }, 
  { value: "hold", label: "On Hold" },
  { value: "notlinked", label: "Not Linked" },
  { value: "not_fulfill", label: "Do Not Fulfill" }
];

export const cancelOrderreasonsOptions = [
  {
    value: "not_contactable",
    label: "Unable to Contact the Customer",
  },
  {
    value: "duplicate_order",
    label: "Duplicate Order",
  },
  {
    value: "email_cancellation",
    label: "Cancellation Requested by Customer",
  },
  {
    value: "not_interested",
    label: "Customer Not Interested",
  },
  {
    value: "fake_order",
    label: "Fraudulent Order",
  },
  {
    value: "wrong_or_invalid_number",
    label: "Invalid Contact Number",
  },
  {
    value: "language_barrier",
    label: "Language Barrier",
  },
  {
    value: "repeated_rto",
    label: "Customer has High RTO History",
  },
  {
    value: "not_serviceable",
    label: "Not Serviceable Area",
  },
  {
    value: "lost_to_competition",
    label: "Lost to Competition",
  },
  {
    value: "issue_with_product_price",
    label: "Product Price seems to be High",
  },
  {
    value: "inventory_not_available",
    label: "Product/Variant Out of Stock",
  },
  {
    value: "variant_change_requested",
    label: "Variant Change Requested",
  },
  {
    value: "customer_not_available",
    label: "Customer Not Available / Out of Station",
  },

  {
    value: "Order_Cancelled-Against_New_Order",
    label: "Order Cancelled-Against New Order",
  },
  {
    value: "test_order",
    label: "Test order",
  },
];
