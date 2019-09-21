import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import './index.css';

const client = new ApolloClient({
	uri: "https://api.github.com/graphql",
	headers: {
		Authorization: `Bearer ${process.env.REACT_APP_GRAPHQL_TOKEN}`
	}
});

ReactDOM.render(
	<ApolloProvider client={client}>
    	<App />
	</ApolloProvider>,
	document.getElementById("root")
);