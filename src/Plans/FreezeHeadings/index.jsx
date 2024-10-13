import React, { useState, useEffect } from "react";
import "./index.scss";
import { Button, Tooltip, message, Select, Space, Flex } from "antd";
import { useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import axios from "axios";
import VflogoFullBlack from "../../assets/Icons/VflogoFullBlack";
const ActionHeadings = ({
  getPlanAmount,
  selectedTab,
  handleSubscription,
  btnLoading,
  submitPlan,
  switchStoreData,
  switchStore,
  handlePlanId,
  showNav,
  setShowNav,

  setSelectedTab,
}) => {
  const [interval, setInterVal] = useState("");
  const navigate = useNavigate();

  const division = {
    quarterly: 3,
    annually: 12,
    monthly: 1,
  };

  const savingsObj = {
    monthly: {
      mover: 0,
      shaker: 0,
      earthquaker: 0,
    },
    quarterly: {
      mover: 18, //(79-73)*3
      shaker: 42, //(149-135)*3
      earthquaker: 57, //(249-230)*3
    },
    annually: {
      mover: 144, //(79-67)*12
      shaker: 288, //(149-125)*12
      earthquaker: 456, //(249-211)*12
    },
  };

  const [loading, setLoading] = useState({
    free: false,
    mover: false,
    shaker: false,
    earthquaker: false,
  });

  const upGradePlan = (planName) => {
    setLoading((prev) => ({ ...prev, [planName]: true }));

    let planid = handlePlanId(planName);

    axios({
      url: import.meta.env.VITE_REACT_API_URL + "/stripe/update_plan",
      method: "post",
      withCredentials: true,
      data: { plan_id: planid },
    })
      .then((res) => {
        if (res.data.success) {
          if (!!res.data.client_secret) {
            handleSubscription(planName, true);
          } else {
            switchStore();
            setTimeout(() => navigate("/switch-store"), 2000);
          }
        } else {
          message.error(res.data.msg);
          setLoading((prev) => ({ ...prev, [planName]: false }));
        }
      })
      .catch((e) => {
        message.error(e.message);
        setLoading((prev) => ({ ...prev, [planName]: false }));
      });
  };

  useEffect(() => {
    if (
      switchStoreData?.plan?.current_plan?.interval === "month" &&
      switchStoreData?.plan?.current_plan?.interval_count == 3
    ) {
      return setInterVal("Quarterly");
    }

    if (switchStoreData?.plan?.current_plan?.interval === "month") {
      return setInterVal("Monthly");
    }

    if (switchStoreData?.plan?.current_plan?.interval === "year") {
      return setInterVal("Annually");
    }

    return setInterVal("Monthly");
  }, []);

  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setShowNav(true);
      } else {
        setShowNav(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (showNav) {
      controls.start({ opacity: 1 });
      // controls.start({ y: 0, opacity: 1 });
    } else {
      controls.start({ opacity: 0 });
      // controls.start({ y: -100, opacity: 0 });
    }
  }, [showNav, controls]);

  const isPaid = switchStoreData?.plan?.current_plan?.plan_type === "paid";
  const activePlanName =
    switchStoreData?.plan?.current_plan?.plan_name?.toLowerCase();
  const isActivePlan = switchStoreData?.plan?.current_plan?.plan_vf_status;
  const showTrialButton = switchStoreData?.plan?.show_trial;

  const getSaving = (tab, plan) => {
    try {
      return savingsObj[tab.toLowerCase()][plan];
    } catch (error) {
      console.error(
        `Error retrieving savings for ${plan} under ${tab}:`,
        error
      );
      return 0; // Default value if there is an error
    }
  };

  const moverSaving = getSaving(selectedTab, "mover");
  const shakerSaving = getSaving(selectedTab, "shaker");
  const earthQuakerSaving = getSaving(selectedTab, "earthquaker");

  const tabs = ["Monthly", "Quarterly", "Annually"];

  if (!showNav) {
    return null;
  }

  return (
    <motion.nav
      className="custom-nav"
      initial={{ opacity: 0 }}
      // initial={{ y: -100, opacity: 0 }}
      animate={controls}
      transition={{ duration: 0.3 }}
    >
      <div className="freeze-row">
        <div className="action-cell left">
          <Flex justify="end" align="start" vertical>
            <div>
              <VflogoFullBlack />
              <h1>Selected Billing Cycle</h1>
            </div>

            <div className="plan-select-wraper">
              <Select
                suffixIcon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="12"
                    viewBox="0 0 24 12"
                  >
                    <path
                      id="Polygon_193"
                      data-name="Polygon 193"
                      d="M12,0,24,12H0Z"
                      transform="translate(24 12) rotate(180)"
                      fill="#6450d3"
                    />
                  </svg>
                }
                style={{ width: "100%" }}
                onChange={(e) => setSelectedTab(e)}
                value={selectedTab}
                className="plan-duration-select"
                popupClassName="plan-duration-overlay"
                popupMatchSelectWidth={false}
                options={[
                  {
                    value: "Monthly",
                    label: "Monthly",
                  },
                  {
                    value: "Quarterly",
                    label: "Quarterly",
                  },
                  {
                    value: "Annually",
                    label: "Annually",
                  },
                ]}
                optionRender={(option) => (
                  <Space>
                    {option.value}

                    {option.value === "Quarterly" && (
                      <h2 className="price-badge quarterly">
                        (Save 10% quarterly)
                      </h2>
                    )}
                    {option.value === "Annually" && (
                      <h2 className="price-badge annually">
                        (Get 2 months free)
                      </h2>
                    )}
                  </Space>
                )}
              />

              {/* {selectedTab === "Quarterly" && (
              <h2 className="price-badge quarterly">(Save 10% quarterly)</h2>
            )}
            {selectedTab === "Annually" && (
              <h2 className="price-badge annually">(Get 2 months free)</h2>
            )} */}
            </div>
          </Flex>
        </div>

        {!isPaid && (
          <div className="action-cell">
            <div className="top-text">
              <h1>Free</h1>
              <h2>
                $0 <span>/month{selectedTab !== "Monthly" && "*"}</span>
              </h2>
            </div>

            <div className="bottom-btn">
              {activePlanName?.includes("free") ? (
                <Button className="current-plan" loading={btnLoading}>
                  Current Plan
                </Button>
              ) : (
                <Button loading={btnLoading} onClick={() => submitPlan()}>
                  Start Free Plan
                </Button>
              )}
            </div>
          </div>
        )}
        <div className="action-cell">
          <div className="top-text">
            <h1>Mover</h1>
            <h2>
              $
              {Number(
                Number(getPlanAmount("mover")) /
                  division[selectedTab?.toLowerCase()]
              ).toFixed()}
              <span>/month{selectedTab !== "Monthly" && "*"}</span>
            </h2>

            {selectedTab !== "Monthly" && <h3>*billed {selectedTab}</h3>}

            {!!moverSaving && (
              <div className="saving-div">
                Savings ${moverSaving} per <span> {selectedTab} </span> !
              </div>
            )}
          </div>

          <div className="bottom-btn">
            {showTrialButton === 1 ? (
              <Button
                onClick={() => handleSubscription("mover")}
                type="primary"
              >
                Start $1 Trial
              </Button>
            ) : interval === selectedTab &&
              activePlanName?.includes("mover") ? (
              <Tooltip
                title={
                  isActivePlan === "trialing"
                    ? "End trial and upgrade for premium features."
                    : null
                }
              >
                <Button
                  disabled={isActivePlan === "trialing" ? false : true}
                  className="current-plan"
                  loading={loading.mover}
                  onClick={
                    isActivePlan === "trialing"
                      ? () => upGradePlan("mover")
                      : null
                  }
                  type="primary"
                >
                  Current Plan
                </Button>
              </Tooltip>
            ) : isActivePlan ? (
              <Tooltip
                title={
                  isActivePlan === "trialing"
                    ? "End trial and upgrade for premium features."
                    : null
                }
              >
                <Button
                  className="change-plan"
                  loading={loading.mover}
                  onClick={() => upGradePlan("mover")}
                  type="primary"
                >
                  Change Plan
                </Button>
              </Tooltip>
            ) : (
              <Button
                onClick={() => handleSubscription("mover")}
                type="primary"
              >
                Start $1 Trial
              </Button>
            )}
          </div>
        </div>
        <div className="action-cell">
          <div className="top-text">
            <h1>Shaker</h1>
            <h2>
              $
              {Number(
                Number(getPlanAmount("shaker")) /
                  division[selectedTab?.toLowerCase()]
              ).toFixed()}
              <span>/month{selectedTab !== "Monthly" && "*"}</span>
            </h2>

            {selectedTab !== "Monthly" && <h3>*billed {selectedTab}</h3>}

            {!!shakerSaving && (
              <div className="saving-div">
                Savings ${shakerSaving} per <span> {selectedTab} </span> !
              </div>
            )}
          </div>

          <div className="bottom-btn">
            {showTrialButton === 1 ? (
              <Button
                onClick={() => handleSubscription("shaker")}
                type="primary"
              >
                Start $1 Trial
              </Button>
            ) : interval === selectedTab &&
              activePlanName?.includes("shaker") ? (
              <Tooltip
                title={
                  isActivePlan === "trialing"
                    ? "End trial and upgrade for premium features."
                    : null
                }
              >
                <Button
                  className="current-plan"
                  onClick={
                    isActivePlan === "trialing"
                      ? () => upGradePlan("shaker")
                      : null
                  }
                  loading={loading.shaker}
                  disabled={isActivePlan === "trialing" ? false : true}
                  type="primary"
                >
                  Current Plan
                </Button>
              </Tooltip>
            ) : isActivePlan ? (
              <Tooltip
                title={
                  isActivePlan === "trialing"
                    ? "End trial and upgrade for premium features."
                    : null
                }
              >
                <Button
                  className="change-plan"
                  onClick={() => upGradePlan("shaker")}
                  type="primary"
                  loading={loading.shaker}
                >
                  Change Plan
                </Button>
              </Tooltip>
            ) : (
              <Button
                onClick={() => handleSubscription("shaker")}
                type="primary"
              >
                Start $1 Trial
              </Button>
            )}
          </div>
        </div>
        <div className="action-cell right">
          <div className="top-text">
            <h1>Earthquaker</h1>
            <h2>
              $
              {Number(
                Number(getPlanAmount("earthquaker")) /
                  division[selectedTab?.toLowerCase()]
              ).toFixed()}
              <span>/month{selectedTab !== "Monthly" && "*"}</span>
            </h2>

            {selectedTab !== "Monthly" && <h3>*billed {selectedTab}</h3>}

            {!!earthQuakerSaving && (
              <div className="saving-div">
                Savings ${earthQuakerSaving} per <span> {selectedTab} </span> !
              </div>
            )}
          </div>

          <div className="bottom-btn">
            {showTrialButton === 1 ? (
              <Button
                onClick={() => handleSubscription("earthquaker")}
                type="primary"
              >
                Start $1 Trial
              </Button>
            ) : interval === selectedTab &&
              activePlanName?.includes("earth") ? (
              <Tooltip
                title={
                  isActivePlan === "trialing"
                    ? "End trial and upgrade for premium features."
                    : null
                }
              >
                <Button
                  className="current-plan"
                  onClick={
                    isActivePlan === "trialing"
                      ? () => upGradePlan("earthquaker")
                      : null
                  }
                  loading={loading.earthquaker}
                  disabled={isActivePlan === "trialing" ? false : true}
                  type="primary"
                >
                  Current Plan
                </Button>
              </Tooltip>
            ) : isActivePlan ? (
              <Tooltip
                title={
                  isActivePlan === "trialing"
                    ? "End trial and upgrade for premium features."
                    : null
                }
              >
                <Button
                  className="change-plan"
                  onClick={() => upGradePlan("earthquaker")}
                  type="primary"
                  loading={loading.earthquaker}
                >
                  Change Plan
                </Button>
              </Tooltip>
            ) : (
              <Button
                onClick={() => handleSubscription("earthquaker")}
                type="primary"
              >
                Start $1 Trial
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default ActionHeadings;
