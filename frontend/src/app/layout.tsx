import type { Metadata } from "next";
import { Theme } from "@radix-ui/themes";
import { NavBar } from "../modules/NavBar";
import "@radix-ui/themes/styles.css";

export const metadata: Metadata = {
  title: "awesome-xyz",
  description: "Havent thought of a description yet!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Theme accentColor="cyan" grayColor="sand" radius="large" scaling="95%">
          <NavBar />
          {children}
        </Theme>
      </body>
    </html>
  );
}
