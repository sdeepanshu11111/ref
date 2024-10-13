import React from "react";

export const FirstTable = [
  {
    tooltipTitle:"Access exclusive products selected for high demand and profitability, updated weekly.",
    Features: "Inner Circle Products",
    Free: "Last 4 weeks locked",
    Mover: "Last 3 weeks locked",
    Shaker: "Last 2 weeks locked",
    EarthQuaker: "All",
    
  },
  // {
  //   tooltipTitle:"Sell products directly from suppliers to your customers without holding inventory.",
  //   Features: "Dropshipping",
  //   Free: true,
  //   Mover: true,
  //   Shaker: true,
  //   EarthQuaker: true,
  // },
  // {
  //   tooltipTitle:"Manage and ship products from your own inventory with seamless logistics integration.",
  //   Features: "Stockshipping",
  //   Free: true,
  //   Mover: true,
  //   Shaker: true,
  //   EarthQuaker: true,
  // },
  {
    tooltipTitle:"Get access to insights of top-performing products with cost-per-acquisition and delivery data.",
    Features: "Winner Products with CPA & Delivery Data",
    Free: false,
    Mover: false,
    Shaker: false,
    EarthQuaker: true,
  },
  {
    tooltipTitle:"Customize products with your brand's logo and packaging for a unique market presence.",
    Features: "Private Labelling",
    Free: false,
    Mover: true,
    Shaker: true,
    EarthQuaker: true,
  },
  {
    tooltipTitle:"Link multiple online stores to manage all orders, inventory, and data in one dashboard.",
    Features: "Connected Stores",
    Free: 1,
    Mover: 1,
    Shaker: 3,
    EarthQuaker: 5,
  },
  {
    tooltipTitle:"Access detailed reports and insights to track performance, costs, and profitability.",
    Features: "Order Analytics",
    Free: "Partially Locked",
    Mover: "Full Access",
    Shaker: "Full Access",
    EarthQuaker: "Full Access",
  },
  {
    tooltipTitle:"Fee charged per delivered order, based on the higher of a fixed rate or percentage of the order value.",
    Features: "Convenience Fee/Delivered Order",
    Free: (
      <div className="custom-cell">
        6% or ₹60
        <span> (whichever is higher)</span>
      </div>
    ),

    Mover: (
      <div className="custom-cell">
        5% or ₹50
        <span> (whichever is higher)</span>
      </div>
    ),

    Shaker: (
      <div className="custom-cell">
        4% or ₹40
        <span> (whichever is higher)</span>
      </div>
    ),

    EarthQuaker: (
      <div className="custom-cell">
        3% or ₹30
        <span> (whichever is higher)</span>
      </div>
    ),
  },
];

export const manageShipping = [
  {
   tooltipTitle:"Access a network of reliable shipping partners for your deliveries.",
    Features: "Standard Shipping Partners",
    Free: true,
    Mover: true,
    Shaker: true,
    EarthQuaker: true,
  },
  {
   tooltipTitle:"Automatically select the best courier based on cost, speed, and service quality.",
    Features: "AI Based Smart Courier Allocation",
    Free: true,
    Mover: true,
    Shaker: true,
    EarthQuaker: true,
  },
  {
   tooltipTitle:"Provide customers with a tracking page customized with your brand's look and feel.",
    Features: "Branded Tracking Page",
    Free: false,
    Mover: false,
    Shaker: true,
    EarthQuaker: true,
  },
  {
   tooltipTitle:"Customize shipping labels and invoices with your brand's logo and information.",
    Features: "Branded Shipping Labels & Invoices",
    Free: false,
    Mover: false,
    Shaker: true,
    EarthQuaker: true,
  },
  {
   tooltipTitle:"Predict the risk of return-to-origin (RTO) to prevent shipping loss.",
    Features: "RTO Risk Prediction",
    Free: false,
    Mover: false,
    Shaker: true,
    EarthQuaker: true,
  },
  {
   tooltipTitle:"Ensure accurate shipping costs with guaranteed correct package weights.",
    Features: "Guaranteed Zero Weight Disputes",
    Free: true,
    Mover: true,
    Shaker: true,
    EarthQuaker: true,
  },
  {
   tooltipTitle:"Track non-delivery reports (NDR) in real-time to manage delivery issues effectively.",
    Features: "Real-Time NDR in 1 Dashboard",
    Free: true,
    Mover: true,
    Shaker: true,
    EarthQuaker: true,
  },
  {
   tooltipTitle:"Automate order status updates and customer communications via WhatsApp.",
    Features: "WhatsApp Order Communication",
    Free: "Starting ₹7 / Order",
    Mover: "Starting ₹7 / Order",
    Shaker: "Starting ₹6 / Order",
    EarthQuaker: "Starting ₹6 / Order",
  },
];

