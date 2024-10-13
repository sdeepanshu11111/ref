import React, { useContext } from "react";
import "./index.scss";

export const DemoProductDetailCol = ({ data }) => {
  const line_items = [
    {
      sku: "1005001974992792-red-solar-panel-10000mah",
      product_shopifyid: "7007973179547",
      quantity: 1,
      name: "Mini Solar Power Bank with Twin Concealable Cables",
      allspecs: "Red Solar Panel",
      lineitem_id: "11176065761435",
      variant_shopifyid: "40922986152091",
      price: {
        amount: "2999.00",
        currency_code: "INR",
      },
      discount: {
        amount: 0,
        currency_code: "INR",
      },
      sold_price: {
        amount: 2999,
      },
      total_sold_price: {
        amount: 2999,
      },
      item_total_sold_price: {
        amount: 2999,
      },
      product_aliid: "VFPD3437",
      product_mongoid: "6120cc900f30d95f3b4817d6",
      skuPropIds: "29,200670131",
      img: "https://ae01.alicdn.com/kf/Hfb14d59400304b0597fbca665221757ct/10000mAh-Mini-Solar-Power-Bank-Portable-Fast-Charger-Full-Mirror-LED-Display-Powerbank-External-Battery-Pack.jpg_640x640.jpg",
      aliname:
        "Ultra Slim Solar Power Bank With Built In Cable For Apple Android Type-C ",
      vfsku: "VFPD3437-VT0",
      item_mrpusd: "16.9",
      vendorsku: "VFPD3437-29_200670131",
      weight: "0.195",
      dimensions: {
        w: "7.1",
        d: "3",
        h: "8.1",
      },
      aliprice: 1501.73,
      item_mrparr: {
        prd_usd: "16.9",
        prd_inr: 1350.522683206013,
        customduty: 194.47526638166585,
        dutyhandling: 1.9447526638166586,
        margin: 232.04140533772429,
        gst: 35.35560342818685,
        total: 1814.3397110174064,
        case: 8,
        shipping: 8,
      },
      provisional: false,
      provisional_remark:
        "This product does note exist in our catalog. You can choose to raise request to catalog this product or link with a similar product from vfulfill catalog.",
      product_status: "LINKED",
      item_vforderstatus: "open",
      product_link: "https:///admin/products/7007973179547",
      original_qty: 1,
    },
    {
      sku: "Product-5013438",
      product_shopifyid: "7409377706139",
      quantity: 1,
      name: "Universal Car Steering Wheel Mobile Phone Holder",
      allspecs: "Red Solar Panel",
      lineitem_id: "11176065826971",
      variant_shopifyid: "42534649954459",
      price: {
        amount: "599.00",
        currency_code: "INR",
      },
      discount: {
        amount: 0,
        currency_code: "INR",
      },
      sold_price: {
        amount: 599,
      },
      total_sold_price: {
        amount: 599,
      },
      item_total_sold_price: {
        amount: 599,
      },
      product_aliid: null,
      product_mongoid: "62d3047f5e686b316d543245",
      skuPropIds: null,
      img: "https://cdn.shopify.com/s/files/1/0573/8361/6667/products/fd31b709c1fa72c3f6538b70823c36db312a256fa8a00f66719e91ad026fa356-600.jpg?v=1657988046",
      product_status: "NOTLINKED",
      item_vforderstatus: "notlinked",
      provisional_remark:
        "This product does not exist in our catalog. You can choose to raise request to catalog this product or link with a similar product from vfulfill catalog.",
      product_link: "https:///admin/products/7409377706139",
      original_qty: 1,
      provisional: true,
      vfsku: "VFPD3698-VT12",
    },
  ];
  return (
    <div
      className="demo-orderProductDetail-col"
      style={{
        height: "186px",
      }}
    >
      {line_items?.map((product, key) => {
        return (
          <div key={key} className="product-card-container">
            <div className="product-detail-section-container">
              <div className="item">
                <div className="image-container">
                  <img src={product.img} />
                </div>
              </div>
              <div className="item details-section">
                <div className="product-name-container">
                  {" "}
                  {data.subTabArray[0].visible ? product.name : ""}
                </div>
                <div className="specs-container">
                  {" "}
                  {data.subTabArray[1].visible ? (
                    <span>Specs: {product.allspecs}</span>
                  ) : (
                    ""
                  )}
                </div>
                {product.vfsku !== "BUNDLE" ? (
                data.subTabArray[2].visible? <div className="item">{product.vfsku}</div>:""
                ) : null}
              </div>
              <div className="item quantity">   {data.subTabArray[3].visible? <span>{product.quantity} pcs</span>:""}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
