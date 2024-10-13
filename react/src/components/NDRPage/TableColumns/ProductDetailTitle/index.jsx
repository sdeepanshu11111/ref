import React from "react";

export const ProductDetailTitle = ({ subData=[] }) => {
  return (
    <div className="product-detail-heading-container">
      <span>Product Details</span>{" "}
      {subData[3]?.visible && <span className="qty">Quantity</span>}
    </div>
  );
};
