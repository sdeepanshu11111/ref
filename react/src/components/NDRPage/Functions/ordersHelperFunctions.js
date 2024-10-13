// Helper function for regex validation
const regexValidator = (value, pattern) => pattern.test(value);

// Validation functions for each field
const validateEmail = (email) =>
  regexValidator(
    email,
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );
const validateName = (name) => regexValidator(name, /^[A-Za-z.\s]{3,}$/);
const validateField = (value) => regexValidator(value, /^.+$/);
const validateAddress = (value) => value.length && value.length < 200;
const validateMobileNumber = (value) =>
  regexValidator(value, /^\d{10}$|^\d{12}$/);

export const selectedShipmentsWithSelectedLineItems = (orders) => {
  // Filter selected orders based on the selected lineitem
  const selectedOrdersWithSelectedLineItems =
    orders &&
    orders
      .filter(
        (order) =>
          order.selected && order?.items.some((item) => item.selected)
      )
      .map((order) => ({
        ...order,
        items: order?.items.filter((item) => item.selected),
      }));

  return selectedOrdersWithSelectedLineItems;
};

// Filter orders according product_status, provisional, notServiceable
export const statusFlagOrder = (orders) => {
  return orders.filter((order) => {
    const notServiceable = order.is_servicable !== 1;
    return notServiceable;
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
      !validateAddress(shipping_address?.address1?.trim()) ||
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
    !validateAddress(shipping_address?.address1?.trim()) ||
    !validateField(shipping_address?.country?.trim()) ||
    !validateField(shipping_address?.province?.trim()) ||
    !validateField(shipping_address?.city?.trim()) ||
    !validateField(shipping_address?.zip?.trim()) ||
    !validateField(shipping_address?.country_code?.trim()) ||
    !validateField(shipping_address?.province_code?.trim())
  );
};


