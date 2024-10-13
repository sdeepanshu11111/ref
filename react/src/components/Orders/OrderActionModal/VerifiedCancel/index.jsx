import React, { useEffect, useContext, useState } from "react";
import { Skeleton, message, Button, Flex, Switch, Select } from "antd";
import OrdersContext from "../../OrdersContext";
import { reasons } from "./reasons";
import GlobalTable from "../../../GlobalCompoents/GlobalTable";
import {
  selectedOrdersWithSelectedLineItems,
  statusFlagOrder,
  ordersWithMissingDetailsHandler,
  filteredOutOrders,
} from "../../Functions/ordersHelperFunctions";
import "./index.scss";

import getPlacedOrderCancellationStatus from "../../Apis/getPlacedOrderCancellationStatus";
import {
  missingDetailsOrderColumn2,
  verifiedCancelOrderColumn,
} from "../Constants";
import { OrderDetails } from "../Columns/OrderDetails";
import takeAction from "../../Apis/takeAction";

const VerifiedCancel = ({ onClose }) => {
  const { orderActionModal, fetchData, auth, selectedStoreIds } =
    useContext(OrdersContext);

  const [selectableData, setSelectableData] = useState([]);
  const [notSelectableData, setNotSelectableData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const selectedData = selectedOrdersWithSelectedLineItems(
          orderActionModal?.data
        );
        const filteredOutOrdersData = selectedData;

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

        const { data } = await getPlacedOrderCancellationStatus(apiPayload);

        setNotSelectableData(
          filteredOutOrdersData.filter((order) => {
            const status = data?.data[order?._id?.$oid]["status"];

            const msg = data?.data[order?._id?.$oid]["msg"];
            if (status === false) {
              order.cancel_msg = msg; // Set the cancel message only when status is false
              return true; // Include in notSelectableData
            }
            return false;
          })
        );

        setSelectableData(
          filteredOutOrdersData
            .map((order) => {
              const status = data?.data[order?._id?.$oid]["status"];
              const msg = data?.data[order?._id?.$oid]["msg"];
              return {
                ...order,
                confrimSelected: true,
                cancel_status: status,
                cancel_msg: msg,
              };
            })
            .filter((order) => order?.cancel_status === true) // Only include orders with status true
        );
      } catch (error) {
        message.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [orderActionModal]);

  useEffect(() => {
    setSelectableData(
      selectedData.map((order) => {
        order.cancel_on_shopify = 0;
        order.reason = "";
        return order;
      })
    );
  }, []);

  // Calculate orders with missing details and status flag data
  const selectedData = selectedOrdersWithSelectedLineItems(
    orderActionModal?.data
  );

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
        reason: order.reason,
        cancel_on_shopify: !!order.cancel_on_shopify ? 1 : 0,
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
      setActionLoading(false);
      message.error(error.message);
    } finally {
      setActionLoading(false);
    }
  };
  if (loading) {
    return <Skeleton active />;
  }
  return (
    <>
      <div className="orders-action-table cancel-verified-order">
        {!!selectableData.length && (
          <>
            <GlobalTable
              scrollY="500px"
              className={"confirm-order"}
              dataSource={selectableData}
              columns={[
                {
                  title: "Order Details",
                  width: "250px",
                  render: (e, obj) => {
                    return (
                      <OrderDetails
                        showCheckBox={false}
                        setSelectableData={setSelectableData}
                        obj={obj}
                        currentKey={e}
                        selectableData={selectableData}
                        loading={loading}
                        colHeight={110}
                        mongoId={obj?._id?.$oid}
                      />
                    );
                  },
                },
                ...verifiedCancelOrderColumn,
                {
                  title: (
                    <Flex align="center" justify="flex-start" gap={6}>
                      Cancel on Shopify
                    </Flex>
                  ),
                  dataIndex: "holdDate",
                  width: 220,
                  render: (e, obj) => {
                    return (
                      <Flex gap={6} vertical>
                        <Flex gap={6}>
                          <Switch
                            // disabled={!obj.confrimSelected || !obj?.reason}
                            checked={obj?.cancel_on_shopify}
                            onChange={(value) =>
                              setSelectableData((prev) =>
                                prev.map((order) => {
                                  if (obj._id.$oid == order._id.$oid) {
                                    order.cancel_on_shopify = value;
                                  }
                                  return order;
                                })
                              )
                            }
                          />
                          Cancel on Shopify
                        </Flex>
                      </Flex>
                    );
                  },
                },
                {
                  title: (
                    <Flex align="center" justify="flex-start" gap={6}>
                      Cancellation Reason
                    </Flex>
                  ),
                  dataIndex: "holdDate",
                  width: 250,
                  render: (e, obj) => {
                    return (
                      <Select
                        popupMatchSelectWidth={false}
                        allowClear
                        disabled={!obj.confrimSelected}
                        value={obj?.reason || undefined}
                        placeholder="Select cancellation reason"
                        onChange={(value, secondValue) =>
                          setSelectableData((prev) =>
                            prev.map((order) => {
                              if (obj._id.$oid == order._id.$oid) {
                                order.reason = value;
                              }
                              return order;
                            })
                          )
                        }
                        options={reasons}
                      />
                    );
                  },
                },
              ]}
            />
          </>
        )}

        {!!notSelectableData.length && (
          <>
            <p className="order-issue" style={{ marginTop: "0px !important" }}>
              This order cannot be cancel.
            </p>
            <GlobalTable
              scrollY="500px"
              dataSource={notSelectableData}
              columns={missingDetailsOrderColumn2}
            />
          </>
        )}
      </div>

      <div className="place-order-footer">
        {selectableData.length || notSelectableData.length ? (
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

              {selectableData.length
                ? selectableData[0]["cancel_msg"]
                : notSelectableData.length
                ? notSelectableData[0]["cancel_msg"]
                : null}
            </p>
          </Flex>
        ) : null}

        <Button
          type="primary"
          disabled={actionLoading || notSelectableData.length}
          loading={actionLoading}
          onClick={() => takeActionHandler()}
        >
          Cancel Order
        </Button>
      </div>
    </>
  );
};

export default VerifiedCancel;
