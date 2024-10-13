import React from "react";
import { Form, Radio, Button, Typography, Modal, message, Divider } from "antd";
import { formatNumberNew } from "../../../helpers/Pricing";
import "./index.scss";

const division = {
  quarterly: 4,
  annually: 12,
  monthly: 1,
};

const PlanChooseOption = ({
  initialPlan,
  choosedPlan,
  changePlan,
  plansData,
  plan_name,
  subscription,
}) => {
  const getPlanAmount = (planType) => {
    const plan = plansData[subscription]?.find((plan) =>
      plan.plan_displayname
        .split(" ")[0]
        .toLowerCase()
        .includes(plan_name.toLowerCase())
    );

    return plan ? plan?.amount || 0 : null;
  };

  if (initialPlan === "monthly") {
    return (
      <div className="plan-option-wraper">
        <MonthlyRadio
          getPlanAmount={getPlanAmount}
          changePlan={changePlan}
          choosedPlan={choosedPlan}
        />
        <div className="divider-text">Other Offers for Your Plan</div>
        <QuarterlyRadio
          getPlanAmount={getPlanAmount}
          changePlan={changePlan}
          choosedPlan={choosedPlan}
          planName={plan_name.toLowerCase()}
        />
      </div>
    );
  }

  if (initialPlan === "quarterly") {
    return (
      <div className="plan-option-wraper">
        <QuarterlyRadio
          getPlanAmount={getPlanAmount}
          changePlan={changePlan}
          choosedPlan={choosedPlan}
        />
        <div className="divider-text">Other Offers for Your Plan</div>
        <YearlyRadio
          getPlanAmount={getPlanAmount}
          changePlan={changePlan}
          choosedPlan={choosedPlan}
        />
      </div>
    );
  }

  return (
    <div className="plan-option-wraper">
      <YearlyRadio
        getPlanAmount={getPlanAmount}
        changePlan={changePlan}
        choosedPlan={choosedPlan}
      />
    </div>
  );
};
export default PlanChooseOption;

const MonthlyRadio = ({ getPlanAmount, choosedPlan, changePlan }) => (
  <Radio
    onClick={(e) => changePlan(e.target.value)}
    checked={choosedPlan === "monthly"}
    value="monthly"
  >
    <h1> To Pay Today: Only $1.00</h1>
    {choosedPlan === "monthly" && (
      <p>
        (${Number(getPlanAmount()) / division["monthly"]} / month after 7 Day
        Free Trial) - <span>Monthly</span>{" "}
      </p>
    )}
  </Radio>
);

const QuarterlyRadio = ({ getPlanAmount, choosedPlan, changePlan,planName }) => (
  <Radio
    onClick={(e) => changePlan(e.target.value)}
    checked={choosedPlan === "quarterly"}
    value="quarterly"
  >
    <div className="text-wraper">
      <h1>
        {/* <span>Save {(planName=="mover"?"$18":(planName=="shaker"?"$42":"$57"))} dollars!</span> To Pay Today: Only $1.00 */}
        <span>Save 10% quarterly!</span> To Pay Today: Only $1.00 
      </h1>{" "}
      <div className="plan-name-radio">Quarterly</div>
    </div>

    {choosedPlan === "quarterly" && (
      <p>
        (${Number(getPlanAmount()) / division["quarterly"]}/ month after 7 Day
        Free Trial) - <span>Quarterly</span>{" "}
      </p>
    )}
  </Radio>
);

const YearlyRadio = ({ getPlanAmount, choosedPlan, changePlan }) => (
  <Radio
    onClick={(e) => changePlan(e.target.value)}
    checked={choosedPlan === "yearly"}
    value="yearly"
  >
    <div className="text-wraper">
      <h1>
        <span>Get 2 months free!</span> To Pay Today: Only $1.00
      </h1>
      <div className="plan-name-radio">Yearly</div>
    </div>

    {choosedPlan === "yearly" && (
      <p>
        (${Number(getPlanAmount()) / division["annually"]}/ month after 7 Day
        Free Trial) - <span>Yearly</span>{" "}
      </p>
    )}
  </Radio>
);
