import React from "react";
import decode from "jwt-decode";

import Channels from "../components/Channels";
import Teams from "../components/Teams";
import AddChannelModel from "../components/AddChannelModel";

export default class Sidebar extends React.Component {
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
    const { teams, team } = this.props;

    let username = "";

    try {
      const token = localStorage.getItem("token");
      const { user } = decode(token);
      username = user.username;
    } catch (err) {
      return;
    }

    return [
      <Teams key="team-sidebar" teams={teams} />,
      <Channels
        key="channel-sidebar"
        teamName={team ? team.name : ""}
        userName={username}
        teamId={team ? team.id : 0}
        channels={team ? team.channels : ""}
        users={[{ id: 1, name: "slackbot" }, { id: 2, name: "user1" }]}
        onAddChannelClick={this.handleAddChannelClick}
      />,
      <AddChannelModel
        teamId={team ? team.id : 0}
        open={this.state.openAddChannelModel}
        onClose={this.handleCloseAddChannelModal}
        key="sidebar-add-channel-modal"
      />
    ];
  }
}
