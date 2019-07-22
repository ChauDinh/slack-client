import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import findIndex from "lodash/findIndex";
import decode from "jwt-decode";

import Channels from "../components/Channels";
import Teams from "../components/Teams";
import AddChannelModel from "../components/AddChannelModel";

class Sidebar extends React.Component {
  state = {
    openAddChannelModel: false
  };

  handleAddChannelClick = () => {
    this.setState({ openAddChannelModel: true });
  };

  handleCloseAddChannelModal = () => {
    this.setState({ openAddChannelModel: false });
  };

  render() {
    const {
      data: { loading, allTeams },
      currentTeamId
    } = this.props;
    if (loading) {
      return null;
    }
    console.log(allTeams);

    const teamIndex = currentTeamId
      ? findIndex(allTeams, ["id", parseInt(currentTeamId, 10)])
      : 0;
    const team = allTeams[teamIndex];
    let username = "";

    try {
      const token = localStorage.getItem("token");
      const { user } = decode(token);
      username = user.username;
    } catch (err) {
      return;
    }

    return [
      <Teams
        key="team-sidebar"
        teams={allTeams.map(team => ({
          id: team.id,
          letter: team.name.charAt(0).toUpperCase()
        }))}
      />,
      <Channels
        key="channel-sidebar"
        teamName={team ? team.name : ""}
        userName={username}
        channels={team ? team.channels : ""}
        users={[{ id: 1, name: "slackbot" }, { id: 2, name: "user1" }]}
        onAddChannelClick={this.handleAddChannelClick}
      />,
      <AddChannelModel
        open={this.state.openAddChannelModel}
        onClose={this.handleCloseAddChannelModal}
        key="sidebar-add-channel-modal"
      />
    ];
  }
}

const allTeamQuery = gql`
  {
    allTeams {
      id
      name
      channels {
        id
        name
      }
    }
  }
`;

export default graphql(allTeamQuery)(Sidebar);
