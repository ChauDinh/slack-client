import React from "react";
import Messages from "../components/Messages";
import Header from "../components/Header";
import Layout from "../components/Layout";
import SendMessage from "../components/SendMessage";
import Sidebar from "../container/Sidebar";

const ViewTeam = ({ match: { params } }) => (
  <Layout className="app-layout">
    <Sidebar currentTeamId={params.teamId} data={{ loading: false }} />
    <Header channelName="general" />
    <Messages>
      <ul className="message-list" />
    </Messages>
    <SendMessage channelName="general" />
  </Layout>
);

export default ViewTeam;
