import { Button, Checkbox } from "antd";
import React, { useContext } from "react";
import { EditproductIcon, ExternalLink } from "../../../Icons";
import OrdersContext from "../../../OrdersContext";
import { BundleSection } from "./BundleSection";
import "./index.scss";

export const ProductDetailCol = ({ obj, currentKey, colHeight }) => {
  return (
    <div
      className="orderProductDetail-col-action-custom"
      style={{
        height: colHeight,
      }}
    >
      {obj?.line_items?.map((product, key) => {
        return (
          <div key={key} className="product-card-container">
            <div className="product-detail-section-container">
              <div className="item  ">
                <div className="image-container">
                  <img src={product?.img} />
                </div>
              </div>
              <div className="item details-section">
                <div className="product-name-container">{product?.name}</div>
                <div className="specs-container">
                  Specs:{" "}
                  <span className="allspecs-value"> {product?.allspecs}</span>
                </div>
                {product.vfsku !== "BUNDLE" ? (
                  <a
                    href={`/productDetails?${product?.vfsku?.split("-")[0]}`}
                    target="_blank"
                  >
                    <div className="item vfsku-value">
                      {product?.vfsku} <ExternalLink />
                    </div>
                  </a>
                ) : null}
              </div>
              <div className="item quantity">{product?.quantity} pcs</div>
            </div>

            {product.vfsku == "BUNDLE" ? (
              <BundleSection product={product} />
            ) : null}
          </div>
        );
      })}
    </div>
  );
};
