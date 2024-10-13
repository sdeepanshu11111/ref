export const get_price_basic = (price, price_settings) => {
  return price_settings.product_cost.type === "multiplier"
    ? price * parseFloat(price_settings.product_cost.data)
    : price + parseFloat(price_settings.product_cost.data);
};

export const get_compared_at_price_basic = (price, price_settings) => {
  return price_settings.compared_at_price.type === "multiplier"
    ? price * parseFloat(price_settings.compared_at_price.data)
    : price + parseFloat(price_settings.compared_at_price.data);
};

export const get_our_price = (price, rate = 0) => {
  if (rate === 0) {
    rate = 7;
  }
  rate = parseFloat(`${rate}`.replace("%", ""));
  return (1 - rate / 200) * parseFloat(price);
};

export const get_pricing_basic = function (
  minPrice,
  maxPrice,
  variants,
  price_settings
) {
  let ret = {
    aliPrice: {
      min: 0,
      max: 0,
      avg: 0,
    },
    price: {
      min: 0,
      max: 0,
      avg: 0,
    },
    compared_at_price: {
      min: 0,
      max: 0,
      avg: 0,
    },
    our_price: {
      min: 0,
      max: 0,
      avg: 0,
    },
    shop_price: {
      min: 0,
      max: 0,
      avg: 0,
    },
    profit: 0,
  };

  let minAP = Infinity;
  let maxAP = 0;
  let sumAP = 0;
  variants.forEach((v) => {
    if (parseFloat(v.price) > maxAP) {
      maxAP = parseFloat(v.price);
    }
    if (parseFloat(v.price) < minAP) {
      minAP = parseFloat(v.price);
    }
    sumAP += parseFloat(v.price);
  });
  ret.aliPrice.min = minAP;
  ret.aliPrice.max = maxAP;
  ret.aliPrice.avg = sumAP / variants.length;

  let minShP = Infinity;
  let maxShP = 0;
  let sumShP = 0;
  variants.forEach((v) => {
    if (v.shop_price !== undefined) {
      if (parseFloat(v.shop_price) > maxShP) {
        maxShP = parseFloat(v.shop_price);
      }
      if (parseFloat(v.shop_price) < minShP) {
        minShP = parseFloat(v.shop_price);
      }
      sumShP += parseFloat(v.shop_price);
    }
  });
  ret.shop_price.min = minShP;
  ret.shop_price.max = maxShP;
  ret.shop_price.avg = sumShP / variants.length;

  let minSP = Infinity;
  let maxSP = 0;
  let sumSP = 0;
  variants.forEach((v) => {
    if (parseFloat(v.shop_price) > maxSP) {
      maxSP = parseFloat(v.shop_price);
    }
    if (parseFloat(v.shop_price) < minSP) {
      minSP = parseFloat(v.shop_price);
    }
    sumSP += parseFloat(v.shop_price);
  });

  ret.price.min = toUSD(minSP, price_settings.currencies);
  ret.price.max = toUSD(maxSP, price_settings.currencies);
  ret.price.avg = toUSD(sumSP / variants.length, price_settings.currencies);

  ret.compared_at_price.min = get_compared_at_price_basic(
    minPrice,
    price_settings
  );
  ret.compared_at_price.max = get_compared_at_price_basic(
    maxPrice,
    price_settings
  );
  ret.compared_at_price.avg =
    (ret.compared_at_price.min + ret.compared_at_price.max) / 2;

  let minOP = Infinity;
  let maxOP = 0;
  let sumOP = 0;
  variants.forEach((v) => {
    let op;
    if (v.vfmrp) {
      op = parseFloat(v.vfmrp);
    } else {
      op = get_our_price(parseFloat(v.price), price_settings.commission);
    }

    if (op > maxOP) {
      maxOP = op;
    }
    if (op < minOP) {
      minOP = op;
    }
    sumOP += op;
  });

  ret.our_price.min = minOP;
  ret.our_price.max = maxOP;
  ret.our_price.avg = sumOP / variants.length;

  ret.profit = ret.price.avg - ret.our_price.avg;
  return ret;
};

export const get_range_for_price = (price, ranges) => {
  const defaultRange = ranges[ranges.length - 1];
  ranges = ranges.slice(0, ranges.length - 1);
  const rangeForPrice = ranges.filter((range) => {
    return price >= range.start && price <= range.end;
  });
  return rangeForPrice.length ? rangeForPrice[0] : defaultRange;
};

export const get_price_advanced = (price, range) => {
  return range.product_cost_type === "multiplier"
    ? price * parseFloat(range.product_cost_data)
    : price + parseFloat(range.product_cost_data);
};

