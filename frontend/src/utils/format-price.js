export const toNumber = (value = 0) => {
  const amount = Number(value);

  return Number.isFinite(amount) ? amount : 0;
};

export const convertToPkrAmount = (value = 0) =>
  Math.round(toNumber(value));

export const formatPkrAmount = (value = 0) =>
  `Rs. ${new Intl.NumberFormat("en-PK", {
    maximumFractionDigits: 0,
  }).format(Math.round(toNumber(value)))}`;

export const formatPkrPrice = (value = 0) =>
  formatPkrAmount(value);

export const getDiscountedRawPrice = (price = 0, discount = 0) => {
  const amount = toNumber(price);
  const discountAmount = toNumber(discount);

  return amount - (amount * discountAmount) / 100;
};

export const getDiscountedPkrPrice = (price = 0, discount = 0) =>
  getDiscountedRawPrice(price, discount);

export const getProductBasePrice = (product = {}) =>
  toNumber(product.originalPrice ?? product.price);
