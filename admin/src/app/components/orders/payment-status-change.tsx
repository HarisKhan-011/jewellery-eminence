"use client";
import React from "react";
import { useUpdatePaymentStatusMutation } from "@/redux/order/orderApi";
import { notifyError, notifySuccess } from "@/utils/toast";

const paymentStatuses = [
  { value: "authorizing", label: "Authorizing" },
  { value: "awaiting_gateway_authorization", label: "Gateway Pending" },
  { value: "awaiting_manual_verification", label: "Manual Review" },
  { value: "pending_collection", label: "COD Pending" },
  { value: "paid", label: "Paid" },
  { value: "failed", label: "Failed" },
  { value: "refunded", label: "Refunded" },
];

const PaymentStatusChange = ({
  id,
  currentStatus,
}: {
  id: string;
  currentStatus?: string;
}) => {
  const [updatePaymentStatus, { isLoading }] = useUpdatePaymentStatusMutation();

  const handleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const paymentStatus = event.target.value;
    const result = await updatePaymentStatus({
      id,
      paymentStatus: { paymentStatus },
    });

    if ("error" in result) {
      notifyError("Payment status update failed");
      return;
    }

    notifySuccess("Payment status updated");
  };

  return (
    <select
      className="input h-[36px] min-w-[150px] px-3 text-tiny"
      value={currentStatus || ""}
      onChange={handleChange}
      disabled={isLoading}
      aria-label="Change payment status"
    >
      <option value="">Payment status</option>
      {paymentStatuses.map((status) => (
        <option key={status.value} value={status.value}>
          {status.label}
        </option>
      ))}
    </select>
  );
};

export default PaymentStatusChange;
