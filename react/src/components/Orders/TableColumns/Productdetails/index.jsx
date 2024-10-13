import { Button, Checkbox, Tooltip } from "antd";
import React, { useContext } from "react";
import { useSelector } from "react-redux";

import { EditproductIcon, ExternalLink, LinkIcon } from "../../Icons";
import OrdersContext from "../../OrdersContext";
import { BundleSection } from "./BundleSection";
import "./index.scss";

export const ProductDetailCol = ({ obj, currentKey, colHeight, subData }) => {
  const { setModal, orders, setOrders } = useContext(OrdersContext);
  const auth = useSelector((state) => state.auth);
  const handleOpenModal = () => {
    setModal({
      open: true,
      currentModal: "editQuantity",
      data: obj,
    });
  };
  const handleLinkProuduct = (url) => {
    window.location.assign(
      import.meta.env.VITE_REACT_OLD_APP_URL +
        `/switch-store/${auth?.auth?.store?.id}?redirect=` +
        auth?.auth?.store?.store_geo +
        `/` +
        auth?.auth?.store?.id +
        url
    );
  };

  const lineItemCheckboxHandler = (e, lineItem) => {
    setOrders(
      orders.map((order) => {
        if (order._id.$oid === obj._id.$oid) {
          const updatedLineItems = order.line_items.map((item) => {
            if (item.lineitem_id === lineItem.lineitem_id) {
              return {
                ...item,
                selected: e.target.checked,
              };
            }
            return item;
          });

          const anyLineItemSelected = updatedLineItems.some(
            (item) => item.selected
          );

          return {
            ...order,
            selected: anyLineItemSelected,
            line_items: updatedLineItems,
          };
        }
        return order;
      })
    );
  };

  return (
    <div
      className="orderProductDetail-col"
      style={{
        height: colHeight,
      }}
    >
      {obj?.line_items?.map((product, key) => {
        return (
          <div key={key} className="product-card-container">
            <div className="product-detail-section-container">
              <div className="item checkbox-section">
                <Checkbox
                  onChange={(e) => lineItemCheckboxHandler(e, product)}
                  checked={product?.selected || false}
                />
              </div>
              <div className="item  ">
                <div className="image-container">
                  <img src={product.img} />
                </div>
              </div>
              <div className="item details-section">
                {subData[0].visible && (
                  <Tooltip
                    title={product?.name?.length > 50 ? product.name : null}
                  >
                    <div className="product-name-container">{product.name}</div>
                  </Tooltip>
                )}
                {subData[1].visible && obj.order_status !== "Not linked" && (
                  <div className="specs-container">
                    {" "}
                    Specs:
                    <span className="allspecs-value"> {product.allspecs}</span>
                  </div>
                )}

                {product.vfsku !== "BUNDLE" &&
                obj.order_status !== "Not linked" &&
                product.vfsku !== "PENDING" ? (
                  <a
                    href={`/productDetails?${product?.vfsku.split("-")[0]}`}
                    target="_blank"
                  >
                    <div className="item vfsku-value">
                      {product.vfsku} <ExternalLink />
                    </div>
                  </a>
                ) : null}
                {obj.order_status == "Not linked" && (
                  <a
                    onClick={handleLinkProuduct.bind(
                      this,
                      `/products/store-products?search=${product.name}`
                    )}
                    target="_blank"
                  >
                    <div className="item vfsku-value">
                      Link Product <ExternalLink />
                    </div>
                  </a>
                )}
              </div>
              {subData[3].visible && (
                <div className="item quantity">{product.quantity} pcs</div>
              )}

              <div className="item edit-section">
                <Button
                  type="text"
                  icon={<EditproductIcon />}
                  onClick={handleOpenModal}
                />
              </div>
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