export const PlatformData = [
  {
    tooltipTitle:"Manage multiple online stores from a single platform, consolidating operations.",
    Features: "Connected Stores",
    Free: "1 Store",
    Mover: "1 Store",
    Shaker: "3 Stores",
    EarthQuaker: "5 Stores",
  },
  {
    tooltipTitle:"Assign custom roles and permissions to team members for secure account management.",
    Features: "Staff Accounts with Custom Roles",
    Free: "2 Accounts",
    Mover: "2 Accounts",
    Shaker: "4 Accounts",
    EarthQuaker: "10 Accounts",
  },
  {
    tooltipTitle:"Participate in bi-weekly webinars for training, updates, and business insights.",
    Features: "Fortnightly Webinar Access",
    Free: true,
    Mover: true,
    Shaker: true,
    EarthQuaker: true,
  },
  {
    tooltipTitle:"Regular calls with your account manager to ensure your business is on track.",
    Features: "Fortnightly Check-in Call",
    Free: false,
    Mover: false,
    Shaker: false,
    EarthQuaker: true,
  },
  {
    tooltipTitle:"Simplified and transparent financial management to keep track of earnings and expenses.",
    Features: "Stress Free Transparent Accounting",
    Free: true,
    Mover: true,
    Shaker: true,
    EarthQuaker: true,
  },
  {
    tooltipTitle:"Use a leased Indian tax ID for compliance with local regulations.",
    Features: "Lease Indian Tax & Billing ID",
    Free: true,
    Mover: true,
    Shaker: true,
    EarthQuaker: true,
  },
  {
    tooltipTitle:"Receive cash-on-delivery payments settled directly into your account on a scheduled basis.",
    Features: "COD Settlement",
    Free: "Weekly",
    Mover: "Weekly",
    Shaker: "Weekly",
    EarthQuaker: "Bi-Weekly",
  },
  {
    tooltipTitle:"Full access to a suite of integrated apps for enhanced business operations.",
    Features: "Integrated Value Apps Ecosystem",
    Free: "Limited",
    Mover: "Limited",
    Shaker: "Full Access",
    EarthQuaker: "Full Access",
  },
  {
    tooltipTitle:"Get help through various channels, from email to dedicated phone support based on your plan.",
    Features: "Support",
    Free: "Email",
    Mover: "Email",
    Shaker: "Email & WhatsApp",
    EarthQuaker: "Email, WhatsApp & On Call",
  },
];

export const productResearch = [
  {
    tooltipTitle:"Discover newly added products weekly to expand your store's offerings.",
    Features: "New Products",
    Free: "3 Products / Week",
    Mover: "3 Products / Week",
    Shaker: "5 Products / Week",
    EarthQuaker: "10 Products / Week",
  },
  {
    tooltipTitle:"Search the product catalog daily to find and add relevant products to your store.",
    Features: "Catalog Search",
    Free: "20 Searches / Day",
    Mover: "20 Searches / Day",
    Shaker: "Unlimited Searches / Day",
    EarthQuaker: "Unlimited Searches / Day",
  },
  {
    tooltipTitle:"Access exclusive products selected for high demand and profitability, updated weekly.",
    Features: "Inner Circle Products",
    Free: "Last 3 weeks locked",
    Mover: "Last 3 weeks locked",
    Shaker: "Last 2 weeks locked",
    EarthQuaker: "All Inner Circle Products",
  },
  {
    tooltipTitle:"Download high-quality images and videos for your products to enhance your marketing.",
    Features: "Product Media Available",
    Free: true,
    Mover: true,
    Shaker: true,
    EarthQuaker: true,
  },
  {
    tooltipTitle:"Ready-to-use Facebook ad creatives to help promote your products more effectively.",
    Features: "FB Ads Included",
    Free: false,
    Mover: false,
    Shaker: false,
    EarthQuaker: true,
  },
];

