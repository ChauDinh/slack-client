import React from "react";

import Channels from "../components/Channels";
import Teams from "../components/Teams";
import Input from "../components/Input";
import Messages from "../components/Messages";
import Header from "../components/Header";
import Layout from "../components/Layout";
import SendMessage from "../components/SendMessage";

export default () => (
  <Layout className="app-layout">
    <Teams
      className="teams"
      teams={[{ id: 1, name: "R" }, { id: 2, name: "T" }]}
    />
    <Channels
      className="channels"
      teamName="Team name"
      userName="User name"
      channels={[{ id: 0, name: "general" }, { id: 2, name: "random" }]}
      users={[{ id: 1, name: "Slackbot" }, { id: 2, name: "user1" }]}
    />
    <Header className="header" channelName="general" />
    <Messages className="messages" />
    <SendMessage channelName="general" />
  </Layout>
);
