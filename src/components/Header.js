import React from "react";
import styled from "styled-components";
import { Header, Icon } from "semantic-ui-react";

const Wrapper = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
`;

export default ({ channelName }) => (
  <Wrapper>
    <Header style={{ padding: "0", margin: "0", color: "#93a5ad" }}>
      # {channelName}
    </Header>
    <div>
      <Icon
        name="user"
        style={{ color: "#79868c", marginRight: "36px", fontSize: "1.5rem" }}
      />
      <Icon
        name="phone"
        style={{ color: "#79868c", marginRight: "36px", fontSize: "1.5rem" }}
      />
      <Icon name="photo" style={{ color: "#79868c", fontSize: "1.5rem" }} />
    </div>
  </Wrapper>
);
