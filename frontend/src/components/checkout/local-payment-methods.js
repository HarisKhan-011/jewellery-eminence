"use client";

import React from "react";
import Link from "next/link";
import ErrorMessage from "@components/error-message/error";
import PaymentCardElement from "@components/order/pay-card-element";
import {
  localPaymentMethods,
  paymentFlowSteps,
  paymentSecurityBadges,
} from "@data/local-payment-methods";
import { Lock, Mobile, Payment, Truck } from "@svg/index";

const walletMethodIds = ["jazzcash", "easypaisa"];

const PaymentIcon = ({ methodId }) => {
  if (walletMethodIds.includes(methodId)) return <Mobile />;
  if (methodId === "cod") return <Truck />;
  if (methodId === "bank_transfer") return <Lock />;
  return <Payment />;
};

const PaymentLogo = ({ method }) => {
  if (method.id === "cards") {
    return (
      <span className="eminence-payment-logo eminence-payment-logo--cards">
        <span>VISA</span>
        <span>MC</span>
        <span>UP</span>
      </span>
    );
  }

  return (
    <span
      className={`eminence-payment-logo eminence-payment-logo--${method.logoClass}`}
    >
      {method.logoLabel}
    </span>
  );
};

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
  cardError,
  stripe,
  cart_products,
  isCheckoutSubmit,
  paymentFlowStatus,
}) => {
  const selectedMethod =
    localPaymentMethods.find((method) => method.id === selectedPaymentMethod) ||
    localPaymentMethods[0];
  const isWallet = walletMethodIds.includes(selectedMethod.id);
  const isBankTransfer = selectedMethod.id === "bank_transfer";
  const isCards = selectedMethod.id === "cards";
  const activeFlowIndex = isCheckoutSubmit
    ? paymentFlowStatus === "verifying"
      ? 4
      : 3
    : 2;

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
          <span
            key={step}
            className={index <= activeFlowIndex ? "is-active" : ""}
          >
            {step}
          </span>
        ))}
      </div>

      <div className="eminence-payment-grid" role="radiogroup">
        {localPaymentMethods.map((method) => {
          const isSelected = selectedMethod.id === method.id;

          return (
            <label
              className={`eminence-payment-card ${
                isSelected ? "is-selected" : ""
              }`}
              htmlFor={`payment-${method.id}`}
              key={method.id}
            >
              <input
                {...register("paymentMethod", {
                  required: "Payment method is required!",
                })}
                id={`payment-${method.id}`}
                type="radio"
                value={method.id}
                className="eminence-payment-card__input"
              />
              <span className="eminence-payment-card__top">
                <span className="eminence-payment-card__icon">
                  <PaymentIcon methodId={method.id} />
                </span>
                <PaymentLogo method={method} />
              </span>
              <span className="eminence-payment-card__title">
                {method.title}
              </span>
              <span className="eminence-payment-card__subtitle">
                {method.subtitle}
              </span>
              <span className="eminence-payment-card__description">
                {method.description}
              </span>
              <span className="eminence-payment-card__features">
                {method.highlights.map((highlight) => (
                  <span key={highlight}>{highlight}</span>
                ))}
              </span>
              <span className="eminence-payment-card__badges">
                {method.badges.map((badge) => (
                  <span key={badge}>{badge}</span>
                ))}
              </span>
            </label>
          );
        })}
      </div>
      {errors?.paymentMethod?.message && (
        <ErrorMessage message={errors.paymentMethod.message} />
      )}

      <div className="eminence-payment-panel">
        <div className="eminence-payment-panel__copy">
          <h5>{selectedMethod.detailTitle}</h5>
          <p>{selectedMethod.detailCopy}</p>
        </div>

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

        {isCards && (
          <PaymentCardElement
            stripe={stripe}
            cardError={cardError}
            isCheckoutSubmit={isCheckoutSubmit}
          />
        )}

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

      <div className="eminence-payment-security" aria-label="Security controls">
        {paymentSecurityBadges.map((badge) => (
          <span key={badge}>{badge}</span>
        ))}
      </div>
    </section>
  );
};

export default LocalPaymentMethods;
