import type { Metadata } from "next";
import { NavBar } from "../modules/NavBar";
import { __prod__ } from "@/utils/constants";
import { ApolloWrapper } from "../utils/ApolloWrapper";

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
        <ApolloWrapper>
          <NavBar />
          {children}
        </ApolloWrapper>
      </body>
    </html>
  );
}
