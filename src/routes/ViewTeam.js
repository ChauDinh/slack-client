import React from "react";
import { Redirect } from "react-router-dom";
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
    params: { teamId, channelId }
  }
}) => {
  if (loading) {
    return null;
  }

  if (!allTeams.length) {
    return <Redirect to="/create-team" />;
  }

  // const teamIdInteger = parseInt(teamId, 10);
  const teamIndex = teamId
    ? findIndex(allTeams, ["id", parseInt(teamId, 10)])
    : 0;
  const team = allTeams[teamIndex];

  // const channelIdInteger = parseInt(channelId, 10);
  const channelIndex = channelId
    ? findIndex(team.channels, ["id", parseInt(channelId, 10)])
    : 0;
  const channel = team.channels[channelIndex];

  return (
    <Layout className="app-layout">
      <Sidebar
        teams={allTeams.map(t => ({
          id: t.id,
          letter: t.name.charAt(0).toUpperCase()
        }))}
        team={team}
      />
      {channel && <Header channelName={channel.name} />}
      {channel && (
        <Messages channelId={channel.id}>
          <ul className="message-list" />
        </Messages>
      )}
      {channel && <SendMessage channelName={channel.name} />}
    </Layout>
  );
};

export default graphql(allTeamQuery)(ViewTeam);
