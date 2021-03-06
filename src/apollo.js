/* eslint-disable no-undef */
import { InMemoryCache } from "apollo-boost";
import { ApolloClient } from "apollo-client";
import { setContext } from "apollo-link-context";
import { ApolloLink, split } from "apollo-link";
// import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import createFileLink from "./createFileLink";
import { SubscriptionClient } from "subscriptions-transport-ws";

const httpLink = createFileLink({
	// eslint-disable-next-line no-undef
	uri: `http://${process.env.REACT_APP_SERVER_URL}/graphql`
});

// Middleware
const middlewareLink = setContext(() => ({
	headers: {
		"x-token": localStorage.getItem("token"),
		"x-refresh-token": localStorage.getItem("refreshToken")
	}
}));

// Afterware
const afterwareLink = new ApolloLink((operation, forward) => {
	return forward(operation).map(response => {
		const {
			response: { headers }
		} = operation.getContext();
		if (headers) {
			const token = headers.get("x-token");
			const refreshToken = headers.get("x-refresh-token");

			if (token) {
				localStorage.setItem("token", token);
			}

			if (refreshToken) {
				localStorage.setItem(
					"refreshToken",
					refreshToken
				);
			}
		}
		return response;
	});
});

const httpLinkWithMiddlewares = afterwareLink.concat(
	middlewareLink.concat(httpLink)
);

export const wsLink = new SubscriptionClient(
	`ws://${process.env.REACT_APP_SERVER_URL}/subscriptions`,
	{
		reconnect: true,
		lazy: true,
		connectionParams: () => ({
			token: localStorage.getItem("token"),
			// console.log(
			// "connectionParams token: ",
			// localStorage.getItem("token")
			// ) || localStorage.getItem("token"),
			refreshToken: localStorage.getItem("refreshToken")
			// console.log(
			// "connectionParams: ",
			// localStorage.getItem("refreshToken")
			// ) || localStorage.getItem("refreshToken")
		})
	}
);

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
	// split based on operation type
	({ query }) => {
		const definition = getMainDefinition(query);
		return (
			definition.kind === "OperationDefinition" &&
			definition.operation === "subscription"
		);
	},
	wsLink,
	httpLinkWithMiddlewares
);

export default new ApolloClient({
	link,
	cache: new InMemoryCache()
});
