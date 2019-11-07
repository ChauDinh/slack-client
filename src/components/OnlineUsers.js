import React from "react";
import styled from "styled-components";
import { Image } from "semantic-ui-react";
import { withApollo } from "react-apollo";
import gql from "graphql-tag";
import OnlineUser from "./OnlineUser";

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

class OnlineUserWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.client = props.client;
    this.state = {
      onlineUsers: [
        {
          name: "Bob"
        },
        {
          name: "Alice"
        },
        {
          name: "Bill"
        },
        {
          name: "Tommy"
        }
      ]
    };
  }

  render() {
    const onlineUsersList = [];
    this.state.onlineUsers.forEach((user, index) => {
      onlineUsersList.push(<OnlineUser key={index} name={user.name} />);
    });

    return (
      <Wrapper>
        <h3 style={{ marginTop: "16px" }}>Online Users</h3>
        {onlineUsersList}
      </Wrapper>
    );
  }
}

export default withApollo(OnlineUserWrapper);
