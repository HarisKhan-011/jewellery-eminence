import Header from "@layout/header";
import Wrapper from "@layout/wrapper";
import AboutArea from "@components/about";
import Footer from "@layout/footer";

export const metadata = {
  title: "About - Eminence Jewellery",
  description:
    "Learn about Eminence Jewellery, our online collections, bridal pieces, bespoke jewellery support and customer-first shopping experience.",
};
const About = () => {
  return (
    <Wrapper>
      <Header style_2={true} />
      <AboutArea />
      <Footer />
    </Wrapper>
  );
};

export default About;
