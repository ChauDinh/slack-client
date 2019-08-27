import React from "react";
import styled from "styled-components";
import { Header, Icon } from "semantic-ui-react";

const Wrapper = styled.div`
  border-bottom: 2px solid #545454;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
`;

export default ({ channelName }) => (
  <Wrapper>
    <Header style={{ padding: "0", margin: "0" }}>#{channelName}</Header>
    <Icon name="user" />
  </Wrapper>
);
