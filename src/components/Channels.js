import React from "react";
import styled from "styled-components";
import { Icon, Image, Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  width: inherit;
  grid-column: 2;
  grid-row: 1 / 4;
  background-color: #f4f7fa;
  font-family: Helvetica, Segoe UI, Helvetica, Arial, sans-serif;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Header = styled.h3`
  color: #f5f5f5;
  margin-top: 16px;
`;

const List = styled.ul`
  width: 100%;
  list-style: none;
  padding-left: 0;
  font-size: 15px;
`;

const paddingLeft = "padding-left: 20px";
const paddingRight = "padding-right: 20px";

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 2px;
  ${paddingLeft};
  ${paddingRight};
  color: #333;
  font-weight: 500;
  font-size: 15px;
  &:hover {
    background: #e0e4e8;
    border-radius: 0;
  }
`;

const ListHeader = styled.li`
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  font-weight: 700;
  color: #79868c;
  ${paddingLeft};
  ${paddingRight};
`;

const PushLeft = styled.div`
  ${paddingLeft}
`;

const Dark = styled.span`
  color: #000;
`;

const Gray = styled.span`
  color: #333;
`;

const Green = styled.span`
  color: #fff;
`;

const channel = ({ id, name }, teamId) => (
  <Link key={`channel-${id}`} to={`/view-team/${teamId}/${id}`}>
    <ListItem>
      <div>
        <Icon name="slack hash" />
        {`${name}`}
      </div>
    </ListItem>
  </Link>
);
const dmChannel = ({ id, name }, teamId) => (
  <Link
    key={`user-${id}`}
    style={{ color: "black" }}
    to={`/view-team/${teamId}/${id}`}
  >
    <ListItem>{name}</ListItem>
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
    <div
      style={{
        display: "flex",
        // flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "15px",
        fontWeight: "700",
        background: "#f4f7fa",
        height: "50px",
        boxShadow: "0px 4px 3px -3px #e0e4e8",
        borderBottom: "2px solid #e0e4e8"
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={`https://api.adorable.io/avatars/40/${userName.toUpperCase()}dYHDDWmw99`}
          style={{
            borderRadius: "50%",
            marginLeft: "20px",
            marginRight: "10px",
            width: "30px",
            height: "30px"
          }}
        />
        {userName}
      </div>
      <Dropdown style={{ marginRight: "20px" }} />
    </div>
    <Header
      style={{
        color: "#000",
        textTransform: "capitalize",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        marginLeft: "20px"
      }}
    >
      @{teamName}
    </Header>
    <Dark>
      <Image />
    </Dark>{" "}
    <div>
      <List>
        <ListHeader
          style={{
            marginTop: "2rem",
            marginBottom: "1rem"
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
            marginTop: "2rem",
            marginBottom: "1rem"
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
