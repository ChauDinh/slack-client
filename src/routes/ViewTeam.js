import React from "react";
import Messages from "../components/Messages";
import Header from "../components/Header";
import Layout from "../components/Layout";
import SendMessage from "../components/SendMessage";
import Sidebar from "../container/Sidebar";
import { graphql } from "react-apollo";
import { allTeamQuery } from "../graphql/team";
import findIndex from "lodash/findIndex";

const ViewTeam = ({
  data: { loading, allTeams },
  match: {
    params: { teamId }
  }
}) => {
  if (loading) {
    return null;
  }

  const teamIndex = teamId
    ? findIndex(allTeams, ["id", parseInt(teamId, 10)])
    : 0;
  const team = allTeams[teamIndex];

  return (
    <Layout className="app-layout">
      <Sidebar
        teams={allTeams.map(t => ({
          id: t.id,
          letter: t.name.charAt(0).toUpperCase()
        }))}
        team={team}
      />
      <Header channelName="general" />
      <Messages>
        <ul className="message-list" />
      </Messages>
      <SendMessage channelName="general" />
    </Layout>
  );
};

export default graphql(allTeamQuery)(ViewTeam);