export const get_compared_at_price_advanced = (price, range) => {
  return range.compared_at_price_type === "multiplier"
    ? price * parseFloat(range.compared_at_price_data)
    : price + parseFloat(range.compared_at_price_data);
};

export const get_pricing_advanced = function (
  minPrice,
  maxPrice,
  variants,
  price_settings
) {
  let ret = {
    aliPrice: {
      min: 0,
      max: 0,
      avg: 0,
    },
    price: {
      min: 0,
      max: 0,
      avg: 0,
    },
    compared_at_price: {
      min: 0,
      max: 0,
      avg: 0,
    },
    our_price: {
      min: 0,
      max: 0,
      avg: 0,
    },
    profit: 0,
  };

  const minPriceRange = get_range_for_price(
    minPrice,
    price_settings.advanced_pricing
  );
  const maxPriceRange = get_range_for_price(
    maxPrice,
    price_settings.advanced_pricing
  );

  let minAP = Infinity;
  let maxAP = 0;
  let sumAP = 0;
  variants.forEach((v) => {
    if (parseFloat(v.price) > maxAP) {
      maxAP = parseFloat(v.price);
    }
    if (parseFloat(v.price) < minAP) {
      minAP = parseFloat(v.price);
    }
    sumAP += parseFloat(v.price);
  });
  ret.aliPrice.min = minAP;
  ret.aliPrice.max = maxAP;
  ret.aliPrice.avg = sumAP / variants.length;

  let minSP = Infinity;
  let maxSP = 0;
  let sumSP = 0;
  variants.forEach((v) => {
    if (parseFloat(v.shop_price) > maxSP) {
      maxSP = parseFloat(v.shop_price);
    }
    if (parseFloat(v.shop_price) < minSP) {
      minSP = parseFloat(v.shop_price);
    }
    sumSP += parseFloat(v.shop_price);
  });

  ret.price.min = toUSD(minSP, price_settings.currencies);
  ret.price.max = toUSD(maxSP, price_settings.currencies);
  ret.price.avg = toUSD(sumSP / variants.length, price_settings.currencies);

  ret.compared_at_price.min = get_compared_at_price_advanced(
    minPrice,
    minPriceRange
  );
  ret.compared_at_price.max = get_compared_at_price_advanced(
    maxPrice,
    maxPriceRange
  );
  ret.compared_at_price.avg =
    (ret.compared_at_price.min + ret.compared_at_price.max) / 2;

  let minOP = Infinity;
  let maxOP = 0;
  let sumOP = 0;
  variants.forEach((v) => {
    let op;
    if (v.vfmrp) {
      op = parseFloat(v.vfmrp);
    } else {
      op = get_our_price(parseFloat(v.price), price_settings.commission);
    }
    if (op > maxOP) {
      maxOP = op;
    }
    if (op < minOP) {
      minOP = op;
    }
    sumOP += op;
  });

  ret.our_price.min = minOP;
  ret.our_price.max = maxOP;
  ret.our_price.avg = sumOP / variants.length;

  ret.profit = ret.price.avg - ret.our_price.avg;
  return ret;
};

export const getPricingData = function (
  minPrice,
  maxPrice,
  variants,
  price_settings
) {
  minPrice = isNaN(parseFloat(minPrice)) ? 0 : parseFloat(minPrice);
  maxPrice = isNaN(parseFloat(maxPrice)) ? 0 : parseFloat(maxPrice);
  if (price_settings.type === "basic") {
    return get_pricing_basic(minPrice, maxPrice, variants, price_settings);
  } else {
    return get_pricing_advanced(minPrice, maxPrice, variants, price_settings);
  }
};

export const toStoreCurrency = (amount, currencies, format = false) => {
  let ret;
  if (currencies.store_currency !== "USD") {
    ret = amount * currencies[currencies["store_currency"]];
  } else {
    ret = amount;
  }
  if (format) {
    return formatNumber(ret);
  } else {
    return ret;
  }
};
export const toUSD = (amount, currencies, format = false) => {
  let ret;
  if (currencies.store_currency !== "USD") {
    ret = amount / currencies[currencies["store_currency"]];
  } else {
    ret = amount;
  }
  if (format) {
    return formatNumber(ret);
  } else {
    return ret;
  }
};

// /(\d)(?=(\d\d\d)+(?!\d))/g befor code format

export const formatNumber = function (number, addDecimal = 2) {
  return `${parseFloat(number).toFixed(addDecimal)}`.replace(
    /(\d)(?=(\d{2})+\d\.)/g,
    "$1,"
  );
};
export const formatNumberNew = function (number, addDecimal = 2) {
  let formattedNumber;

  if (addDecimal > 0) {
    // If addDecimal is greater than zero, format with fixed decimal places
    formattedNumber = parseFloat(number).toFixed(addDecimal);
  } else {
    // If addDecimal is zero, do not include decimal places
    formattedNumber = Math.round(parseFloat(number)).toString();
  }

  // Apply comma formatting for thousands, millions, etc.
  formattedNumber = formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Prepend the dollar sign
  return `${formattedNumber}`;
};

