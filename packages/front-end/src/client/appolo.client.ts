import { ApolloClient, InMemoryCache } from "@apollo/client";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

console.log(process.env.USER_SERVER_URL);

const client = new ApolloClient({
  uri: process.env.USER_SERVER_URL + "/graphql",
  cache: new InMemoryCache(),
});

if (process.env.NODE_ENV !== "production") {
  loadDevMessages();
  loadErrorMessages();
}

export default client;
