import React, { useEffect, useRef, useState } from "react";
import OrdersContext from "./OrdersContext";
import OrdersNav from "./OrdersNav";
import OrderActionModal from "./OrderActionModal";
import {
  defaultTab,
  columns,
  defaultFilters,
  countOBJ,
  defaultPreferences,
  colHeight,
  filterOptions,
} from "./constants";
import { HeaderBar } from "./HeaderBar";
import { OrdersPageModal } from "./Modal";
import { OrdersSummaryPage } from "./OrdersSummaryPage";
import TableFilterBar from "./TableFilterBar";
import GlobalTable from "../GlobalCompoents/GlobalTable";
import qs from "qs";
import getOrders from "./Apis/getOrders.js";

import "./index.scss";
import getDefaultFilterData from "./Apis/getDefaultFilterData";
import { getSaveFilters } from "./Apis/getSaveFilters";
import { message } from "antd";
import { getSavePreferences } from "./Apis/getSavePreferences";
import { isorderWithMissingDetails } from "./Functions/ordersHelperFunctions.js";
import { ProductDetailTitle } from "./TableColumns/ProductDetailTitle";
import { useLocation, useNavigate } from "react-router-dom";
import { FilterWiseTagRowContainer } from "./FilterWiseTagRowContainer";
import dayjs from "dayjs";

