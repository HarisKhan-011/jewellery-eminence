"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import dayjs from "dayjs";
import ErrorMsg from "../common/error-msg";
import PaymentStatusChange from "../orders/payment-status-change";
import { useGetAllOrdersQuery } from "@/redux/order/orderApi";
import { formatCurrency } from "@/utils/formatCurrency";

const localPaymentMethods = [
  "JazzCash",
  "Easypaisa",
  "Bank Transfer",
  "Debit / Credit Cards",
  "Cash on Delivery",
];

const statusTone = (status?: string) => {
  if (status === "paid") return "text-success bg-success/10";
  if (status === "failed") return "text-danger bg-danger/10";
  if (status === "refunded") return "text-indigo-500 bg-indigo-100";
  return "text-warning bg-warning/10";
};

const PaymentArea = () => {
  const { data: orders, isError, isLoading } = useGetAllOrdersQuery();
  const [enabledMethods, setEnabledMethods] = useState<Record<string, boolean>>(
    () =>
      localPaymentMethods.reduce(
        (acc, method) => ({ ...acc, [method]: true }),
        {} as Record<string, boolean>
      )
  );

  const transactions = useMemo(() => orders?.data || [], [orders?.data]);
  const stats = useMemo(() => {
    const paid = transactions.filter((order) => order.paymentStatus === "paid");
    const pending = transactions.filter(
      (order) =>
        !order.paymentStatus ||
        [
          "awaiting_gateway_authorization",
          "awaiting_manual_verification",
          "pending_collection",
          "authorizing",
        ].includes(order.paymentStatus)
    );
    const manual = transactions.filter(
      (order) => order.paymentStatus === "awaiting_manual_verification"
    );

    return {
      total: transactions.length,
      paid: paid.length,
      pending: pending.length,
      manual: manual.length,
      volume: paid.reduce((sum, order) => sum + order.totalAmount, 0),
    };
  }, [transactions]);

  const exportTransactions = () => {
    const header = [
      "Invoice",
      "Customer",
      "Method",
      "Payment Status",
      "Amount",
      "Reference",
      "Date",
    ];
    const rows = transactions.map((order) => [
      order.invoice,
      order.user?.name || order.name,
      order.paymentMethod || "Legacy payment",
      order.paymentStatus || "pending",
      order.totalAmount,
      order.paymentDetails?.reference || "",
      dayjs(order.createdAt).format("YYYY-MM-DD"),
    ]);
    const csv = [header, ...rows]
      .map((row) =>
        row
          .map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `eminence-transactions-${dayjs().format("YYYY-MM-DD")}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return <h2>Loading....</h2>;
  }

  if (isError) {
    return <ErrorMsg msg="There was an error loading transactions" />;
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-xs border border-gray6">
          <span className="text-tiny uppercase font-semibold text-text2">
            Transactions
          </span>
          <h3 className="text-2xl mt-2 mb-0">{stats.total}</h3>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-xs border border-gray6">
          <span className="text-tiny uppercase font-semibold text-text2">
            Paid Volume
          </span>
          <h3 className="text-2xl mt-2 mb-0">{formatCurrency(stats.volume)}</h3>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-xs border border-gray6">
          <span className="text-tiny uppercase font-semibold text-text2">
            Paid
          </span>
          <h3 className="text-2xl mt-2 mb-0 text-success">{stats.paid}</h3>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-xs border border-gray6">
          <span className="text-tiny uppercase font-semibold text-text2">
            Pending
          </span>
          <h3 className="text-2xl mt-2 mb-0 text-warning">{stats.pending}</h3>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-xs border border-gray6">
          <span className="text-tiny uppercase font-semibold text-text2">
            Manual Review
          </span>
          <h3 className="text-2xl mt-2 mb-0">{stats.manual}</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6">
        <div className="bg-white rounded-xl shadow-xs border border-gray6">
          <div className="px-6 py-5 border-b border-gray6 flex items-center justify-between flex-wrap gap-3">
            <div>
              <h3 className="text-xl mb-1">Transactions</h3>
              <p className="mb-0 text-tiny">
                Verify bank transfers, review gateway status, and export logs.
              </p>
            </div>
            <button onClick={exportTransactions} className="tp-btn px-5 py-2">
              Export Transactions
            </button>
          </div>
          <div className="relative overflow-x-auto">
            <table className="w-[1180px] 2xl:w-full text-base text-left text-gray-500">
              <thead className="bg-white">
                <tr className="border-b border-gray6 text-tiny">
                  <th className="px-6 py-3 text-text2 uppercase font-semibold">
                    Invoice
                  </th>
                  <th className="px-3 py-3 text-text2 uppercase font-semibold">
                    Customer
                  </th>
                  <th className="px-3 py-3 text-text2 uppercase font-semibold">
                    Method
                  </th>
                  <th className="px-3 py-3 text-text2 uppercase font-semibold">
                    Status
                  </th>
                  <th className="px-3 py-3 text-text2 uppercase font-semibold">
                    Reference
                  </th>
                  <th className="px-3 py-3 text-text2 uppercase font-semibold text-end">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-text2 uppercase font-semibold text-end">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((order) => (
                  <tr key={order._id} className="border-b border-gray6">
                    <td className="px-6 py-4 text-heading font-medium">
                      #{order.invoice}
                    </td>
                    <td className="px-3 py-4">
                      {order.user?.name || order.name}
                    </td>
                    <td className="px-3 py-4">
                      <span className="block font-medium text-heading">
                        {order.paymentMethod || "Legacy payment"}
                      </span>
                      {order.paymentMethodCode && (
                        <span className="text-[11px] uppercase tracking-wide">
                          {order.paymentMethodCode.replace(/_/g, " ")}
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-4">
                      <span
                        className={`inline-flex text-[11px] px-3 py-1 rounded-md leading-none font-medium ${statusTone(
                          order.paymentStatus
                        )}`}
                      >
                        {(order.paymentStatus || "pending").replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="px-3 py-4">
                      {order.paymentDetails?.reference || "-"}
                      {order.paymentDetails?.receipt?.url && (
                        <a
                          href={order.paymentDetails.receipt.url}
                          target="_blank"
                          rel="noreferrer"
                          className="block text-theme text-tiny font-medium mt-1"
                        >
                          Receipt
                        </a>
                      )}
                    </td>
                    <td className="px-3 py-4 text-end font-medium text-heading">
                      {formatCurrency(order.totalAmount)}
                    </td>
                    <td className="px-6 py-4 text-end">
                      <div className="flex justify-end items-center gap-2">
                        <PaymentStatusChange
                          id={order._id}
                          currentStatus={order.paymentStatus}
                        />
                        <Link
                          href={`/order-details/${order._id}`}
                          className="tp-btn px-4 py-2"
                        >
                          View
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="bg-white rounded-xl shadow-xs border border-gray6 p-6">
            <h3 className="text-xl mb-4">Payment Methods</h3>
            <div className="space-y-3">
              {localPaymentMethods.map((method) => (
                <label
                  key={method}
                  className="flex items-center justify-between gap-4 border border-gray6 rounded-lg px-4 py-3"
                >
                  <span className="font-medium text-heading">{method}</span>
                  <input
                    type="checkbox"
                    checked={enabledMethods[method]}
                    onChange={() =>
                      setEnabledMethods((prev) => ({
                        ...prev,
                        [method]: !prev[method],
                      }))
                    }
                  />
                </label>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-xs border border-gray6 p-6">
            <h3 className="text-xl mb-4">Payment Logs</h3>
            <ul className="space-y-3 mb-0">
              <li className="text-tiny">
                Server-side validation checks method, totals, receipt, and
                duplicate references before saving orders.
              </li>
              <li className="text-tiny">
                Card refunds must be issued in the gateway, then marked
                refunded here for audit consistency.
              </li>
              <li className="text-tiny">
                Webhook signature fields are reserved on the order security log
                for gateway integration.
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default PaymentArea;
