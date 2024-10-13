import React from "react";
import { BundleSection } from "./BundleSection";
import "./index.scss";

export const ProductDetailCol = ({ obj, colHeight, subData }) => {
  return (
    <div
      className="ndrProductDetail-col"
      style={{
        height: colHeight,
      }}
    >
      {obj?.items?.map((product, key) => {
        return (
          <div key={key} className="product-card-container">
            <div className="product-detail-section-container">         
              <div className="item">
                <div className="image-container">
                  <img src={product.img} />
                </div>
              </div>
              <div className="item details-section">
                {subData[0].visible && (
                  <div className="product-name-container">{product.name}</div>
                )}
                {subData[1].visible && (
                  <div className="specs-container">
                    {" "}
                    Specs: {product.allspecs}
                  </div>
                )}

                {product.vfsku !== "BUNDLE" ? (
                  <div className="item">{product.vfsku}</div>
                ) : null}
              </div>
              {subData[3].visible && (
                <div className="item quantity">{product.quantity} pcs</div>
              )}    
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
