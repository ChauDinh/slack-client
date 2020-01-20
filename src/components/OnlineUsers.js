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
  overflow-y: auto;

  @media (max-width: 1080px) {
    display: none;
  }

  /* width */
  ::-webkit-scrollbar {
    width: 14px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background-color: #f3f3f3;
    background-clip: padding-box;
    border: 3px solid #fff;
    border-radius: 7px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background-color: #d3e1ef;
    background-clip: padding-box;
    border: 3px solid #fff;
    border-radius: 7px;
  }

  @media (max-width: 768px) {
    display: flex;
    flex-shrink: 0;
    width: 100%;
    background: #0f8deb;
    color: #fff;
    overflow-x: auto;
    h3 {
      display: none;
    }
    div {
      margin: 5px 0 !important;
    }
    p {
      display: none;
    }
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
