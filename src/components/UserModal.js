import React from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";

import OnlineUser from "./OnlineUser";

const UserModal = ({ name, last_seen }) => (
  <Modal
    trigger={
      <Button
        style={{
          backgroundColor: "transparent",
          padding: "0",
          display: "block"
        }}
      >
        {" "}
        <OnlineUser name={name} last_seen={last_seen} />
      </Button>
    }
    centered={false}
    closeIcon
    style={{
      maxWidth: "450px"
    }}
  >
    <Modal.Header>User info</Modal.Header>
    <Modal.Content image style={{ display: "flex", flexDirection: "column" }}>
      <Image
        wrapped
        size="medium"
        src={`https://api.adorable.io/avatars/100/${name}@adorable.io`}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      />
      <Modal.Description style={{ paddingLeft: "0", fontFamily: "sans-serif" }}>
        <Header style={{ textAlign: "center", marginTop: "10px" }}>
          {name}
        </Header>
        <p>Last seen: {Date(`${last_seen}`)}</p>
        <p>
          Email adress: {name}@{name}.com
        </p>
        <p>Phone: +84 389 139 3849</p>
        <p>Adress: MO 2, United State</p>
        <p>Position: Developer</p>
      </Modal.Description>
    </Modal.Content>
  </Modal>
);

export default UserModal;
