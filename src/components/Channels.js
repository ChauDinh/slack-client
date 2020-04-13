import React from "react";
import styled from "styled-components";
import { Icon, Dropdown, Button, List } from "semantic-ui-react";
import { Link } from "react-router-dom";

import AddCircleImage from "../images/small__icons/add_cycle.png";

const Wrapper = styled.div`
  width: inherit;
  grid-column: 2;
  grid-row: 1 / 4;
  background-color: #fff;
  font-family: Helvetica Neue, Segoe UI, Helvetica, Arial, sans-serif;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  border-right: 1px solid rgba(200, 200, 200, 0.5);

  /* width */
  ::-webkit-scrollbar {
    width: 14px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background-color: #f3f3f3;
    background-clip: padding-box;
    border: 3px solid #fff;
    border-radius: 7px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background-color: #d3e1ef;
    background-clip: padding-box;
    border: 3px solid #fff;
    border-radius: 7px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

// const List = styled.ul`
//   width: 100%;
//   list-style: none;
//   padding-left: 0;
//   font-size: 15px;
// `;

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
  font-family: AvenirNextDemi, sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #000;
  text-transform: uppercase;
  ${paddingLeft};
  ${paddingRight};
`;

const PushLeft = styled.div`
  ${paddingLeft}
`;

const channel = ({ id, name }, teamId) => (
  <Link key={`channel-${id}`} to={`/view-team/${teamId}/${id}`}>
    <ListItem>
      <div
        style={{ fontFamily: "AvenirNext, sans-serif", fontSize: "16px" }}
      >{`#${name}`}</div>
    </ListItem>
  </Link>
);
const dmChannel = ({ id, name }, teamId) => (
  <Link
    key={`user-${id}`}
    style={{ color: "black" }}
    to={`/view-team/${teamId}/${id}`}
  >
    <ListItem>
      <div style={{ fontFamily: "AvenirNext, sans-serif", fontSize: "16px" }}>
        {name}
      </div>
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
  isOwner,
}) => (
  <Wrapper>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "20px",
        fontWeight: "500",
        background: "#69b4ff",
        height: "50px",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        <div
          style={{
            marginLeft: "20px",
            fontFamily: "AvenirNextDemi, sans-serif",
            fontWeight: "900",
            color: "#fff",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {teamName}
        </div>
      </div>
      <Dropdown
        pointing="top right"
        style={{
          right: "20px",
          position: "absolute",
          zIndex: "2",
          color: "#fff",
        }}
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

    <div>
      <List animated verticalAlign="middle">
        <ListHeader
          style={{
            marginTop: "1rem",
            marginBottom: ".4rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            All Channels{" "}
            {isOwner && (
              <Button
                onClick={onAddChannelClick}
                style={{ padding: 0, background: "none" }}
              >
                <img alt="" src={AddCircleImage} width="15px" />
              </Button>
            )}
          </div>
        </ListHeader>
        {channels ? channels.map((c) => channel(c, teamId)) : null}
      </List>
    </div>
    <div>
      <List animated verticalAlign="middle">
        <ListHeader
          style={{
            marginTop: "2rem",
            marginBottom: "1rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            Direct Messages{" "}
            <Button
              onClick={onDirectMessageClick}
              style={{
                padding: 0,
                background: "none",
              }}
            >
              <img alt="" src={AddCircleImage} width="15px" />
            </Button>
          </div>
        </ListHeader>
        {dmChannels.map((dmc) => dmChannel(dmc, teamId))}
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
            border: "2px solid #000",
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
