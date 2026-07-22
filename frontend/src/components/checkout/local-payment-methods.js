"use client";

import React from "react";
import Link from "next/link";
import ErrorMessage from "@components/error-message/error";
import {
  localPaymentMethods,
  paymentSecurityBadges,
} from "@data/local-payment-methods";
import { Lock, Mobile, Truck } from "@svg/index";

const walletMethodIds = ["jazzcash", "easypaisa"];

const getDetailStepTitle = (methodId) => {
  if (walletMethodIds.includes(methodId)) return "Verify wallet";
  if (methodId === "bank_transfer") return "Upload proof";
  return "Review delivery";
};

const getDetailStepCopy = (methodId) => {
  if (walletMethodIds.includes(methodId)) {
    return "Add the mobile number used for this payment.";
  }
  if (methodId === "bank_transfer") {
    return "Add reference and upload your receipt.";
  }
  return "Confirm order and delivery eligibility.";
};

const PaymentIcon = ({ methodId }) => {
  if (walletMethodIds.includes(methodId)) return <Mobile />;
  if (methodId === "cod") return <Truck />;
  return <Lock />;
};

const PaymentLogo = ({ method }) => (
  <span
    className={`eminence-payment-logo eminence-payment-logo--${method.logoClass}`}
  >
    {method.logoLabel}
  </span>
);

const ProcessingState = ({ status }) => {
  const label =
    status === "authorizing"
      ? "Authorizing payment"
      : status === "verifying"
      ? "Verifying transaction"
      : status === "failed"
      ? "Payment failed. Please review details and retry."
      : "Ready for secure confirmation";

  return (
    <div
      className={`eminence-payment-status eminence-payment-status--${status}`}
      aria-live="polite"
    >
      <span aria-hidden="true" />
      {label}
    </div>
  );
};

