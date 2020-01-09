import React from "react";
import styled from "styled-components";
import { Icon, Dropdown, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  width: inherit;
  grid-column: 2;
  grid-row: 1 / 4;
  background-color: #f4f7fa;
  font-family: Helvetica Neue, Segoe UI, Helvetica, Arial, sans-serif;
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  @media (max-width: 768px) {
    display: none;
  }
`;

// const Header = styled.h3`
//   color: #f5f5f5;
//   margin-top: 16px;
// `;

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
  padding: 1.75px;
  ${paddingLeft};
  ${paddingRight};
  color: #333;
  font-weight: 500;
  font-size: 15px;
  margin-bottom: 7px;
  &:hover {
    background: #bbcad9;
    color: #fff;
    border-radius: 0;
  }
`;

const ListHeader = styled.li`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 600;
  color: #79868c;
  text-transform: uppercase;
  ${paddingLeft};
  ${paddingRight};
`;

const PushLeft = styled.div`
  ${paddingLeft}
`;

// const Dark = styled.span`
//   color: #000;
// `;

const channel = ({ id, name }, teamId) => (
  <Link key={`channel-${id}`} to={`/view-team/${teamId}/${id}`}>
    <ListItem>
      <div>
        <Icon name="globe" size="small" color="blue" />
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
        fontSize: "20px",
        fontWeight: "500",
        background: "#f4f7fa",
        height: "50px",
        position: "relative"
        // boxShadow: "0px 4px 3px -3px #e0e4e8",
        // borderBottom: "2px solid #e0e4e8"
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ marginLeft: "20px" }}>{teamName}</div>
      </div>
      <Dropdown
        pointing="top right"
        style={{ right: "20px", position: "absolute", zIndex: "2" }}
      >
        <Dropdown.Menu>
          <Dropdown.Item>
            <h4>name: {teamName}</h4>
          </Dropdown.Item>
          <Dropdown.Item>
            <Icon name="connectdevelop" /> Connect with others
          </Dropdown.Item>
          <Dropdown.Item>
            <Icon name="add user" /> Invite others
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
    {/* <Dark>
      <Image />
    </Dark>{" "} */}
    <div>
      <List>
        <ListHeader
          style={{
            marginTop: "1rem",
            marginBottom: ".4rem"
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%"
            }}
          >
            Channels{" "}
            {isOwner && (
              <Button
                onClick={onAddChannelClick}
                style={{
                  background: "#0f8deb",
                  color: "#fff",
                  padding: "5px 10px",
                  fontSize: "13px",
                  fontWeight: "700"
                }}
              >
                create new
              </Button>
            )}
          </div>
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%"
            }}
          >
            Direct Messages{" "}
            <Button
              onClick={onDirectMessageClick}
              style={{
                background: "#0f8deb",
                color: "#fff",
                padding: "5px 10px",
                fontSize: "13px",
                fontWeight: "700"
              }}
            >
              invite
            </Button>
          </div>
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
