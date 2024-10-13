import VerifyOrder from "./VerifyOrder";
import PlaceOrderModal from "./PlaceOrder";
import VerifiedCancel from "./VerifiedCancel";
import MoveToCalling from "./MoveToCalling";
import MoveToOpen from "./MoveToOpen";
import PutOnHold from "./PutOnHold";
import PutOnUnHold from "./PutOnUnhold";
import CancelOrder from "./CancelOrder";
import DoNotFulfill from "./DoNotFulfill";
import { OrderDetails } from "./Columns/OrderDetails";
import { ProductDetailCol } from "./Columns/Productdetails";
import { CustomerInfo } from "./Columns/customerInfo";
import { ShipmentCancelTruckIcon, ExternalLink } from "../Icons";

import { isorderWithMissingDetails } from "../Functions/ordersHelperFunctions";
import { Button, Flex, Tooltip } from "antd";

export const currentModalObj = {
  ["place"]: PlaceOrderModal,
  ["verify"]: VerifyOrder,
  ["move_to_calling"]: MoveToCalling,
  ["hold"]: PutOnHold,
  ["unhold"]: PutOnUnHold,
  ["donot_fulfill"]: DoNotFulfill,
  ["move_to_open"]: MoveToOpen,
  ["cancel"]: CancelOrder,
  ["cancel_placed_orders"]: VerifiedCancel,
};

export const missingDetailsOrderColumn = [
  {
    title: "Order Details",
    dataIndex: "name",
    fixed: "left",
    width: "200px",
    render: (e, obj) => {
      return (
        <OrderDetails
          showCheckBox={false}
          obj={obj}
          currentKey={e}
          colHeight={100}
          disabledCheckBox={true}
        />
      );
    },
  },
  {
    title: (
      <div className="product-detail-heading-container">
        <span>Product Details</span> <span className="qty">Quantity</span>
      </div>
    ),
    dataIndex: "address",
    width: 330,
    render: (e, obj) => {
      return <ProductDetailCol obj={obj} currentKey={e} colHeight={100} />;
    },
  },

  {
    title: "Order Issue",
    dataIndex: "product_price",
    fixed: "right",
    width: 150,
    render: (e, obj) => {
      const isCustomerInfoError = isorderWithMissingDetails(obj);
      const notServiceable = obj.is_servicable !== 1;
      const cantPlace = obj?.place_status == false;

      if (isCustomerInfoError) {
        return (
          <CustomerInfo obj={obj} currentKey={e} colHeight={100} subData={[]} />
        );
      }

      if (notServiceable) {
        return (
          <Flex align="center" gap={6} className="not-serviceable">
            <ShipmentCancelTruckIcon /> Not Serviceable
          </Flex>
        );
      }

      if (cantPlace) {
        return (
          <div className="not-serviceable">
            <div className="txt">No Inventory</div>

            {/* <div>
              <Button
                className="raise-sourcing-btn"
                type="primary"
                onClick={() => {
                  window.open(`/productDetails?${obj?.order_vfid}`, "_blank");
                }}
              >
                Raise Sourcing Request{" "}
                <span className="icon-container">
                  <ExternalLink />{" "}
                </span>
              </Button>
            </div> */}
          </div>
        );
      }

      return !!e ? e : "-";
    },
  },
];
export const missingDetailsOrderColumn2 = [
  {
    title: "Order Details",
    dataIndex: "name",
    fixed: "left",
    width: "200px",
    render: (e, obj) => {
      return (
        <OrderDetails
          showCheckBox={false}
          obj={obj}
          currentKey={e}
          colHeight={100}
          disabledCheckBox={true}
        />
      );
    },
  },
  {
    title: (
      <div className="product-detail-heading-container">
        <span>Product Details</span> <span className="qty">Quantity</span>
      </div>
    ),
    dataIndex: "address",
    width: 330,
    render: (e, obj) => {
      return <ProductDetailCol obj={obj} currentKey={e} colHeight={100} />;
    },
  },
];

