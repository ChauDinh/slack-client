import React from "react";
import styled from "styled-components";
import { Image, Icon } from "semantic-ui-react";

const Wrapper = styled.div`
  grid-column: 2;
  grid-row: 3 / 4;
  background-color: #f4f7fa;
  color: #000;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Me = ({ username }) => (
  <Wrapper>
    <Image
      src={`https://api.adorable.io/avatars/50/${username}@adorable.io`}
      style={{
        borderRadius: "50%",
        margin: "5px"
      }}
    />
    <div
      className="me-info"
      style={{
        flexGrow: "1",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        height: "100%",
        padding: "8px",
        fontFamily: "sans-serif",
        fontSize: "16px",
        fontWeight: "bolder",
        paddingLeft: "7px",
        color: "#0f8deb"
      }}
    >
      {username}
      <span
        style={{
          fontSize: "13px",
          fontWeight: "lighter",
          color: "#6899bd"
        }}
      >
        member
      </span>
    </div>
    <div>
      <Icon
        name="volume up"
        style={{ marginRight: "10px" }}
        size="large"
        color="grey"
      />
      <Icon name="microphone" size="large" color="grey" />
    </div>
  </Wrapper>
);

export default Me;
