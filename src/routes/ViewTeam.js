import React from "react";
import Messages from "../components/Messages";
import Header from "../components/Header";
import Layout from "../components/Layout";
import SendMessage from "../components/SendMessage";
import Sidebar from "../container/Sidebar";

export default () => (
  <Layout className="app-layout">
    <Sidebar currentTeamId={1} data={{ loading: false }} />
    <Header channelName="general" />
    <Messages>
      <ul className="message-list" />
    </Messages>
    <SendMessage channelName="general" />
  </Layout>
);
