import { Button, message, Flex, DatePicker } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useContext, useState } from "react";
import OrdersContext from "../../OrdersContext";
import GlobalTable from "../../../GlobalCompoents/GlobalTable";
import { selectedOrdersWithSelectedLineItems } from "../../Functions/ordersHelperFunctions";
import "./index.scss";
import takeAction from "../../Apis/takeAction";

import { OrderDetails } from "../Columns/OrderDetails";
import { commonColumn } from "../Constants";

const PutOnHold = ({ onClose }) => {
  const { orderActionModal, fetchData, auth, selectedStoreIds } =
    useContext(OrdersContext);
  const [data, setData] = useState([]);

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
      orders: checkedData.map((order) => ({
        orderid: order._id.$oid,
        snooze_date: order.holdDate,
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
      setLoading(false);
    }
  };

  useEffect(() => {
    setData(
      selectedData.map((d) => {
        d.holdDate = "";
        d.confrimSelected = true;
        return d;
      })
    );
  }, []);

  return (
    <>
      <div className="orders-action-table">
        {!!data.length && (
          <>
            <GlobalTable
              scrollY="60vh"
              className={"confirm-order"}
              dataSource={data}
              columns={[
                {
                  title: "Order Details",
                  width: "250px",
                  render: (e, obj) => {
                    return (
                      <OrderDetails
                        showCheckBox={data.length > 1 ? true : false}
                        setSelectableData={setData}
                        obj={obj}
                        currentKey={e}
                        selectableData={data}
                        loading={loading}
                        colHeight={110}
                        mongoId={obj?._id?.$oid}
                      />
                    );
                  },
                },
                ...commonColumn,
                {
                  title: (
                    <Flex align="center" justify="space-between">
                      Hold Order(s) Until{" "}
                      {data && data.length > 1 && (
                        <DatePicker
                          placeholder="Bulk Select Date"
                          disabledDate={(current) =>
                            current && current < dayjs().endOf("day")
                          }
                          onChange={(date, dateString) =>
                            setData((prev) =>
                              prev.map((order) => {
                                order.confrimSelected = true;
                                order.holdDate = dateString;

                                return order;
                              })
                            )
                          }
                        />
                      )}
                    </Flex>
                  ),
                  dataIndex: "holdDate",
                  width: 220,
                  render: (e, obj) => {
                    return (
                      <DatePicker
                        disabled={obj.confrimSelected != true}
                        disabledDate={(current) =>
                          current && current < dayjs().endOf("day")
                        }
                        value={obj.holdDate ? dayjs(obj.holdDate) : null}
                        onChange={(date, dateString) =>
                          setData((prev) =>
                            prev.map((order) => {
                              if (obj._id.$oid == order._id.$oid) {
                                order.holdDate = dateString;
                              }
                              return order;
                            })
                          )
                        }
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
            checkedData.length == 0 || !checkedData.every((e) => !!e.holdDate)
          }
          loading={loading}
          onClick={() => takeActionHandler()}
        >
          Put {checkedData.length > 1 ? '"Selected Orders"' : " "} On Hold
        </Button>
      </div>
    </>
  );
};

export default PutOnHold;
