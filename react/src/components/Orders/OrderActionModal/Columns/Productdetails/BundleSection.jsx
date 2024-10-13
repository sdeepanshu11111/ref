import { Button } from "antd";
import React from "react";
import { useState } from "react";
import { BundleSwitchIcon, ExternalLink } from "../../../Icons";



export const BundleSection = ({ product }) => {
  let [open, setOpen] = useState(false);

  return (
    <div className="bundle-section-container">
      <div>
        <div
          className={
            open
              ? "details-container-open bundleDetails"
              : "details-container-close bundleDetails"
          }
        >
          <div className="action-container">
            <Button
              type="text"
              icon={<BundleSwitchIcon />}
              onClick={() => {
                setOpen(!open);
              }}
            />{" "}
            Product Bundle
          </div>
          <div className="p-h">Product Per Bundle</div>
          <div className="divider"></div>

          {product.bundle.map((bundleItem, key) => {
            return (
              <div
                key={key}
                className="product-detail-bundle-section-container"
              >
                <div className="item checkbox-section"></div>
                <div className="item">
                  <div className="image-container">
                    <img src={bundleItem.img} />
                  </div>
                </div>
                <div className="item details-section">
                  <div className="product-name-container">
                    {bundleItem.name}
                  </div>
                  <div className="specs-container">
                    {" "}
                    Specs:{" "}
                    <span className="allspecs-value">
                      {bundleItem.allspecs}
                    </span>
                  </div>
                  <a
                    href={`/productDetails?${bundleItem?.vfsku?.split("-")[0]}`}
                    target="_blank"
                  >
                    <div className="item vfsku-value">{bundleItem?.vfsku} <ExternalLink/></div>
                  </a>
                </div>
                <div className="item quantity">{bundleItem?.quantity} pcs</div>
                <div className="item edit-section"></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
