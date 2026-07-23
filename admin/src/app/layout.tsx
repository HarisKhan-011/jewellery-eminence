import "./globals.css";
import { Metadata } from "next";
import "/public/assets/css/custom.css";
import "react-toastify/dist/ReactToastify.css";
import { Providers } from "@/redux/provider";

export const metadata: Metadata = {
  title: "Eminence Jewellery Admin",
  description: "Eminence Jewellery administration panel.",
  icons: {
    icon: [
      { url: "/assets/img/logo/eminence-mark-v2.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: "/assets/img/logo/eminence-mark-v2.png",
    shortcut: "/assets/img/logo/eminence-mark-v2.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
