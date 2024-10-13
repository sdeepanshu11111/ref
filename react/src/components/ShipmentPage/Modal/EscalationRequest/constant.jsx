export const escalationActionOption = [
  {
    value: "reverse_pickup_refund",
    label: "Reverse pickup and provide refund",
  },
  { value: "only_refund", label: "VF cost refund" },
  {
    value: "send_replacement",
    label: "No need to reverse pickup, just provide replacement",
  },
  {
    value: "reverse_pickup_replacement",
    label: "Reverse pickup and provide replacement",
  },
];
export const reasonsOption = [
  {
    value: "not_delivered",
    label: "Product not delivered but app showing delivered",
  },
  { value: "empty_box", label: "Empty box received " },
  { value: "damaged_product", label: "Damaged product received" },
  { value: "partially_received", label: "Partial order received" },
  { value: "wrong_product_delivered", label: "Wrong product delivered" },
];
