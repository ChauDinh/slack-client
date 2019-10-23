import React from "react";
import styled from "styled-components";
import { Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  grid-column: 2;
  grid-row: 1 / 4;
  background-color: #f4f7fa;
  padding-top: 20px;
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
  color: #93a5ad;
  font-weight: 500;
  &:hover {
    background: #3e313c;
    color: white;
  }
`;

const ListHeader = styled.li`
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  font-weight: 700;
  color: #79868c;
  ${paddingLeft}
  ${paddingRight}
`;

const PushLeft = styled.div`
  ${paddingLeft}
`;

const Dark = styled.span`
  color: #000;
`;

const Gray = styled.span`
  color: gray;
`;

const Green = styled.span`
  color: #5de01f;
`;

const Circle = ({ on = true }) => (on ? <Green>●</Green> : <Gray>✗</Gray>);

const channel = ({ id, name }, teamId) => (
  <Link key={`channel-${id}`} to={`/view-team/${teamId}/${id}`}>
    <ListItem>{`# ${name}`}</ListItem>
  </Link>
);
const dmChannel = ({ id, name }, teamId) => (
  <Link style={{ color: "black" }} to={`/view-team/${teamId}/${id}`}>
    <ListItem key={`user-${id}`}>
      <Circle /> {name}
    </ListItem>
  </Link>
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
      <Header style={{ color: "#000", textTransform: "capitalize" }}>
        @{teamName}
      </Header>
      <Dark>
        <Image />
      </Dark>{" "}
      <div
        style={{
          background: "#5dd985",
          display: "inline-block",
          padding: " .2rem .6rem",
          borderRadius: "5px",
          fontWeight: "700",
          color: "#fff"
        }}
      >
        {userName}
      </div>
    </PushLeft>
    <div>
      <List>
        <ListHeader
          style={{
            marginTop: "2rem"
          }}
        >
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
        <ListHeader
          style={{
            marginTop: "2rem"
          }}
        >
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
      <PushLeft style={{ marginTop: "2rem" }}>
        <a
          style={{
            color: "#000",
            fontWeight: "700",
            background: "#f7f7f7",
            padding: ".5rem 1rem",
            borderRadius: "5px",
            border: "2px solid #000"
          }}
          href="#invite-people"
          onClick={onInvitePeopleClick}
        >
          + Invite People
        </a>
      </PushLeft>
    )}
  </Wrapper>
);
