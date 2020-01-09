import React from "react";
import { Button, Header, Image, Modal, Icon } from "semantic-ui-react";

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
    <Modal.Header style={{ backgroundColor: "#0f8deb", color: "#fff" }}>
      User info
    </Modal.Header>
    <Modal.Content
      image
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f4f7fa"
      }}
    >
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
        <p>
          <Icon name="clock outline" />
          <span style={{ fontWeight: "bolder" }}>Last seen:</span>{" "}
          {Date(`${last_seen}`)}
        </p>
        <p>
          <Icon name="mail outline" />
          <span style={{ fontWeight: "bolder" }}>Email adress:</span> {name}@
          {name}.com
        </p>
        <p>
          <Icon name="text telephone" />
          <span style={{ fontWeight: "bolder" }}>Phone:</span> +84 389 139 3849
        </p>
        <p>
          <Icon name="at" />
          <span style={{ fontWeight: "bolder" }}>Adress:</span> MO 2, United
          State
        </p>
        <p>
          <Icon name="credit card outline" />
          <span style={{ fontWeight: "bolder" }}>Position:</span> Developer
        </p>
      </Modal.Description>
    </Modal.Content>
  </Modal>
);

export default UserModal;