export const formatBalance = function (number, addDecimal = 2) {
  if (number < 0) {
    return `-${parseFloat(Math.abs(number)).toFixed(addDecimal)}`.replace(
      /(\d)(?=(\d{2})+\d\.)/g,
      "$1,"
    );
  }

  return `${parseFloat(Math.abs(number)).toFixed(addDecimal)}`.replace(
    /(\d)(?=(\d{2})+\d\.)/g,
    "$1,"
  );
};

export const getCurrencySymbol = function (currency) {
  const symbols = {
    AED: "Dhs.",
    AFN: "Af",
    ALL: "L",
    AMD: "Դ",
    AOA: "Kz",
    ARS: "$",
    AUD: "$",
    AWG: "ƒ",
    AZN: "ман",
    BAM: "КМ",
    BBD: "$",
    BDT: "৳",
    BGN: "лв",
    BHD: "ب.د",
    BIF: "₣",
    BMD: "$",
    BND: "$",
    BOB: "Bs.",
    BRL: "R$",
    BSD: "$",
    BTN: "",
    BWP: "P",
    BYR: "Br",
    BZD: "$",
    CAD: "$",
    CDF: "₣",
    CHF: "₣",
    CLP: "$",
    CNY: "¥",
    COP: "$",
    CRC: "₡",
    CUP: "$",
    CVE: "$",
    CZK: "Kč",
    DJF: "₣",
    DKK: "kr",
    DOP: "$",
    DZD: "د.ج",
    EGP: "£",
    ERN: "Nfk",
    ETB: "",
    EUR: "€",
    FJD: "$",
    FKP: "£",
    GBP: "£",
    GEL: "ლ",
    GHS: "₵",
    GIP: "£",
    GMD: "D",
    GNF: "₣",
    GTQ: "Q",
    GYD: "$",
    HKD: "$",
    HNL: "L",
    HRK: "Kn",
    HTG: "G",
    HUF: "Ft",
    IDR: "Rp",
    ILS: "₪",
    INR: "₹",
    IQD: "ع.د",
    IRR: "﷼",
    ISK: "Kr",
    JMD: "$",
    JOD: "د.ا",
    JPY: "¥",
    KES: "Sh",
    KGS: "",
    KHR: "៛",
    KPW: "₩",
    KRW: "₩",
    KWD: "د.ك",
    KYD: "$",
    KZT: "〒",
    LAK: "₭",
    LBP: "ل.ل",
    LKR: "Rs",
    LRD: "$",
    LSL: "L",
    LYD: "ل.د",
    MAD: "د.م.",
    MDL: "L",
    MGA: "",
    MKD: "ден",
    MMK: "K",
    MNT: "₮",
    MOP: "P",
    MRO: "UM",
    MUR: "₨",
    MVR: "ރ.",
    MWK: "MK",
    MXN: "$",
    MYR: "RM",
    MZN: "MTn",
    NAD: "$",
    NGN: "₦",
    NIO: "C$",
    NOK: "kr",
    NPR: "₨",
    NZD: "$",
    OMR: "ر.ع.",
    PAB: "B/.",
    PEN: "S/.",
    PGK: "K",
    PHP: "₱",
    PKR: "₨",
    PLN: "zł",
    PYG: "₲",
    QAR: "ر.ق",
    RON: "L",
    RSD: "din",
    RUB: "р. ",
    RWF: "₣",
    SAR: "ر.س",
    SBD: "$",
    SCR: "₨",
    SDG: "£",
    SEK: "kr",
    SGD: "$",
    SHP: "£",
    SLL: "Le",
    SOS: "Sh",
    SRD: "$",
    STD: "Db",
    SYP: "ل.س",
    SZL: "L",
    THB: "฿",
    TJS: "ЅМ",
    TMT: "m",
    TND: "د.ت",
    TOP: "T$",
    TRY: "₤",
    TTD: "$",
    TWD: "$",
    TZS: "Sh",
    UAH: "₴",
    UGX: "Sh",
    USD: "$",
    usd: "$",
    UYU: "$",
    UZS: "",
    VEF: "Bs F",
    VND: "₫",
    VUV: "Vt",
    WST: "T",
    XAF: "₣",
    XCD: "$",
    XPF: "₣",
    YER: "﷼",
    ZAR: "R",
    ZMW: "ZK",
    ZWL: "$",
  };
  return symbols[currency] ? symbols[currency] : currency;
};
