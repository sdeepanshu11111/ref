import { CustomerInfo } from "./TableColumns/customerInfo";
import { EscatationCol } from "./TableColumns/Escalation";
import { NDRJourney } from "./TableColumns/NDRJourney";
import { OrderNotes } from "./TableColumns/OrderNotes";
import { OrderStatus } from "./TableColumns/OrderStatus";
import { OrderTags } from "./TableColumns/OrderTags";
import { OrderTimeLine } from "./TableColumns/OrderTimeLine";
import { ProductDetailCol } from "./TableColumns/Productdetails";
import { RemittanceStatusCol } from "./TableColumns/RemittenceStatus";
import { SystemLogsCol } from "./TableColumns/SystemLogs";
import { OrderDetails } from "./TableColumns/OrderDetails";
import { ActionCol } from "./TableColumns/ActionColumn";
import { OrderDetailTitle } from "./TableColumns/OrderDetailTitle ";
import { ProductDetailTitle } from "./TableColumns/ProductDetailTitle";

export const colHeight = "160px";

export const columns = [
  {
    title: <OrderDetailTitle />,
    dataIndex: "name",
    headingPreference: "Order Details",
    fixed: "left",
    component: OrderDetails,
    width: "280px",
  },
  {
    title: "Customer Info",
    dataIndex: "age",
    headingPreference: "Customer Info",
    component: CustomerInfo,
    width: 320,
  },

  {
    title: ProductDetailTitle,
    headingPreference: "Product Details",
    dataIndex: "address",
    width: 430,
    component: ProductDetailCol,
  },
  {
    title: "Order Tags",
    dataIndex: "address",
    headingPreference: "Shopify Tags",
    width: 150,
    component: OrderTags,
  },
  {
    title: "Order Status",
    dataIndex: "address",
    headingPreference: "Order Status",
    width: 180,
    component: OrderStatus,
  },

  {
    title: "Order Timeline",
    headingPreference: "Order Timeline",
    dataIndex: "address",
    width: 200,
    component: OrderTimeLine,
  },

  {
    title: "Remittance Status",
    dataIndex: "address",
    headingPreference: "Remittance Status",
    width: 150,
    component: RemittanceStatusCol,
  },

  {
    title: "NDR Journey",
    headingPreference: "NDR Journey",
    dataIndex: "address",
    width: 150,
    component: NDRJourney,
  },

  {
    title: "Escalation",
    headingPreference: "Escalations",
    dataIndex: "address",
    width: 150,
    component: EscatationCol,
  },

  {
    title: "Order Notes",
    dataIndex: "address",
    headingPreference: "Order Notes",
    width: 275,
    component: OrderNotes,
  },

  {
    title: "System Logs",
    dataIndex: "address",
    width: 275,
    component: SystemLogsCol,
    headingPreference: "System Logs",
  },

  {
    title: "Action",
    dataIndex: "address",
    headingPreference: "Actions",
    fixed: "right",
    width: 183,
    component: ActionCol,
  },
];

export const defaultTab = {
  open: "open",
  in_processing: "",
  closed: "delivered",
  all: "to_be_placed",
};
export const defaultFilters = {
  bulkSearch: [], //bulk search value container
  start_date: "",
  end_date: "",
  search: "",
  serviceability: "",
  order_tags: [],
  order_duplication: "",
  dateType: "shopify",
  payment_type: "",
  rto_risk_indicator: [],
  address_quality_metrics: [],
  vf_product_name: [],
  shopify_product_name: [],
  vforder_status: [],
  cancel_reason: [],
};

