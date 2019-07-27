import React from "react";
import decode from "jwt-decode";

import Channels from "../components/Channels";
import Teams from "../components/Teams";
import AddChannelModal from "../components/AddChannelModal";
import InvitePeopleModal from "../components/InvitePeopleModal";

export default class Sidebar extends React.Component {
  state = {
    openAddChannelModal: false,
    openInvitePeopleModal: false
  };

  toggleAddChannelModal = e => {
    if (e) {
      e.preventDefault();
    }
    this.setState(state => ({
      openAddChannelModal: !state.openAddChannelModal
    }));
  };

  toggleInvitePeopleModal = e => {
    if (e) {
      e.preventDefault();
    }
    this.setState(state => ({
      openInvitePeopleModal: !state.openInvitePeopleModal
    }));
  };

  render() {
    const { teams, team } = this.props;
    const { openAddChannelModal, openInvitePeopleModal } = this.state;

    let username = "";

    let isOwner = false;

    try {
      const token = localStorage.getItem("token");
      const { user } = decode(token);
      username = user.username;
      isOwner = user.id === team.owner;
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
        isOwner={isOwner}
        users={[{ id: 1, name: "slackbot" }, { id: 2, name: "user1" }]}
        onAddChannelClick={this.toggleAddChannelModal}
        onInvitePeopleClick={this.toggleInvitePeopleModal}
      />,
      <AddChannelModal
        teamId={team ? team.id : 0}
        open={openAddChannelModal}
        onClose={this.toggleAddChannelModal}
        key="sidebar-add-channel-modal"
      />,
      <InvitePeopleModal
        teamId={team ? team.id : 0}
        onClose={this.toggleInvitePeopleModal}
        open={openInvitePeopleModal}
        key="sidebar-invite-people-modal"
      />
    ];
  }
}
