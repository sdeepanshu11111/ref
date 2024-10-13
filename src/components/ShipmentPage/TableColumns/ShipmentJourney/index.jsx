import { Button, Steps, Timeline } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import Arrow from "../../../../assets/Icons/Arrow";
import { donelabel, expectedlabel } from "./constants";
import "./index.scss";
import { JourneyBar } from "./JourneyBar";
export const ShipmentJourneySection = ({ obj }) => {
  const items = obj?.shipments_journey.journey.map((s, index) => {
    return {
      children: <JourneyBar data={s} index={index} />,
      dot: <span className="dot"></span>,
    };
  });
  const [detailsOpen, setDetailOpen] = useState(false);
  const handleChange = () => {
    setDetailOpen(!detailsOpen);
  };

  let startArr = [
    {
      label: "Store Order",
      status: 1,
      date: obj?.shipping_timelines?.shopify_order?.date,
    },
    {
      label: "Packed On",
      status: 1,
      date:
        obj && obj.shipment_date
          ? dayjs(obj.shipment_date).format("DD MMM, YYYY")
          : "",
    },
  ];

  let timelineArr = [...startArr, ...obj.shipments_journey.timeline];

  const shipmentSteps = [
    ...timelineArr.map((o, index, arr) => {
      let icon = <span className="dot-gray"></span>;
      let current = 0;
      if (o.status) {
        icon = <span className="dot"></span>;
      }

      if (arr.length - 1 > index) {
        if (arr[index + 1].status == 0) {
          icon = <span className="dot-current"></span>;
          current = 1;
        }
      }

      if (arr.length - 1 == index && arr.length == 2) {
        icon = <span className="dot-current"></span>;
        current = 1;
      }

      return {
        title: (
          <div
            className={
              current
                ? "shipment-step-data-container current"
                : "shipment-step-data-container"
            }
          >
            {!o.status ? (
              <>
                <div className="label">
                  {(o?.label == "Delivered" || o?.label == "RTO") &&
                  obj.expected_date
                    ? expectedlabel[o?.label].label
                    : o?.label}
                </div>{" "}
                <div className="date">
                  {o?.label == "Delivered" || o?.label == "RTO"
                    ? obj.expected_date
                      ? dayjs(obj.expected_date).format("DD MMM, YYYY")
                      : null
                    : dayjs(o?.date).format("DD MMM, YYYY")}
                </div>
              </>
            ) : (
              <>
                <div className="label">
                  {o?.label == "Delivered" || o?.label == "RTO"
                    ? donelabel[o?.label].label
                    : o?.label}
                </div>{" "}
                <div className="date">
                  {dayjs(o.date).format("DD MMM, YYYY")}
                </div>
              </>
            )}
          </div>
        ),
        icon: icon,
      };
    }),
  ];

  return (
    <div className="shipment-journey-section-container">
      <div
        className={
          detailsOpen
            ? "shipment-Timeline-bar shipment-Timeline-bar-open"
            : "shipment-Timeline-bar"
        }
      >
        <div className="item item-1">Shipment Timeline: </div>
        <div
          className={
            shipmentSteps.length > 4
              ? "item timeline-container timeline-container-expended"
              : "item timeline-container"
          }
        >
          <Steps items={shipmentSteps} />
        </div>
        <div className="item">
          <Button type="text" className="btn-toggle" onClick={handleChange}>
            Toggle Detailed View
            <span
              className={
                detailsOpen ? "icon-container details-open" : "icon-container"
              }
            >
              <Arrow />
            </span>
          </Button>
        </div>
      </div>
      {detailsOpen && (
        <div className="timeline-section-container">
          {" "}
          <Timeline items={items} />
        </div>
      )}
    </div>
  );
};