export const defaultPreferences = [
  {
    headingPreference: "Order Details",
    subtab: true,
    visible: true,
    open: false,
    subTabArray: [
      {
        name: "VF Order ID",
        visible: true,
      },
      {
        name: "Store Order ID",
        visible: true,
      },
      {
        name: "Payment Type",
        visible: true,
      },
      {
        name: "Order Amount",
        visible: true,
      },
      {
        name: "Store Name",
        visible: true,
      },
      {
        name: "RTO Risk Indicator",
        visible: true,
      },
    ],
  },
  {
    headingPreference: "Customer Info",
    subtab: true,
    visible: true,
    open: false,
    subTabArray: [
      {
        name: "Customer Name",
        visible: true,
      },
      {
        name: "Customer Email ID",
        visible: true,
      },
      {
        name: "Customer Phone Number",
        visible: true,
      },
      {
        name: "Customer Address",
        visible: true,
      },
      {
        name: "Serviceability Status",
        visible: true,
      },
    ],
  },
  {
    headingPreference: "Product Details",
    subtab: true,
    visible: true,
    open: false,
    subTabArray: [
      {
        name: "Product Name",
        visible: true,
      },
      {
        name: "Variant Specs",
        visible: true,
      },
      {
        name: "VFSKU",
        visible: true,
      },
      {
        name: "Quantity",
        visible: true,
      },
    ],
  },

  {
    headingPreference: "Order Status",
    subtab: false,
    visible: true,
  },
  {
    headingPreference: "Shopify Tags",
    subtab: false,
    visible: true,
  },
  {
    headingPreference: "Order Timeline",
    subtab: false,
    visible: true,
  },
  {
    headingPreference: "Remittance Status",
    subtab: false,
    visible: true,
  },
  // {
  //   headingPreference: "NDR Journey",
  //   subtab: false,
  //   visible: true,
  // },
  // {
  //   headingPreference: "Escalations",
  //   subtab: false,
  //   visible: true,
  // },
  {
    headingPreference: "Order Notes",
    subtab: false,
    visible: true,
  },
  {
    headingPreference: "System Logs",
    subtab: false,
    visible: true,
  },
  {
    headingPreference: "Actions",
    subtab: false,
    visible: true,
  },
];
export const countOBJ = {
  open: {
    open: 0,
    calling: 0,
    verified: 0,
    on_hold: 0,
    not_linked: 0,
    all: 0,
  },
  in_processing: {
    "": 0,
  },
  closed: {
    delivered: 0,
    returned: 0,
    cancelled: 0,
    do_not_fulfill: 0,
    all: 0,
  },
  all: {
    to_be_placed: 0,
    in_processing: 0,
    closed: 0,
    all: 0,
  },
};

export const filterOptions = (
  vfProductNameOptions,
  shopifyProductNameOptions,
  tagOptions
) => [
  {
    key: "serviceability",
    placeholder: "Serviceability",
    label: "Serviceability",
    multiSelect: false,
    items: [
      { value: "", label: "Show All" },
      { value: "serviceable", label: "Serviceable" },
      { value: "not_serviceable", label: "Not Serviceable" },
    ],
  },
  {
    key: "order_tags",
    placeholder: "Order Tags",
    label: "Order Tags",
    multiSelect: true,
    items: tagOptions,
  },
  {
    key: "order_duplication",
    placeholder: "Order Duplication",
    label: "Order Duplication",
    multiSelect: false,
    items: [
      { value: "", label: "Show All" },
      { value: "repeated", label: "Repeated" },
      { value: "duplicate", label: "Duplicate" },
      { value: "unique", label: "Unique" },
    ],
  },
  {
    key: "payment_type",
    placeholder: "Payment Type",
    label: "Payment Type",
    multiSelect: false,
    items: [
      { value: "", label: "Show All" },
      { value: "prepaid", label: "Prepaid" },
      { value: "cod", label: "Cash On Delivery" },
    ],
  },
  {
    key: "vf_product_name",
    placeholder: "Vf Product Name",
    label: "Vf Product Name",
    items: vfProductNameOptions,
    multiSelect: true,
  },
  {
    key: "shopify_product_name",
    placeholder: "Shopify Product Name",
    label: "Shopify Product Name",
    multiSelect: true,
    items: shopifyProductNameOptions,
  },

  {
    key: "vforder_status",
    placeholder: "Vforder Status",
    label: "Vforder Status",
    multiSelect: true,
    items: [
      { value: "open", label: "Open" },
      { value: "calling_inprogress", label: "In Calling" }, //Newly Added
      { value: "verified", label: "Verified" },
      { value: "verified_ordered", label: "Placed" },
      { value: "processing", label: "In-Processing" },
      { value: "manifested", label: "To Be Shipped" },
      { value: "transit", label: "In-Transit" },
      { value: "delivered", label: "Delivered" },
      { value: "rto", label: "Returned" },
      { value: "rto_in_transit", label: "RTO In-Transit" },
      { value: "ndr_actionable", label: "NDR" }, //Newly Added
      { value: "cancelled", label: "Cancelled" },
      { value: "hold", label: "On Hold" },
      { value: "notlinked", label: "Not Linked" },
      { value: "not_fulfill", label: "Do Not Fulfill" },
    ],
  },
  {
    key: "cancel_reason",
    placeholder: "cancel_reason",
    label: "Cancel Reason",
    multiSelect: true,
    items: [
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
    ],
  },
  {
    key: "rto_risk_indicator",
    placeholder: "RTO Risk Indicator",
    label: "RTO Risk Indicator",
    multiSelect: true,
    items: [
      { value: "high", label: "High" },
      { value: "moderate", label: "Moderate" },
      { value: "low", label: "Low" },
    ],
  },
  {
    key: "address_quality_metrics",
    placeholder: "Address Quality Metrics",
    label: "Address Quality Metrics",
    multiSelect: true,
    items: [
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
    ],
  },
];
