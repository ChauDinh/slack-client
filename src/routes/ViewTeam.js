import React from "react";
import { Redirect } from "react-router-dom";
import { graphql } from "react-apollo";
import { meQuery } from "../graphql/team";
import findIndex from "lodash/findIndex";

import Header from "../components/Header";
import Layout from "../components/Layout";
import SendMessage from "../components/SendMessage";
import Sidebar from "../container/Sidebar";
import MessageContainer from "../container/MessageContainer";

const ViewTeam = ({
  data: { loading, me, ...otherProps },
  match: {
    params: { teamId, channelId }
  }
}) => {
  if (loading) {
    return null;
  }

  console.log(otherProps);
  const { username, teams } = me;

  if (!teams.length) {
    return <Redirect to="/create-team" />;
  }

  // const teamIdInteger = parseInt(teamId, 10);
  const teamIndex = teamId ? findIndex(teams, ["id", parseInt(teamId, 10)]) : 0;
  const team = teamIndex === -1 ? teams[0] : teams[teamIndex];

  // const channelIdInteger = parseInt(channelId, 10);
  const channelIndex = channelId
    ? findIndex(team.channels, ["id", parseInt(channelId, 10)])
    : 0;
  const channel =
    channelIndex === -1 ? team.channels[0] : team.channels[channelIndex];

  return (
    <Layout className="app-layout">
      <Sidebar
        teams={teams.map(t => ({
          id: t.id,
          letter: t.name.charAt(0).toUpperCase()
        }))}
        team={team}
        username={username}
      />
      {channel && <Header channelName={channel.name} />}
      {channel && <MessageContainer channelId={channel.id} />}
      {channel && (
        <SendMessage channelName={channel.name} channelId={channel.id} />
      )}
    </Layout>
  );
};

export default graphql(meQuery, { options: { fetchPolicy: "network-only" } })(
  ViewTeam
);
