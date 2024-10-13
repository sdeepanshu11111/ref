import { CustomerInfo } from "./TableColumns/customerInfo";
import { ProductDetailCol } from "./TableColumns/Productdetails";
import { OrderDetails } from "./TableColumns/OrderDetails";
import { ActionCol } from "./TableColumns/ActionColumn";
import { ProductDetailTitle } from "./TableColumns/ProductDetailTitle";
import { NdrDetails } from "./TableColumns/NdrDetails";
import { NdrStatus } from "./TableColumns/NdrStatus";
import { ShipmentStatus } from "./TableColumns/ShipmentStatus";
import { NDRDetailTitle } from "./TableColumns/NDRDetailTitle";

export const colHeight = "172px";

export const columns = [
  {
    title: <NDRDetailTitle />,
    dataIndex: "name",
    headingPreference: "Shipment Details",
    fixed: "left",
    component: OrderDetails,
    width: "280px",
  },

  {
    title: "NDR Details",
    dataIndex: "age",
    headingPreference: "Ndr details",
    component: NdrDetails,
    width: 320,
  },
  {
    title: "NDR Status",
    dataIndex: "age",
    headingPreference: "Ndr status",
    component: NdrStatus,
    width: 320,
  },
  {
    title: "Shipment Status",
    dataIndex: "age",
    headingPreference: "Shipment status",
    component: ShipmentStatus,
    width: 320,
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
    width: 350,
    component: ProductDetailCol,
  },
  {
    title: "Recommended Action",
    dataIndex: "address",
    headingPreference: "Actions",
    fixed: "right",
    width: 183,
    component: ActionCol,
  },
];

export const defaultTab = {
  open: "pending",
};
export const defaultFilters = {
  bulkSearch: [], //bulk search value container
  start_date: "",
  end_date: "",
  search: "",
  shipment_status: [],
  action_status: "",
  payment_type: "",
  ndr_bucket: [],
  ndr_count: [],
};
export const defaultPreferences = [
  {
    headingPreference: "Shipment Details",
    subtab: true,
    visible: true,
    open: false,
    subTabArray: [
      {
        name: "AWB",
        visible: true,
      },
      {
        name: "Packed On Date",
        visible: true,
      },
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
    ],
  },
  {
    headingPreference: "Ndr details",
    subtab: false,
    visible: true,
  },
  {
    headingPreference: "Ndr status",
    subtab: false,
    visible: true,
  },
  {
    headingPreference: "Shipment status",
    subtab: false,
    visible: true,
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
    headingPreference: "Actions",
    subtab: false,
    visible: true,
  },
];
export const countOBJ = {
  open: {
    pending: 0,
    ndr_calling: 0,
    responded: 0,
    expired: 0,
    all: 0,
  },
};