export const confirmOrderColumn = [
  {
    title: (
      <div className="product-detail-heading-container">
        <span>Product Details</span> <span className="qty">Quantity</span>
      </div>
    ),
    dataIndex: "address",
    width: 280,
    render: (e, obj) => {
      return <ProductDetailCol obj={obj} currentKey={e} colHeight={100} />;
    },
  },
  {
    title: "Product Price",
    dataIndex: "itemCost",
    width: 150,
    render: (e) => {
      return !!e ? "₹ " + Number(e).toFixed(2) : e == 0 ? "₹ 0" : "-";
    },
  },
  {
    title: "Fulfillment Fee",
    dataIndex: "fulfilment",
    width: 150,
    render: (e) => {
      return !!e ? "₹ " + Number(e).toFixed(2) : "-";
    },
  },
  {
    title: "Forward Shipping",
    dataIndex: "shipping",
    width: 150,
    render: (e) => {
      return !!e ? "₹ " + Number(e).toFixed(2) : "-";
    },
  },
  {
    title: "COD",
    dataIndex: "codCost",
    width: 100,
    // amount number tofixed
    render: (e) => {
      return !!e ? "₹ " + Number(e).toFixed(2) : "-";
    },
  },
  {
    title: (
      <Flex gap={6} align="center">
        Order Cost{" "}
        <Tooltip
          title={
            <div>
              Order Cost = Product Price + Fulfillment Fee + Forward Shipping +
              COD
            </div>
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 12 12"
          >
            <path
              id="info_FILL0_wght300_GRAD0_opsz24"
              d="M105.526-851h.947v-3.632h-.947Zm.474-4.713a.493.493,0,0,0,.363-.147.493.493,0,0,0,.147-.363.494.494,0,0,0-.147-.363.494.494,0,0,0-.363-.146.494.494,0,0,0-.363.146.494.494,0,0,0-.147.363.493.493,0,0,0,.147.363A.493.493,0,0,0,106-855.713ZM106-848a5.845,5.845,0,0,1-2.34-.472,6.061,6.061,0,0,1-1.905-1.282,6.06,6.06,0,0,1-1.283-1.9A5.84,5.84,0,0,1,100-854a5.845,5.845,0,0,1,.472-2.34,6.061,6.061,0,0,1,1.282-1.905,6.059,6.059,0,0,1,1.9-1.283A5.841,5.841,0,0,1,106-860a5.845,5.845,0,0,1,2.34.472,6.061,6.061,0,0,1,1.905,1.282,6.06,6.06,0,0,1,1.283,1.9A5.84,5.84,0,0,1,112-854a5.845,5.845,0,0,1-.472,2.34,6.061,6.061,0,0,1-1.282,1.905,6.059,6.059,0,0,1-1.9,1.283A5.841,5.841,0,0,1,106-848Zm0-.947a4.876,4.876,0,0,0,3.584-1.468A4.877,4.877,0,0,0,111.053-854a4.877,4.877,0,0,0-1.468-3.584A4.876,4.876,0,0,0,106-859.053a4.876,4.876,0,0,0-3.584,1.468A4.877,4.877,0,0,0,100.947-854a4.877,4.877,0,0,0,1.468,3.584A4.876,4.876,0,0,0,106-848.947ZM106-854Z"
              transform="translate(-100 860)"
              fill="#46415d"
            />
          </svg>
        </Tooltip>
      </Flex>
    ),
    dataIndex: "total",
    render: (e) => {
      return !!e ? "₹ " + Number(e).toFixed(2) : "-";
    },
    width: 150,
  },
];
export const verifiedCancelOrderColumn = [
  {
    title: (
      <div className="product-detail-heading-container">
        <span>Product Details</span> <span className="qty">Quantity</span>
      </div>
    ),
    dataIndex: "address",
    width: 280,
    render: (e, obj) => {
      return <ProductDetailCol obj={obj} currentKey={e} colHeight={100} />;
    },
  },
];
export const commonColumn = [
  {
    title: (
      <div className="product-detail-heading-container">
        <span>Product Details</span> <span className="qty">Quantity</span>
      </div>
    ),
    dataIndex: "address",
    width: 400,
    render: (e, obj) => {
      return <ProductDetailCol obj={obj} currentKey={e} colHeight={100} />;
    },
  },
];
export const cancelColumns = [
  {
    title: (
      <div className="product-detail-heading-container">
        <span>Product Details</span> <span className="qty">Quantity</span>
      </div>
    ),
    dataIndex: "address",
    width: 300,
    render: (e, obj) => {
      return <ProductDetailCol obj={obj} currentKey={e} colHeight={100} />;
    },
  },
];
