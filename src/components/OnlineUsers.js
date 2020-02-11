import React from "react";
import styled from "styled-components";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

import UserModal from "./UserModal";
import { CalendarWrapper } from "./Calendar";

const Wrapper = styled.div`
  grid-column: 4;
  grid-row: 2;
  grid-row-end: 4;
  background: #f4f7fa;
  padding: 0 20px;
  width: inherit;
  overflow-y: auto;

  @media (max-width: 1080px) {
    h3 {
      display: none;
    }
    p {
      display: none;
    }
    width: inherit;
    padding: 0 10px;
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
    display: none;
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
          <h5 style={{ marginTop: "15px" }}>Online Users</h5>
          {onlineUsers.map((user, index) => (
            <UserModal
              key={index}
              name={user.username}
              last_seen={user.last_seen}
            />
          ))}
          <CalendarWrapper />
        </Wrapper>
      );
    }
  } catch (error) {
    console.error(error);
  }
};

export default graphql(GET_ONLINE_USERS)(OnlineUserWrapper);
