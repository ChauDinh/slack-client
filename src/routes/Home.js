import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const allUsersQuery = gql`
  {
    allUsers {
      id
      email
      username
    }
  }
`;

const Home = ({ data: { allUsers = [] } }) =>
  allUsers.map(user => <h1 key={user.id}>{user.username}</h1>);

export default graphql(allUsersQuery)(Home);