const LocalPaymentMethods = ({
  register,
  errors,
  selectedPaymentMethod,
  cart_products,
  isCheckoutSubmit,
  paymentFlowStatus,
}) => {
  const selectedMethod =
    localPaymentMethods.find((method) => method.id === selectedPaymentMethod) ||
    localPaymentMethods[0];
  const isWallet = walletMethodIds.includes(selectedMethod.id);
  const isBankTransfer = selectedMethod.id === "bank_transfer";
  const activeFlowIndex = isCheckoutSubmit
    ? paymentFlowStatus === "verifying"
      ? 2
      : 1
    : selectedMethod
    ? 1
    : 0;
  const paymentFlowSteps = [
    {
      title: "Select method",
      copy: "Choose JazzCash, Easypaisa, bank transfer, or COD.",
    },
    {
      title: getDetailStepTitle(selectedMethod.id),
      copy: getDetailStepCopy(selectedMethod.id),
    },
    {
      title: "Confirm order",
      copy: "Accept terms and complete checkout.",
    },
  ];
  const visibleSecurityBadges = paymentSecurityBadges.slice(0, 4);

  return (
    <section className="eminence-payment" aria-labelledby="local-payment-title">
      <div className="eminence-payment__header">
        <div>
          <span className="eminence-payment__eyebrow">Local Payment Methods</span>
          <h4 id="local-payment-title">Choose how you want to pay</h4>
        </div>
        <div className="eminence-payment__secure">
          <Lock />
          <span>Protected checkout</span>
        </div>
      </div>

      <div className="eminence-payment-flow" aria-label="Payment progress">
        {paymentFlowSteps.map((step, index) => (
          <div
            key={step.title}
            className={index <= activeFlowIndex ? "is-active" : ""}
          >
            <span>{index + 1}</span>
            <strong>{step.title}</strong>
            <small>{step.copy}</small>
          </div>
        ))}
      </div>

      <div className="eminence-payment-panel">
        <div className="eminence-payment-step">
          <div className="eminence-payment-step__heading">
            <span>Step 1</span>
            <h5>Choose payment method</h5>
          </div>

          <label className="eminence-payment-select-label" htmlFor="paymentMethod">
            Payment method
          </label>
          <div className="eminence-payment-select-wrap">
            <select
              {...register("paymentMethod", {
                required: "Payment method is required!",
              })}
              id="paymentMethod"
              className="eminence-payment-select"
            >
              {localPaymentMethods.map((method) => (
                <option key={method.id} value={method.id}>
                  {method.title} - {method.subtitle}
                </option>
              ))}
            </select>
          </div>
          {errors?.paymentMethod?.message && (
            <ErrorMessage message={errors.paymentMethod.message} />
          )}

          <div className="eminence-payment-summary">
            <span className="eminence-payment-summary__icon">
              <PaymentIcon methodId={selectedMethod.id} />
            </span>
            <div className="eminence-payment-summary__copy">
              <div>
                <h6>{selectedMethod.title}</h6>
                <p>{selectedMethod.subtitle}</p>
              </div>
              <p>{selectedMethod.description}</p>
              <div className="eminence-payment-badges">
                {selectedMethod.badges.map((badge) => (
                  <span key={badge}>{badge}</span>
                ))}
              </div>
            </div>
            <PaymentLogo method={selectedMethod} />
          </div>
        </div>

        <div className="eminence-payment-step">
          <div className="eminence-payment-step__heading">
            <span>Step 2</span>
            <h5>{selectedMethod.detailTitle}</h5>
          </div>
          <p className="eminence-payment-step__copy">{selectedMethod.detailCopy}</p>

          {isWallet && (
            <div className="eminence-payment-fields">
              <label htmlFor="paymentMobile">Wallet mobile number</label>
              <input
                {...register("paymentMobile", {
                  validate: (value, formValues) => {
                    if (!walletMethodIds.includes(formValues.paymentMethod)) {
                      return true;
                    }

                    return (
                      /^03\d{9}$/.test(value || "") ||
                      "Enter a valid Pakistani mobile wallet number"
                    );
                  },
                })}
                id="paymentMobile"
                inputMode="numeric"
                placeholder="03XXXXXXXXX"
              />
              {errors?.paymentMobile?.message && (
                <ErrorMessage message={errors.paymentMobile.message} />
              )}
            </div>
          )}

          {isBankTransfer && (
            <div className="eminence-payment-fields eminence-payment-fields--split">
              <div>
                <label htmlFor="paymentReference">Transaction reference</label>
                <input
                  {...register("paymentReference", {
                    validate: (value, formValues) => {
                      if (formValues.paymentMethod !== "bank_transfer") {
                        return true;
                      }

                      return (
                        Boolean(value?.trim()) ||
                        "Transaction reference is required"
                      );
                    },
                  })}
                  id="paymentReference"
                  placeholder="Bank transaction ID"
                />
                {errors?.paymentReference?.message && (
                  <ErrorMessage message={errors.paymentReference.message} />
                )}
              </div>
              <div>
                <label htmlFor="paymentReceipt">Upload payment receipt</label>
                <input
                  {...register("paymentReceipt", {
                    validate: (files, formValues) => {
                      if (formValues.paymentMethod !== "bank_transfer") {
                        return true;
                      }

                      const receipt = files?.[0];
                      if (!receipt) return "Payment receipt image is required";
                      if (receipt.size > 5 * 1024 * 1024) {
                        return "Receipt must be under 5MB";
                      }

                      return (
                        ["image/jpeg", "image/png", "image/webp"].includes(
                          receipt.type
                        ) || "Upload a JPG, PNG, or WEBP receipt image"
                      );
                    },
                  })}
                  id="paymentReceipt"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                />
                {errors?.paymentReceipt?.message && (
                  <ErrorMessage message={errors.paymentReceipt.message} />
                )}
              </div>
            </div>
          )}

          {!isWallet && !isBankTransfer && (
            <div className="eminence-payment-note">
              <strong>No payment fields required.</strong>
              <span>Our team confirms availability and collection before dispatch.</span>
            </div>
          )}
        </div>

        <div className="eminence-payment-step">
          <div className="eminence-payment-step__heading">
            <span>Step 3</span>
            <h5>Confirm secure order</h5>
          </div>

          <div className="eminence-payment-options">
            <label>
              <input {...register("savePreferredPayment")} type="checkbox" />
              Save preferred payment method
            </label>
            <label>
              <input
                {...register("acceptTerms", {
                  required:
                    "Please accept the terms and secure payment policy before confirming.",
                })}
                type="checkbox"
              />
              I agree to secure payment processing and order verification.
            </label>
            {errors?.acceptTerms?.message && (
              <ErrorMessage message={errors.acceptTerms.message} />
            )}
          </div>

          <div className="eminence-payment-actions">
            <button
              type="submit"
              className="tp-btn eminence-payment-submit"
              disabled={cart_products.length === 0 || isCheckoutSubmit}
            >
              {isCheckoutSubmit ? (
                <>
                  <span className="eminence-payment-submit__spinner" />
                  Processing payment
                </>
              ) : (
                "Confirm secure order"
              )}
            </button>
            <Link href="/cart" className="eminence-payment-cancel">
              Cancel before payment
            </Link>
          </div>

          <ProcessingState status={paymentFlowStatus} />
        </div>
      </div>

      <div className="eminence-payment-security" aria-label="Security controls">
        {visibleSecurityBadges.map((badge) => (
          <span key={badge}>{badge}</span>
        ))}
      </div>
    </section>
  );
};

export default LocalPaymentMethods;
