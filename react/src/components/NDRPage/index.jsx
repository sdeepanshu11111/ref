import React, { useEffect, useRef, useState } from "react";
// import NDRContext from "./NDRContext";
import OrdersNav from "./OrdersNav";

import {
  defaultTab,
  columns,
  defaultFilters,
  countOBJ,
  defaultPreferences,
  colHeight,
} from "./constants";
import { HeaderBar } from "./HeaderBar";
import { OrdersPageModal } from "./Modal";
import TableFilterBar from "./TableFilterBar";
import GlobalTable from "../GlobalCompoents/GlobalTable";
import qs from "qs";
import getOrders from "./Apis/getOrders.js";
import "./index.scss";
import { getSaveFilters } from "./Apis/getSaveFilters";
import { message } from "antd";
import { getSavePreferences } from "./Apis/getSavePreferences";
import { ProductDetailTitle } from "./TableColumns/ProductDetailTitle";
import { useNavigate } from "react-router-dom";
import NDRContext from "./NDRContext";

const NDRPage = ({ auth, selectedStoreIds, title }) => {
  const [loading, setLoading] = useState(false);
  const isMountingRef = useRef(false);
  const navigate = useNavigate();
  const [loadingFilterOpton, setLoadingFilterOpton] = useState(false);
  const [loadingSavedfilter, setLoadingSavedfilter] = useState(false);
  const [loadingSavedPreferences, setLoadingSavedPreferences] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState("open");
  const [currentTab, setCurrentTab] = useState(defaultTab[currentPage]);
  const [dateRange, setDateRange] = useState({ start_date: "", end_date: "" });
  const [tabCounter, setTabCounter] = useState({});

  const [pagination, setPagination] = useState({
    page_no: 1,
    limit: 10,
    count: 0,
  });

  const [modal, setModal] = useState({
    open: false,
    currentModal: "",
    data: {},
  });

  const [tabCount, setTabCount] = useState(countOBJ);
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState([]);

  //filters state
  const [filters, setFilters] = useState(defaultFilters);
  const [selectedSavedFilter, setSelectedSavedFilter] = useState(null);
  const [savedFilters, setSavedFilters] = useState([
    {
      key: "123",
      id: "123",
      filters: defaultFilters,
      default: 1,
      selected: 0,
      visible: 1,
      name: "Default",
    },
  ]);
  // const [orderTagsOptions, setOrderTagsOptions] = useState([]);
  // defaultPreferences states
  const [preference, setPreference] = useState(defaultPreferences);
  const [selectedSavedPreference, setSelectedSavedPreference] = useState(null);
  const [savedPreferences, setSavedPreferences] = useState([
    {
      id: "123",
      key: "123",
      preferences: defaultPreferences,
      visible: 1,
      default: 1,
      selected: 0,
      name: "Default",
    },
  ]);

  const fetchData = async () => {
    const apiPayload = {
      page: "ndr",
      page_type: currentTab,
      filters: { ...filters, search, ...dateRange },
      storeids: selectedStoreIds,
      page_no: pagination?.page_no,
      limit: pagination?.limit,
    };

    setLoading(true);
    setError(null);

    try {
      const {
        shipments,
        total: count,
        ndr_counts,
      } = await getOrders(apiPayload);
      setOrders(shipments);
      setPagination((prevPagination) => ({ ...prevPagination, count }));

      setTabCount((pre) => {
        return {
          ...pre,
          [currentPage]: { ...ndr_counts },
        };
      });

      setTabCounter(ndr_counts);
    } catch (error) {
      setError(error.message || "An error occurred while fetching data");
    } finally {
      setLoading(false);
    }
  };

  const fetchSavedFilter = async () => {
    {
      setLoadingSavedfilter(true);
      try {
        const res = await getSaveFilters({
          page: "ndr",
          page_type: currentTab,
          module: "ndr",
        });
        const { data = [] } = res;
        setSavedFilters((pre) => {
          return [
            {
              key: "123",
              id: "123",
              filters: defaultFilters,
              name: "Default",
              default: 1,
              selected: 0,
              visible: 1,
            },
            ...data.map((f) => {
              f.id = f._id.$oid;
              f.key = f._id.$oid;
              return f;
            }),
          ];
        });
      } catch (e) {
        setError(error.message || "An error occurred while fetching data");
      } finally {
        setLoadingSavedfilter(false);
      }
    }
  };
  const fetchPreferences = async () => {
    {
      setLoadingSavedPreferences(true);
      try {
        const res = await getSavePreferences({
          page: "ndr",
          page_type: currentTab,
          module: "ndr",
        });
        const { data = [] } = res;
        setSavedPreferences((pre) => {
          return [
            {
              key: "123",
              id: "123",
              preferences: defaultPreferences,
              name: "Default",
              default: 1,
              selected: 0,
              visible: 1,
            },
            ...data.map((f) => {
              f.id = f._id.$oid;
              f.key = f._id.$oid;
              return f;
            }),
          ];
        });
      } catch (e) {
        setError(error.message || "An error occurred while fetching data");
      } finally {
        setLoadingSavedPreferences(false);
      }
    }
  };

  const getColmuns = () => {
    return preference
      .filter((col) => col.visible)
      .map((col) => {
        let currentData = columns.find(
          (currentCol) => currentCol.headingPreference === col.headingPreference
        );

        let CurrentComp = currentData.component;

        return {
          ...currentData,
          render: (e, obj) => {
            return (
              <CurrentComp
                obj={obj}
                currentKey={e}
                colHeight={colHeight}
                subData={col.subtab ? col.subTabArray : []}
              />
            );
          },
          title:
            col.headingPreference === "Product Details" ? (
              <ProductDetailTitle subData={col.subtab ? col.subTabArray : []} />
            ) : (
              currentData.title
            ),
        };
      });
  };
  const handleRediectonCases = () => {
    const params = qs.parse(window.location.search.replace(/\?/g, ""));

    if (params.orderId) {
      setSearch(params.orderId);
      setCurrentPage("all");
      setCurrentTab("all");
      navigate("/orders");
    } else {
      fetchData();
    }
  };
  useEffect(() => {
    if (!isMountingRef.current) {
      handleRediectonCases();
      isMountingRef.current = true;
    } else {
      fetchData();
    }
  }, [
    filters,
    auth,
    selectedStoreIds,
    currentTab,
    dateRange,
    pagination.limit,
    pagination.page_no,
  ]);

  useEffect(() => {
    fetchSavedFilter();
    fetchPreferences();
    setFilters(defaultFilters);
  }, [currentTab]);

  return (
    <NDRContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        currentTab,
        setCurrentTab,
        modal,
        setModal,
        orders,
        setOrders,
        filters,
        setFilters,
        auth,
        fetchData,
        search,
        setSearch,
        savedFilters,
        setSavedFilters,
        fetchSavedFilter,
        selectedSavedFilter,
        setSelectedSavedFilter,
        dateRange,
        setDateRange,
        tabCounter,
        pagination,
        tabCount,
        setTabCount,
        loading,
        preference,
        setPreference,
        selectedSavedPreference,
        setSelectedSavedPreference,
        savedPreferences,
        setSavedPreferences,
        fetchPreferences,
      }}
    >
      <div className="order-page" id="fade-in">
        <OrdersNav selectedStoreIds={selectedStoreIds} />
        <HeaderBar />
        <GlobalTable
          className="orders-table"
          dataSource={orders}
          loading={
            loading ||
            loadingFilterOpton ||
            loadingSavedfilter ||
            loadingSavedPreferences
          }
          columns={getColmuns()}
          scrollX={1300}
          rowClassName={(row) =>
            row.selected ? "selected-row" : "not-selected"
          }
          setPagination={setPagination}
          pagination={pagination}
          showPagination={true}
          scrollY={"calc(75vh)"}
          title={() => <TableFilterBar />}
        />
      </div>
      {modal.open && <OrdersPageModal />}
    </NDRContext.Provider>
  );
};

export default NDRPage;
