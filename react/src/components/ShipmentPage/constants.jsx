import { CustomerInfo } from "./TableColumns/customerInfo";
import { EscatationCol } from "./TableColumns/Escalation";
import { OrderStatus } from "./TableColumns/OrderStatus";

import { ProductDetailCol } from "./TableColumns/Productdetails";
import { RemittanceStatusCol } from "./TableColumns/RemittenceStatus";

import { ShipmentDetails } from "./TableColumns/OrderDetails";
import { ActionCol } from "./TableColumns/ActionColumn";

import { ProductDetailTitle } from "./TableColumns/ProductDetailTitle";
import { NDRJourne } from "./TableColumns/NDRJourne";
import { NdrDetails } from "./TableColumns/NdrDetails";

export const colHeight = "160px";

export const columns = [
  {
    title: "Shipment Details",
    dataIndex: "name",
    headingPreference: "Shipment Details",
    fixed: "left",
    component: ShipmentDetails,
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
    width: 330,
    component: ProductDetailCol,
  },

  {
    title: "Shipment Status",
    dataIndex: "address",
    headingPreference: "Shipment Status",
    width: 231,
    component: OrderStatus,
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
    width: 320,
    component: NDRJourne,
  },

  {
    title: "Escalation",
    headingPreference: "Escalations",
    dataIndex: "address",
    width: 150,
    component: EscatationCol,
  },

  {
    title: "Action",
    dataIndex: "address",
    headingPreference: "Actions",
    fixed: "right",
    width: 200,
    component: ActionCol,
  },
];

export const defaultFilters = {
  start_date: "",
  end_date: "",
  payment_type: "",
  remittance_status: "",
  dateType: "shipment_date",
  shipment_status: [],
  vf_product_name: [],
  shopify_product_name: [],
  bulkSearch: [], //bulk search value cointainer
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
    headingPreference: "Shipment Status",
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
    headingPreference: "NDR Journey",
    subtab: false,
    visible: true,
  },
  // {
  //   headingPreference: "Escalations",
  //   subtab: false,
  //   visible: true,
  // },
  {
    headingPreference: "Remittance Status",
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
  shipment: {
    to_be_shipped_order: 0,
    in_transit_order: 0,
    delivered_order: 0,
    returned_order: 0,
    rto_in_transit: 0,
    all_order: 0,
    out_for_delivery: 0,
    ndr: 0,
    rto: 0,
  },
};
export const filterOptions = (
  vfProductNameOptions,
  shopifyProductNameOptions
) => [
  {
    key: "shipment_status",
    placeholder: "Shipment Status",
    label: "Shipment Status",
    items: [
      { label: "Ready To Ship", value: "ready_to_ship" },
      { label: "In Transit", value: "in_transit" },
      { label: "Out For Delivery", value: "out_for_delivery" },
      { label: "NDR", value: "ndr" },
      { label: "Delivered", value: "delivered" },
      { label: "RTO", value: "rto" },
    ],
    multiSelect: true,
  },
  {
    key: "remittance_status",
    placeholder: "Remittance Status",
    label: "Remittance Status",
    items: [
      { value: "", label: "Show All" },
      { value: "pending", label: "Pending" },
      { value: "settled", label: "Settled" },
    ],
    multiSelect: false,
  },
  {
    key: "payment_type",
    placeholder: "Payment Type",
    label: "Payment Type",
    items: [
      { value: "", label: "Show All" },
      { value: "prepaid", label: "Prepaid" },
      { value: "cod", label: "Cash On Delivery" },
    ],
    multiSelect: false,
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
];
