import Wrapper from "@/layout/wrapper";
import Breadcrumb from "../components/breadcrumb/breadcrumb";
import PaymentArea from "../components/payments/payment-area";

const PaymentsPage = () => {
  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        <Breadcrumb title="Payments" subtitle="Transactions" />
        <PaymentArea />
      </div>
    </Wrapper>
  );
};

export default PaymentsPage;
