import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const allUsersQuery = gql`
  {
    allUsers {
      id
      email
      username
    }
  }
`;

const Home = () => (
  <>
    <h1>Home</h1>
    <Query query={allUsersQuery}>
      {({ loading, error, data = [] }) => {
        if (loading) return <h4>loading...</h4>;
        if (error) {
          console.error(error);
        }
        return data.allUsers.map(u => <h1 key={u.id}>{u.username}</h1>);
      }}
    </Query>
  </>
);

export default Home;
