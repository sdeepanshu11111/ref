// Helper function for regex validation
const regexValidator = (value, pattern) => pattern.test(value);

// Validation functions for each field
const validateEmail = (email) =>
  regexValidator(
    email,
    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  );
const validateName = (name) => regexValidator(name, /^[A-Za-z.\s]{3,}$/);
const validateField = (value) => regexValidator(value, /^.+$/);
const validateMobileNumber = (value) =>
  regexValidator(value, /^\d{10}$|^\d{12}$/);

export const selectedOrdersWithSelectedLineItems = (orders) => {
  // Filter selected orders based on the selected lineitem
  const selectedOrdersWithSelectedLineItems =
    orders &&
    orders
      .filter(
        (order) =>
          order.selected && order.line_items.some((item) => item.selected)
      )
      .map((order) => ({
        ...order,
        line_items: order.line_items.filter((item) => item.selected),
      }));

  return selectedOrdersWithSelectedLineItems;
};

// Filter orders according product_status, provisional, notServiceable
export const statusFlagOrder = (orders) => {
  return orders.filter((order) => {
    // Condition 1: Not Linked
    const notLinked = !order.line_items.every(
      (item) => item.product_status === "LINKED"
    );

    // Condition 2: Provisional
    const provisional = order.line_items.some(
      (item) => item.provisional === true
    );

    // Condition 3: is_Serviceable not equal to 1
    const notServiceable = order.is_servicable !== 1;

    // Filter out orders that meet any of the conditions
    return notLinked || provisional || notServiceable;
  });
};

// Filter orders that have missing details
export const ordersWithMissingDetailsHandler = (orders) => {
  return orders.filter((order) => {
    const { customer_details, shipping_address } = order;

    return (
      !validateEmail(customer_details?.email?.trim()) ||
      !validateName(shipping_address?.name?.trim()) ||
      !validateName(shipping_address?.first_name?.trim()) ||
      !validateName(shipping_address?.last_name?.trim()) ||
      !validateField(shipping_address?.address1?.trim()) ||
      !validateField(shipping_address?.address2?.trim()) ||
      !validateField(shipping_address?.country?.trim()) ||
      !validateField(shipping_address?.province?.trim()) ||
      !validateField(shipping_address?.city?.trim()) ||
      !validateField(shipping_address?.zip?.trim()) ||
      !validateField(shipping_address?.country_code?.trim()) ||
      !validateField(shipping_address?.province_code?.trim())
    );
  });
};
export const isorderWithMissingDetails = (order) => {
  const { customer_details, shipping_address } = order;

  return (
    !validateEmail(customer_details?.email?.trim()) ||
    !validateName(shipping_address?.name?.trim()) ||
    !validateName(shipping_address?.first_name?.trim()) ||
    !validateName(shipping_address?.last_name?.trim()) ||
    !validateField(shipping_address?.address1?.trim()) ||
    !validateField(shipping_address?.address2?.trim()) ||
    !validateField(shipping_address?.country?.trim()) ||
    !validateField(shipping_address?.province?.trim()) ||
    !validateField(shipping_address?.city?.trim()) ||
    !validateField(shipping_address?.zip?.trim()) ||
    !validateField(shipping_address?.country_code?.trim()) ||
    !validateField(shipping_address?.province_code?.trim())
  );
};

export const filteredOutOrders = (orders) => {
  const selectedOrdersWithSelectedLineItems = orders
    .filter(
      (order) =>
        order.selected && order.line_items.some((item) => item.selected)
    )
    .map((order) => ({
      ...order,
      line_items: order.line_items.filter((item) => item.selected),
    }));

  const filteredOrders = statusFlagOrder(selectedOrdersWithSelectedLineItems);
  const ordersWithMissingDetails = ordersWithMissingDetailsHandler(
    selectedOrdersWithSelectedLineItems
  );

  const filteredOutOrders = selectedOrdersWithSelectedLineItems.filter(
    (order) =>
      !filteredOrders.includes(order) &&
      !ordersWithMissingDetails.includes(order)
  );

  return filteredOutOrders;
};
export const kFormatter = (num) => {
  return Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "K"
    : Math.sign(num) * Math.abs(num);
};