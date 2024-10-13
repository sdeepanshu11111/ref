import { message, Skeleton } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import usePostRequest from "../../../CustomHooks/usePostRequest";
import { InfoBox } from "../../GlobalCompoents/InfoBox";
import { orderSummaryDeepdownApi } from "../Apis/orderSummaryDeepdown";
import "./index.scss";
import { OrderSummaryHeaderBar } from "./OrderSummaryHeaderBar";
export const OrdersSummaryPage = ({ auth, selectedStoreIds }) => {
  const [openBoxType, setOpenBoxType] = useState("");
  const { loading, sendPostRequest } = usePostRequest();
  const [deepdownLoading, setdeepdownLoading] = useState({
    ndr: false,
    delivered: false,
    rto: false,
  });
  const [data, setData] = useState({
    total_count: 0,
    total_amount: 25000,
    linked: {
      total_count: 0,
      total_amount: 0,
      open: {
        total_count: 0,
        total_amount: 0,
      },
      calling: {
        total_count: 0,
        total_amount: 0,
      },
      verified: {
        total_count: 0,
        total_amount: 0,
      },
      hold: {
        total_count: 0,
        total_amount: 0,
      },
      dnf: {
        total_count: 0,
        total_amount: 0,
      },
      cancelled: {
        total_count: 0,
        total_amount: 0,
      },
      placed: {
        total_count: 0,
        total_amount: 0,
        in_processing: {
          total_count: 0,
          total_amount: 0,
        },
        ready_to_ship: {
          total_count: 0,
          total_amount: 0,
        },
        cancelled: {
          total_count: 0,
          total_amount: 0,
        },
        shipped: {
          total_count: 0,
          total_amount: 0,
          rto: {
            total_count: 0,
            total_amount: 0,
            rto_initiated: {
              total_count: 0,
              total_amount: 0,
            },
            rto_delivered: {
              total_count: 0,
              total_amount: 0,
            },
            vfordersids: [],
          },
          ndr: {
            total_count: 0,
            total_amount: 0,
            otp_based_refusal: {
              total_count: 0,
              total_amount: 0,
            },
            customer_unavailable: {
              total_count: 0,
              total_amount: 0,
            },
            address_issue: {
              total_count: 0,
              total_amount: 0,
            },
            vfordersids: [],
          },
          delivered: {
            total_count: 0,
            total_amount: 0,
            remittance_pending: {
              total_count: 0,
              total_amount: 0,
            },
            remittance_settled: {
              total_count: 0,
              total_amount: 0,
            },
            vfordersids: [],
          },
        },
      },
    },
    not_linked: 0,
  });
  const [dateRange, setDateRange] = useState({
    start_date: dayjs(dayjs().subtract(30, "day")).format("YYYY-MM-DD"),
    end_date: dayjs(dayjs(), "YYYY-MM-DD").format("YYYY-MM-DD"),
  });
  const handleboxTypeChange = async (type) => {
    try {
      setdeepdownLoading((pre) => {
        return {
          ...pre,
          [type]: true,
        };
      });
      let payload = {
        start_date: dateRange.start_date,
        end_date: dateRange.end_date,
        store_id: selectedStoreIds,
        type: type,
      };
      let result = await orderSummaryDeepdownApi(payload);

      setData((pre) => {
        return {
          ...pre,
          linked: {
            ...pre.linked,
            placed: {
              ...pre.linked.placed,
              shipped: {
                ...pre.linked.placed.shipped,
                [type]: {
                  ...pre.linked.placed.shipped[type],
                  ...result.data,
                },
              },
            },
          },
        };
      });
      setOpenBoxType(type);
      setdeepdownLoading((pre) => {
        return {
          ...pre,
          [type]: false,
        };
      });
    } catch (error) {
      message.error(error.message);
      setdeepdownLoading((pre) => {
        return {
          ...pre,
          [type]: false,
        };
      });
    }
  };
  const kFormatter = (num) => {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "K"
      : Math.sign(num) * Math.abs(num);
  };
  const fetchData = async () => {
    try {
      const res = await sendPostRequest("/v2/orders/get_order_summary", {
        start_date: dateRange.start_date,
        end_date: dateRange.end_date,
        store_id: selectedStoreIds,
      });
      if (res.success) {
        setData(res.data);
      }
    } catch (e) {
      message.error("Error getting order summary");
    }
  };
  useEffect(() => {
    fetchData();
    setOpenBoxType("");
  }, [dateRange]);
  const linked = data?.linked;
  const placed = data?.linked.placed;
  if (loading) {
    return <Skeleton style={{ padding: "5rem" }} />;
  }
  return (
    <>
      <OrderSummaryHeaderBar
        dateRange={dateRange}
        setDateRange={setDateRange}
      />
      <div id="fade-in" className="order-summary-page-container">
        <div className="flowPageContainer">
          <div className="flowChartContainer">
            <div className="first-row-container">
              <InfoBox
                title="Total Orders On Your Store"
                orders={data?.total_count}
                amount={kFormatter(data?.total_amount)}
                titleTooltip={data?.total_amount}
                backgroundColor="#F5F4FA"
                borderColor="#D0CDE0"
                withAfter={true}
                withAfterGrey={true}
                delay={0.1}
                // withBefore={true}
              />
            </div>
            <div className="sec-row-container">
              <InfoBox
                title="Linked To vFulfill"
                orders={data?.linked?.total_count}
                amount={kFormatter(data?.linked?.total_amount)}
                titleTooltip={data?.linked?.total_amount}
                backgroundColor="#F5F4FA"
                borderColor="#D0CDE0"
                withAfter={true}
                withBefore={true}
                divider={true}
                dividerWidth={"px424"}
                row="second"
                delay={0.1}
              />
              <div className="custom-gap">
                <InfoBox
                  title="Not Linked to vFulfill"
                  orders={data?.not_linked}
                  titleTooltip={data?.not_linked}
                  showAmount={false}
                  backgroundColor="#FFFAEF"
                  borderColor="#EDDAB0"
                  // withAfter={true}
                  withBefore={true}
                  delay={0.2}
                />
              </div>
            </div>
            <div className="third-row">
              <InfoBox
                title="Open"
                orders={linked?.open?.total_count}
                amount={kFormatter(linked?.open?.total_amount)}
                titleTooltip={linked?.open?.total_amount}
                backgroundColor="#F5F4FA" //grey
                borderColor="#D0CDE0"
                // withAfter={true}
                withBefore={true}
                divider={true}
                dividerWidth={"px852"}
                row="third"
                delay={0.1}
              />
              <InfoBox
                title="Calling"
                orders={linked?.calling?.total_count}
                amount={kFormatter(linked?.calling?.total_amount)}
                titleTooltip={linked?.calling?.total_amount}
                backgroundColor="#FFFAEF"
                borderColor="#EDDAB0"
                // withAfter={true}
                withBefore={true}
                delay={0.2}
              />
              <InfoBox
                title="On Hold"
                orders={linked?.hold?.total_count}
                amount={kFormatter(linked?.hold?.total_amount)}
                titleTooltip={linked?.hold?.total_amount}
                backgroundColor="#FFFAEF"
                borderColor="#EDDAB0"
                // withAfter={true}
                withBefore={true}
                delay={0.3}
              />
              <InfoBox
                title="DNF"
                orders={linked?.dnf?.total_count}
                amount={kFormatter(linked?.dnf?.total_amount)}
                titleTooltip={linked?.dnf?.total_amount}
                backgroundColor="#FFFAEF" //bege
                borderColor="#EDDAB0"
                // withAfter={true}
                withBefore={true}
                delay={0.4}
              />
              <InfoBox
                title="Cancelled"
                orders={linked?.cancelled?.total_count}
                amount={kFormatter(linked?.cancelled?.total_amount)}
                titleTooltip={linked?.cancelled?.total_amount}
                backgroundColor="#F8F0F0" ///redish
                borderColor="#EDC4C4"
                // withAfter={true}
                withBefore={true}
                delay={0.5}
              />
              <InfoBox
                title="Placed"
                orders={placed?.total_count}
                amount={kFormatter(placed?.total_amount)}
                titleTooltip={placed?.total_amount}
                backgroundColor="#EFFCF4" //green
                borderColor="#91C1A6"
                withAfter={true}
                withBefore={true}
                delay={0.6}
              />
            </div>
            <div className="forth-row">
              <InfoBox
                title="In Processing"
                orders={placed?.in_processing?.total_count}
                amount={kFormatter(placed?.in_processing?.total_amount)}
                titleTooltip={placed?.in_processing?.total_amount}
                backgroundColor="#F5F4FA" //grey
                borderColor="#D0CDE0"
                // withAfter={true}
                withBefore={true}
                divider={true}
                dividerWidth={"px523"}
                row="forth"
                delay={0.1}
              />
              <InfoBox
                title="Ready To Ship"
                orders={placed?.ready_to_ship?.total_count}
                amount={kFormatter(placed?.ready_to_ship?.total_amount)}
                titleTooltip={placed?.ready_to_ship?.total_amount}
                backgroundColor="#FFFAEF" //bege
                borderColor="#EDDAB0"
                // withAfter={true}
                withBefore={true}
                delay={0.2}
              />
              <InfoBox
                title="Shipped"
                orders={placed?.shipped?.total_count}
                amount={kFormatter(placed?.shipped?.total_amount)}
                titleTooltip={placed?.shipped?.total_amount}
                backgroundColor="#EFFCF4" //green
                borderColor="#91C1A6"
                withAfter={true}
                withBefore={true}
                delay={0.3}
              />
              <InfoBox
                title="Cancelled"
                orders={placed?.cancelled?.total_count}
                amount={kFormatter(placed?.cancelled?.total_amount)}
                titleTooltip={placed?.cancelled?.total_amount}
                backgroundColor="#F8F0F0" ///redish
                borderColor="#EDC4C4"
                // withAfter={true}
                withBefore={true}
                delay={0.4}
              />
            </div>
            <div className="fifth-row">
              <InfoBox
                title="Delivered"
                orders={placed?.shipped?.delivered?.total_count}
                amount={kFormatter(placed?.shipped?.delivered?.total_amount)}
                titleTooltip={placed?.shipped?.delivered?.total_amount}
                backgroundColor="#EFFCF4" //green
                borderColor="#91C1A6"
                withAfter={openBoxType == "delivered" ? true : false}
                withBefore={true}
                detailOpen={true}
                bottomBar={true}
                boxType={"delivered"}
                openBoxType={openBoxType}
                onBottomClick={() => handleboxTypeChange("delivered")}
                deepdownLoading={deepdownLoading.delivered}
                divider={true}
                dividerWidth={"px342"}
                row="fifth"
                delay={0.1}
              />
              <InfoBox
                title="RTO"
                orders={placed?.shipped?.rto?.total_count}
                amount={kFormatter(placed?.shipped?.rto?.total_amount)}
                titleTooltip={placed?.shipped?.rto?.total_amount}
                backgroundColor="#F8F0F0" ///redish
                borderColor="#EDC4C4"
                withAfter={openBoxType == "rto" ? true : false}
                withAfterBlue={true}
                withBefore={true}
                detailOpen={false}
                bottomBar={true}
                boxType={"rto"}
                openBoxType={openBoxType}
                onBottomClick={() => handleboxTypeChange("rto")}
                deepdownLoading={deepdownLoading.rto}
                delay={0.2}
              />
              <InfoBox
                title="NDR"
                orders={placed?.shipped?.ndr?.total_count}
                amount={kFormatter(placed?.shipped?.ndr?.total_amount)}
                titleTooltip={placed?.shipped?.ndr?.total_amount}
                backgroundColor="#FFFAEF" //bege
                borderColor="#EDDAB0"
                withAfter={openBoxType == "ndr" ? true : false}
                withAfterYellow={true}
                withBefore={true}
                detailOpen={false}
                bottomBar={true}
                boxType={"ndr"}
                openBoxType={openBoxType}
                onBottomClick={() => handleboxTypeChange("ndr")}
                deepdownLoading={deepdownLoading.ndr}
                delay={0.3}
              />
            </div>
            {openBoxType == "delivered" ? (
              <div className="delivered-sixth-row">
                <InfoBox
                  title="Remittance Settled"
                  orders={
                    placed?.shipped?.delivered?.remittance_settled?.total_count
                  }
                  amount={kFormatter(
                    placed?.shipped?.delivered?.remittance_settled?.total_amount
                  )}
                  titleTooltip={
                    placed?.shipped?.delivered?.remittance_settled?.total_amount
                  }
                  backgroundColor="#EFFCF4" //green
                  borderColor="#91C1A6"
                  // withAfter={true}
                  withBefore={true}
                  divider={true}
                  dividerWidth={"px216"}
                  row="delivered"
                  delay={0.1}
                />
                <InfoBox
                  title="Remittance Pending"
                  orders={
                    placed?.shipped?.delivered?.remittance_pending?.total_count
                  }
                  amount={kFormatter(
                    placed?.shipped?.delivered?.remittance_pending?.total_amount
                  )}
                  titleTooltip={
                    placed?.shipped?.delivered?.remittance_pending?.total_amount
                  }
                  backgroundColor="#FFFAEF" //bege
                  borderColor="#EDDAB0"
                  // withAfter={true}
                  withBefore={true}
                  delay={0.2}
                />
              </div>
            ) : null}
            {openBoxType == "rto" ? (
              <div className="delivered-sixth-row">
                <InfoBox
                  title="RTO Initiated"
                  orders={placed?.shipped?.rto?.rto_initiated.total_count}
                  amount={kFormatter(
                    placed?.shipped?.rto?.rto_initiated.total_amount
                  )}
                  titleTooltip={
                    placed?.shipped?.rto?.rto_initiated.total_amount
                  }
                  backgroundColor="#FFFAEF" //bege
                  borderColor="#EDDAB0"
                  // withAfter={true}
                  withBefore={true}
                  divider={true}
                  dividerWidth={"px172"}
                  row="rto"
                  delay={0.1}
                />
                <InfoBox
                  title="RTO Delivered"
                  orders={placed?.shipped?.rto?.rto_delivered.total_count}
                  amount={kFormatter(
                    placed?.shipped?.rto?.rto_delivered.total_amount
                  )}
                  titleTooltip={
                    placed?.shipped?.rto?.rto_delivered.total_amount
                  }
                  backgroundColor="#F5F4FA" //grey
                  borderColor="#D0CDE0"
                  // withAfter={true}
                  withBefore={true}
                  withBeforeBlue={true}
                  delay={0.2}
                />
              </div>
            ) : null}
            {openBoxType == "ndr" ? (
              <div className="ndr-sixth-row">
                <InfoBox
                  title="OTP Based Refusal"
                  orders={placed?.shipped?.ndr?.otp_based_refusal?.total_count}
                  amount={kFormatter(
                    placed?.shipped?.ndr?.otp_based_refusal?.total_amount
                  )}
                  titleTooltip={
                    placed?.shipped?.ndr?.otp_based_refusal?.total_amount
                  }
                  backgroundColor="#FFFAEF" //bege
                  borderColor="#EDDAB0"
                  // withAfter={true}
                  withBefore={true}
                  divider={true}
                  dividerWidth={"px455"}
                  row="ndr"
                  delay={0.1}
                />
                <InfoBox
                  title="Customer Unavailable"
                  orders={
                    placed?.shipped?.ndr?.customer_unavailable?.total_count
                  }
                  amount={kFormatter(
                    placed?.shipped?.ndr?.customer_unavailable?.total_amount
                  )}
                  titleTooltip={
                    placed?.shipped?.ndr?.customer_unavailable?.total_amount
                  }
                  backgroundColor="#FFFAEF" //bege
                  borderColor="#EDDAB0"
                  // withAfter={true}
                  withBefore={true}
                  delay={0.2}
                />
                <InfoBox
                  title="Address Issue"
                  orders={placed?.shipped?.ndr?.address_issue?.total_count}
                  amount={kFormatter(
                    placed?.shipped?.ndr?.address_issue?.total_amount
                  )}
                  titleTooltip={
                    placed?.shipped?.ndr?.address_issue?.total_amount
                  }
                  backgroundColor="#FFFAEF" //bege
                  borderColor="#EDDAB0"
                  // withAfter={true}
                  withBefore={true}
                  delay={0.3}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};
