import React from "react";
import styled from "styled-components";
import { Header, Icon, Search } from "semantic-ui-react";

const Wrapper = styled.div`
  z-index: 2;
  grid-column-start: 3;
  grid-column-end: 5;
  grid-row: 1;
  height: 50px;
  box-shadow: -3px 4px 3px -3px #e0e4e8;
  border-bottom: 2px solid #e0e4e8;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
  .prompt {
    border-radius: 5px !important;
    height: 30px;
    width: 155px;
  }

  @media (max-width: 768px) {
    padding: 20px 20px;
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
      background: #fff;
      color: #333;
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
        color: "#333"
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <Icon
          name="slack hash"
          style={{ fontSize: "18px", marginRight: "3px" }}
        />{" "}
        {channelName}
      </div>
    </Header>
    <div style={{ display: "flex", alignItems: "center" }}>
      <Icon
        name="user"
        className="user__semantic-icon"
        style={{ color: "#000", marginRight: "20px", fontSize: "16px" }}
      />
      <Icon
        className="phone__semantic-icon"
        name="phone"
        style={{ color: "#000", marginRight: "20px", fontSize: "16px" }}
      />
      <Icon
        className="photo__semantic-icon"
        name="photo"
        style={{ color: "#000", marginRight: "20px", fontSize: "16px" }}
      />
      <Search />
    </div>
  </Wrapper>
);