const Orders = ({ auth, selectedStoreIds, title }) => {
  const [loading, setLoading] = useState(false);
  const isMountingRef = useRef(false);
  const navigate = useNavigate();
  const [loadingFilterOpton, setLoadingFilterOpton] = useState(false);
  const [loadingSavedfilter, setLoadingSavedfilter] = useState(false);
  const [loadingSavedPreferences, setLoadingSavedPreferences] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState("open");
  const [currentTab, setCurrentTab] = useState(defaultTab[currentPage]);
  const [dateRange, setDateRange] = useState({
    start_date: dayjs(dayjs().subtract(30, "day")).format("YYYY-MM-DD"),
    end_date: dayjs(dayjs(), "YYYY-MM-DD").format("YYYY-MM-DD"),
  });
  const [tabCounter, setTabCounter] = useState({});
  const location = useLocation();
  const [pagination, setPagination] = useState({
    page_no: 1,
    limit: 10,
    count: 0,
  });
  const [sort, setSort] = useState("date-desc");

  const [modal, setModal] = useState({
    open: false,
    currentModal: "",
    data: {},
  });
  const [orderActionModal, setOrderActionModal] = useState({
    open: false,
    currentModal: "place",
    data: {},
  });

  const [tabCount, setTabCount] = useState(countOBJ);
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState([]);

  //filters state
  const [filters, setFilters] = useState(defaultFilters);
  const [filterActive, setFilterActive] = useState(false);
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

  const [miscellaneousData, setMiscellaneousData] = useState({
    tagOptions: [],
    showMavFilters: false,
    useOrderBulkAction: false,
    vfProductNameOptions: [],
    shopifyProductNameOptions: [],
  });

  const fetchData = async () => {
    const apiPayload = {
      page: currentPage,
      page_type: currentTab,
      filters: { ...filters, search, ...dateRange },
      storeids: selectedStoreIds,
      page_no: pagination?.page_no,
      limit: pagination?.limit,
      sort: sort,
    };

    setLoading(true);
    setError(null);

    try {
      const { data, count, page_counts } = await getOrders(apiPayload);
      setOrders(data);
      setPagination((prevPagination) => ({ ...prevPagination, count }));
      if (currentPage !== "ordersSummary") {
        setTabCount((pre) => {
          if (currentPage == "in_processing") {
            return {
              ...pre,
              [currentPage]: { "": page_counts.in_processing },
            };
          }
          return {
            ...pre,
            [currentPage]: { ...page_counts },
          };
        });
      }

      setTabCounter(page_counts);
      setLoading(false);
    } catch (error) {
      if (error?.message == "cancel request") {
      } else {
        setLoading(false);
        setError(error?.message || "An error occurred while fetching data");
      }
    } finally {
      // setLoading(false);
      navigate("/orders");
    }
  };

  const fetchSavedFilter = async () => {
    {
      setLoadingSavedfilter(true);
      try {
        const res = await getSaveFilters({
          page: currentPage,
          page_type: currentTab,
          module: "orders",
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
        setError(e.message || "An error occurred while fetching data");
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
          page: currentPage,
          page_type: currentTab,
          module: "orders",
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
        setError(error?.message || "An error occurred while fetching data");
      } finally {
        setLoadingSavedPreferences(false);
      }
    }
  };
  const fetchDefaultFiltersOptions = async () => {
    try {
      setLoadingFilterOpton(true);
      const res = await getDefaultFilterData({
        stores: selectedStoreIds,
      });
      const {
        store_vfcatalog_products = [],
        store_shopify_products = [],
        tags = [],
        show_mav_filters = false,
        order_bulk_actions = false,
      } = res;
      setMiscellaneousData((pre) => {
        return {
          ...pre,
          vfProductNameOptions: store_vfcatalog_products,
          shopifyProductNameOptions: store_shopify_products,
          tagOptions: tags.map((t) => ({ value: t, label: t })),
          showMavFilters: show_mav_filters,
          useOrderBulkAction: order_bulk_actions,
        };
      });
    } catch (e) {
      setError(e.message || "An error occurred while fetching data");
    } finally {
      setLoadingFilterOpton(false);
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
      setDateRange({
        start_date: "",
        end_date: "",
      });
      fetchData();
    } else if (params.currentPage) {
      setCurrentPage(params.currentPage);
      setCurrentTab(defaultTab[params.currentPage]);
      fetchData();
    } else {
      fetchData();
    }
  };
  const checkFilterActive = () => {
    let isfilterActive = false;

    let arr = filterOptions(
      miscellaneousData.vfProductNameOptions,
      miscellaneousData.shopifyProductNameOptions,
      miscellaneousData.tagOptions
    );

    arr.map((obj) => {
      console.log(obj.multiSelect);
      if (obj.multiSelect && filters[obj.key].length) {
        isfilterActive = true;
      }
      if (!obj.multiSelect && filters[obj.key]) {
        isfilterActive = true;
      }
    });

    if (isfilterActive) {
      setFilterActive(true);
    } else {
      setFilterActive(false);
    }
  };
  useEffect(() => {
    console.log("in");
    handleRediectonCases();
  }, [
    filters,
    auth,
    selectedStoreIds,
    dateRange.start_date,
    dateRange.end_date,
    pagination.limit,
    pagination.page_no,
    sort,
    location.search,
  ]);

  useEffect(() => {
    fetchSavedFilter();
    fetchPreferences();
    setFilters({
      ...defaultFilters,
    });
    setSort("date-desc");
    setPreference(defaultPreferences);
  }, [currentTab, currentPage]);

  useEffect(() => {
    fetchDefaultFiltersOptions();
  }, []);

  let outsideFilterArray = filterOptions(
    miscellaneousData.vfProductNameOptions,
    miscellaneousData.shopifyProductNameOptions,
    miscellaneousData.tagOptions
  );

  useEffect(() => {
    checkFilterActive();
  }, [filters]);
  return (
    <OrdersContext.Provider
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
        orderActionModal,
        setOrderActionModal,
        miscellaneousData,
        setMiscellaneousData,
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
        selectedStoreIds,
        sort,
        setSort,
        filterActive,
        setFilterActive,
      }}
    >
      <div className="order-page" id="fade-in">
        <OrdersNav />
        <HeaderBar />

        {currentPage !== "ordersSummary" ? (
          <>
            {filterActive ? (
              <div className="active-filterbar-container flex gap-1 items-center pb-[12px] overflow-auto ">
                <div className=" "> Active Filters:</div>
                {outsideFilterArray.map((filter) => {
                  return (
                    <FilterWiseTagRowContainer
                      filters={filters}
                      setFilters={setFilters}
                      filter={filter}
                    />
                  );
                })}
              </div>
            ) : null}

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
                !!isorderWithMissingDetails(row)
                  ? "error-row"
                  : row.selected
                  ? "selected-row"
                  : "not-selected"
              }
              setPagination={setPagination}
              pagination={pagination}
              showPagination={true}
              scrollY={"calc(75vh)"}
              title={() => <TableFilterBar />}
            />
          </>
        ) : (
          <OrdersSummaryPage selectedStoreIds={selectedStoreIds} auth={auth} />
        )}
      </div>
      {modal.open && <OrdersPageModal />}
      {orderActionModal.open && <OrderActionModal />}
    </OrdersContext.Provider>
  );
};

export default Orders;
