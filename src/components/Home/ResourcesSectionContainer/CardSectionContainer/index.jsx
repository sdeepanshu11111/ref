import { Button } from "antd";
import React from "react";
import { resourceCardCantainer } from "./constants";
import CustomCard from "./CustomCard";
import "./index.scss";
import { ResouceCard } from "./ResouceCard";
export const CardSectionContainer = () => {
  return (
    <>
    <div className="resources-section-cantainer2">
      <div className="heading-section">Playbooks for you</div>
      {/* <div className="resources-card-section-cantainer">
        {resourceCardCantainer.map((item) => {
          const { heading, text, buttonText, link, theme = "beige" } = item;
          return (
            <ResouceCard
              heading={heading}
              text={text}
              buttonText={buttonText}
              link={link}
              theme={theme}
            />
          );
        })}
      </div> */}
        <div className="snapshot-card-wraper">
              <CustomCard
                icon={
                  <img src="https://vfulfill.io/wp-content/uploads/2023/12/India-COD-eCommerce-Profitability-Master-Calculator-by-vFulfill-%F0%9F%A6%84-_-Make-a-Copy-To-Use-it-Google-Sheets-6-December-2023.gif"></img>
                }
                type="winning"
                heading="Profitability Master Calculator for 
                India COD eCommerce"
                title={
                  <p>
                    Get running profit margins on your Indian COD eCommerce
                    business with vFulfill 🎖️
                  </p>
                }
                button={
                  <Button
                    onClick={() =>
                      window.open(
                        "https://docs.google.com/spreadsheets/d/1xgKCk3m76gYg1ugXCJ8dNd7UUOqkk3RoKdzKgKblK1w/edit#gid=194721743"
                      )
                    }
                  >
                    Access Calculator
                  </Button>
                }
              />
               <CustomCard
                icon={
                  <img src="https://vfulfill.io/wp-content/uploads/2023/12/Winning-Product-Validation-Calculator-for-India-COD-eCommerce-by-vFulfill-%F0%9F%A6%84-_-Make-a-Copy-To-Use-it-Google-Sheets-6-December-2023.gif"></img>
                }
                type="winning"
                heading="Winning Product Validation Calculator"
                title={
                  <p>
                  This tool will enable you to validate your product ideas for India COD eCommerce.
                  </p>
                }
                button={
                  <Button
                    onClick={() =>
                      window.open(
                        "https://docs.google.com/spreadsheets/d/1lXmMVPaQ7lq9FmzhOBDOe3SH9L55VlqmAD62SHiIsrA/edit?usp=drive_web&ouid=109256790938319195115"
                      )
                    }
                  >
                    Access Calculator
                  </Button>
                }
              />

              <CustomCard
                icon={
                  <img src="https://vfulfill.io/wp-content/uploads/2023/12/Cost-Price-Selling-Price-Calculator-for-India-COD-eCommerce-by-vFulfill-%F0%9F%A6%84-_-Make-a-Copy-To-Use-it-Google-Sheets-6-December-2023.gif"></img>
                }
                type="winning"
                heading="Cost Price & Selling Price Calculator"
                title={
                  <p>
                    Get Est. India Landing Price for any product from it’s
                    Alibaba data, so you can guess COGS when considering to sell
                    a product.
                  </p>
                }
                button={
                  <Button
                    onClick={() =>
                      window.open(
                        "https://docs.google.com/spreadsheets/d/1iccC9_9DlSksasAazdv96M2AJTvEVVHOEenqPWUfP6s/edit?usp=drive_web&ouid=109256790938319195115"
                      )
                    }
                  >
                    Access Calculator
                  </Button>
                }
              />

              <CustomCard
                icon={
                  <img src="https://vfulfill.io/wp-content/uploads/2023/12/Break-even-ROAS-CPA-Calculator-for-India-COD-eCommerce-by-vFulfill-%F0%9F%A6%84-_-Make-a-Copy-To-Use-it-Google-Sheets-6-December-2023.gif"></img>
                }
                type="winning"
                heading="Break-even ROAS & CPA Calculator for India COD eCommerce"
                title={
                  <p>
                    Know your breakeven ROAS & CPA, when you are at testing
                    stage.
                  </p>
                }
                button={
                  <Button
                    onClick={() =>
                      window.open(
                        "https://docs.google.com/spreadsheets/d/1voeRzsl1cozmgi2kQqMankGJ7kvvE6KDwY0B5-UWOaE/edit?usp=drive_web&ouid=109256790938319195115"
                      )
                    }
                  >
                    {" "}
                    Access Calculator
                  </Button>
                }
              />
            </div>
      </div>
    </>
  );
};
