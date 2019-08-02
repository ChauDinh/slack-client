import React from "react";
import styled from "styled-components";
import { Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  grid-column: 2;
  grid-row: 1 / 4;
  background-color: #3e103f;
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

const ListItem = styled.li`
  padding: 2px;
  ${paddingLeft};
  &:hover {
    background: #3e313c;
  }
`;

const ListHeader = styled.li`
  ${paddingLeft}
`;

const PushLeft = styled.div`
  ${paddingLeft}
`;

const Green = styled.span`
  color: #38978d;
`;

const Circle = ({ on = true }) => (on ? <Green>❤︎</Green> : "❤");

const channel = ({ id, name }, teamId) => (
  <Link key={`channel-${id}`} to={`/view-team/${teamId}/${id}`}>
    <ListItem>{`#${name}`}</ListItem>
  </Link>
);
const user = ({ id, username }, teamId) => (
  <ListItem key={`user-${id}`}>
    <Link to={`/view-team/user/${teamId}/${id}`}>
      <Circle /> {username}
    </Link>
  </ListItem>
);

export default ({
  teamName,
  userName,
  channels,
  users,
  onAddChannelClick,
  teamId,
  onInvitePeopleClick,
  onDirectMessageClick,
  isOwner
}) => (
  <Wrapper>
    <PushLeft>
      <Header>{teamName}</Header>
      {userName}
    </PushLeft>
    <div>
      <List>
        <ListHeader>
          Channels{" "}
          {isOwner && <Icon onClick={onAddChannelClick} name="add circle" />}{" "}
        </ListHeader>
        {channels ? channels.map(c => channel(c, teamId)) : null}
      </List>
    </div>
    <div>
      <List>
        <ListHeader>
          Direct Messages{" "}
          <Icon onClick={onDirectMessageClick} name="add circle" />
        </ListHeader>
        {users.map(u => user(u, teamId))}
      </List>
    </div>
    {isOwner && (
      <div>
        <a href="#invite-people" onClick={onInvitePeopleClick}>
          + Invite People
        </a>
      </div>
    )}
  </Wrapper>
);
