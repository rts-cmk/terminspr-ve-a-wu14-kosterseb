import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import Footer from "@/app/ui/footer";

const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Night Club",
    template: "%s | Night Club",
  },
  description:
    "Night Club — Copenhagen Night Life Entertainment. Events, gallery, blog and table booking.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${ubuntu.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        {children}
        <Footer />
      </body>
    </html>
  );
}
