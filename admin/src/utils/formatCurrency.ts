export const formatCurrency = (value?: number) =>
  `Rs. ${Number(value || 0).toLocaleString("en-PK")}`;
