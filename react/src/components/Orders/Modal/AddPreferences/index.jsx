import { Button } from "antd";
import React, { useContext, useState } from "react";
import { FilterLine } from "../../../../assets/Icons/FilterLine";
import GlobalCustomInput from "../../../GlobalCompoents/GlobalCustomInput";
import { saveFilters } from "../../Apis/saveFilters";
import { savePreferencesApi } from "../../Apis/savePreferances";
import { defaultPreferences } from "../../constants";

import { ResetIcon, SaveChangeIcon } from "../../Icons";
import OrdersContext from "../../OrdersContext";
import { HeaderSection } from "../HeaderSection";
import DraggableComp from "./DraggableComp";
import "./index.scss";
export const AddPreferences = ({ onClose }) => {
  const {
    modal,
    setPreference,
    currentPage,
    currentTab,
    fetchPreferences,
    selectedSavedPreference,
    setSelectedSavedPreference,
  } = useContext(OrdersContext);
  const [preferenceModal, setPreferenceModal] = useState(
    JSON.parse(JSON.stringify(modal.data.preferences))
  );
  const [preferenceName, setPreferenceName] = useState(modal.data.name);
  const [loading, setLoading] = useState(false);
  const handleApply = () => {
    if (selectedSavedPreference) {
      let arr1 = preferenceModal;
      let arr2 = selectedSavedPreference.preferences;
      const jsonString1 = JSON.stringify(arr1);
      const jsonString2 = JSON.stringify(arr2);

      if (jsonString1 !== jsonString2) {
        setSelectedSavedPreference(null);
      }
    }

    setPreference(() => {
      return [...preferenceModal];
    });
  };
  const handleSavePreference = async () => {
    try {
      const data = {
        page: currentPage,
        page_type: currentTab,
        preferences: preferenceModal,
        name: preferenceName,
        id: modal.data.id,
        edit: modal.data.edit,
      };
      setLoading(true);
      const res = await savePreferencesApi(data);
      setPreference((pre) => {
        return [...preferenceModal];
      });
      fetchPreferences();
      setSelectedSavedPreference(null);
      onClose();
    } catch (e) {
      message.error(e);
    } finally {
      setLoading(false);
    }
  };
  const handlereset = () => {
    setPreferenceModal(() => {
      return [...defaultPreferences];
    });
  };
  return (
    <div className="add-preferences-modal-container">
      {" "}
      <HeaderSection
        onClose={onClose}
        headingText="All Preferences"
        headerIcon={<FilterLine />}
      />
      <div className="mainContainer">
        <div className="heading">All Columns:</div>
        <DraggableComp
          data={preferenceModal}
          setPreferenceModal={setPreferenceModal}
        />
        <div className="reset-container">
          {" "}
          <Button type="text" onClick={handlereset}>
            {" "}
            <span className="icon-container">
              <ResetIcon />
            </span>{" "}
            Reset Preferences
          </Button>{" "}
        </div>
      </div>
      <div className="footer-container">
        <Button
          type="primary"
          className="submit-btn"
          onClick={() => {
            handleApply();

            onClose();
          }}
        >
          <FilterLine /> Apply Preferences
        </Button>
        <div className="middle-section">
          <div className="info">
            Or, Save Preferences For Quick Access In Future
          </div>
          <div className="input-container">
            <GlobalCustomInput
              addonBefore={"Name *"}
              placeholder={"Please enter a name for your preferences"}
              value={preferenceName}
              onChange={(e) => setPreferenceName(e.target.value)}
            />
          </div>
        </div>
        <Button
          type="primary"
          className="save-btn"
          disabled={!preferenceName}
          onClick={handleSavePreference}
          loading={loading}
        >
          {" "}
          <SaveChangeIcon /> Save Preferences & Apply
        </Button>
      </div>
    </div>
  );
};
