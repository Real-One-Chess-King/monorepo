import { ApolloProvider } from "@apollo/client";
import client from "../client/appolo.client";
import { ReactNode } from "react";

export default function ApolloLayout({ children }: { children: ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
