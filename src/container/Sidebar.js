import React from "react";

import Channels from "../components/Channels";
import Teams from "../components/Teams";
import AddChannelModal from "../components/AddChannelModal";
import InvitePeopleModal from "../components/InvitePeopleModal";
import DirectMessageModal from "../components/DirectMessageModal";
import { Context } from "../routes/ViewTeam";

export default class Sidebar extends React.Component {
  state = {
    openAddChannelModal: false,
    openInvitePeopleModal: false,
    openDirectMessageModal: false
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

  toggleDirectMessageModal = e => {
    if (e) {
      e.preventDefault();
    }
    this.setState(state => ({
      openDirectMessageModal: !state.openDirectMessageModal
    }));
  };

  render() {
    // const { team } = this.props;
    const {
      openAddChannelModal,
      openInvitePeopleModal,
      openDirectMessageModal
    } = this.state;

    return [
      <Context.Consumer key="team-sidebar">
        {({ teams }) => <Teams teams={teams} />}
      </Context.Consumer>,
      <Context.Consumer key="channel-sidebar">
        {({ team, username }) => {
          const regularChannels = [];
          const dmChannels = [];

          team.channels.forEach(channel => {
            if (channel.dm) {
              dmChannels.push(channel);
            } else {
              regularChannels.push(channel);
            }
          });

          return (
            <Channels
              teamName={team ? team.name : ""}
              userName={username}
              teamId={team ? team.id : 0}
              channels={team ? regularChannels : ""}
              isOwner={team.admin}
              dmChannels={dmChannels}
              onAddChannelClick={this.toggleAddChannelModal}
              onInvitePeopleClick={this.toggleInvitePeopleModal}
              onDirectMessageClick={this.toggleDirectMessageModal}
            />
          );
        }}
      </Context.Consumer>,
      <Context.Consumer key="sidebar-add-channel-modal">
        {({ team, currentUserId }) => (
          <AddChannelModal
            teamId={team ? team.id : 0}
            open={openAddChannelModal}
            onClose={this.toggleAddChannelModal}
            currentUserId={currentUserId}
          />
        )}
      </Context.Consumer>,
      <Context.Consumer key="sidebar-invite-people-modal">
        {({ team }) => (
          <InvitePeopleModal
            teamId={team ? team.id : 0}
            onClose={this.toggleInvitePeopleModal}
            open={openInvitePeopleModal}
          />
        )}
      </Context.Consumer>,
      <Context.Consumer key="sidebar-direct-message-modal">
        {({ team, currentUserId }) => (
          <DirectMessageModal
            teamId={team ? team.id : 0}
            open={openDirectMessageModal}
            onClose={this.toggleDirectMessageModal}
            currentUserId={currentUserId}
          />
        )}
      </Context.Consumer>
    ];
  }
}
