const getCurrencySymbol = function (currency) {
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

export default getCurrencySymbol;
