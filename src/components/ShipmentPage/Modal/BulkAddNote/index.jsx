import { Button, message, Select } from "antd";
import React, { useState } from "react";
import GlobalCustomTextArea from "../../../GlobalCompoents/GlobalCustomTextArea ";
import { bulkupdateApi } from "../../Apis/bulkupdate";
import { CloseIcon, RedCrossIcon } from "../../Icons";
import { HeaderSection } from "../HeaderSection";
import "./index.scss";
export const BulkAddNote = ({ onClose }) => {
  const [note, setNote] = useState("");
  const [idInput, setIdInput] = useState("");
  const [bulkSearch, setBulkSearch] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleBlur = () => {
    const bulkSearchArr = [...idInput.split(/,|\n/)].filter((search) => search);
    setBulkSearch(bulkSearchArr);
  };
  const handlesSearchClose = (index) => {
    if (bulkSearch.length == 1) {
      setIdInput("");
    }
    setBulkSearch((pre) => {
      let arr = [...pre];
      arr.splice(index, 1);
      return arr;
    });
  };
  const handleClearBulk = () => {
    setBulkSearch(() => {
      return [];
    });
    setIdInput("");
  };
  const handleAddNote = async () => {
    try {
      let orderArr = bulkSearch.filter((search) => search.startsWith("VFOD"));
      if (orderArr.length == 0) {
        throw new Error("Please enter valid orders Id");
      }
      setLoading(true);
      let payload = {
        type: "note",
        orders: orderArr,
        note: note,
      };
      const res = await bulkupdateApi(payload);
    
      message.success(res.msg);
      onClose();
    } catch (e) {
      message.error(e.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="addnotebulk-container">
      {" "}
      <HeaderSection onClose={onClose} headingText="Bulk Add Note" />
      <div className="main-container">
        <div>
          <div className="heading">Bulk add note to following Orders:</div>
          {/* <Select
            mode="tags"
            showArrow={false}
            open
            style={{
              width: "100%",
            }}
            popupClassName="test"
            onChange={handleChange}
            tokenSeparators={[",", " "]}
            options={[]}
          /> */}
          {bulkSearch.length ? (
            <>
              {" "}
              <div className="tag-container">
                {bulkSearch.map((search, index) => {
                  return (
                    <div className="tag" key={index}>
                      {" "}
                      {search}{" "}
                      <span onClick={() => handlesSearchClose(index)}>
                        <CloseIcon />
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="clear-btn-container">
                <Button
                  type="text"
                  className="clear-btn"
                  onClick={handleClearBulk}
                >
                  <RedCrossIcon /> Clear All
                </Button>
              </div>
            </>
          ) : (
            <div className="bulk-search-input-container">
              <GlobalCustomTextArea
                placeholder={
                  "Enter multiple order IDs separated by a comma  or a new line"
                }
                label={""}
                value={idInput}
                onChange={(e) => {
                  setIdInput(() => e.target.value);
                }}
                onBlur={(e) => {
                  handleBlur();
                }}
              />
            </div>
          )}
        </div>
        <div className="note-text-area-container">
          {" "}
          <GlobalCustomTextArea
            placeholder={"Enter text here for your note"}
            label={"Add New Note"}
            value={note}
            onChange={(e) => {
              setNote(() => e.target.value);
            }}
          />
        </div>
        <div className="footer-container">
          <Button
            type="primary"
            className="submit-btn"
            onClick={handleAddNote}
            loading={loading}
            disabled={!note || bulkSearch.length === 0}
          >
            Bulk Add Note
          </Button>
        </div>
      </div>
    </div>
  );
};
