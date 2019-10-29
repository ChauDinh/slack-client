import React from "react";
import styled from "styled-components";
import { Header, Icon } from "semantic-ui-react";

const Wrapper = styled.div`
  height: 50px;
  box-shadow: -2px 4px 2px -3px lightgray;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;

  @media (max-width: 768px) {
    padding: 20px 20px;
    .channel-name__header {
      font-size: 1rem;
      color: rgb(175, 105, 255) !important;
    }
    .user__semantic-icon {
      display: none;
    }
    .phone__semantic-icon {
      display: none;
    }
    .photo__semantic-icon {
      display: none;
    }
    .channel-name__header {
      border: 2px solid rgb(175, 105, 255);
      padding: 0.5rem 1rem !important;
      border-radius: 5px;
    }
  }
`;

export default ({ channelName }) => (
  <Wrapper>
    <Header
      className="channel-name__header"
      style={{
        padding: "0",
        margin: "0",
        color: "#333",
        textTransform: "capitalize"
      }}
    >
      # {channelName}
    </Header>
    <div>
      <Icon
        name="user"
        className="user__semantic-icon"
        style={{ color: "#79868c", marginRight: "36px", fontSize: "1.5em" }}
      />
      <Icon
        className="phone__semantic-icon"
        name="phone"
        style={{ color: "#79868c", marginRight: "36px", fontSize: "1.5em" }}
      />
      <Icon
        className="photo__semantic-icon"
        name="photo"
        style={{ color: "#79868c", fontSize: "1.5em" }}
      />
    </div>
  </Wrapper>
);
