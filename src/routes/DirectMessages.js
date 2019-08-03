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
  data: { loading, me, getUser },
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
      <Header channelName={getUser.username} />
      <DirectMessageContainer
        teamId={parseInt(team.id, 10)}
        userId={parseInt(userId, 10)}
      />
      <SendMessage
        onSubmit={async text => {
          const response = await mutate({
            variables: {
              text,
              receiverId: parseInt(userId, 10),
              teamId: parseInt(teamId, 10)
            },
            optimisticResponse: {
              createDirectMessage: true
            },
            update: proxy => {
              const data = proxy.readQuery({ query: meQuery });
              const teamIndex2 = findIndex(data.me.teams, ["id", team.id]);
              const notAlreadyThere = data.me.teams[
                teamIndex2
              ].directMessageMembers.every(
                member => member.id !== parseInt(userId, 10)
              ); // because userId is maybe a string
              if (notAlreadyThere) {
                data.me.teams[teamIndex2].directMessageMembers.push({
                  __typename: "User",
                  id: parseInt(userId, 10),
                  username: getUser.username
                });
                proxy.writeQuery({
                  query: meQuery,
                  data
                });
              }
            }
          });
          console.log(response);
        }}
        placeholder={userId}
      />
    </Layout>
  );
};

const createDirectMessageMutation = gql`
  mutation($receiverId: Int!, $text: String!, $teamId: Int!) {
    createDirectMessage(receiverId: $receiverId, text: $text, teamId: $teamId)
  }
`;

const directMessageMeQuery = gql`
  query($userId: Int!) {
    getUser(userId: $userId) {
      username
    }
    me {
      id
      username
      teams {
        id
        name
        admin
        directMessageMembers {
          id
          username
        }
        channels {
          id
          name
        }
      }
    }
  }
`;

export default compose(
  graphql(directMessageMeQuery, {
    options: props => ({
      fetchPolicy: "network-only",
      variables: { userId: props.match.params.userId }
    })
  }),
  graphql(createDirectMessageMutation)
)(ViewTeam);
