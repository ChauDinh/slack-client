import React from "react";
import { Redirect } from "react-router-dom";
import { compose, graphql } from "react-apollo";
import { meQuery } from "../graphql/team";
import findIndex from "lodash/findIndex";
import socketIOClient from "socket.io-client";

import Header from "../components/Header";
import Layout from "../components/Layout";
import SendMessage from "../components/SendMessage";
import OnlineUserWrapper from "../components/OnlineUsers";
import Sidebar from "../container/Sidebar";
import MessageContainer from "../container/MessageContainer";
import Me from "../components/Me";
import gql from "graphql-tag";

export const Context = React.createContext();
var socket;

class ViewTeam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      endpoint: `http://localhost:9090`,
    };
    socket = socketIOClient(this.state.endpoint);
  }

  render() {
    const {
      mutate,
      data: { loading, me },
      match: {
        params: { teamId, channelId },
      },
    } = this.props;

    if (loading || !me) {
      return null;
    }
    const { id: currentUserId, username, teams } = me;

    if (!teams.length) {
      return <Redirect to="/create-team" />;
    }

    const teamIndex = teamId
      ? findIndex(teams, ["id", parseInt(teamId, 10)])
      : 0;
    const team = teamIndex === -1 ? teams[0] : teams[teamIndex];

    const channelIndex = channelId
      ? findIndex(team.channels, ["id", parseInt(channelId, 10)])
      : 0;
    const channel =
      channelIndex === -1 ? team.channels[0] : team.channels[channelIndex];

    return (
      <Layout className="app-layout">
        <Context.Provider
          value={{
            teams: teams.map((t) => ({
              id: t.id,
              letter: t.name.charAt(0).toUpperCase(),
              name: t.name,
            })),
            team: team,
            username: username,
            currentUserId: currentUserId,
          }}
        >
          <Me username={username} />
          <OnlineUserWrapper username={username} />
          <Sidebar className="side-bar_view-message" />
        </Context.Provider>

        {channel && <Header channelName={channel.name} />}
        {channel && (
          <MessageContainer
            className="message-container_view-message"
            channelId={channel.id}
            username={username}
          />
        )}
        {channel && (
          <SendMessage
            className="send-message_view-message"
            channelId={channel.id}
            placeholder={channel.name}
            onSubmit={async (text) => {
              return mutate({
                variables: { text, channelId: channel.id },
              });
            }}
          />
        )}
      </Layout>
    );
  }
}

export { socket };

const createMessageMutation = gql`
  mutation($channelId: Int!, $text: String!) {
    createMessage(channelId: $channelId, text: $text)
  }
`;

export default compose(
  graphql(meQuery, { options: { fetchPolicy: "network-only" } }),
  graphql(createMessageMutation)
)(ViewTeam);
