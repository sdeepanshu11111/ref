import React, { useMemo, useState, useEffect } from "react";
import { Select, Checkbox, Button, message, Flex, Tooltip } from "antd";
import { motion } from "framer-motion";
import StoreIcon from "../../../assets/Icons/StoreIcon";
import ArrowIcon from "../../../assets/Icons/Arrow";
import Connected from "../../../assets/Icons/Conneted";
import Disconnected from "../../../assets/Icons/Disconnected";
import { AddStoreModal } from "../../GlobalCompoents/AddStoreModal";
import useWindowDimensions from "../../../CustomHooks/useWindowDimensions";
import "./index.scss";

const arraysEqual = (a, b) => {
  if (a.length !== b.length) return false;
  const sortedA = [...a].sort();
  const sortedB = [...b].sort();
  return sortedA.every((value, index) => value === sortedB[index]);
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

const StoreDropdown = ({ props }) => {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [addStoreData, setAddStoreData] = useState({ open: false });
  const [selectedStores, setSelectedStore] = useState([
    props.auth?.auth?.store?.id,
  ]);
  const { width } = useWindowDimensions();

  const handleChange = (arr) => {
    setSelectedStore([arr]);
    props.setInitialSelectedStores([arr]);
    message.success("Store updated successfully");
  };

  const handleUpdateStores = () => {
    props.setInitialSelectedStores(selectedStores);
    setOpen(false);
    message.success("Stores updated successfully");
  };

  const storesArr = useMemo(
    () =>
      Object.values(props?.auth?.auth?.user?.user_stores).filter(
        (store) => store.store_active === 1
      ),
    [props.auth]
  );

  const storeDropdownList = useMemo(
    () =>
      storesArr.map((store) => ({
        value: store.id,
        key: store.id,
        label: (
          <div className="opt">
            <Flex align="center" gap={6}>
              {/* <Checkbox checked={selectedStores.includes(store.id)} /> */}
              {store.store_name}
            </Flex>
            {store?.store_connected ? (
              <Tooltip placement="right" title="Store Connected">
                <div>
                  <Connected />
                </div>
              </Tooltip>
            ) : (
              <Tooltip placement="right" title="Store Disconnected">
                <div>
                  <Disconnected />
                </div>
              </Tooltip>
            )}
          </div>
        ),
      })),
    [storesArr, props.auth, selectedStores]
  );

  useEffect(() => {
    setIsMobile(width < 768);
  }, [width]);

  const commonSelectProps = {
    mode: "single",
    maxTagCount: "responsive",
    rootClassName: "store-select-root",
    value: selectedStores,
    variant: "borderless",
    showSearch: false,
    allowClear: false,
    placeholder: "Please select",
    popupClassName: "store-select-custom-overlay",
    popupMatchSelectWidth: false,
    onChange: handleChange,
    open: open,
    onDropdownVisibleChange: setOpen,
    maxTagTextLength: 3,
    options: storeDropdownList,
    dropdownRender: (menu) => (
      <div>
        <p className="showing-data-for"> Showing Data For: </p>
        {menu}
        <div
          className="custom-store-dropdown-footer"
          style={{ fontWeight: "500" }}
        >
          <Button
            type="primary"
            onClick={() => setAddStoreData({ open: true })}
          >
            Add New Store
          </Button>
          {/* {!arraysEqual(props?.initialSelectedStores, selectedStores) &&
            !!selectedStores.length && (
              <motion.div
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
              >
                <Button
                  className="update-store-btn"
                  onClick={handleUpdateStores}
                >
                  Update Changes
                </Button>
              </motion.div>
            )} */}
        </div>
      </div>
    ),
  };

  const anyStoreConnected = storesArr.some((s) => s.store_connected === 1);

  if (isMobile) {
    return (
      <Flex
        align="center"
        justify="start"
        gap={6}
        className="store-dropdown-wraper-mobile"
      >
        <Select
          {...commonSelectProps}
          suffixIcon={<StoreIcon />}
          style={{ width: "3rem", height: "4rem" }}
        />
        {addStoreData.open && (
          <AddStoreModal
            open={addStoreData.open}
            onClose={() => setAddStoreData((pre) => ({ ...pre, open: false }))}
          />
        )}
      </Flex>
    );
  }

  return (
    <Flex
      align="center"
      justify="start"
      gap={6}
      className={`store-dropdown-wraper ${!anyStoreConnected ? "hidebg" : ""}`}
    >
      <Flex align="center" justify="center">
        <StoreIcon />
      </Flex>

      {anyStoreConnected ? (
        <Flex vertical className="store-dropdown">
          <p className="drop-down-head">Viewing Data For:</p>
          <Select
            {...commonSelectProps}
            suffixIcon={<ArrowIcon />}
            style={{ maxWidth: "14rem" }}
          />
        </Flex>
      ) : (
        <Flex vertical className="store-dropdown">
          <Flex
            onClick={() => setAddStoreData({ open: true })}
            style={{
              fontSize: "14px",
              fontWeight: "600",
              color: "#505050",
              cursor: "pointer",
            }}
            align="center"
            gap={6}
            className="drop-down-head  hover-und"
          >
            <span className="connect">Connect Your Store</span>{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <path
                id="open_in_new_FILL0_wght300_GRAD0_opsz24"
                d="M141.7-804a1.642,1.642,0,0,1-1.207-.494A1.642,1.642,0,0,1,140-805.7v-12.6a1.643,1.643,0,0,1,.494-1.207A1.642,1.642,0,0,1,141.7-820h5.937v1.412H141.7a.276.276,0,0,0-.2.091.277.277,0,0,0-.091.2v12.6a.277.277,0,0,0,.091.2.277.277,0,0,0,.2.091h12.6a.277.277,0,0,0,.2-.091.277.277,0,0,0,.09-.2v-5.937H156v5.937a1.642,1.642,0,0,1-.494,1.207A1.642,1.642,0,0,1,154.3-804Zm4.152-4.862-.992-.992,8.735-8.735h-3.714V-820H156v6.118h-1.412V-817.6Z"
                transform="translate(-140.001 819.999)"
                fill="#505050"
              />
            </svg>
          </Flex>
        </Flex>
      )}

      {addStoreData.open && (
        <AddStoreModal
          open={addStoreData.open}
          onClose={() => setAddStoreData((pre) => ({ ...pre, open: false }))}
        />
      )}
    </Flex>
  );
};

export default StoreDropdown;
