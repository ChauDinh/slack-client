import React from "react";
import { Redirect } from "react-router-dom";
import { compose, graphql } from "react-apollo";
import { meQuery } from "../graphql/team";
import findIndex from "lodash/findIndex";

import Header from "../components/Header";
import Layout from "../components/Layout";
import SendMessage from "../components/SendMessage";
import Sidebar from "../container/Sidebar";
import DirectMessageContainer from "../container/DirectMessageContainer";
import gql from "graphql-tag";

const ViewTeam = ({
  mutate,
  data: { loading, me },
  match: {
    params: { teamId, userId }
  }
}) => {
  if (loading) {
    return null;
  }

  const { username, teams } = me;

  if (!teams.length) {
    return <Redirect to="/create-team" />;
  }

  // const teamIdInteger = parseInt(teamId, 10);
  const teamIndex = teamId ? findIndex(teams, ["id", parseInt(teamId, 10)]) : 0;
  const team = teamIndex === -1 ? teams[0] : teams[teamIndex];

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
      <Header channelName={"Someone's username"} />
      <DirectMessageContainer teamId={parseInt(teamId, 10)} userId={userId} />
      <SendMessage
        onSubmit={async text => {
          await mutate({
            variables: {
              text,
              receiverId: userId
            }
          });
        }}
        placeholder={userId}
      />
    </Layout>
  );
};

const createDirectMessageMutation = gql`
  mutation($receiverId: Int!, $text: String!) {
    createDirectMessage(receiverId: $receiverId, text: $text)
  }
`;

export default compose(
  graphql(meQuery, { options: { fetchPolicy: "network-only" } }),
  graphql(createDirectMessageMutation)
)(ViewTeam);
