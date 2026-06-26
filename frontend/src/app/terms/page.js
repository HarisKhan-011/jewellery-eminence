import Header from "@layout/header";
import Wrapper from "@layout/wrapper";
import SectionTop from "@components/terms-policy/section-top-bar";
import Footer from "@layout/footer";
import TermsArea from "@components/terms-policy/terms-area";

export const metadata = {
  title: "Terms & Conditions - Eminence Jewellery",
};

export default function Terms() {
  return (
    <Wrapper>
      <Header style_2={true} />
      <SectionTop
        title="Terms and Conditions"
        subtitle="Please read these terms before shopping with Eminence Jewellery. They explain how orders, payments, delivery, returns, and custom jewellery requests are handled."
      />
      <TermsArea />
      <Footer />
    </Wrapper>
  );
}
