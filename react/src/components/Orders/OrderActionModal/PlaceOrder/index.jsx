import React, { useEffect, useContext, useState } from "react";
import { Skeleton, message, Button, Flex } from "antd";
import OrdersContext from "../../OrdersContext";
import GlobalTable from "../../../GlobalCompoents/GlobalTable";
import {
  selectedOrdersWithSelectedLineItems,
  statusFlagOrder,
  ordersWithMissingDetailsHandler,
  filteredOutOrders,
  isorderWithMissingDetails,
} from "../../Functions/ordersHelperFunctions";
import "./index.scss";
import getShipmentCost from "../../Apis/getShipmentCost";
import { missingDetailsOrderColumn, confirmOrderColumn } from "../Constants";
import { OrderDetails } from "../Columns/OrderDetails";
import takeAction from "../../Apis/takeAction";
import useWindowDimensions from "../../../../CustomHooks/useWindowDimensions";

const PlaceOrderModal = ({ onClose }) => {
  const { orderActionModal, fetchData, auth, selectedStoreIds } =
    useContext(OrdersContext);

  const [selectableData, setSelectableData] = useState([]);
  const [notSelectableData, setNotSelectableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const { width } = useWindowDimensions();
  const getPricing = async () => {
    setLoading(true);

    try {
      const selectedData = selectedOrdersWithSelectedLineItems(
        orderActionModal?.data
      );
      const filteredOutOrdersData = filteredOutOrders(selectedData);

      if (filteredOutOrdersData && !filteredOutOrdersData.length) {
        return;
      }

      const apiPayload = {
        storeids: selectedStoreIds,
        orders: filteredOutOrdersData.map((order) => ({
          orderid: order._id.$oid,
          items: order.line_items.map((item) => ({
            lineitem_id: item.lineitem_id,
            quantity: item.quantity,
          })),
        })),
      };

      const { data } = await getShipmentCost(apiPayload);

      setNotSelectableData(
        filteredOutOrdersData.filter(
          (order, key) =>
            data?.orders[order?._id?.$oid]["place_status"] === false
        )
      );

      setSelectableData(
        filteredOutOrdersData
          .map((order, key) => {
            order.confrimSelected = true;

            order.place_status = data?.orders[order?._id?.$oid]["place_status"];

            order.itemCost = data?.orders[order?._id?.$oid]["cost"]["itemCost"];
            order.fulfilment =
              data?.orders[order?._id?.$oid]["cost"]["fulfilment"];
            order.shipping = data?.orders[order?._id?.$oid]["cost"]["shipping"];
            order.codCost = data?.orders[order?._id?.$oid]["cost"]["codCost"];
            order.total = data?.orders[order?._id?.$oid]["cost"]["total"];
            return order;
          })
          .filter((order, key) => order?.place_status === true)
      );
    } catch (error) {
      message.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const routeHandler = (url = "") => {
    let storeid = orderActionModal?.data?.length
      ? orderActionModal?.data[0].order_storeid["$oid"]
      : "";
    if (width < 1280) {
      return window.location.assign(
        import.meta.env.VITE_REACT_OLD_APP_URL_MOBILE +
          `/switch-store/${storeid}?redirect=` +
          auth?.auth?.store?.store_geo +
          `/` +
          storeid +
          url
      );
    } else {
      return window.location.assign(
        import.meta.env.VITE_REACT_OLD_APP_URL +
          `/switch-store/${storeid}?redirect=` +
          auth?.auth?.store?.store_geo +
          `/` +
          storeid +
          url
      );
    }
  };
  useEffect(() => {
    getPricing();
  }, [orderActionModal]);

  // Calculate orders with missing details and status flag data
  const selectedData = selectedOrdersWithSelectedLineItems(
    orderActionModal?.data
  );

  const ordersWithMissingDetailsData =
    ordersWithMissingDetailsHandler(selectedData);
  const notServicableData = statusFlagOrder(selectedData);

  const selectedConfirmData = selectableData.filter(
    (item) => item.confrimSelected
  );

  const sum = selectableData
    .filter((item) => item.confrimSelected)
    .map((item) => item.total)
    .reduce((a, b) => a + b, 0);

  const takeActionHandler = async () => {
    setActionLoading(true);

    const apiPayload = {
      action: orderActionModal.currentModal,
      storeids: selectedStoreIds,
      orders: selectedConfirmData.map((order) => ({
        orderid: order._id.$oid,
        items: order.line_items.map((item) => ({
          lineitem_id: item.lineitem_id,
          quantity: item.quantity,
        })),
      })),
    };

    try {
      const { msg } = await takeAction(apiPayload);

      message.success(msg);
      fetchData();
      onClose();
    } catch (error) {
      message.error(error.message);
    } finally {
      setActionLoading(false);
    }
  };

  const errorData = [
    ...ordersWithMissingDetailsData,
    ...notServicableData,
    ...notSelectableData,
  ].filter(
    (obj1, i, arr) =>
      arr.findIndex((obj2) => obj2.order_vfid === obj1.order_vfid) === i
  );

  if (loading) {
    return <Skeleton style={{ padding: "5rem" }} active />;
  }
  return (
    <>
      <div className="orders-action-table place-order">
        {!!selectableData.length && (
          <>
            <GlobalTable
              scrollY={!!errorData.length ? "37vh" : "44vh"}
              className={"confirm-order"}
              dataSource={selectableData}
              columns={[
                {
                  title: "Order Details",
                  width: "250px",
                  render: (e, obj) => {
                    return (
                      <OrderDetails
                        showCheckBox={true}
                        setSelectableData={setSelectableData}
                        obj={obj}
                        currentKey={e}
                        selectableData={selectableData}
                        loading={loading}
                        colHeight={100}
                        mongoId={obj?._id?.$oid}
                      />
                    );
                  },
                },
                ...confirmOrderColumn,
              ]}
            />

            <p className="total-cost">
              <div>
                Total Placeable Orders: <span>{selectableData.length}</span>
              </div>
              <div>
                Total Cost : <span> ₹ {Number(sum).toFixed(2)} </span>
              </div>
            </p>
          </>
        )}

        {!!errorData.length && (
          <>
            <p
              className={`order-issue  ${
                !selectableData?.length ? "remove-mg" : ""
              }`}
            >
              <div className="main-heading">
                {" "}
                Unable to process following order(s){" "}
              </div>
              Please resolve the issues to place them successfully.
            </p>
            <GlobalTable
              className="error-orders-table"
              scrollY="300px"
              dataSource={errorData}
              rowClassName={(row) =>
                !!isorderWithMissingDetails(row)
                  ? "ant-table-cell address-error-row"
                  : "not-adress-error"
              }
              columns={missingDetailsOrderColumn}
            />
          </>
        )}
      </div>

      <div className="place-order-footer">
        <Flex justify="space-between" align className="channel-branding">
          <p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="13.333"
              viewBox="0 0 10 13.333"
            >
              <path
                id="emoji_objects_FILL0_wght300_GRAD0_opsz24"
                d="M215-846.666a1.384,1.384,0,0,1-.788-.229,1.214,1.214,0,0,1-.479-.6h-.214a1.081,1.081,0,0,1-.783-.321,1.03,1.03,0,0,1-.328-.764v-2.372a4.855,4.855,0,0,1-1.764-1.778,4.7,4.7,0,0,1-.643-2.387,4.652,4.652,0,0,1,1.454-3.46A4.886,4.886,0,0,1,215-860a4.886,4.886,0,0,1,3.546,1.419,4.652,4.652,0,0,1,1.454,3.46,4.681,4.681,0,0,1-.643,2.4,4.879,4.879,0,0,1-1.764,1.767v2.372a1.03,1.03,0,0,1-.328.764,1.081,1.081,0,0,1-.783.321h-.214a1.214,1.214,0,0,1-.479.6A1.384,1.384,0,0,1,215-846.666Zm-1.481-1.916h2.963v-.678H213.52Zm0-1.318h2.963v-.7H213.52Zm-.148-1.785h1.188v-2.105l-1.587-1.549.621-.606L215-854.571l1.407-1.374.621.606-1.587,1.549v2.105h1.188a4.027,4.027,0,0,0,1.63-1.383,3.529,3.529,0,0,0,.63-2.052,3.619,3.619,0,0,0-1.13-2.693,3.8,3.8,0,0,0-2.759-1.1,3.8,3.8,0,0,0-2.759,1.1,3.619,3.619,0,0,0-1.13,2.693,3.529,3.529,0,0,0,.63,2.052A4.028,4.028,0,0,0,213.371-851.685ZM215-854.571ZM215-855.3Z"
                transform="translate(-210.001 859.999)"
                fill="#e28930"
              />
            </svg>
            Please make sure your “Channel Branding” settings are up-to-date as
            they are printed on the Order invoice which is visible to the
            customer.{" "}
          </p>
          <a onClick={() => routeHandler(`/settings?from_order`)}>
            <span>Visit My Channel Branding</span>
          </a>
        </Flex>

        <Button
          type="primary"
          disabled={!sum}
          loading={actionLoading}
          onClick={() => takeActionHandler()}
        >
          Confirm & Place Order
        </Button>
      </div>
    </>
  );
};

export default PlaceOrderModal;
