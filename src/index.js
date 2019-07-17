import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import { setContext } from "apollo-link-context";
import { createHttpLink } from "apollo-link-http";
import "semantic-ui-css/semantic.min.css";

import Routes from "./routes";

const httpLink = createHttpLink({ uri: "/graphql" });

const authLink = setContext((_, { headers }) => {
  // get the authentication token from localStorage if it exits
  const access_token = localStorage.getItem("token");
  const refresh_token = localStorage.getItem("refreshToken");

  return {
    headers: {
      ...headers,
      authentication: access_token
    }
  };
});

const client = new ApolloClient({
  uri: "http://localhost:8080/graphql"
});

const App = (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
);

ReactDOM.render(App, document.getElementById("root"));
