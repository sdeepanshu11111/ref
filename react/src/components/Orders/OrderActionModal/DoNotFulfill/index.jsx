import { Button, Table, message } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useContext, useState } from "react";
import OrdersContext from "../../OrdersContext";
import GlobalTable from "../../../GlobalCompoents/GlobalTable";
import { selectedOrdersWithSelectedLineItems } from "../../Functions/ordersHelperFunctions";
import "./index.scss";
import takeAction from "../../Apis/takeAction";
import { commonColumn } from "../Constants";
import { OrderDetails } from "../Columns/OrderDetails";

const DoNotFulfill = ({ onClose }) => {
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

  const apiPayload = {
    action: orderActionModal.currentModal,
    storeids: selectedStoreIds,
    orders: checkedData.map((order) => ({
      orderid: order._id.$oid,
      items: order.line_items.map((item) => ({
        lineitem_id: item.lineitem_id,
        quantity: item.quantity,
      })),
    })),
  };

  useEffect(() => {
    setData(
      selectedData.map((d) => {
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
              className={"confirm-order"}
              scrollY="60vh"
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
              ]}
            />
          </>
        )}
      </div>

      <div className="custom-modal-footer">
        <Button
          disabled={checkedData.length == 0}
          type="primary"
          loading={loading}
          onClick={() => takeActionHandler()}
        >
          Mark {checkedData.length > 1 ? '"Selected Orders"' : " "} as Do Not
          Fulfill
        </Button>
      </div>
    </>
  );
};

export default DoNotFulfill;
