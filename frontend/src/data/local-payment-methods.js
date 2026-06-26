export const localPaymentMethods = [
  {
    id: "jazzcash",
    title: "JazzCash",
    subtitle: "Mobile Wallet",
    logoLabel: "JazzCash",
    logoClass: "jazzcash",
    description:
      "Pay with your JazzCash wallet, scan a secure QR request, verify OTP, and receive instant confirmation once the gateway authorizes the transaction.",
    highlights: [
      "Mobile Wallet",
      "QR Payment",
      "OTP Verification",
      "Instant Payment Confirmation",
    ],
    badges: ["OTP", "QR", "Instant"],
    detailTitle: "JazzCash authorization",
    detailCopy:
      "Enter the JazzCash mobile number used for payment. The final transaction is verified server-side before the order is confirmed.",
    paymentStatus: "awaiting_gateway_authorization",
  },
  {
    id: "easypaisa",
    title: "Easypaisa",
    subtitle: "Mobile Wallet",
    logoLabel: "easypaisa",
    logoClass: "easypaisa",
    description:
      "Use Easypaisa wallet checkout with secure QR support, OTP authentication, and real-time verification from the payment provider.",
    highlights: [
      "Mobile Wallet",
      "QR Payment",
      "OTP Authentication",
      "Real-Time Verification",
    ],
    badges: ["OTP", "QR", "Real-time"],
    detailTitle: "Easypaisa authorization",
    detailCopy:
      "Provide the Easypaisa wallet number for verification. Provider callbacks should be matched with this order before fulfillment.",
    paymentStatus: "awaiting_gateway_authorization",
  },
  {
    id: "bank_transfer",
    title: "Bank Transfer",
    subtitle: "All Pakistani Banks",
    logoLabel: "IBAN",
    logoClass: "bank",
    description:
      "Transfer from any Pakistani bank using IBAN, add the transaction reference, and upload a receipt for manual verification.",
    highlights: [
      "All Pakistani Banks",
      "IBAN Support",
      "Manual Verification",
      "Upload Payment Receipt",
    ],
    badges: ["IBAN", "Receipt", "Manual check"],
    detailTitle: "Bank transfer verification",
    detailCopy:
      "Upload a clear receipt image and enter the bank transaction reference. Admins verify the payment before dispatch.",
    paymentStatus: "awaiting_manual_verification",
  },
  {
    id: "cards",
    title: "Debit / Credit Cards",
    subtitle: "Visa, Mastercard, UnionPay",
    logoLabel: "Cards",
    logoClass: "cards",
    description:
      "Pay by debit or credit card through a PCI-DSS compliant gateway with secure tokens and encrypted transaction handling.",
    highlights: [
      "Visa",
      "Mastercard",
      "UnionPay Optional",
      "PCI-DSS Gateway",
    ],
    badges: ["PCI-DSS", "Tokenized", "Encrypted"],
    detailTitle: "Secure card payment",
    detailCopy:
      "Card data is tokenized by the gateway. Eminence Jewellery never stores full card numbers or CVV values.",
    paymentStatus: "authorizing",
  },
  {
    id: "cod",
    title: "Cash on Delivery",
    subtitle: "Eligible Products",
    logoLabel: "COD",
    logoClass: "cod",
    description:
      "Pay at the doorstep for eligible products. Delivery charges are shown before checkout and confirmation is sent by SMS and email.",
    highlights: [
      "Eligible Products",
      "Delivery Charges Before Checkout",
      "SMS Confirmation",
      "Email Confirmation",
    ],
    badges: ["Eligible", "SMS", "Email"],
    detailTitle: "Cash on delivery",
    detailCopy:
      "COD orders remain pending until the team confirms eligibility, address details, and delivery availability.",
    paymentStatus: "pending_collection",
  },
];

export const paymentFlowSteps = [
  "Cart",
  "Checkout",
  "Payment",
  "Authorization",
  "Verification",
  "Confirmation",
];

export const paymentSecurityBadges = [
  "SSL / HTTPS",
  "PCI-DSS Standards",
  "Secure Payment Tokens",
  "Encrypted Transactions",
  "OTP Verification",
  "Fraud Detection",
  "CSRF Protection",
  "XSS Protection",
  "SQL Injection Protection",
  "Rate Limiting",
  "Secure API Calls",
  "Server-side Validation",
  "Signature Verification",
  "Order Verification",
  "Secure Webhooks",
  "Transaction Logging",
  "Duplicate Prevention",
  "Timeout Protection",
  "Secure Sessions",
];

export const getPaymentMethodById = (id) =>
  localPaymentMethods.find((method) => method.id === id) ||
  localPaymentMethods[0];
