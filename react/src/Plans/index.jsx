import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Flex, Skeleton, message } from "antd";
import { Actions } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import Logo from "../assets/Icons/VflogoFull";
import LogoWhite from "../assets/Icons/VflogoFullWhite";
import Tab from "./Tabs/index";
import { FirstTable, manageShipping, PlatformData } from "./tableData";
import getPlans from "./API/getPlans";
import switchStoreFunc from "./API/switchStore";
import CustomTable from "./CustomTable";
import CustomTableHorizontal from "./CustomTableHorizontal";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import ActionHeadings from "./ActionHeadings/index";
import FreezeHeadings from "./FreezeHeadings/index";
import { WarehouseData } from "./tableData";
import { motion, useAnimation } from "framer-motion";
import { sourcingData } from "./tableData";
import { productResearch } from "./tableData";
import Reviews from "./Reviews";
import ShopifyStarLogo from "../assets/Icons/ShopifyStarLogo";
import TrustPilotLogo from "../assets/Icons/TrustPilotLogo";
import { LeftArrowGrey } from "../assets/Icons/LeftArrowGrey";
import { PoweroffOutlined } from "@ant-design/icons";
import useWindowDimensions from "../CustomHooks/useWindowDimensions";
import Up from "../assets/Icons/Up";
import Down from "../assets/Icons/Down";
import Faq from "./Faq";

