import React from "react";
import styled from "styled-components";
import { Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  grid-column: 2;
  grid-row: 1 / 4;
  background-color: #12bdcb;
  color: #d9cfd9;
`;

const Header = styled.h1`
  color: #f5f5f5;
  font-size: 20px;
`;

const List = styled.ul`
  width: 100%;
  list-style: none;
  padding-left: 0;
`;

const paddingLeft = "padding-left: 10px";
const paddingRight = "padding-right: 10px";

const ListItem = styled.li`
  padding: 2px;
  ${paddingLeft};
  color: #f4f4f4;
  &:hover {
    background: #3e313c;
  }
`;

const ListHeader = styled.li`
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  ${paddingLeft}
  ${paddingRight}
`;

const PushLeft = styled.div`
  ${paddingLeft}
`;

const Green = styled.span`
  color: #4cd4c5;
`;

const Gray = styled.span`
  color: gray;
`;

const Circle = ({ on = true }) => (on ? <Green>●</Green> : <Gray>✗</Gray>);

const channel = ({ id, name }, teamId) => (
  <Link key={`channel-${id}`} to={`/view-team/${teamId}/${id}`}>
    <ListItem>{`# ${name}`}</ListItem>
  </Link>
);
const dmChannel = ({ id, name }, teamId) => (
  <ListItem key={`user-${id}`}>
    <Link style={{ color: "#f5f5f5" }} to={`/view-team/${teamId}/${id}`}>
      <Circle /> {name}
    </Link>
  </ListItem>
);

export default ({
  teamName,
  userName,
  channels,
  dmChannels,
  onAddChannelClick,
  teamId,
  onInvitePeopleClick,
  onDirectMessageClick,
  isOwner
}) => (
  <Wrapper>
    <PushLeft>
      <Header>{teamName}</Header>
      <Green>●</Green> {userName}
    </PushLeft>
    <div>
      <List>
        <ListHeader>
          Channels{" "}
          {isOwner && (
            <Icon
              style={{ cursor: "pointer" }}
              onClick={onAddChannelClick}
              name="add circle"
            />
          )}{" "}
        </ListHeader>
        {channels ? channels.map(c => channel(c, teamId)) : null}
      </List>
    </div>
    <div>
      <List>
        <ListHeader>
          Direct Messages{" "}
          <Icon
            style={{ cursor: "pointer" }}
            onClick={onDirectMessageClick}
            name="add circle"
          />
        </ListHeader>
        {dmChannels.map(dmc => dmChannel(dmc, teamId))}
      </List>
    </div>
    {isOwner && (
      <PushLeft>
        <a
          style={{ color: "#f4f4f4" }}
          href="#invite-people"
          onClick={onInvitePeopleClick}
        >
          + Invite People
        </a>
      </PushLeft>
    )}
  </Wrapper>
);
