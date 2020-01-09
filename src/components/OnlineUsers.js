import React from "react";
import styled from "styled-components";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

import UserModal from "./UserModal";

const Wrapper = styled.div`
  grid-column: 4;
  grid-row: 2;
  grid-row-end: 4;
  background: #f4f7fa;
  padding: 0 20px;
  width: 240px;

  @media (max-width: 768px) {
    display: block;
    width: 100%;
    padding: 10px 20px;
  }
`;

const GET_ONLINE_USERS = gql`
  {
    onlineUsers {
      username
      last_seen
    }
  }
`;

const OnlineUserWrapper = ({ data: { onlineUsers }, loading }) => {
  try {
    // const { onlineUsers } = data;
    if (loading || !onlineUsers) {
      return <div>loading...</div>;
    } else {
      return (
        <Wrapper>
          <h3>Online Users</h3>
          {onlineUsers.map((user, index) => (
            <UserModal
              key={index}
              name={user.username}
              last_seen={user.last_seen}
            />
          ))}
        </Wrapper>
      );
    }
  } catch (error) {
    console.error(error);
  }
};

export default graphql(GET_ONLINE_USERS)(OnlineUserWrapper);
