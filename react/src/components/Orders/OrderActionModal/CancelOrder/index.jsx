import { Button, message, Flex, Select, Switch, Input } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useContext, useState } from "react";
import OrdersContext from "../../OrdersContext";
import GlobalTable from "../../../GlobalCompoents/GlobalTable";
import { selectedOrdersWithSelectedLineItems } from "../../Functions/ordersHelperFunctions";
import "./index.scss";
import takeAction from "../../Apis/takeAction";
import { cancelColumns } from "../Constants";
import { reasons } from "./reasons";
import { OrderDetails } from "../Columns/OrderDetails";
const CancelOrder = ({ onClose }) => {
  const { orderActionModal, fetchData, auth, selectedStoreIds } =
    useContext(OrdersContext);
  const [data, setData] = useState([]);
  const [holdDate, setHoldDate] = useState("");
  const [loading, setLoading] = useState(false);
  const selectedData = selectedOrdersWithSelectedLineItems(
    orderActionModal?.data
  );

  const checkedData = data.filter((d) => d.confrimSelected);

  const takeActionHandler = async () => {
    setLoading(true);

    const apiPayload = {
      action: orderActionModal.currentModal,
      storeids: selectedStoreIds,
      orders: data
        .filter((d) => d.confrimSelected)
        .map((order) => ({
          orderid: order._id.$oid,
          reason: order.reason,
          cancel_on_shopify: !!order.cancel_on_shopify ? 1 : 0,
          refund_item: !!order?.refund_item ? 1 : 0,
          items: order.line_items.map((item) => ({
            lineitem_id: item.lineitem_id,
            quantity: item.quantity,
            amount: item?.item_total_sold_price?.amount,
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
      setLoading(false);
    }
  };

  useEffect(() => {
    setData(
      selectedData.map((order) => {
        order.reason = "";
        order.confrimSelected = true;
        order.cancel_on_shopify = 0;
        return order;
      })
    );
  }, []);

  return (
    <>
      <div className="orders-action-table cancel-order">
        {!!data.length && (
          <>
            <GlobalTable
              className={"confirm-order"}
              scrollY="58vh"
              dataSource={data}
              columns={[
                {
                  title: "Order Details",
                  width: "250px",
                  render: (e, obj) => {
                    return (
                      <OrderDetails
                        showCheckBox={true}
                        setSelectableData={setData}
                        obj={obj}
                        currentKey={e}
                        selectableData={data}
                        colHeight={110}
                        mongoId={obj?._id?.$oid}
                      />
                    );
                  },
                },
                ...cancelColumns,

                {
                  title: (
                    <Flex align="center" justify="flex-start" gap={6}>
                      {selectedData && selectedData.length > 1 && (
                        <Switch
                          // disabled={!data.every((e) => !!e.reason)}
                          onChange={(value) =>
                            setData((prev) =>
                              prev.map((order) => {
                                order.cancel_on_shopify = !!value ? 1 : 0;
                                return order;
                              })
                            )
                          }
                        />
                      )}
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
                              setData((prev) =>
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

                        {!!obj?.cancel_on_shopify && (
                          <Flex gap={6}>
                            <Switch
                              checked={obj?.refund_item || false}
                              onChange={(value) =>
                                setData((prev) =>
                                  prev.map((order) => {
                                    if (obj._id.$oid == order._id.$oid) {
                                      order.refund_item = value;
                                    }
                                    return order;
                                  })
                                )
                              }
                            />
                            Refund these items
                          </Flex>
                        )}
                      </Flex>
                    );
                  },
                },

                {
                  title: (
                    <Flex align="center" justify="flex-start" gap={6}>
                      Cancellation Reason
                      {selectedData && selectedData.length > 1 && (
                        <Select
                          allowClear
                          popupMatchSelectWidth={false}
                          style={{ width: "200" }}
                          placeholder="Bulk select cancellation reason"
                          onChange={(value, secondValue) =>
                            setData((prev) =>
                              prev.map((order) => {
                                order.reason = value;
                                return order;
                              })
                            )
                          }
                          options={reasons}
                        />
                      )}
                    </Flex>
                  ),
                  dataIndex: "holdDate",
                  width: 300,
                  render: (e, obj) => {
                    return (
                      <Select
                        popupMatchSelectWidth={false}
                        allowClear
                        disabled={!obj.confrimSelected}
                        value={obj?.reason || undefined}
                        placeholder="Select cancellation reason"
                        onChange={(value, secondValue) =>
                          setData((prev) =>
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
      </div>
      <div className="custom-modal-footer">
        <Button
          type="primary"
          disabled={
            checkedData.length == 0 ||
            data.filter((e) => e.reason).length !== checkedData.length
          }
          loading={loading}
          onClick={() => takeActionHandler()}
        >
          Cancel Order(s)
        </Button>
      </div>
    </>
  );
};

export default CancelOrder;