export const sourcingData = [
  {
     tooltipTitle:"Source a variety of products directly from China and India.",
    Features: "Source Products from China/India",
    Free: true,
    Mover: true,
    Shaker: true,
    EarthQuaker: true,
  },
  {
     tooltipTitle:"Accelerated sourcing process to get products faster from suppliers.",
    Features: "Fasttrack Sourcing",
    Free: false,
    Mover: false,
    Shaker: true,
    EarthQuaker: true,
  },
  {
     tooltipTitle:"Completely managed import and custom clearance service for hassle-free international sourcing.",
    Features: "100% Managed Imports & Customs",
    Free: true,
    Mover: true,
    Shaker: true,
    EarthQuaker: true,
  },
  {
     tooltipTitle:"Request samples of products to check quality before listing them on your store.",
    Features: "Product Samples",
    Free: true,
    Mover: true,
    Shaker: true,
    EarthQuaker: true,
  },
  {
     tooltipTitle:"Submit requests for quotations on products to get exact pricing and details.",
    Features: "Requests for Quotation / Month",
    Free: 1,
    Mover: "3 / month",
    Shaker: "10 / month",
    EarthQuaker: "30 / month",
  },
  {
     tooltipTitle:"Create unique products & packaging tailored to your specifications.",
    Features: "Customized Product Creation",
    Free: false,
    Mover: false,
    Shaker: false,
    EarthQuaker: true,
  },
  {
     tooltipTitle:"Direct access to a sourcing expert for personalized product recommendations and support.",
    Features: "Access to One-On-One Sourcing Specialist",
    Free: false,
    Mover: false,
    Shaker: false,
    EarthQuaker: true,
  },
];

export const WarehouseData = [
  {
    tooltipTitle:"Utilize vFulfill's warehouse for efficient inventory management and order fulfilment.",
    Features: "Managed Warehouse",
    Free: true,
    Mover: true,
    Shaker: true,
    EarthQuaker: true,
  },
  {
    tooltipTitle:"Start without long-term commitments or upfront setup fees.",
    Features: "No Lock-In, No Set Up Fee",
    Free: true,
    Mover: true,
    Shaker: true,
    EarthQuaker: true,
  },
  {
    tooltipTitle:"Monitor your inventory levels in real-time to avoid stockouts.",
    Features: "Real Time View of Inventory Stored",
    Free: true,
    Mover: true,
    Shaker: true,
    EarthQuaker: true,
  },
  {
    tooltipTitle:"Intelligent scoring system to prevent the RTO loss on high risk orders.",
    Features: "AI Based Address Score",
    Free: false,
    Mover: false,
    Shaker: true,
    EarthQuaker: true,
  },
  {
    tooltipTitle:"Orders are processed and shipped within one business day for better delivery.",
    Features: "Guaranteed 1 Day Fulfillment",
    Free: false,
    Mover: false,
    Shaker: false,
    EarthQuaker: true,
  },
  {
    tooltipTitle:"Add branded inserts like thank-you cards or promotional material to your packages.",
    Features: "Custom Inserts",
    Free: false,
    Mover: false,
    Shaker: false,
    EarthQuaker: true,
  },
  {
    tooltipTitle:"Tailor your product packaging to match your brand's aesthetics and values.",
    Features: "Custom Packaging",
    Free: false,
    Mover: false,
    Shaker: false,
    EarthQuaker: true,
  },
  {
    tooltipTitle:"Customize products with your brand's logo and packaging for a unique market presence.",
    Features: "Private Labelling",
    Free: false,
    Mover: false,
    Shaker: false,
    EarthQuaker: true,
  },
];
