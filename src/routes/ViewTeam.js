import React from "react";

import Channels from "../components/Channels";
import Teams from "../components/Teams";
import Input from "../components/Input";
import Messages from "../components/Messages";
import Header from "../components/Header";
import Layout from "../components/Layout";

export default () => (
  <Layout className="app-layout">
    <Teams className="teams">Teams</Teams>
    <Channels className="channels">Channels</Channels>
    <Header className="header">Header</Header>
    <Messages className="messages">
      <ul className="message-list">
        <li />
        <li />
      </ul>
    </Messages>
    <Input className="input">
      <input type="text" placeholder="CSS Grid Layout Module" />
    </Input>
  </Layout>
);
