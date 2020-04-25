import React from "react";
import { Button, Header, Image, Modal, Icon } from "semantic-ui-react";
import styled from "styled-components";

import OnlineUser from "./OnlineUser";
import "./UserModal.css";

const ButtonStyle = styled.button`
  width: 45px;
  height: 45px;
  background-color: #cccccc;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  &:hover {
    background-color: "green";
    cursor: pointer;
  }
`;

const ParaStyle = styled.p`
  padding: 15px 15px;
  margin-bottom: 10px;
  border: 1px solid rgba(200, 200, 200, 0.3);
  border-radius: 5px;
  background-color: #fff;
`;

const UserModal = ({ name }) => (
  <Modal
    trigger={
      <Button
        style={{
          backgroundColor: "transparent",
          padding: "0",
          margin: "0",
          display: "block",
        }}
      >
        {" "}
        <OnlineUser name={name} />
      </Button>
    }
    centered={false}
    closeIcon
    style={{
      maxWidth: "450px",
    }}
  >
    <Modal.Header
      style={{
        padding: 0,
        backgroundColor: "transparent",
        boxShadow: "0px 3px 5px rgba(200, 200, 200, 0.2)",
      }}
    >
      <div
        style={{
          backgroundColor: "#3f9fff",
          color: "#fff",
          fontSize: 15,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "3px 3px 0 0",
          borderBottom: "1px solid rgba(200, 200, 200, 0.5)",
        }}
      >
        SlackQL
      </div>
      <div
        style={{
          padding: "15px 0 10px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "AvenirNext",
          color: "#333",
          fontWeight: "900",
        }}
      >
        {name}'s profile
      </div>
    </Modal.Header>
    <Modal.Content
      image
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f4f7fa",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0px 40px",
        }}
      >
        <ButtonStyle>
          <Icon name="call" size="large" />
        </ButtonStyle>
        <Image
          wrapped
          className="user_avatar"
          size="medium"
          src={`https://api.adorable.io/avatars/100/${name}@adorable.io`}
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
        <ButtonStyle>
          <Icon name="talk" size="large" />
        </ButtonStyle>
      </div>
      <Modal.Description style={{ paddingLeft: "0", fontFamily: "sans-serif" }}>
        <Header style={{ textAlign: "center", marginTop: "10px" }}>
          {name}
        </Header>

        <ParaStyle>
          <Icon name="mail outline" />
          <span style={{ fontWeight: "bolder" }}>Email address:</span> {name}@
          {name}.com
        </ParaStyle>
        <ParaStyle>
          <Icon name="text telephone" />
          <span style={{ fontWeight: "bolder" }}>Phone:</span> +84 389 139 3849
        </ParaStyle>
        <ParaStyle>
          <Icon name="at" />
          <span style={{ fontWeight: "bolder" }}>Address:</span> MO 2, United
          State
        </ParaStyle>
        <ParaStyle>
          <Icon name="credit card outline" />
          <span style={{ fontWeight: "bolder" }}>Position:</span> Developer
        </ParaStyle>
      </Modal.Description>
    </Modal.Content>
  </Modal>
);

export default UserModal;
