import React from "react";
import { Form, Radio, Button, Typography, Modal, message } from "antd";
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
  amount,
  plansData,
  plan_name,
}) => {
  const getPlanAmount = (planType) => {
    const plan = plansData[choosedPlan]?.find((plan) =>
      plan.plan_displayname
        .split(" ")[0]
        .toLowerCase()
        .includes(plan_name.toLowerCase())
    );

    return plan ? plan.amount : null;
  };

  if (initialPlan === "monthly") {
    return (
      <div className="change-plan-option-wraper">
        <MonthlyRadio
          getPlanAmount={getPlanAmount}
          amount={amount}
          changePlan={changePlan}
          choosedPlan={choosedPlan}
        />
      </div>
    );
  }

  if (initialPlan === "quarterly") {
    return (
      <div className="change-plan-option-wraper">
        <QuarterlyRadio
          getPlanAmount={getPlanAmount}
          amount={amount}
          changePlan={changePlan}
          choosedPlan={choosedPlan}
        />
      </div>
    );
  }

  return (
    <div className="change-plan-option-wraper">
      <YearlyRadio
        amount={amount}
        getPlanAmount={getPlanAmount}
        changePlan={changePlan}
        choosedPlan={choosedPlan}
      />
    </div>
  );
};
export default PlanChooseOption;

const MonthlyRadio = ({ choosedPlan, changePlan, amount, getPlanAmount }) => (
  <Radio
    onClick={(e) => changePlan(e.target.value)}
    checked={choosedPlan === "monthly"}
    value="monthly"
  >
    <div className="text-wraper">
      <h1>To Pay Today: Only ${formatNumberNew(amount, 0)}</h1>
      <div className="plan-name-radio">Monthly</div>
    </div>

    {choosedPlan === "monthly" && (
      <p>(${Number(getPlanAmount()) / division["monthly"]} / month )</p>
    )}
  </Radio>
);

const QuarterlyRadio = ({ choosedPlan, changePlan, amount, getPlanAmount }) => (
  <Radio
    onClick={(e) => changePlan(e.target.value)}
    checked={choosedPlan === "quarterly"}
    value="quarterly"
  >
    <div className="text-wraper">
      <h1>To Pay Today: Only $ {formatNumberNew(amount, 0)}</h1>
      <div className="plan-name-radio">Quarterly</div>
    </div>
    {choosedPlan === "quarterly" && (
      <p>(${Number(getPlanAmount()) / division["quarterly"]}/ month )</p>
    )}
  </Radio>
);

const YearlyRadio = ({ choosedPlan, changePlan, amount, getPlanAmount }) => (
  <Radio
    onClick={(e) => changePlan(e.target.value)}
    checked={choosedPlan === "yearly"}
    value="yearly"
  >
    <div className="text-wraper">
      <h1>To Pay Today: Only ${formatNumberNew(amount, 0)}</h1>
      <div className="plan-name-radio">Yearly</div>
    </div>
    {choosedPlan === "yearly" && (
      <p>(${Number(getPlanAmount()) / division["annually"]}/ month )</p>
    )}
  </Radio>
);
