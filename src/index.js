import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import './index.css';

const client = new ApolloClient({
	uri: "https://api.github.com/graphql",
	headers: {
		Authorization: "Bearer d8dc0ac5d880bd421f211e29851f282332e721eb"
	}
});

ReactDOM.render(
	<ApolloProvider client={client}>
    	<App />
	</ApolloProvider>,
	document.getElementById("root")
);