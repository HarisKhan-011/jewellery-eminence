// internal
import EmailVerifyArea from "@components/email-verify-area";

export const metadata = {
  title: "Email Verification - Eminence Jewellery",
};
const EmailVerification = async ({ params }) => {
  const { token } = await params;
  return <EmailVerifyArea token={token} />;
};

export default EmailVerification;
