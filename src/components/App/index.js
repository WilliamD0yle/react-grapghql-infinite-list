import React from "react";
import moment from "moment";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Repos from "../Repos/";
import logo from "./logo.svg";
import "./App.css";

const reposQuery = gql`
  query search($query: String!, $cursor: String) {
    search(first: 10, query: $query, type: REPOSITORY, after: $cursor) {
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          ... on Repository {
            name
            owner{
				login
				avatarUrl
			   }
			url
            description
            stargazers {
              totalCount
            }
            primaryLanguage {
              name
            }
          }
        }
      }
    }
  }
`;

const date = new moment(new Date()).subtract(1, "weeks");
const formattedDate = date.format("YYYY-MM-DD");
const query = `created:>${formattedDate} sort:stars-desc`;

const App = () => (
	<div className="App">
		<header className="App-header">
			<img src={logo} className="App-logo" alt="logo" />
			<h1>Trending Repos</h1>
		</header>
		<Query
			notifyOnNetworkStatusChange={true}
			query={reposQuery}
			variables={{
				query
			}}
		>
			{({ data, loading, error, fetchMore }) => {
				if (error) return <p>{error.message}</p>;
				return (
					<Repos
						loading={loading}
						data={data}
						onLoadMore={() =>
							fetchMore({
								variables: {
									query,
									cursor: data.search.pageInfo.endCursor
								},
								updateQuery: (prevResult, { fetchMoreResult }) => {
									const newEdges = fetchMoreResult.search.edges;
									const pageInfo = fetchMoreResult.search.pageInfo;
									return newEdges.length
										? {
											search: {
											__typename: prevResult.search.__typename,
											edges: [...prevResult.search.edges, ...newEdges],
											pageInfo
											}
										}
										: prevResult;
								}
							})
						}
					/>
				);
			}}
        </Query>
	</div>
);

export default App;