const Plans = ({ auth, location, hash, match, title }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { switchStore, signOut } = bindActionCreators(Actions, dispatch);
  const [plansData, setPlansData] = useState({});
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState("monthly");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFree, setIsfree] = useState(false);
  const [switchStoreData, setSwitchStoreData] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const { width } = useWindowDimensions();
  const [showNav, setShowNav] = useState(false);
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);

    if (isExpanded) {
      window.scrollTo(0, 1000);
    }
  };

  const getPlanHandler = async () => {
    try {
      const { data } = await getPlans();
      return data;
    } catch (error) {
      // message.error(error.message || "An error occurred while fetching data");
      return null;
    }
  };

  const switchStoreHandler = async () => {
    try {
      const { data } = await switchStoreFunc();
      return data;
    } catch (error) {
      // message.error(error.message || "An error occurred while fetching data");
      return null;
    }
  };

  const submitPlan = () => {
    setIsfree(true);
    setBtnLoading(true);

    axios({
      url: import.meta.env.VITE_REACT_API_URL + "/stripe/set_free_plan",
      method: "post",
      withCredentials: true,
    })
      .then((res) => {
        setBtnLoading(false);

        if (res.data.success === 1) {
          switchStore();
        } else {
          message.error(res.data.msg);
        }
      })
      .catch((e) => {
        message.error(e.message);
        setBtnLoading(false);
      });
  };

  const handleSubscription = (planType, changePlan = false) => {
    const plan = plansData[
      selectedTab === "Annually" ? "yearly" : selectedTab.toLowerCase()
    ]?.find((plan) =>
      plan.plan_displayname.toLowerCase().includes(planType?.toLowerCase())
    );

    if (plan) {
      if (changePlan) {
        return navigate(
          `/subscription?${
            selectedTab === "Annually" ? "yearly" : selectedTab.toLowerCase()
          }=true&&trial=false&&plan_id=${
            plan.plan_id
          }&&plan_name=${planType}&&changeplan=true&&amount=${plan?.amount}`
        );
      } else {
        return navigate(
          `/subscription?${
            selectedTab === "Annually" ? "yearly" : selectedTab.toLowerCase()
          }=true&&trial=true&&plan_id=${plan.plan_id}&&plan_name=${planType}`
        );
      }
    }
  };
  const handlePlanId = (planType) => {
    const plan = plansData[
      selectedTab === "Annually" ? "yearly" : selectedTab.toLowerCase()
    ]?.find((plan) =>
      plan.plan_displayname.toLowerCase().includes(planType?.toLowerCase())
    );

    if (plan) {
      return plan.plan_id;
    }
  };

  const getPlanAmount = (planType) => {
    const plan = plansData[
      selectedTab === "Annually" ? "yearly" : selectedTab.toLowerCase()
    ]?.find((plan) =>
      plan.plan_displayname
        .split(" ")[0]
        .toLowerCase()
        .includes(planType.toLowerCase())
    );

    return plan ? plan.amount : null;
  };

  useEffect(() => {
    document.title = title;

    const fetchData = async () => {
      setLoading(true);
      const [plansData, switchStoreData] = await Promise.all([
        getPlanHandler(),
        switchStoreHandler(),
      ]);
      setPlansData(plansData);
      setSwitchStoreData(switchStoreData);
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!auth?.auth?.logged_in) {
      return navigate("/switch-store");
    }

    if (auth?.auth?.user?.subscription === "active" && isFree) {
      return navigate("/home");
    }
  }, [auth, isFree]);

  useEffect(() => {
    setIsMobile(width < 768);
  }, [width]);

  const isPaid = switchStoreData?.plan?.current_plan?.plan_type === "paid";
  const isActivePlan = switchStoreData?.plan?.current_plan?.plan_vf_status;

  if (isMobile) {
    return (
      <div className="plan-bg mobile">
        <div id="fade-in" className="plans-page-wraper mobile">
          <div className="plans-header-wrapper">
            <LogoWhite />
            {switchStoreData?.plan?.current_plan?.plan_type ? (
              <a
                className="backdashboard"
                onClick={() => {
                  return navigate("/home");
                }}
              >
                <LeftArrowGrey />
                Back To Dashboard
              </a>
            ) : (
              ""
            )}
          </div>

          {loading ? (
            <Skeleton style={{ padding: "5rem" }} />
          ) : (
            <div id="fade-in" className="plans-table-container">
              <div className="plans-header">
                {isPaid || isActivePlan === "trialing" ? (
                  <h2> Upgrade to a paid plan today</h2>
                ) : (
                  <h2> Start your 7 Days Trial for just $1</h2>
                )}
                <p>
                  And get your 100% risk-free account to help you automate your
                  eCommerce success.
                </p>

                <Flex
                  gap={12}
                  align="center"
                  justify="center"
                  className="subscription-options"
                >
                  <Tab
                    switchStoreData={switchStoreData}
                    selectedTab={selectedTab}
                    setSelectedTab={setSelectedTab}
                  />
                </Flex>
              </div>

              <div class="ttt">
                <CustomTableHorizontal
                  data={FirstTable}
                  switchStoreData={switchStoreData}
                  header={
                    <ActionHeadings
                      switchStoreData={switchStoreData}
                      switchStore={switchStore}
                      setIsfree={setIsfree}
                      btnLoading={btnLoading}
                      submitPlan={submitPlan}
                      handleSubscription={handleSubscription}
                      handlePlanId={handlePlanId}
                      selectedTab={selectedTab}
                      getPlanAmount={getPlanAmount}
                    />
                  }
                />

                <Faq />
                <Reviews />

                <div className="footer-ic">
                  <ShopifyStarLogo />
                  <TrustPilotLogo />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="plan-bg">
      <FreezeHeadings
        showNav={showNav && isExpanded}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        setShowNav={setShowNav}
        switchStoreData={switchStoreData}
        switchStore={switchStore}
        setIsfree={setIsfree}
        btnLoading={btnLoading}
        submitPlan={submitPlan}
        handlePlanId={handlePlanId}
        handleSubscription={handleSubscription}
        getPlanAmount={getPlanAmount}
      />

      <div id="fade-in" className="plans-page-wraper">
        <div className="plans-header-wrapper">
          <LogoWhite />
          {switchStoreData?.plan?.current_plan?.plan_type ? (
            <a
              className="backdashboard"
              onClick={() => {
                return navigate("/home");
              }}
            >
              <LeftArrowGrey />
              Back To Dashboard
            </a>
          ) : (
            <a className="backdashboard" onClick={() => signOut()}>
              <PoweroffOutlined />
              Log Out
            </a>
          )}
        </div>

        {loading ? (
          <Skeleton style={{ padding: "5rem" }} />
        ) : (
          <div id="fade-in" className="plans-table-container">
            <div className="plans-header">
              {isPaid || isActivePlan === "trialing" ? (
                <h2> Upgrade to a paid plan today</h2>
              ) : (
                <h2> Start your 7 Days Trial for just $1</h2>
              )}
              <p>
                And get your 100% risk-free account to help you automate your
                eCommerce success.
              </p>

              <Flex
                gap={12}
                align="center"
                justify="center"
                className="subscription-options"
              >
                <Tab
                  switchStoreData={switchStoreData}
                  selectedTab={selectedTab}
                  setSelectedTab={setSelectedTab}
                />
              </Flex>
            </div>

            <div className="test">
              <div className="expandable-div">
                <CustomTable
                  data={FirstTable}
                  switchStoreData={switchStoreData}
                  header={
                    <ActionHeadings
                      switchStoreData={switchStoreData}
                      switchStore={switchStore}
                      setIsfree={setIsfree}
                      btnLoading={btnLoading}
                      submitPlan={submitPlan}
                      handlePlanId={handlePlanId}
                      handleSubscription={handleSubscription}
                      selectedTab={selectedTab}
                      getPlanAmount={getPlanAmount}
                    />
                  }
                />

                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: isExpanded ? "auto" : "0",
                    opacity: isExpanded ? 1 : 1,
                  }}
                  transition={{ duration: 0.9 }}
                  style={{
                    overflow: "hidden",
                  }}
                >
                  <CustomTable
                    switchStoreData={switchStoreData}
                    data={productResearch}
                    header={
                      <div className="custom-table-header">
                        🔎 Product Research
                      </div>
                    }
                  />

                  <CustomTable
                    switchStoreData={switchStoreData}
                    data={sourcingData}
                    header={
                      <div className="custom-table-header">🏭 Sourcing</div>
                    }
                  />

                  <CustomTable
                    switchStoreData={switchStoreData}
                    data={WarehouseData}
                    header={
                      <div className="custom-table-header">
                        📦 Warehousing & Fulfillment
                      </div>
                    }
                  />

                  <CustomTable
                    switchStoreData={switchStoreData}
                    data={manageShipping}
                    header={
                      <div className="custom-table-header">
                        🚚 Managed Shipping
                      </div>
                    }
                  />
                  <CustomTable
                    switchStoreData={switchStoreData}
                    data={PlatformData}
                    header={
                      <div className="custom-table-header">🖥️ Platform</div>
                    }
                    // footer={
                    //   <ActionHeadings
                    //     switchStoreData={switchStoreData}
                    //     switchStore={switchStore}
                    //     setIsfree={setIsfree}
                    //     btnLoading={btnLoading}
                    //     submitPlan={submitPlan}
                    //     handlePlanId={handlePlanId}
                    //     handleSubscription={handleSubscription}
                    //     selectedTab={selectedTab}
                    //     getPlanAmount={getPlanAmount}
                    //   />
                    // }
                  />
                </motion.div>

                <div className="expand-button" onClick={() => toggleExpand()}>
                  {isExpanded ? (
                    <div>
                      Hide Detailed Comparison <Up />
                    </div>
                  ) : (
                    <div>
                      Show Detailed Comparison
                      <Down />
                    </div>
                  )}
                </div>
              </div>

              <Faq />
              <Reviews />

              <div className="footer-ic">
                <ShopifyStarLogo />
                <TrustPilotLogo />
              </div>
            </div>
            {/* 
            <div class="ttt">
              <CustomTableHorizontal
                data={FirstTable}
                switchStoreData={switchStoreData}
                header={
                  <ActionHeadings
                    switchStoreData={switchStoreData}
                    setIsfree={setIsfree}
                    btnLoading={btnLoading}
                    submitPlan={submitPlan}
                    handleSubscription={handleSubscription}
                    selectedTab={selectedTab}
                    getPlanAmount={getPlanAmount}
                  />
                }
              />
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Plans;
