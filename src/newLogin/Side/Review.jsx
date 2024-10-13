import React from "react";
import StarsGold from "../../assets/Icons/StarsGold";
import RohitImg from "../../assets/rohit.png";

const Review = () => {
  return (
    <div className="">
      <div className="mb-4 flex items-center gap-4">
        <div className="text-white flex items-center justify-start gap-2">
          <img
            src={RohitImg}
            className="h-[40px] w-[40px] rounded-full"
            alt="Profile"
          />
          <div>
            <div className="font-semibold text-base text-white">
              Rohit Kapoor
              <span className="font-medium opacity-80 ml-2">
                | Founder, TrendyMart
              </span>
              <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png"
                alt="India Flag"
                className="inline-block ml-2 w-[20px] h-[14px] rounded-sm"
              />
            </div>
            <span className="mt-1 flex">
              <StarsGold />
            </span>
          </div>
        </div>
      </div>
      <p className="text-base font-medium text-[#DAD9F4]">
        “vFulfill has transformed my business with its
        <span className="font-bold text-white"> 100% DIY platform.</span> The
        <span className="font-bold text-white"> transparency and control </span>
        it offers over my e-commerce operations is unmatched. Their
        <span className="font-bold text-white"> winning products catalog </span>
        always brings innovative items that keep my store competitive. Highly
        recommended!”
      </p>
    </div>
  );
};

export default Review;
